webpackJsonp([0xa929cf198052],{714:function(e,s){e.exports={data:{markdownRemark:{html:'<p>This week I gave a talk at the brand new Triangle ReactJS meetup group on how <a href="https://facebook.github.io/jest/">Jest</a> can save developers time.  I was asked afterwards to share the content online for those who missed it.  My talk was mostly demos and wasn’t recorded, so there unfortunately isn’t much to share, but I thought I could write out the basic ideas behind the talk, and share them here.</p>\n<h3>What is Jest</h3>\n<p>Jest is a JavaScript testing framework built by Facebook to address their internal problems testing JavaScript code.  It was open-sourced in 2014, but unlike Facebook’s other recent high profile JavaScript OSS projects like React, Flux, Relay and GraphQL, it failed to develop much traction in the community and mostly stagnated for 2 years.  That changed in early 2016 when 2 Facebook developers, <a href="https://twitter.com/cpojer">Christoph Pojer</a> and <a href="https://twitter.com/abramov_dmitrii">Dmitrii Abramov</a> began working on improving the project. Over the past year they’ve brought massive improvements to the developer experience of using Jest.</p>\n<p>At a more practical level Jest is a test runner with a built in assertion library and support for code coverage, babel transpilation, and module mocking.  It began as a wrapper around <a href="https://jasmine.github.io/">Jasmine</a>, an older JavaScript testing library, but has since replaced parts of Jasmine with replacement functionality, while retaining backwards compatibility.</p>\n<h3>How Can Jest Save Me Time?</h3>\n<p>Jest saves developers  time in 4 main ways:</p>\n<ol>\n<li><strong>Setup</strong> - Jest is simple to configure</li>\n<li><strong>Writing Tests</strong> - Jest provides a method for writing simple UI tests, and makes it easy to port over existing tests</li>\n<li><strong>Running Tests</strong> - Jest runs tests in parallel, doesn’t require a browser, and only runs the tests that are affected by the current code changes</li>\n<li><strong>Fixing Tests</strong> - Jest gives great error messages, helps you find the failing code, and has other smaller UX features that make it easy to debug your failing tests quickly.</li>\n</ol>\n<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Tonight <a href="https://twitter.com/ben336">@ben336</a> speaks about using <a href="https://twitter.com/hashtag/jest?src=hash">#jest</a> with <a href="https://twitter.com/hashtag/reactjs?src=hash">#reactjs</a> for your testing needs <a href="https://twitter.com/nestraleigh">@nestraleigh</a> <a href="https://t.co/CAV8wZUwFw">pic.twitter.com/CAV8wZUwFw</a></p>&mdash; Tracy Lee | ladyleet (@ladyleet) <a href="https://twitter.com/ladyleet/status/806655476515618822">December 8, 2016</a></blockquote>\n<h3>Setup</h3>\n<p>Setting up Jest is extremely straightforward. Here’s a <code>Hello World</code> React Project</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code>//package.json\n<span class="token punctuation">{</span>\n  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"simple_example"</span><span class="token punctuation">,</span>\n  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>\n  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"A minimal jest testing example"</span><span class="token punctuation">,</span>\n  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"jest"</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"react"</span><span class="token operator">:</span> <span class="token string">"^15.4.1"</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"babel-jest"</span><span class="token operator">:</span> <span class="token string">"^17.0.2"</span><span class="token punctuation">,</span>\n    <span class="token property">"babel-preset-es2015"</span><span class="token operator">:</span> <span class="token string">"^6.18.0"</span><span class="token punctuation">,</span>\n    <span class="token property">"babel-preset-react"</span><span class="token operator">:</span> <span class="token string">"^6.16.0"</span><span class="token punctuation">,</span>\n    <span class="token property">"jest"</span><span class="token operator">:</span> <span class="token string">"^17.0.3"</span><span class="token punctuation">,</span>\n    <span class="token property">"react-test-renderer"</span><span class="token operator">:</span> <span class="token string">"^15.4.1"</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>In package.json we have 4 dependencies that are part of a normal React project setup, <code>react</code>, the 2 babel presets for using <a href="http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/">es2015</a> syntax, and <code>react-test-renderer</code>, which is a react addon for rendering react for testing, similar to how <code>react-dom</code> renders components for the browser.  We then add <code>jest</code> and <code>babel-jest</code>.  <code>jest</code> provides the test runner, assertions API, mocking capabilities, and cli.  <code>babel-jest</code> is a drop-in dependency that lets Jest integrate with Babel.  Neither require any additional configuration in the normal case. Lets say the rest of our project looks like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-txt"><code>├── __tests__\n│   └── simple-component.spec.js\n├── package.json\n└── simple-component.js</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">// simple-component.js</span>\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">SimpleComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token operator">&lt;</span>div<span class="token operator">></span>\n    Hello World\n<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">// __tests__/simple-component.spec.js</span>\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> renderer <span class="token keyword">from</span> <span class="token string">\'react-test-renderer\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>SimpleComponent<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'../simple-component\'</span><span class="token punctuation">;</span>\n\n<span class="token function">it</span><span class="token punctuation">(</span><span class="token string">\'shows Hello World\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> component <span class="token operator">=</span> renderer<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span> <span class="token operator">&lt;</span>SimpleComponent<span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> componentJSON <span class="token operator">=</span> component<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>componentJSON<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">\'Hello World\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Given this project, we only have to run</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>yarn # or npm install\njest</code></pre>\n      </div>\n<p>and jest will automatically find our test file and run the test.</p>\n<img src="/jest-hello-world-73fcca901c1fc3f499dbffd86bea035a.gif" class="full-width" alt="gif of running jest">\n<h3>Writing Tests</h3>\n<p>Jest provides Snapshot Tests, which are a quick way of writing tests to catch changes in the rendered output of a UI component (or any other serializable content).  <a href="http://benmccormick.org/2016/09/19/testing-with-jest-snapshots-first-impressions/">I’ve written about Snapshot testing before</a>, so I won’t go into depth here.  But snapshot tests are significantly faster to write than traditional assertion based tests, and for the write type of code can provide greater or equal benefit.  This is one area where technically Jest may not save you time.  Instead it may take your team to a place where you’re actually willing to write tests for your UI components for the first time.</p>\n<p>There are also a great set of codemods for Jest. <a href="https://github.com/skovhus/jest-codemods">jest-codemods</a> can help you take your existing suite of tests from Mocha, Ava, or tape and translate it over to Jest automatically.  Of course if you were using Jasmine previously, your tests can be migrated without changes. So Jest saves you time by not requiring you to rewrite any tests.</p>\n<h3>Running Tests</h3>\n<p>Jest runs tests fast by default.  While I’ve seen from comments on my last Jest post and elsewhere that some people may have been able to optimize mocha or AVA to be fast enough that switching to Jest was a downgrade, for most people Jest is going to be faster than whatever they may have been using before.  This is true because of performance reasons (tests run in parallel, and mock out timers to avoid unnecessary waiting), but also because of UX decisions.  Jest is able to use git and node’s modules system to detect what files have changed since the last commit, and which tests are affected by that.  Because of that, it is able to optionally run only the tests that might have changed on each run (<code>jest -o</code>).  Since it is usually able to run tests fast as a result (since it only runs a few at a time), Jest also is able to have an awesome watch mode (<code>jest --watch</code>).  In watch mode, tests rerun as files change, and there are options to target specific tests, run all tests, or fix snapshots as you go.</p>\n<img src="/jest-watch-279da95ef1b66a9874d8aa5edae7651e.gif" class="full-width" alt="gif of running jest --watch">\n<h3>Fixing Tests</h3>\n<p>Jest provides 4 main conveniences for fixing tests</p>\n<ol>\n<li>Error messages have clear formatted diffs, making it easy to know the difference between what was received and expected</li>\n<li>Error messages have a clear traceback to the line that failed, either the assertion in the test file, or the exception in the source file</li>\n<li>Even though tests run in parallel, Jest makes sure that any console output from the test is placed in line with the test output, making it easy to debug with quick console messages</li>\n<li>When running Jest multiple times, Jest runs the tests that failed in the previous run prior to other tests, leading to a faster feedback loop even when not using watch mode</li>\n</ol>\n\n  <a class="gatsby-resp-image-link" href="/static/jest-error-7ea5ecbab2a2764639183ffbf4a3ef06-348f6.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 53.198653198653204%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAABYlAAAWJQFJUiTwAAABHElEQVQoz4VSyXaDMAzkB+Ndsrw09BDScmhv+f+ObA4p7zWVhbEEI2kGlsf9/ti2tdbben3v7Wv//N4/9u22rlcmsta6v20x1nrvMxGcU0ohUAwxhIuzznv30hZczCxZrci8Z66Se6XM/iVewQD1tQMCh+mBuUgec4R/wALwWyNK5mIslgGVYcY4cD4C6w7/DUb5TBwimGJTC14tEoF2QH8i3ccgz7MsKIX3lLYIEYF1wcSZKWfpTRC0VnqXVhFCGxl0UooKBnI2RDy7zgOeQyvopftwp200EwIgmlhiitCn1gIfbRp2lEeIGz41Qsgxe5wFQy5RmlLrtFh8aA7YOORWC/CzxAnsMScrBpTBFD+LcsKZZyEIUWRkzuAf7BTYD91EyT8AAAAASUVORK5CYII=&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="gif of running jest --watch" title="" src="/static/jest-error-7ea5ecbab2a2764639183ffbf4a3ef06-d766e.png" srcset="/static/jest-error-7ea5ecbab2a2764639183ffbf4a3ef06-a6b6e.png 143w,\n/static/jest-error-7ea5ecbab2a2764639183ffbf4a3ef06-8e488.png 285w,\n/static/jest-error-7ea5ecbab2a2764639183ffbf4a3ef06-d766e.png 570w,\n/static/jest-error-7ea5ecbab2a2764639183ffbf4a3ef06-13239.png 855w,\n/static/jest-error-7ea5ecbab2a2764639183ffbf4a3ef06-cab6d.png 1140w,\n/static/jest-error-7ea5ecbab2a2764639183ffbf4a3ef06-348f6.png 1188w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    \n<h3>More Resources</h3>\n<ul>\n<li>\n<p>Another speakup at Wednesday’s meetup has a Jest related blog post out this week.  Nate Hunzaker blogged about <a href="https://www.viget.com/articles/acceptance-testing-react-apps-with-jest-and-nightmare">using Jest with Nightmare.js for acceptance tests</a></p>\n</li>\n<li>\n<p>If you live in the Triangle area (thats Raleigh/Durham, North Carolina to the rest of the world) make sure to check out the <a href="http://www.meetup.com/trianglereact/">Triangle React meetup</a>.  The plan as I understand it is to do events once a month, alternating project nights and talks.  I believe <a href="https://twitter.com/ladyleet">Tracy</a> is looking for more speakers too, so hit her up if you’re interested.  This time 4 of us spoke for 15-20 minutes, so it isn’t as much preparation as other events where you’re the only speaker.</p>\n</li>\n</ul>',frontmatter:{title:"Saving Time With Jest: Meetup Summary",keywords:"Jest JavaScript testing meetup talk Triangle React",category:"tools",date:"2016-12-10T05:15:00+00:00",path:"/2016/12/10/saving-time-with-jest",layout:"post",hideFooter:null},fields:{slug:"/2016/12/10/saving-time-with-jest"}}},pathContext:{slug:"/2016/12/10/saving-time-with-jest",relatedPosts:[{path:"/2016/09/19/testing-with-jest-snapshots-first-impressions/",data:{title:"Testing with Jest Snapshots: First Impressions",path:"/2016/09/19/testing-with-jest-snapshots-first-impressions/",description:"First impression of testing UI components using Jest snapshots",date:"2016-09-19T12:41:00+00:00"}},{path:"/2015/09/09/what-can-backbone-developers-learn-from-react",data:{title:"Lessons Backbone Developers Can Learn From React",path:"/2015/09/09/what-can-backbone-developers-learn-from-react",description:"A look at the lessons that Backbone developers can learn from React",date:"2015-09-09T11:19:43+00:00"}},{path:"/2017/01/09/mobx-first-impressions/",data:{title:"MobX: First Impressions",path:"/2017/01/09/mobx-first-impressions/",description:"First impression of managing data with MobX",date:"2017-01-09T13:30:00+00:00"}}]}}}});
//# sourceMappingURL=path---2016-12-10-saving-time-with-jest-4390cf48dfa873cea246.js.map