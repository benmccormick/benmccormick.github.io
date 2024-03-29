---
title: "Weekly Links: March 2nd"
date: "2018/03/02"
layout: "weekly-links"
path: "/2018/03/02/weekly-links-03-02-18/"
description: "The future of React, Makefiles, state machines and blindness"
keywords: "react async makefile state machine raganwald blind Frank Bruni"
topics: ['React', 'Computer Science']
category: "opinion"
key: "weekly-links-03-02-18"
---


### JavaScript And The Web

[Sneak Peek: Beyond React 16| React Blog](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html) - This is a preview of where React is going next.  I'm still processing through this, and how I can use it, but Suspense seems like something that will make dealing with async data much easier in React.  Loading states are something I deal with all the time, and having cleaner primitives for expressing them will be a big win.


### Programming Tools

[The Lost Art of the Makefile |Jesse Hallett](http://www.olioapps.com/blog/the-lost-art-of-the-makefile/) - An interesting case for using Makefiles to manage modern JavaScript builds on projects that don't need the overhead of webpack.  I don't think this is going to be the next trend in JS, but I am interested to see where the JS world leans next when it comes to task automation.  When I started using JS, I saw people using Make or tools from other language ecosystems to build projects.  Grunt and Gulp really changed that and moved folks towards using the node ecosystem for task automation.  Now the community seems to have settled on webpack for build related tasks, and npm scripts for everything else.  I'm all good with webpack for builds, it's complicated but powerful.  But npm scripts are frustrating as a task automation solution.  There's no ability to comment, and long operations in nested JSON strings are a bit unwieldy.  I'd love to see some standardization on something more like make that allows comments and powerful task composition.



### Computer Science In JS

[Forde’s Tenth Rule, or, “How I Learned to Stop Worrying and ❤️ the State Machine” | Reginald Braithwaite](http://raganwald.com/2018/02/23/forde.html) - A really nice explanation of state machines, and how they can be used in JavaScript development.  The article is written at a very conceptual level and really explains the topic well.  I was thinking afterwards about how the state machine concepts reminded me of Redux, and fortunately I found another link that expanded on that connection...


[How to model the behavior of Redux apps using statecharts | Luca Matteis](https://medium.freecodecamp.org/how-to-model-the-behavior-of-redux-apps-using-statecharts-5e342aad8f66) - I hadn't heard of statecharts before reading this, but they look like a really interesting tool for talking about large systems.  I'd be really curious to play with the redux middleware for automatically generating them and see if the artifacts it produces are useful.


### Non-Tech

[Am I Going Blind? | Frank Bruni](https://mobile.nytimes.com/2018/02/23/opinion/eyesight-going-blind.html) - This is absurdly well written, and it hit me personally since the idea of going blind has always been a personal fear of mine.  I think everybody has their one bad thing that they irrationally fear will happen to them and this is mine.  The article was good perspective in mutliple ways, reminding me how blessed I am and how resilient humans (and our bodies) are.  (Via [Daring Fireball](https://daringfireball.net/linked/2018/02/23/bruni-going-blind))
