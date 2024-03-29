---
title: "Weekly Links: April 27th"
date: "2018/04/27"
layout: "weekly-links"
path: "/2018/04/27/weekly-links-04-22-18/"
description: "CSS Blocks, Defeating Electron, and Ethics"
keywords: "CSS Blocks, Defeating Electron, Ethics"
topics: ['CSS']
category: "opinion"
key: "weekly-links-04-07-27"
---

### JavaScript & The Web

[CSS at Scale: LinkedIn’s New Open Source Projects Take on Stylesheet Performance | LinkedIn Engineering](https://engineering.linkedin.com/blog/2018/04/css-at-scale--linkedins-new-open-source-projects-take-on-stylesh)

This is a cool new set of CSS tools from LinkedIn.  This looks most similar to CSS Modules/PostCSS to my eyes, with a focus on optimizing bundle size for both CSS and templates/components.  I'd be very interested in playing with it.

### Programming Tools

[Strange and maddening rules | Joel Spoelsky](https://www.joelonsoftware.com/2018/04/23/strange-and-maddening-rules/)

I'm continuing to enjoy Joel's series on StackOverflow.  I've always been more sympathetic to their moderation strategy than some, so I'll leave it as an exercise to the reader whether the explanations presented here hold water, but definitely worth reading if you've ever tried contributing to StackOverflow and been frustrated.

[Defeating Electron | Felix Rieseberg](https://medium.com/@felixrieseberg/defeating-electron-e1464d075528)

[Electron](https://electronjs.org/) doesn't have the best reputation.  Any time an electron based app makes news on Hacker News, three quarters of the comments are bashing Electron and the companies that use it.  It's been criticized recently and prominently on [Daring Fireball](https://daringfireball.net/2018/02/non_native_apps_threat_to_mac) and seems to generally be looked down on by "real" MacOS developers.  So I think this is a helpful response.  An Electron community member knocks down some straw-men (Electron doesn't only exist because web developers don't want to learn new things) and then lays out what would be needed to replace it.  

I think there's an interesting tension here:  This post describes what would be needed to create a more compelling cross-platform solution from the point of view of companies and developers.  But the criticism has mostly been focused on the requirements of users, not companies.  Specifically that Electron apps tend to be slower/less-memory-efficient/less accessible/less attuned to platform specific conventions.  So companies are making the decisions that let them serve the most number of people, while evolving to meet their needs as quickly as possible, with as small cost as possible.  But they're possibly limiting the top level quality they can achieve, and there is a possible social good being missed by the people excluded (those with lower performance machines or accessibility needs[^1]).


### Tech and Ethics

[‘I Fundamentally Believe That My Time at Reddit Made the World a Worse Place’ | Noah Kulwin & Dan McComas](http://nymag.com/selectall/2018/04/dan-mccomas-reddit-product-svp-and-imzy-founder-interview.html)

A great interview on the massive potential for good or evil today's tech products can have.  This does suggest that the problem is deeper than simply "engineers and designers behaving ethically" though.  You can get at Reddit's issues by following the money.

[A Very Good Program](https://twitter.com/leinweber/status/989267343002951680?ref_src=twsrc%5Etfw)

On a lighter note, here's the real case for engineers and designers needing to behave ethically.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I made a VGP (very good program) that makes it so it looks like I’m typing on slack whenever anyone else is typing, and stops when they stop.<br><br>Everyone loves it so far and doesn’t find it annoying at all!<a href="https://t.co/W8e2EKuVXX">https://t.co/W8e2EKuVXX</a> <a href="https://t.co/ZZd01GxYqg">pic.twitter.com/ZZd01GxYqg</a></p>&mdash; will leinweber (@leinweber) <a href="https://twitter.com/leinweber/status/989267343002951680?ref_src=twsrc%5Etfw">April 25, 2018</a></blockquote>



[^1]: I am not an accessibility expert, but I'm aware that it is a criticism of Electron.  I can't evaluate the actual difficulty of making a native vs electron application accessible.
