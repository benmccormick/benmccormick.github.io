---
title: "Weekly Links: March 16th"
date: "2018/03/16"
layout: "weekly-links"
path: "/2018/03/16/weekly-links-03-11-16/"
description: "React Context, Mobx, and Rust"
keywords: "React MobX Context Preact Glimmer Rust WebAssembly"
topics: ['React']
category: "opinion"
key: "weekly-links-03-16-18"
---


### JavaScript And The Web

[Bitmasks and the new React Context API | Haukur Hallvarðsson](https://hph.is/coding/bitmasks-react-context) - A nice rundown of one aspect of the new React Context API that is likely to be familiar to low-level developers but will probably be a new idea to many front end devs: using bitmasks to test a condition.

[MobX 4: Better, simpler, faster, smaller | Michel Weststrate](https://medium.com/@mweststrate/mobx-4-better-simpler-faster-smaller-c1fbc08008da) - MobX continues to be a fantastic state management libary and this update looks like it will make it even better.


[Lighter than Lightweight: How We Built the Same App Twice with Preact and Glimmer.js | LinkedIn Engineering](https://engineering.linkedin.com/blog/2018/03/how-we-built-the-same-app-twice-with-preact-and-glimmerjs) - This is a really cool real world comparison of 2 JavaScript frameworks, where they actually built the same app in 2 separate frameworks, with core contributors to each framework involved in the implementation.  To be honest, my main takeaway is that among modern frameworks "framework performance" can be a bit overrated, and not a great reason to choose a specific library or framework, as compared to factors like developer experience, community, and fit with the existing codebase.


### Rust && WebAssembly

I've been thinking about taking the time to learn a new language for the first time in a while.  I think WebAssembly and Rust transpiled to WebAssembly in particular are going to become an important part of high performance JavaScript applications and frameworks/libraries.  So I'm starting to check it out.  Here are a few  recent relevant links

[Making WebAssembly better for Rust & for all languages – Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2018/03/making-webassembly-better-for-rust-for-all-languages/) - This outlines a plan to improve the developer experience of what I think is the future of WebAssembly in most web apps: interop with JavaScript to improve performance of open source libraries and some core performance sensitive code.

[GitHub - atom/xray: An experimental next-generation Electron-based text editor](https://github.com/atom/xray) - A non-webassembly example of using Rust selectively to increase performance of an application built primarily using web technologies.


[Rust's 2018 Roadmap | Rust Blog](https://blog.rust-lang.org/2018/03/12/roadmap.html) - A good rundown of the areas of focus for Rust this year.  I'm particularly interested in their target use cases, since 3 of them (CLI tools, Network Services and WebAssembly/the web) are things that I have built before and will build again.
