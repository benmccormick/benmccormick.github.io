---
title: "Designing Front End Apps For Performance"
date: "2019/01/28"
layout: "post"
path: "/2019/01/28/designing-for-perf"
description: "Principles for creating more responsive applications"
keywords: ""
category: "fe-architecture"
topics: ['architecture', 'javascript']
key: "perf-design"
readNext: "reliability-design,fe-concerns,valuable-code-reviews"
---

Performance is a tricky topic to give generalized advice about.  Moreso than any of the other [front end concerns](https://benmccormick.org/2019/01/07/the-concerns-of-fe-architecture/) I discussed in my post at the beginning of the year, it is remarkably tied into the details of what an app is doing and how it is built.  That said, here are some general principles for designing performant applications that I've picked up over the years:

#### 1. Measure First

One of the most tempting things with performance is to start making changes before you have a specific slow measurement to improve.  Maybe you're writing your code up front with a major focus on performance because you know you'll need it, or diving in to make changes the first time a user complains about slowness.  Regardless it can be tempting to "performance tune" before you get detailed performance measurements.

This is problematic for 2 reasons: First, we often don't know what good enough system performance is until users start using the system.  Secondly, programmers' data-free intuitions on what parts of a system will be slow tend to be universally awful.

Measuring different aspects of your system first provides several benefits:

1. It gives you micro-benchmarks to improve upon, rather than waiting till "it feels good"
2. It lets you determine which parts of the system are actually slow, so you can focus on bottlenecks
3. It may help you justify performance focused work to project stakeholders.
4. It will allow you to test for regressions later on
5. It may reveal that the system performance is actually adequate in most situations, and help you narrow down edge cases to optimize or restrict

Note that this advice encompasses two often quoted pieces of advice: Donald Knuth's "Premature optimization is the root of all evil" and Kent Beck's "Make it work, make it right, make it fast".  When you only optimize based off of measurements, those things are going to naturally fall into place.

So what should you measure? On the front end Google's [RAIL model](https://developers.google.com/web/fundamentals/performance/rail) is a good place to start.  For loading you can look at benchmarks like first paint, first meaningful paint, and Time To Interactive (TTI) as useful benchmarks. They also provide similar guidance for input responsiveness and animation. Google is a bit preachy about specific perf benchmarks to my mind, but their analysis of *what* to measure is fantastic.

It's also useful to be able to communicate to backend developers when slowness comes from backend requests, so it's good to familiarize yourself with the network panel in your favorite browser's developer tools.  That will let you see how long different requests are taking and help evaluate when a performance problem is actually a network problem.

#### 2. Assume the network is slow

Related to the end of the last point, one of the defining attributes of front end development is that it always involves a network.  You can think of network requests as a giant chaos machine at the heart of your web application.  Network requests will fail, they will be slow... and they'll almost always look better to you in local development than they will be to your users, assuming like many developers that you're operating on reasonably good hardware and decent wifi.

So the network can be a bit of a performance trap for devs.  While I still advocate measuring first, with the network it's worth assuming that your local setup is not a good proxy for the user and either finding ways to do better tests or simply expecting that the user will have a slower or flakier connection and designing for that.  Firefox and Chrome are very helpful here, as they will allow you to simulate slower connections from within their network panel, allowing you to experience your app the way your users do.  This is especially important if you're targeting mobile users.

#### 3. You can do things more efficiently or you can do less

This is ultimately the heart of performance.  When an operation is slow, it is ultimately because your user's computer is performing too many operations to fit them all into the time you want them to.  To speed things up, you either have to reduce the number of operations by making your code more efficient, or by removing some work completely.  When people talk about compiled languages being faster than non-compiled languages, this is usually what they mean: compilers are very proficient at optimizing code for efficiency and removing wasted operations.

On the front end there are several major areas of potential waste: we can send too many things over the network, we can cause the browser to repaint or layout thrash unnecessarily, and we can block critical actions like responding to a users input with less critical actions like re-rendering an item offscreen.  Each of those could merit a series of articles on their own, but are great starting points when thinking about how to improve performance when no one component is obviously slow.

But it is worth remembering that sometime the only way out is doing less. Maybe you need to delay rendering some parts of the screen, or remove an expensive to render visualization. Maybe you should be using built in components instead of shipping a fancy UI component library.  I have no idea what your use case is, but it's always worth thinking about what you can do less of.

#### 4. Perception matters more than reality

Engineers like to deal with data and reality.  My first 3 points played right into that.  Now it's time to go against the grain.  The truth is that users aren't pulling up devtools to check and see if your site is slow.  It either feels slow to them or it doesn't.  And the actual numbers are only part of that perception.  Here are some things that can make fast sites seem sluggish and slow sites seem broken:

1. **Not showing a visual response to user interaction**

	When a user clicks a button that triggers a network request, and the system does nothing till that request completes, it will lead to the user thinking the system is slow at best and broken at worst.

2. **Freezing the interface while waiting on a response to a previous interaction**

	It's always important to keep the screen interactive while waiting on a request, even if some options are disabled or limited.  The user should be able to access navigation and other standard elements of the interface as normal.  In a scenario where the request is saving data, it may be necessary to add prompts to check whether they want to interrupt the save however.

3. **Loading states without any movement or animation**

	Sometimes people just want to know that you're doing something.  Animation communicates that something is happening.  It can be a spinner, a flowing placeholder block, or a progress bar.  The important thing is to show the user "things are happening".  Of course the more relevant your loading state is the better.  Facebook's placeholder items in their newsfeed create an illusion of content coming in even faster since the loading state itself helps frame the screen for the user.  Much more effective than a loading spinner that serves to remind the user that they're having to wait for something.


### Performance Is All About Effort

To quote [David Gilbertson's great post on performance](https://hackernoon.com/10-things-i-learned-making-the-fastest-site-in-the-world-18a0e1cdf4a7):

> It’s really easy to make a slow site, all you have to do is not try to make a fast one.

Performance comes down to caring, measuring and investing.  If you set reasonable benchmarks, and track them as you make changes, you're likely to find ways to achieve them.  If you set unreasonable benchmarks and make the space to work at them, you're likely to do better than anyone who isn't trying that hard would expect.

**TL;DR**

- **Measure First**
- **Assume The Network is Slow**
- **You can do things more efficiently or you can do less**
- **Perception > Reality**
- **Performance is all about effort**

