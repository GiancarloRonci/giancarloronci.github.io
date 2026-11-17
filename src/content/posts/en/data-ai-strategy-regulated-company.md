---
title: "Leading Data & AI in a regulated company: how the role is changing"
description: "An international pharmaceutical company puts data, analytics, automation and AI in the hands of a single person. Behind that mandate there is a clear idea of how the role is changing: one strategy shared with IT, a roadmap with measurable investments, governance designed for a regulated sector and a model that takes use cases from experimentation into everyday work."
date: 2026-11-17
categories: ["data-strategy", "ai-analytics"]
cover:
  src: "/assets/images/posts/strategia-dati-ai-azienda-regolata.svg"
  alt: "A roadmap with three stages, data, analytics and AI, starting from a shared platform and reaching a finish line; above the roadmap a shield with a check mark stands for governance"
tags: ["AI", "Data Strategy", "Leadership", "Responsible AI", "Pharma", "Operating Model"]
translationKey: "data-ai-strategy-regulated-company"
updated: 2026-11-17
draft: false
---

Let's take a concrete case: an international pharmaceutical company that gives a single person global responsibility for Data, Analytics & AI. Not a project lead, nor the owner of a single platform: the person who has to set the data and AI strategy for the whole company, turn it into a multi-year roadmap, own the platforms, build the governance and grow a global organisation that spans everything from data engineering to AI.

The way a company defines this role says more than it seems to. Its duties and responsibilities are, in practice, a description of how the company imagines its relationship with data over the next few years. And in this case some choices are very clear.

## One strategy, not two

The first point is that the Data, Analytics & AI strategy must be aligned with the IT strategy and with business priorities. It sounds like boilerplate. It isn't.

For years, in many companies, data had a strategy of its own, often born outside IT: a Chief Data Officer reporting to the business, a data science team that grew up inside one function, a platform bought by one department. The result was a second architecture next to the official one, with its own vendors, contracts and security rules. It worked as long as data remained a topic for specialists.

With AI that balance no longer holds. Models need data from transactional systems, run on the same cloud infrastructure, must follow the same identity and access rules, and end up inside the applications IT runs. An AI strategy separate from the IT strategy produces two things: duplication and friction. Two teams negotiating the same cloud contract, two ways of managing credentials, two data catalogues.

Aligning doesn't mean submitting. It means that the data roadmap and the application roadmap are read together, that architecture decisions are taken at the same table and that priorities are set by the business, not by the favourite technology of whoever proposes it. It's no coincidence that whoever leads Data & AI is expected to be a strategic partner within the IT Leadership Team: data is no longer a guest at IT meetings, it's part of them.

## From strategy to roadmap: investments and measurable outcomes

The second point is the one that separates a strategy from a slide deck: turning it into a multi-year transformation roadmap, with clear investment priorities, measurable outcomes and sustainable business value.

Every word carries weight.

- **Multi-year.** A data platform isn't built in a quarter, and an organisation that genuinely works with data even less so. But a three-year roadmap without intermediate results is a promise nobody can check. It needs a sequence of stages, each with a visible outcome.
- **Investment priorities.** Requests will always exceed the budget. The roadmap has to say what comes first, what comes later and what doesn't happen at all, and why. It's the least pleasant part of the job, and the one that makes the strategy credible.
- **Measurable outcomes.** Not "enabling AI" or "becoming data-driven", but numbers: time saved in a process, errors avoided, days gained in closing a study, lower stock levels. If an outcome can't be measured, nobody will be able to say whether the investment paid off.
- **Sustainable value.** A use case that delivers value for six months and then stops because nobody maintains it is not a success. Value counts if it lasts, with its maintenance costs already accounted for.

It's the same principle I described when writing about [data and AI products that actually get adopted](/posts/data-ai-products-adoption/): the work isn't done at release, but when something changes in decisions and in the numbers. In a company-wide roadmap this becomes a portfolio to manage, with investments to revisit when results don't arrive.

## Data, analytics, automation and AI: one family

The role puts four things under the same responsibility: data, analytics, automation and AI. That isn't obvious. In many companies process automation, with software robots and workflows, sits in a different team, sometimes in application IT, sometimes in an operations function.

