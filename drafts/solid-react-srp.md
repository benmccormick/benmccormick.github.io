---
title: "SOLID React"
date: "2018/01/18"
layout: "post"
path: "/2018/01/18/solid-react/"
description: "Applying the Single Responsibility Principle to React Applications"
keywords: "SOLID single responsibility principle react javascript architecture"
category: "software-productivity"
key: "solid-react-srp"
readNext: "large-improvements-small-team,ten-things-js,ll-context"
---


### Intro

- What is SOLID
- Different constraints for UI

I've been reading through [Clean Architecture](http://amzn.to/2mKoejo) by Robert "Uncle Bob" Martin this month[^1], and it's reminded me of the SOLID software development principles.  SOLID is a set of rules he created to help make software designs more maintainable.  I thought it would be an interesting exercise to see how these principles apply to front end development with React.  It's a bit tricky to translate them since the original principles were written in the context of designing multi-layer systems in statically typed languages, but as complexity has shifted to the front end in many systems, JavaScript UIs are facing many of the same problems that a server-side or embedded system might have faced in the past, and it's useful to try to learn from that past rather than forget it.


### Separating out UI library components from page components


1. Don't include business logic in components (but feature specific display logic may be ok?)
2. Don't break the prop interface abstraction
3. Separate out UI library components from page/feature components
4. Make targeted use case components
5. Pass deps as props where possible, don't import directly


[^1]: At the time of writing this, it was super on sale on <a href="http://amzn.to/2mKoejo">Amazon</a>
