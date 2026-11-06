---
title: "We have 400 dashboards and nobody knows which ones are used"
description: "Building a dashboard takes a few minutes, retiring one means knowing who uses it. So the BI estate grows by inertia, until nobody knows which number is the right one."
date: 2026-11-06
categories: ["bi-analytics", "data-governance"]
cover:
  src: "/assets/images/posts/dashboard-inutilizzate.svg"
  alt: "A grid of many faded dashboards, with a few highlighted and only one marked as official"
tags: ["Business Intelligence", "Dashboards", "Data Analytics", "Data Governance"]
updated: 2026-11-06
draft: false
---

The migration project starts with a harmless question. The vendor of the new BI tool asks how many dashboards need to be migrated, to estimate time and cost.

Someone exports the list from the old tool: 412 dashboards, almost two thousand reports, around sixty connected data sources. The number surprises everyone, but the real surprise comes with the second question: which of these are actually used?

Nobody knows. Every department head, when asked, says all of theirs are important. The data team suspects most of them haven't been opened in months, but has no way to prove it. So the migration plan includes everything, just in case: four hundred dashboards to rebuild, test and validate, many of which serve nobody.

Anyone who works with data knows this scene. And you don't need a migration to run into it: just open the "Shared" folder of any BI tool after a few years of use.

## How you get to 400

Nobody decides to have 400 dashboards. You get there one request at a time, and each one, on its own, made sense.

A manager needs a number for a meeting. An existing dashboard does almost what's needed, but not quite, and changing it would mean involving whoever built it: it's quicker to duplicate it. A project needs monitoring for three months; the project ends, the dashboard stays. Someone changes role and leaves behind a folder of reports nobody else knows about. A new self-service tool is launched with the goal, a good one, of making people autonomous, and within a year every team has its own version of monthly sales.

Then there are the dashboards built to answer a one-off question: an analysis of returns to understand an unusual spike, a comparison between two campaigns, a check requested by the CFO. The question gets answered, the dashboard stays published, and from that moment on it's part of the estate.

The mechanism is always the same. Building a dashboard is cheap, often a few minutes. Retiring one, on the other hand, means knowing who uses it, and that information is almost never there.

## Why nobody retires them

There's an asymmetry similar to the one behind [technical debt](/posts/debito-tecnico-priorita-business/). Whoever retires a useless dashboard gets no credit: nobody notices the absence of something they weren't using. Whoever retires a dashboard that was needed, by mistake, finds out immediately, perhaps from the director who can't find their report on Monday morning.

With all the risk on one side and an invisible benefit on the other, the rational choice for everyone is to touch nothing. Every dashboard, once published, becomes permanent by inertia.

On top of that there's an ownership problem. In many companies a dashboard has an author, the person who built it, but not an owner, someone accountable for its content who decides whether it should keep existing. The author is often in the data team and no longer remembers what it was for; the people who use it, if anyone does, don't feel they own it. Without an owner, nobody has the authority to decide, so nobody does.

## What they really cost

A dashboard nobody opens looks harmless. It isn't, for at least five reasons.

**Maintenance cost.** Every dashboard depends on tables, views and queries. When a source changes or a data model is modified, someone has to check what breaks. With 400 dashboards, every change to the data warehouse becomes a long and uncertain impact analysis, and improvements to the model are often dropped for fear of breaking something that maybe nobody looks at.

**Compute cost.** Many dashboards have scheduled refreshes, nightly extracts, automatic email deliveries. They consume data warehouse resources and BI tool licences even when nobody looks at them. It's not unusual to discover that a significant share of nightly refreshes feeds reports that haven't been opened in months.

**Conflicting numbers.** When there are five versions of monthly sales, built at different times with slightly different filters, sooner or later two people show up to a meeting with two numbers. It's the same "active customer" problem described in a [previous article](/posts/ai-active-customer/), multiplied by the number of copies.

**Trust.** Someone looking for a number who finds ten dashboards with similar names doesn't know which one is right. After a couple of failed attempts, they stop looking and ask someone for the number, or recalculate it in Excel. An abundance of dashboards produces the opposite of what they were built for: less autonomy, not more.

**Migrations and AI.** Every change of tool, every modernization project has to deal with the whole estate, useful or not. And if you want to connect an AI assistant to existing BI content, the clutter becomes a serious problem: the assistant can't tell the official dashboard from the copy abandoned two years ago, and may answer using the wrong one, with the same confidence it would have using the right one.

## Views don't tell the whole story

The first reaction is usually to look at usage statistics. Almost every BI tool records who opens what and when. It's the right starting point, but it needs careful reading, because usage numbers mislead in both directions.

Some dashboards look used and aren't. The one set as the home page gets opened every morning by everyone, but nobody really looks at it. A report emailed to fifty recipients shows as "delivered" every day, but probably ends up in a folder nobody opens. An automated extract feeds an Excel file that in turn, maybe, feeds something else.

Others look unused and are actually critical. The quarterly close dashboard is opened four times a year, by three people, but on those days it's essential. The regulatory reporting check is consulted once a year, during the audit. A rule like "retire everything that hasn't been opened in the last 90 days" would remove exactly these.