Bringing them together makes sense, for three reasons.

1. **They use the same data.** An automation that reads invoices, a model that forecasts demand and a dashboard on stock levels all draw on the same tables. If three different teams run them, the same quality rules get written three times, and sooner or later they diverge.
2. **The boundary is moving.** With language models, many automations become "intelligent": a process that used to follow fixed rules now reads a document, extracts the information and proposes a decision. Separating automation and AI would mean drawing a line just where technology is erasing one.
3. **The value is in the process.** On its own, AI often produces a suggestion; it's automation that brings it into the workflow, without someone having to copy it by hand into another system. Managed together, the two are designed together.

Owning these platforms means making sure they are secure, reliable, scalable and fit for future needs. It's the responsibility of a service owner, not of an experimenter: data platforms today are critical infrastructure, and must be treated as such.

## Governance in a regulated environment

The most delicate part of the role is probably this one: establishing trusted data governance and responsible AI, balancing innovation with data quality, privacy, compliance and the requirements of a regulated environment.

In pharmaceuticals, "regulated" has a very concrete meaning. Data documenting the manufacturing, quality and safety of medicines is subject to GxP rules: it must be attributable, legible, recorded at the right time, original and accurate. The systems that handle it must be validated, which means proving with documents that they do what they are supposed to do. Every change must be traceable. On top of that comes the GDPR, which treats health data as a special category, and now the European AI Act, which classifies AI systems by level of risk.

In a setting like this the temptation runs two ways. On one side, blocking everything: every use case becomes a year-long validation project and innovation moves elsewhere, perhaps to unauthorised tools. On the other, a sharp separation: AI is only done where the rules don't reach, far from the processes that matter. Both paths give up most of the value.

The path that works is governance **proportionate to risk**.

- **Classify use cases.** An assistant that summarises internal, non-regulated documents, a model that forecasts commercial demand and a system that supports quality decisions in manufacturing don't carry the same risk. They shouldn't have the same approval process.
- **Standard paths for each class.** For low risk, a few clear rules and a quick approval. For high risk, validation, documented human oversight and continuous monitoring. What matters is that everyone knows in advance which path awaits them.
- **Governance built into the platform.** Traceability, access control, versioning of data and models shouldn't be manual tasks in every project, but features of the platform. If the platform already provides them, compliance costs everyone less.
- **Business owners.** As for any [data that matters](/posts/data-governance-chi-decide/), someone in the business must answer for the quality and use of the data, not just the technical team.

Done this way, governance isn't the brake on innovation. It's what lets innovation reach where it's really needed: the regulated processes, where the value is highest.

## R&D, commercial, operations: different data worlds

The role has to work with leaders across R&D, Commercial, Global Operations and Corporate Functions to identify, prioritise and scale the opportunities that create the most value. In a pharmaceutical company these are worlds that speak different languages.

- **R&D** works with lab data, clinical trials and scientific literature. Timelines are long, data is complex and often poorly structured, and the rules are strict. Here AI can shorten stages of research or of trial management.
- **Commercial** thinks in terms of markets, doctors, channels and interactions. The data looks more like that of any other company, with specific constraints on what can be communicated and to whom.
- **Global Operations** runs manufacturing, quality and the supply chain. The data comes from plants and quality systems, with the tightest GxP constraints, and the value lies in demand forecasting, maintenance and reducing waste.
- **Corporate functions**, such as finance, HR and legal, have repetitive, document-heavy processes: natural ground for automation and language models.

The job isn't to serve everyone in the same way, but to choose. With limited budget and people, what matters is ranking opportunities with a common yardstick: expected value, feasibility, risk, reuse. A use case that serves a single function is worth less than one that builds components three functions can reuse. And the yardstick must be transparent, because the functions that see other requests go ahead of theirs need to understand why.

## A model that takes use cases into production

One of the most interesting responsibilities is building a product and service delivery model that turns promising use cases into reliable, reusable solutions embedded in business processes: in other words, moving solutions from experimentation into sustainable operations.

