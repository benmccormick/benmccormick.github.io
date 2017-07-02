---
title: "Orthogonality and CSS in JS"
date: "2017-01-03 00:00:00+00:00"
layout: "post"
path: "/2017/01/03/orthogonality-and-css-in-js/"
description: "Separation of concerns in the context of CSS and JavaScript"
keywords: "CSS JavaScript Orthogonality Pragmatic Programmer"
category: "software-productivity"
key: "orthogonality-css-js"
readNext: "jest-first,ll-context,callbacks-to-promises"
pageViews: "6775"
last30pageViews: "119"
---

One of the realities of the constant change in the web development world is that "best practices" are often hotly contested.  One issue that the front end community doesn't seem to have come to a consensus on yet is how tightly to bundle JavaScript, HTML and CSS in code.  Should they be bundled and managed completely separately?  Kept in different files and imported together into JavaScript component files?  Or can we remove HTML and CSS files entirely and generate everything in JavaScript? This is a discussion that still comes up all the time in my [twitter](https://twitter.com/thomasfuchs/status/810885087214637057) [feed](https://twitter.com/TheLarkInn/status/812089065210335232).

Many new frameworks that encourage a component based architecture (including React, Vue, and Angular2 [^1]) provide affordances for including HTML and CSS directly in JavaScript, but those solutions are not yet used universally.  Many people are still very happy keeping CSS bundled separately.  I have no idea what the *best* solution is.  But I am interested in how people talk about the problem.  One major argument I have seen from people advocating both sides is that their preferred approach encourages good "separation of concerns".

<div>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I&#39;m moving from storing my CSS, JS and HTML in different files, to physically putting them on different drives. Keep those concerns separate</p>&mdash; Ben Lesh (@BenLesh) <a href="https://twitter.com/BenLesh/status/812092408519413761">December 23, 2016</a></blockquote>
</div>

I'd like to take a deeper look at this and give some vocabulary that can hopefully help anyone working through discussions on how to manage CSS for components.  I'll focus specifically on CSS since frameworks tend to be more agnostic to how it is blended with JS than they are about HTML, and on components since that is the main context in which people are arguing for blending of css. For this piece, I'll consider a component to be a set of HTML, CSS, and JavaScript that combine to form a reusable piece of UI [^2].

### Orthogonality, Cohesion, and Coupling

[The Pragmatic Programmer][pragprog], one of the best books ever written on Software Engineering, uses the following three terms when talking about "Separation of Concerns": orthogonality, cohesion, and coupling.  

Orthogonality is the idea that modules should be written in a way that a change in one module should not require changes in any other module.

>Two or more things are orthogonal if changes in one do not affect any of the others. In a well-designed system, the database code will be orthogonal to the user interface: you can change the interface without affecting the database, and swap databases without changing the interface.
>
> **— The Pragmatic Programmer**

