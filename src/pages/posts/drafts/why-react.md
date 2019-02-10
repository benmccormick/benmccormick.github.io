---
title: "Why React?"
date: "2019/01/28"
layout: "post"
path: "/2019/01/28/why-react"
description: "Getting the most out of your code review process"
keywords: "code reviews"
category: "frameworks"
topics: ['Architecture', 'React']
key: "why-react"
isDraft: true
readNext: "react-confessions,fe-concerns,valuable-code-reviews"
---

As React continues to evolve and grow in popularity, it can be easy to forget why it has been successful.  I've been working with React for 4 years now, and it's been the best tool I've used for UI programming.  This is my attempt to explain why.


### Composition Done Right

Software Engineers have discovered several methods of sharing logic across multiple scenarios over the years.  One of the most popular is composition, the process

Prior to React, composing UI in JavaScript sucked.  It's not that no technology let you do it: composition has been a staple of UI libraries.  But previous JavaScript UI libraries suffered from a variety of issues:

- Non-standard composition interfaces
- Heavy boilerplate for component creation
- Composition needs to be coordinated across several files


- Prior to React, composition sucked
- React is good because
  - Simple composition is obvious
  - Its easy to extract and refactor composition
  - It's easy to compose with different simple patterns (child, list, areas)
  - It's possible to compose with complex patterns (decorated children, conditional children)
  - Composition works through interfaces, you don't need to understand implementations


### Declarative State makes everything easier

- Prior to React it was often difficult to know how a particular situation occurred
- React's (props, state) => UI model makes it much easier to understand what is happening on the screen
- Also makes it easier to think in terms of state machines at run time

### Separating the right concerns

- Everything you need is in one file

### Small and focused enough to encourage creativity
