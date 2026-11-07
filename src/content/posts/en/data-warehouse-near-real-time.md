---
title: "A data warehouse updated within seconds: why it's a strategic choice, not a technical one"
description: "For years the data warehouse told us how yesterday went. Today it can tell us what's happening now, a few seconds behind, without building two platforms. What it changes for the business, and when it's worth it."
date: 2026-11-07
categories: ["data-architecture", "data-engineering", "data-strategy"]
cover:
  src: "/assets/images/posts/data-warehouse-near-real-time.svg"
  alt: "On the left a single block of data loaded overnight, on the right a continuous stream of events flowing into the data warehouse and immediately updating a chart"
tags: ["Data Warehouse", "Near Real Time", "Streaming", "CDC", "Data Architecture"]
updated: 2026-11-07
draft: false
---

Tuesday, 10:15 a.m.

At a company that processes payments, the rate of declined transactions starts to climb. Not by much: a few percentage points, concentrated on a single card network. The data warehouse is loaded every night, so the dashboard that should show it is stuck at the previous midnight. Customers notice first, then customer support, and finally someone runs a query directly against the production database to figure out what's going on.

The next day at nine, the chart shows a clear spike. It's correct, complete and by now useless.

This scene sums up the historical limit of the data warehouse: it was designed to tell the story of the past. For many years that was a reasonable trade-off. More and more often today, it isn't.

## What we mean by "near real time"

It's worth pinning down the terms, because "real time" is one of the most overused expressions in the industry.

A near real-time data warehouse is one where the time between an event in the source system (a payment, an order, a change to a customer record) and the moment that event can be queried in SQL is a few seconds, a few dozen at most. Not milliseconds: those remain the job of operational systems and stream processing engines. And not "every hour" or "every fifteen minutes", which is micro-batching, useful but different.

The measure that matters is just one: **end-to-end latency**, the distance between when something happens and when the person who has to decide can see it. That measure is what changes the way a company uses its data.

## Why it's strategic

The value of a piece of data isn't constant over time. Some information is worth a great deal in the first few minutes and almost nothing the next day. A data warehouse that updates within seconds lets you capture exactly that value.

### From retrospective decisions to operational ones

With a nightly load, the data warehouse helps you understand what happened. A few seconds behind, it also helps you decide what to do now: stop a campaign that is generating fraud, move staff to customer support before the queues explode, notice that a product release has cut conversions while the release can still be rolled back.

It's a difference in kind, not in degree. Data stops being an archive to consult and becomes a management tool.

### One source of truth, operations included

When the data warehouse is a day old, urgent needs find another route: queries straight against production databases, manual exports, reports built inside applications with their own logic. Each of these shortcuts produces slightly different numbers and puts load on systems that weren't designed for analysis.

A data warehouse updated within seconds removes the very reason for these shortcuts. Operational and executive metrics come from the same place, with the same definitions. It's a governance advantage before it's a speed advantage.

### Trust in the numbers

"Data as of yesterday" is a phrase that weakens every dashboard. Whoever reads it knows the number in front of them may already be out of date, and tends to check it somewhere else. When the data is today's, the discussion moves from "is this number right?" to "what do we do?".

### AI and machine learning need fresh context

A fraud detection model working on features computed the night before sees a customer as they were yesterday, not as they are now. The same goes for recommendation systems, for churn models that need to catch a signal while the customer is still active, and for AI assistants that answer questions about company data. An assistant answering with yesterday's data gives answers that are correct but stale, and in many contexts a stale answer is a wrong answer.

### Data that becomes product

More and more companies expose analytics directly to their customers: a spending summary, a sales trend, the status of an order. If these views sit on the data warehouse, its latency becomes the product's latency. A few seconds is acceptable to a customer; a day is not.

### Quality problems found right away

There's also a less obvious benefit. If a source system starts sending bad data, with a nightly load you find out the next day, when the reports have already been read and perhaps forwarded. With a continuous flow, quality checks run all the time and the anomaly shows up within minutes, while it can still be stopped upstream.

## Why this setup is modern today

Near real time isn't a new idea. What's new is that you can do it without building two platforms.

For years the standard answer was the **lambda architecture**: a batch path for complete, reliable data, a streaming path for fast, approximate data, and a layer reconciling the two. It worked, but it meant two codebases, two sets of logic to keep aligned and numbers that, sure enough, didn't match. The cost was high enough that only a few companies could afford it.

In recent years several technology shifts have made the picture much simpler.

