webpackJsonp([0x91126fc489dc880],{"./node_modules/json-loader/index.js!./.cache/json/2017-08-14-jest-matchers.json":function(n,s){n.exports={data:{markdownRemark:{html:'<p>Back in May, my favorite testing library, Jest, released it’s 20th version and <a href="https://facebook.github.io/jest/blog/2017/05/06/jest-20-delightful-testing-multi-project-runner.html">rebranded itself</a> as the library for “delightful JavaScript testing”.  Delightful and testing are two words that usually don’t go together in the software development lexicon.  But that claim is the result of 2 years of hard work from the Jest team trying to get the usability details of testing exactly right.  One of the announcements for version 20 that exemplifies this commitment to detail was the addition of several new assertion APIs to an already large list. This post dives into the many matcher options in Jest, why they’re there, and how to make good use of them.</p>\n<p>Assertion APIs, or matchers, are the methods that the library makes available for defining the expected value of a variable or expression.  The most basic assertion in Jest is the <code>.toBe</code> matcher, which checks to see if one value is the same as the other.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'Math still works\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<h3>Why so many matchers?</h3>\n<p>When writing tests, the only assertion api you really <strong>need</strong> is a method that takes a boolean and determines whether it is true or false.  Assuming you can figure out inspecting functions and async code, everything else can be expressed with an assert method like that:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'Math still works\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n  <span class="token function">assert</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>So why does Jest need 30+ matcher methods?  Because they allow you to be specific in your intent, and also let Jest provide helpful error messages.  For instance, when you write a test like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> getRecord <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">\'fullName\'</span><span class="token punctuation">:</span> <span class="token string">\'Ben McCormick\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'records have a name and an ID\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> record <span class="token operator">=</span> <span class="token function">getRecord</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveProperty</span><span class="token punctuation">(</span><span class="token string">\'id\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveProperty</span><span class="token punctuation">(</span><span class="token string">\'name\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>it is obvious what the test is trying to check, and you can get detailed output like this:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="undefined"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; z-index: -1; display: block; "\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 58.94736842105264%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsSAAALEgHS3X78AAABRElEQVQoz62TyVKDQBiE8/4v4cWjN48+gpaJ0WyQFWIihLAOBGaIbf8kpWVOwfLQzLB99HQPne36Df5mhOBjzHGILJzCKOfP6kR3N4jvbxG6PeycLny3j/i9DxNZqNM56tjG58G9Wp06nUHvx6j8ATRlwglK7xXVbthADYF1vroeKIcqW0BTxh81rsp0wWvLZixTm7LaAVUwQbLuI108Q/ljpE4P2qNDjx8I7ZOSGY5qeR2w4LJ22y4KviSlqOg0isM2+X0D/1MN0KgVXc6QU4dkDkV3OV0W8RxRNMWGkXh7Cz6XHskK+EzBzA/MWbI+Fs4PUHIRoNzQ2cWc7ZZSjpTGuchcSGC/gOXZlbjTbFhz22hmeWp+2WwZ02bbrFcvkL8lCSxUwQjZ4AG588RzG+nebp+hbT3CJTQ75+ZtBnTl/LmUL6wpjW4P0dPsAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Error output from Jest"\n        title=""\n        src="/static/165f7e639e1a843277420540e4ec6cf6-d766e.png"\n        srcset="/static/165f7e639e1a843277420540e4ec6cf6-a6b6e.png 143w,\n/static/165f7e639e1a843277420540e4ec6cf6-8e488.png 285w,\n/static/165f7e639e1a843277420540e4ec6cf6-d766e.png 570w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>You get the structure of the object as it is, the name of the property that is missing, the line number and file name where you can find the assertion, all in a concise, colorful and nicely formatted test failure message.</p>\n<p>You can categorize Jest’s matchers into 8 different categories: equality matchers, template matchers, numeric comparison matchers, contains matchers, async matchers, snapshot matchers, function matchers, and meta matchers.  I’m going to go through each group and explain why they’re useful.</p>\n<h3>Equality Matchers</h3>\n<p>Equality matchers are the workhorse matchers of any test libraries.  This is where we see whether an expression evaluates to the value we expect. This being JavaScript however, equality takes a few different forms, and Jest covers each of them, along with some syntactic shortcuts.</p>\n<h4>toBe and toEqual</h4>\n<p><code>toBe</code>, as mentioned previously, is the simplest Jest matcher.  It is equivalent to a simple <code>===</code> statement, and verifies that the expression being tested is the same reference as the expression that it is matched against.  Since it is reference based, toBe is a good fit for numbers, strings and booleans, or for checking that an object is the exact same reference as another object.  But it’s not good for comparing 2 separate objects.  It behaves like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">\'on\'</span> <span class="token operator">+</span> <span class="token string">\'e\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">\'one\'</span><span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// true</span>\n<span class="token keyword">let</span> oneObj <span class="token operator">=</span> <span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// false!</span>\n</code></pre>\n      </div>\n<p>For comparing object and array equality, it usually is better to use <code>toEqual</code>, which does a deep property comparison:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> oneObj <span class="token operator">=</span> <span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// true</span>\n</code></pre>\n      </div>\n<p><code>toEqual</code> doesn’t line up to any built in JavaScript idea of equality exactly, it just does a recursive equal check.  There also is no Jest equivalent to <code>==</code> with its odd type casting behavior, and that is ok by me.</p>\n<h4>toBeDefined, toBeNull and toBeUndefined</h4>\n<p><code>toBeDefined</code>, <code>toBeNull</code>, and <code>toBeUndefined</code> are all shortcut functions.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment" spellcheck="true">// same as expect(x).toBe(null)</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token comment" spellcheck="true">// same as expect(typeof x).toBe(\'undefined\')</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeUndefined</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token comment" spellcheck="true">// same as expect(typeof x).not.toBe(\'undefined\')</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeDefined</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>The one thing worth pointing out here is the use of <code>.not.</code> in my example comment.\n<code>.not</code> is a utility property on expect that you can chain to reverse the output of\nany matcher.</p>\n<h4>toBeFalsy and toBeTruthy</h4>\n<p>These matchers essentially are shortcuts that act like <code>if</code> and <code>else</code> statements.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment" spellcheck="true">// same as expect(!!x).toBe(true)</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeTruthy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token comment" spellcheck="true">// same as expect(!!x).toBe(false)</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeFalsy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>If you aren’t aware of the JavaScript concepts of truthiness and falsiness, the terms refer to whether a value is evaluated as true or false when evaluated in a boolean context.</p>\n<h3>Template matchers</h3>\n<p>Template matchers are matchers that don’t check for a specific value, but instead look to see if the expression is consistent with a certain pattern or shape.</p>\n<h4>toMatch</h4>\n<p><code>toMatch</code> is a template matcher for strings.  It accepts a regular expression that\nyou can use to describe the acceptable list of strings.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> id1 <span class="token operator">=</span> <span class="token string">\'155-60-7723\'</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> id2 <span class="token operator">=</span> <span class="token string">\'15-60-7723\'</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> socialSecurityNumberFormat <span class="token operator">=</span> <span class="token regex">/\\d{3}-\\d{2}-\\d{4}/</span><span class="token punctuation">;</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>id1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatch</span><span class="token punctuation">(</span>socialSecurityNumberFormat<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>id2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatch</span><span class="token punctuation">(</span>socialSecurityNumberFormat<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">// false</span>\n</code></pre>\n      </div>\n<h4>toMatchObject and toHaveProperty</h4>\n<p><code>toMatchObject</code> and <code>toHaveProperty</code> are template matchers for objects. <code>toMatchObject</code> works similarly to <code>toEqual</code> and does a deep comparison on objects and arrays.  But unlike <code>toEqual</code>, <code>toMatchObject</code> doesn’t require an exact match, it just verifies that the expression has the same properties as the template object.  So extra properties on the expression we’re evaluating don’t matter.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> oneObj <span class="token operator">=</span> <span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> uno<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// false</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// true</span>\n</code></pre>\n      </div>\n<p><code>toHaveProperty</code> performs a similar function but doesn’t enforce the whole structure of an object.  Instead it just tests whether a single property is defined.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> oneObj <span class="token operator">=</span> <span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveProperty</span><span class="token punctuation">(</span><span class="token string">\'one\'</span><span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// true</span>\n</code></pre>\n      </div>\n<p><code>toHaveProperty</code> can take a second “value” argument, at which point it acts as a more limited version of <code>toMatch</code>.</p>\n<p>.toHaveLength(number)\n.toBeInstanceOf(Class)\n.toThrow(error)</p>\n<h3>Numeric Comparison Matchers</h3>\n<p>.toBeCloseTo(number, numDigits)\n.toBeGreaterThan(number)\n.toBeGreaterThanOrEqual(number)\n.toBeLessThan(number)\n.toBeLessThanOrEqual(number)</p>\n<h3>Contains Matchers</h3>\n<p>expect.arrayContaining(array)\nexpect.objectContaining(object)\n.toContain(item)\n.toContainEqual(item)</p>\n<h3>Async Matchers</h3>\n<p>.resolves\n.rejects</p>\n<h3>Snapshot Matchers</h3>\n<p>.toMatchSnapshot(optionalString)\n.toThrowErrorMatchingSnapshot()</p>\n<h3>Function Matchers</h3>\n<p>.toHaveBeenCalled()\n.toHaveBeenCalledTimes(number)\n.toHaveBeenCalledWith(arg1, arg2, …)\n.toHaveBeenLastCalledWith(arg1, arg2, …)</p>\n<h3>Meta Matchers</h3>\n<p>expect.assertions(number)\nexpect.hasAssertions()</p>\n<h3>Customization Methods</h3>\n<p>expect.addSnapshotSerializer(serializer)\nexpect.extend(matchers)</p>\n<h3>wildcards</h3>\n<p>any\nanything\nstringMatching(regexp)\nexpect.stringContaining(string)</p>',frontmatter:{title:"Taking Advantage of Jest Matchers",keywords:"jest matchers",category:"javascript",date:"2017-08-14 01:55:00+00:00",path:"/2017/08/14/jest-matchers/",layout:"post",hideFooter:null},fields:{slug:"/2017/08/14/jest-matchers/"}}},pathContext:{slug:"/2017/08/14/jest-matchers/",relatedPosts:[{title:"Ten Things A Serious JavaScript Developer Should Learn",path:"/2017/07/19/ten-things-javascript/",description:"Some of the important things to pick up in the JS world"},{title:"Running Jest Tests Before Each Git Commit",path:"/2017/02/26/running-jest-tests-before-each-git-commit/",description:"A simple setup to run your Jest tests before every commit"},{title:"Testing with Jest Snapshots: First Impressions",path:"/2016/09/19/testing-with-jest-snapshots-first-impressions/",description:"First impression of testing UI components using Jest snapshots"}]}}}});
//# sourceMappingURL=path---2017-08-14-jest-matchers-516bb62f127b2a517eb3.js.map