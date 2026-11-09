---
title: "Data governance isn't a committee: it's knowing who decides"
description: "Many data governance programs produce policies, catalogs and meetings, but leave open the question that matters: when two numbers disagree, who has the authority to decide which one is right?"
date: 2026-11-09
categories: ["data-governance", "data-strategy"]
cover:
  src: "/assets/images/posts/data-governance-chi-decide.svg"
  alt: "Tangled lines from different departments converge on a single piece of data, above which one person with an approval badge decides, and a single tidy line comes out"
tags: ["Data Governance", "Data Ownership", "Data Strategy", "Data Quality"]
updated: 2026-11-09
draft: false
---

The data governance program starts with everything in place. There's a sponsor on the executive team, a steering committee that meets every month, a forty-page policy document. A data catalog tool gets bought and the data team spends months documenting tables and columns.

Eighteen months later, the catalog holds thousands of described objects, the committee minutes fill a shared folder and the policy has been approved. Then, in a budget meeting, sales presents one figure for quarterly revenue and finance presents another. The gap is a few percentage points, enough to change the discussion.

Someone asks which one is right. Silence. The data team can explain where each number comes from, but has no authority to say which one counts. The committee meets in three weeks. And the forty-page policy doesn't say who decides what revenue means.

The program produced a lot of work. It didn't produce the one thing needed at that moment: a person who could decide.

## Why so many programs stall

Governance programs that stall tend to look alike. Not because they're badly run, but because they start in the wrong place.

**They start from the framework, not the problem.** A complete reference model is adopted, with all its areas, and the program tries to cover them all. The result is broad, even work, in which the table nobody uses gets the same attention as the number the annual accounts are closed on.

**They confuse governance with documentation.** Describing data is useful, but describing isn't deciding. A catalog can say the `revenue` column holds revenue; it can't say whether revenue should include returns, or who has the final word on that.

**They hand governance to the data team.** It's the most natural choice and the most fragile. The data team knows the tables, but definitions belong to the business: what an active customer is, when an order counts as closed, which margin is the official one. If the data team decides, its decisions get challenged at the first inconvenient number. If the data team doesn't decide, nobody does.

**They name owners only on paper.** A table gets filled in with a name for each data area, often a senior executive, who has neither the time nor the information to play that role. The name is there, the accountability isn't.

## Governance means decision rights

The formal definitions of data governance, starting with the one in the DAMA-DMBOK, put the exercise of authority and control over data management at the center. Put more simply: governance establishes who can decide what, about which data, and how disagreements get resolved.

Everything else, catalogs, policies, committees, tools, serves that purpose. If decisions have no owner, the rest produces apparent order, but doesn't solve the revenue problem in the budget meeting.

In practice, the decisions that matter are few, and they fall into four families.

1. **Definition.** What a piece of data or a metric means: what it includes, what it excludes, which date it refers to. It's the most frequent decision and the one that generates the most conflict, as with the ["active customer"](/posts/ai-active-customer/).
2. **Quality.** What level of quality is acceptable for a given use, and what happens when it isn't met: the report is blocked, it's published with a warning, or it goes ahead anyway.
3. **Access.** Who can see which data, at what level of detail, and who approves exceptions.
4. **Change.** Who approves a change that alters the meaning of a piece of data or breaks something downstream, and how much notice must be given.

For each of these families, on the data that matters, there must be an answer to the question "who decides?". Not "who looks after it", but who has the final word.

## Three roles, in plain words

The governance literature uses many names for roles. Three are enough, as long as you're clear about what each one does.

- **The data owner.** A business person accountable for the meaning and use of a set of data: for example, the head of finance for revenue. They make the definition decisions, accept or reject quality thresholds, approve sensitive access. They don't need to know the tables; they need to know the process and have the authority to decide.
- **The data steward.** The person who knows that data in everyday work: where it originates, which exceptions exist, why a number sometimes doesn't add up. They keep definitions up to date, collect questions, prepare decisions for the owner. Often the most important figure and the least recognized.
- **The data custodian.** The team that runs the platforms and pipelines and turns decisions into practice: implementing quality checks, configuring access, applying changes.

The most common mistake is merging the first and third roles, making the data team accountable for decisions that belong to the business. The second mistake is naming someone too senior as owner, who delegates everything without delegating authority. A good owner is close enough to the process to understand the question and senior enough to make the answer stick.

## Start small, but with something that hurts

