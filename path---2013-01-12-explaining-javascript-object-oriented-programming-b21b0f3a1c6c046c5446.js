webpackJsonp([0xdafbe7cc4aa6],{711:function(n,a){n.exports={data:{markdownRemark:{html:'<p>I’m continuing this series on Javascript concepts for people new to the language by looking at  object oriented programming.  One of the more confusing concepts for new Javascript programmers, especially those used to the classical inheritance structures of Java or C++ is Javascript’s prototypical inheritance model.  Because it is possible to write syntax for Javascript object creation that can look very similar to classical inheritance in Java, its easy to be misled and have false expectations.  Its important to understand how Javascript’s object model works, so that you can adjust your expectations and write code that takes advantage of the language’s expressive power.</p>\n<h4>Creating a new object</h4>\n<p>Javascript provides multiple ways to create new objects.  The simplest way is to just create an empty object with <code>{}</code>.  The one I’ll be looking at today was modeled after Java syntax and gives the language a deceptively classical vibe:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//Creating Objects with new</span>\n\n    <span class="token keyword">function</span> <span class="token function">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>home <span class="token operator">=</span> <span class="token string">"earth"</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>noise <span class="token operator">=</span> <span class="token string">"roar"</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    Animal<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sound</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>noise<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">var</span> animalObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    animalObject<span class="token punctuation">.</span><span class="token function">sound</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// roar</span>\n    <span class="token keyword">var</span> home <span class="token operator">=</span> animalObject<span class="token punctuation">.</span>home <span class="token comment">//earth</span>\n</code></pre>\n      </div>\n<p>This all looks very familiar and comfortable to a Java programmer.  Animal() is the constructor of a class Animal, with a function sound() and animalObject is an instance of that class.  And you can write code like that if you want.  The problem is, that model is not enforced at all by javascript.  Javascript doesn’t have any special “constructor functions” or classes<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>.  Any function can be used as a constructor</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//Normal Function as constructor</span>\n\n    <span class="token keyword">function</span> <span class="token function">normalFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"This is a normal function"</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">var</span> normal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">normalFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    normal <span class="token keyword">instanceof</span> <span class="token class-name">normalFunc</span>  <span class="token comment">//true</span>\n    <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    x<span class="token punctuation">.</span>y <span class="token operator">=</span> normalFunc<span class="token punctuation">;</span>\n\n    <span class="token keyword">var</span> huh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">x<span class="token punctuation">.</span>y</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    huh instance <span class="token keyword">of</span> normalFunc <span class="token comment">//true</span>\n</code></pre>\n      </div>\n<p>So whats actually happening when you call new before a function?  The new operator generates a new object, binds <code>this</code> to that object for the constructor function, calls that function and sets that function as the prototype of the new object.  But what is a prototype?</p>\n<h4>Prototypes</h4>\n<p>Javascript inheritance is at its heart “prototypical inheritance”.  This means that rather than having a concept of “classes” and “implementations” of those classes, javascript objects inherit their properties directly from other objects.  So for the “classical” example above, what is actually happening is that a new object is being created, it is having some of its properties set by the constructor function, and then has the constructor’s prototype set as its prototype.  This means that it has access to any properties on the “prototype chain” of the constructor, which in this case includes the sound method.  All objects have acccess to Object.prototype, giving it access to object properties and methods like toString, hasOwnProperty and others.</p>\n<h4>The ES5 Way</h4>\n<p>The ECMAScript 5 specification defines a new way to create objects from existing objects with the <strong><a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create">Object.create()</a></strong> syntax.  Object.create takes an existing object and sets it as the prototype object for a newly created object<sup id="fnref:2"><a href="#fn:2" rel="footnote">2</a></sup>.  This was added to make the syntax for setting the prototype of a new object easier and more clear.<sup id="fnref:3"><a href="#fn:3" rel="footnote">3</a></sup>  It also allows us to simulate classical inheritance:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//ES5 Classical Inheritance example</span>\n\n    <span class="token keyword">var</span> <span class="token function-variable function">Cat</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        Animal<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//Call the Animal constructor to set local variables</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>noise <span class="token operator">=</span> <span class="token string">"meow"</span> <span class="token comment">//override the Animal sound</span>\n    <span class="token punctuation">}</span>\n    Cat<span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>Animal<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>\n\n   <span class="token keyword">var</span> kitty <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n   kitty<span class="token punctuation">.</span><span class="token function">sound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//meow</span>\n   <span class="token function">alert</span><span class="token punctuation">(</span>kitty<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">"sound"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//false</span>\n   <span class="token function">alert</span><span class="token punctuation">(</span>kitty <span class="token keyword">instanceof</span> <span class="token class-name">Cat</span><span class="token punctuation">)</span> <span class="token comment">//true</span>\n   <span class="token function">alert</span><span class="token punctuation">(</span>kitty <span class="token keyword">instanceof</span> <span class="token class-name">Animal</span><span class="token punctuation">)</span> <span class="token comment">//true</span>\n</code></pre>\n      </div>\n<p>So as you can see, it is very possible to write Object-Oriented Javascript.  The key is to understand that what’s happening behind the scenes in Javascript is different than Java or C++, even though the syntax may look similar.</p>\n<h4>Summary</h4>\n<ul>\n<li>\n<p>Inheritance and object oriented programming in javascript are possible, but are more of a programmer defined construct rather than an inherent property of the language</p>\n</li>\n<li>\n<p>Javascript supports prototypical inheritance, meaning that it inherits functions and properties from its prototype object.  All objects inherit from Object.prototype.</p>\n</li>\n<li>\n<p>ECMAScript 5 introduced support for Object.create, which provides an easier syntax for creating new objects and simulating inheritance.</p>\n</li>\n</ul>\n<hr>\n<h3>Further Reading</h3>\n<ul>\n<li>\n<p><a href="https://developer.mozilla.org/en-US/docs/JavaScript/Introduction_to_Object-Oriented_JavaScript">Mozilla’s Developer Documentation</a> has a good summary of implementing Object Oriented Programming concepts in Javascript</p>\n</li>\n<li>\n<p><a href="http://msdn.microsoft.com/en-us/magazine/gg314983.aspx">Managing Javascript Objects</a> is a great article by Nicholas Zakas for MSDN about designing an object oriented application in Javascript.  Zakas also has recently written a <a href="https://leanpub.com/oopinjavascript">book</a> on object oriented programming in Javascript</p>\n</li>\n</ul>\n<hr>\n<h3>Explaining Javascript</h3>\n<p>This is the second article in my Explaining Javascript series for introducing Javascript concepts to new JS developers.</p>\n<ol>\n<li>\n<p><a href="http://www.benmccormick.org/blog/2013/01/08/javascript-explained-closures/">Closures</a></p>\n</li>\n<li>\n<p><a href="http://www.benmccormick.org/blog/2013/01/12/javascript-explained-object-oriented-javascript/">Object Oriented Programming</a></p>\n</li>\n</ol>\n<hr>\n<div class="footnotes"><ol>\n<li class="footnote" id="fn:1">\n<p>\nIn the next version of Javascript ES6 there will be a more formal concept of classes.  You can read more <a href="http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes">here</a> if interested\n<a href="#fnref:1" title="return to article"> ↩</a>\n</p>\n</li>\n<li class="footnote" id="fn:2">\n<p>\nWith an optional second argument to set the local properties of the object from another object.  Note that these properties will need to be Objects, not primitive values, or a TypeError will be thrown        \n<a href="#fnref:2" title="return to article"> ↩</a>\n</p>\n</li>\n<li class="footnote" id="fn:2">\n<p>Thanks to <a href="https://plus.google.com/u/0/110077141419510454119/posts">Eric Elliot</a> for pointing out that my original description of Object.Create was misleading.  There are multiple ways to create and reuse object code in Javascript.  I only touch on one of them in this article.<br>\n<a href="#fnref:2" title="return to article"> ↩</a></p>\n</li>\n</ol></div>',frontmatter:{title:"Explaining Javascript: Object Oriented Programming",keywords:null,category:"javascript",date:"2013-01-12T03:05:00+00:00",path:"/2013/01/12/explaining-javascript-object-oriented-programming",layout:"post",hideFooter:null},fields:{slug:"/2013/01/12/explaining-javascript-object-oriented-programming"}}},pathContext:{slug:"/2013/01/12/explaining-javascript-object-oriented-programming",relatedPosts:[{path:"/2013/02/23/coffeescript-is-great",data:{title:"Coffeescript Is Great",path:"/2013/02/23/coffeescript-is-great",description:null,date:"2013-02-23T23:50:00+00:00"}},{path:"/2013/01/08/explaining-javascript-closures",data:{title:"Explaining Javascript: Closures",path:"/2013/01/08/explaining-javascript-closures",description:"Diving into one of JavaScripts more confusing concepts",date:"2013-01-08T23:30:00+00:00"}},{path:"/2013/01/12/explaining-javascript-object-oriented-programming",data:{title:"Explaining Javascript: Object Oriented Programming",path:"/2013/01/12/explaining-javascript-object-oriented-programming",description:"A look at Object Oriented programming principles in JavaScript",date:"2013-01-12T03:05:00+00:00"}}]}}}});
//# sourceMappingURL=path---2013-01-12-explaining-javascript-object-oriented-programming-b21b0f3a1c6c046c5446.js.map