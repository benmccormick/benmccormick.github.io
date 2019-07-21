---
title: "Designing React Components: Supporting Refs"
date: "2019/07/15"
layout: "post"
path: "/2019/07/15/designing-components-refs"
description: ""
keywords: ""
category: "frameworks"
topics: ['React']
key: "designing-react-components-refs"
readNext: "reusable-react,fe-concerns,react-confessions"
isDraft: true
---

Good component design is one of the key skills for React developers.  Experience helps us create components that can be easily composed, are resilient to changing circumstances and intuitive to use.  There's a lot of "art" involved here, but some aspects of creating good components are just knowing how to connect pieces together, and have components support common React features and patterns.  One of those features is refs.  So lets talk about how we can support refs in our components.

### When Do You Need to Support Refs?

Refs are a React feature designed to make it possible for parent components to get direct access to DOM elements.  The classic use case here is allowing a parent component to `focus` a child input.  When the parent component renders the input directly, this is easy.  A simple "click button to focus input" component might look like this:

```javascript

const ClickToFocus = () => {
    let inputRef = React.createRef();

    const focusInput = () => {
        inputRef.current.focus();
    }
}

### Different types of refs

### Adding refs support to a component


