---
title: "Building Normal Curves with JavaScript using Highcharts"
date: "2017-05-10 23:00:00+00:00"
layout: "post"
path: "/2017/05/10/building-normal-curves-highcharts/"
description: "Creating a statistical visualization with Highcharts"
keywords: "normal curve bell highcharts javascript"
category: "frameworks"
readNext: "jest-first,react-component-styles,mobx-first"
key: "highcharts-normal"
---

This week I got to have a little fun remembering some High School math, and using one of my favorite libraries: [Highcharts](https://www.highcharts.com/).  Highcharts is a commercial JavaScript data-viz library, and it makes most standard charts and graphs a breeze to implement.  I was using it to plot a normal distribution in order to display a 95% confidence interval.  It's a pretty straightforward problem, but its a nice example of a practical use of Highcharts, and comes with a little stats math that many of us may have learned and forgotten.

### The Problem

The goal was to display a [normal distribution](https://en.wikipedia.org/wiki/Normal_distribution) to represent a 95% confidence interval, given the upper and lower bounds of the confidence interval.  A normal distribution is the classic bell curve, where the area under any section of the graph represents the probability that the true value of the measure being tracked is within that range.  These curves are usually represented something like this: 

![Normal Distribution image](/posts/images/normal-curve/confidence-interval.png)

The x axis of the curve represents the range of values, while the y axis is a function of x that shows the relative probability for different areas.  Data sets that are normally distributed conform to the above bell curve and the [68-95-99.7 rule](https://en.wikipedia.org/wiki/68%E2%80%9395%E2%80%9399.7_rule). There's a 68% chance that the true value is within 1 standard deviation of the middle of the curve (the mean), a 95% chance that the true value is within 2 standard deviations, and a 99.7% chance that the true value is within 3 standard deviations.

### Step 1: Generating a Dataset

Highcharts operates by plotting a set of data points, not by handling equations directly.  So our first step is computing a set of data points to plot.  We can find the equation for calculating a normal distribution's probability density on [Wikipedia](https://en.wikipedia.org/wiki/Normal_distribution).


![Normal Distribution equation](/posts/images/normal-curve/equation.png)

Yep, we get to play with an equation that has both π and e in it.  I hope this feels sufficiently like a high school math class now.  But we can actually choose to drop the left side of the equation.  It is the [normalization constant](https://en.wikipedia.org/wiki/Normalizing_constant) for the equation: it ensures that the total area under the curve equals 1, but doesn't change the shape of the curve.  Since we're simply displaying the shape of the graph and care primarily about showing the range along the x axis, we can ignore it and instead use this function:

```javascript 
const normalY = (x, mean, stdDev) => Math.exp((-0.5) * Math.pow((x - mean) / stdDev, 2));
```

That's a good start, but right now we only have an upper and lower bound value for a 95% confidence interval.  So before we can apply the equation, we need to find a mean, a standard deviation, and a set of x values to run the formula against.  The mean and standard deviation are fairly straightforward, and we can use lodash to generate a set of points.  For the sake of this example, we'll plan on generating 100 points ranging from +/- 5 standard deviations from the mean, which should allow us to see all meaningful parts of the distribution, and still have a bit of padding.  

```javascript
const getMean = (lowerBound, upperBound) => (upperBound + lowerBound) / 2;

// distance between mean and each bound of a 95% confidence interval 
// is 2 stdDeviation, so distance between the bounds is 4
const getStdDeviation = (lowerBound, upperBound) => (upperBound - lowerBound) / 4;


const generatePoints = (lowerBound, upperBound) => {
  let stdDev = getStdDeviation(lowerBound, upperBound); 
  let min = lowerBound - 2 * stdDev;
  let max = upperBound + 2 * stdDev;
  let unit = max - min / 100;
  return _.range(min, max, unit);
}
```

Now that we have the x axis locations for the points, we can generate a whole data series.  To keep it clean, we'll create a translation function that has preloaded the values of `mean` and `stdDev`, and then just use `Array.prototype.map` to generate the seriesData.

```javascript
let mean = getMean(lowerBound, upperBound);
let stdDev = getStdDeviation(lowerBound, upperBound);
let points = generatePoints(lowerBound, upperBound);

let translationFunc = x => normalY(x, mean, stdDev);

let seriesData = points.map(x => ({ x, y: translationFunc(x)}));
```






### More Resources

