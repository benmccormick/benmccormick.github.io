---
title: "Designing Front End Apps For Reliability"
date: "2019/01/21"
layout: "post"
path: "2019/01/21/strategic-coding"
description: "Principles for creating more robust applications"
keywords: ""
category: "fe-architecture"
topics: ['Architecture', 'JavaScript']
key: "reliability-design"
isDraft: true
readNext: "fe-concerns,react-confessions,feedback-loops"
---

In my recent [post on Front End Architecture](https://benmccormick.org/2019/01/07/the-concerns-of-fe-architecture/) I identified **Reliability** as one of 6 areas of concern when thinking about front end architecture.  Reliability in this sense can be defined as follows:

> An application's ability to provide a consistent functional experience to all users in the intended audience over time.

Let's break that down a bit:

**Consistent** - Reliable applications function the same way over time or degrade gracefully, even on days with heavy load, leap years, and weekends.

**Functional** - Reliable applications allow the users to do the things they need to do, and are forgiving when a user attempts actions that weren't part of an ideal use case.

**All Users In The Intended Audience** - Reliable applications work for users with strange data who live in different locales, and those with bad network connections and old browsers, at least within the limits of what what the business intends to support.  There is some overlap here with the concept of **accessibility**.

**Over Time** - In the real world, no application is ever completely reliable.  Things break down, there are bugs, and new edge cases are discovered.  What we can aspire to though, is an application where things that are working consistently stay working consistently, and as bugs, regressions and edge cases are discovered they get fixed in permanent ways.

1. Consider all states (state machine?)
2. Don’t trust the network
3. Consider variations in data
4. Testing
5. Monitoring