It's the problem almost every company has with AI today: dozens of prototypes, few solutions in production. A proof of concept shows that something can be done; it doesn't show that it can be done every day, with real data, real users, costs under control and someone who answers when something goes wrong.

A product model changes a few things.

- **Every solution has an owner** who follows it after release, with usage and value metrics, not just accuracy.
- **Components get reused.** An integration with a system, a validated data pipeline, a document classification model: built once, they serve the next use case. That's how the platform grows along with the use cases.
- **Going to production is a known path**, with its own security, quality and compliance checks, not a negotiation to restart every time.
- **Deciding what to switch off is part of it.** A product portfolio also means retiring the products nobody uses, freeing up people and budget.

It's less spectacular than a new prototype, but it's what separates a company that experiments with AI from one that works with AI.

## Partners and ecosystems

The role also includes representing the company in technology partnerships and Data & AI ecosystems. It's a point that tends to be underestimated.

No pharmaceutical company is going to build its own foundation models, or its own cloud platform. The real choices are about what to buy, what to adapt and what to build, and with which partners. These decisions last for years and tie the company to a vendor, so they need someone who knows the market, can judge what lies behind sales promises and negotiates with a clear idea of what must stay in-house: the data, the knowledge of the processes, the skills needed to change vendor if necessary.

Ecosystems matter beyond the vendor relationship too. Industry consortia, partnerships with universities and research centres, shared data standards: in pharmaceuticals many problems are common to every company, and tackling them together costs less.

## Building the organisation

The last duty is perhaps the one that takes longest: building and developing a global, multidisciplinary organisation across data engineering, analytics, automation and AI, with clear capabilities, roles and career paths.

A data organisation doesn't emerge from merging existing teams. It needs answers to practical questions.

- **Which skills are needed, and how many?** Data engineers, analysts, data scientists, ML engineers, automation specialists, product owners. The mix changes with the company's maturity: at first you mostly need foundations, later people who bring solutions into processes.
- **Central or distributed?** A central team guarantees standards and shared platforms; teams close to the business understand the problems better. The answer is almost always a hybrid model, with a central platform and people dedicated to individual areas.
- **What career is there?** Without clear growth paths, the best people leave. You need a technical career that doesn't force people to become managers in order to grow, and roles defined well enough to know what is expected of each one.

It's the work of years, and it often decides the success of everything else. An excellent strategy with a weak organisation stays on paper.

## The skills: strategy and technical judgement

If I had to sum up in one sentence what this role takes, I'd say: the ability to connect strategic direction with sound technical judgement across data platforms, analytics, automation, AI and modern engineering practices.

It's a rare combination. People who come from strategy risk approving architectures that won't hold up; people who come from engineering risk chasing the elegant solution instead of the one that's needed. The role asks you to stand in between: close enough to the technology to spot an architectural risk or an unrealistic promise, close enough to the business to talk about value and priorities with the people who set budgets.

The rest follows from that: strategies that have already produced measurable impact, the ability to align senior stakeholders and guide cross-functional transformation, the habit of working with global and diverse teams. Knowing pharmaceuticals or another regulated sector helps, but it isn't essential: the problem is shared by many sectors, and the skills transfer.

## What I take from it

Looking at the role as a whole, what stands out is how little of it is about specific technologies. There's no name of a platform, a cloud or a model. There's strategy, roadmap, governance, priorities, operating model, organisation.

Not because technology doesn't matter, but because it's no longer the bottleneck. The tools for analytics and AI are available to everyone. What's missing almost everywhere is the ability to choose what to do, to do it in a way that lasts, within rules that protect patients and the company, and with people who grow along with the work.

That holds outside pharmaceuticals too. In a regulated sector the consequences of a wrong choice are simply more visible.

## Further reading

- [Regulation (EU) 2024/1689, the AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) (EUR-Lex): the European text that classifies AI systems by risk
- [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) (NIST): a framework for identifying and managing the risks of AI systems across their life cycle
- [GAMP 5 Guide, Second Edition](https://ispe.org/publications/guidance-documents/gamp-5-guide-2nd-edition) (ISPE): the pharmaceutical industry's reference for validating computerised systems in GxP settings
