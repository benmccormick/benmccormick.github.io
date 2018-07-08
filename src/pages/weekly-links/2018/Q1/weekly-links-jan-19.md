---
title: "Weekly Links: January 19th"
date: "2018/01/19"
layout: "weekly-links"
path: "/2018/01/19/weekly-links-01-19-18/"
description: "JavaScript Framework lifecycles, WebAssembly, and Social Media "
keywords: "webpack webassembly stack overflow dogecoin"
category: "opinion"
topics: ['WebAssembly', 'Webpack']
key: "weekly-links-01-19-18"
---


### JavaScript And The Web

[The Brutal Lifecycle of JavaScript Frameworks | Stack Overflow Blog](https://stackoverflow.blog/2018/01/11/brutal-lifecycle-javascript-frameworks/) - This was an interesting analysis on how JavaScript frameworks have risen and fallen.  Among the reasons that it's interesting is that the data appears to be a bit of a Rorschach test.  The post itself is very negative about the pace of change in the JavaScript framework world.  But I saw a lot of twitter takes like this one:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">This “new framework every 6-months” FUD is comical. The crux is centered on 4 JS frameworks released over the last decade. <br><br>4. In 10 years. <br><br>It’s great for my business, but makes me chuckle. <br><br>It’s not really moving that fast y’all. <a href="https://t.co/BiH7UK0M9V">https://t.co/BiH7UK0M9V</a></p>&mdash; Joel ⛈ (@jhooks) <a href="https://twitter.com/jhooks/status/951924735654244352?ref_src=twsrc%5Etfw">January 12, 2018</a></blockquote>

Personally I lean more toward the side that there's nothing wrong here.  The change in frameworks has come during a large change in use cases and technology used on the web.  Think PWAs verse server-side generated sites, and the large amount of new browser APIs and JavaScript language features.  These things have naturally brought new best practices which have been encoded in frameworks.  While it is true that a jQuery based site from 2009 might be difficult to maintain through today, that has less to do with the lack of support for the technology than it does with the fundamental nature of web development.  It would be much more difficult to build and scale a web application like [Slack](https://slack.com/) using only jQuery and other 2009 technologies.  
Which is why it was surpassed for *web application* development first by a wave of frameworks that allowed you to model domain concepts in an object oriented way and tie that to a UI (Backbone, Angular1, Knockout), and then by a second wave that allowed you to do that with more declarative component-based UIs (React, Ember, Angular2+, Vue).  Those evolutions have come to match a real need.


[Can (a ==1 && a== 2 && a==3) ever evaluate to true? | Stack Overflow](https://stackoverflow.com/questions/48270127/can-a-1-a-2-a-3-ever-evaluate-to-true/48274520#48274520) - This was a fun little question.  I don't think I like it as an interview question for JavaScript, since it borders on trivia, and requires in-depth knowledge of the "bad parts" of JavaScript like `==` and `with` or global variable behavior that many new developers are just taught to avoid.  But it's definitely a fun trivia question.  And it may even be a good interview question in Python, where you can do it using more commonly accepted parts of the language.

```python
class EqualToEverything:
  def __eq__(self, x): return True
a = EqualToEverything()
print(a == 1 and a == 2 and a ==3) #prints True
```

[Making WebAssembly even faster: Firefox’s new streaming and tiering compiler | Lin Clark](https://hacks.mozilla.org/2018/01/making-webassembly-even-faster-firefoxs-new-streaming-and-tiering-compiler/) - Web Assembly + Rust is quickly moving to the top of my "I've got to learn more about that" list.

[Keep webpack Fast: A Field Guide for Better Build Performance | Slack Engineering](https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1) - This is a super helpful and detailed list of performance tips and tricks for Webpack builds, which unfortunately are easy to make slow and challenging to make fast for large projects.  Even after having my own fights with webpack last year, I learned a few things from this, and look forward to experimenting with them.


### Tech and Business

[Birdcage Liners | Joel Spoelsky](https://www.joelonsoftware.com/2018/01/12/birdcage-liners/) - Joel's first post in a while is a great piece on the problems with social media, as well as tech folks' responsibility to think through the choices they're making, including the secondary effects.  What type of future are we making?

[My Joke Cryptocurrency Hit $2 Billion and Something Is Very Wrong](https://motherboard.vice.com/en_us/article/9kng57/dogecoin-my-joke-cryptocurrency-hit-2-billion-jackson-palmer-opinion) - I promise I snagged this link to post before bitcoin took a dip this week, but I don't think it's properly appreciated in many places just how crazy the cryptocurrency fad is becoming.  Meme-based joke currencies are being valued at billions of dollars, and there are many other similar newborn currencies with similar valuations out there.  I'm not going to try to give anyone investment advise, but it seems clear for now that at minimum these "currencies" are completely unusable for their theoretical purpose as currency given the price swings.
