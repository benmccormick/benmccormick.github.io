---
title: "Reusable Code In React: Inheritance, Decorators, Composition and Mixins"
date: "2019/01/28"
layout: "post"
path: "/2019/01/28/reusable-react"
description: "How React uses multiple code sharing patterns to create a great developer experience"
keywords: "react inheritance composition mixins"
category: "fe-architecture"
topics: ['Architecture', 'React']
key: "reusable-react"
isDraft: true
readNext: "react-confessions,fe-concerns,valuable-code-reviews"
---

Once you get past the initial complexity it creates by bucking conventions, React is the most developer friendly UI library I have ever used.  A big reason for that is the way it uses and encourages a variety of patterns to share codes and concepts across a code base. Let's look at how 4 traditional code re-use patterns are used by React and in the React ecosystem.

#### Inheritance

- How React provides a standardized component instance and lifecycles (in Class components)

#### Composition

- How React users reuse standardized UI pieces (also Redux's way of forming data stores)

#### Decorators

- One way that React users reuse standardized patterns across different types of components

#### Mixins

- Mixins (hooks!) provide a new way of sharing lifecycle behavior across components, and also provide new ways to reuse standardized data patterns