Statistics are for finding candidates, not for making the decision. They tell you where to look. After that you need a conversation with whoever requested the dashboard, or with whoever is supposed to use it.

## An inventory built for deciding

To get out of this situation you need an inventory. Not a perfect catalog, which would take months and be abandoned halfway, but a list with a few pieces of information for each dashboard:

- **who the owner is**, meaning the business person accountable for the content, not whoever built it;
- **what it's for**, in one sentence: which decision it supports or which process it feeds;
- **how much it's used**, from the tool's statistics, taking seasonality into account;
- **what it depends on**, meaning the main tables and sources;
- **which tier it belongs to**, according to a simple classification.

The classification is the most useful part. Three tiers are enough:

1. **Certified.** A few dashboards, often fewer than thirty, holding the company's official numbers. They have an owner, documented definitions, quality checks and a team that guarantees they work. If two numbers disagree, this one wins.
2. **Team.** Operational dashboards a department uses for its daily work. They have an owner in the department and can use specific logic, but they aren't the official source for company numbers.
3. **Personal or exploratory.** Individual analyses, prototypes, one-off checks. They live in a separate space, aren't presented as an official source and have an expiry date.

This distinction changes the conversation. It's no longer about whether a dashboard "is needed", a question everyone answers with yes, but about which tier it belongs in. And each tier has different rules for maintenance, support and lifetime.

## Retiring without causing damage

With the inventory in hand, the fear of retiring the wrong thing is handled with a gradual process, in which every step can be undone.

1. **Identify candidates.** Dashboards with no owner, no meaningful access for many months, obvious duplicates of other dashboards. This list is usually longer than expected.
2. **Look for an owner.** For each candidate, contact the last known requester or the relevant department. If someone claims it, they become the owner and its purpose gets recorded. If nobody answers within an agreed deadline, the silence is already information.
3. **Hide before deleting.** Candidate dashboards are removed from view and moved to an archive, with a clear message for anyone who tries to open them: who to contact to restore them. This is the most important step, because it turns a potentially serious mistake into a request that takes minutes to resolve.
4. **Wait long enough.** The archive period should cover at least one full business cycle: a quarter, ideally including a close. That way even seasonal dashboards have time to be noticed.
5. **Actually delete.** Whatever nobody asked for during the archive period can be removed, together with its refreshes, automatic deliveries and, where possible, the tables that existed only to feed it.

Let's take an example, with made-up but realistic numbers. Of the initial 412 dashboards, 160 haven't been accessed in more than six months and another 110 are duplicates or variants of existing dashboards. After the archiving process, about 140 remain, and there are six requests to restore one. Each of those six brings valuable information with it: that dashboard now has an owner and a stated purpose.

There's also a side benefit. The dashboards that remain often get better. When the same metric is no longer spread across five copies, you can invest in a single version, make it clearer, document it and bring it up to the certified tier.

## Not going back to 400

Cleaning up once is useful. But if the rules that produced 400 dashboards stay the same, in two years you'll be back where you started. You need a few simple rules, applied to every new shared dashboard.

- **Every shared dashboard has an owner.** No name, no publishing. When the owner changes role, ownership passes to someone else or the dashboard goes into review.
- **Every dashboard states what it's for.** One line is enough: which decision it supports, which process it feeds. If you can't write that line, maybe the dashboard isn't needed.
- **Personal space is separate from shared space.** People must be able to explore freely, and rightly so. But a personal analysis doesn't become a shared source just because it was saved in the wrong folder.
- **Exploratory dashboards have an expiry date.** Ninety days, for example, renewable with one click. If nobody renews them, they go to the archive.
- **Before building a new one, look for the existing one.** If the existing one isn't enough, consider extending it rather than duplicating it. This only works if changing an existing dashboard is easy: if it's harder than building a new one, people will keep duplicating.
- **A periodic review.** Twice a year, the data team pulls the list of dashboards with low usage or no owner and starts the same archiving process. Done regularly, it takes a few days; done every five years, it becomes a project.

None of these rules limits self-service. On the contrary, they make it sustainable: people can build what they need, knowing the shared space stays tidy and the official numbers are recognizable.

## The point isn't the number

It would be a mistake to turn all this into a numeric target, like "we need to get below a hundred dashboards". A large company with many processes may need hundreds of dashboards. The problem isn't how many there are, but not knowing which ones matter.

The question to ask isn't "how many dashboards do we have?", but "if an executive asks where to find the official sales number, can we point them to a single answer?". If the answer is yes, the BI estate works, whatever its size. If the answer is "it depends", there's work to do.

## A test to start with

There's an exercise you can do in an afternoon. Export from your BI tool the list of shared dashboards with the date each was last accessed. Then count three things: how many haven't been opened in the last six months, how many have no owner you could name, and how many different versions exist of your company's most important metric.

If the three numbers seem acceptable, your BI estate is in good health. If they surprise you, you've found the topic for your next meeting with the business: not as a request to clean up, but as an early answer to a question someone will ask sooner or later, perhaps during a migration, perhaps in front of two different numbers for the same thing.

Dashboards exist to support decisions. When there are so many that nobody knows which ones to look at, they stop doing that.
