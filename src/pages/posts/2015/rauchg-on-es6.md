---
title: "Guillermo Rauch on ECMAScript 6"
date: "2015-02-22T21:38:46+00:00"
layout: "post"
path: "/2015/02/22/rauchg-on-es6"
category: "javascript"
description: "A link-log of Guillermo Rauch's look at ES6"
key: "rauchg-on-es6"
pageViews: "335"
last30pageViews: "8"
---

>ECMAScript 6, henceforth ES6 and formerly ES.next, is the latest version of the specification. As of August 2014 no new features are being discussed, but details and edge cases are still being sorted out. It’s expected to be completed and published mid-2015.

> Adopting ES6 has simultaneously resulted in increased productivity (by making my code more succinct) and eliminated entire classes of bugs by addressing common JavaScript gotchas.

> More importantly, however, it’s reaffirmed my belief in an evolutionary approach towards language and software design as opposed to clean-slate recreation.

http://rauchg.com/2015/ecmascript-6/

A really great look at the highlights of ES6 in practice.  I've been working heavily with ES6 for the last month or so, and agree with him on the highlights.  The standardized module syntax (which I transpile to AMD modules), Promises and destructuring particularly stand out as useful syntax that produces better code than what I had before.  I also enjoy the `=>` syntax, though I wish the language authors hadn't combined a syntactic convenience (shorter syntax) with a semantic difference (fat arrow functions are bound to the current context by default, normal functions are not).

Also of note is his repeated oblique references to [Babel](https://babeljs.io/) (formerly 6to5).  Since I wrote my post on  [Alternative JavaScript](http://benmccormick.org/2014/11/24/alternative-javascript/) 2 months ago, Babel has clearly emerged as the best way to use JavaScript features that are not yet widely supported today.  It integrates with a wide variety of tools, is reasonably performant speed-wise, and produces roughly 1-1 output, Coffeescript style.  Highly recommended for anyone looking to get started using or learning about new JavaScript features.
