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

Anyone who has ever built a near real-time pipeline from an application database to a data warehouse knows the sequence. A Change Data Capture service reads the database logs. A message broker or an S3 bucket acts as a staging area. A job, scheduled or streaming, picks up the files and loads them with a `COPY`. Another job merges updates and deletes into the final tables. And around all of this there's monitoring, error handling, reprocessing, and someone on call when a column changes type at three in the morning.

Each piece makes sense on its own. Lined up together, they're a small platform to maintain just to move data that already exists from one system to another, without changing it.

The **zero-ETL integration between Amazon Aurora and Amazon Redshift** exists to remove exactly that platform. In a [previous article](/posts/data-warehouse-near-real-time/) I mentioned it as one of the reasons why a data warehouse updated within seconds is no longer a luxury. Here we take a closer look: what it does, how to set it up, and where it stops.

## What it is, in one sentence

It's a replication managed by AWS that continuously copies the tables of an Aurora cluster (MySQL or PostgreSQL) into a Redshift database, with a delay AWS puts in the order of seconds, without you having to write, schedule or monitor a pipeline.

The name is a bit promotional, and it's worth reading carefully. "Zero-ETL" doesn't mean there's no transformation anymore. It means the **E** and the **L**, extraction and loading, go away: the least interesting and most fragile part of the work. The **T** stays, all of it: modelling, business rules, metrics. It simply moves inside Redshift, where the data has already arrived.

Besides Aurora, the same family of integrations now also covers RDS for MySQL, PostgreSQL and Oracle, DynamoDB, self-managed MySQL, PostgreSQL, SQL Server and Oracle databases, and applications such as Salesforce, SAP and ServiceNow. The principles are the same; here I focus on Aurora, which is the most common case.

## How it works

When you create the integration, two things happen in sequence.

The first is the **initial load**. AWS exports the current state of the selected tables and loads it into Redshift. There's no fixed duration: the documentation says 20-25 minutes "or more", depending on the size of the source database. Read it as an order of magnitude for small databases; on large ones it takes longer. The same applies whenever a table has to be resynchronised.

The second is **continuous replication**. From then on, changes are read from Aurora's transaction logs and applied in Redshift. Aurora MySQL uses the binlog, in the optimised version (*enhanced binlog*) turned on by the parameters we'll see shortly; Aurora PostgreSQL uses logical replication. No external process needs to query the database.

On the Redshift side, data lands in a dedicated database created from the integration. Tables keep the names and structure of the source ones, and the integration replicates the schema too, not just the data.

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

In addition, `binlog_transaction_compression` must not be on and `binlog_row_value_options` must not be set to `PARTIAL_JSON`.

For Aurora PostgreSQL the equivalent is:

```text
rds.logical_replication             = 1
aurora.enhanced_logical_replication = 1
aurora.logical_replication_backup   = 0
aurora.logical_replication_globaldb = 0
```

If the parameter group is attached to an existing cluster, the primary instance needs a reboot, to be planned in a maintenance window.

**On the data warehouse** the target can be Redshift Serverless or an encrypted provisioned cluster with at least two RA3 nodes. The `enable_case_sensitive_identifier` parameter must be turned on, because MySQL and PostgreSQL distinguish upper and lower case in names and Redshift, by default, doesn't. On Serverless it's set from the CLI, because the console doesn't allow it. Finally, the integration has to be authorised with a *resource policy* on the data warehouse, stating which source database can write to it and who can create the integration.

**The integration** is created from the RDS console, the CLI (`aws rds create-integration`) or through the API and SDKs. This is also where you define the **data filters**: which databases and tables to include or exclude. It's a step not to underestimate, as we'll see shortly.

**The target database**, finally, is created in Redshift with a SQL command:

```sql
-- Aurora MySQL
CREATE DATABASE aurora_sales FROM INTEGRATION '<integration_id>';

-- Aurora PostgreSQL: the source database must be named too
CREATE DATABASE aurora_sales FROM INTEGRATION '<integration_id>' DATABASE 'sales';
```

