webpackJsonp([50438285332166],{723:function(n,s){n.exports={data:{markdownRemark:{html:'<p><em>This post continues my look at Jest matchers from <a href="https://benmccormick.org/2017/08/15/jest-matchers-1/">Part 1</a>.</em></p>\n<p>In part 1 I covered the first 4 types of Jest matchers.  In this post I’m going to cover <em>contains</em> matchers, <em>async</em> matchers, <em>snapshot</em> matchers, <em>function</em> matchers and <em>meta</em> matchers, as well as looking at a few extra tips and tricks for using matchers.</p>\n<h3>Contains Matchers</h3>\n<p>Contains matchers are exactly what they sound like.  They’re matchers that check to see if an array contains an item or if a string contains a substring.  </p>\n<h4>toContain and toContainEqual</h4>\n<p><code>toContain</code> and <code>toContainEqual</code> both check to see if a value is contained inside of an array or string.  When used against a string, they are both equivalent and check to see if a passed string is a substring of the expression being tested.  This means they serve as a more limited version of <code>toMatch</code> that will only take a substring and not a regex.  When used against an array or array-like object, <code>toContain</code> looks for matches using strict equality while <code>toContainEqual</code> looks for matches using recursive equality<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>.  In practice that looks like</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">// toContain does exact matches</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">\'a\'</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">:</span> <span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">:</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> length<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">\'a\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">\'abc\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">\'ab\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">\'abc\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token regex">/a/</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span>a<span class="token punctuation">:</span> <span class="token string">\'bc\'</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>b<span class="token punctuation">:</span> <span class="token string">\'cd\'</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token punctuation">{</span>a<span class="token punctuation">:</span> <span class="token string">\'bc\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n\n<span class="token comment">// toContainEqual does recursive matches</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContainEqual</span><span class="token punctuation">(</span><span class="token string">\'a\'</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span>a<span class="token punctuation">:</span> <span class="token string">\'bc\'</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>b<span class="token punctuation">:</span> <span class="token string">\'cd\'</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContainEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span>a<span class="token punctuation">:</span> <span class="token string">\'bc\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n</code></pre>\n      </div>\n<h3>Async Matchers</h3>\n<p>Async matchers handle testing functions that have an asynchronous component.  We’ll look at <code>resolves</code> and <code>rejects</code> for testing Promises.  But first, it is worth noting that any matcher can be used for asynchronous testing if necessary.  You just have to use the callback option that is passed to each test function, like so:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'Delayed Test\'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> <span class="token function-variable function">delayedEval</span> <span class="token operator">=</span> condition <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>condition<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token function">delayedEval</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>Jest detects whether the <code>done</code> callback has been defined for the function, and if it is waits for 5 seconds to see if <code>done</code> is called before failing, and evaluates any\nasynchronous expects that occur before then.  This behavior is inherited from Jasmine, and works ok, but can be a bit difficult to work with.  Jest makes this easier in 2 ways.  First with a set of special matchers for working with promises, and second with a set of meta matchers that can make async tests more reliable.  We’ll get to the meta matchers in a second, but first we’ll look at the promise matchers.</p>\n<h4>.resolves, .rejects</h4>\n<p><code>resolves</code> and <code>rejects</code> are chaining matchers like <code>not</code> that let you write async tests with Promises.  Using <code>resolves</code> to rewrite the previous example looks like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'Delayed Test with promises\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> testPromise <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> rej<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">res</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>testPromise<span class="token punctuation">)</span><span class="token punctuation">.</span>resolves<span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>This waits for the promise to resolve, and then compares the resolved output with <code>toBe</code>.  If a rejection is expected, you can replace <code>resolves</code> with <code>rejects</code> for a similar test. This ends up being much clearer in my opinion than the callback-based async tests, since the assertion is much more direct, and you don’t have to worry about cases where <code>done</code> might not be called where it should be.</p>\n<h3>Meta Matchers</h3>\n<p>Meta matchers pair well with the <code>done</code> async matchers above, if you have to use them.  They just let you test that all of your assertions have actually run. The first one, <code>expect.assertions</code> tests that a specific number of assertions have been run at that point in the test.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'records have a name and an ID\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> record <span class="token operator">=</span> <span class="token function">getRecord</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveProperty</span><span class="token punctuation">(</span><span class="token string">\'id\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n    expect<span class="token punctuation">.</span><span class="token function">assertions</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// true</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveProperty</span><span class="token punctuation">(</span><span class="token string">\'fullName\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    expect<span class="token punctuation">.</span><span class="token function">assertions</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// true</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>This can be useful for async tests to make sure things have run correctly before calling <code>done()</code>, for tests with conditional logic to make sure that the logic played out as expected, and for normal tests as an extra paranoid quality check to make sure that tests aren’t accidentally deleted.</p>\n<p><code>expect.hasAssertions</code> is just a simpler version of this test that checks that you’ve asserted something in the test.  It’s useful for the same things as <code>expect.assertions</code> but will be a little less reliable and also a bit less fragile when tests change.</p>\n<p>Note that neither <code>expect.assertions</code> nor <code>expect.hasAssertions</code> count as assertions themselves and don’t contribute to the assertion count.</p>\n<h3>Snapshot Matchers</h3>\n<p>Snapshot testing is one of Jest’s signature features.  It’s been described in depth in many other places, including <a href="https://benmccormick.org/2016/09/19/testing-with-jest-snapshots-first-impressions/">on this blog</a>.  If you’re unfamiliar with snapshot testing, I recommend checking out one of those deeper posts.  But at a high level, snapshots are an assertion that data has remained the same since the last time a test was run.  Jest has serializers for a bunch of built in data types and React components. But it’s possible to define serializers for different data types to determine how that data should be represented in a snapshot.  </p>\n<p>The core snapshot function, <code>toMatchSnapshot()</code> is fairly simple to explain. When run the first time, <code>toMatchSnapshot</code> takes the string representation of the data passed to it (generated by whatever serializer is used for that data type) and writes it to a snapshot file.  After the snapshot has been written once, future runs of <code>toMatchSnapshot</code> behave differently.  If Jest is run normally, <code>toMatchSnapshot</code> compares the serialized data to the value in the snapshot file, and fails the test if they are different.  If Jest is run with the <code>-u</code> option, it will instead update the snapshot file with the current serialized value.  This behavior lets us write tests that don’t have a pre-defined “correct value”, instead we can use our test cases to see what has changed, and choose to accept it or not.</p>\n<h4>toThrowErrorMatchingSnapshot</h4>\n<p>In addition to <code>toMatchSnapshot</code>, Jest offers a second snapshot matcher, <code>toThrowErrorMatchingSnapshot</code>, which catches errors and verifies that they match a snapshot, similar to the <code>toThrow</code> matcher I described in part 1.</p>\n<h3>Function Matchers</h3>\n<p>One of Jest’s nicer features is its function mocking system.  A full discussion of function mocking is outside the scope of this post, but suffice it to say that you can create “tracked” functions in Jest.  The following matchers work with those tracked functions to verify behavior, using an example of a function that takes another function and calls it with the given arguments.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">executeFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<h4>toHaveBeenCalled, toHaveBeenCalledTimes</h4>\n<p>The most basic matcher when dealing with functions is <code>toHaveBeenCalled</code>.  It works more or less how it sounds, and determines whether a function has executed during the test.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'does executeFn run the function passed to it?\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> fn <span class="token operator">=</span> jest<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">executeFn</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>Jest also has a related matcher, <code>toHaveBeenCalledTimes</code> which lets you specify how many times a function has been called.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'does executeFn run the function passed to it only once?\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> fn <span class="token operator">=</span> jest<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">executeFn</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<h4>toHaveBeenCalledWith, toHaveBeenLastCalledWith</h4>\n<p>Sometimes you don’t just want to know if a function was called, but want to make sure that it was called with the right arguments.  Jest has you covered.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'does executeFn run the function with the passed arguments\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> fn <span class="token operator">=</span> jest<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">executeFn</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p><code>toHaveBeenCalledWith</code> lets you check that the function was called with the right arguments.  You have to be careful though, if the function was called multiple times, you’re only verifying that it was called with those arguments at some point.  If you want to get more specific, you can use <code>toHaveBeenLastCalledWith</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'does executeFn run the function with the passed arguments\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> fn <span class="token operator">=</span> jest<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">executeFn</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">executeFn</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toHaveBeenLastCalledWith</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<h3>Bonus Content</h3>\n<p>That’s all for matcher methods, but there are a few other helpful things to know about matchers that I didn’t get to work into any of the matcher categories.  So here you go:</p>\n<h3>Extension Methods</h3>\n<p>Jest’s expect object has 2 methods for extending what it can do: <code>expect.addSnapshotSerializer</code> and <code>expect.extend</code>.  <code>expect.addSnapshotSerializer</code> lets you add a new snapshot serializer as a one off for a specific test file. A serializer is simply an object that defines <code>test</code> and <code>print</code> methods.  You can learn more <a href="http://facebook.github.io/jest/docs/en/configuration.html#snapshotserializers-array-string">in the docs</a>.</p>\n<p><code>expect.extend</code> allows you to define custom matchers!  It takes an object with methods that define the new matchers to add.  Each method should be a function that takes the expected value as a first argument, and then expected arguments to the matcher as the rest of the arguments.  For instance, here is a matcher to see whether a string is a palindrome.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>expect<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token function">toBeAPalindrome</span><span class="token punctuation">(</span>received<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> received <span class="token operator">!==</span> <span class="token string">\'string\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token string">\'expected ${received} to be a string, but it was a ${typeof received}\'</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">const</span> reversed <span class="token operator">=</span> received<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">\'\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">\'\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> pass <span class="token operator">=</span> received <span class="token operator">===</span> reversed<span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>pass<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        message<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n          <span class="token template-string"><span class="token string">`expected </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>received<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> not to be a palindrome`</span></span>\n        <span class="token punctuation">)</span><span class="token punctuation">,</span>\n        pass<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        message<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token template-string"><span class="token string">`expected </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>received<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> to be a palindrome but it was </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>reversed<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> when reversed`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        pass<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'Anna is a palindrome\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">\'anna\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeAPalindrome</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">\'ann\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeAPalindrome</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h3>Matcher Wildcards</h3>\n<p>Several of the matchers I’ve described in these posts are focused on equality of a particular part of a structure. These include the template matchers, contains matchers, and the <code>toEqual</code> matcher.  In these cases you’re trying to say that some part of an object is equal to something else.  But sometimes you want to be a bit open-minded about part of that.  Maybe you want to ensure that an object has an <code>email</code> property that is a string with the character <code>@</code> in it , or that it has a name property defined, but that could be anything as long as its defined.  Jest has wildcards that help you do this.</p>\n<ul>\n<li><code>expect.any(&#x3C;constructor>)</code> lets you match any object of a specific type</li>\n<li><code>expect.anything()</code> matches anything except null and undefined</li>\n<li><code>expect.stringMatching(regexp)</code> matches any string that matches the regex you pass it</li>\n<li><code>expect.stringContaining(string)</code> matches strings against a substring</li>\n<li><code>expect.arrayContaining(array)</code> matches arrays that have a specific set of values in them</li>\n<li><code>expect.objectContaining(object)</code> matches objects that have a specific set of key/value pairs</li>\n</ul>\n<p>Using wildcards looks like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'wildcard example\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n\n  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">\'test\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span>expect<span class="token punctuation">.</span><span class="token function">anything</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n\n  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">{</span>foo<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'bar\'</span><span class="token punctuation">,</span> <span class="token string">\'baz\'</span><span class="token punctuation">,</span> <span class="token string">\'test\'</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatchObject</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    foo<span class="token punctuation">:</span> expect<span class="token punctuation">.</span><span class="token function">arrayContaining</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'bar\'</span><span class="token punctuation">,</span> <span class="token string">\'test\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h3>expect outside of Jest</h3>\n<p>As I was finishing up this post, Jest 21 was released, along with the exciting news that <code>jest-matchers</code> has been renamed to <code>expect</code> and is now available as a standalone module that can be used in other test frameworks, including in the browser.  So if the matchers in these blog posts have looked appealing to you, but you have an existing test framework that you’re tied to, feel free to check it out <a href="https://www.npmjs.com/package/expect">on npm</a>.</p>\n<h2>More Resources</h2>\n<ul>\n<li>The latest info on all of these matcher APIs is always going to be in their very readable <a href="http://facebook.github.io/jest/docs/en/expect.html">docs</a>.  Check them out for more examples and good links to a deeper dive on some of the other topics that these posts have touched on, like snapshot testing and mock functions.</li>\n</ul>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>Similar to toBe and toEqual from part 1, strict equality here means it’s the same reference and is equivalent to <code>x === y</code>, while recursive equality means the object’s are structured the same and any object with the same structure and values will be considered equal.</p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',
frontmatter:{title:"Taking Advantage of Jest Matchers (Part 2)",keywords:"jest matchers",category:"javascript",date:"2017-09-05T03:00:00+00:00",path:"/2017/09/04/jest-matchers-2/",layout:"post",hideFooter:null},fields:{slug:"/2017/09/04/jest-matchers-2/"}}},pathContext:{slug:"/2017/09/04/jest-matchers-2/",relatedPosts:[{path:"/2017/08/15/jest-matchers-1/",data:{title:"Taking Advantage of Jest Matchers (Part 1)",path:"/2017/08/15/jest-matchers-1/",description:"Looking at the different API options Jest provides for assertions",date:"2017-08-15T04:00:00+00:00"}},{path:"/2017/07/19/ten-things-javascript/",data:{title:"Ten Things A Serious JavaScript Developer Should Learn",path:"/2017/07/19/ten-things-javascript/",description:"Some of the important things to pick up in the JS world",date:"2017-07-19T04:00:00+00:00"}},{path:"/2017/02/26/running-jest-tests-before-each-git-commit/",data:{title:"Running Jest Tests Before Each Git Commit",path:"/2017/02/26/running-jest-tests-before-each-git-commit/",description:"A simple setup to run your Jest tests before every commit",date:"2017-02-26T23:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2017-09-04-jest-matchers-2-8bb653c5605aa708572e.js.map