---
title: "The bar chart: ground rules, variants and advanced techniques"
description: "The most used chart in Business Intelligence is also the one most often got wrong. Bars or columns, sorting, a zero baseline, clustered and stacked series, diverging bars, bullet charts, Pareto, lollipops and small multiples: when to use each variant, and why."
date: 2026-11-21
categories: ["bi-analytics"]
cover:
  src: "/assets/images/posts/grafico-a-barre.svg"
  alt: "Grey columns in random order become sorted horizontal bars, the first one highlighted, each with an orange tick for the target"
tags: ["Data Visualization", "Charts", "Dashboards", "Reporting"]
translationKey: "bar-chart"
updated: 2026-11-21
draft: false
---

Open any company dashboard and the odds of finding a bar chart are close to a hundred per cent. Sales by region, revenue by product, tickets by team, customers by channel: whenever the question is “who has more and who has less”, the answer almost always comes as bars.

The bar chart is so common it seems there’s nothing left to learn. Yet it’s also the chart people get wrong most often, precisely because they build it without thinking: bars in alphabetical order, axes that don’t start at zero, six colours for six categories, twelve series side by side that nobody can read.

In this article I start from the ground rules and work up to the more advanced variants, the ones that turn a correct chart into a chart that answers a specific question.

## Why bars work so well

The reason is perceptual. In the 1980s William Cleveland and Robert McGill measured how accurately people compare values encoded in different ways: position, length, angle, area, colour. The result has become a reference for anyone working on data visualisation: we compare **positions and lengths along a common scale** very accurately, and angles, areas and colour intensity far less so.

A bar chart is exactly that: lengths aligned on the same baseline. That’s why a 10% difference between two bars is obvious at once, while the same difference between two slices of a pie means reading the labels.

Almost everything that follows comes from this. Every choice that makes comparing lengths easier improves the chart; every choice that makes it harder makes it worse.

## Bars or columns?

Horizontal bars and vertical columns are the same chart rotated by ninety degrees, but they aren’t interchangeable.

![On the left, six vertical columns for the months from January to June; on the right, six horizontal bars by region, with long labels such as Emilia-Romagna readable in full](/assets/images/posts/grafico-a-barre/en/barre-colonne.svg)

**Columns** work well when there are few categories with short labels, and above all when they represent time: months, quarters, years. Time reads from left to right, and columns respect that habit.

**Horizontal bars** are the better choice when labels are long (product, customer or region names) or when there are many categories. Labels read horizontally without being rotated or truncated, and the list can grow downwards, where there’s always room. Bars are also the natural shape of a ranking: first at the top, last at the bottom.

A practical rule: if you’re tempted to tilt the labels by 45 degrees to fit them under the columns, rotate the chart.

## The ground rules

### Sort the categories

When categories have no natural order, sort them by value. Alphabetical order is almost always the wrong one: it’s convenient for whoever builds the chart, not for whoever reads it.

![The same six product categories: on the left in alphabetical order, with bars of random length; on the right in descending order, longest at the top](/assets/images/posts/grafico-a-barre/en/ordinamento.svg)

In descending order, “who’s first, who’s last, where does this product sit” gets an answer in a second. In alphabetical order the eye has to jump back and forth and rebuild the ranking on its own.

The exceptions are categories that already have an order of their own: time, age bands, value brackets, the stages of a process. There, the natural order beats sorting by value.

### The axis starts at zero

In a bar chart the value is encoded by the **length** of the bar. If the axis doesn’t start at zero, length is no longer proportional to value, and the chart lies even when the numbers are right.

![The same two values, 96 and 100. On the left the axis starts at 94 and the second column looks three times taller than the first; on the right the axis starts at zero and the columns are almost equal](/assets/images/posts/grafico-a-barre/en/asse-da-zero.svg)

It’s one of the most common mistakes in dashboards, and often an unintended one: many BI tools fit the axis to the data automatically. A 4% gap becomes a 200% gap on screen, and in the meeting someone will start asking what happened to Region A.

If the change you need to show is small compared with the value, a bar chart is the wrong tool. Better to show the change itself (more on this later, with diverging bars) or to use a dot plot, where the axis can start above zero because the value is encoded by position, not length.

### Less ink, more message

A bar chart left on default settings often has everything it doesn’t need: a different colour for each bar, dense gridlines, a legend that repeats the labels, borders, shadows.

![Before: five columns in five different colours, with gridlines and a legend. After: four grey columns and one blue column for the North-East, with values written above the columns and the note “North-East: +12% on 2024”](/assets/images/posts/grafico-a-barre/en/evidenziare.svg)