From that moment the tables appear in Redshift and start catching up.

## What comes through, and what doesn't

This is the part worth knowing before promising anything to the business.

**A primary key is required.** Tables without a primary key aren't replicated (on Aurora PostgreSQL they end up in a failed state). In older application databases this happens more often than you'd think, especially for log or relationship tables. It's worth taking an inventory before starting.

**Not all data types are supported.** Most columns map without problems, but some types aren't supported. Watch out for very long values too: a Redshift `VARCHAR` holds at most 65,535 bytes, and if a source value doesn't fit, replication of that table stops and the table goes into a failed state. The `TRUNCATECOLUMNS` parameter lets you truncate those values instead of blocking the table. The AWS documentation has an up-to-date data type mapping, to be checked against the real schema.

**Schema changes come at a price.** DDL commands on the source, such as an `ALTER TABLE`, can trigger a resynchronisation of the table, during which the table can't be queried in Redshift. It's worth coordinating schema changes with whoever uses that data, rather than finding out from an empty dashboard.

**Filters decide what enters the data warehouse.** Without filters the integration replicates everything, including technical tables, application queues and data that isn't needed in the data warehouse or shouldn't be there at all. On Aurora MySQL a filter like `include: sales.*, exclude: sales.audit_log` brings only what you need; on Aurora PostgreSQL the format includes the schema too (`include: sales.*.*, exclude: sales.*.audit_log`). It's also the first governance tool: data that isn't replicated doesn't have to be protected downstream.

**Sensitive data arrives as it is.** The integration applies no transformations during replication: it doesn't mask, pseudonymise or encrypt individual fields. If the customer table holds tax codes, IBANs or email addresses, they reach Redshift in clear text. Protection has to be built on the data warehouse, with permissions on the replicated database, dynamic data masking and row-level security on the objects users actually query. It has to be designed before access is opened, not after.

## After landing: the T is still yours

Having the application tables in Redshift, updated within seconds, is an excellent starting point, but it isn't a data warehouse. Source tables are modelled to make an application work: normalised, with codes instead of descriptions, statuses expressed as numbers, business logic spread across the code rather than the data. Handing these tables directly to analysts means shifting the work of interpretation onto each of them, with inevitably different results.

The model that works best is to use the replicated database as the **bronze layer** of a medallion architecture, and build the other layers on top of it.

- **Materialized views with automatic refresh.** Redshift lets you create, in another database, materialized views with auto refresh built on the replicated tables. It's the most direct way to keep a silver or gold layer almost as fresh as the source, without external schedulers.
- **Transformation tools such as dbt.** They work as usual: they read from the replicated database and write to a separate one. The frequency is worth choosing carefully, because a model refreshed every hour cancels out the advantage of a replication that arrives within seconds.
- **History mode.** By default, replication only shows the current state of rows: if a customer changes address, the old value disappears. By turning on *history mode* for specific tables, Redshift keeps every version of every row, with three extra columns (`_record_is_active`, `_record_create_time`, `_record_delete_time`) telling when a version was created and when it was superseded. The result is very close to a type 2 slowly changing dimension managed by the platform. For master data and statuses needed to reconstruct the past, it's a valuable feature. Worth knowing: materialized views on history-mode tables are always fully recomputed.
- **Refresh interval.** With `ALTER DATABASE ... INTEGRATION SET REFRESH_INTERVAL` you set how many seconds to wait between one refresh cycle and the next: the default is 0, meaning no pause. Lengthening it reduces compute usage when a few seconds aren't really needed.

In other words, zero-ETL removes the plumbing, not the design. Those who adopt it thinking they can do without data modelling end up with a very fast data warehouse that's hard to use.

## Monitoring

