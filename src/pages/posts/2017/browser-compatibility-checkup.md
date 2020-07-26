---
title: "A Quick Browser Compatibility Checkup"
date: "2017/11/15"
layout: "post"
path: "/2017/11/15/browser-compatibility-checkup/"
description: "It's good news!"
keywords: "web browsers safari chrome edge firefox grid async await"
category: "platform"
key: "browser-compatibility-checkup"
topics: []
readNext: "ten-things-js,favorite-interview,following-js-roadmap"
---


I've written a few times about the state of browser compatibility and the web platform over the years.  Over 4 years ago I [linked to a post celebrating the rise of evergreen browsers](https://benmccormick.org/2013/06/11/evergreen-browsers). Then 2 years ago I was one of several people stressing about [whether Safari was going to hold the web back](https://benmccormick.org/2015/06/10/is-safari-being-left-behind/).  It's something I've followed closely because supporting many different subtly incompatible execution environments is one of the most unique and frustrating challenges of front-end development.  

The last few years have been really good for web compatibility with Microsoft dumping Internet Explorer in favor of the evergreen Edge, and [Babel](https://babeljs.io/) allowing JavaScript developers to write modern JS spec-compliant code and then have it transpiled back into something that runs in a wide variety of environments.  But fairly recently things have started to get even better.

For the web application I have spent my workdays building over the past 4 years, we target the [last 2 versions of the major desktop browsers](http://browserl.ist/?q=last+2+Chrome+versions%2C+last+2+Safari+versions%2C+last+2+Firefox+versions%2C+last+2+Edge+versions) (Chrome, Firefox, Safari, Edge).  At the time of writing that means we target

- Chrome 61 + 62
- Edge 15 + 16
- Firefox 55 + 56
- Safari 10.1 + 11

I get that for some of you this is a very lax browser support standard, and you're still supporting IE9 or old Android versions.  For others you don't care about browser compatibility at all and are just hacking demos on the newest Chrome.  But "last 2 versions" is a real world standard that I know plenty of teams target.  And it certainly is a reasonable target for new devs learning about JavaScript and the web.  So let's look at what is natively supported in all targeted browsers if you use this standard today. Spoiler Alert: life is pretty good.

### Available Now

#### All of ES6 and ES2016, and almost all of ES2017

If you're distrustful of Babel and have been holding off on learning the new features that have transformed JavaScript over the past few years until they were "browser supported", now is your time.  Other than shared memory and atomics (more on that below), every single feature from the recent updates to the ECMAScript spec is available in the last 2 versions of all 4 major browsers.

That includes core ES6 stuff like classes, destructuring, and arrow functions.  But also features that were just standardized this summer like [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

#### Modern CSS

Modern CSS specifications like [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) and [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables), and [CSS Feature Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) are all fully supported in these browsers, making creating layouts especially much easier than it had been in the past.

#### Promises and Fetch

Promises have been mostly supported for a while, but they didn't have native support in IE11, so some folks may still be polyfilling them.  With a last 2 versions standard, you not only don't need to polyfill Promises, but also can drop any polyfills for the promise based fetch api as well (and use them with async-await natively!).

### Coming Soon

So there is a ton of stuff that is available today for people targeting the last 2 versions of browsers.  But there is also a bunch of stuff that is almost there:

#### Web Assembly and low level primitives

[WebAssembly is now shipping in the latest version of every major browser](https://blog.mozilla.org/blog/2017/11/13/webassembly-in-browsers/).  WebAssembly is a target bytecode for the web that can interop with JavaScript.  Essentially somebody can write C, C++ or Rust code and then compile it to WebAssembly, which runs natively in the browser, potentially much more performantly than equivalent JavaScript code.  The latest version of all browsers also support [SharedArrayBuffer and Atomics](http://2ality.com/2017/01/shared-array-buffer.html), low level APIs for exploring better parallelism support in JavaScript.  In short, it will soon be possible to create much more performant experiences in web browsers than is currently possible.

#### WebRTC

The latest versions of all browsers also support WebRTC, an API for peer to peer communication through browsers.  This potentially opens the door for all types of browser-based text/video chat and collaboration applications.

#### Service Workers

[Service workers are getting close](https://jakearchibald.github.io/isserviceworkerready/).  They're available in every browser but Safari now, and Safari is working on them.  If we get another big `x.1` release of Safari like last year, they could be available for early adopters across the board within the next 6 months.  


### The web is moving forward together

It's fun to see this level of unified activity across the web platform over the past 2 years.  In my 7+ years of front-end development, I've never seen a more compatible web than the one we can develop against today.