Three changes do almost all the work.

- **One colour for every bar.** The bars are already told apart by position and label. Giving each category its own colour adds a legend to decode and no information.
- **Colour as a highlighter.** If the chart has a message, colour is how you say it: grey for context, a strong colour for the bar you’re talking about.
- **Direct labels.** When there are few bars, writing the value above or next to each one lets you remove the axis and the gridlines. The title, or a short annotation, states the message in words.

One detail that gets little attention: the gap between bars. Thin, widely spaced bars look like a barcode and are hard to compare; the gap between one bar and the next should be narrower than the bar itself, roughly half.

## More than one series in the same chart

Sooner or later the question with two dimensions arrives: sales by region **and** by year, revenue by quarter **and** by channel. The bar chart has two ways of answering, and each has a clear limit.

### Clustered and overlapping

**Clustered bars** place the series side by side within each category. They work well with two series and acceptably with three. Beyond that the chart becomes a forest where it’s no longer clear which bar to compare with which.

![On the left, clustered columns: for each region a light column for 2024 and a dark one for 2025, side by side. On the right, the same columns overlapping: 2024 light at the back, 2025 dark in front, with the percentage change written above](/assets/images/posts/grafico-a-barre/en/raggruppate-sovrapposte.svg)

When the two series are a current value and a benchmark (previous year, budget, forecast), a more readable variant is **overlapping bars**: the benchmark is a light bar in the background, the current value a solid bar slightly offset in front. The eye reads the current figure first and the comparison second. It’s the style proposed by the IBCS (International Business Communication Standards), widely used in financial reporting. Adding the percentage change above each pair saves the reader from doing the sum in their head.

### Stacked and 100% stacked

**Stacked bars** place the series on top of each other. The advantage is that they show the total and its composition together.

![On the left, columns stacked by quarter, split between stores, online and wholesale, with the total above. On the right, the same columns at 100%, all the same height, with the online share growing from 20% to 33%](/assets/images/posts/grafico-a-barre/en/in-pila.svg)

The limit is just as clear: only the bottom segment and the total sit on a common baseline. All the other segments start at different heights, and comparing them is hard. In the chart on the left it’s easy to see that the total is growing and stores are flat; working out whether wholesale is growing or shrinking takes far more effort.

That leads to three practical rules:

- put the most important series at the bottom, the one you want to compare across categories;
- limit the series to three or four, grouping the rest into “Other”;
- if each series needs to be compared over time, give up the stack and use one chart per series, with the small multiples I cover further on.

The **100% stacked** variant brings every bar to the same height and shows only the shares. It’s useful when the question is about the mix (“is online carrying more and more weight?”) rather than volumes, but it should be stated explicitly, because the total disappears: a channel can gain share while losing in absolute terms.

## Advanced variants

The variants below aren’t decoration. Each one answers a specific question that a plain bar chart handles badly.

### Diverging bars: the variance

When the question is “how far above or below budget are we”, showing sales and budget as two bars side by side forces the reader to do the subtraction. **Diverging bars** show the difference directly, from a central axis.

![Horizontal bars around a central axis: Lombardy +8.5%, Veneto +5.2% and Lazio +2.1% on the right in blue; Piedmont −1.4%, Campania −3.8% and Sicily −6.5% on the left in orange](/assets/images/posts/grafico-a-barre/en/divergenti.svg)

Colour becomes semantic: one colour for positive values, one for negative. Better to avoid the red and green pair, which is the most common form of colour blindness; blue and orange work for almost everyone. Sorted by value, the chart reads like a ranking: who’s doing best at the top, who needs attention at the bottom.

It’s also the fix for the truncated-axis problem: instead of squashing absolute values to make a small difference visible, you show the difference itself, on an axis that starts at zero.

### Bullet chart: value, target and context

The **bullet chart** was proposed by Stephen Few as an alternative to the gauges that crowd many dashboards. A gauge takes a lot of space, encodes the value as an angle (which we read poorly) and shows one indicator at a time. A bullet chart is a thin bar, and you can stack many of them one below the other.

![Bullet chart for four regions: for each one a thin dark bar with sales, a vertical tick for the target and three grey background ranges for poor, good and excellent. North and Islands beat the target, Centre and South don’t](/assets/images/posts/grafico-a-barre/en/bullet-chart.svg)

