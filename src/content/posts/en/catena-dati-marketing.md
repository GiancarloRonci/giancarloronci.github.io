---
title: "Marketing data breaks between teams: someone has to own the chain"
description: "Between the marketing teams that use the data, the team that runs the martech tools and the team that runs the data platform, every piece works and the number is still wrong. Requirements, tracking plans, consent, latency and quality: what it means to own the whole chain."
date: 2026-11-11
categories: ["data-governance", "data-quality"]
cover:
  src: "/assets/images/posts/catena-dati-marketing.svg"
  alt: "Three blocks in a row, marketing tools, data platform and report, joined by a chain; where the chain breaks, a person holds the two ends together"
tags: ["Martech", "Data Governance", "Data Quality", "Consent Mode", "Google Analytics 4", "BigQuery"]
updated: 2026-11-11
draft: false
---

On Monday a campaign goes live on a new channel. On Thursday the conversions dashboard shows a 30% drop on the week before, and the marketing team asks what is going on.

The team that runs the marketing tools checks the tag manager: the tags fire, the events reach the analytics tool. The data platform team checks the pipelines: every job is green, no load errors. The analytics team checks the dashboard query: it hasn't changed in months.

All three are right. And the number is still wrong.

After two days of messages the cause turns up: the cookie banner was updated along with the new channel, and a consent parameter that wasn't handled before now defaults to denied in some markets. The events still arrive, but without the identifier the pipeline uses to join them to orders. No piece broke. What broke is the point where one piece hands over to the next.

## Three teams, one chain

In most companies of a certain size, a piece of marketing data passes through at least three pairs of hands before it becomes a number in a report.

- **The people who use the data**: marketing and the analytics teams that measure campaigns and channels, segment customers, and build attribution or propensity models.
- **The people who run the martech tools**: often an IT or digital team that selects, buys and configures tag managers, CDPs, app SDKs, advertising and marketing automation platforms.
- **The people who run the data platform**: the central team that brings data into the data warehouse, transforms it, and keeps it available and secure for the whole company.

Each of these teams has sensible goals and measures its work in a sensible way. The martech team measures whether the tools are live and configured. The platform team measures whether the pipelines run. Marketing measures campaigns. None of the three, by design, measures whether the data gets from start to finish with the right meaning.

So problems live in the joints: a renamed field in an event, a new tool that exports data at a different grain from the old one, a consent change, a different time zone between two systems. Problems nobody caused alone, and nobody alone has the job of finding.

## The missing role

The classic answer is a committee. The one that works better is a person: someone who owns the whole chain, from the systems where events are born to the data ready for analysis, and who speaks for the people who use that data.

Companies give this role different names: data platform manager, data product owner, marketing data governance lead. The name matters little. Three things it does matter.

1. **It translates.** It turns marketing's needs into requirements a technical team can build, and explains to marketing what is possible, how long it takes and what it costs.
2. **It negotiates.** The martech and platform teams have their own priorities and backlogs, which serve other parts of the company too. This person brings marketing's needs into their planning and agrees timelines and service levels.
3. **It owns the outcome.** When the number is wrong, this is the person who coordinates the search for the cause, even when the cause sits in someone else's system.

One trait makes the role hard: it almost always works without line authority over the teams it depends on. It can't order the platform team to move a piece of work forward. It can only make that work worthwhile, clear and well argued. It's the same theme I wrote about in the post on [data governance](/posts/data-governance-chi-decide/): the problem is rarely the technology, and almost always who decides what.

## Requirements another team can build

"We need the data from the new email marketing platform in the warehouse" is not a requirement. It's a wish. The platform team will have to guess almost everything, and will guess differently from what was needed.

A useful requirement answers a few precise questions:

- **Which objects and events**: sends, opens, clicks, unsubscribes, bounces? List and campaign master data?
- **At what grain**: each event per recipient, or daily totals per campaign? The difference decides which analyses will be possible, forever.
- **With how much history**: from when is the data needed, and does the tool really allow a backfill?
- **With which keys**: how does a recipient join to a CRM customer or a website user? If the tool doesn't export a shared identifier, no pipeline can rebuild it.
- **With what latency**: is the data needed within minutes, by the next morning, or is once a week enough? There's an example further down of how much this question weighs.
- **Under which consent and privacy constraints**: in which markets, on which legal bases, for how long it can be kept.
- **For which uses**: reporting, activation towards other platforms, machine learning models.

The last question is the one most often forgotten, and today it's the most expensive one to forget. A propensity or churn model needs things a report doesn't ask for: a long and stable history, identifiers consistent over time, definitions that don't change halfway through a series, and the ability to rebuild what the data looked like on a given date. If these requirements don't go in at the start, the data the first AI project needs will be ready for reports and useless for the model.

## The tracking plan is a contract

Much of marketing data is born as events: a page view, a product added to the cart, a purchase, a click on an email. The people who define them are often the martech team or whoever builds the website and the app. The people who use them sit two or three steps further on.

