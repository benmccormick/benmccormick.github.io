webpackJsonp([0xe80ebd741376],{629:function(e,t){e.exports={data:{markdownRemark:{html:'<p>This past week I decided to try and learn more about <a href="http://coffeescript.org/">Coffeescript</a> by converting a side project I’ve been working on to use Coffeescript and LESS.  I really enjoyed the experience of working with Coffeescript and hope to use it more in the future. I thought I’d share a quick post about my experience, and outline what I see as the advantages and disadvantages.</p>\n<h3>What is Coffeescript?</h3>\n<p><a href="http://coffeescript.org/">Coffeescript</a> is a programming language with a Ruby-like syntax that compiles transparently into readable, best-practice Javascript.  To break that down:</p>\n<h4>It’s a language with Ruby-like syntax</h4>\n<p>Coffeescript features a short concise syntax with significant whitespace, short operators for many common actions, and syntax that encourages a pseudo-english style of coding.  For instance <code>if empty page then fill page else read page</code> would be valid syntax for calling a function <code>empty()</code> on an object <code>page</code> and then calling the <code>fill</code> method on it if it was empty or the <code>read</code> method if it was not.</p>\n<h4>It compiles to readable best-practice Javascript</h4>\n<p>The coffeescript compiler generates Javascript that is easy to read and avoids common pitfalls like unexpected casting with the <code>==</code> operator.</p>\n<h4>It compiles transparently</h4>\n<p>The generated javascript also matches up in a 1-1 relationship with the coffeescript source, so it’s still easy to debug and understand what coffeescript is related to the associate Javascript.  I’m also excited to try out the <a href="http://ryanflorence.com/2012/coffeescript-source-maps/">Coffeescript source maps</a> for Chrome and bypass this issue completely by debugging directly on the Coffeescript, but haven’t had the opportunity to set this up yet.</p>\n<h3>What I like about Coffeescript</h3>\n<h4>It’s super concise</h4>\n<p>I love writing short code.  Brevity and readability aren’t <strong>exactly</strong> the same thing, but they often overlap, and it’s usually easier to debug code when there’s less of it, all things being equal.  Coffeescript allows you to write less boilerplate.  An easy example is checking whether an element exists. Compare the JS implementation below to the equivalent Coffeescript.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">if</span><span class="token punctuation">(</span>el <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> el <span class="token operator">?</span><span class="token operator">==</span> <span class="token string">\'undefined\'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token comment">//do something with el</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-coffeescript"><code><span class="token keyword">if</span> el<span class="token operator">?</span>\n  <span class="token comment">#do something with el</span>\n</code></pre>\n      </div>\n<h4>It doesn’t look like Java</h4>\n<p>This is a bit counterintuitive coming from a guy who learned programming through Java and has never written a line of Ruby, but I think Javascript’s “Java-like” conventions are usually detrimental.  It has curly brace blocks, but not block level scope. It has constructors but not classical inheritance.  It’s possible to write valid code that looks exactly like Java in Javascript, and not understand why the behavior is slightly different than you expect.  Coffeescripts syntax feels less likely to lead you down a bad road.</p>\n<h4>It avoids the “bad parts” of Javascript</h4>\n<p>Javascript has some “features” that cause more problems than they’re worth, including the <code>==</code> operator, automatic semicolon insertion, and the <code>with</code> statement.  Coffeescript either avoids these parts completely, or helps the programmer navigate them without having to think about it.  So you can still write your while statements by dropping into normal Javascript code if you must, but Coffeescript won’t make it easy.</p>\n<h3>What I didn’t like so much</h3>\n<h4>Debugging is slower</h4>\n<p>While it’s certainly much better than it could be due to the transparent compilation, debugging in coffeescript still means that you’re debugging a “product” of your code, not the code itself.  That level of abstraction has a cost.  That cost will vary depending on your experience, code style and tooling (certainly source maps have potential to minimize it), but it will exist, and it needs to be factored in to any language decisions.</p>\n<h4>Function Parameters without Parentheses</h4>\n<p>Coffeescript lets you write function parameters without parentheses.  While this allows the cute <strong>sentence-like</strong> one liners that they demonstrate on their website, in practice I’ve found it to really hurt readability.  It’s often not clear where the function begins and ends, especially if you’re nesting function calls.  Coffeescript is also not consistent in how it applies these rules, because in some cases you DO have to use parentheses.  When declaring a function you must use parentheses if there are 1 or more arguments.  When calling a function you must use parentheses if there are no arguments.    I’ve found that I struggle to read function calls if there are more than 1 parameters without parentheses.  As a result I’ve used parentheses everywhere there is one or more parentheses, and for now on I’m planning on including them even for single param functions just to be consistent.</p>\n<h3>Conclusions</h3>\n<p>I’m very glad I tried Coffeescript.  I think it definitely has its place as a concise syntax on top of Javascript that especially makes sense for larger projects where the investment in adjusting to it will pay off over time.  I overall think it adds readability and maintainability from Javascript, though it is by no means perfect in either area.  I’m excited to see what happens with this language going forward.</p>\n<hr>\n<h3>Further Reading</h3>\n<ul>\n<li>\n<p><a href="http://ryanflorence.com/2011/case-against-coffeescript/">The Case Against Coffeescript</a> - a good roundup of some valid criticisms of Coffeescript, especially with regard to readability</p>\n</li>\n<li>\n<p><a href="http://coffeescript.org/#try:alert%20%22Hello%20CoffeeScript!%22">Interactive Coffeescript Compiler</a> - If you want to mess around with Coffeescript, their website has an interactive compiler that translates your Coffeescript to Javascript side by side.  There is also a full tutorial breaking down the languages syntax.</p>\n</li>\n</ul>',frontmatter:{title:"Coffeescript Is Great",keywords:null,category:"javascript",date:"2013-02-23T23:50:00+00:00",path:"/2013/02/23/coffeescript-is-great",layout:"post",hideFooter:null},fields:{slug:"/2013/02/23/coffeescript-is-great"}}},pathContext:{slug:"/2013/02/23/coffeescript-is-great",relatedPosts:[{path:"/2013/02/23/coffeescript-is-great",data:{title:"Coffeescript Is Great",path:"/2013/02/23/coffeescript-is-great",description:null,date:"2013-02-23T23:50:00+00:00"}},{path:"/2013/01/08/explaining-javascript-closures",data:{title:"Explaining Javascript: Closures",path:"/2013/01/08/explaining-javascript-closures",description:"Diving into one of JavaScripts more confusing concepts",date:"2013-01-08T23:30:00+00:00"}},{path:"/2013/01/12/explaining-javascript-object-oriented-programming",data:{title:"Explaining Javascript: Object Oriented Programming",path:"/2013/01/12/explaining-javascript-object-oriented-programming",description:"A look at Object Oriented programming principles in JavaScript",date:"2013-01-12T03:05:00+00:00"}}]}}}});
//# sourceMappingURL=path---2013-02-23-coffeescript-is-great-7e1e126bbb2cad7a0b17.js.map