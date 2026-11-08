---
title: "Zero-ETL between Amazon Aurora and Amazon Redshift: what it really does, and what's still up to you"
description: "Zero-ETL integration brings Aurora data into Redshift within seconds, with no pipelines to write. How it works, how to set it up, where its limits are, and why it doesn't remove the work of modelling data."
date: 2026-11-08
categories: ["data-architecture", "data-engineering"]
cover:
  src: "/assets/images/posts/zero-etl-aurora-redshift.svg"
  alt: "An operational database on the left and a data warehouse on the right, connected by a direct flow of data with no steps in between"
tags: ["Zero-ETL", "Amazon Aurora", "Amazon Redshift", "CDC", "AWS", "Data Warehouse"]
updated: 2026-11-08
draft: false
---

Anyone who has ever built a pipeline from an application database to a data warehouse knows the sequence. A Change Data Capture service reads the database logs. A message broker or an S3 bucket acts as a staging area. A job, scheduled or streaming, picks up the files and loads them with a `COPY`. Another job merges updates and deletes into the final tables. And around all of this there's monitoring, error handling, reprocessing, and someone on call when a column changes type at three in the morning.

Each piece makes sense on its own. Lined up together, they're a small platform to maintain just to move data that already exists from one system to another, without changing it.

The **zero-ETL integration between Amazon Aurora and Amazon Redshift** exists to remove exactly that platform. In a [previous article](/posts/data-warehouse-near-real-time/) I mentioned it as one of the reasons why a data warehouse updated within seconds is no longer a luxury. Here we take a closer look: what it does, how to set it up, and where it stops.

## What it is, in one sentence

It's a replication managed by AWS that continuously copies the tables of an Aurora cluster (MySQL or PostgreSQL) into a Redshift database, typically a few seconds behind, without you having to write, schedule or monitor a pipeline.

The name is a bit promotional, and it's worth reading carefully. "Zero-ETL" doesn't mean there's no transformation anymore. It means the **E** and the **L**, extraction and loading, go away: the least interesting and most fragile part of the work. The **T** stays, all of it: modelling, business rules, metrics. It simply moves inside Redshift, where the data has already arrived.

Besides Aurora, the same family of integrations now also covers RDS for MySQL, DynamoDB and some SaaS applications. The principles are the same; here I focus on Aurora, which is the most common case.

## How it works

When you create the integration, two things happen in sequence.

The first is the **initial load**. AWS exports the current state of the selected tables and loads it into Redshift. On databases of a few terabytes it can take a while, but it happens without blocking the source database.

The second is **continuous replication**. From then on, every insert, update and delete is read from Aurora's transaction logs and applied in Redshift. Aurora MySQL uses an optimised version of the binlog (*enhanced binlog*); Aurora PostgreSQL uses logical replication. In both cases the reading happens at the storage level, with a very limited impact on the performance of the cluster serving the application.

On the Redshift side, data lands in a dedicated database created from the integration. Tables keep the names and structure of the source ones, and many schema changes (a new column, a new table) are propagated automatically too.

One important detail: that database is **read-only**. You can't write to it, add calculated columns or create objects inside it. It's a mirror of the source, and it has to stay that way. All transformation work happens in other databases of the data warehouse, which read from this one through cross-database queries.

## Prerequisites and setup

The setup isn't complicated, but it has a few steps that, if forgotten, make the integration fail to create, with messages that aren't always very clear.

**On the Aurora cluster** you need a dedicated parameter group with replication enabled. For Aurora MySQL the main parameters are:

```text
aurora_enhanced_binlog      = 1
binlog_format               = ROW
binlog_row_image            = full
binlog_row_metadata         = full
binlog_backup               = 0
binlog_replication_globaldb = 0
```

For Aurora PostgreSQL the equivalent is:

```text
rds.logical_replication             = 1
aurora.enhanced_logical_replication = 1
aurora.logical_replication_backup   = 0
aurora.logical_replication_globaldb = 0
```

