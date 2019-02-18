---
title: "Strategic Coding"
date: "2019/02/18"
layout: "post"
path: "/2019/02/18/strategic-coding"
description: "Thinking about architectural concerns is a full time occupation"
keywords: ""
category: "fe-architecture"
topics: ['Architecture', 'JavaScript']
key: "strategies-tactics-moves"
readNext: "philosophy-of-software-design-book,fe-concerns,feedback-loops"
---

I recently read [A Philosophy Of Software Design](https://amzn.to/2Elk5g8) by John Ousterhout.  In an early chapter he paints a picture of a "tactical tornado" programmer, a programmer who is always focused on solving the current problem by the most expedient method possible, with no thought to the long term implications.  I suspect anyone with even a few years in the programming has seen programmers like this, and has also from time to time written "tactical" code like this themselves.  Ousterhout's recommendation is instead to write code strategically rather than tactically, taking more up front time to plan the structure for the benefit of longer term productivity.

Ousterhout focuses his examination of tactical vs strategic coding on the issue of complexity.  Complexity as he defines it is anything that makes the system difficult to work with.  It is the root issue behind much of the *ease of change* concern I identified in my [recent post](https://benmccormick.org/2019/01/07/the-concerns-of-fe-architecture/).  But we can expand this to encompass all of the front end concerns.  We can easily impact reliability, performance, ease of change, accessibility, security and capability when we make short hand tradeoffs.

Let's consider the problem of getting a new sign up page set up for a site.  There are several different approaches we could take.  By far the simplest is a basic HTML page using normal CSS and little or no JavaScript, that posts to a backend service after the signup and then redirects to a different static page.  We could set this up on S3 or any other service that will host static files.  On the other extreme, we could set up a new server side rendered Typescript-based React application that uses Next.js to give us server side rendering, which we deploy using Docker and a fully automated CI build system with chatbot ops.  Which one of these approaches is better?

A tactical tornado would likely prefer the first solution.  They could get the whole thing up and running in an hour, stamp it and call it done.  Other developers might be attracted to the *cool* approach and want to avoid the "outdated" approach.  But we can only really answer the question by stepping back and asking some questions:

- What is the future of this application?  Is this a standalone page, or the first page in a larger application?
- What feature requests are we likely to get for the page?  Is it probable that we'll eventually need form validation, dynamic success and failure states, complex behavior that depends on the use case?
- What browsers are we supporting
- What are our performance benchmarks?

Questions like that can tell us when we'll benefit from an up front investment in certain areas, and when it's wiser to be quick and dirty.  They also allow us to evaluate whether any options we're considering might cut us off from achieving long term goals.  For instance, if we know that we'll eventually need to scale this site into a large application with responsive interactions, personalized content and information maintained between page loads, building this out as a series of static pages which POST to a backend would eventually limit our capabilities or require a refactor.  But if this is only a one-off landing page for an event happening next week that won't be maintained beyond that point, developing a long-term maintenance strategy would be wasted effort.  This is *strategic coding*, and it doesn't stop at the beginning of a project, it's an ongoing mindset that you can take as you add each new feature to an application.

Ousterhout makes a case that aligns with my experience, that strategic programming is a long term winner.  I've seen that over time improvements to ease of change will often help a team save time lost, significant hits to performance, security, reliability may hurt them more than a fast solution saves them, and solutions that unreasonably limit us in terms of system capability or accessibility will ultimately get rejected.  The weasel words there exist for a reason... sometimes it really is the best idea to just get something working.  But a strategic programmer will understand the context of their project, and make wise choices about where and how to invest in the codebase.


**TL;DR**

- **It is possible to program either tactically or strategically**
- **Tactical programming is focused on solving the immediate problem as quickly as possible**
- **Strategic coding considers the context of the problem, and any architectural concerns involved in a change**
- **Strategic coding doesn't mean never hacking and always investing, it means letting context inform the amount and direction of investment in a codebase**

PS: I put a [full review of A Philosophy of Software Design](https://benmccormick.org/2018/12/31/book-review-philosophy-of-software-design/) up on the site a few weeks ago.  Check it out :)
