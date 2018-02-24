webpackJsonp([0xdc8e87cc1289],{717:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Back in May, my favorite testing library, Jest, released it’s 20th version and <a href="https://facebook.github.io/jest/blog/2017/05/06/jest-20-delightful-testing-multi-project-runner.html">rebranded itself</a> as the library for “Delightful JavaScript Testing”.  Delightful and testing are two words that usually don’t go together in the software development lexicon.  But that claim is the result of 2 years of hard work from the Jest team trying to get the usability details of testing exactly right.  One of the version 20 announcements that exemplified this commitment to detail was the addition of several new assertion APIs to an already large list. This post dives into the many matcher options in Jest, why they’re there, and how to make good use of them.</p>\n<p>Assertion APIs, or matchers, are the methods that the library makes available for defining the expected value of a variable or expression.  The most basic assertion in Jest is the <code>.toBe</code> matcher, which checks to see if one value is the same as the other.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'Math still works\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<h3>Why so many matchers?</h3>\n<p>When writing tests, the only assertion api you really <strong>need</strong> is a method that takes a boolean and determines whether it is true or false.  Assuming you can figure out inspecting functions and async code, everything else can be expressed with an assert method like that:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'Math still works\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token function">assert</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>So why does Jest need 30+ matcher methods?  Because they allow you to be specific in your intent, and also let Jest provide helpful error messages.  For instance, when you write a test like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">getRecord</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">\'fullName\'</span><span class="token punctuation">:</span> <span class="token string">\'Ben McCormick\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'records have a name and an ID\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> record <span class="token operator">=</span> <span class="token function">getRecord</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveProperty</span><span class="token punctuation">(</span><span class="token string">\'id\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveProperty</span><span class="token punctuation">(</span><span class="token string">\'name\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>it is obvious what the test is trying to check, and you can get detailed output like this:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/error_output-165f7e639e1a843277420540e4ec6cf6-d766e.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 58.94736842105264%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsSAAALEgHS3X78AAABfklEQVQoz42SfXKCMBDFuf9ReoNO79Bq62hVVARtpSoIhJBA9PUlOlO048cfv9klk919L4sXRz1s4iHirwGyrQ9TLdCUERoZuViLORoRPownXp6QLbvYhG9Ilu8uN8kQJh3BZD6gljhUIYkewtOrd1REfXWhf/qovpnHPeh1Hzr5pMoZ9jJ8GE+VIZS1lYxR5zMoa5OTGlpXYgJVjHFQCzfdFtxVKDYjZIse8oh2V31kUReKsf4ZYL+bkCnMzsdeBGdNrzX3qt0YyeoN1XYImfqQ2zGK9RCK+aGcsxFhPLQaXdIe4NmkKQPsW1NgLarjpYYYeSo4FeFCVVut13C6pC2LyqYQVFamE5fvmK+2I6z5vpY08SF4LosAFanJP4WGlmpH4P49LY4XG55VXJJFc6jmt4unvGY09kkuG0qqKTi5zibuV6m5AMWGmo3MqejeZs8sR0EH6XoEvRkg/3iGXLwiT6fIuZx2wS3OFM5nHehi5t4tXvZoNfi7eKXoFr8I+45e19wrEAAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Error output from Jest"\n        title=""\n        src="/static/error_output-165f7e639e1a843277420540e4ec6cf6-d766e.png"\n        srcset="/static/error_output-165f7e639e1a843277420540e4ec6cf6-a6b6e.png 143w,\n/static/error_output-165f7e639e1a843277420540e4ec6cf6-8e488.png 285w,\n/static/error_output-165f7e639e1a843277420540e4ec6cf6-d766e.png 570w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>You get the structure of the object as it is, the name of the property that is missing, the line number and file name where you can find the assertion, all in a concise, colorful and nicely formatted test failure message.</p>\n<p>You can categorize Jest’s matchers into 8 different categories: equality matchers, template matchers, numeric comparison matchers, contains matchers, async matchers, snapshot matchers, function matchers, and meta matchers.  I’ll go through the first 3 in this post, and cover the rest in a followup.</p>\n<h3>Equality Matchers</h3>\n<p>Equality matchers are the workhorse matchers of any test libraries.  This is where we see whether an expression evaluates to the value we expect. This being JavaScript however, equality takes a few different forms, and Jest covers each of them, along with some syntactic shortcuts.</p>\n<h4>toBe and toEqual</h4>\n<p><code>toBe</code>, as mentioned previously, is the simplest Jest matcher.  It is equivalent to a simple <code>===</code> statement, and verifies that the expression being tested is the same reference as the expression that it is matched against.  Since it is reference based, toBe is a good fit for numbers, strings and booleans, or for checking that an object is the exact same reference as another object.  But it’s not good for comparing two separate objects.  It behaves like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">\'on\'</span> <span class="token operator">+</span> <span class="token string">\'e\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">\'one\'</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token keyword">let</span> oneObj <span class="token operator">=</span> <span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// false!</span>\n</code></pre>\n      </div>\n<p>For comparing object and array equality, it usually is better to use <code>toEqual</code>, which does a deep property comparison:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> oneObj <span class="token operator">=</span> <span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> nestedObj <span class="token operator">=</span> <span class="token punctuation">{</span>nested<span class="token punctuation">:</span> <span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>nestedObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span>nested<span class="token punctuation">:</span> <span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n</code></pre>\n      </div>\n<p><code>toEqual</code> doesn’t line up to any built in JavaScript idea of equality exactly, it just does a recursive equal check. But it behaves like most people who haven’t already encountered the details of JavaScript equality would expect equality to work.  If objects share the same structure and values, they’re equal. There also is no Jest equivalent to <code>==</code> with its odd type casting behavior, and that is ok by me.</p>\n<h4>toBeDefined, toBeNull and toBeUndefined</h4>\n<p><code>toBeDefined</code>, <code>toBeNull</code>, and <code>toBeUndefined</code> are all shortcut functions.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">// same as expect(x).toBe(null)</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token comment">// same as expect(typeof x).toBe(\'undefined\')</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeUndefined</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token comment">// same as expect(typeof x).not.toBe(\'undefined\')</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeDefined</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>One thing worth pointing out here is the use of <code>.not</code> in my example comment.\n<code>.not</code> is a utility property that you can chain to reverse the output of\nany matcher.</p>\n<h4>toBeFalsy and toBeTruthy</h4>\n<p>These matchers essentially are shortcuts that act like <code>if</code> and <code>else</code> statements.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">// same as expect(!!x).toBe(true)</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeTruthy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token comment">// same as expect(!!x).toBe(false)</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeFalsy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>If you aren’t aware of the JavaScript concepts of truthiness and falsiness, the terms refer to whether a value is evaluated as true or false when evaluated in a boolean context.</p>\n<h3>Template matchers</h3>\n<p>Template matchers are matchers that don’t check for a specific value, but instead look to see if the expression is consistent with a certain pattern or shape.</p>\n<h4>toMatch</h4>\n<p><code>toMatch</code> is a template matcher for strings.  It accepts a regular expression that\nyou can use to describe the acceptable list of strings.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> id1 <span class="token operator">=</span> <span class="token string">\'155-60-7723\'</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> id2 <span class="token operator">=</span> <span class="token string">\'15-60-7723\'</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> socialSecurityNumberFormat <span class="token operator">=</span> <span class="token regex">/\\d{3}-\\d{2}-\\d{4}/</span><span class="token punctuation">;</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>id1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatch</span><span class="token punctuation">(</span>socialSecurityNumberFormat<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>id2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatch</span><span class="token punctuation">(</span>socialSecurityNumberFormat<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>\n</code></pre>\n      </div>\n<h4>toMatchObject and toHaveProperty</h4>\n<p><code>toMatchObject</code> and <code>toHaveProperty</code> are template matchers for objects. <code>toMatchObject</code> works similarly to <code>toEqual</code> and does a deep comparison on objects and arrays.  But unlike <code>toEqual</code>, <code>toMatchObject</code> doesn’t require an exact match, it just verifies that the expression has the same properties as the template object.  So extra properties on the expression we’re evaluating don’t matter.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> oneObj <span class="token operator">=</span> <span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> uno<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// false</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n</code></pre>\n      </div>\n<p><code>toHaveProperty</code> performs a similar function but doesn’t enforce the whole structure of an object.  Instead it just tests whether a single property is defined.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> oneObj <span class="token operator">=</span> <span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveProperty</span><span class="token punctuation">(</span><span class="token string">\'one\'</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n</code></pre>\n      </div>\n<p><code>toHaveProperty</code> can take a second “value” argument, at which point it acts as a more limited version of <code>toMatch</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> oneObj <span class="token operator">=</span> <span class="token punctuation">{</span>one<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveProperty</span><span class="token punctuation">(</span><span class="token string">\'one\'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span>oneObj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveProperty</span><span class="token punctuation">(</span><span class="token string">\'one\'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// false</span>\n</code></pre>\n      </div>\n<h4>toHaveLength</h4>\n<p><code>toHaveLength</code> is a simple matcher for checking the length of strings, arrays and any other array-like object that has a length property.  <code>expect(x).toHaveLength(y)</code> is just a shorthand for <code>expect(x.length)</code> with the benefit of handling undefined values of <code>x</code> safely.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">\'Hello\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveLength</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'Hello\'</span><span class="token punctuation">,</span> <span class="token string">\'From\'</span><span class="token punctuation">,</span> <span class="token string">\'The\'</span><span class="token punctuation">,</span> <span class="token string">\'Other\'</span><span class="token punctuation">,</span> <span class="token string">\'Side\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveLength</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">{</span>length<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveLength</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n</code></pre>\n      </div>\n<h4>toBeInstanceOf</h4>\n<p><code>toBeInstanceOf</code> allow’s checking the “type” of an object to see if it is an instance of a class, including inherited classes.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'We can test whether an object is an instance of a class\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">{</span><span class="token punctuation">}</span>\n  <span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span><span class="token punctuation">{</span><span class="token punctuation">}</span>\n  <span class="token keyword">class</span> <span class="token class-name">C</span><span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeInstanceOf</span><span class="token punctuation">(</span>A<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeInstanceOf</span><span class="token punctuation">(</span>A<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true because of inheritance</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeInstanceOf</span><span class="token punctuation">(</span>A<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<h3>toThrow</h3>\n<p><code>toThrow</code> is a bit of a different template matcher, because rather than matching a value, it matches against an exception.  <code>except()</code> takes a function, and instead of evaluating that function, it executes the function and looks to see if an exception is thrown. If there is an exception, <code>toThrow</code> can take a string, regex or Class and acts like either <code>toMatch</code> or <code>toBeInstanceOf</code> depending on what it is passed.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'We can match exceptions\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">throwingFunc1</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">throw</span> <span class="token string">\'error\'</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token keyword">class</span> <span class="token class-name">SpecialError</span><span class="token punctuation">{</span><span class="token punctuation">}</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">throwingFunc2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">SpecialError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function">expect</span><span class="token punctuation">(</span>throwingFunc1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token string">\'err\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>throwingFunc1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token regex">/err/</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>throwingFunc2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span>SpecialError<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<h3>Numeric Comparison Matchers</h3>\n<p>Numeric comparison matchers are straightforward.  They test whether a number relates correctly to another number.</p>\n<h4>toBeGreaterThan, toBeGreaterThanOrEqual, toBeLessThan, toBeLessThanOrEqual</h4>\n<p>These are exactly what they sound like.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeGreaterThan</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// false</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeGreaterThan</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeGreaterThanOrEqual</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeGreaterThanOrEqual</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeLessThan</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// false</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeLessThan</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeLessThanOrEqual</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n<span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeLessThanOrEqual</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n</code></pre>\n      </div>\n<h4>toBeCloseTo</h4>\n<p>This test checks whether a number is the same as another number within a set number of significant digits.  <code>toBeCloseTo</code> takes a number and an optional second option that determines the number of significant digits, then tests whether an expression is the same as that number within that number of significant digits.  This is useful in JavaScript since <a href="https://stackoverflow.com/questions/588004/is-floating-point-math-broken">floating point math is not precise and 0.1 + 0.2 famously does not equal 0.3 exactly</a>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'Floating Point Math Is Hard\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">0.2</span> <span class="token operator">+</span> <span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">0.3</span><span class="token punctuation">)</span> <span class="token comment">//true</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">0.2</span> <span class="token operator">+</span> <span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeCloseTo</span><span class="token punctuation">(</span><span class="token number">0.3</span><span class="token punctuation">)</span> <span class="token comment">//true</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<h3>Part 2 Coming Soon</h3>\n<p>There’s a lot to cover here, so check back soon for part 2 of this post, with contains matchers, async matchers, snapshot matchers, function matchers, meta matchers, and a few extra tricks for using matchers.</p>',
frontmatter:{title:"Taking Advantage of Jest Matchers (Part 1)",keywords:"jest matchers",category:"javascript",date:"2017-08-15T04:00:00+00:00",path:"/2017/08/15/jest-matchers-1/",layout:"post",hideFooter:null},fields:{slug:"/2017/08/15/jest-matchers-1/"}}},pathContext:{slug:"/2017/08/15/jest-matchers-1/",relatedPosts:[{path:"/2017/09/04/jest-matchers-2/",data:{title:"Taking Advantage of Jest Matchers (Part 2)",path:"/2017/09/04/jest-matchers-2/",description:"More API options for descriptive Jest tests",date:"2017-09-05T03:00:00+00:00"}},{path:"/2017/07/19/ten-things-javascript/",data:{title:"Ten Things A Serious JavaScript Developer Should Learn",path:"/2017/07/19/ten-things-javascript/",description:"Some of the important things to pick up in the JS world",date:"2017-07-19T04:00:00+00:00"}},{path:"/2017/02/26/running-jest-tests-before-each-git-commit/",data:{title:"Running Jest Tests Before Each Git Commit",path:"/2017/02/26/running-jest-tests-before-each-git-commit/",description:"A simple setup to run your Jest tests before every commit",date:"2017-02-26T23:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2017-08-15-jest-matchers-1-bd4f61283d3f3552fb23.js.map