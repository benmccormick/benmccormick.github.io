---
title: "How Software Engineers Produce Value"
date: "2019/12/18"
layout: "post"
path: "/how-se-add-value"
description: "A high level view at how we can turn programming skills into business value"
keywords: ""
category: "soft-skills"
topics: []
key: "how-se-add-value"
readNext: "strategies-tactics-moves,soft-skills,obvious-things"
---

I had the opportunity this week to walk a software engineer who is new to the field through some lessons I've learned over the years about how software engineers add value to the business.  It seemed generally applicable, so here's a cleaned up version of what I shared.

----

## What Is Value?

It can be easy to think of software engineering work as a series of task where you're given instructions and you make the computer do what the designer / PM / CEO asked.  Or as a series of fun problem solving challenges that you're somehow getting paid to complete.  Both of those views will eventually lead you to make suboptimal decisions when it comes to helping your business and growing in your role though.  Instead consider the following definition:

> Software Developers create value through shipping working code that solves important user problems in a predictable manner.

This captures a number of important things.

### Shipping 

> Real Artists Ship - *Steve Jobs*

Software Engineer's super power compared to other roles is that we get to build.  We create new things, add new behaviors, and ultimately (for a product company) control the shape of the product our company is built around.  This only has value when software actually ships though.  When we're not shipping, it's actually worse than just being slow to deliver value, because of a few non-obvious factors.

First, **unshipped code rots.**  When we leave code in a branch 90% done, it doesn't just stay the same.  It's quite common for our situation to get worse.  Our teammates check in code that may cause merge conflicts, or worse just doesn't take into account the unshipped code and sets us up for subtle bugs.  And when we do get back to the work we've often lost valuable mental context that makes any remaining work or testing harder and more error-prone.

Second, **we learn from shipping!**  It's quite common in software development for a developer or team to complete 90% of their feature according to the spec, only to find that they have another 90% of the work to go.  Doing the work to push things through to production inherently de-risks things, because we learn what the challenges are, and we know how long the work took.  Up until then, we will always have unknowns.  And when software goes out to users, we get to hear their feedback as well.  Shipped software lets us learn from our users (and from the performance of our system) and make adjustments that we wouldn't have known about if we sat on the code.  

So how do we get to shipping?  First, it's important to push things through to completion rather than allowing ourselves to jump from project to project, making progress without finishing, and incurring a lot of cost from context switching.  Soemtimes this may mean imposing kanban style [work in progress limits](https://lethain.com/limiting-wip/) on ourselves.  Second, its often helpful to break things into smaller chunks.  Small code reviews are easier to complete, test, [review](https://benmccormick.org/2019/04/22/better-code-feedback) and verify.  So multiple small changes will often go through faster than the same changes bundled together into a big chunk.  This can go too far, but as long as your changes work in isolation and provide value, I'd encourage erring on this side when in doubt.

### Working Code 

> [We Prefer] working software over comprehensive documentation - *The Agile Manifesto*

Software engineers are responsible for their code working.  At the simplest level that means delivering code that doesn't crash when run in the intended way.  As we grow and mature as developers however, we should aspire to  learn to write code that will scale to any reasonable load the system might see (and maybe even to unreasonable loads), code that handles odd input or context gracefully, and code that is easy to modify and maintain.  We should also take responsibility for proving that it works; writing tests, making the code easy to monitor in production, and providing good logging for debugging all fall under a software engineer's domain. We also should make sure that our definition of working matches what the business needs, not just a pedantic reading of whatever spec we're working off of.  More on that in a moment.

### Solving Important User Problems

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Just really funny- What the Customer Wanted expanded <a href="https://t.co/kdr7HKTSDy">pic.twitter.com/kdr7HKTSDy</a></p>&mdash; Frank Spillers (@farreaching) <a href="https://twitter.com/farreaching/status/764256002053025792?ref_src=twsrc%5Etfw">August 13, 2016</a></blockquote>

Software Engineers can be quite inventive in the ways they write code without solving important user problems.  Some common routes:

1. **Working on their own pet projects over the prioritized business problems** - Tech improvement work and engineer-driven projects are part of a healthy organization, but if they consistently replace work that was scoped based on user requests / feedback, they can cause problems
2. **Matching the spec without solving the original problem** - This is partially a design/product problem, but its often possible to meet all the stated requirements for a project without solving the original user pain point.  Great engineers understand exactly what problem they're trying to solve with a feature and will always step back to evaluate whether they're succeeding throughout the development process.
3. **Matching the spec and causing new problems** - Oftentimes our efforts to fix cause or expose new problems.  When we dodge responsibility by ignoring or hiding those problems instead of openly evaluating tradeoffs or working to improve the solution, we're not providing all the value we're capable of. 

These are ultimately issues of ownership. When we're invested in our work, we will want to work on useful problems and make sure they produce real value.  If you're consistently not feeling that way, it may be time to find something else to work on.


### In a predictable manner

> The challenge and the mission are to find real solutions to real problems on actual schedules with available resources - *Fred Brooks*

Ok, now we come to the section that is the *boring part* for many software engineers.  But as somebody who has recently converted to the management side of the fence, the ability to ship predictably is incredibly important.  

It's important for software engineers to ship predictably in 2 senses:

1. There is ongoing understanding of when something is likely to ship among the people who need to know
2. There is ongoing understanding of how something will work when it will ship among the people who need to know.  

Estimating software engineering projects is not an exact science. Nobody reasonable expects estimation perfection from software engineers, especially those new to the field.  Instead we aim to be as accurate as possible, and especially to be transparent as those estimates change over time.  

When we encounter obstacles, it's important to be realistic about what they mean to schedules and update the important people in a timely manner. 

For those working on a product team that may be a manager and a PM, for those building something solo, that may be the customers or internal users of the software directly.  It's never fun to say something is going to be late, but its always better to say that we'll miss a date that is 2 weeks away than to tell somebody for the first time that you've missed the date that was 2 days ago.

Communicating about the scope of work is just as important as schedule.  If we find out a piece of a feature is unfeasable or we dropped it due to time pressure, its important to communicate that.  Depending on your team/product, that may mean sharing with people directly, updating documentation, or just making the new behavior clear in an interface.   

### It's a process

Nobody starts out their first software engineering job with a fully evolved sense of how to estimate, scope and document their work.  Most have no clue how to think about building a system to be scalable or when to escalate problems to other members of the team.  These are skills learned through hard experience.  Make sure to [always be reflecting](https://benmccormick.org/2019/05/18/obvious-things) on what you're experiencing though.  Experience combined with reflection is a powerful mixture, and eventually will lead to growth.  Good luck!
