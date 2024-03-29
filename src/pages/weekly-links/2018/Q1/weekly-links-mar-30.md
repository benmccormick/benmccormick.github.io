---
title: "Weekly Links: March 30th"
date: "2018/03/30"
layout: "weekly-links"
path: "/2018/03/24/weekly-links-03-11-30/"
description: "ES Modules, Command Line tools, and Privacy"
keywords: "privacy modules redux react css git"
topics: ['React']
category: "opinion"
key: "weekly-links-03-16-30"
---

A big pile of links for Easter weekend.  Happy Easter everybody!

### JavaScript and the Web


[ES modules: A cartoon deep-dive | Lin Clark](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) - As usual, Lin Clark offers a great approachable explanation of a complex topic.  Here she gets into the weeds of how ES modules are implemented in browsers, and how the module syntax differs from CommonJS.

[Redux - Not Dead Yet! | Mark Erickson](http://blog.isquaredsoftware.com/2018/03/redux-not-dead-yet/) - A good explainer of where Redux fits into the React landscape today.

[Update on Async Rendering | Brian Vaughn](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html) - Important read for React devs.  There are changes coming to the core lifecycle methods.

[System Fonts in CSS | Craig Hockenberry](https://furbo.org/2018/03/28/system-fonts-in-css/) - I'm always happy to see improvements to the default font situation on the web[^1].   I don't love relying on custom loaded fonts for this blog and I wish there were more high quality fonts that were reliably available without resorting to loading your own.  This particular feature doesn't pass the "caniuse test" for now though; Chrome and Safari support it, but there's nothing from Edge or Firefox yet.

### Command Line Tips

[git log – the Good Parts | Ian Miell](https://zwischenzugs.com/2018/03/26/git-log-the-good-parts/) - A good rundown of some of the things you can do with git log.  It misses that you can use `--author` to filter by the committer though, which is a flag I use all the time when I know who did a specific piece of work but am vague on what actually changed.

[Why I usually run ‘w’ first when troubleshooting unknown machines](https://rachelbythebay.com/w/2018/03/26/w/) - Here's a useful command line command I didn't know about.  `w` shows you a list of users currently on a machine and what they're doing.


### Code Style, Documentation and Code Reviews

[“Just” | Brad Frost](http://bradfrost.com/blog/post/just/) - A good reminder to not assume everybody has our accumulated knowledge.  I've found a good cure for this is to spend some time working with programming tools I have no experience in.  Trying to install gems in Ruby for instance always reminds me how confusing npm was when I started using it.

[Avoid Else, Return Early | Tim Oxley](http://blog.timoxley.com/post/47041269194/avoid-else-return-early) - I've found this pattern of short-circuiting functions to produce very readable code.  I've also seen these referred to as *guard statements*.


[Putting the I back in IDE: Towards a Github Explorer| Jane Street Tech Blog ](https://blog.janestreet.com/putting-the-i-back-in-ide-towards-a-github-explorer/) - This is an interesting idea, although I was a bit weirded out by the idea of commenting in the source files to leave code review comments.  The idea of deeper editor integration is excellent though, and I'd love to see Github evolve further in this direction with their Atom plugin.


### Privacy in the news

[Facebook scraped call, text message data for years from Android phones | Ars Technica](https://arstechnica.com/information-technology/2018/03/facebook-scraped-call-text-message-data-for-years-from-android-phones/) - It's been a bad few weeks for Facebook.  You can maybe get away with trying to get everyone's data, and you can maybe get away with being careless with user data, but when you're as big as Facebook is, you absolutely can't do both.

[How Europe’s new privacy rule is reshaping the internet | The Verge](https://www.theverge.com/2018/3/28/17172548/gdpr-compliance-requirements-privacy-notice) - GDPR is a big deal.  If you're involved in web products that store user information, you should understand this.  I'm excited to see meaningful regulation on privacy issues that seems to be reasonably well written.

### Humor

[Cow Astrology | John Cook](https://www.johndcook.com/blog/2018/03/28/cow-astrology/) - When a mathematician examines the implications of astrology's claims.


[^1]: Or I would always be happy if there was ever anything to be happy about.
