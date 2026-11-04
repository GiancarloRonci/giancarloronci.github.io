---
title: "Technical debt or business priorities? The problem isn't choosing, it's deciding how much to pay"
description: "The business wants new features yesterday, the data team knows the foundations are creaking. It isn't a choice between two options: it's an investment decision that needs to be made in the open."
date: 2026-11-04
categories: ["data-strategy", "data-engineering"]
tags: ["Data Engineering", "Technical Debt", "Data Strategy", "Leadership"]
updated: 2026-11-04
draft: false
---

Monday morning, prioritization meeting.

The head of sales needs a new dashboard for a product launch, by the end of the month. The request is clear, so is the deadline, and there's an executive behind it. On the other side of the table, the data team knows something nobody asked about: the pipeline feeding those numbers fails two nights a week, and each time someone fixes it by hand before nine, when the first reports go out.

Two needs, one team, the same capacity. Anyone who works with data knows this scene, and also knows how it usually ends: the dashboard wins, the pipeline stays as it is, and someone promises to "fix it as soon as there's a moment". That moment almost never comes.

## Two legitimate needs

It's easy to tell this story as a clash between the people in a hurry and the people who want to do things properly. It's a convenient story, but it's wrong.

The business is right to push. Market windows close, competitors don't wait, and a data team that always answers "first we need to rebuild the foundations" soon stops being seen as a partner. A perfect platform that delivers late is of no use to anyone.

But those defending quality are right too. Technical debt isn't an engineer's whim: it's a real cost, paid every day, it just doesn't appear in any budget. And at some point the bill arrives all at once, usually at the worst possible moment.

So the problem isn't deciding who's right. It's that the two needs are measured with different tools: one has visible value and a date, the other has an invisible and uncertain cost. In a comparison like that, the debt always loses.

## What technical debt looks like in a data team

In data systems, technical debt takes recognizable forms:

- **pipelines without tests**, which work until someone changes a field upstream;
- **the same metric calculated in three different places**, with three slightly different logics;
- **recurring manual interventions**, like the job that has to be rerun or the file that needs fixing before month-end close;
- **tables nobody can explain anymore**, but nobody dares switch off because "someone might be using them";
- **exceptions written straight into the code**, like the customer excluded by hand or the date corrected with a `case when`;
- **tools out of support**, kept alive because migrating costs too much.

Each of these, taken on its own, looks manageable. The problem is the cumulative effect: every new business request is built on top of these foundations, and each time it costs a bit more, takes a bit longer and hides a bit more risk.

## Why debt always loses the argument

There's a structural asymmetry between the two needs.

A new feature has a requester, a stated value and a deadline. You can see it when it's delivered, and someone says thank you. Reducing debt, on the other hand, mostly produces things that *don't* happen: the incident avoided, the report that doesn't arrive late, the number that isn't challenged in a meeting. Nobody celebrates a problem that never occurred.

Then there's language. When the data team asks for time to "refactor" or "pay down technical debt", the business hears a request to work on something that, from its point of view, already works. Put that way, it's a hard request to accept, and often it isn't accepted.

The result is predictable: debt gets tackled only when it becomes an emergency. By then nobody chooses what to fix and when anymore: the system decides, by breaking.

## The problem isn't the debt, it's the interest

The debt metaphor is useful precisely because it works like the financial one. Borrowing isn't wrong: a company that never borrows grows more slowly. In the same way, a technical shortcut taken deliberately to meet an important deadline can be the right decision.

What matters is the interest: the time the team spends every week living with the debt. The job rerun by hand, the check done twice because the data isn't reliable, the new metric that takes three weeks instead of three days because first you have to understand how the existing logic works.

Take an example, with made-up but realistic numbers. A team of six data engineers tracks where its time goes for a month. It finds that about 30% goes on manual fixes, corrections and investigations into numbers that don't add up. It's like having four people working on business requests and two working only to keep what already exists standing. Nobody ever decided to assign two people to that job: it just happened.

That's the place to start. Technical debt isn't competing with business priorities: it's already consuming the capacity the business thinks it has available.

## Making the cost visible

If the problem is the asymmetry, the solution is to put the two needs on the same footing. Debt has to be translated into the language of the business: time, risk, delays, trust.

Instead of saying "the pipeline needs rebuilding", you can say: "this pipeline fails on average twice a week, each time it costs two hours of work, and three times in the last two months the sales report arrived after ten. If we build the new dashboard on this pipeline, it will have the same problem."

It's the same information, but now the head of sales has what they need to decide. They might choose to go ahead anyway, and that's fine: it's a business decision, made with the right information.

The same applies to a few signals worth tracking over time: how long it takes to add a new metric, how many incidents reach the business each month, how many hours go on unplanned work. They don't need to be precise. They need to be measured the same way every time, so the trend shows whether the debt is growing or shrinking.

## Practical rules for making the two needs coexist

There's no formula that works for everyone, but some practices work in many settings.

1. **Keep a debt register.** A simple list, not a project of its own: for each item, what it affects, what it costs today in time or risk, and who owns it. Without a register, debt exists only in people's heads, and it leaves when they change jobs.
2. **Reserve fixed capacity.** A stable share of the team's time, for example 15-20%, dedicated to reducing debt. The point isn't the exact percentage but the fact that it isn't renegotiated every sprint. If it has to be defended every two weeks, sooner or later it will be sacrificed.
3. **Tie maintenance to business work.** When a request touches an area with debt, the fix goes into the estimate. The new dashboard takes three weeks instead of two, because it includes making the pipeline safe. That's easier to get accepted than a separate piece of work, and the work gets done where it's really needed.
4. **Include quality in the definition of done.** Tests, minimal documentation and monitoring aren't activities to add later: they're part of the delivery. Otherwise every release creates new debt while you're trying to pay off the old one.
5. **Make deliberate debt explicit.** When you choose a shortcut to meet a deadline, write it in the register with a repayment date, like a loan. The business approves the shortcut and, together with it, the time to fix it afterwards.
6. **Decide with the business, not on its behalf.** The data team shouldn't decide on its own to stop delivering in order to rebuild the infrastructure, and the business shouldn't ignore a risk that has been clearly explained to it. Options should be presented with their costs, and the choice made together.
7. **Know when not to pay.** Not all debt needs repaying. A system that will be retired in six months probably just needs keeping alive. Spending time making it elegant is another way of wasting capacity.

## A different conversation

All this requires a change of role. The head of a data team can't just collect requests and estimate them, or defend quality as an abstract value. They have to act as a bridge: understand the business's priorities well enough to challenge them, and explain technical risks well enough to make them part of the decision.

When it works, the Monday meeting changes tone. The discussion is no longer whether to build the dashboard or fix the pipeline, but how to deliver the dashboard without building it on foundations that will give way in its first month of use. Sometimes the answer is to do both, with an extra week. Sometimes it's to deliver a simpler first version. Sometimes it's to accept the risk, knowingly.

In all three cases, someone made the decision instead of having it made for them.

## A test to get started

There's a simple exercise you can do before any rebuild plan. For a month, ask the team to note every unplanned intervention: jobs rerun, manual corrections, investigations into numbers that don't add up, requests for clarification about tables nobody knows. At the end, add up the hours.

Then compare that number with the time spent on new business requests. If the ratio surprises you, you've found the first thing to bring to the next prioritization meeting: not as a complaint, but as data.

Technical debt and business priorities aren't two needs to set against each other. They're two lines in the same budget. The business has every right to ask for speed, and the data team has a duty to say what it costs. What doesn't work is pretending the cost doesn't exist, because sooner or later someone pays it anyway, usually at the worst possible moment.
