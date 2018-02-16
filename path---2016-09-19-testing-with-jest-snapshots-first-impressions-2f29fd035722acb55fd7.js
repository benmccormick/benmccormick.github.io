webpackJsonp([0x9184f0b9a7cd],{695:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Over the past 6 months my team at work has been slowly transitioning a large Backbone application to React.  One of the main goals of the transition has been to build out unit tests as we transition components.  As part of that we switched from using Karma to using Jest for managing our tests.</p>\n<p>Our new setup with Jest has several advantages over our previous setup. All Jest tests run through node using a fake DOM implementation.  We don’t need to start up a browser so tests are faster and less flaky <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>.  Jest makes it possible to mock all modules by default <sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup>, which works well for us since our code base currently contains a large amount of code that is difficult to test for one reason or another.  Jest provides great integration with Babel, which is helpful since all of our Backbone and React code uses ES6 that we transpile for the browser.  Finally Jest provides a wonderful watch mode that runs only the tests that are relevant to the changes you’ve made and makes it easy to see the result.</p>\n<p>About a month ago, Jest debuted a new feature: Snapshot testing.  It works a bit differently than a normal unit test.  Instead of executing some code and comparing the output against a value provided by a developer, the first time a test is run, the output passed into the test is saved to a “snapshot file”.  Then when the test is run in the future, the output is compared to the snapshot file.  If the output matches the file, the test passes, if the output is different then the file, the test fails and Jest prints a diff.  We’ve been using Jest snapshots for a few weeks now and I wanted to share my initial impressions.</p>\n<h3>What is it like to use a snapshot test ?</h3>\n<p>The process for snapshot testing is a bit different than normal tests.  Most snapshot tests look fairly simple.  Something like this example from the <a href="https://github.com/facebook/jest/tree/master/examples/snapshot">Jest repository</a>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">// Link.react.js</span>\n<span class="token comment">// Copyright 2004-present Facebook. All Rights Reserved.</span>\n\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> STATUS <span class="token operator">=</span> <span class="token punctuation">{</span>\n  NORMAL<span class="token punctuation">:</span> <span class="token string">\'normal\'</span><span class="token punctuation">,</span>\n  HOVERED<span class="token punctuation">:</span> <span class="token string">\'hovered\'</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Link</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">this</span><span class="token punctuation">.</span>_onMouseEnter <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onMouseEnter<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>_onMouseLeave <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onMouseLeave<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>\n      <span class="token keyword">class</span><span class="token punctuation">:</span> STATUS<span class="token punctuation">.</span>NORMAL<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">_onMouseEnter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token keyword">class</span><span class="token punctuation">:</span> STATUS<span class="token punctuation">.</span>HOVERED<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">_onMouseLeave</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token keyword">class</span><span class="token punctuation">:</span> STATUS<span class="token punctuation">.</span>NORMAL<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span>a\n        className<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span>\n        href<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>page <span class="token operator">||</span> <span class="token string">\'#\'</span><span class="token punctuation">}</span>\n        onMouseEnter<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>_onMouseEnter<span class="token punctuation">}</span>\n        onMouseLeave<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>_onMouseLeave<span class="token punctuation">}</span><span class="token operator">></span>\n        <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>children<span class="token punctuation">}</span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Link.react-test.js  (partial)</span>\n<span class="token comment">// Copyright 2004-present Facebook. All Rights Reserved.</span>\n<span class="token comment">/* eslint-disable no-unused-vars */</span>\n\n<span class="token string">\'use strict\'</span>\n\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Link <span class="token keyword">from</span> <span class="token string">\'../Link.react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> renderer <span class="token keyword">from</span> <span class="token string">\'react-test-renderer\'</span><span class="token punctuation">;</span>\n\n<span class="token function">it</span><span class="token punctuation">(</span><span class="token string">\'renders correctly\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> tree <span class="token operator">=</span> renderer<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>Link page<span class="token operator">=</span><span class="token string">"http://www.facebook.com"</span><span class="token operator">></span>Facebook<span class="token operator">&lt;</span><span class="token operator">/</span>Link<span class="token operator">></span>\n  <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>tree<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatchSnapshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>The first time the test is run, a snapshot file is produced.  In this case, running the previous test produces a snapshot file that looks like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">// Link.react-test.js.snap  (partial)</span>\nexports<span class="token punctuation">[</span><span class="token template-string"><span class="token string">`test renders correctly 1`</span></span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token template-string"><span class="token string">`\n&lt;a\n  className="normal"\n  href="http://www.facebook.com"\n  onMouseEnter={[Function bound _onMouseEnter]}\n  onMouseLeave={[Function bound _onMouseLeave]}>\n  Facebook\n&lt;/a>\n`</span></span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>This gives us a baseline for what we expect the UI to look like.  The snapshot is generated in a folder in your <code>__tests__</code> directory, so that it can be checked into source control.</p>\n<p>The next time a test is run, if nothing has changed, the test passes.  However, if we change something (let’s say we add a class), the test fails and shows us a diff.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">// updated link render method</span>\n\n<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>a\n      className<span class="token operator">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token string">`link-item </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">}</span>\n      href<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>page <span class="token operator">||</span> <span class="token string">\'#\'</span><span class="token punctuation">}</span>\n      onMouseEnter<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>_onMouseEnter<span class="token punctuation">}</span>\n      onMouseLeave<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>_onMouseLeave<span class="token punctuation">}</span><span class="token operator">></span>\n      <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>children<span class="token punctuation">}</span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code># jest output\n\nFAIL  __tests__/Link.react-test.js\n ✕ renders correctly (16ms)\n\n● renders correctly\n\n    Received value does not match the stored snapshot 1.\n\n    - Snapshot\n    + Received\n\n      &lt;a\n<span class="token deleted">-       className="normal"</span>\n<span class="token inserted">+       className="link-item normal"</span>\n        href="http://www.facebook.com"\n        onMouseEnter={[Function bound _onMouseEnter]}\n        onMouseLeave={[Function bound _onMouseLeave]}>\n        Facebook\n      &lt;/a>\n\n      at Object.&lt;anonymous> (__tests__/Link.react-test.js:14:16)\n</code></pre>\n      </div>\n<p>We can then choose to accept this change by running <code>jest -u</code> to update the snapshot, or update our code to fix the regression.  If we update the snapshot file, the test will start passing again.</p>\n<h3>Snapshot tests are a complement for conventional tests not a replacement</h3>\n<p>The first thing that became clear to me while using snapshot testing is that they’re not for everything.  They are optimized for a different case than normal assertion-based tests.</p>\n<p>Classic assertion based tests are perfect for testing clearly defined behavior that is expected to remain relatively stable.</p>\n<p>Snapshot tests are great for testing less clearly defined behavior that may change often.</p>\n<p>Snapshot testing is perfect for things that in the past would have raised concern for “overly brittle” tests that slow development teams down.  The classic example of this (and the main focus of discussion around Jest snapshots so far) is UI testing.</p>\n<p>UI components often change in small and trivial ways.  Copy is changed, whitespace is added, a border color is modified. Generally this means that developers have to choose between detailed tests that catch any regression but require constant updates, or less detailed tests that focus on core behaviors but miss smaller regressions.</p>\n<p>Snapshot tests provide a new way of approaching these problems in unit tests.  Because they are easy to write and effortless to update, and provide a clear view of what changed after each update, whether it is major or minor.</p>\n<p>This isn’t without any disadvantage. Snapshot tests preserve a starting point, but don’t give any indication of developer intent to future developers.  Like any other test, if the initial snapshot passes with bugs, or doesn’t capture the full range of cases, the test won’t adequately cover those behaviors.  But unlike traditional tests, snapshot tests don’t provide specific guidance for what the original developer expected beyond the “actual behavior”.  If there are multiple sub-behaviors that interact to produce output, its not clear which of those are essential, and which are incidental.  That’s not something you want for your critical application logic, especially complicated logic with many subtle cases.  But for UI components and other application elements that are likely to change a lot over time, this is a good set of tradeoffs.</p>\n<h3>Snapshot tests are more useful with a healthy code review process</h3>\n<p>I’ve pointed out several times now that snapshot tests are easy to update.  One of the downsides of the current design is that they can be almost too easy to update.  When a snapshot test fails, you have the option of modifying the output so that the test passes again, or updating the snapshot to reflect the new output.  Unfortunately, Jest currently provides no granularity for this updating.  Running <code>jest -u</code> to update the snapshots will update all snapshots.  So if  a single change causes many snapshots to break, it can be easy to accidentally update all of them, and possibly difficult to work through the whole diff to find changes.</p>\n<p>A robust code review process minimizes these problems.  Because snapshots are checked into source, the diffs in the snapshots are checked into source control.  Viewing diffs in a dedicated code review tool like Github, Bitbucket or Gitlab, it’s easier to see exactly what changed over many files than it might be when updating snapshots from the command line, and if you update a snapshot multiple times in a single branch, you can see the net effect on the snapshot through source control diffs better than you can through Jest.</p>\n<h3>Snapshot tests work well with auto-mocking</h3>\n<p>Auto-mocking has been one of Jest’s more controversial features.  Prior to version 15, Jest mocked every module used in tests by default.  To run the actual module code, it was necessary to manually unmock each module used or change Jest configurations.  Though it is now disabled by default, auto-mocking actually works very well with snapshot tests.  One problem with tests that rely on generating DOM in React is the fact that most components of any complexity are actually made up of smaller components, that often use external functions with complex logic to determine what to show.  If we fully render everything, changing any of those pieces can break tests for many components, moving us away from the concept of a “unit test”.  If we mock child components and helper functions and then test them individually though, we can focus our tests to only change based on the logic of the individual component being tested.  This is incredibly easy with Jest, and especially helpful in large code bases that don’t have complete test coverage.  Auto-mocking is considered an “advanced feature” of Jest, but it’s not hard to use.  Most mocked modules produce something non-harmful by default, and when its necessary to override, its not difficult to produce something meaningful without getting too involved.  Just add a file with the same name as the file to be mocked into a <code>__mocks__</code> folder in that directory, and give the mocked module the same interface as the mocked component.  You can either write it from scratch or use <a href="http://facebook.github.io/jest/docs/api.html#jest-genmockfrommodule-modulename">jest.genMockFromModule</a> as a starting place.</p>\n<h3>Summary</h3>\n<p>I’m impressed by Jest snapshots.  When combined with React, they’re providing my first non-frustrating experience unit testing UI components.  I’m excited to use them more going forward, and will be interested to see how they evolve from here.</p>\n<hr>\n<h3>Extra: A few miscellaneous Jest Thoughts</h3>\n<ul>\n<li>The UI output from Jest 15 tests is the best I’ve ever seen from a testing framework.  Aside from the nice diffs on snapshots, they do a good job explaining how output differed from expectations in assertion based tests, and communicating context for test failures, warnings and logging messages.  They also give great guidance when making configuration changes:</li>\n</ul>\n<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/cpojer">@cpojer</a> This is lovely, thank you! <a href="https://t.co/CX1v11CAVc">pic.twitter.com/CX1v11CAVc</a></p>&mdash; Ben McCormick (@ben336) <a href="https://twitter.com/ben336/status/772906536154894336">September 5, 2016</a></blockquote>\n<ul>\n<li>\n<p>I’ve also been super impressed with Jest’s watch mode in Jest 15.  <code>--watch</code> makes it easy to focus on a few files or run tests on all files, and stays up to date as you change code.  If you haven’t worked with Jest in a while, the developer experience alone makes it worth trying out.</p>\n</li>\n<li>\n<p>One potential future annoyance with snapshot tests:  The snapshot format can’t be iterated on without breaking all current tests.  Make sure not to mix functional changes with Jest updates!</p>\n</li>\n</ul>\n<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">We&#39;ll update the snapshot format sometimes in minor/major releases. When updating Jest, please update snapshots<br><br>See <a href="https://t.co/gPE63dMz8P">https://t.co/gPE63dMz8P</a></p>&mdash; Christoph Pojer (@cpojer) <a href="https://twitter.com/cpojer/status/776623521069805568">September 16, 2016</a></blockquote>\n<h3>More Resources</h3>\n<ul>\n<li>\n<p>Randy Coulman has a <a href="http://randycoulman.com/blog/2016/09/06/snapshot-testing-use-with-care/">nice article</a> on some of the reasons to be careful about embracing snapshot testing.  He makes good points about the requirement of human involvement in verifying a change in time-crunched situations and also the potential value of snapshot tests for legacy code.</p>\n</li>\n<li>\n<p>My team uses a mix of <a href="https://github.com/airbnb/enzyme">enzyme</a> and snapshot tests for unit testing React Components.  <a href="https://github.com/trayio/enzyme-to-json?utm_content=buffer6b78b&#x26;utm_medium=social&#x26;utm_source=twitter.com&#x26;utm_campaign=buffer">This repo</a> combines them, allowing you to use enzyme to generate the snapshot output to diff against rather than the renderer provided by Jest. I personally haven’t felt the need to integrate these two tools, but if your team uses enzyme and wants consistency/fewer (used) dependencies, this could be a cool option.</p>\n</li>\n<li>\n<p>Finally here’s <a href="https://blog.grommet.io/post/2016/09/01/how-we-landed-on-jest-snapshot-testing-for-javascript">another article</a> on how Snapshot testing convinced one team to migrate to Jest from Tape</p>\n</li>\n</ul>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>PhantomJS was a tremendous source of pain in our Karma setup.</p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n<li id="fn-2">\n<p>This used to be the default setting, with Jest 15 it can be configured to work that way.</p>\n<a href="#fnref-2" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',frontmatter:{title:"Testing with Jest Snapshots: First Impressions",keywords:"Jest JavaScript testing React Snapshot Tests",category:"tools",date:"2016-09-19T12:41:00+00:00",path:"/2016/09/19/testing-with-jest-snapshots-first-impressions/",layout:"post",hideFooter:null},fields:{slug:"/2016/09/19/testing-with-jest-snapshots-first-impressions/"}}},pathContext:{slug:"/2016/09/19/testing-with-jest-snapshots-first-impressions/",relatedPosts:[{path:"/2016/12/10/saving-time-with-jest",data:{title:"Saving Time With Jest: Meetup Summary",path:"/2016/12/10/saving-time-with-jest",description:"A summary of my meetup talk on saving time with Jest",date:"2016-12-10T05:15:00+00:00"}},{path:"/2015/09/09/what-can-backbone-developers-learn-from-react",data:{title:"Lessons Backbone Developers Can Learn From React",path:"/2015/09/09/what-can-backbone-developers-learn-from-react",description:"A look at the lessons that Backbone developers can learn from React",date:"2015-09-09T11:19:43+00:00"}},{path:"/2017/01/09/mobx-first-impressions/",data:{title:"MobX: First Impressions",path:"/2017/01/09/mobx-first-impressions/",description:"First impression of managing data with MobX",date:"2017-01-09T13:30:00+00:00"}}]}}}});
//# sourceMappingURL=path---2016-09-19-testing-with-jest-snapshots-first-impressions-2f29fd035722acb55fd7.js.map