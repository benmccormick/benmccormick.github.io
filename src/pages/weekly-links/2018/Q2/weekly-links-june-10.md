---
title: "Weekly Links: June 10th"
date: "2018/06/10"
layout: "weekly-links"
path: "/2018/06/10/weekly-links-06-10-18/"
description: "React Complexity, Proxies, and more Microsoft-Github reactions"
keywords: "gatsby"
topics: ['React']
category: "opinion"
key: "weekly-links-06-10-18"
---

### JavaScript & The Web

[The React is “just” JavaScript Myth | Dave Rupert](https://daverupert.com/2018/06/the-react-is-just-javascript-myth/)

I've been thinking a lot about the reasons that JavaScript development is perceived as intimidating and over-complicated the past few weeks.  Might have a full post on that soon, but for now, there's a good point here.

React is relatively simple at it's core, but it's difficult to find examples of using it in the wild, that don't require you to learn Webpack/Babel/npm at minimum, and many "starting points" will also toss in Redux/React Router/Jest/etc as well.

[MobX 5: the saga continues… | Michael Weststrate](https://medium.com/@mweststrate/mobx-5-the-saga-continues-4852bce05572)

MobX is the first major library I've seen to take advantage of proxies to give normal looking JavaScript objects/arrays magic powers[^1].  This sort of "just make it work in the prettiest way possible" API is the type of thing that tends to produce really cool results as long as it works correctly 100% of the time, but becomes a huge pain as soon as it's flaky.  I've never had any problems with MobX after using it for 2 years, so I'm hopeful seeing them as an early adapter here.  Will be interested to see if they start getting used more widely going forward.  If so, I hope that browser start thinking about how they can expose these types of patterns well in developer tools.  How do you drop into a side effect caused by a proxy in a debugger?  It's an interesting problem


[Meta programming with ECMAScript 6 proxies | 2ality](http://2ality.com/2014/12/es6-proxies.html)

In case I lost anybody with my discussion of the last link, here's an old but good walkthrough of what Proxies are and how you can use them to create some pretty magical APIs.

### Microsoft Buying Github

[🔥 Our reactions to Microsoft buying GitHub |Adam Stacoviak & Jerod Santo](https://changelog.com/spotlight/14)

A [Changelog](https://changelog.com/) podcast that summarizes the reaction of the 2 primary Changelog hosts to the annoucement as well as collecting reactions from around the internet.

[github-xp | Mårten Björk](https://github.com/martenbjork/github-xp)

This is just fun.  A Chrome extension to render Github in the style of Windows XP.


[^1]: Even if they chose to announce that in the silliest way possible
