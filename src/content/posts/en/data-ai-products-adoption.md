---
title: "An AI product isn't done when it works: it's done when it changes a decision"
description: "Many data and AI projects end with an accurate model, a published dashboard and nobody using them. What changes when you treat them as products: start from the decision, measure adoption, and design trust and accountability in from the start."
date: 2026-11-15
categories: ["data-strategy", "ai-analytics"]
cover:
  src: "/assets/images/posts/prodotti-dati-ai-adozione.svg"
  alt: "Three panels connected by arrows: a model with a curve, a person in front of a screen and a rising chart with a check mark; the step between the model and the person is dashed"
tags: ["AI", "Data Product", "Data Strategy", "Responsible AI", "Change Management"]
translationKey: "data-ai-products-adoption"
updated: 2026-11-15
draft: false
---

The demand forecasting model was good. On test data its average error was 9%, against 22% for the method used until then. The data team had built it in four months, validated it carefully and put it into production. Every morning at six, forecasts for the next two weeks landed on time in a data warehouse table and in a dedicated dashboard.

Six months later, the people planning purchases were still working from their own Excel sheet. The dashboard was opened a couple of times a week, almost always by the same person from the data team, to check it was still running.

Nobody got anything technical wrong. The project ended when the model worked. But a model that works and that nobody uses produces no value: it produces a cost.

## Project or product

The difference between the two lies in when you consider them done.

A **project** ends with a release. It has a delivery date, a scope, an acceptance test. Once the model is in production and the dashboard is published, the team moves on to the next project.

A **product** is done when someone uses it to do their job better, and in fact it's never entirely done: it has users, an owner, usage metrics, maintenance, and sooner or later a retirement. The release is the start of the part that matters.

Treating data and AI as products isn't a matter of labels. It changes the questions you ask at the start, what you measure at the end and who is accountable in between.

## Start from the decision, not the data

Almost every data project starts from what's available: we have this data, this platform, this model, what can we do with it? It's an understandable starting point, but it leads to building interesting things rather than useful ones.

A data or AI product exists to improve a decision. Before writing a line of code, it's worth answering five questions:

1. **Which decision?** Just one, described concretely: "how much stock to order for each site, every Monday", not "optimise purchasing".
2. **Who makes it?** With names and roles. How many people, what tools they use, how much time they have.
3. **When?** Daily, weekly, once a quarter. A perfect forecast that arrives after the meeting where the decision is made is worthless.
4. **How is it made today?** With what data, what rules of thumb, what tools. The Excel sheet the product is meant to replace often holds knowledge nobody has written down.
5. **What changes if the decision improves?** Less waste, fewer stock-outs, fewer hours of work. This is the value hypothesis, and it should be written first, with an order of magnitude, not afterwards to justify the work done.

In the opening example, the fourth question would have changed the project. The planners didn't rely on sales history alone: they knew which events on the calendar would shift demand, which supplier delivered late, which site had a small storeroom. The model knew none of this, and the people deciding knew it didn't. That's why they didn't trust it.

## Three levels to measure

A data or AI product is measured at three different levels, and almost always only the first is measured.

| Level | Question | Example measures |
| --- | --- | --- |
| It works | Does the product do what it promises? | Accuracy, data freshness, response time, availability |
| It's used | Do people use it when deciding? | Active users against expected users, decisions made with the product, share of suggestions accepted |
| It creates value | Has the decision improved? | Waste, margin, time saved, errors avoided, against the starting point |

The three levels depend on each other in that order, but none implies the next. An accurate model may go unused. A model that's used may create no value if it improves a decision that didn't weigh much. That's why the value hypothesis written at the start matters: at the end it lets you say whether the product really worked, not just technically.

There's a practical consequence too. If usage is measured, products nobody uses become visible, and can be improved or switched off. It's the same reasoning that applies to the [dashboards nobody opens](/posts/dashboard-inutilizzate/): what isn't measured piles up.

## Adoption is designed

Adoption isn't a phase that comes after release, with a training session and an announcement email. It's designed along with the product, and it depends on a few choices.