After the change the cluster needs a reboot, to be planned in a maintenance window.

**On the data warehouse** the target can be Redshift Serverless or an encrypted provisioned cluster with RA3 nodes. The `enable_case_sensitive_identifier` parameter must be turned on, because MySQL and PostgreSQL distinguish upper and lower case in names and Redshift, by default, doesn't. Finally, the integration has to be authorised with a *resource policy* on the Redshift namespace, stating which Aurora cluster can write to it and which account can create the integration.

**The integration** is created from the RDS console, the CLI or with infrastructure as code (CloudFormation and Terraform support it). This is also where you define the **data filters**: which databases and tables to include or exclude. It's a step not to underestimate, as we'll see shortly.

**The target database**, finally, is created in Redshift with a SQL command:

```sql
-- Aurora MySQL
CREATE DATABASE aurora_sales FROM INTEGRATION '<integration_id>';

-- Aurora PostgreSQL: the source database must be named too
CREATE DATABASE aurora_sales FROM INTEGRATION '<integration_id>' DATABASE sales;
```

From that moment the tables appear in Redshift and start catching up.

## What comes through, and what doesn't

This is the part worth knowing before promising anything to the business.

**A primary key is required.** Tables without a primary key aren't replicated: they stay in an error state and don't appear in Redshift. In older application databases this happens more often than you'd think, especially for log or relationship tables. It's worth taking an inventory before starting.

