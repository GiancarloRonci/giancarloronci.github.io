---
title: "Business Intelligence in a hospital: what changes when the data is patients"
description: "Doing BI in a hospital is not like doing it in any other company. Several sites to bring into line, sensitive clinical data, decisions taken on the ward rather than in meetings, and a share of the work that has to arrive in real time. What a BI team needs to work in this setting."
date: 2026-11-16
categories: ["bi-analytics", "data-governance"]
tags: ["Business Intelligence", "Healthcare", "Dashboards", "Data Governance", "Real time"]
translationKey: "hospital-business-intelligence"
updated: 2026-11-16
draft: false
---

A few days ago I read a job ad from a multi-site hospital looking for a head for its Business Intelligence team. A thousand beds spread across several institutes, tens of thousands of admissions a year, hundreds of thousands of outpatient visits. The duties included what you would expect: leading the team, evolving the platform, developing the data warehouse and analyses. But there were also less obvious items: building dashboards together with the clinical information system team, sitting on the data governance board, knowing tools for real-time data analysis.

That list captures something anyone who has worked with healthcare data already knows: BI in a hospital is a job of its own. The tools are the same as in any other company. What changes is the context, the timing and the cost of a wrong number.

## Several sites, one version of the facts

A hospital spread across several sites has to hold two needs together. Each institute has its own organisation, its own wards, sometimes its own recording habits. Management, however, needs an overall view: comparing sites, moving resources, planning.

The first job of a BI team is therefore to make sure that "average length of stay" means the same thing at every institute. It sounds obvious, but it isn't. Do you count days or nights? Is a patient transferred from one site to another one admission or two? Do day-hospital admissions count? Every answer changes the number, and a gap between two sites may be nothing more than a different calculation rule.

It is the same problem I described in the article on [how to define a metric](/posts/how-to-define-a-metric/), with one difference: here a wrong comparison between sites can lead to moving staff or beds in the wrong direction.

## Clinical data is not sales data

In a commercial company, the most sensitive figure is usually a customer's margin. In a hospital, the data flowing through the data warehouse is diagnoses, treatments, tests. It is health data, and data protection law treats it as a special category, with stricter rules.

For the BI team this has very concrete consequences.

- **Access by role, not by convenience.** Whoever analyses emergency department waiting times does not need to know who the patient was. The data model has to separate what identifies the person from what the analysis needs.
- **Pseudonymisation as the rule.** Statistical analyses, in Python or R, are run on data where the patient is a code, not a name.
- **Traceability.** Who saw which data, and when. Not out of distrust, but because in healthcare it is a question someone will ask sooner or later.

That is why it makes sense for the head of BI to sit on the data governance board. The rules on who sees what cannot be decided downstream, once the dashboard is already built.

## The dashboard that matters lives in the clinical system

One of the most interesting items in that ad was working with the team that develops the clinical information system to build "application" dashboards. It is an area where healthcare is ahead of many other sectors.

A doctor or a nurse does not open a BI tool to make a decision. They work in the electronic health record, between one patient and the next. If the useful information (free beds on the ward, patients waiting for discharge, overdue tests) sits in a separate portal, nobody will look at it. I wrote about this in the article on [dashboards nobody uses](/posts/dashboard-inutilizzate/): a dashboard works when it is in the place and at the moment the decision is made.

In a hospital that place is the clinical system. The BI team does not necessarily have to build the screens there, but it has to provide data and indicators ready to be shown there, with the same definitions used in management reports.

## Two speeds: management and the ward

The questions that reach a hospital BI team run at two very different paces.

- **Management** thinks in months or quarters: costs per ward, occupancy rates, 30-day readmissions, comparisons between sites. Here the classic data warehouse, loaded overnight, works perfectly well.
- **The ward and the emergency department** think in hours: how many patients are waiting right now, how many beds will free up today, which operating theatre is running late. Here, data from last night is already old.

That is why the ad also mentioned tools for real-time analysis. Not everything needs to be real time: it costs more, it is more fragile and often it isn't needed. But a small share of the indicators does, and it has to be designed separately, with its own architecture. I described one way of bringing the data warehouse closer to those timings in the article on the [near real-time data warehouse](/posts/data-warehouse-near-real-time/).

The important choice is to state, for each indicator, which of the two speeds it needs. And to write it on the dashboard: "updated at 7:00" and "updated 2 minutes ago" are two different promises.

## The platform is a service, not a project

Among the preferred qualifications in the ad was the ITIL Foundation certification. At first sight it looks out of place in a BI role. In fact it says a lot.

In a hospital, the BI platform is not a project you deliver and close. It is a service that has to work every day, with users who report problems, ask for new features and expect answers within a known time. A failed overnight load is not a technical nuisance: it is hospital management making decisions on stale numbers the next morning.

Running BI as a service means having a clear way to collect requests, a shared order of priorities, automated checks on the loads and a person who knows who to answer to when something doesn't add up. It is less exciting than developing a new predictive model, but it is what makes users trust the numbers.

## Finding new ways to aggregate

The last duty on the list was perhaps the most ambitious: identifying new models for aggregating information.

In a hospital, data is born organised by system: the laboratory, radiology, pharmacy, the emergency department, administration. The most useful questions, though, cut across systems. A patient's journey from arrival in the emergency department to discharge touches five different applications. The real cost of an operation sits partly in the operating theatre, partly in the pharmacy, partly in the days of the stay.

Building views by patient pathway, and not only by source system, is where hospital BI can make its biggest contribution. It takes knowing the data, but above all knowing the clinical processes. That is why experience in a hospital setting, in ads like this one, counts almost as much as technical skill.

## What I take from it

Rereading that list of duties, what stands out is how little of it is about tools. Power BI, SSIS, Python: they are required, but they are the easy part. The rest is getting the sites to agree on definitions, protecting data about people's health, bringing indicators into clinical work, choosing the right speed for each number and keeping up a service that management can rely on.

It is a good reminder for those who do BI outside healthcare, too. In a hospital the consequences of a wrong number are simply more visible.

## Further reading

- [HL7 FHIR Overview](https://hl7.org/fhir/overview.html) (HL7 International): the most widely used standard for exchanging clinical data between systems
- [OMOP Common Data Model](https://ohdsi.github.io/CommonDataModel/) (OHDSI): a common data model for analysing observational clinical data, used by many hospitals and research centres
