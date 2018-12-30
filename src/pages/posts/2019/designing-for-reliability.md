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


### Things Break Down

So why are applications often unreliable?  There are a fairly predictable set of issues that most applications run into that degrade reliability.

#### Unanticipated Usage Patterns

Users are agents of chaos.  Oftentimes front end applications perform unreliably because they're used in ways that nobody expected.  Maybe a developer didn't expect that anyone would ever try to navigate to a new page in the middle of a file download.  Maybe they didn't realize that when a button was slow to respond, users would click it repeatedly and eventually spawn enough requests to overload the backend system. Or maybe they didn't expect anybody to be using an ad blocker when using their site.  Some of these things can be planned for, many will be learned with experience, but there are pretty much always going to be surprises.  Chaos can't be denied forever.

#### External Failures

Google never has bugs right?  So if you're connecting to a Google API, you can probably count on it always working as expected?  Ah, the naiveté of youth.  All systems break down sometimes.  If you want your system to be robust, it needs to handle failures in any system that it interacts with, whether that's a Google API, your own backend servers, or a 3rd party script that you're loading onto the site alongside your app code.  You also need to be prepared for the various capability levels of the different browsers that will run your application, and recognize that not every user will be running the browser you're developing in.  Or you can trust in Google and await your eventual disappointment.

#### Bugs

#### Scaling Problems

### Keeping Things Running

1. Consider all states (state machine?)
2. Don’t trust the network
3. Consider variations in data
4. Testing
5. Monitoring


