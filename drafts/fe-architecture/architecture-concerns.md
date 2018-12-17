---
title: "The Concerns Of Front End Architecture"
date: "2018/12/30"
layout: "post"
path: "2018/12/30/the-concerns-of-fe-architecture/"
description: "6 areas of interest in front end software design discussions"
keywords: "architecture software performance security accessibility"
category: "fe-architecture"
topics: ['Architecture', 'JavaScript']
key: "fe-concerns"
readNext: "feedback-loops,react-confessions,orthogonality-css-js"
---

Software Architecture is a fuzzy concept.  The generally used term "architecture" makes an analogy to another field that was probably more appropriate when software was created in a [waterfall style](https://en.wikipedia.org/wiki/Waterfall_model) with months of planning in advance of coding, QA and other implementation concerns.  The other word that is commonly used, *design*, is over-loaded in the software space, especially for front end use cases where it is assumed to refer to visual or UX design.  I've heard people talk about architecting a feature and architecting an application. Applications are said to have front end architectures and back end architectures.  Some folks say they're using a particular framework like Redux as their "architecture".  And none of these people seem to mean exactly the same things.  I don't claim the authority to define such a wildly used word, and even if I did I suspect that like design, it's overloaded to the point of uselessness instead.  But I'm interested in taking a different approach.  Over the next few weeks, I'm going to talk about front end architecture in terms of it's core concepts in order to create a reference point for future conversations, starting with the high level concerns of front end architecture.

### 6 Concerns

The word architecture gets attached to a million different things so it can seem tough to narrow down what an architecture encompasses.  But we can easily group the different goals front end developers may want to optimize into a few simple categories.


#### Reliability

Is a site or  application consistently available to users?  Does it often fail, and if so how does it recover?  If things are breaking, are the developers aware of it quickly?  Do different users in different scenarios receive a consistent experience?

#### Performance

Is a site or application consistently quick to load and interact with?  If there are animations or highly interactive elements, are they responsive and usable, or do they freeze/jank? Is the user disrupted in their tasks by strange loading behavior?

#### Ease of Change

When new requirements arrive, how quickly are developers able to make changes and release new code to production?  When there are bugs, how easy is it to find the problem and fix it?  Are developers able to consistently deliver correct code?  Or are multiple iterations often required?

#### Accessibility

This concern is broader than the way the word is often used in web dev circles.  Is the full audience of this site or application able to use it with as few limitations as possible?  Users with disabilities?  Users with older but supported browsers?  How about international users or those with slow connections?  Does your site work on mobile?  Offline?  On Apple Watch?  Do you support AMP? And do your pages appear nicely on social media?  Do you even care about any of these audiences? Maybe you're optimizing for people who aren't your users?

#### Security

Can a malicious user inject code into your site?  Are you unnecessarily exposing information about your users or code structure? And you are working with your API developers to use secure authentication and authorization practices right?


#### Capability

Is your site limited in fulfilling its purpose because of foundational decisions or tradeoffs with the other concerns?  Have you made decisions that let you serve your audience in unique ways because of your tech stack or development processes?  Do your technical decisions even make sense in the context of your site or application's purpose?


### Think about goals

Next time you see a feature touted by a framework or tool, consider which of these concerns they're attempting to address.  Many of them are trying to solve problems across multiple of these categories, and some make tradeoffs from one category in order to optimize for another one; many passionate arguments on the internet boil down to a question of performance vs ease of change.  Thinking in terms of concerns can help you see the bigger pictures as you choose tools and discuss them with your teams.