A managed integration is easier to run, but it doesn't run itself. The trickiest point is that problems tend to be silent: a table in error stops updating while all the others keep going, and the dashboards using it show stale data without any obvious sign.

The tools to notice are there.

- In Redshift, system views such as `SVV_INTEGRATION`, `SVV_INTEGRATION_TABLE_STATE` and `SYS_INTEGRATION_ACTIVITY` show the state of the integration, the state of each individual table and the synchronisation activity.
- In CloudWatch there are metrics to set alarms on, such as `IntegrationLag` (the delay between a commit on the source and its availability in Redshift) and `IntegrationNumTablesFailedReplication` (the tables in error).
- Redshift sends integration-related events to Amazon EventBridge, from which notifications can be routed.

The practical advice is to treat latency as a service indicator: a clear threshold (five minutes, for example), an alarm when it's exceeded, and a periodic check that no table has ended up in an error state. If the business gets used to data from a few seconds ago, a one-hour delay is an incident and should be treated as one.

## Costs

AWS doesn't charge for the integration itself. You pay for the resources it uses: on the Aurora side, the additional I/O and storage to capture changes and the snapshot export for the initial load; on the Redshift side, the compute needed to apply them and the storage of replicated data; and any data transfer between different availability zones.

The item to keep an eye on is mainly the second. With Redshift Serverless, a continuous flow of changes keeps the data warehouse active far more often than a nightly load, and the bill reflects it. It's a cost to compare with what it replaces: CDC services, loading jobs, intermediate storage and, above all, the hours spent keeping everything running. In my experience the comparison is almost always favourable, but it has to be done with real numbers, not the ones on the slides.

## When it isn't enough

Zero-ETL is the right choice for a very specific case: bringing tables from an AWS database into Redshift, exactly as they are, as quickly as possible. Outside that scope, other tools are needed.

- **Transformations in flight.** If data has to be enriched, filtered by row or anonymised before reaching the data warehouse, zero-ETL doesn't allow it. You need AWS DMS, Glue or a streaming pipeline.
- **Unsupported sources.** The list of sources keeps growing, and now includes self-managed databases too, but an engine that isn't on it needs a traditional CDC solution.
- **Targets other than Redshift.** If the architecture is centred on a lakehouse, there are zero-ETL integrations towards the Amazon SageMaker lakehouse too, with different characteristics to be assessed separately.
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

## Sources

Official AWS documentation consulted for this article.

**Amazon Aurora**

- [Aurora zero-ETL integrations](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/zero-etl.html): overview, supported sources, limits and costs
- [Getting started with Aurora zero-ETL integrations](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/zero-etl.setting-up.html): Aurora cluster parameters
- [Creating Aurora zero-ETL integrations with Amazon Redshift](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/zero-etl.creating.html): creating the integration
- [Data filtering for Aurora zero-ETL integrations](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/zero-etl.filtering.html): filter syntax
- [Amazon Aurora zero-ETL integration with Amazon Redshift](https://aws.amazon.com/rds/aurora/zero-etl/): product page and pricing

**Amazon Redshift**

- [Zero-ETL integrations](https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-using.html): overview on the data warehouse side
- [Considerations when using zero-ETL integrations](https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl.reqs-lims.html): requirements and limits
- [Configure authorization for your data warehouse](https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-using.redshift-iam.html): resource policy
- [Creating destination databases](https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-using.creating-db.html): destination database
- [History mode](https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-history-mode.html)
- [Querying and creating materialized views with zero-ETL integrations](https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-using.querying-and-creating-materialized-views.html)
- [Monitoring zero-ETL integrations](https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-monitoring.html) and [CloudWatch metrics](https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-using.metrics.html)
- [CREATE DATABASE](https://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_DATABASE.html) and [ALTER DATABASE](https://docs.aws.amazon.com/redshift/latest/dg/r_ALTER_DATABASE.html): SQL reference
- [Refreshing a materialized view](https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-refresh.html)