**Not all data types are supported equally.** Most columns map without problems; some special types and very large values (text or blobs beyond Redshift's limits) may be converted or cause problems on the individual table. The AWS documentation has an up-to-date mapping table, to be checked against the real schema.

**Schema changes are propagated, but not all in the same way.** Adding a column is painless. Other, more invasive changes can trigger a full resynchronisation of the affected table, during which that table's data isn't up to date.

**Filters decide what enters the data warehouse.** Without filters the integration replicates everything, including technical tables, application queues and data that isn't needed in the data warehouse or shouldn't be there at all. With a filter like `include: sales.*, exclude: sales.audit_log` you bring only what you need. It's also the first governance tool: data that isn't replicated doesn't have to be protected downstream.

**Sensitive data arrives as it is.** The integration doesn't mask, pseudonymise or encrypt individual fields. If the customer table holds tax codes, IBANs or email addresses, they reach Redshift in clear text. Protection has to be built on the data warehouse, with permissions on the replicated database, dynamic data masking and row-level security on the objects users actually query. It has to be designed before access is opened, not after.

## After landing: the T is still yours

Having the application tables in Redshift, updated within seconds, is an excellent starting point, but it isn't a data warehouse. Source tables are modelled to make an application work: normalised, with codes instead of descriptions, statuses expressed as numbers, business logic spread across the code rather than the data. Handing these tables directly to analysts means shifting the work of interpretation onto each of them, with inevitably different results.

The model that works best is to use the replicated database as the **bronze layer** of a medallion architecture, and build the other layers on top of it.

- **Materialized views with automatic refresh.** Redshift supports auto refresh and, for many queries, incremental refresh, including on tables fed by zero-ETL. It's the most direct way to keep a silver or gold layer almost as fresh as the source, without external schedulers.
- **Transformation tools such as dbt.** They work as usual: they read from the replicated database and write to a separate one. The frequency is worth choosing carefully, because a model refreshed every hour cancels out the advantage of a replication that arrives within seconds.
- **History mode.** By default, replication only shows the current state of rows: if a customer changes address, the old value disappears. By turning on *history mode* for specific tables, Redshift keeps every version of every row with its validity dates, in practice a type 2 slowly changing dimension managed by the platform. For master data and statuses needed to reconstruct the past, it's a valuable feature.
- **Refresh interval.** With `ALTER DATABASE ... INTEGRATION SET REFRESH_INTERVAL` you can decide how many seconds pass between one application of changes in Redshift and the next. Lengthening it reduces compute usage when a few seconds aren't really needed.

In other words, zero-ETL removes the plumbing, not the design. Those who adopt it thinking they can do without data modelling end up with a very fast data warehouse that's hard to use.

## Monitoring

A managed integration is easier to run, but it doesn't run itself. The trickiest point is that problems tend to be silent: a table in error stops updating while all the others keep going, and the dashboards using it show stale data without any obvious sign.

The tools to notice are there.

- In Redshift, the system views `SVV_INTEGRATION`, `SVV_INTEGRATION_TABLE_STATE` and `SYS_INTEGRATION_ACTIVITY` show the state of the integration, the state of each individual table and the synchronisation activity.
- In CloudWatch there are metrics on replication lag and on the number of tables replicated or in error, to set alarms on.
- RDS events report changes in the state of the integration itself.

The practical advice is to treat latency as a service indicator: a clear threshold (five minutes, for example), an alarm when it's exceeded, and a periodic check that no table has ended up in an error state. If the business gets used to data from a few seconds ago, a one-hour delay is an incident and should be treated as one.

## Costs

AWS doesn't charge for the integration itself. You pay for the resources it uses: on the Aurora side, I/O and storage related to reading changes and to the initial load; on the Redshift side, the compute needed to apply them and the storage of replicated data.

The item to keep an eye on is mainly the second. With Redshift Serverless, a continuous flow of changes keeps the data warehouse active far more often than a nightly load, and the bill reflects it. It's a cost to compare with what it replaces: CDC services, loading jobs, intermediate storage and, above all, the hours spent keeping everything running. In my experience the comparison is almost always favourable, but it has to be done with real numbers, not the ones on the slides.

## When it isn't enough

Zero-ETL is the right choice for a very specific case: bringing tables from an AWS database into Redshift, exactly as they are, as quickly as possible. Outside that scope, other tools are needed.

- **Transformations in flight.** If data has to be enriched, filtered by row or anonymised before reaching the data warehouse, zero-ETL doesn't allow it. You need AWS DMS, Glue or a streaming pipeline.
- **Sources outside AWS or not supported.** An on-premises database or one on another cloud needs a traditional CDC solution.
- **Targets other than Redshift.** If the architecture is centred on a lakehouse with Apache Iceberg on S3, there are zero-ETL integrations towards SageMaker Lakehouse too, but with different characteristics to be assessed separately.
- **Events rather than tables.** Clickstream, IoT data or application events don't live in a relational database. For those, Redshift offers *streaming ingestion* from Kinesis and Kafka, which sits well alongside zero-ETL.

In practice, mature architectures use both worlds: zero-ETL for operational databases, which are the majority of cases, and dedicated pipelines only where they're really needed.

## How to start

If you're evaluating zero-ETL, here's a path that reduces surprises.

1. **Pick a domain with a concrete use case**, where a few seconds of latency change a decision: payments, orders, operations. Don't start from "let's replicate everything".
2. **Take an inventory of the tables**: missing primary keys, special data types, columns with sensitive data.
3. **Define the filters** so that only what's needed enters the data warehouse.
4. **Prepare data protection** on Redshift before giving users access.
5. **Build the modelling layer** with materialized views or dbt, and decide where history mode is needed.
6. **Set up monitoring** of latency and table state, with alarms and an owner.
7. **Measure**: how many pipelines were switched off, how many queries on production databases disappeared, how much the time between an event and its appearance on a dashboard went down.

## Less plumbing, more design

For years a significant part of data teams' work has been moving data from one place to another, and keeping alive the mechanisms that did it. It was necessary work, but it generated little value in itself and absorbed a lot of attention.

The zero-ETL integration between Aurora and Redshift shifts that work onto the platform. The time it frees up shouldn't be seen as a saving to pocket, but as an opportunity to reinvest where value is really created: in data modelling, in defining metrics, in quality and governance. In other words, in the T, which is still yours.
