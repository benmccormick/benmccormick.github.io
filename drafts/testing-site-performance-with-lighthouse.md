---
title: "Improving Site Performance With Lighthouse"
date: "2017-02-13 05:15:00+00:00"
layout: "post"
path: "/2017/02/13/improving-site-performance-with-lighthouse"
description: "Profiling and improving site performance with Google's Lighthouse tool"
keywords: "Lighthouse Performance Progressive Web App"
category: "tools"
pageViews: "0"
last30pageViews: "0"
---

Last year Google coined the term "Progressive Web App" as a way of describing the type of sites and applications that they think are the future of the web.  Progressive Web Apps are sites that load quickly, are always responsive to user input, work as well as possible offline, and integrate with native platforms like native apps.  While this site is not an "app" per say, I do want it to be as fast and responsive as possible, and I also wanted to better understand what Google is pulling under the PWA umbrella.  Fortunately, Google has built a tool [Lighthouse](https://developers.google.com/web/tools/lighthouse/) to help developers profile and improve their web applications, comparing them to a set of PWA benchmarks.  So I took this site through Lighthouse, and worked against their suggestions with the goal of learning more about PWAs and improving the experience of using benmccormick.org.  I'm passing along my experience here.


### Getting Started

I began by downloading the Lighthouse extension in the [Chrome Web Store](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk).  Lighthouse can be installed either as a chrome extension or a node command line tool.  Both produce the same HTML report, but I chose the chrome extension for the convenience of keeping everything in the browser.  When I ran the initial report, I got the following result:

<img alt="first score: 48/100" src="/posts/images/lighthouse/first_report_summary.png" class="full-width bordered-img">

48 out of 100 didn't seem like a bad starting place.  Scrolling down it looked like I was mainly dinged on a few main areas:

1. I had no offline support
2. I did't have any special setup for being included on a users homescreen. (I did have platform appropriate icons, but no app configuration)
3. I had some possible inefficiencies in the assets I loaded.

<img alt="offline issues" src="/posts/images/lighthouse/first_report_offline.png" class="full-width bordered-img">

<img alt="native issues" src="/posts/images/lighthouse/first_report_native.png" class="full-width bordered-img">

<img alt="asset issues" src="/posts/images/lighthouse/first_report_assets.png" class="full-width bordered-img">

Native app support isn't a huge priority for me, and the assets issue seemed small, so I decided to investigate the offline support issue first.

### Offline

I based my service worker implementation off of [Simple Offline Site](https://github.com/chriscoyier/Simple-Offline-Site) a demo Service Worker repo created by Chris Coyier for an article on [CSS Tricks](https://css-tricks.com/serviceworker-for-offline/).  This was perfect since it's default behavior was what I wanted: cache everything, and check for updates from the server everytime we return from cache so we're never out of date for long.  You can see what I did specifically in my [github repo for this site](https://github.com/benmccormick/benmccormickorg/blob/master/pages/sw.es6). After adding the service worker, my score moved up to 63/100.  

Finally, Service Workers only work on HTTPS connections, but most links to my site are not https currently. So to take full advantage (and to address another metric I was flagged on), I used a [CloudFlare page rule](https://support.cloudflare.com/hc/en-us/articles/200170536-How-do-I-redirect-all-visitors-to-HTTPS-SSL-) to redirect all visting traffic to use https.  That bumped me up to 69/100.


<img alt="asset issues" src="/posts/images/lighthouse/second_report_offline.png" class="full-width bordered-img">

### Native Support

### More Resources



### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). If you're excited about Jest, you also might want to check out my [post on Jest Snapshots][snapshots].


[jest]: https://facebook.github.io/jest/
[christoph]: https://twitter.com/cpojer
[abramov]: https://twitter.com/abramov_dmitrii
[ecma]:http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/
[snapshots]: http://benmccormick.org/2016/09/19/testing-with-jest-snapshots-first-impressions/
[tracy]: https://twitter.com/ladyleet
[jasmine]: https://jasmine.github.io/
