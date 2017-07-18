---
title: "Ten Things A Serious JavaScript Developer Should Know in 2017"
date: "2017-07-18 01:00:00+00:00"
layout: "post"
path: "/2017/07/17/ten-things-javascript/"
description: "Some of the important things to pick up in the JS world"
keywords: "javascript reddit"
category: "javascript"
key: "ten-things-js"
readNext: "following-js-roadmap,jest-git,orthogonality-css-js"
---

There's been an interesting Reddit thread circling my corner of the internet for the last week or so. It started with a question:

>I'm inviting pure opinion here, but what's your list of ten things that everyone looking for a good javascript role should know and understand. Personally, I'm in a role where what I know is adequate, but I want to be somewhere better; somewhere that has some flippin standards. I'm learning outside of work requirements at the moment, but there is so much to learn out there.
The objective is to do good work in a good place.
Narrow it down to your ten for me, or for you..
*- From ["What 10 Things Should a Serious Javascript Developer Know Right Now?"]( https://www.reddit.com/r/javascript/comments/6mlc9d/what_10_things_should_a_serious_javascript/ )*

I think this is a great question if you take it seriously, because when you think about it critically, it exposes all of the things JavaScript don't really **need** to know.  Can you contribute productively as a mid-level JavaScript developer without knowing anything about [Prettier](https://github.com/prettier/prettier), [Typescript](https://www.typescriptlang.org/) or [React](https://facebook.github.io/react/)?  Sure!  Can you contribute productively if you're writing and testing your JavaScript using *<awful uncool code editor that you the reader can't stand>*?  Definitely.  So here's my take on answering the question.

## Assumptions

I'm making the following assumptions about the question

1. I'm assuming the audience is a developer who has some level of professional programming experience and some existing JavaScript experience, and that they are primarily interested in "code skill" answers. Thus I'll exclude things like communication ability, experience with version control, professional conduct, or basic coding ability that are very important to success in a JavaScript development environment but are out of the scope of this question.
2. I'm optimizing for "what specific pre-existing knowledge will make the most difference between success and failure for a new hire in a mid-level JavaScript role".  

  **Pre-existing** means that these are things that somebody is expected to know before taking the job.  Learning the details of a company's technology stack, style guide and engineering philosophy are all important, but you shouldn't be expected to know them in advance, and in many cases doing so is impossible.

  **Specific knowledge** means that these are things that you can learn with some effort and study.  They should not be broad categories like "security", "design", or "server-side development".  They  should be things you know or know how to do, not things you "have experience with".  And they should be specific enough that somebody can feel comfortable saying they understand the topic or don't. Most of the things I list below are *topics*, but I try to lay out a specific set of things that you would need to know to understand it.

  **The most difference between success and failure** means that these are the things that are really going to make a difference in how effective you are at understanding and completing the work assigned to you.  There are many such things, and their importance will vary situationally, so this is just my educated take on a generalists list.  

  When I say **mid-level**, I'm picturing hiring for a role that pays well but is not the most senior person on the team.  This would be a developer who would be expected to complete tasks with minimal help and oversight but wouldn't necessarily be planning the architecture of everything right off the bat.  To be clear this list is not a set of things that you need to go to get paid to write JavaScript.  It is more along the lines of "next steps" for junior devs.  Its also not a step function where you need to know all of these at once to get to the next level.  These are just things that may limit you if you don't have them.

  I'm taking the liberty to assume that **JavaScript role** implies using JavaScript in some sort of client/UI environment (Browser, React Native, Cordova, Electron, etc).  This list would be at least a bit different for a Node.js server-side role, and somebody else will have to write that post.

## The List

#### You should know the core language

JavaScript is not a very complicated language at its core.  It can seem difficult to learn because of all of the noise around it.  Browser APIs, Library APIs, jQuery, React, TypeScript, the many npm packages out there, etc all can make the language syntax space seem huge.  And this isn't helped by the fact that the language has evolved over time so you'll see many different ways to do a single task spread out over the internet.  But the core language and standard libraries are actually pretty small compared to languages like Python and Java that have more features and larger standard libraries.  Eventually you'll need the ecosystem.  But knowing the core language features that are implemented in most browsers is a great start.  

This means you should know about basic language features like if/else, error handling with throw/try/catch, array manipulation with push/map/reduce/filter, and string manipulation methods like replace/slice/split.  You should also know about how JavaScript handles things like truthiness and falsiness[^1], how to work with JSON data with the JSON object methods, and how variable scope works in JavaScript.  These days its also becoming more and more important to have at least a basic familiarity with the more important language features that were added in ES6 like Promises, modules, classes, template literals, generators and destructuring. Even if you choose not to use those features, being able to see and understand them will help you learn faster from others.

This list is mostly unordered, but this comes first because learning everything else becomes a lot harder without this knowledge, mostly because it becomes difficult to learn from other people's code since you won't understand what it is doing.  If you're starting from a weak base here I'd recommend finding a good book on the core language like [Eloquent JavaScript](http://amzn.to/2uD4R1Y)[^2] and digging in.  If you've been using JavaScript in an older code base or haven't used it in a while and want to catch up, you can see [my post on keeping up with new language features](https://benmccormick.org/2017/07/10/how-to-follow-the-javascript-roadmap/).

#### You should understand async code

One of the biggest leaps for new JavaScript developers, even those who are experienced with other languages is the amount of asynchronous code found in idiomatic JavaScript.  Asynchronous (async) code is code that is scheduled to run at a later time after some event, delay or response.  It can appear a bunch of different ways in JavaScript code, and it's important to be able to interpret them.

This means learning about [callbacks and promises](https://benmccormick.org/2015/12/30/es6-patterns-converting-callbacks-to-promises/) at least.   You should also learn about the JavaScript [event loop](http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/) and how it works  Ideally some of the standard APIs that use them like [setTimeout](https://developer.mozilla.org/en-US/docs/Talk:DOM/window.setTimeout) and  [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).  If you're ambitious you can learn about newer async syntax and library implementations like [async-await](https://ponyfoo.com/articles/understanding-javascript-async-await) or [RxJS](https://github.com/Reactive-Extensions/RxJS) But the most important thing is to spend time using and writing async code so that you get an intuitive understanding of how it works.

### You should get comfortable with at least one set of developer tools

When developing JavaScript, its important to be able to debug problems and understand how existing systems work.  JavaScript has a fantastic ecosystem of developer tools for diagnosing bugs and examining application code.  For the most part they're bundled with browsers (though some IDEs like VS Code and WebStorm have their own debuggers).  Learning how to use these tools well will turbocharge your JS dev skills.  If you can't use them though, it will make everything much harder.  

Competence in this means comfort with at least the JavaScript debugger panel of a browser's devtools.  You should be able to set and use breakpoints, use watch mode and the console to test for the value of expressions, and understand the stack traces. But its also good to get comfortable using the elements panel to understand and manipulate the DOM, and the network panel to debug network requests.

### You should be proficient with JavaScript Functions

Functions are the core of the JavaScript language.  You should be able to use them fluently.  That means understanding function scope, closures, how `this` works, and the difference between normal functions and arrow functions. It also means knowing about how to process arrays with function using methods like map, filter, and reduce.  A good resource for "thinking in functions" is [JavaScript Allonge](https://leanpub.com/javascriptallongesix/read) by Reginald Braithwaite.

### You should be comfortable with basic design tasks

No matter how well you learn JavaScript, you'll be limited career-wise if you can't manage basic design tasks.  This might not seem inherently true; after all isn't that what professional designers are for?  But the truth is that unless you're a purely server-side developer (excluded by our assumptions above), there will be times when you're asked to fill in a visual gap that a designer doesn't have time for, or there will be ambiguities in a designers spec that aren't worth a meeting.  And learning the basics of design will help you communicate better with designers and product managers about technical constraints and design requirements.  

When I talk design, I mean both the basics of implementing a visual design with HTML and CSS[^3], and enough of an understanding of design basics to create a simple UI that looks ok and isn't confusing.  That last requirement is harder than you'd think.  Design is hard and mostly orthogonal to the set of skills most folks pick up while learning to code.  For learning design theory, I'd recommend finding a simple resource on visual design first like [White Space is Not Your Enemy](http://amzn.to/2uz3vEG), and ideally supplementing that with a more UX focused resource like [Don't Make Me Think](http://amzn.to/2uvUrR7).  The practical side of HTML/CSS is easiest to pick up with experience.  If you're using devtools you can see what other people are doing with CSS and tweak and explore using the elements panel.  And there are lots of good online resources for learning about CSS and HTML syntax like [MDN](https://developer.mozilla.org/en-US/) for API info or [CSS-Tricks](https://css-tricks.com/) for ideas, tutorials and keeping up with new stuff.


### You should have a basic understanding of networking and http based APIs

Because we're assuming that this job involves using JavaScript in a browser or other client context, you should be able to understand the basics of networking.  You should know what a client and server is.  You should be able to explain a rough approximation of what happens when somebody enters a URL into the browser[^4]. There's a bunch of vocabulary thats good to know here. You should know what an HTTP request is and ideally know the conventions of what GET/PUT/POST/DELETE imply.  It will help you to have a working definition of what REST is and what AJAX is. It's good to get experience working with some HTTP based APIs, either at work or playing around with an API like [Twitter](https://dev.twitter.com/rest/public) or [Github](https://developer.github.com/v3/).  You should also get familiar with at least one way to make HTTP requests in JavaScript (XMLHttpRequest, fetch, jQuery's ajax methods).  

### You should be comfortable with Node.js based tooling

### You should know how to use a framework to structure a moderately sized program

### You should know the basics of JavaScript program performance

### You should have a method of learning new things

**Honorable Mention**: [Testing](https://benmccormick.org/2016/12/10/saving-time-with-jest), [Compile to JS languages](https://benmccormick.org/2014/11/24/alternative-javascript), [React](https://facebook.github.io/react/), [PWAs](https://benmccormick.org/2017/02/13/improving-site-performance-with-lighthouse)

### More Resources


[^1]: If you don't learn all the pitfalls here, at least learn that there are pitfalls.
[^2]: Disclosure: Some of these book links are affiliate links
[^3]: Or SASS/LESS/CSS in JS/whatever
[^4]: This can be explained at several levels, but its good to at least know that a request is sent from the users computer to a server somewhere, and that server returns resources like HTML, CSS, JS, and image files.  
