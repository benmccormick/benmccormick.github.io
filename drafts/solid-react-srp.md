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


I've been reading through [Clean Architecture](http://amzn.to/2mKoejo) by Robert "Uncle Bob" Martin this month[^1], and it's reminded me of the SOLID software development principles.  SOLID is a set of rules he created to help make software designs more maintainable.  I thought it would be an interesting exercise to see how these principles apply to front end development with React.  It's a bit tricky to translate them since the original principles were written in the context of designing multi-layer systems in statically typed languages, but as complexity has shifted to the front end in many systems, JavaScript UIs are facing many of the same problems that a server-side or embedded system might have faced in the past, and it's useful to try to learn from that past rather than forget it.

### SOLID Principles

Here are the principles, with explanations pulled from **Clean Architecture**.


1. **The Single Responsibility Principle (SRP)** - A module should be responsible to one (and only one) actor.  IE there should only be one person or group responsible for changing any specific module.[^2]
2. **The Open-Closed Principle (OCP)** - For software systems to be easy to change, they must be designed to allow the behavior of those systems to be changed by adding new code, rather than changing existing code. So software artifacts should be *open* for extension but *closed* for modification.
3. **The Liskov Substitution Principle (LSP)** - If you're building a system using interchangeable parts, those parts must adhere to a contract that allows those parts to be substituted one for another.
4. **The Interface Segregation Principle (ISP)** - Modules shouldn't depend on things they don't use.
5. **The Dependency Inversion Principle (DIP)** - Code that implements high level policy should not depend on the code that implements low level details.  Details should depend on policy.

I'm not going to deep dive on these principles individually.  There are a bunch of articles out there breaking down the individual principles, and books that will cover those topics in even more depth.  Instead I want to think about what React patterns we should be encouraging or avoiding based on SOLID principles

### React Takeaways

1. **Don't include business logic in components** - This is maybe the most straightforward takeaway from the SOLID principles when it comes to React.  React components are used to build UI and thus are "low level" in the sense described in the Dependency Inversion Principle.  They should be used to display data, not determine the shape or value of the data.

That said the distinction between "business logic" and "display logic" can be subtle.  For instance it may be ok for a React component to contain sorting logic over data, if the sort is selectable in the UI, or specific to a certain view and not driven by a business rule.  But if you're building a search engine, the ordering of the results is certainly not something that you want to mix with your UI code, since it is a core purpose of the application, and may need to be used separately from a specific UI view.

2. **Don't break the prop interface abstraction** - This isn't explicitly tied to any one SOLID principle, but rather to an underlying assumption across several of them: that code should depend only on the interfaces of other modules, not on their concrete implementations.  JavaScript doesn't support the concept of interfaces at a language level, but React provides a great interface abstraction with "props".  Parent components depend on child props, and do so through a defined interface of props.  When parent components begin directly calling methods on a child component instance, or otherwise relying on implementation details, it shatters that interface layer, and provides a much tighter and more volatile dependency between modules.  This is definitely React conventional wisdom, but I remember breaking it several times early on in writing React code when I didn't understand some of the advanced patterns for interacting with and customizing child components[^3].

3. **Separate out UI library components from layout and feature components** - This rule is all about the Single Responsibility Principle.  When I build React components, I'm often interested in reusability, but it can be hard to tell whether a component actually needs to be reusable or not.  Thinking in terms of responsibilities can help.  In my current case, I'm a one man team working on a large app, but I can still think in terms of the business owners for a piece of code, and project out how things would be divided for a larger team.  In my case, that leads me to a mix of feature level modules (which may be made up of several React component classes), layout level components that glue the feature and UI level classes together with data, and UI library level components that provide low-level building blocks like buttons, modals and forms.

These modules can follow a hierarchy, where layout and feature level components can use UI library level components, but UI library level components don't depend on any feature level code, and thus can be maintained as a separate dependency.  

4. **Make targeted use case components** - This suggestion comes directly from the Interface Segregation Principle.  Because we don't want to depend on things we don't use, there can be some good value in creating lightly configurable components rather than directly using a single component with many configuration props.  For instance, in the (contrived) example below, we might consider using the `ActionButton` component below, rather than configuring it at every point.

Let's say we have a `<Button>` component that takes the following props: onClick, backgroundColor, showBorder, disabled, size.  We can use it directly like this:

```javascript
<Button
  onClick={action}
  backgroundColor={'#57A3E8'}
  showBorder={false}
  disabled={buttonIsDisabled}
  size={'large'}
> Do the Thing </Button>
```

However if we know that we're going to be using those settings in many places to create a semantically meaningful `<Button>`, we may want to create an `<ActionButton>` that only takes the
onClick and disabled properties, and keeps the styling properties constant.

```javascript
export const ActionButton = ({onClick, disabled, children}) => <Button
    backgroundColor={'#57A3E8'}
    showBorder={false}
    size={'large'}
    onClick={onClick}
    disabled={disabled}
  > {children} </Button>
```

which we can then use like this:

```javascript
<ActionButton onClick={action} disabled={buttonIsDisabled}>
Do the Thing
</ActionButton>
```

This has the benefit of semantic reusability and reducing copying, but more importantly
from a SOLID perspective, it means that the places we use `<ActionButton>` are insulated from
underlying changes in `<Button>`.  If we add new required props to `<Button>` we only need
to update `<ActionButton>`, and not the call spots.  More interestingly, if we significantly change the Button Component (this is where my simple example fails to scale), and maybe split the functionality out into multiple components, we only need to change ActionButton to point to the correct new component, or give it its own custom implementation, if its requirements diverge too far from the `<Button>` class.


5. **Pass dependencies as props where possible, don't import them directly** - This is the rule that I most wish somebody had taught me 2 years ago.  It can be very tempting to import dependencies directly into components for things like logging tools, data stores, messaging services, and other system components and utilities.  But doing so causes the components to be tied very tightly to that other code.  This has some practical disadvantages in the short term, for one thing it makes the code harder to test.  But it also has more subtle maintainability problems.  Essentially it violates the Open-Closed principle, because making changes to code is more likely to involve modifying the existing component, and less likely to be solvable with purely new code. 


[^1]: At the time of writing this, it was super on sale on <a href="http://amzn.to/2mKoejo">Amazon</a>
[^2]: This is often phrased as "A module should only have one reason to change", but I thought Martin's phrasing in Clean Architecture was clear and helpful.
[^3]: Kent Dobbs' <a href="https://egghead.io/courses/advanced-react-component-patterns">Advanced React Component Patterns</a> course on egghead is a good place to learn more about the various patterns you can use to avoid this type of interface-breaking.
