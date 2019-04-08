---
title: "Feedback Loops"
date: "2018/08/02"
layout: "post"
path: "/2018/08/02/feedback-loops/"
description: "How smaller loops lead to better software"
keywords: "feedback loops agile"
category: "soft-skills"
topics: []
key: "feedback-loops"
readNext: "large-improvements-small-team,ten-things-js,react-confessions"
---

*How do we get better faster?*  It's amazing to consider the amount of money, thought and effort that has gone into solving that one simple problem in software development over the past 2 decades.  Here's a small sample of buzzwords, trends and methodology that are concerned with reducing the time between making a change to software and seeing the results:


**Agile -** Agile is all about delivering working software sooner, so that you produce value faster and learn lessons quickly.

**Test Driven Development (TDD) -** Test driven development is a process designed to let you know as soon as possible when a change has had the desired effect during development, and also sets up the conditions under which you know as soon as possible when a change has had an undesirable side effect.

**Devops -** Devops has been a push over the past decade to automate and control all parts of the software creation, deployment and maintenance life cycle.  Automation like continuous integration servers that run your test after every commit, chat bots that alert you based on site performance metrics, and servers that automatically build a copy of every branch for testing in a virtual machine are all examples of Devops being used to speed up the point when you know that a change worked or didn't work.

**Developer Experience -** This is a more recent buzzword that I've seen thrown around a lot in the JavaScript community, talking about improving developer tools.  Developer tool features like hot reloading, nicer error messages, specialized debugging and profiling tools, and fast build times all fight this same problem of getting a result as fast as possible.

### Feedback Loops


All of these tools are concerned with *feedback loops*, the process by which developers, designers and product managers make changes, learn about the effect of those changes, and then iterate.  Teams with slow feedback loops spend a lot of time planning and thinking about every change, making sure to get everything right. They feel the cost distinctly each time they make a mistake, and it generally leads to a more cautious mindset.  Teams with fast feedback loops can plan too.  But they also have the option of taking a more experimental attitude and learning from their attempts. This can happen at multiple scales:

- A **developer** can try out 5 different CSS rules in the UI in a few seconds if his UI is hot reloading and he doesn't have to wait for a whole SCSS bundle to recompile
- A **QA team** can immediately know if somebody pushes a change that would breaks tests if they have a CI server set up to run tests against every new commit to each branch.
- A **product team** can see quickly that a new feature is problematic if he's able to see detailed analytics on usage, instead of waiting to do enough user interviews to get a full picture
- A **company** can change direction if they ship an MVP early instead of attempting to wait and release the perfect product

### Closing Your Loops

As a developer who wants to make your product better, one of your best power moves is finding ways to speed up feedback loops.  Here are 4 suggestions for how to do that:

1. **Ask Questions Early:** One of the most important feedback loops for a developer is between yourself and the individual in charge of defining what you're building.  If you simply take requirements from your PM/Manager/Lead/Designer/CEO/Client and go off and build your giant amazing piece of beautiful software, without any clarification, there's a pretty good chance you're going to get to build it again, this time twice as fast without the budget.  Asking clarifying questions early prevents you wasting your time and exposes understanding gaps and technical barriers while there's still a chance to deal with them.
2. **Get Feedback as you go:** Similarly, anytime you have a chance to get feedback on work while it is still in process from somebody who might object in the end, do it.  This means instead of building everything at once, work on smaller chunks.  This often takes time and thought, but the earlier you create *complete* chunks of code that can be evaluated and ideally shipped on their own, the more likely you are to ship something great in the end.
3. **Optimize your environment:** Have you spent time figuring out how to work as efficiently as possible?  Have you done it recently?  If not it might be worth re-evaluating your setup on a quarterly basis or so, figuring out what tools you can use to get quicker feedback, and also learning the shortcuts, tricks and new features for the tools that you do use.
4. **Ship Code:** Ultimately the best feedback comes when people are using what you've written.  Whether that's compliments, bug reports, feature requests, anger or viral adoption, shipping will tell you things that you would never have been certain of while iterating on your own.  If you're struggling to get code out, always fix that first.
