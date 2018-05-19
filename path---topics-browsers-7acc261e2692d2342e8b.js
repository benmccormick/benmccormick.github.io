webpackJsonp([0x7dd49cfcc68a],{877:function(e,t){e.exports={pathContext:{posts:[{node:{frontmatter:{readNext:null,topics:["Browsers"],category:"platform",key:null,title:"Evergreen Browsers",description:"A look at the future of browsers",layout:"post",path:"/2013/06/11/evergreen-browsers",date:"2013-06-11T18:45:00+00:00",dontfeature:null,isDraft:null},html:'<p><a href="http://tomdale.net/2013/05/evergreen-browsers/">Tom Dale on Evergreen Browsers:</a></p>\n<blockquote>\n<p>If you’re like me, when you’re developing a new web application, you put features into mental buckets. There’s the “works in IE7″ bucket, the “works in IE8″ bucket, “(I think) works in IE9,” and of course, “works in MobileSafari.”</p>\n</blockquote>\n<blockquote>\n<p>The one bucket I don’t have is the “works in Chrome” bucket. That’s too much mental overhead. Instead, if I want to test whether something works in Chrome, I just pop open a new JS Bin and try it out. I don’t worry about which version they’re on—I assume that by the time my code makes it to production, my users will be on more-or-less the same version as me.</p>\n</blockquote>\n<blockquote>\n<p>What would the web platform look like if every browser with significant market share updated itself at the same pace—and lack of user intervention—as Chrome?</p>\n</blockquote>\n<p>I’m excited for this to happen.  Browser diversity is a good thing and worth the pain because it pushes things forward, but the advantages are lost when users aren’t moving forward along with the innovations that diversity and competition bring.  Having an up to date browser shouldn’t be a user concern.  Here’s to a web that moves at the pace of the leaders, rather than being paced by the least common denominator.</p>',fields:{slug:"/2013/06/11/evergreen-browsers"}}},{node:{frontmatter:{readNext:null,topics:["Browsers"],category:"platform",key:null,title:"Is Safari being left behind?",description:"Should we be concerned about Safari holding back the web?",layout:"post",path:"/2015/06/10/is-safari-being-left-behind",date:"2015-06-10T04:03:41+00:00",dontfeature:null,isDraft:null},html:'<p>On Twitter yesterday, <a href="https://alexsexton.com/">Alex Sexton</a> surfaced Apple’s fact sheet on what’s new with Safari 9:</p>\n<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://t.co/fVg9U9dEq4">https://t.co/fVg9U9dEq4</a>&#10;&#10;Some ES6 and lots of unprefixed CSS (flexbox!), but I really want Intl, ServiceWorkers, PointerEvents, HTTP2, CSP2…</p>&mdash; Alex Sexton (@SlexAxton) <a href="https://twitter.com/SlexAxton/status/608017541173284864">June 8, 2015</a></blockquote>\n<p>Safari 9 is still in developer preview and won’t ship till September or so, so this all could change, but Apple’s changelog is underwhelming to say the least.   The developer facing changes in Safari 9 consist of only standardized versions of CSS properties (that were already supported with a prefix), and a handful of ES6 features.</p>\n<blockquote>\n<p>The following ECMAScript 6 content is now supported by Safari:</p>\n<ul>\n<li>Classes</li>\n<li>Computed Properties</li>\n<li>Weak Set</li>\n<li>Number Object</li>\n<li>Octal and Binary Literals</li>\n<li>Symbol Objects</li>\n<li>Template Literals</li>\n</ul>\n</blockquote>\n<p><em>- <a href="https://developer.apple.com/library/prerelease/mac/releasenotes/General/WhatsNewInSafari/Articles/Safari_9.html#//apple_ref/doc/uid/TP40014305-CH9-SW27">Safari Pre-Release notes</a></em></p>\n<p>While it’s great to see ES6 support, the truth is that by the time Safari is released in the fall, <a href="http://blogs.windows.com/msedgedev/2015/05/12/javascript-moves-forward-in-microsoft-edge-with-ecmascript-6-and-beyond/">Microsoft Edge</a> will have been released, and Safari 9 will release as (at best) the <a href="http://kangax.github.io/compat-table/es6/">3rd most ES6-compliant browser</a> among the 4 major desktop browsers.  And due to its yearly schedule, it’s basically guaranteed to be in last by the end of the year.  At the same time Safari has neglected other APIs like Internationalization, Pointer Events, Web Components, CSS Variables, Service Workers, or ASM.js optimizations, all of which are supported or in progress by each of the other browsers <sup id="fnref:1"><a href="#fn:1">1</a></sup>.  In addition, Safari’s developer tools, which were once best in class, have been slowly falling behind Chrome and Firefox, especially in more advanced performance features.</p>\n<p>So does this mean that Safari is the next IE6?  Not so much.  We’ve come a long way since the IE6 era, and browsers are more standards compliant than ever.  Tools like <a href="https://babeljs.io/">Babel</a> make it easier for developers to participate in the future of the web without being restricted by slow moving browsers or legacy support concerns.   But there’s always going to be some browser that serves as the “bottleneck” for what web developers are able to reasonably use in production.  Currently that is older versions of Internet Explorer and old Android browsers.  But as more and more users upgrade to Android phones using Chrome, and Microsoft makes strong pushes to move users to the <a href="http://benmccormick.org/2013/06/11/evergreen-browsers/">evergreen</a> Edge browser, it’s quite likely that Safari could take their place.  It is now the only major browser being updated yearly, and with Microsoft’s recent re-emphasis on JavaScript and HTML development, Apple is the only major browser vendor who seems to view the web as a second class platform.</p>\n<p>Safari is not going away.  Its monopoly status on iOS more or less guarantees that, and on the desktop I’ve talked to plenty of people who like its simple UI, and others who feel that it’s faster or consumes less memory than Chrome and Firefox.  But it will be a sad sight if it gets left behind.  Here’s hoping that the final release contains more surprises, and that going forward Apple chooses to embrace the web browser as a platform worthy of the respect and effort its competitors have lavished on it.</p>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:1">\n        <p>\n        Ok, CSS Variables, Service Workers and Web Components are "under consideration" by IE.\n        <a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n</ol>\n</div>',fields:{slug:"/2015/06/10/is-safari-being-left-behind"}}},{node:{frontmatter:{readNext:"ten-things-js,favorite-interview,following-js-roadmap",topics:["Browsers"],category:"platform",key:"browser-compatibility-checkup",title:"A Quick Browser Compatibility Checkup",description:"It's good news!",layout:"post",path:"/2017/11/15/browser-compatibility-checkup/",date:"2017/11/15",dontfeature:null,isDraft:null},html:'<p>I’ve written a few times about the state of browser compatibility and the web platform over the years.  Over 4 years ago I <a href="https://benmccormick.org/2013/06/11/evergreen-browsers">linked to a post celebrating the rise of evergreen browsers</a>. Then 2 years ago I was one of several people stressing about <a href="https://benmccormick.org/2015/06/10/is-safari-being-left-behind/">whether Safari was going to hold the web back</a>.  It’s something I’ve followed closely because supporting many different subtly incompatible execution environments is one of the most unique and frustrating challenges of front-end development.  </p>\n<p>The last few years have been really good for web compatibility with Microsoft dumping Internet Explorer in favor of the evergreen Edge, and <a href="https://babeljs.io/">Babel</a> allowing JavaScript developers to write modern JS spec-compliant code and then have it transpiled back into something that runs in a wide variety of environments.  But fairly recently things have started to get even better.</p>\n<p>For the web application I have spent my workdays building over the past 4 years, we target the <a href="http://browserl.ist/?q=last+2+Chrome+versions%2C+last+2+Safari+versions%2C+last+2+Firefox+versions%2C+last+2+Edge+versions">last 2 versions of the major desktop browsers</a> (Chrome, Firefox, Safari, Edge).  At the time of writing that means we target</p>\n<ul>\n<li>Chrome 61 + 62</li>\n<li>Edge 15 + 16</li>\n<li>Firefox 55 + 56</li>\n<li>Safari 10.1 + 11</li>\n</ul>\n<p>I get that for some of you this is a very lax browser support standard, and you’re still supporting IE9 or old Android versions.  For others you don’t care about browser compatibility at all and are just hacking demos on the newest Chrome.  But “last 2 versions” is a real world standard that I know plenty of teams target.  And it certainly is a reasonable target for new devs learning about JavaScript and the web.  So let’s look at what is natively supported in all targeted browsers if you use this standard today. Spoiler Alert: life is pretty good.</p>\n<h3>Available Now</h3>\n<h4>All of ES6 and ES2016, and almost all of ES2017</h4>\n<p>If you’re distrustful of Babel and have been holding off on learning the new features that have transformed JavaScript over the past few years until they were “browser supported”, now is your time.  Other than shared memory and atomics (more on that below), every single feature from the recent updates to the ECMAScript spec is available in the last 2 versions of all 4 major browsers.</p>\n<p>That includes core ES6 stuff like classes, destructuring, and arrow functions.  But also features that were just standardized this summer like <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function">async functions</a>.</p>\n<h4>Modern CSS</h4>\n<p>Modern CSS specifications like <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">Flexbox</a>, <a href="https://css-tricks.com/snippets/css/complete-guide-grid/">CSS Grid</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables">CSS Variables</a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@supports">CSS Feature Queries</a> are all fully supported in these browsers, making creating layouts especially much easier than it had been in the past.</p>\n<h4>Promises and Fetch</h4>\n<p>Promises have been mostly supported for a while, but they didn’t have native support in IE11, so some folks may still be polyfilling them.  With a last 2 versions standard, you not only don’t need to polyfill Promises, but also can drop any polyfills for the promise based fetch api as well (and use them with async-await natively!).</p>\n<h3>Coming Soon</h3>\n<p>So there is a ton of stuff that is available today for people targeting the last 2 versions of browsers.  But there is also a bunch of stuff that is almost there:</p>\n<h4>Web Assembly and low level primitives</h4>\n<p><a href="https://blog.mozilla.org/blog/2017/11/13/webassembly-in-browsers/">WebAssembly is now shipping in the latest version of every major browser</a>.  WebAssembly is a target bytecode for the web that can interop with JavaScript.  Essentially somebody can write C, C++ or Rust code and then compile it to WebAssembly, which runs natively in the browser, potentially much more performantly than equivalent JavaScript code.  The latest version of all browsers also support <a href="http://2ality.com/2017/01/shared-array-buffer.html">SharedArrayBuffer and Atomics</a>, low level APIs for exploring better parallelism support in JavaScript.  In short, it will soon be possible to create much more performant experiences in web browsers than is currently possible.</p>\n<h4>WebRTC</h4>\n<p>The latest versions of all browsers also support WebRTC, an API for peer to peer communication through browsers.  This potentially opens the door for all types of browser-based text/video chat and collaboration applications.</p>\n<h4>Service Workers</h4>\n<p><a href="https://jakearchibald.github.io/isserviceworkerready/">Service workers are getting close</a>.  They’re available in every browser but Safari now, and Safari is working on them.  If we get another big <code>x.1</code> release of Safari like last year, they could be available for early adopters across the board within the next 6 months.  </p>\n<h3>The web is moving forward together</h3>\n<p>It’s fun to see this level of unified activity across the web platform over the past 2 years.  In my 7+ years of front-end development, I’ve never seen a more compatible web than the one we can develop against today.</p>',fields:{slug:"/2017/11/15/browser-compatibility-checkup/"}}}],topic:"Browsers"}}}});
//# sourceMappingURL=path---topics-browsers-7acc261e2692d2342e8b.js.map