Instead of covering all data, it pays to start with a few critical elements: ten, twenty at most. The selection criterion isn't theoretical importance, but concrete pain. Good candidates are the numbers that get challenged in meetings, the ones that end up in a regulatory report or in front of the board, the ones incentives are calculated on, and the ones an AI assistant will have to use to answer business questions.

For each of these elements, a few pieces of information are enough:

- **the definition**, written so that someone outside data can understand it;
- **the owner** and the steward, by name;
- **the official source**, meaning the table or metric the number must be taken from;
- **the minimum quality rules**, and what happens if they aren't met;
- **who can access it** and at what level of detail.

Alongside this list you need a decision log: a simple page recording, for each decision made, what was decided, who decided it, when and why. For example: "Quarterly revenue is calculated net of returns recorded before the close. Decided by the head of finance on 15 March, on the steward's proposal, to align the figure with the financial statements." A line like that closes a discussion that would otherwise reopen every quarter.

Twenty well-governed elements are worth more than ten thousand documented tables. Above all, they're a result you can see within weeks, which makes it easier to extend the work.

## How a disagreement gets resolved

Sooner or later two owners will want different definitions for the same data. Sales counts an order when it's signed, finance when it's invoiced. Both are right, for their own purposes.

Here governance has to give two answers. The first is that, when needs are legitimately different, you can have two metrics with two different names, for example "booked" and "invoiced", each with its own definition and owner. The problem isn't having two numbers, it's having two numbers with the same name.

The second is that, when a single official number is needed, there must be a clear path to get there: who prepares the options, who decides, within what time. This is where a governance committee really makes sense. Not as a periodic status meeting, but as the place where disagreements the owners can't settle on their own get resolved. If the committee has no disagreements to resolve, it doesn't need to meet.

## Decisions have to end up in the systems

A decision that stays in a document gets forgotten at the first reorganization. A decision that ends up in the systems keeps applying even when nobody remembers it.

That's why governance works better when its decisions are turned into something the systems enforce on their own:

- **definitions** become metrics in a semantic layer, calculated in one place and reused by every tool;
- **quality rules** become tests in the pipelines, which stop or flag data before it reaches a report;
- **access rules** become policies configured on the platform, not exceptions granted by hand;
- **change rules** become data contracts between those who produce data and those who use it, checked automatically at every release.

It's the same principle data mesh calls federated computational governance: rules are decided together, but enforced by the platform, not by a person checking. You don't need to adopt data mesh to use the idea. Just ask, for every decision made, where it will be enforced.

## How to tell whether it works

Measuring governance by counting documents produced or tables cataloged says little. Some more useful indicators:

- **how long it takes to resolve a disagreement** about a definition, from first report to recorded decision;
- **how many critical elements have an active owner**, meaning someone who has made at least one decision in recent months;
- **how many versions of the main metrics exist** in the reports in use;
- **how many quality problems get caught** by checks before a user finds them.

If the time to resolve a disagreement drops from months to days, governance is working, whatever the state of the catalog.

## An exercise to start with

There's a test that takes an hour. Pick the three most disputed numbers in your company: the ones that generate the most "where does this come from?" questions in meetings. For each one, answer a single question: if two departments presented two different values tomorrow, who would decide which one is right?

If you can name someone for all three, and that person knows they're the one, you already have a solid base. If the answer is "the data team", "it depends" or "the committee", you've found where to start. You don't need a program: you need three names, three written definitions and a place to record decisions.

Data governance isn't measured by how many rules it has written, but by how quickly you get to an answer when the numbers disagree.

## Further reading

Useful reading on the topics of this article.

- [DAMA Data Management Body of Knowledge](https://www.dama.org/cpages/body-of-knowledge) (DAMA International): the most widely used reference for the definitions, areas and roles of data management
- [Microsoft Fabric adoption roadmap: Governance](https://learn.microsoft.com/en-us/power-bi/guidance/fabric-adoption-roadmap-governance) (Microsoft Learn): a pragmatic approach that balances control and empowerment, starting from the most pressing pain points
- [Data Mesh Principles and Logical Architecture](https://martinfowler.com/articles/data-mesh-principles.html) (Zhamak Dehghani): the principle of federated computational governance, enforced by the platform
- [Open Data Contract Standard](https://bitol-io.github.io/open-data-contract-standard/) (Bitol): an open standard for writing data contracts between those who produce data and those who use it
