webpackJsonp([56624991305085],{772:function(e,t){e.exports={data:{markdownRemark:{html:'<p>JavaScript has a strange naming history. For its initial release in 1995 as part of Netscape Navigator, Netscape labeled their new language LiveScript, before renaming it to JavaScript a year later, hoping to capitalize on Java’s popularity at the time (<a href="http://www.coderanch.com/t/456377/a/401/javascript-java.jpg">JavaScript has no actual relationship to Java</a>). In 1996 Netscape submitted JavaScript to <a href="http://www.ecma-international.org/">ECMA International</a> for standardization.  This eventually resulted in a new language standard, labeled ECMAScript.  All major JavaScript implementations since have actually been implementations of the ECMAScript standard, but the term JavaScript has stuck for historical and marketing reasons <sup id="fnref:1"><a href="#fn:1">1</a></sup>.  In the real world ECMAScript is usually used to refer to the standard while JavaScript is used when talking about the language in practice.</p>\n<p>This has mostly been trivia for JavaScript developers, because ECMAScript didn’t change much for the first 15 years of its existence, and real world implementations often differed significantly from the standard.  After the initial version of ECMAScript, work on the language continued and two more versions were quickly published.  But after ECMASCript 3 came out in 1999, there were no changes made to the official standard for a decade.  Instead various browser vendors made their own custom extensions to the language, and web developers were left to try and support multiple APIs.  Even after ECMAScript 5 was published in 2009, it took several years for wide browser support of the new spec, and most developers continued to write code in ECMAScript 3 style, without necessarily being aware of the standard.  </p>\n<p>Around 2012 things started to change.  There was more of a push to stop supporting old Internet Explorer versions, and writing code in ECMAScript 5 (ES5) style became much more feasible.  At the same time work was underway on a new ECMAScript standard, at which point it became much more common to start referring to JavaScript implementations in terms of their support for different ECMAScript standards.  The new standard was originally named ES.Harmony, before eventually being referred to as ECMAScript 6th Edition (ES6). In 2015 TC39, the committee responsible for drafting the ECMAScript specifications, made the decision to move to a yearly model for defining new standards, where new features would be added as they were approved, rather than drafting complete planned out specs that would only be finalized when all features were ready.  As a result ECMAScript 6th edition was renamed ECMAScript 2015 (ES2015) before it was published in June.</p>\n<p>Currently there are several proposals for new features or syntax to be added to JavaScript.  These include <a href="https://github.com/wycats/javascript-decorators">decorators</a>, <a href="https://github.com/lukehoban/ecmascript-asyncawait">async-await</a>, and <a href="https://gist.github.com/jeffmo/054df782c05639da2adb">static class properties</a>.  These are often refered to as ES7, ES2016, or ES.Next features, but should realistically be called proposals or possibilities, since the ECMAScript 2016 specification hasn’t been written yet, and might include all or none of those features.  TC39 divides proposals into 4 stages.  You can see the current state of various proposals on <a href="https://github.com/tc39/proposals">the TC39 Github repo</a>.</p>\n<p>So where does that leave us in terms of terminology?  The following list might be helpful:</p>\n<ul>\n<li><strong>ECMAScript</strong>: A language standardized by ECMA International and overseen by the TC39 committee.  This term is usually used to refer to the standard itself.</li>\n<li><strong>JavaScript</strong>: The commonly used name for implementations of the ECMAScript standard.  This term isn’t tied to a particular version of the ECMAScript standard, and may be used to refer to implementations that implement all or part of any particular ECMASCript edition.</li>\n<li><strong>ECMAScript 5 (ES5)</strong>: The 5th edition of ECMAScript, standardized in 2009.  This standard has been implemented fairly completely in all modern browsers</li>\n<li><strong>ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)</strong>: The 6th edition of ECMAScript, standardized in 2015.  This standard has been partially implemented in most modern browsers.  To see the state of implementation by different browsers and tools, check out <a href="http://kangax.github.io/compat-table/es6/">these compatibility tables</a>.</li>\n<li><strong>ECMAScript 2016</strong>: The expected 7th edition of ECMAScript. This is scheduled to be released next summer.  The details of what the spec will contain have not been finalized yet</li>\n<li><strong>ECMAScript Proposals</strong>: Proposed features or syntax that are being considered for future versions of the ECMAScript standard.  These move through a process of five stages: Strawman, Proposal, Draft, Candidate and Finished.</li>\n</ul>\n<p>Going forward in this blog, I’ll be referring to the recent ECMAScript version as ES6 (since that is how it is best known by most developers), next years spec as ES2016 (since that will be what it is called the whole way through its standardization process, unlike ES6/ES2015) and future language ideas that are not yet part of a draft or finalized spec as ECMAScript proposals or JavaScript proposals.  I’ll do my best to point back to this post in any cases that might be confusing.  </p>\n<h3>More Resources</h3>\n<ul>\n<li>If you’re wondering about the best way to keep up with JavaScript language changes, check out the resources <a href="/2017/07/10/how-to-follow-the-javascript-roadmap/">in this post</a></li>\n<li>TC39 has a <a href="https://github.com/tc39/ecma262">github repo</a> tracking all of their current open proposals.</li>\n<li>If you aren’t familiar with ES6 yet, Babel has a <a href="https://babeljs.io/docs/learn-es2015/">great rundown of its features</a></li>\n<li>If you want to go deeper with ES6 I’ve heard great things  about 2 books on the subject: <a href="http://exploringjs.com/">Exploring ES6</a> by Axel Rauschmayer and <a href="https://leanpub.com/understandinges6">Understanding ECMAScript 6</a> by Nicholas Zakas<sup id="fnref:2"><a href="#fn:2">2</a></sup>.  Axel’s blog <a href="http://www.2ality.com/">2ality</a> is also a great ES6 resource.</li>\n</ul>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:1">\n        <p>\n        And obviously because ECMAScript is an awful language name\n        </p>\n        <a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n    <li class="footnote" id="fn:2">\n        <p>\n        Note that I have not read either of these books yet, though I have read plenty of other content from both authors and consider them experts on the JavaScript language. So take that recommendation with an appropriate grain of salt.\n        </p>\n        <a href="#fnref:2" title="return to article"> ↩</a></p>\n    </li>\n</ol>\n</div>',frontmatter:{title:"ES5, ES6, ES2016, ES.Next: What's going on with JavaScript versioning?",keywords:"JavaScript, ECMAScript, ES6, ES7, ES5",category:"javascript",date:"2015-09-14T03:11:34+00:00",path:"/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning",layout:"post",hideFooter:null},fields:{slug:"/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning"}}},pathContext:{slug:"/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning",relatedPosts:[{path:"/2017/07/10/how-to-follow-the-javascript-roadmap/",data:{title:"How to follow the JavaScript roadmap",path:"/2017/07/10/how-to-follow-the-javascript-roadmap/",description:"Keeping up with the language's progress",date:"2017-07-10T12:00:00+00:00"}},{path:"/2015/12/30/es6-patterns-converting-callbacks-to-promises",data:{title:"ES6 Patterns: Converting Callbacks to Promises",path:"/2015/12/30/es6-patterns-converting-callbacks-to-promises",description:"How to convert a callback driven API to a Promise-based one",date:"2015-12-30T03:30:47+00:00"}},{path:"/2015/11/30/es6-patterns-clean-higher-order-functions",data:{title:"ES6 Patterns: Clean Higher Order Functions",path:"/2015/11/30/es6-patterns-clean-higher-order-functions",description:"A quick tip for clean functional syntax in ES6",date:"2015-11-30T05:06:03+00:00"}}]}}}});
//# sourceMappingURL=path---2015-09-14-es-5-es-6-es-2016-es-next-whats-going-on-with-javascript-versioning-2c95c7ce4e2bbaf73795.js.map