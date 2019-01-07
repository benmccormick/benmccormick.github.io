---
title: "What's involved in Front End Architecture?"
date: "2019/01/07"
layout: "post"
path: "2019/01/07/the-concerns-of-fe-architecture/"
description: "6 areas of interest in front end software design discussions"
keywords: "architecture software performance security accessibility"
category: "fe-architecture"
topics: ['Architecture', 'JavaScript']
key: "fe-concerns"
readNext: "feedback-loops,react-confessions,orthogonality-css-js"
---

The word "architecture" gets thrown around a lot in software discussions.  But we don't seem to always use it the same way.  Some example usages:

> Our app uses Redux for our architecture.

Sometimes we assume that because we are using a framework or data management library, that must be our architecture.

> I created a diagram of our dependency graph, showing all the imports in the code, as a way of seeing our architecture.

We could also say the way your program is structured (which files depend on which other files) represents your architecture.  If we're fancy, then maybe we have [UML diagrams](https://en.wikipedia.org/wiki/Unified_Modeling_Language) representing this structure.

>  Bob is our architecture guy: he decides what dependencies we can bring in, is always asking us to refactor code to make it "cleaner", and runs a design meeting before each feature to decide how to structure the code

This final quote sounds like architecture is more about the decisions you're making as you go through a project.


### Appealing to authority?

So if the community isn't using the term consistently, let's ask the experts.  Here are 2 definitions from folks who have written popular books on software architecture.

Robert Martin (Uncle Bob) uses the following definition in [Clean Architecture](https://amzn.to/2rROcEA):

> The goal of software architecture is to minimize the human resources required to build and maintain the required system.

Martin Fowler gave his definition in a talk titled [Making Architecture Matter](https://www.youtube.com/watch?v=DngAZyWMGR0). It is worth watching in full, but paraphrased, his definition is:

> Software architecture is those decisions which are both important and hard to change

These 2 definitions turn out to be complementary.  Uncle Bob motivates architecture: we're focused on minimizing the work put into the system.  Martin Fowler's definition shows what parts of the system architecture is concerned with: the parts that are "important" and hard to change.

The next question of course is... what is important?  The unsatisfactory answer is that it depends.  It will change between projects, and will change within a project over time.  But when we scope the question to the domain of front end development, common themes emerge.  Specifically there are 6 areas of concern that I see coming up again and again in public and private front end architecture discussions.  They're not exclusive to the front end, but they're a good starting point for anyone thinking about building web applications.

#### Ease of Change

When new requirements arrive, how quickly are developers able to make changes and release new code to production?  When there are bugs, how easy is it to find the problem and fix it?  Are developers able to consistently deliver correct code?  Or are multiple iterations often required?

#### Security

Can a malicious user inject code into your site?  Are you unnecessarily exposing information about your users or code structure? And you are working with your API developers to use secure authentication and authorization practices right?

#### Accessibility

This concern is broader than the way the word is often used in web dev circles.  Is the full audience of this site or application able to use it with as few limitations as possible?  Users with disabilities?  Users with older but supported browsers?  How about international users or those with slow connections?  Does your site work on mobile?  Offline?  On Apple Watch?  Do you support AMP? And do your pages appear nicely on social media?  Do you even care about any of these audiences? Maybe you're optimizing for people who aren't your users?

#### Reliability

Is a site or  application consistently available to users?  Does it often fail, and if so how does it recover?  If things are breaking, are the developers aware of it quickly?  Do different users in different scenarios receive a consistent experience?

#### Performance

Is a site or application consistently quick to load and interact with?  If there are animations or highly interactive elements, are they responsive and usable, or do they freeze/jank? Is the user disrupted in their tasks by strange loading behavior?

#### Capability

Is your site limited in fulfilling its purpose because of foundational decisions or tradeoffs with the other concerns?  Have you made decisions that let you serve your audience in unique ways because of your tech stack or development processes?  Do your technical decisions even make sense in the context of your site or application's purpose?


### Coming Soon

I'm hoping to look at each of these areas more in depth in the coming weeks, as well as exploring how we make decisions that impact multiple areas simultaneously.  In the meantime, as you're looking at decisions and tools that will impact the long term structure of your front end application, consider how they'll impact each of these areas.



**TL;DR**

- **Architecture is about decisions that are important and hard to change, with a goal of improving the efficiency of a project**
- **Front End architecture is often concerned with the areas of Ease of Change, Security, Accessibility, Reliability, Performance and Capability**

