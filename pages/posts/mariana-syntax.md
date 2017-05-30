---
title: "Mariana Syntax Theme For Atom"
date: "2017-05-28 04:05:00+00:00"
layout: "post"
path: "/2017/05/28/mariana-syntax-atom/"
description: "Announcing a port of the Mariana color scheme to Atom"
keywords: "atom sublime text color schemes"
category: "tools"
key: "mariana"
readNext: "interesting-atom,config-portability,orthogonality-css-js"
pageViews: "0"
last30pageViews: "0"
---

Sometimes the best thing to do is steal somebody else's good idea. I've been using [Atom](https://atom.io) as my primary text editor for a year and a half now, but I still occasionally play with other editors and keep up with their updates.  There are a crazy number of good cross platform editors these days, and they all have a bunch of good ideas that get shared and remixed across each other. This week Sublime Text came out with a new release [Dev Build 3132](https://www.sublimetext.com/3dev) that included 3 new color schemes.  One of them was Mariana, which I believe is a variation on the also great [Oceanic Next](http://labs.voronianski.com/oceanic-next-color-scheme/), with possibly some influences from my previous favorite dark theme [Tommorrow Night Eighties](https://github.com/chriskempson/tomorrow-theme) [^1].  It stood out to me right away.


<div>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The Mariana syntax theme that shipped in the new Sublime Text is really nice <a href="https://t.co/xbmjBTNoWY">pic.twitter.com/xbmjBTNoWY</a></p>&mdash; Ben McCormick (@ben336) <a href="https://twitter.com/ben336/status/868160533345841152">May 26, 2017</a></blockquote>
</div>

Since I'm no longer using Sublime Text, I decided to port the theme to Atom.  I built on the work of the great [atom-material-syntax](https://github.com/atom-material/atom-material-syntax) package to build out a new theme.  It turns out to be surprisingly easy to build a color scheme in Atom.  Fork an existing theme, change some colors and the details in package.json, delete a bunch of git tags [^2], and then run `apm deploy minor`, and you're in business.  

You can now download [mariana-syntax](https://atom.io/themes/mariana-syntax) in Atom.  This was a quick port.  I'll be working to optimize it for the languages I use (JS, Python, CSS/Less, HTML and Markdown) over the next few weeks.  I would love to see pull requests for other languages or for anything that I've missed so far.  I look forward to this just getting better and better. **Update:** Version 0.2.0 has shipped with optimized syntax for JavaScript, Python, CSS, JSON and Markdown.


<img alt="screenshot of mariana-syntax" src="/posts/images/mariana/screenshot.png"
class="full-width">


[^1]: To be clear, I'm not sure how great of an influence this was.  The scheme definitely bears a strong resemblance to both of those color schemes, and the release notes credit both authors as inspiration for the 3 new syntax-themes without naming specific schemes.

[^2]: This Stack Overflow article was helpful https://stackoverflow.com/a/15755041/1424361
