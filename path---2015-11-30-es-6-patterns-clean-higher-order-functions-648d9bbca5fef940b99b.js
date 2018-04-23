webpackJsonp([94643746021350],{700:function(n,t){n.exports={data:{markdownRemark:{html:'<div class="explanation">\nI\'ve been writing code using the new features defined in the ECMAScript 2015 version of JavaScript (<a href="http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/">more commonly known as ES6</a>) since January.  Throughout the year I\'ve seen myself start using a few new patterns that I think make my code better.  I\'m going to share them here with a few quick hitter articles, starting with a simpler way of writing higher order functions\n</div>\n<p>A higher order function is a function that either</p>\n<ol>\n<li>\n<p>Takes another function as an argument or</p>\n</li>\n<li>\n<p>Returns a function when called</p>\n</li>\n</ol>\n<p>Although many people have never heard of them, higher order functions are a key part of JavaScript development and something that most JavaScript developers will encounter every day, whether they know the term or not.  jQuery, Underscore, and many other JavaScript libraries are built on higher order functions.  Many of the core JavaScript APIs, like map, filter, forEach, and setTimeout are functions that take functions as arguments.  If you’re not comfortable with these patterns, learning about them can help you understand the JavaScript ecosystem better.  Hopefully this article will pique your interest.</p>\n<p>For this pattern, I’ll be focused on the second class of higher-order functions, functions that return other functions.  They can be useful in a variety of cases.  As an example, let’s consider a blog commenting application with a list of users.  Our task is to get a list of comments for each user.  We can do that with the builtin <code>map</code> and <code>filter</code> functions and a simple helper function like this.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> commentList <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./comments\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">getCommentFromUser</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        user<span class="token punctuation">:</span> userId<span class="token punctuation">,</span>\n        comments<span class="token punctuation">:</span>commentList<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>comment<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> comment<span class="token punctuation">.</span>user <span class="token operator">===</span> userId\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">let</span> userIds <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    userComments <span class="token operator">=</span> userIds<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>getCommentFromUser<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//do stuff with comments</span>\n</code></pre>\n      </div>\n<p>We’ve now written some simple, working code.  We take a list of user ids and return a list of users with the ids mapped to their comments.  Everything is fine, and we can move forward to do things with the comments.  If we don’t need to maintain this code base, we could probably stop here.</p>\n<p>The problem is, while this example works for the simple case, it isn’t very flexible.  We pull the comments directly from a single source that we’ve made available to all of the code in our module.  We can’t add any additional filters on the comments used or pull comments from additional sources without rewriting our mapping logic. If we decide we only want comments that were written in the past year for instance, we’ll need to rewrite our function or mutate commentList in a way that could effect code in the rest of the file. That feels pretty sloppy, since mapping comments to users should be unrelated to determining what comments we’re including in our groupings.  Fortunately we can solve this using a higher order function.  If we rewrite the code so that <code>getCommentFromUser</code> takes a list of comments and returns a function that takes an id, we can then control exactly what comments are included in the grouping.  For now we’ll leave our full list, but it could be rewritten later to be a filtered list or to pull comments from multiple sources, without re-writing this logic.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> commentList <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./comments\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">getCommentFromUser</span> <span class="token punctuation">(</span>comments<span class="token punctuation">)</span>\n    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">{</span>\n            user<span class="token punctuation">:</span> userId<span class="token punctuation">,</span>\n            comments<span class="token punctuation">:</span> comments<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>comment<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> comment<span class="token punctuation">.</span>user <span class="token operator">===</span> userId\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">let</span> userIds <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    userComments <span class="token operator">=</span> userIds<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token function">getCommentFromUser</span><span class="token punctuation">(</span>commentList<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//do stuff with comments</span>\n</code></pre>\n      </div>\n<p>Our code has gotten much more flexible, but at the cost of readability.  Most developers without significant functional programming experience will have to look twice at the 4 levels of nesting and multiple return statements in our helper function definition to understand what is going on.  We’ve added significant boilerplate in a way that muddies up the meaning of our function, when all we’re really trying to do is provide a way to make the comments list used in the function configurable.  That is extremely “beginner-unfriendly”.  At the same time using higher order functions like this is a useful pattern that serves a real need in the design of our application.  Fortunately, ES6 gives us the opportunity to clean up our syntax.  </p>\n<p>ES6 provides “arrow functions”, a shorthand for functions that have 2 main differences from the JavaScript <code>function</code> keyword.  First, they don’t bind a <code>this</code> value as a context, instead using the <code>this</code> of the parent scope.  Secondly, they can be written inline, with no parentheses and an implicit return.  So you can write a squaring function as <code>const square = (x) => x * x;</code>.  The first property of these functions has many consequences that have been covered in depth elsewhere around the internet.  But when writing non object oriented functions that don’t use <code>this</code> like our example above, it is mostly not relevant.  In this case though, the cleaner syntax that arrow functions provide allow us to write a clear and clean higher order function to solve our use case.  With arrow functions, our example from above now looks like this.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> commentList <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./comments\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">getCommentFromUser</span> <span class="token operator">=</span> <span class="token punctuation">(</span>comments<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>userId<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    user<span class="token punctuation">:</span> userId<span class="token punctuation">,</span>\n    comments<span class="token punctuation">:</span> comments<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span> <span class="token punctuation">(</span>comment<span class="token punctuation">)</span> <span class="token operator">=></span> comment<span class="token punctuation">.</span>user <span class="token operator">===</span> userId<span class="token punctuation">)</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">let</span> userIds <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    userComments <span class="token operator">=</span> userIds<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token function">getCommentFromUser</span><span class="token punctuation">(</span>commentList<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//do stuff with comments</span>\n</code></pre>\n      </div>\n<p>I like to call the <code>() => () =></code> pattern a “double function”, and have found it popping up all over the code I write since I began using ES6, especially when I’m using <code>map</code>, <code>filter</code>, and <code>reduce</code>.  Array transformations using those functions often require contextual information beyond the contents of the array.  A naive approach to this would involve having the function reference variables in the outer scope directly, like we did with commentList above.  More commonly that happens when a user inlines a function inside of a <code>map</code> call and references variables in the parent scope.  I’ve found that it is much clearer and less error prone to use a higher order function that takes only the variables that are needed for the transformation in, and returns a new function that can be used for the transformation.  This reduces the number of things that can effect the output of the function, allows for greater configurability without directly changing the transformation logic, and makes it clear to readers what values are expected to be used in the function.  Double functions make this easy, and they’ve easily been one of my favorite new code patterns with ES6.  </p>\n<h3>More Resources</h3>\n<ul>\n<li>If you’re interested in higher order functions and JavaScript, I know of no better reference than <a href="https://leanpub.com/javascriptallongesix">JavaScript Allongé</a>.  It’s a fantastic deep dive into the JavaScript language with a functional flavor, building understanding from the bottom up and providing many ideas for code recipes along the way.  And it’s recently been rewritten to reflect the changes to the language that ES6 brought.</li>\n<li>Here’s a nice <a href="http://www.2ality.com/2012/04/arrow-functions.html">deep dive on arrow functions at 2ality</a> by Axel Rauschmayer.  If you haven’t seen his blog, it’s a fantastic reference on ES6 and JavaScript in general</li>\n</ul>',frontmatter:{title:"ES6 Patterns: Clean Higher Order Functions",keywords:null,category:"javascript",date:"2015-11-30T05:06:03+00:00",path:"/2015/11/30/es6-patterns-clean-higher-order-functions",layout:"post",hideFooter:null},fields:{slug:"/2015/11/30/es6-patterns-clean-higher-order-functions"}}},pathContext:{slug:"/2015/11/30/es6-patterns-clean-higher-order-functions",relatedPosts:[{path:"/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning",data:{title:"ES5, ES6, ES2016, ES.Next: What's going on with JavaScript versioning?",path:"/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning",description:"A summary of the naming conventions for the JavaScript language",date:"2015-09-14T03:11:34+00:00"}},{path:"/2015/12/30/es6-patterns-converting-callbacks-to-promises",data:{title:"ES6 Patterns: Converting Callbacks to Promises",path:"/2015/12/30/es6-patterns-converting-callbacks-to-promises",description:"How to convert a callback driven API to a Promise-based one",date:"2015-12-30T03:30:47+00:00"}},{path:"/2016/12/14/what-are-higher-order-components",data:{title:"What are Higher Order Components?",path:"/2016/12/14/what-are-higher-order-components",description:"An explanation of React's higher order components",date:"2016-12-14T14:30:00+00:00"}}]}}}});
//# sourceMappingURL=path---2015-11-30-es-6-patterns-clean-higher-order-functions-648d9bbca5fef940b99b.js.map