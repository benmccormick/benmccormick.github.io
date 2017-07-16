---
title: "How to follow the JavaScript roadmap"
date: "2017-07-10 12:00:00+00:00"
layout: "post"
path: "/2017/07/10/how-to-follow-the-javascript-roadmap/"
description: "Keeping up with the languages progress"
keywords: "javascript roadmap tc39 ecmascript"
category: "javascript"
key: "following-js-roadmap"
readNext: "ecma-explanation,orthogonality-css-js,atom-tips"
---

It can be difficult to keep up with all the things going on in web development, especially since the JavaScript language itself has been changing over the last several years.  After several years of relative stability[^1], the ECMAScript spec ([ECMAScript is the specification for the JavaScript language](https://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/)) has changed quite a bit over the last 3 years, with more changes on the way.  In this post I wanted to highlight a few of the resources I can recommend for keeping up with the language changes.

### Learning ES6/ES2015

If you haven't paid attention to any features that aren't ready in all browsers yet, or you're getting back to JavaScript development after being away for a while, you probably could use a resource to catchup on the ES6 JavaScript release from 2015.  ES6 is now [almost completely](https://kangax.github.io/compat-table/es6/) implemented in the latest versions of all major browsers, so if you've been ignoring it due to compatibility concerns, now is the time to learn.  Fortunately there are a lot of great resources for learning about ES6.  My favorite quick reference is the [Learn ES2015 page](https://babeljs.io/learn-es2015/) from [Babel][babel].  It's a short, example filled page with explanations of all the major features of the language update. If you want something meatier, there have been several resources created by JS experts.  [Understanding ECMAScript 6][understandingecma] by [Nicholas Zakas][zakas] and [Exploring ES6][exploring] by [Axel Rauschmayer][2ality] are books that go through the new features in detail.  If you prefer video tutorials, [Wes Bos][wb] has a [whole video course on ES6](https://es6.io/).

### Keeping up with new features

Things haven't been changing as fast since the ES6 release.  The first 2 "annual releases" of the ECMAScript spec contained only a [combined](http://2ality.com/2016/01/ecmascript-2016.html) [8 features](http://2ality.com/2016/02/ecmascript-2017.html). but there are still a lot of new features working their way through the ECMAScript pipeline.  If you want to get a quick overview of the features being considered for future releases, the best place to look is the [TC39 proposals repo on Github][proposals].  TC39 is the organization that guides the future of the ECMAScript spec.  Proposals go through a 4 stage process, where stage 1 can best be understood as "ideas", and stage 4 is "confirmed for the next ECMAScript release".  [Nicolás Bevacqua][ponyfoo] put up a [good post](https://ponyfoo.com/articles/tc39-ecmascript-proposals-future-of-javascript) last week describing this process in depth, as well as giving a brief description of the more advanced proposals in the queue. If you're interested in keeping up with new proposals but want somebody to walk you through them, I recommend subscribing to Axel Rauschmayer's [2ality](http://2ality.com/) blog.  In addition to writing the ES6 book mentioned above, he regularly writes blog posts highlighting new proposals with detailed explanations of the feature implementation and motivation.

### Testing new features

Almost all of the higher stage proposals on the TC39 list have been implemented by [Babel][babel] and you can try them out in the Babel [REPL](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&targets=&browsers=&builtIns=false&debug=false&code_lz=Q) or by setting up a small project that loads in Babel.  


### Keeping up with the conversation

If you're a twitter user, probably the easiest way to keep up with language evolution is to follow the people who are shaping and teaching the new language features.  Some twitter follow recommendations:

- [Yehuda Katz](https://twitter.com/wycats) - TC39 member, Ember core developer
- [Axel Rauschmayer](https://twitter.com/rauschma) - JS blogger and trainer
- [Wes Bos](https://twitter.com/wesbos) - JS blogger and trainer
- [Sebastian Markbåge](https://twitter.com/sebmarkbage) - TC39 member, React core developer
- [Henry Zhu](https://twitter.com/left_pad) - Babel maintainer


[^1]: From the release of the ECMAScript 5 spec to the ES6/ECMAScript2015 spec, the language wasn't exactly stable in practice because browser implementations didn't always move quickly, and there were still many incompatibilities.  But standard language syntax stayed stable for quite a while, which allowed the browser ecosystem to iron out some of those kinks prior to the adoption of ES6.

[understandingecma]: http://amzn.to/2tVcwaW
[zakas]: https://www.nczonline.net/about/
[2ality]: http://2ality.com/
[exploring]: http://exploringjs.com/es6.html
[wb]:http://wesbos.com/
[proposals]: https://github.com/tc39/proposals
[ponyfoo]: https://ponyfoo.com/contributors/ponyfoo
[babel]: https://babeljs.io/
