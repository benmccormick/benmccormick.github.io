---
title: "90% Done, Halfway There"
date: "2013-06-09T18:45:00+00:00"
layout: "post"
path: "/2013/06/09/90-done-halfway-there"
description: "A post on the difficulties of estimating development projects"
category: "soft-skills"
pageViews: "301"
last30pageViews: "1"
---

There's a running joke on my team at work when somebody asks about progress on another engineers bug.

>"I've done 90% of the work, so I'm about halfway there!"

It's really hard to estimate software development times.  I would in fact say that from a project planning perspective, that may be THE hardest problem when planning a big project.  Its certainly a question that engineers are asked all the time, and not one that is usually easy to answer even on an individual level.

<!-- more -->

## Why do we care?

Estimating development time accurately is important both in the big picture and in day to day development work.

1. It allows you to set healthy and reasonable expectations
2. It allows for proper prioritization and planning of features
3. It gives a team flexibility to make changes early if the current schedule is untenable
4. It allows you on a personal level to properly prioritize and balance your time

## Why Is This So Hard?

I've been thinking about this lately, and I've identified the factors that I've found contribute the most to the "90% done, halfway there" mindset.

### Scale

The first factor is also the most inevitable.  More code, bigger teams, and more complex requirements all make software estimation harder.  When I work alone on a side project, I rarely have trouble estimating how long a particular feature will take to implement.  This is true for a few reasons.  First, and most importantly, I know and understand all of the code in the project.  If I see code that looks out of place, I either remember, or can quickly work out, why it was put there.  I also have a comfort level with all the tools and technologies in use because I chose them myself, and have either used them before or specifically wanted to learn them.

Working in a larger team however means greater uncertainty about the original intentions of existing code, less familiarity with the code base as a whole, and (on sufficiently large projects) possibly an acceptance that you cannot understand the whole code base.  This unfamiliarity is usually mitigated by having engineers focus within a specific portion of the code.  That is a great strategy, provided our second problem is not present.

### Tight Coupling

When it comes to issues within the code base itself, I think the biggest obstacle to accurately estimating development time is tightly coupled software components.  Anybody who's ever read [The Pragmatic Programmer][pragmatic] can tell you that tight coupling is a *BAD THING*, but in practice it can be seductively easy to fall into.  The problem is that tight coupling means that when making changes to a piece of code you don't have to worry just about its internal function, but also about side effects.  When combined with the first issue of scale, this means that changes to code you're working on may have effects on other code that you don't fully understand or anticipate.  Too much of this can easily lead to

>90% done, and now I have 4 more bugs to work on.

### Defining Coding As The Task

The first 2 issues are to a certain extent unavoidable when working on a large existing code base like my teams.  But bad estimates can also  appear for reasons completely unrelated to the particular problem or code base. One issue that can be a problem for a programmer on a new team and also cause issues with programmer-manager communication is viewing coding as the task, without worrying about design, testing, documentation or code reviews.  When the programmer says to his manager that something is a 3 line fix what he's really saying is that the coding seems easy so the rest should be quick.  If his initial solution has problems, he not only is missing the time to write a new one, but also the time for it to be discovered by test, formulating a new design, and any review or paperwork required for making the change.

### Poor Communication

Finally the easiest way to be 90% done and only halfway there is to spend your first 90% writing the wrong code.  When the specs aren't clear and the programmer doesn't understand the requirement (whether it comes from a customer, test, or a project manager)  wasted time and poor estimates are pretty much a given.  The key here is the same as the last point.  There is more to software development than just writing code.

## Improvement

So how can we do better?  I'm still learning.  But here is the main way that I'm trying to do to get better at this.

### Tightening The Feedback Loop

One thing that can really improve the communication issues, and also make you aware of any tight coupling early on is tightening the feedback loop for your code.  What is that?  It means working to find out about errors and problems as soon as possible. Some ways to do this:

1. Automated Testing
2. Asserts or other constructs to test assumptions
3. Early prototypes of even small features to show requirement-setters

I've known for a while that there's value in building a subset of a feature to make sure I'm on the right track before coding the rest.  If a picture is worth 1000 words, working code is worth 1000 emails.  When you build something, even if its only partial or simplistic, you immediately get a sense for the challenges involved, and you also get the chance to immediately find out whether you are on the same page as the requirement creators.  For many people, especially non-programmers, its much easier to critique an existing system than to describe one ex nihilo.

Several of us are also working to introduce more automated testing on our team.  We have a great team of manual testers, but there is great value in the immediate feedback that automated testing can bring, especially in revealing the type of unexpected side effects that tight coupling causes.

## Summary

Software Development estimation is hard. There are a variety of challenges, some of them inherent to the practice or certain projects, some of which can be overcome or mitigated through experience and attention.  In the end, accurate estimation is a skill worth cultivating, bringing value to both you and the team. Take the time, get it right.


*Got some great tips for estimating software development times? Let me hear them on twitter [@_benmccormick][twitter]*


[pragmatic]:http://www.amazon.com/The-Pragmatic-Programmer-Journeyman-Master/dp/020161622X
[twitter]: https://www.twitter.com/_benmccormick
