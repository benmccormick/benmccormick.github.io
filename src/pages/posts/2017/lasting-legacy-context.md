---
title: "Giving Context To Best Practices"
date: "2017-02-18T23:30:00+00:00"
layout: "post"
path: "/2017/02/18/context-to-best-practices/"
description: "What we talk about when we talk about best practices"
keywords: "best practices JavaScript"
category: "software-productivity"
readNext: "staying-productive,orthogonality-css-js,readable-code"
key: "ll-context"
topics: ['architecture']
pageViews: "269"
last30pageViews: "52"
---

I've noticed a frustrating trend in online discussions about web development where developers take their personal experience with a tool or practice and promote it as a universal truth.  Some of this is the nature of being human: we all see the world through our own lens.  But the best technical observations exist within a specific context.

Compare

> Everybody should be writing code using static types, the extra syntax is worth it because of all the bugs it prevents.

to

> If you're working in a large code base with many developers, static typing is extremely useful, because the overhead from writing extra code and compiler errors is more than made up for by reducing bugs and clearly expressing intent when developers edit code they didn't write.

The first quote presents a tradeoff and declares a universal preference for one direction in the tradeoff.  The second quote adds more details about the context in which the practice has been beneficial, and explains what about those circumstances (developers editing code they didn't write) affects the tradeoff decision.  

These type of distinctions are often lost in online discussions about development best practices. I have no interest in naming and shaming, but specifically I've seen this in discussions around JavaScript performance, testing, frameworks vs other frameworks vs VanillaJS, responsive design, progressive enhancement, and build pipelines.  For this post, I'm going to try to lay out a list  of some of the context that I've found helpful to take into account when giving or interpreting best practice advice.

### Context to keep in mind when discussing and interpreting best practices

#### Beginner vs Veteran

I'll start with a distinction that folks seem better about making. Sometimes recommendations that make sense for beginners don't work as well for more experienced developers and vice versa.  For instance it might make sense to advise a more experienced developer to use and heavily configure a build system like [Webpack](https://webpack.github.io/) for a new project. But beginners already have a lot to learn with each new project and might benefit from a simpler system; either a simple project without a build step, or a "batteries included" system like [Create React App](https://github.com/facebookincubator/create-react-app) or [Ember CLI](https://ember-cli.com/).  Making these distinctions is important for helping developers who may feel overwhelmed by all the concepts they need to learn when getting started with web development.

#### Big Team vs Small team vs Individual

Another dynamic that matters when expressing best practices is the size of a team working on a project.  If a project is being developed by a large team, or several teams, or is meant to be used as a library by many people, techniques like automated documentation, static type checking, and clear style guidelines may be essential.  But for a personal project or a professional project run by a 1 person team, those same techniques may provide a lot of overhead for minimal benefit. Most teams will fall between those extremes and will have to weigh the tradeoffs in each case.

#### Personal Project vs Internal tool vs B2B Products vs Consumer Products

The audience of a project is also important.  Some projects we build for ourselves.  Some may be internal for a company, or for a group that we're a part of.  Other projects are sold professionally to businesses or offered freely to consumers on the web.  There are different goals and expectations for each of these groups, that may impact which practices and techniques are important.  For instance, nobody cares if a personal web application you've made to organize your todos crashes in Internet Explorer or doesn't have alt-text for images.  But browser compatibility and accessibility might be extremely important for a consumer web app aimed at a broad population.  Similarly, it might be ok for your internal web tool to have un-minified JavaScript and large un-optimized CSS and JavaScript bundles, since it will always be served locally over a fast connection.  But it could severely hurt the user experience to do the same things for a high traffic public site.

#### Web page vs Web app

Distinguishing between web pages[^1] and web apps[^2] would short circuit a large number of internet arguments before they started.  Specifically arguments about progressive enhancement, whether we use too much JavaScript and whether a site is "acceptable" if it doesn't work without JavaScript.  Many accessibility and performance proponents push very strongly for less JavaScript and sites that work without JavaScript.  And that is a good thing... for the sites that **can** function without JavaScript.  Web apps like Trello, Google Docs, or Postman just don't make sense without JavaScript.  But saying that we should use less JavaScript isn't bad advice, it's just bad advice when given or taken without context.

#### Existing project vs Greenfield project

Some choices are only easy to make at the start of a project.  It is possible to change the language or framework a project is written in midstream, but it is often extremely risky and painful.  So asking a developer working on a 5 year old JavaScript project with thousands of lines of code why they didn't write it in [Elm](http://elm-lang.org/) or [ClojureScript](https://clojurescript.org/) is not helpful.  But suggesting that somebody write a new project in Elm may be just fine.

#### Short term project vs Long term project

Some software projects are meant to be written, completed, and never seen again.  For instance a promotional site for an event.  Some projects, like financial software, are meant to last for decades.  This is yet another distinction than can impact best practice discussions.  When working on a short term project, speed of delivery and initial quality tend to matter a lot.  For long term projects it may be better to prioritize maintainability, security and ease of deployment.


[^1]: Web page: sites that are mostly content focused with some possible interactivity layered on top
[^2]: Web app: sites that are primarily an interactive experience for the user and behave more like traditional desktop or mobile applications

[mobx]: https://mobx.js.org/
[es]: http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/