- **Stay inside the workflow.** If the people deciding work in the ERP, the forecast must appear in the ERP, next to the field where they enter the order. Every extra tool to open is a reason not to.
- **Explain, don't just predict.** A number with no reason asks for an act of faith. A number with "up 18% on last week, because of Saturday's event" can be judged by someone who knows the context.
- **Allow corrections.** The people deciding must be able to change the suggestion, and the product must record the correction and the reason. Corrections aren't a failure of the model: they are the most valuable source of information for improving it, and they often contain exactly the knowledge that was missing.
- **Run alongside before replacing.** For a few weeks the old method and the new one run in parallel, and the results are compared openly. Trust comes from seeing the product be right, and from seeing it admit when it's wrong.
- **Involve future users from the start.** One or two of the people who will use it take part in the design, try the intermediate versions and become the reference point for their colleagues. A product built "for" someone is received worse than one built "with" them.

None of these choices is technically hard. They're hard because they need time from the business, and that time must be requested and planned like any other project resource.

## Accountability isn't a final check

With AI, other questions join those about value: what data the model was trained on, what happens when it's wrong, who answers for it. In many organisations these questions come at the end, as a review by legal, privacy or compliance, when the product is already built and changing it is expensive.

It works better to treat them as requirements, on a par with features. Before development starts, every AI product needs written answers to a few questions:

1. **What data does it use, and can we use it for this purpose?** Personal data, third-party data, sensitive data: each has its own rules.
2. **How much does an error cost?** A wrong suggestion on order quantities costs some waste; a wrong decision about a customer or an employee can cost a lot more. The EU AI Act follows the same logic and classifies systems by level of risk.
3. **Who has the final say?** The level of human oversight should match the risk: for some decisions a spot check is enough, for others someone must approve every case.
4. **How will we notice it getting worse?** Models degrade when the world changes. You need performance thresholds and alerts, and an owner who receives them.
5. **Who is accountable?** A business owner, not just the technical team, as for any other [data that matters](/posts/data-governance-chi-decide/).

Asked at the start, these questions slow things down very little and often improve the product. Asked at the end, they block releases or, worse, get worked around.

## The platform as foundation, not goal

Modern data platforms, BI tools, machine learning environments: without solid foundations, every product rebuilds data access, cleaning and metric definitions from scratch. But the platform isn't the outcome. It's what makes the second product faster than the first, and the tenth faster than the second.

A good rule is to ask every product to leave the platform a little better than it found it: one more data source, integrated and tested; a metric [defined once](/posts/how-to-define-a-metric/) and made reusable; a component the next team won't have to rewrite. That way modernisation moves forward with the use cases, and every platform investment has a user to justify it.

The opposite path, the complete platform first and the use cases later, is tidier on paper and riskier in practice: it takes years before showing a result, and in the meantime the business learns to do without it.

## The translation work

All this needs someone who speaks both languages. On one side, they must understand a business decision well enough to turn it into requirements; on the other, they must know data, architectures and models well enough to know what's feasible, what it costs and where the risks are.

The role goes by different names depending on the company: data product owner, AI & data manager, analytics translator. The name matters little. Three responsibilities matter:

- **Choosing what to work on.** There are always more requests than the team can handle. Ranking them by expected value and feasibility, and saying no to those that don't stand up to the comparison, is the most important and least visible part of the job.
- **Keeping people together.** Business, data team, IT, external partners, legal and compliance have different priorities. The product moves forward only if someone aligns them.
- **Answering for the outcome, not the release.** The work isn't done at go-live, but when the three levels of measurement say the product works, is used and creates value.

## An exercise to start with

Take the list of data and AI products your organisation has released in the last two years: models, dashboards, assistants, automations. For each one, try to write down three things:

- the decision it's meant to improve, in one sentence;
- how many people use it each week, against how many should;
- what has changed, in numbers, since it went into production.

The rows you can fill in completely are your products. The others are finished projects: perhaps well built, but still waiting to deliver the value they were built for. And that's where it pays to restart, before launching new ones.

## Further reading

- [Data Mesh Principles and Logical Architecture](https://martinfowler.com/articles/data-mesh-principles.html) (Zhamak Dehghani): the principle of data managed as a product, with users, owners and guaranteed quality
- [Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml) (Google): practical guidance on taking models to production, starting with what to measure
- [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) (NIST): a framework for identifying and managing the risks of AI systems across their life cycle
- [Regulation (EU) 2024/1689, the AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) (EUR-Lex): the European text that classifies AI systems by risk
