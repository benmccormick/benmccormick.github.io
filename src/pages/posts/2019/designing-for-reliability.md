---
title: "Designing Front End Apps For Reliability"
date: "2019/01/21"
layout: "post"
path: "/2019/01/21/designing-for-reliability"
description: "Principles for creating more robust applications"
keywords: ""
category: "fe-architecture"
topics: ['Architecture', 'JavaScript']
key: "reliability-design"
readNext: "fe-concerns,react-confessions,feedback-loops"
---

In my recent [post on Front End Architecture](https://benmccormick.org/2019/01/07/the-concerns-of-fe-architecture/) I identified *Reliability* as a key concern of front end architecture.  I define reliability as follows:

> An application's ability to provide a consistent functional experience to all users in the intended audience over time.

Let's break that down a bit:

**Consistent** - Reliable applications function the same way over time or degrade gracefully, even on days with heavy load, leap years, and weekends.

**Functional** - Reliable applications allow the users to do the things they need to do, and are forgiving when a user attempts actions that weren't part of an ideal use case.

**All Users In The Intended Audience** - Reliable applications work for users with strange data who live in different locales, and those with bad network connections and old browsers, at least within the limits of what what the business intends to support.  There is some overlap here with the concept of **accessibility**.

**Over Time** - In the real world, no application is ever completely reliable.  Things break down, there are bugs, and new edge cases are discovered.  What we can aspire to though, is an application where things that are working consistently stay working consistently, and as bugs, regressions and edge cases are discovered they get fixed in permanent ways.


### Things Break Down

So why are applications often unreliable?  There are a fairly predictable set of issues that most applications run into that degrade reliability.

#### Unexpected Usage Patterns

Users are agents of chaos and the real world is stranger than expected.  Your sample database and QA testing doesn't come close to giving you a true idea of how your application will be used.

#### External Failures

Google never has bugs right?  Good luck with that.  Even if the rest of the world always wrote perfect software, front end code usually has to deal with the network, even when your user is on a plane, accessing your site over 2G in the mountains, or just dealing with crappy coffeeshop wifi.

#### Bugs

Bugs happen.  When they happen consistently and repeat themselves, you have a reliability problem.

#### Scaling Problems

Some things work great on small data sets or with a few users but break down when things get popular.  This isn't just a backend issue.  Data scales as well as people, and your program needs to be robust to slower backend responses when under load.

### Keeping Things Running

I'd like to offer some practical strategies for overcoming the challenges I've listed.  These are things you can consider during code reviews and when setting up your dev processes.

#### 1. Consider all states, and limit them if you can

One of the big leaps in JavaScript based UI development over the past decade has been moving from systems that we modeled as an initial UI state followed by a series of mutations (server generated HTML + jQuery) to systems that were modeled as partially driven with event systems that caused mutations to the UI (Backbone, Angular 1, Knockout), to systems that model the UI as a function of state (React, Vue, Angular2+, Modern Ember) State-driven systems tend to be more robust, because it is often more clear when a particular state might cause a problem, and it is more obvious when a problematic state occurs for a user how it happened.

Visibility into state is a huge step forward.  The next step is to define the possible states.  You can do this in your head, but it's much easier when using types or by thinking in terms of [state machines](https://benmccormick.org/2018/05/14/mobx-state-machines-and-flags/).  If you can map out different portions of your applications into a limited set of states and define behavior for each of them, reliability will be much easier to achieve.

The final step is to limit these states where possible.  Some interfaces depend on user input or external data enough that they naturally are effectively "infinite state machines", but when you can limit states by cutting scope, rearranging components or cordoning "infinite state machines" off into a smaller area of your application, you gain a lot of benefits.

#### 2. Don’t trust the network

This one is straightforward, and easy to check in code reviews.  Don't assume that anything over a network will return quickly.  Don't assume it will return correctly.  And in fact, don't assume it will return at all.  You may be limited in how you can handle these possibilities, but the baseline competence here is handling them.  Have strategies for loading states, timeouts, error handling and bad formats.  Things like service workers can help here, but also make the problems around the network even more complicated by introducing a new caching layer.  When you start making calls over a network, you're entering the realm of distributed systems and things get tricky fast.  But the least you can do is recognize the complexity and make a plan for it.

#### 3. Consider variations in data

Do you have a test data set that you develop against?  Is that your primary source of validation before you send code off into the wild?  Some of that may be unavoidable and out of your control, but remember that users are agents of chaos.  You will encounter data you didn't expect, so plan ahead for challenges.  How would your data visualization function if the dataset you ended up displaying was 2x the size of your test database?  10x? 1000x?  What if the list of products to display in your table contained product names 200 characters long?  Or if some of them were empty?  The real world is strange and you should be ready.

#### 4. You should have testing

This is another topic that's too big to cover fully here, but basically there's a reason that QA engineers have jobs.  You should have a plan for testing.  That plan will be better if it contains meaningful amounts of automated regression testing, with a clear process for making sure bugs are tested automatically once they've been discovered and fixed.  If you don't know where to start, always focus on testing the most important things well over testing everything mediocrely. And if you're not in a position to do meaningful automated testing, consider what it will take to get there.

#### 5. Monitoring

Finally, sometimes it's just not possible to catch problems before they ship.  But you can still catch them before too many of your customers do if you put in the work.  I'll be honest, I've never had a monitoring setup that I've been happy with at work, but on the front end good monitoring can mean sending console logs over the network so that they're shared with whatever backend logging solution you're using, tracking feature usage through analytics to look for any large problems or lack of usage that may indicate bugs, and even more advanced stuff like session recording in some cases.


**TL;DR**

- **Reliability is an application's ability to provide a consistent functional experience to all users in the intended audience over time.**
- **Reliability breaks down due to unexpected usage, external failures, bugs, and scaling problems**
- **You can boost reliability by defining and limiting application states, distrusting the network, thinking about variation in data, testing and monitoring**