The **tracking plan** is the document that gets the two sides to agree: which events exist, what they're called, which properties they carry, of what type, which ones are required. It only works if it's treated as a contract, meaning something checked automatically and changed only through a procedure.

The simplest way to make it checkable is to write each event as a schema. A widely used standard is JSON Schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "purchase",
  "type": "object",
  "required": ["event_name", "event_timestamp", "order_id", "value", "currency", "market"],
  "properties": {
    "event_name": { "const": "purchase" },
    "event_timestamp": { "type": "string", "format": "date-time" },
    "order_id": { "type": "string", "minLength": 1 },
    "value": { "type": "number", "minimum": 0 },
    "currency": { "type": "string", "pattern": "^[A-Z]{3}$" },
    "market": { "type": "string", "enum": ["IT", "FR", "DE", "ES", "UK"] }
  }
}
```

With a schema like this, an event without an `order_id`, or with the currency written as `euro` instead of `EUR`, can be rejected or set aside at collection time, instead of reaching the warehouse and quietly spoiling a report three weeks later. And a change to an event becomes a change to the schema, which is proposed, reviewed and announced to everyone downstream before release.

The rules that make a tracking plan useful are few: one naming convention for all markets and channels, a version for each schema, an owner who approves changes, and an automated test comparing real events with the schema. The rest is documentation.

## A new tool, from contract to data in a table

The moment the chain breaks most often is when a new martech tool arrives. The usual path goes like this: marketing chooses the tool, the martech team configures it, and only at the end does someone ask the platform team to "get the data into the warehouse". By then the contract is signed and the choices that matter have been made.

It pays to reverse the order and treat a new tool as a single project, with all three parties involved from the start.

1. **Before choosing.** Check what the tool can export: API or file export, grain, available history, rate limits, exposed identifiers, consent handling. A tool that's great for marketing but only exports aggregate totals is a tool from which nothing new can ever be measured.
2. **During configuration.** Align settings with the tracking plan and existing conventions: event names, campaign codes, markets, currencies, time zones.
3. **While building the pipeline.** Agree on format, frequency, handling of late-arriving data, and what happens when the export schema changes.
4. **Before release.** Run an integration test with known events: generate ten test purchases, with different values and markets, and check that all of them arrive, unchanged, in the final table.
5. **At release.** If the tool replaces another, run both in parallel for a few weeks and compare the numbers. The difference must be explained before switching the old one off, not after.

## Real time or batch: ask for what you need

"We need the data in real time" is one of the most common requirements and one of the least discussed. Real time costs money, and above all it behaves differently from how people often imagine.

A concrete example is the Google Analytics 4 export to BigQuery. There are two main modes. The **daily export** writes one table per day with all the events of the previous day, usually in the afternoon, sometimes later. The **streaming export** writes data to an intraday table within minutes.

The detail that matters is in the documentation: streaming is a best-effort service, with no completeness objective, and may contain gaps. Some data, such as the traffic source of new users and new sessions, isn't exported in streaming. Google itself recommends using the daily table when you need stable data. And even the daily table isn't final straight away: Analytics may update it for two more calendar days past the table date, for events that arrive late.

There are two practical consequences. A report reading the streaming table and one reading the daily export will give different numbers for the same day, and both will be correct for what they are. And yesterday's number, read this morning, may change tomorrow.

That's why the right question isn't "how fast?" but "to do what?". Stopping a campaign that's burning budget needs data within minutes, even incomplete. The weekly performance report by channel needs complete, stable data, and can wait. They are two different products, with two different service levels, and calling both "marketing data" is where the confusion begins.

## Consent is part of the data's definition

In the opening example, the drop in conversions came from a consent change, not a technical fault. It's a common case, because in Europe consent decides what arrives, before it decides how.

With Google Consent Mode, for instance, the site tells Google's tags the state of four main parameters: `ad_storage` and `analytics_storage`, which cover the use of cookies and identifiers for advertising and analytics, and `ad_user_data` and `ad_personalization`, which cover sending user data to Google for advertising and personalised advertising. If `ad_user_data` is denied, for example, the `user_id` and enhanced conversions data are not sent.

The mode chosen matters too. In **basic** mode, tags don't fire until the user answers the banner, and if the user declines nothing arrives, not even the consent status. In **advanced** mode, tags fire straight away and, while consent is denied, send cookieless measurements that Google uses to model the missing conversions.

For whoever owns the chain, this has three implications.

- **A change to the banner is a change to the data.** It should be handled like a schema change: planned, announced to the people who use the data, noted in the time series.
- **Numbers before and after a consent change aren't comparable** without an adjustment. A 30% drop may be a drop in measurement, not in sales.
- **Rules change from market to market.** A platform serving several countries must know, for each piece of data, under which consent it was collected, and must be able to filter on it.

The same reasoning applies to the other classic problems of marketing data, such as attribution and recognising the same user across devices. They have no final technical solution: they have a choice, which someone must make, write down and apply consistently.

## Measure the chain, not the pieces

If each team measures only its own piece, every indicator can be green while the final number is wrong. You need a few measures that look at the whole chain.

The most useful vocabulary for this comes from running IT services. An **SLI** is a quantitative measure of some aspect of the service. An **SLO** is the target value for that measure. An **SLA** is an agreement with consequences if the target is missed. Between teams in the same company, SLIs and SLOs are almost always enough, as long as they are written down and shared.

For marketing data, the indicators that matter are few:

- **Completeness**: purchases recorded as events, compared with orders in the order management system for the same day. That system is the official source; the gap between the two is the first sign of a problem in the chain.
- **Freshness**: at what time yesterday's data is available and stable in the warehouse.
- **Latency**: how long it takes from an event to its availability, for use cases that need fast data.
- **Validity**: the share of events rejected or flagged because they don't match the schema.
- **Consent**: the share of events with full consent, by market. A sudden change is almost always an upstream change, not a change in user behaviour.

A completeness check can be simple:

```sql
select
  o.order_date,
  o.market,
  count(distinct o.order_id) as orders_backend,
  count(distinct e.order_id) as orders_tracked,
  round(100.0 * count(distinct e.order_id) / nullif(count(distinct o.order_id), 0), 1) as completeness_pct
