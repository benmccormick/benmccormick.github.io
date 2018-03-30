webpackJsonp([0xef317b03b63e],{763:function(a,n){a.exports={data:{markdownRemark:{html:'<p><em>This is the second post in a series of posts on Computer Science basics for front end developers.  The goal is a practical focus on the practical implications of basic CS theory for JavaScript development.</em></p>\n<p>Modern programmers owe a lot to the efforts of many head in the sky theoretical mathematicians from the 1800s and early 1900s who were searching for mathematical truths and ended up making discoveries that serve as the basis of many modern computing inventions.  Boolean Algebra is one of a few branches of mathematics that was developed for purely theoretical reasons that has ended up shaping the computer revolution.  It fortunately has the virtue of being a relatively approachable to mathematical newbies.</p>\n<p>Boolean algebra is a study of operations on logical values. Or in more understandable language, it is studying the rules of logic when we’re limited to dealing with only 2 types of values, true or false.  The basic building blocks of boolean algebra are incredibly simple: in addition to the true and false values, usually encoded as 0 for false and 1 for true, boolean algebra considers 3 basic operations:</p>\n<ul>\n<li><strong>The “AND” operator (<code>∧</code>)</strong> - <code>a∧b</code> is true if and only if <code>a</code> and <code>b</code> are both true.</li>\n<li><strong>The “OR” operator (<code>∨</code>)</strong> - <code>a∨b</code> is true if at least one of <code>a</code> or <code>b</code> are true and false otherwise.</li>\n<li><strong>The “NOT” operator (<code>¬</code>)</strong> - <code>¬</code> is a unary operator. It only affects a single value.  <code>¬a</code> is true if <code>a</code> is false, and false if <code>a</code> is true.</li>\n</ul>\n<p>Of course this is a whole field of mathematics, so the interesting part comes as you start combining these pieces.  Mathematicians have discovered many “laws” that apply to boolean logic.  Some of these will probably look familiar to those of you who took high school algebra.  Here’s a sample of the laws from <a href="https://en.wikipedia.org/wiki/Boolean_algebra">Wikipedia</a>.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/boolean-laws-34dcd023c2ef64ea72d2412bb100a68a-1172a.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 75.53041018387553%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAABXElEQVQ4y5WTi46CQAxF/f9PFAFRAwHkraC8unNqxlWTFXaSSYXa471t3dRVJYfDQaIwlOv1KpxxHKUy77lN00hZlhrnedY80X7+PJuiKMT3fIU2da0vp2lSADmgxMvlsg5YG8h+vxfXdSXLsrckMKvu9fwFUyAFwMIwkjzPtXiaZo08kwfMD9OSYRi+Qo3lXDzPM8WFfgm7NloQPeXZ5r4Cq6pUy0mSyGgKHl9+JIGhEOBqy9gIzYRTA+z7Xzt93+sgiK+DWFRYmgl6nivH41EV2dO2rT6/9mwJ9uihabyz3arKruv0Jars/lmFa+w+p7zb7SQ9n992kBViyp+WFxUySd/3JY4TM9Va+8ZlmbEMnEuv7/f7MpBi7MZxLFEUaTGqsE+OCa8dyFOh4zi6i1yAgIhAP4tX9TAIAjmdTgrCll1ou9T/6iFFrAxAVgRV9m+WpqncbrdVyuz5Acz4k7nqjCYmAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Boolean logic laws"\n        title=""\n        src="/static/boolean-laws-34dcd023c2ef64ea72d2412bb100a68a-d766e.png"\n        srcset="/static/boolean-laws-34dcd023c2ef64ea72d2412bb100a68a-a6b6e.png 143w,\n/static/boolean-laws-34dcd023c2ef64ea72d2412bb100a68a-8e488.png 285w,\n/static/boolean-laws-34dcd023c2ef64ea72d2412bb100a68a-d766e.png 570w,\n/static/boolean-laws-34dcd023c2ef64ea72d2412bb100a68a-1172a.png 707w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>The last 3 especially are worth remembering.  Taking them out of mathematical notation for a second and using pseudocode instead, the rules are:</p>\n<ul>\n<li>Double Negation: <code>not not x == x</code></li>\n<li>De Morgan 1 <code>(not x) and (not y) === not (x or y)</code></li>\n<li>De Morgan 2 <code>(not x) or (not y) === not (x and y)</code></li>\n</ul>\n<h3>Boolean Algebra in JavaScript</h3>\n<p>For most JavaScript developers, the preceding description of boolean algebra probably seemed suspiciously familiar.  It turns out that JavaScript has all the base units of boolean algebra in its core language.  True and false are represented by the appropriately named boolean primitives <code>true</code> and <code>false</code>.  AND, OR, and NOT are represented by <code>&#x26;&#x26;</code>, <code>||</code> and <code>!</code> respectively.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/boolean-mappings-6d15c0e5ac4df9209df25439414c2043-d825e.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 305px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 54.42622950819672%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsSAAALEgHS3X78AAABe0lEQVQoz61S2XLCMAzk/3+LvnCUpKW5HBrCVSA0dBLInbCVnJoj075VM5qRJXm1K7uHf7TL5YKeEC4cIfA2nSIIDhCOA8u2Eccxnsdj2JbVui3gUM2mWhiG8GYzmKYlz57nYbFYoK5r9Hzfx8vrFE/9Phicgafkp9MJuq5TTmA4GMgehy4bhoHD4VMOmUwm0DWdgE0J2jTEUNGNowij0QgRMWOrqqojp7nGTXOL16sl1puNjCXDsiyR5zn8+Ryu60KQs3GenffydTxiu91R3OaLopD57fYD7yTdMEwkSdLukBsaCg7BHpqmYR8EV0CeyJacz4hIgWIh7xDLsixgkVzeX1XVMtfjaWzMYjgYIknTB0CemmWZ3CnHnON1qGG885DuPkjmxqLIaekOip/zPWBKQ/jVL7gBMht2Zs6kOJaAimGw35FkXV7uMuQe3rNiqCTzmZlnWXqtSYZK8mq5oults5LV7ooe7o5Ft6YGSED1w7s//t7/yv9W+wZBsE1zds9n0gAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="mapping of operators between pseudocode, mathematical and JavaScript notation"\n        title=""\n        src="/static/boolean-mappings-6d15c0e5ac4df9209df25439414c2043-d825e.png"\n        srcset="/static/boolean-mappings-6d15c0e5ac4df9209df25439414c2043-5b687.png 143w,\n/static/boolean-mappings-6d15c0e5ac4df9209df25439414c2043-6c25c.png 285w,\n/static/boolean-mappings-6d15c0e5ac4df9209df25439414c2043-d825e.png 305w"\n        sizes="(max-width: 305px) 100vw, 305px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>So a JavaScript statement like</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> y <span class="token operator">=</span> <span class="token boolean">true</span>\n<span class="token keyword">if</span><span class="token punctuation">(</span>x <span class="token operator">&amp;&amp;</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// false</span>\n  <span class="token function">willNeverHappen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>is equivalent to <code>x∧y</code> in boolean algebra notation.  But this being JavaScript, there are some quirks and things to know about.  </p>\n<p>First of all it’s worth noting that boolean logic in JavaScript is lazy by default.  That means that JavaScript will only evaluate enough of a boolean expression to know what the result will be.  So in an expression like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">alwaysReturnTrue</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> <span class="token function-variable function">alwaysReturnFalse</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token function">alwaysReturnFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">alwaysReturnTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>the function <code>alwaysReturnTrue</code> will never be called.  This will matter when we start talking about real world takeaways.  </p>\n<p>The second JavaScript quirk gets its own section.  Because booleans get more complicated when they interact with the rest of the JavaScript world.</p>\n<h3>Truthy and Falsy</h3>\n<p>When JavaScript conditionals like the if statement evaluate an expression, they aren’t strictly evaluating to see if something is the boolean values <code>true</code> or <code>false</code>.   Instead they’re looking to see if the expression is <em>truthy</em> or <em>falsy</em>.  This isn’t the kindergarten version of booleans, instead it’s JavaScript’s way of handling the fact that not all expressions are boolean.  Rather than requiring you to cast your values to boolean or use a statement that produces a boolean, JavaScript instead treats every value as either truthy or falsy.  The rules for this are reasonably consistent and easy to follow once you understand what is happening<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>.  It turns out that most values are truthy, so it is easiest to just learn the falsy values.  In JavaScript the falsy values are:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token boolean">false</span><span class="token punctuation">,</span>\n<span class="token keyword">null</span><span class="token punctuation">,</span>\nundefined<span class="token punctuation">,</span>\n<span class="token number">0</span><span class="token punctuation">,</span>\n<span class="token number">NaN</span><span class="token punctuation">,</span>\n<span class="token string">\'\'</span><span class="token punctuation">,</span> <span class="token comment">// or ""</span>\ndocument<span class="token punctuation">.</span>all <span class="token comment">// Special case browser hack just for fun</span>\n</code></pre>\n      </div>\n<p>If an expression that evaluates to one of these values is read into a boolean context like an if statement or ternary, it will be treated as false.  Any other value will be read as true.</p>\n<h3>Implications and Hacks</h3>\n<p>So far we’ve gone through some theory, as well as JavaScript’s own quirks.  But now let’s talk about 3 different implications of this stuff for day to day JavaScript programming.</p>\n<ol>\n<li>\n<p><strong>Shortcuts using the  &#x26;&#x26; and || operators</strong> - It’s fairly common, especially in special context like minified code and JSX expressions in React, to run into code that get’s clever with the lazy behavior of JavaScript boolean operators.  Specifically the <code>&#x26;&#x26;</code> statement often get’s used as an inline if statement like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> userID <span class="token operator">=</span> showID <span class="token operator">&amp;&amp;</span> <span class="token function">getUserID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>which is equivalent to</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> userID<span class="token punctuation">;</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>showID<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  userID <span class="token operator">=</span> <span class="token function">getUserID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n  userID <span class="token operator">=</span> showID<span class="token punctuation">;</span> <span class="token comment">//presumably false or null</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>The <code>||</code> statement can be used for a similar purpose, usually to provide a fallback value.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token operator">=</span> <span class="token function">createNewUser</span><span class="token punctuation">(</span>providedRole<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span>  userRole <span class="token operator">=</span> providedRole <span class="token operator">||</span> <span class="token string">\'basic-user\'</span><span class="token punctuation">;</span>\n  <span class="token comment">//...</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>It’s important to be careful with this type of use though, because if it would be valid for the user input to be a falsy value like <code>\'\'</code>, <code>null</code> or <code>0</code>, this can introduce subtle bugs.  More on that in a second.</p>\n<p>I wouldn’t personally relying too heavily on this technique.  Besides the possibility of subtle bugs, it isn’t very approachable for new developers, especially if you try nesting logic this way.  But you should know how it works since you will see it, especially in minified code you may need to debug and JSX.</p>\n</li>\n<li>\n<p><strong>!! for casting</strong> - Another common idiom to be aware of is the use of double negation to cast values to a boolean.  It is fairly common when you have code that is expecting a boolean and not just a truthy/falsy value to convert the value to a boolean.  One way to do that is using the <code>Boolean</code> constructor, like <code>var bool = Boolean(value)</code>, but another method is to use double negation.  The first negation evaluates to the boolean that is opposite the truthy/falsy value, and the second one flips it back to the original truthy/falsy state, but as a boolean.</p>\n<p>I personally find this notation to be less confusing than the <code>&#x26;&#x26;</code>/<code>||</code> shortcuts, but your mileage may vary.  Either way, it’s important to understand its role since it is common to find <code>!!</code>s in real world code.</p>\n</li>\n<li>\n<p><strong>0s and empty strings are dangerous</strong> - For our last quirk, let’s imagine a code example function <code>getCountFromServer</code>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> getUserCountFromServer <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n      <span class="token keyword">let</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'users\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">let</span> users <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token keyword">return</span> users<span class="token punctuation">.</span>length<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// if we can\'t get the count, return null</span>\n      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>This function makes a request from the server, and then returns the number of users, or <code>null</code> if it can’t get the value from the server for whatever reason.  Maybe not the best error handling, but certainly something you could see in real world code.  If we want to test to see if this function got data correctly, we have to be careful.  We might want to simplify our testing by taking advantage of <code>null</code>’s falsiness like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> userCount <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getUserCountFromServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>userCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// do something with the info</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n  <span class="token comment">//handle the case where the number failed to load</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Do you see the bug?  It’s subtle.  With code written like this, if there are no users it will be treated the same as if the number had failed to load at all.  This is a pretty common bug in situations where a value might be undefined or null, but could also be a number.  Strings have a similar issue.  </p>\n<p>It’s important to understand that if 0 or empty strings are a valid value for a variable, you can’t rely on a general falsiness check to see if the value is defined.  Instead it’s better to either define the exact falsy value you expect for “no value” (null in this case) or to check based on type.  For instance in this case, you could rewrite the code to look for a number:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> userCount <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getUserCountFromServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> userCount <span class="token operator">===</span> <span class="token string">\'number\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// do something with the info</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n  <span class="token comment">//handle the case where the number failed to load</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n</li>\n</ol>\n<h3>Feedback Welcome</h3>\n<p>This is the second post in a new series, and I’d love to hear whether it is helpful for you, and any other topics you’d like to see covered. Feel free to reach out on <a href="https://twitter.com/ben336">Twitter</a> or <a href="mailto:ben@benmccormick.org">email</a>.  And if you see anything that looks wrong or misleading to you, don’t hesitate to <a href="https://github.com/benmccormick/benmccormickorg/issues/new">open an issue</a> on my blog’s github repo.</p>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>The exception for me are empty arrays.  They get evaluated as truthy in JavaScript and falsy in Python, and I can never remember which is which without testing.</p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',frontmatter:{title:"Front End Computer Science Basics: Boolean Logic",keywords:"boolean computer science JavaScript",category:"computer-science",date:"2018/03/27",path:"/2018/03/27/cs-basics-boolean/",layout:"post",hideFooter:null},fields:{slug:"/2018/03/27/cs-basics-boolean/"}}},pathContext:{slug:"/2018/03/27/cs-basics-boolean/",relatedPosts:[{path:"/2018/03/21/cs-basics-variables/",data:{title:"Front End Computer Science Basics: Variables and Memory",path:"/2018/03/21/cs-basics-variables/",description:"A look at one of the most fundamental building blocks of programming",date:"2018/03/21"}},{path:"/2018/02/20/cs-for-fe/",data:{title:"Computer Science for Front End Developers?",path:"/2018/02/20/cs-for-fe/",description:"What Computer Science concepts are useful for front end devs? ",date:"2018/02/20"}},{path:"/2017/07/19/ten-things-javascript/",data:{title:"Ten Things A Serious JavaScript Developer Should Learn",path:"/2017/07/19/ten-things-javascript/",description:"Some of the important things to pick up in the JS world",date:"2017-07-19T04:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2018-03-27-cs-basics-boolean-d1860d81a260a07446d3.js.map