There are three elements: the bar with the current value, a vertical tick for the target and a few background ranges, in shades of grey, marking the performance thresholds. At a glance you see whether the value has passed the target and which performance range it falls in. It’s one of the most compact ways to put several KPIs with their targets on an executive dashboard.

### Pareto: who really matters

The **Pareto chart** combines bars sorted in descending order with a line showing the cumulative share. It answers a question that comes up in companies all the time: how many customers, products or defect causes explain most of the total?

![Bars sorted by revenue for ten customers, from A to J, with a cumulative share line. The first five customers are coloured and together pass 82% of the total, beyond the dashed 80% line](/assets/images/posts/grafico-a-barre/en/pareto.svg)

The dashed line at 80% makes the point where the curve crosses it immediately visible. The bars before that point deserve a solid colour; the others can stay grey. It’s a very effective chart for customer concentration analysis, range management and complaint analysis.

A simpler variant of the same idea is the **Top N with “Others”**: show the top ten categories and group the rest into a single bar, always at the bottom and in grey, even when it’s longer than the others. Readers see the main players without losing sight of the total.

### Lollipop and dumbbell: when there are too many bars

With twenty or thirty categories, a bar chart turns into a solid block of ink. The **lollipop** replaces each bar with a thin line and a dot at the end: the length stays, the visual weight drops a lot.

![On the left, a lollipop with ten sorted products, each with a thin line and a dot. On the right, a dumbbell with eight regions: a hollow dot for 2024 and a solid one for 2025, joined by a line; Lazio and Piedmont, which fell, have an orange dot](/assets/images/posts/grafico-a-barre/en/lollipop-dumbbell.svg)

The **dumbbell** is the lollipop’s sibling for comparing two points in time: for each category two dots, before and after, joined by a line. Unlike clustered bars, it puts the gap between the two values front and centre, and the gap is often the news itself. Colouring the categories that fell differently makes them stand out without reading a single number.

In a dumbbell, as in every dot chart, the axis doesn’t have to start at zero: the value is encoded by position, not length.

### Small multiples: one question at a time

When a stack or a cluster of bars holds too many series, the answer is often to split the chart into many small charts, one per series, **on the same scale**. Edward Tufte called them small multiples.

![Four small column charts, one per region, on the same scale with a shared dashed line at 100. North, Centre and Islands grow; South, in orange, falls quarter after quarter](/assets/images/posts/grafico-a-barre/en/small-multiples.svg)

Each chart has a single series and so a common baseline for all its columns: comparing over time within each region becomes immediate. The shared scale also allows comparison between regions. If each chart had its own scale, North and Islands would look like they had the same sales volume.

Most BI tools support them natively: in Power BI they’re called small multiples, in Tableau you get them by putting a dimension on rows or columns, and in Looker Studio and Qlik through grid or “trellis” options.

## When a bar chart is the wrong choice

The bar chart is versatile, but not universal.

- **Long time trends.** With thirty or more points in time a line reads better than a row of columns, because the eye follows the shape of the curve.
- **Distributions.** A histogram looks like a column chart but answers a different question (how values are spread, not how much each category is worth) and has rules of its own.
- **Bridges between two totals.** To explain how you get from revenue to profit, or from budget to actuals, you need a waterfall chart.
- **A single number.** If the message is one value and its change, a KPI card is more direct than a chart with one bar.

## A checklist before you publish

Before adding a bar chart to a dashboard, a few questions are enough to avoid the most common mistakes.

1. **Bars or columns?** Columns for time and short labels, bars for rankings and long labels.
2. **Does the order help?** By value, unless the categories have an order of their own.
3. **Does the axis start at zero?** If the difference to show is small, show the variance instead.
4. **Does colour say something?** One base colour, one to highlight, one for negatives. Nothing else.
5. **How many series?** Three side by side or four stacked at most; beyond that, small multiples.
6. **Does the title state the message?** “North-East grows 12%” is a title; “Sales by area” is a label.

The bar chart is the simplest of charts, and that’s exactly why it’s worth getting right: it’s the one people look at most.

## Further reading

- [Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods](https://www.jstor.org/stable/2288400) (William S. Cleveland, Robert McGill, 1984): the study on how accurately we read lengths, positions, angles and areas
- [Bullet Graph Design Specification](https://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf) (Stephen Few): the original specification of the bullet chart
- [IBCS Standards](https://www.ibcs.com/) (IBCS Association): rules for business reporting, including the notation for actuals, previous year and budget
- [Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary) (Financial Times): a map of chart types organised by question, from comparison to composition
