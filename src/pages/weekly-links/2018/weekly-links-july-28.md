---
title: "Weekly Links: July 28th"
date: "2018/07/28"
layout: "weekly-links"
path: "/2018/07/28/weekly-links-07-28-18/"
description: "Legacy Codebases, Deep Dives, and Front End Reactive Architectures"
keywords: ""
topics: []
category: "opinion"
key: "weekly-links-07-28-18"
---


### JavaScript and the Web


[Getting to Know a Legacy Codebase Harry Roberts](https://csswizardry.com/2018/07/getting-to-know-a-legacy-codebase/)

I like this advice on approaching a new codebase.  Some of it is CSS specific but the general ideas of tackling the important bits, experimenting with changes, and using tools as much as possible to catch regressions apply across the board.

[A one year PWA retrospective | Zach Argyle](https://medium.com/@Pinterest_Engineering/a-one-year-pwa-retrospective-f4a2f4129e05)

TL;DR: Pinterest saw great results from supplementing their mobile apps with a PWA web app.

[Mission: Improve the Web Ecosystem for Developers | Dion Almaer](https://medium.com/ben-and-dion/mission-improve-the-web-ecosystem-for-developers-3a8b55f46411)

I don't know Dion, but this was a wonderful list of challenges that people looking to improve the web platform might want to tackle.  I'm excited to see people tackling this stuff.  I'm especially interested in what better tools for creating performant sites would look like.

### Technical Deep Dives

These are long technical articles, and more back end focused then I usually write about on this blog but both touch on things I'm interested in and I found them fascinating.

[Centrifuge: a reliable system for delivering billions of events per day || Calvin French-Owen](https://segment.com/blog/introducing-centrifuge/)

I had to build an event handling system like this a few years ago, and it's fun to see how the optimal solution changed for Segment as they scaled.  On the backend designs that make no sense for small projects start becoming very real options as a project scales.  That's why it's always worth having some skepticism over the idea that because AppAmaGooFaceSoft are using a technology it must be "best in class" and we should use it in our small 20 person development team that is facing problems of a completely different scale.

[ripgrep is faster than {grep, ag, git grep, ucg, pt, sift} | Andrew Gallant](https://blog.burntsushi.net/ripgrep/)

This piece is structured as a comparison of performance between cli file search tools, but the cool part is the deep insight into text search algorithms and performance tricks littered throughout the benchmark discussions.  It's fascinating to see how heavily optimized for speed these tools are.  Also, I've been using Ack for 5 years even though I know it's not the fastest tool for searching, because for me it was always "fast enough" to avoid searching.  But ripgrep appears to be dramatically enough faster in the relatively rare circumstances where I'm searching truly large directories of files, that I may finally be up for converting to a new tool.


### Book Review

[Front-End Reactive Architectures | Luca Mezzalira](https://amzn.to/2mPr3zV)

I've been very excited to check out this book since I first saw the title pre-release.  I finally had a chance to purchase and read it last month, and I'm sad to report that I had fallen prey to the classic mistake of judging a book by it's cover.  I had hoped that this would be a deep dive into architecture and how we structure front end applications, and how reactive programming concepts can impact that.  There's a real dearth of quality high level UI architecture resources out there, so I was genuinely excited about this.

Unfortunately the book is structured more like a series of loosely related blog posts, first with an overview of older architectural models like MVC, MVP and MVVM, followed by sections looking at several different libraries that use reactive principles: RxJS, Cycle, and MobX.  The latter sections focused more on the nuts and bolts of using the libraries to create simple example apps and less on the impact that using them would have on a large application.  So this is a good book if you want to see some simple code examples of how these libraries work in practice.  But I'm still waiting for a great high level front-end architecture book.