Cohesion is a measure of how well the internal contents of a module relate to each other. A cohesive module is one with a single well defined purpose, where all code in the module is related to that purpose.  A less cohesive module might have multiple purposes, with pieces of code that are completely unrelated to each other.  [Robert C. Martin](https://sites.google.com/site/unclebobconsultingllc/) describes this as each module having "a single reason to change".

Coupling is a measure of how dependent different modules are on the internal workings of other modules. In a loosely coupled system, any module can be completely rewritten as long as it exposes the same public interface, without any other modules needing to change.  In a tightly coupled system, changing the internal details of one module may require changes in many other modules.

In the real world most systems are not purely orthogonal, and their modules are likely not 100% cohesive and uncoupled.  But striving for these goals is a good approximation of what many people mean when they talk about *separation of concerns*.

### Conways Law

[The Pragmatic Programmer][pragprog] does touch on another application of orthogonality to software engineering:

> Have you noticed how some project teams are efficient, with everyone knowing what to do and contributing fully, while the members of other teams are constantly bickering and don't seem able to get out of each other's way?
>
>Often this is an orthogonality issue. When teams are organized with lots of overlap, members are confused about responsibilities. Every change needs a meeting of the entire team, because any one of them might be affected.
>
>How do you organize teams into groups with well-defined responsibilities and minimal overlap? There's no simple answer. It depends partly on the project and your analysis of the areas of potential change. It also depends on the people you have available. Our preference is to start by separating infrastructure from application. Each major infrastructure component (database, communications interface, middleware layer, and so on) gets its own subteam. Each obvious division of application functionality is similarly divided. Then we look at the people we have (or plan to have) and adjust the groupings accordingly.
>
>You can get an informal measure of the orthogonality of a project team's structure. Simply see how many people need to be involved in discussing each change that is requested. The larger the number, the less orthogonal the group. Clearly, an orthogonal team is more efficient.
>
> **— The Pragmatic Programmer**

The idea is that teams work more efficiently when each can work in its own areas without having to be bogged down by using another group (or individuals) code, and only interacting with those modules through a well communicated interface.  This is also known as [Conway's Law](https://en.wikipedia.org/wiki/Conway's_law), which is often used disparagingly but still stands as a true observation about real life code.

>organizations which design systems ... are constrained to produce designs which are copies of the communication structures of these organizations
>
> **— Conway's Law**

Although it usually isn't phrased quite so explicitly, I believe Conway's law is often related to what people mean when they discuss separation of concerns in front end development.

### Boundaries and Interfaces between CSS and JavaScript

Let's look at 2 examples of how CSS can be structured.  We'll use a "page view counter" as our example. The element will show the number of users who have viewed the page, and respond to click events by showing a modal with the most popular pages on the site.
First, for a more traditional example, I'll show a [Marionette](http://marionettejs.com/) View, with separate CSS. For a more integrated example, I'll use a React component.

#### Marionette

```javascript
//view-counter.js

import Mn from 'backbone.marionette';
import template from './view-counter.hbs'
import { getPageViews, showModal } from '../util/page-views';

var ViewCounter = Mn.View.extend({

  template,

  className: 'page-view-counter',

  ui:  {
    'showPageViewsModal': '.show-modal-js',
  },

  events: {
    'click @ui.showPageViewsModal': 'showPageViewsModal',
  }

  templateContext() {
      return {
        pageViews: getPageViews(),
      };
  },

  showPageViewsModal() {
    showModal();
  }

});
```

```hbs
{{!view-counter.hbs}}

<span class="page-view-counter__title"> Page Views: </span>
<span class="page-view-counter__counter show-modal-js"> {{pageViews}} </span>
```

```css
//view-counter.css

.page-view-counter {
  display: flex;
}

.page-view-counter__title {
  font-weight: 700;
  padding: 3px;
}

.page-view-counter__counter {
  padding: 3px;
}
```

#### React

```javascript
//view-counter.jsx
import React from 'react';
import { showModal } from '../util/page-views';

export const PageViewCounter = (props) => {
    return <div style = {{display: 'flex'}}>
      <span style = {{
        fontWeight: 700,
        padding: '3px',
      }}>
        Page Views:
      </span>
      <span style = {{padding: '3px'}}>{this.props.pageViews}</span>
    </div>
}

```

The React and Marionette examples have set different module boundaries. In the Marionette example, we have defined 3 modules, split by code type.  Ignoring the leaky abstractions in the Marionette boundaries [^3], we can say we have 3 modules with clear singular purpose (styling, behavior,  structure) that use class names and  `templateContext` as interfaces.  The handlebars file exposes classes, which the CSS uses to style elements and the JavaScript code uses as attachment points for event handling.  The JavaScript view passes data to the template through templateContext.  In the React code we have defined a single module that exports a component as its only external interface. The module's single purpose could be defined as "rendering a PageViewCounter".

### How do we define module boundaries?

If you're excited to read which of the above examples is the *correct* module boundary definition, I'm sorry to disappoint you.  It turns out that module boundaries are more of an art than a science.  Let's consider each of these examples by the criteria we laid out above.


The Marionette modules are **cohesive**.  Each module is single purpose, with a clear reason why it might change.  The React module is also cohesive, as it describes a single atomic component. However, it has more reasons it might change.  We might change that module because of a change in the look and feel of the site, because of a change in the expected behavior of the click event, or because we're changing the text inside the component.

The Marionette modules are not quite **decoupled**.  While this CSS doesn't nest selectors and we don't have any explicit dependencies on the HTML structure, it is still written in a way that assumes `.page-view-counter__title` and `.page-view-counter__counter` will be direct children of `.page-view-counter`.  So changing the "internal details" of the Handlebars file by adding an extra element around those children would break the CSS. While the modules are not completely decoupled from each other, they don't rely on any private details of other modules or global styles and can be used together as a reusable component.  The React module is similarly decoupled from the rest of the system, and as a single module faces no internal coupling issues.

Both components should be **orthogonal** from the rest of the system, even though the Marionette modules may be less orthogonal internally.  The question of how they meet a Conway's law style of orthogonality depends on a team.  If your team has designers, and developers separately working on style/structure and behavior, the Marionette version may allow for more efficient division of labor, with communication centering on class based communication.  If you instead have a group of polyglot front end developers who implement mocks from designers across all 3 areas, the React version will instead present a simpler implementation that maps better to your team, with the focus on interfaces across different components.  

In the end decisions like this are an exercise in understanding context and preferences.  What will make your team productive? You can accept the coupling of the first example in order to gain the benefits of small focused modules.  Or you can take the larger scope of the React component in exchange for keeping all information relevant to a component in one place.  Are you making single developers responsible for a set of components?  Or are they responsible for behavior generally, with design handled by someone else? Make the decisions that work for your project.


### More Resources

- [The Pragmatic Programmer][pragprog] is a great book. Much of the vocabulary in this post comes from its Chapter 8, but the whole book is worth a read and is highly recommended.
- CSS Tricks has a good look at the [pros and cons of CSS in JS](https://css-tricks.com/the-debate-around-do-we-even-need-css-anymore/).  I focused on theory here, but this is much more hands on about the practical concerns around this debate.  



[^1]: This is a bit of a generalization.  React provides an abstraction over HTML that replaces hand-written HTML, but doesn't specify anything for CSS, CSS in JS solutions are simply popular in that community.  Vue and Angular both allow  CSS and HTML to share a file with JS, but CSS can still be handled separately.
[^2]: There are some distinctions about CSS in JS vs importing CSS into JS using webpack that I'm not really dealing with here.  This is a post about how to think about these decisions moreso than the specific options for bundling CSS and JS
[^3]: The root HTML element in any Marionette component is always defined implicitly in JavaScript, and Handlebars is an expressive templating language that can handle more than structure.

[pragprog]: http://amzn.to/2hNzQ0t
