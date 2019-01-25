---
title: "Quick Tip: Logging In Breakpoints"
date: "2018/07/17"
layout: "post"
path: "/2018/07/17/quick-tip-logging-breakpoints/"
description: "Did you know breakpoints can have side effects?"
keywords: "debugging, console.log, jsparty"
category: "platform"
topics: ['JavaScript']
key: "quick-logging-breakpoints"
readNext: "evil-js,javascript-stale-practices,ten-things-js"
---

Stop me if this sounds familiar: you see a bug on your site.  You want to know what's going on.  You fire up the developer tools, put a breakpoint in the area you think is a problem, and... the error doesn't occur while it's being debugged.  Probably it's a timing issue, but I've also seen situations where pausing on certain breakpoints will actually cause a browser tab to freeze up.  Whatever weirdness you're dealing with, you can't get a breakpoint running in the right spot to see the error.  These are known colloquially as [Heisenbugs](https://en.wikipedia.org/wiki/Heisenbug), bugs that disappear when measured.  Ideally at this point you would add some logging, but if the issue is on production, and you don't know exactly what needs to be logged, that could delay a fix by an unacceptable amount.

I actually ran into this last night, and decided to test out a tactic I'd heard about in a [recent JS Party episode](https://changelog.com/jsparty/30).  Did you know that you can use conditional break points to add temporary logging to a live application?

Conditional breakpoints are a browser debugger feature where you set a breakpoint, and specify a condition.  The breakpoint only stops the program execution when that condition is truthy.  Here's a video describing the feature in Firefox:

<iframe width="560" height="315" src="https://www.youtube.com/embed/pVPlMhfrMwM" frameborder="0" encrypted-media" allowfullscreen></iframe>

Conditional breakpoints are useful when you're running through a code path many times during program execution, but you want to stop during a specific run.  But they can also be used to solve our heisenbug problem.  Because the conditional breakpoint executes the code inside of it in the context of the line we're trying to break on, we can actually put logging inside the breakpoint.

[An example of a console.log inside a breakpoint](log-example.png)

That `console.log` will execute, and because `console.log` returns false, the breakpoint will never actually stop.  It's a heisenbug-safe version of watching variables when you're at a breakpoint, and there's no redeploys required.

**Update January 2019: Chrome will soon be building this hack right into the devtools with a new "logpoint" option for breakpoints that formalizes this method.  Very cool!**

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">New feature in Chrome 73: Logpoints. Log messages to the Console without cluttering up your code with console.log() calls. <a href="https://t.co/aFl2e6GmnF">https://t.co/aFl2e6GmnF</a> <a href="https://t.co/fJ6CUNN0Lg">https://t.co/fJ6CUNN0Lg</a></p>&mdash; Chrome DevTools (@ChromeDevTools) <a href="https://twitter.com/ChromeDevTools/status/1088463799886200832?ref_src=twsrc%5Etfw">January 24, 2019</a></blockquote>

