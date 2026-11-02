---
title: "AI's problem with data isn't writing the SQL. It's knowing what \"active customer\" means"
description: "Asking your data questions in plain language works today. But if a company hasn't decided what its numbers mean, AI will decide for it, without saying so."
date: 2026-11-02
tags: ["AI", "Data Analytics", "Data Governance", "KPI"]
draft: true
---

Take a simple question: how many active customers do we have?

Ask three departments. Marketing counts the people who opened the app in the last month. Sales counts those with a contract in place. Finance counts only those who generated revenue in the period. You get three different numbers, each correct by its own definition, and the meeting that was supposed to produce a decision turns into a debate about which one is right.

Anyone who works with data knows this scene. What's new is what happens when the same question goes to an AI assistant connected to the data warehouse.

## SQL was never the hard part

For years the limit was access: to get a number, you waited for a report or went through someone who could write the query. Generative AI has lowered that barrier a long way. Today you describe the question in plain language and get a query in seconds, often a correct one. That is real progress.

But writing the query was only the last step. Before it came another, less visible one: working out what the person asking really meant. Faced with "active customers", a good analyst answers with more questions. Active in what sense? Over what period? What do you need the number for? That is how the ambiguity gets resolved before it becomes a result.

A model that nobody has given this context tends to behave differently: it picks the most plausible interpretation based on what it can find, such as table and column names, and carries on.

## Two correct queries, two different answers

Imagine a fintech with a consumer payments app. Someone asks the assistant how many active customers there are, and it generates this query:

```sql
select count(distinct customer_id) as active_customers
from fact_transactions
where transaction_date >= current_date - 30;
```

It's clean, readable and returns 18,400. The company, however, counts as active only those with an open contract and at least one successful purchase, leaving out internal accounts:

```sql
select count(distinct t.customer_id) as active_customers
from fact_transactions t
join dim_customer c on c.customer_id = t.customer_id
where t.transaction_date >= current_date - 30
  and t.transaction_type = 'PURCHASE'
  and t.status = 'SETTLED'
  and c.contract_status = 'ACTIVE'
  and c.is_internal = false;
```

The result is 12,100, about a third lower. The numbers are made up, but the pattern is realistic: the first count sweeps in declined transactions, refunds, closed contracts and test accounts.

Neither query contains an error. Both run and produce a credible number. The difference lies in a business decision that isn't written down anywhere in the database, so no technical check can flag it.

## Why AI raises the stakes

The ambiguity was already there. AI changes four things.

- **Volume goes up.** Numbers used to pass through a few people. Now anyone can produce dozens in an afternoon.
- **The human filter disappears.** The analyst who would have said "careful, that field isn't reliable" is no longer between the question and the answer.
- **The format inspires trust.** A well-written, confident answer invites less checking than a spreadsheet full of notes.
- **The answer can change.** The same question, rephrased, can produce a different query and therefore a different number.

That last point is the most dangerous. When two people get different results from the same tool, they don't just lose trust in the assistant. They lose trust in the data.

## What to do before connecting AI to your data

None of this is new: these are the foundations our profession has known for decades. What has changed is the cost of not having them.

1. **Choose the metrics that matter.** You don't need to map everything. Start with the ones that reach leadership meetings.
2. **Write down the definition and the owner.** Each metric needs a calculation rule, inclusions, exclusions, a time period and the name of whoever decides. This step is organizational, not technical. If marketing and finance need different concepts, both are fine as long as they have different names: "active app users" and "active paying customers".
3. **Make definitions executable.** A glossary on a wiki isn't enough. Metrics need to live in a semantic layer or in certified views, so the assistant uses that definition instead of rebuilding it each time.
4. **Look after data quality.** A well-defined metric on incomplete or late data gives you a wrong number very consistently. You need automated tests and checks on data freshness.
5. **Verify the answers.** Prepare a set of test questions with expected results and rerun it after every change. Make sure the assistant shows the definition it used and the query it ran, and asks for clarification when a question is ambiguous.

## A test to get started

Before you evaluate tools and architectures, there's a quick experiment you can run. Take the five questions management asks most often and put them separately to two analysts, or to an analyst and an AI assistant. Then compare both the numbers and how each one got there.

If they match, you have a good base to build on. If they don't, you've just found out where to start, and AI has little to do with it.

AI doesn't eliminate the work on data. It makes that work more visible, because every missing definition can turn into a wrong answer in front of the people who have to decide. Writing the query is cheap now. Deciding what the numbers mean is still the company's job.
