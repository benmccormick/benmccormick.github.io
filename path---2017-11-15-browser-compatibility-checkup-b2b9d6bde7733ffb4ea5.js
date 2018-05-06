webpackJsonp([0xdfd19070263f],{812:function(e,t){e.exports={data:{markdownRemark:{html:'<p>I’ve written a few times about the state of browser compatibility and the web platform over the years.  Over 4 years ago I <a href="https://benmccormick.org/2013/06/11/evergreen-browsers">linked to a post celebrating the rise of evergreen browsers</a>. Then 2 years ago I was one of several people stressing about <a href="https://benmccormick.org/2015/06/10/is-safari-being-left-behind/">whether Safari was going to hold the web back</a>.  It’s something I’ve followed closely because supporting many different subtly incompatible execution environments is one of the most unique and frustrating challenges of front-end development.  </p>\n<p>The last few years have been really good for web compatibility with Microsoft dumping Internet Explorer in favor of the evergreen Edge, and <a href="https://babeljs.io/">Babel</a> allowing JavaScript developers to write modern JS spec-compliant code and then have it transpiled back into something that runs in a wide variety of environments.  But fairly recently things have started to get even better.</p>\n<p>For the web application I have spent my workdays building over the past 4 years, we target the <a href="http://browserl.ist/?q=last+2+Chrome+versions%2C+last+2+Safari+versions%2C+last+2+Firefox+versions%2C+last+2+Edge+versions">last 2 versions of the major desktop browsers</a> (Chrome, Firefox, Safari, Edge).  At the time of writing that means we target</p>\n<ul>\n<li>Chrome 61 + 62</li>\n<li>Edge 15 + 16</li>\n<li>Firefox 55 + 56</li>\n<li>Safari 10.1 + 11</li>\n</ul>\n<p>I get that for some of you this is a very lax browser support standard, and you’re still supporting IE9 or old Android versions.  For others you don’t care about browser compatibility at all and are just hacking demos on the newest Chrome.  But “last 2 versions” is a real world standard that I know plenty of teams target.  And it certainly is a reasonable target for new devs learning about JavaScript and the web.  So let’s look at what is natively supported in all targeted browsers if you use this standard today. Spoiler Alert: life is pretty good.</p>\n<h3>Available Now</h3>\n<h4>All of ES6 and ES2016, and almost all of ES2017</h4>\n<p>If you’re distrustful of Babel and have been holding off on learning the new features that have transformed JavaScript over the past few years until they were “browser supported”, now is your time.  Other than shared memory and atomics (more on that below), every single feature from the recent updates to the ECMAScript spec is available in the last 2 versions of all 4 major browsers.</p>\n<p>That includes core ES6 stuff like classes, destructuring, and arrow functions.  But also features that were just standardized this summer like <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function">async functions</a>.</p>\n<h4>Modern CSS</h4>\n<p>Modern CSS specifications like <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">Flexbox</a>, <a href="https://css-tricks.com/snippets/css/complete-guide-grid/">CSS Grid</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables">CSS Variables</a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@supports">CSS Feature Queries</a> are all fully supported in these browsers, making creating layouts especially much easier than it had been in the past.</p>\n<h4>Promises and Fetch</h4>\n<p>Promises have been mostly supported for a while, but they didn’t have native support in IE11, so some folks may still be polyfilling them.  With a last 2 versions standard, you not only don’t need to polyfill Promises, but also can drop any polyfills for the promise based fetch api as well (and use them with async-await natively!).</p>\n<h3>Coming Soon</h3>\n<p>So there is a ton of stuff that is available today for people targeting the last 2 versions of browsers.  But there is also a bunch of stuff that is almost there:</p>\n<h4>Web Assembly and low level primitives</h4>\n<p><a href="https://blog.mozilla.org/blog/2017/11/13/webassembly-in-browsers/">WebAssembly is now shipping in the latest version of every major browser</a>.  WebAssembly is a target bytecode for the web that can interop with JavaScript.  Essentially somebody can write C, C++ or Rust code and then compile it to WebAssembly, which runs natively in the browser, potentially much more performantly than equivalent JavaScript code.  The latest version of all browsers also support <a href="http://2ality.com/2017/01/shared-array-buffer.html">SharedArrayBuffer and Atomics</a>, low level APIs for exploring better parallelism support in JavaScript.  In short, it will soon be possible to create much more performant experiences in web browsers than is currently possible.</p>\n<h4>WebRTC</h4>\n<p>The latest versions of all browsers also support WebRTC, an API for peer to peer communication through browsers.  This potentially opens the door for all types of browser-based text/video chat and collaboration applications.</p>\n<h4>Service Workers</h4>\n<p><a href="https://jakearchibald.github.io/isserviceworkerready/">Service workers are getting close</a>.  They’re available in every browser but Safari now, and Safari is working on them.  If we get another big <code>x.1</code> release of Safari like last year, they could be available for early adopters across the board within the next 6 months.  </p>\n<h3>The web is moving forward together</h3>\n<p>It’s fun to see this level of unified activity across the web platform over the past 2 years.  In my 7+ years of front-end development, I’ve never seen a more compatible web than the one we can develop against today.</p>',frontmatter:{title:"A Quick Browser Compatibility Checkup",keywords:"web browsers safari chrome edge firefox grid async await",category:"platform",date:"2017/11/15",path:"/2017/11/15/browser-compatibility-checkup/",layout:"post",hideFooter:null},fields:{slug:"/2017/11/15/browser-compatibility-checkup/"}}},pathContext:{slug:"/2017/11/15/browser-compatibility-checkup/",relatedPosts:[{path:"/2017/07/19/ten-things-javascript/",data:{title:"Ten Things A Serious JavaScript Developer Should Learn",path:"/2017/07/19/ten-things-javascript/",description:"Some of the important things to pick up in the JS world",date:"2017-07-19T04:00:00+00:00"}},{path:"/2017/07/24/my-favorite-interview-question/",data:{title:"My Favorite Interview Question",path:"/2017/07/24/my-favorite-interview-question/",description:"How does the Internet work anyway?",date:"2017-07-24T11:45:00+00:00"}},{path:"/2017/07/10/how-to-follow-the-javascript-roadmap/",data:{title:"How to follow the JavaScript roadmap",path:"/2017/07/10/how-to-follow-the-javascript-roadmap/",description:"Keeping up with the language's progress",date:"2017-07-10T12:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2017-11-15-browser-compatibility-checkup-b2b9d6bde7733ffb4ea5.js.map