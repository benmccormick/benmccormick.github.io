---
title: "Productive JavaScript Development"
date: "2015-11-25 14:43:46+00:00"
layout: "post"
path: "/2015/11/25/productive-javascript-development"
category: "software-productivity"
pageViews: "2253"
last30pageViews: "143"
---

I've been thinking a lot lately about how we as a JavaScript community can enable more productive JavaScript development.  Most of the major JavaScript libraries were created or popularized to further a theory of how we can be more productive.  jQuery emerged when the biggest productivity challenge for web developers was the incompatible implementations of JavaScript and browser APIs in different browsers.  It largely solved that problem.  Since then, Backbone advocates have pushed for greater productivity through libraries with minimal abstraction where users can understand the source code, Ember has created an ecosystem around the idea that "shared solutions" lead to greater productivity, Angular aimed to make developers (and designers) more productive by adding more power to concepts that were already familiar to them, and React is trying to improve productivity by simplifying the programming model around interfaces.  Meanwhile, tangential to the big frameworks, there has been work to enable more productive development through transpile-to-JavaScript languages (CoffeeScript, TypeScript, Elm, ClojureScript etc), replacing JavaScript on the web period (Dart, WebAssembly, ASM.js), and improving the core JavaScript language while allowing developers to use new features early (ES6 and beyond, as well as Babel).  There's also work to improve tooling around JavaScript with projects like [Tern.js][tern], [Time Machine/React Hot Loader][timemachine], and continued improvements to Chrome and Firefox developer tools (along with Framework specific developer tools). So there's no shortage of work being done in this area.  But let's pull out for a moment.  What are the big picture things that affect productivity?

Most of the time productivity tools are focused on one of 6 areas.  They make it easier to learn concepts,  easier to write code, easier to read code, easier to architect applications, easier to maintain applications, or easier to debug applications. Here are some examples of each

#### Easy To Learn

Angular and Backbone both try to improve programmer productivity by being easy to learn, each in different ways.  Angular puts much of its view logic inside HTML, a medium that many server-side developers and designers are already familiar with.  Therefore it's a reduced learning curve than something like React, where the UI tends to be more spread across files and is mixed with JavaScript logic <sup id="fnref:1">[1](#fn:1)</sup>.  Angular also provides extensive documentation, which helps programmers come up to speed faster.  

Backbone on the other hand, attempts to be easy to learn in two ways.  First, there just isn't that much to learn.  Backbone is a small library with only 6 core concepts (Models, Collections, Views, Events, and Router) each of which should be familiar to developers coming to it from other UI focused frameworks.  That simplicity reduces the load on new users.  At the same time Backbone strives to have libary source code that is both short and readable.  It's quite possible to read the code for the whole library in under an hour, and the core concepts are obvious when looking through the code.

#### Easy to Write

Ember.js aims to make it easy to write application code in at least 2 ways.  First it provides [tooling][embercli] to help generate the boilerplate necessary for an ember application.  You can give ember-cli a model name and it will generate the file for that model in the correct place.  In addition Ember abstracts away many of the connections between classes so that you can load the correct files simply using naming conventions, resulting in less code.  

The recent updates to the JavaScript language are about much more than just making it easier to write JavaScript, but several of the features are focused on providing cleaner syntax for common idioms.  Arrow functions in particular allow for maintaining the outer scope of a function in a clean way, when previously it required jumping through hoops that were easy to mess up.

Redux and React Hot loader are an attempt to develop a programming idiom that allows for drastically reduced latency between making a change and seeing a result.  A React app using redux and a hot loader can be updated instantly without losing state and cycle backwards and forward through state updates.  Lower latency between writing code and seeing the results makes it much easier to iterate quickly towards good code.

#### Easy to Read

One of the biggest gains provided by React is an increase in the readability of code by combining all of the elements of a component (JavaScript, HTML and in some cases CSS) into a single file where the component can be read as a coherent whole without flipping through code.

CoffeeScript is an attempt to strip out the unnecessary syntax bloat of JavaScript and focus on the pure logic.  Whether it succeeds is a totally different question, but it's a great example of attempting to satisfy this side of the productivity problem by reducing the distractions in code.

Type annotation tools like TypeScript and Flow also aim to increase code readability, but not by clearing out bloat (annotations can actually make the code feel more crowded and less readable at first).  Instead they add additional information to the code, making the structure and expectations of the code more apparent to a reader.


#### Easy to Architect

Ember really shines when it comes to making it easy to architect apps.  By providing clear guidance on how to structure apps, it can increase productivity by reducing bike-shedding.  In Ember every state of the UI is tied to a URL and each route is tied to controllers that display components.  Communication between components happens with actions and data is managed by Ember Data.  Thats a reasonable architecture thats general enough to work for most large web applications (Embers target).

Unfortunately examples of innovation in this area are much more sparse than the others here, probably because it's hard to demonstrate in a todo app.  There's been a recent spate of interest in application architecture from all of the Flux implementations that have popped up for React apps.  I've also seen interest in the architecture model of [Elm][elm].  But most of the major MVC frameworks have much less community agreement on architecture than they do on smaller scoped issues.


#### Easy to Maintain

There are a lot of technologies around JavaScript that promise to make your code more maintainable.  Module loaders like requireJS, browserify and webpack, linters like ESLint and JSHint, type checkers like TypeScript and Flow, and test runners like Mocha and Karma all provide tooling around maintainability.

At the framework Backbone addresses the idea of maintainability by keeping small and flexible enough to remain usable as requirements change.  React deals with it by simplifying the programming model enough that its easier for new developers to see whats going on.  And Ember deals with it by maintaining a disciplined process for continually improving the framework to "keep up with the web" without leaving developers behind.

#### Easy To Debug

In recent years a lot of work has gone into improving developer tools for debugging JavaScript. This has happened at 3 levels.  First browser vendors, especially Google and Mozilla,  have made a huge investment in improving the developer tools that ship with browsers.  It's now possible to identify many errors quickly that would have been mere guesswork before.  Secondly, frameworks have worked on building their own developer tools.  React and Ember both have incredibly powerful debugging tools with first class support from the framework team.  Marionette (a framework for Backbone apps) has a similarly rich debugging tool, and Angular also has tools for debugging.  Finally, linters and transpilers are also helping to catch some classes of errors at compile time rather than waiting to discover them at run-time.

Other than tools though, Frameworks can have some features that make them easier or harder to debug.  React and Angular both make a big deal of being easy to write tests for.  In Angular this is true because of their dependency injection system.  In React this works out because React components are basically pure functions that take state and properties and return DOM.  Pure functions are easy to test, especially compared to traditional UIs that are tied to the global mutable DOM. Backbone also contributes to easier debugging by presenting a relatively straightforward and readable source that developers can trace through without becoming baffled by "library mystery meat".

### Choices, Choices

When picking a toolset in JavaScript it's helpful to think about all 6 of the above areas.  Any library or framework that has gotten past the minimum threshold of solving a problem will claim to help you in at least one of these areas.  But a useful comparison will run across all six.  What do you think are the best tools for a truly productive workflow in the JavaScript community today?

<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        Not saying that this is the best way to make things easy to learn, just that it is a goal.
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>

[tern]: http://ternjs.net/
[timemachine]: https://github.com/gaearon/react-hot-loader
[embercli]: http://www.ember-cli.com/
[elm]: http://elm-lang.org/