from orders o
left join events_purchase e
  on e.order_id = o.order_id
where o.order_date >= current_date - 14
  and o.channel = 'online'
group by 1, 2
order by 1 desc, 2;
```

The right value isn't 100%: a user who declines cookies or runs an ad blocker won't be tracked. The right value is a stable one. If a market drops from 85% to 60% in a day, something has changed, and you find out the next day instead of at the monthly meeting.

When an indicator crosses its threshold, there has to be a clear path: who gets the alert, who checks which piece of the chain, how soon the data's users are told. And once a month a short service review with all three teams is worth having: the period's incidents, their causes, what changes so they don't happen again. It's the moment when the chain stops being three separate services.

## Data products, not requests

One risk of this role is turning into a help desk that collects requests and forwards them to other teams. It works better to think in terms of data products: sets of data with a name, an owner, documentation, a service level and users you can count.

"Daily performance by channel and market" is a product. "The unified customer profile for campaign activation" is another. Each has its users, its latency and quality requirements, and a value that can be measured.

Thinking of them as products also changes what happens after release. You gather feedback from the people using them, you improve them, and the ones nobody uses get retired. It's the same reasoning as for the [dashboards nobody opens](/posts/dashboard-inutilizzate/): every dataset you maintain has a cost, and a dataset nobody uses costs without giving anything back.

## The skills it takes

People reach this role from one of two directions: data engineering or marketing analytics. Either way, something is missing.

Those coming from data engineering know pipelines, warehouses and models, but often know little about martech tools: how a pixel works, what an SDK does inside an app, how a tag manager decides when to fire a tag, what is really inside a CDP export. Without these basics it's hard to see where the chain breaks before it reaches the warehouse.

Those coming from marketing analytics know the questions and the tools, but often know less about ingestion, schemas and quality checks. You don't need to become a data engineer: you need solid SQL to check data on your own, some Python for checks and exploration, and enough familiarity with schemas and pipelines to talk with the platform team as a peer.

For everyone, there's also the part you can't learn from documentation: writing clear requirements, negotiating priorities with teams that don't report to you, saying no to a request and explaining why. In a role without direct authority, technical credibility is what makes influence possible.

## An exercise to start with

Pick a single number that marketing looks at every week: online conversions, for example. Then trace its path, from the user's click to the cell in the dashboard.

For each step, write down four things: which system handles it, which team owns it, in what format the data passes to the next step, and which check verifies it arrived correctly.

There are usually between six and ten steps. And there is usually at least one where the checks column is empty, and at least one where the owner column holds two names or none. That's where the chain will break next time. And that sheet, a single page, is the first working tool for whoever decides to take care of the whole chain.

## Sources

Pages used to write and verify this post.

- [[GA4] BigQuery Export](https://support.google.com/analytics/answer/9358801) (Google): the daily and streaming export modes, streaming without a completeness objective, and updates to daily tables for late-arriving data
- [Consent mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode) (Google): the consent parameters and the difference between basic and advanced mode
- [Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) (Google, *Site Reliability Engineering*): the definitions of SLI, SLO and SLA
- [JSON Schema](https://json-schema.org/) (JSON Schema): the standard used in the example to describe and validate events

## Further reading

- [Open Data Contract Standard](https://bitol-io.github.io/open-data-contract-standard/) (Bitol): an open standard for writing data contracts between those who produce data and those who use it
- [Data Mesh Principles and Logical Architecture](https://martinfowler.com/articles/data-mesh-principles.html) (Zhamak Dehghani): the idea of data as a product, with an owner and users