- **Log-based Change Data Capture.** Instead of periodically querying source databases, you read their transaction logs and propagate every insert, update and delete as it happens. The load on production systems is minimal, and you also capture deletes, which traditional incremental loads often miss.
- **"Zero-ETL" integrations and native streaming ingestion.** The major cloud providers now offer continuous replication from operational databases into the data warehouse, with delays measured in seconds and no pipelines to write and maintain. One example is the zero-ETL integration between Amazon Aurora and Amazon Redshift, which can also read directly from streams such as Kinesis and Kafka. Platforms like Databricks and Snowflake offer similar capabilities.
- **Incremental transformations.** Auto-refreshing materialized views, declarative tables and streaming pipelines recompute only what has changed, instead of reprocessing everything on every load.
- **Open table formats for the lakehouse.** Delta Lake and Apache Iceberg support continuous writes, updates and deletes with transactional guarantees. The same table can be fed by a stream and queried like any other data warehouse table.
- **Separation of storage and compute.** Continuous loading and analytical queries no longer compete for the same resources, so a steady stream of incoming data doesn't slow down the people analyzing it.

The result is an architecture with a single path: data comes in continuously, is transformed incrementally through the layers of the **medallion architecture** (bronze, silver, gold) and reaches the semantic layer and dashboards a few seconds later. In practice it's the **kappa architecture** made accessible: streaming as the default mode, batch as a special case.

That's why near real time is no longer an exotic choice for a handful of extreme use cases. It's the direction modern data platforms are heading.

## What changes for people, not just for the platform

Bringing the data warehouse down to a few seconds of latency is a technical project, but its most important effects are organizational. Treat it purely as a pipeline migration and you risk ending up with very fresh data that nobody uses any differently than before.

### From dashboards to alerts

Nobody watches a dashboard all day. If data refreshes every few seconds, the value isn't in a chart that moves, but in what happens when the chart crosses a threshold: an alert to the right team, a ticket opened automatically, a rule that blocks a suspicious transaction. Near real time moves analysis from "looking things up" to "reacting", and it requires deciding in advance which signals deserve action and who should take it.

### Organizational latency

There's one kind of latency no technology can reduce: that of decision-making processes. If data arrives in five seconds but the decision is made at Thursday's meeting, the gain is zero. Before investing in data speed, it's worth asking who has the authority to act right away, and with what tools. Often it's precisely this question that surfaces the most valuable use case.

### New skills in the data team

Working on continuous flows calls for concepts you could ignore with batch: the difference between when an event happens and when it's processed, handling duplicates, being on call when a pipeline stops in the middle of the night. You don't need rare specialists, but you do need training, and pipelines need to be treated as production services, not as scheduled scripts.

### Agreements with the owners of source systems

With CDC, every change to application databases reaches the data warehouse immediately. That's why an explicit agreement with product teams, often called a data contract, becomes important: which tables and fields are considered stable, how changes are announced, who gets notified. It's a conversation that strengthens collaboration between engineering and data, and it's best started before the first incident, not after.

## The price to pay

It would be misleading to present it as free. A data warehouse that updates within seconds comes with costs and complexity that need to be on the table.

- **Compute that's always on.** A nightly load uses resources for an hour; a continuous flow uses them all the time. The cost should be weighed against the value of the use cases it enables.
- **Data that arrives out of order.** In a continuous flow, events can arrive late, duplicated or in a different sequence from the one in which they happened. Pipelines need to be idempotent and handle these cases without double counting.
- **Schema changes.** With a nightly batch, a column added in the source system is a problem to fix the next morning. With CDC it propagates immediately, and the pipeline has to be ready to take it without stopping.
- **Metrics "in motion".** Today's revenue changes every minute. Users need to learn the difference between a partial figure for the current day and a consolidated one for a closed period, and dashboards need to make it obvious.
- **Freshness becomes a commitment.** Once the business gets used to data that's a few seconds old, a thirty-minute delay becomes an incident. Latency needs to be monitored like a service level indicator, with thresholds and alerts.

None of these is a reason to give up. They're reasons to design it well.

## How to decide where it's needed

Not all data needs to arrive within seconds. The annual budget, monthly board reporting or long-term cohort analysis work perfectly well with a daily refresh.

The question to ask, for each domain, is simple: **which decision would change if this data were a few seconds old instead of a day?** If the answer is "none", batch is fine. If the answer is concrete (block, intervene, alert, offer), that's where near real time creates value.

What usually comes out of this is a set of freshness tiers: a few seconds for payments, fraud, operations and customer-facing data; a few minutes for commercial monitoring; a day for consolidated executive and financial reporting. Having an architecture that supports all of them, with the same data model and the same definitions, is exactly what modern platforms make possible.

The best way to start isn't to redesign everything, but to pick one high-value use case, bring it down to a few seconds of latency and measure what changes: how many queries against production databases disappear, how much earlier problems are spotted, how many decisions are made with data rather than without it.

## From archive to nervous system

For a long time the data warehouse was the company's memory: reliable, complete, but always a step behind. A data warehouse updated within seconds is still the memory, but it also becomes something closer to a nervous system: it senses what's happening as it happens, and makes it possible to react.

The technology to do this is now mature, accessible and far simpler than it was a few years ago. The real question is no longer whether it can be done, but which decisions the company wants to be able to make when they really matter, which is now.
