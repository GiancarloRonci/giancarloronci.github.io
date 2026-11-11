---
title: "How to write a metric definition (and why \"revenue\" isn't enough)"
description: "A name is not a definition. The parts a definition needs so that people, reports and AI assistants can use it without ambiguity: what it includes, which date it refers to, how it adds up, where it comes from and who can change it."
date: 2026-11-11
categories: ["metadata-semantic-layer", "data-governance"]
cover:
  src: "/assets/images/posts/definire-una-metrica.svg"
  alt: "Three cards with the same title and three different numbers converge on a single definition card, laid out in rows, from which one number comes out"
tags: ["Metrics", "Semantic Layer", "Data Governance", "KPI"]
translationKey: "how-to-define-a-metric"
updated: 2026-11-11
draft: false
---

Almost every company has a metric everyone mentions and nobody has ever written down in full. It's usually revenue. Sales read it in the CRM, finance in the ERP, marketing in the e-commerce dashboard. It has the same name in all three places, and a different value in each.

None of the three gets the calculation wrong. Each calculates something different, under the same name. The problem isn't the SQL: it's that the metric has a name, but no definition.

## A name is not a definition

"Revenue for the month" seems clear until you try to calculate it. That's when the questions arrive.

- Does an order count when it's placed, when it ships or when it's invoiced?
- Are returns deducted? Those made in the month, or those relating to the month's orders?
- Are amounts with or without VAT? With or without shipping charges?
- Which day's exchange rate converts orders in foreign currencies?
- Midnight in which time zone ends the month?

Each of these questions has more than one reasonable answer. If nobody chooses, whoever writes the query chooses, every time, often without noticing. That's how three revenues are born.

The same goes for any metric: active customers, conversion rate, margin, churn. I wrote about it in the context of AI answering questions in plain language, in the post on ["active customer"](/posts/ai-active-customer/): an AI assistant facing a metric with no definition doesn't stop to ask, it picks a plausible version and presents it with confidence.

## The parts of a definition

A useful definition isn't a paragraph of free text. It's a card with a few fixed fields, always the same, that force you to answer the questions that matter.

1. **Name and description.** A unique name and one sentence saying which business question it answers. If two metrics answer different questions, they need two different names: "booked" and "invoiced", not two "revenues".
2. **Formula in words.** The calculation written so that someone who doesn't know the tables can follow it: "sum of the net amounts of invoices issued, minus credit notes issued in the same period".
3. **What it includes and excludes.** The explicit list of edge cases: returns, cancelled orders, test orders, internal customers, free items. It's the longest part, and the one that prevents the most arguments.
4. **Reference date.** Which date places an event in a period: order date, shipping date, invoice date. With the time zone and, where needed, the currency conversion rule.
5. **Grain and dimensions.** At what level of detail the metric makes sense, and by which dimensions it can be broken down: market, channel, product category. Not every breakdown is legitimate.
6. **How it aggregates.** Whether the metric can be summed across periods and groups, or not. I'll come back to this shortly, because it's the most underrated point.
7. **Official source.** The table, view or semantic layer metric the number must be taken from. Just one.
8. **Freshness.** How often it's updated, and when a period counts as closed. Can yesterday's revenue, read this morning, still change?
9. **Owner.** The business person accountable for the metric's meaning who approves changes. With a name, as I wrote in the post on [data governance](/posts/data-governance-chi-decide/).
10. **Change history.** What changed, when and why. A metric whose definition changes without a trace produces time series that look comparable and aren't.

Ten fields may seem a lot. In practice, for a well-understood metric, the card takes half an hour to fill in. For a metric that causes arguments, the half hour becomes a meeting: exactly the meeting that was needed.

## A filled-in example

Here's what the revenue card might look like for a company selling online and in stores.

| Field | Value |
| --- | --- |
| Name | Net revenue |
| Question | How much did we sell in the period, net of returns and VAT? |
| Formula | Sum of taxable amounts of invoices issued in the period, minus taxable amounts of credit notes issued in the period |
| Includes | Online and in-store sales, shipping charges billed |
| Excludes | VAT, orders cancelled before invoicing, employee sales, test orders |
| Reference date | Invoice or credit note date, Europe/Rome time zone |
| Currencies | Converted to euro at the ECB rate on the invoice date |
| Allowed dimensions | Market, channel, product category, store |
| Aggregation | Additive: sums across days, markets and channels |
| Official source | `net_revenue` metric in the semantic layer |
| Freshness | Updated every morning at 7; month closed on the third working day of the following month |
| Owner | Head of finance |
| Last change | Shipping charges included from 1 January, to align with the financial statements |

With this card, the gap between CRM revenue and ERP revenue stops being a mystery. The CRM counts orders when signed, the ERP counts invoices: they are two different metrics, and from today they can have two different names.

## The most underrated point: how it adds up

Many reporting errors don't come from a wrong definition but from a wrong aggregation. Metrics don't all behave the same way when you add them up.

- **Additive.** Net revenue can be summed across everything: the quarter's revenue is the sum of three months, the total is the sum of the markets.
- **Semi-additive.** An account balance or stock on hand can be summed across accounts or warehouses, but not over time. End-of-quarter stock isn't the sum of the three month-end stock levels.
- **Non-additive.** Ratios, percentages and distinct counts never sum. The conversion rate of two markets isn't the average of the two rates. The quarter's active customers aren't the sum of the three months' active customers, because the same customer can appear in all three.

For non-additive metrics, the definition must say how they are recomputed at each level. Conversion rate is the sum of conversions divided by the sum of visits for the group, not the average of the rates. If the definition doesn't say so, sooner or later someone will drag the column into a spreadsheet and take the average.

## From the card to code

A definition that lives only in a document is forgotten at the first reorganisation. The next step is to turn the card into code, in one place.

That's the job of the **semantic layer**: a layer between the data warehouse and the tools that use it, where each metric is defined once, with its formula, its dimensions and its aggregation. Reports, spreadsheets and AI assistants ask for the metric by name, and the semantic layer generates the correct SQL each time. Several tools do this, from the dbt Semantic Layer to LookML in Looker, to the semantic models of BI tools.

The tool matters less than the discipline. Some fields of the card end up in code: formula, dimensions, aggregation, source. Others stay as text: business question, edge cases, owner, history. What matters is that the two parts live together and change together.

## When the definition changes

Definitions change, and that's normal: the business model changes, an accounting rule changes, someone finds an edge case nobody had foreseen. The problem isn't change, it's silent change.

Three rules are enough to handle it.

- **Every change has an owner who approves it** and a date from which it applies.
- **The metric's users are told beforehand**, not when they notice the numbers have moved.
- **History is handled explicitly.** Either the past is recomputed with the new definition, or reports mark the point where the series changes. What you don't do is leave a series that changes meaning halfway through without saying so.

## An exercise to start with

Pick the metric most quoted in your company's meetings. Try to fill in the card on your own, field by field, without asking anyone.

The fields where you find yourself writing "it depends" or "I think" are your starting point. Take the card to two people who use the metric in different departments and ask them to correct it. If their corrections don't match, you've found two metrics with the same name. And it's much better to find out with a card in hand than in a budget meeting.

## Further reading

- [Additive, Semi-Additive, and Non-Additive Facts](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/additive-semi-additive-non-additive-fact/) (Kimball Group): how measures are classified by the way they can be summed
- [dbt Semantic Layer](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl) (dbt Labs): an example of a semantic layer where metrics are defined once and reused by tools
- [Measure types](https://cloud.google.com/looker/docs/reference/param-measure-types) (Google Cloud): how Looker distinguishes sums, averages, distinct counts and calculated measures
