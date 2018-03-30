webpackJsonp([0x9d4e745468bf],{675:function(e,n){e.exports={data:{markdownRemark:{html:'<p>Last week was the time for my team’s quarterly “dependency update” where we go through all the third party libraries we’re using and keep up on any updates or maintenance that need to happen.  That presented the opportunity for me to do a bit more research into an alternative for one of our libraries, <a href="http://underscorejs.org/">Underscore</a>.  Underscore is a JavaScript utility library that provides helper functions for common idioms with a focus on functional programming.  It’s a dependency for <a href="http://backbonejs.org/">Backbone</a>, the MVC library that our web app is based on, and was originally created by Jeremy Ashkenas, who also wrote Backbone.  I love the functional style that Underscore subscribes to, and while the much improved browser support for ES5 functions like map, reduce and filter makes it less necessary than it used to be, Underscore still provides plenty of benefits.</p>\n<p>For a while now though, I’ve been hearing about <a href="https://lodash.com/">Lo-Dash</a>.  Lo-Dash began its life as a fork of Underscore, and still tracks Underscore’s API enough to allow it to serve as a drop-in replacement.  But under the hood it’s been completely rewritten, and it’s also added a number of features and functions that Underscore does not provide.  About a year ago I saw a spurt of articles recommending that Underscore users switch to Lo-Dash, and it came up again recently when <a href="https://github.com/jashkenas/underscore/issues/1805">Underscore’s decision to not follow semantic versioning</a> caused problems for some NodeJS applications. The <a href="http://stackoverflow.com/questions/13789618/differences-between-lodash-and-underscore">definitive Stack Overflow question on the topic</a> seems to come down pretty solidly in favor of Lo-Dash.  And the Lo-Dash <a href="https://lodash.com/docs">documentation</a> touted a prettier chaining syntax as a feature, something that caught my eye since I’ve always disliked Underscore’s chaining mechanism.  As I did my research though I noticed that most of the comparisons are at least a year old.  Both libraries have continued to evolve and improve since then, so I thought there’d be value in adding another writeup comparing the current iterations.</p>\n<h3>Why Do We Even Care?</h3>\n<p>Before I get into the weeds of comparisons, let me address why you’d want to use either of these libraries at all.  Underscore and Lo-Dash provide cross-browser compatible functional programming utility methods.  This post will be long enough without me trying to explain all the benefits of functional programming, but suffice it to say that if you’re manipulating and transforming data in any reasonably complex way, an Underscore style library will help you write performant readable code easier than you could with what Javascript natively provides.  We’ll touch more on performance later, but both Underscore and Lo-Dash perform better than native browser functional methods, and for complex data manipulations they’re significantly more readable than a series of for loops.  They let you write code that’s fast and reads like a description of what you intend to have happen.</p>\n<h3>How are Underscore and Lo-Dash similar?</h3>\n<p>As stated above, Underscore and Lo-Dash provide similar functionality.  Lo-Dash’s API is a superset of Underscore’s.  It provides everything that Underscore does, along with a few additional helper functions.  Lo-Dash can generally serve as a drop-in replacement for Underscore with no changes; it works just fine with Backbone.  So to some extent this question could be answered simply with a link to Underscore’s <a href="http://underscorejs.org/">documentation</a>.</p>\n<h3>How are Underscore and Lo-Dash different?</h3>\n<p>This question could really be rephrased as “What has Lo-Dash added?“.  Lo-Dash answers that with a pretty extensive list on its site, but the claims really boils down to a few things:</p>\n<ul>\n<li>Usability Improvements</li>\n<li>Extra Functionality</li>\n<li>Performance Gains</li>\n</ul>\n<p>Let’s examine those one by one.</p>\n<h4>Usability</h4>\n<p>Lo-Dash makes a number of additions to Underscore that don’t add new capabilities, but increase usability for developers.  These include</p>\n<ol>\n<li><del>Built in Support for AMD Module Loaders</del></li>\n<li>Short hand syntaxes for chaining</li>\n<li>Custom Builds to only use what you need</li>\n<li>Semantic versioning and 100% code coverage</li>\n</ol>\n<p>Each of these are relatively small things that add up to time savings for developers.  <del>Supporting AMD natively saves a configuration step, allowing you to use Lo-Dash on requirejs-based projects without having to specify it as a shim.</del> <em>(<strong>Update</strong>: As of 1.6, Underscore also has native AMD support.)</em>  Lo-Dash also improves the syntax for chaining functions.  Underscore’s chaining syntax has always felt a bit clunky to me.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getLongNames</span><span class="token punctuation">(</span>users<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> _<span class="token punctuation">.</span><span class="token function">chain</span><span class="token punctuation">(</span>users<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pluck</span><span class="token punctuation">(</span><span class="token string">\'name\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">{</span>\n      <span class="token keyword">return</span>  name<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">10</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Lo-Dash cleans that up a bit by not requiring the chain functionality and instead making the Lo-Dash object a function, jQuery style:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getLongNames</span><span class="token punctuation">(</span>users<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">_</span><span class="token punctuation">(</span>users<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pluck</span><span class="token punctuation">(</span><span class="token string">\'name\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">{</span>\n      <span class="token keyword">return</span>  name<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">10</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>It’s a small nicety that clears away some syntactical noise.</p>\n<p>Lo-Dash also provides custom builds.  By default Lo-Dash is significantly larger than Underscore.  The full library weighs in at 33KB minified, double Underscore’s 16KB size<sup id="fnref:1"><a href="#fn:1">1</a></sup>.  But you can negate that a bit by only pulling in the things you need.  The “modern version” that drops compatibility for IE8 and other older browsers weighs in at 29KB minified (but not gzipped).  If you want to drop the Lo-Dash extra functionality entirely, and only use it for performance and usability reasons, you can build an underscore compatible version and use only 20kb.  You can also go even further, and for instance use only the functionality required by Backbone.  That will get you down to 13kb, smaller than the original Underscore library.</p>\n<p>Finally, Lo-Dash provides semantic versioning and 100% code coverage.  To me these mostly serve as signals that this is a project interested in being disciplined about its engineering practices, which is a good sign.  But the semantic versioning issue seems to be particularly important for those using a utility library in Node, as Underscore’s versioning practices have <a href="https://github.com/jashkenas/underscore/issues/1805">caused problems</a> for some.</p>\n<h4>Extra Functionality</h4>\n<p>Lo-Dash includes several functions not included in Underscore.  Some of these are simply syntactical shortcuts for common idioms.  <code>_.forOwn</code> allows you to iterate over an objects own properties, allowing you to skip the common practice of including a guard function in a loop to avoid touching items on an objects prototype chain.  Similarly <code>_.create</code> is a simplified syntax for <code>Object.create</code> and <code>_.parseInt</code> is a safe version of the built-in parseInt function <a href="http://stackoverflow.com/questions/14528397/strange-behavior-for-map-parseint">which can have surprising behavior</a>.  Lo-Dash also provides helper function for deep cloning, merging and extensions, operations that are not available in most libraries.  Specifically <code>_.cloneDeep</code> and <code>_.merge</code> serve as “deep” versions of Underscore’s <code>_.clone</code> and <code>_.extend</code>, and <code>_.where</code> accepts an argument to support deep comparisons.  If you are routinely doing comparisons and copying of nested objects for equality, these functions will definitely have their place for you.</p>\n<h4>Performance</h4>\n<p>Lo-Dash has an impressive set of <a href="https://lodash.com/benchmarks">benchmarks</a> that you can run on its site which highlight its speed advantage over Underscore on a variety of operations. This is great, but benchmarking against specific tests like this can lead to local optimizations that might not lead to real-world speed.  I also don’t have much interest in many of the functions tested; I use them rarely and can handle a speed dip if necessary.  I was mostly interested in how Underscore and Lo-Dash compared on their core functional methods.  So I set up some jsPerf tests that you can run yourself for <a href="http://jsperf.com/lodash-underscore-and-native-each">_.each</a>, <a href="http://jsperf.com/lodash-underscore-and-native-contains">_.contains</a>, <a href="http://jsperf.com/lodash-underscore-and-native-map">_.map</a>, <a href="http://jsperf.com/lodash-underscore-and-native-reduce">_.reduce</a>, and <a href="http://jsperf.com/lodash-underscore-and-native-filter">_.filter</a>. Here’s a simplified version of the results, comparing Underscore and Lo-Dash performance in terms of their improvement over the speed of the browsers’ native functions.  Results in the chart are averaged across browsers.</p>\n<blockquote>\n<p><strong>Edit: There used to be a chart here. Unfortunately the 3rd party service I used to embed the chart lost my data.  A good reminder to own your own content.  At this point the exact performance data from 2014 would no longer be representative of the current state of things anyway.  The tests above will provide a more accurate look at current performance.</strong></p>\n</blockquote>\n<p>These tests are not incredibly scientific, and the chart especially is oversimplified, but they’re meant to represent real world usage in an easily digestible format.  Draw conclusions from them at your own risk.  That said, there were a few interesting results that I think are reasonably reliable.</p>\n<ol>\n<li>\n<p><strong>Both Underscore and Lo-Dash blow away the native functional methods.</strong></p>\n<p>With its latest versions Underscore has joined Lo-Dash in using loop based iteration to handle each, map, reduce and filter instead of proxying to the native code.  Counterintuitively this ends up being much faster.  Consistently across the board, Underscore and Lo-Dash beat native functions in terms of speed.  A little research indicates that this is because native functions optimize for sparse arrays and have more weird corner cases that they handle.  In any case, the performance difference is pretty startling across the board.</p>\n<p>You can still manage to beat the libraries’ performance by using simple for loops, which is what underscore and lo-dash use after they handle edge cases of their own.  The tradeoff at that point becomes about readability and reliability vs speed, and I’d suggest that using loops is an optimization step in most cases where you’d want to use a utility library, rather than a good starting point.</p>\n</li>\n<li>\n<p><strong>Lo-Dash is definitely not slower than Underscore</strong></p>\n<p>It’s hard to know how significant some of the results here are, as there are a mix of differences which change across browsers.  Again, it’s not a very scientific test.  But Lo-Dash is never significantly slower than Underscore on pretty much any test (the worst seems to be a ~7% difference on Firefox for <code>_.each()</code>).  And for several tests it came across as significantly faster (8x speed difference for contains on Firefox!).  I expect many of these differences would prove to be insignificant or inaccurate on a more rigorous test, but it would be very surprising if the net result was that Underscore was faster for common operations.</p>\n</li>\n</ol>\n<h3>Summary: What to use?</h3>\n<p>So to wrap it all up, if you need a utility library which one should you actually use?  I’ll stop just short of unreserved recommendations for Lo-Dash that I saw when I researched this.  I think Lo-Dash is the clear winner for NodeJS users.  Its biggest weakness (file size) doesn’t matter on the server, and its use of semantic versioning matters a lot more for developers depending on npm for dependency management.  So take the performance gains and extra capabilities and go with it.  However, there are more tradeoffs on the client.  Both Lo-Dash and Underscore are small, but optimizing page-weight still matters for many sites, especially on mobile devices.  Underscore has learned from Lo-Dash and improved its performance enough that the differences are often insignificant. And while Lo-Dash’s extras are convenient, none of them seem essential unless you are comparing and cloning a lot of deeply nested objects.  So I’d advise web developers to weigh the tradeoffs and pick the library that best meets their priorities.</p>\n<p><em>(<strong>Update:</strong> There’s been plenty of discussion on this post today.  Check out the comments below for a lot of helpful insight from <a href="https://twitter.com/jdalton">John-David Dalton</a>, Lo-Dash’s creator and an Underscore contributor.  You can also check out the discussion on <a href="http://www.reddit.com/r/javascript/comments/2m2hs6/underscore_vs_lodash/">Reddit</a>.)</em></p>\n<h3>More Resources</h3>\n<ul>\n<li>\n<p><a href="http://kitcambridge.be/blog/say-hello-to-lo-dash/">Say Hello to Lo-Dash</a>, a blog post written by Lo-Dash’s core team after they released 1.0 is a great summary of the advantages of Lo-Dash.  It’s a year and a half old now, but mostly holds up pretty well, with the only real difference being that Underscore has pulled in several of the features they mention here since then.</p>\n</li>\n<li>\n<p>I mentioned this in the post, but Lo-Dash provides a much more thorough benchmarking page than what I provided <a href="https://lodash.com/benchmarks">on their site</a>.  They also provide a helpful <a href="https://github.com/lodash/lodash/wiki/Roadmap">roadmap</a> to let users know about plans for Lo-Dash 3.0.</p>\n</li>\n</ul>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:1">\n        <p>\n        These numbers are minified but not gzipped, based on the file size when I download the minified versions from the project site.\n        <a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n</ol>\n</div>',frontmatter:{title:"Underscore vs Lo-Dash",keywords:"underscore lodash lo-dash JavaScript performance",category:"frameworks",date:"2014-11-12T13:00:00+00:00",path:"/2014/11/12/underscore-vs-lodash",layout:"post",hideFooter:null},fields:{slug:"/2014/11/12/underscore-vs-lodash"}}},pathContext:{slug:"/2014/11/12/underscore-vs-lodash",relatedPosts:[{path:"/marionette-explained",data:{title:"Marionette: Explained",path:"/marionette-explained",description:"A series of posts explaining Marionette.js",date:null}},{path:"/2015/09/09/what-can-backbone-developers-learn-from-react",data:{title:"Lessons Backbone Developers Can Learn From React",path:"/2015/09/09/what-can-backbone-developers-learn-from-react",description:"A look at the lessons that Backbone developers can learn from React",date:"2015-09-09T11:19:43+00:00"}},{path:"/2017/01/09/mobx-first-impressions/",data:{title:"MobX: First Impressions",path:"/2017/01/09/mobx-first-impressions/",description:"First impression of managing data with MobX",date:"2017-01-09T13:30:00+00:00"}}]}}}});
//# sourceMappingURL=path---2014-11-12-underscore-vs-lodash-272d4409467da70e61e8.js.map