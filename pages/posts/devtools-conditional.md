---
title: "Chrome Devtools Cookbook: Advanced Breakpoints"
date: "2016-12-31 05:00:00+00:00"
layout: "post"
path: "/2016/12/31/conditional-breakpoints"
category: "tools"
description: "Using advanced breakpoint features in Devtools"
---

One of the wonderful things about the web is the hackable nature of the platform, where it is easy to learn from others and modify what they did.  This started in early web sites with the ability to "view source" to see the HTML that was used in different sites.  Web sites and applications have evolved since then and are now built with HTML, CSS, JavaScript, Fonts, Images, JSON, TypeScript, Elm, JSX, and more, communicate with servers asynchronously, cache data on the client, and even interact with the native hardware.  For many complex modern sites "view source" will reveal almost nothing about how the site actually functions.  Fortunately the spirit of the early web lives on in browser DevTools, developer addons shipped with Chrome, Firefox, Edge and Safari to help developers debug their sites.  Modern Devtools are sophisticated power tools, with many different features, settings, and screens to explore.  But learning just a little about them can help most people learn a lot about the web and how it works, and can make debugging web sites much much easier for developers. Over the next few weeks I'm going to be passing along some of the tips and tricks that have helped me get more about of dev tools.  I'm starting today by talking about breakpoints.

### Basic Breakpoints

One of the nice things about writing JavaScript for the web is that you get a fantastic visual debugger built into every browser.  Most JavaScript developers have experience with the basics of using breakpoints.   In the script debugger for most browser devtools, you can click on the line number of a script to set a breakpoint, add a `debugger` expression to your code to insert a breakpoint directly from the source code, or toggle an option to break on all exceptions.

<img src="/posts/images/devtools/basic_breakpoint.png" alt="basic breakpoint example" class="full-width">

After the breakpoint has been set, while the devtools are open, the browser will pause execution every time it reaches that line, and allow the user to control further execution.








### Subscribe

Thanks for taking the time to read this post!  Web development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my recent post on [readable code](http://benmccormick.org/2016/12/11/readable-code-audience/).


[^1]: A part of me really hates focusing on Chrome DevTools, since they're hardly under-hyped, and Firefox DevTools are also fantastic and beautifully designed.  But Chrome DevTools are the most feature complete, they're what I primarily use, and over 80% of desktop traffic to this blog in the last month has been from Chrome.  So I'll be focusing on them for this series.

[^2]: In other browsers this is usually "inspect element"

[^3]: DOM stands for Document Object Model, it is the term for the structured representation of HTML on a website. You can see more [on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).
