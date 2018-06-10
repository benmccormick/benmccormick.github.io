webpackJsonp([0x9b4462ababb],{907:function(n,a){n.exports={pathContext:{posts:[{node:{frontmatter:{readNext:null,topics:["Mobx","Atom"],category:"opinion",key:"weekly-links-01-12-18",title:"Weekly Links: January 12th",description:"Making Atom faster, a good book, and Mobx-state-tree",layout:"weekly-links",path:"/2018/01/12/weekly-links-01-12-18/",date:"2018/01/12",dontfeature:null,isDraft:null},html:'<h3>JavaScript And The Web</h3>\n<p><a href="https://egghead.io/courses/manage-application-state-with-mobx-state-tree">Manage Application State with Mobx-state-tree| Michael Weststrate on Egghead</a>  - Mobx-state-tree is an opinionated state library built on top of the unopinionated Mobx library.  This is a free course explaining why it exists and how to use it.  I <a href="https://benmccormick.org/2017/01/09/mobx-first-impressions/">wrote about Mobx last year</a> and am still enjoying using it a year later.  I’m excited to dive into Mobx-state-tree and hopefully sharpen my Mobx skills in the process.</p>\n<h3>Programming Tools And Practices</h3>\n<p><a href="http://blog.atom.io/2018/01/10/the-state-of-atoms-performance.html">The State of Atom’s Performance | Atom Blog</a> - Atom continues to (slowly) become snappier.  I’m glad to see how organized they are on this.  It’s really hard to take something that was built with a slower architecture fast while it’s being used by tens of thousands of people every day.  They’re making great progress.</p>\n<p><a href="http://amzn.to/2DqBeSQ">Clean Architecture | Robert C Martin</a> - I’ll probably be posting more on this soon, but I’ve been reading the new book on architecture by “Uncle Bob” Martin, and it’s fantastic.  It breaks down big architecture and program design concepts like the Single Responsibility Principle and Dependency Inversion, and explains them well individually, but also shows how they fit together when designing a large system.  I’ll write a full review when I finish the book, but for now just wanted to share that it is worth picking up.</p>\n<h3>Non-Tech</h3>\n<p><a href="https://www.nytimes.com/2018/01/09/us/north-carolina-gerrymander.html">North Carolina Is Ordered To Redraw Its Congressional Map | NY Times</a> - A little bit of local news here <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>, but it is still important for everyone in the USA.  Redistricting is the type of problem where a simple rules based algorithm could be helpful.  Nothing opaque or deep-learning-y, just have a machine apply a published set of rules and work with the results.</p>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>I’m a proud resident of Durham, North Carolina</p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',fields:{slug:"/2018/01/12/weekly-links-01-12-18/"}}},{node:{frontmatter:{readNext:"jest-first,backbone-devs-react,react-component-styles",topics:["Mobx","JavaScript","React"],category:"frameworks",key:"mobx-first",title:"MobX: First Impressions",description:"First impression of managing data with MobX",layout:"post",path:"/2017/01/09/mobx-first-impressions/",date:"2017-01-09T13:30:00+00:00",dontfeature:null,isDraft:null},html:'<p>I spent some time around the holidays this year playing with <a href="https://mobx.js.org/">MobX</a>, a state management library for JavaScript.  MobX is an unopinionated library that provides a layer over normal JavaScript data structures that allow other code to efficiently observe data changes and update based on what has changed.  It’s an interesting tool for handling state in web applications, especially in existing projects that might need to update state handling iteratively.  Here are some first impressions.</p>\n<h3>What is MobX?</h3>\n<p>MobX has 3 core concepts developers need to understand:</p>\n<ol>\n<li><strong>Observable state</strong> - MobX provides functions to make data <em>observable</em>.  Observable data can be watched by other pieces of code which may efficiently update when the state changes.  Observable data is primarily created in MobX using the <code>observable</code> function.</li>\n<li><strong>Derivations</strong> - Functions that <em>watch</em> observable data are called derivations.  MobX has 2 primary types of derivations: <em>computed values</em> and <em>reactions</em>.  Computed values update a value based on other data, while reactions produce side effects: updates to a UI, a network call, or a logging statement for example. MobX provides a <code>computed</code> function for defining computed values; in most cases reactions will likely be mostly defined using a framework specific helper library like <a href="https://github.com/mobxjs/mobx-react">mobx-react</a> or <a href="https://github.com/500tech/ng2-mobx">ng2-mobx</a>.  MobX does provide some lower level libraries for reactions though, including <code>autorun</code> and <code>when</code>.</li>\n<li><strong>Actions</strong> - Code that updates observable state is known as an action.  MobX has a formalized version of actions which can be defined using the <code>action</code> function, but it is also possible to modify state directly using any normal JavaScript code and maintain observable behavior.</li>\n</ol>\n<p>In practice this looks something like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>observable<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'mobx\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>observer<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'mobx-react\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> digits <span class="token operator">=</span> <span class="token function">observable</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> DigitPrinter <span class="token operator">=</span> <span class="token function">observer</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span>digits<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token operator">&lt;</span>div<span class="token operator">></span>\n    <span class="token punctuation">{</span>digits<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">\', \'</span><span class="token punctuation">)</span><span class="token punctuation">}</span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span> <span class="token operator">&lt;</span>DigitPrinter digits <span class="token operator">=</span> <span class="token punctuation">{</span>digits<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">/* prints 1, 2 */</span>\n\n\ndigits<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">/* DOM re-renders to print 1, 2, 3 */</span>\n\ndigits<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>\n\n<span class="token comment">/* DOM re-renders to print 1, 2, 4 */</span>\n</code></pre>\n      </div>\n<p>The component is able to passively <em>observe</em> changes in the data, and re-render when it changes.  But MobX is actually even smarter than this example shows.  Let’s look at another example, this time using a more complex data structure (a class).</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>extendObservable<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'mobx\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>observer<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'mobx-react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> moment <span class="token keyword">from</span> <span class="token string">\'moment\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Appointment</span> <span class="token punctuation">{</span>\n\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">extendObservable</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n      dueDate<span class="token punctuation">:</span> <span class="token string">\'01-01-2017\'</span><span class="token punctuation">,</span>\n      title<span class="token punctuation">:</span> <span class="token string">\'Dinner with Joe\'</span>\n      location<span class="token punctuation">:</span> <span class="token string">\'Chik-Fil-A\'</span><span class="token punctuation">,</span>\n      isToday<span class="token punctuation">:</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">moment</span><span class="token punctuation">(</span>dueDate<span class="token punctuation">,</span> <span class="token string">\'MM-DD-YYYY\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">diff</span><span class="token punctuation">(</span>moment<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">\'days\'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>title<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> @ </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>location<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n\n<span class="token keyword">const</span> TodayBox <span class="token operator">=</span> <span class="token function">observer</span><span class="token punctuation">(</span><span class="token keyword">class</span> <span class="token class-name">TodayBox</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> <span class="token punctuation">{</span>appointments<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token operator">&lt;</span>div<span class="token operator">></span>\n      <span class="token punctuation">{</span>appointments<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>a <span class="token operator">=></span> a<span class="token punctuation">.</span>isToday<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>a <span class="token operator">=></span> <span class="token operator">&lt;</span>span<span class="token operator">></span>a<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">}</span>     \n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> appointment <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Appointment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span> <span class="token operator">&lt;</span>TodayBox appointments <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">[</span>appointment<span class="token punctuation">]</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">/* prints an empty div */</span>\n\nappointment<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">\'Dinner with Bob\'</span><span class="token punctuation">;</span>\n\n<span class="token comment">/* Nothing relevant has changed. The component does not re-render */</span>\n\nappointment<span class="token punctuation">.</span>dueDate <span class="token operator">=</span> <span class="token string">\'01-09-2017\'</span><span class="token punctuation">;</span>  \n\n<span class="token comment">/*  assume that 01-09-2017 is "today" */</span>\n</code></pre>\n      </div>\n<p>MobX has the “magical” ability to determine what changes actually affect the observer and not make unnecessary calls of reaction functions.  In practice, that magic allows you to write less, more efficient code for updating your UI based on data.</p>\n<h3>How Does MobX work?</h3>\n<p>I have a learned skepticism of magical solutions like this.  Generally I find that time-saving magic like this ends up costing time when it comes to maintenance, and explicit relationships between code saves time over less-boilerplate heavy code. Fortunately, while the libraries code itself is fairly complex, it isn’t too hard to understand the logic behind how MobX works.  </p>\n<p>On the Observer side, MobX uses <a href="http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/">ES5</a> setters and getters to proxy updates to observable data structure and listen in when data is updated.  This allows the type of event listening that <a href="http://backbonejs.org/">Backbone</a> and other libraries provide, without requiring the user to go through special <code>set</code> or <code>get</code> methods to update an object’s properties.  Most of the time you should be able to just be able to write code as you normally would, and MobX will make it work.  There are some exceptions though that mean its important to actually understand how the library work.  Getters and Setters only work when looking up an existing property on an object, so when using primitive values or adding new values to an existing object, some special syntax (the return of <code>get</code> and <code>set</code> methods) may be required.  In Mobx primitive observables are referred to as <em>boxed</em> values, and objects that require new values over time can be handled by using observable Maps, which use the API of <a href="http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/">ES6</a> Maps.</p>\n<p>On the derivative side, reactions and computed values are always defined as functions.  MobX wraps these functions and is able to determine (through the method described above) what properties were accessed during each function run.  It then only listens for changes to these properties.  Thus it doesn’t matter if you theoretically could access thousands of observable properties in a function, if you wrap those references in an if statement to a single property, and that property returns false on first run, the derivative function will only listen for changes on that property before running again. When an observable is updated, all derivative code is run synchronously and atomically so there is no concern of getting into bad intermediate states.</p>\n<p>Most of the “magic” is covered by the 2 paragraphs above, and once you understand the ideas behind them (see the resources at the bottom of this post for more in-depth explanations), it is fairly easy to understand the reasoning behind the cases where the magic fails.</p>\n<h3>Decorators</h3>\n<p>Developers who actually use MobX are probably questioning my examples by now, because I’ve been using a different syntax than the primary MobX documentation for showing my examples.  So let’s talk about decorators.  The preferred way (according to the documentation) to write MobX code is to use decorators to define observers and observables.  Decorators are a <a href="http://tc39.github.io/proposal-decorators/">proposed new JavaScript feature</a> for declaratively adding extra behavior to classes, class properties and class methods.  Using them with MobX, my above example would look like this <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Appointment</span> <span class="token punctuation">{</span>\n\n  @observable dueDate <span class="token operator">=</span> <span class="token string">\'01-01-2017\'</span>\n  @observable title <span class="token operator">=</span> <span class="token string">\'Dinner with Joe\'</span>\n  @observable location <span class="token operator">=</span> <span class="token string">\'Chik-Fil-A\'</span>\n\n  @computed <span class="token keyword">get</span> <span class="token function">isToday</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">moment</span><span class="token punctuation">(</span>dueDate<span class="token punctuation">,</span> <span class="token string">\'MM-DD-YYYY\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">diff</span><span class="token punctuation">(</span>moment<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">\'days\'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>title<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> @ </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>location<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n\n@observer <span class="token keyword">class</span> <span class="token class-name">TodayBox</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> <span class="token punctuation">{</span>appointments<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token operator">&lt;</span>div<span class="token operator">></span>\n      <span class="token punctuation">{</span>appointments<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>a <span class="token operator">=></span> a<span class="token punctuation">.</span>isToday<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>a <span class="token operator">=></span> <span class="token operator">&lt;</span>span<span class="token operator">></span>a<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">}</span>     \n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>That obviously looks a lot cleaner than my example.  So what’s the problem?  Again, decorators are a <em>proposed</em> JavaScript feature.  Currently they’re in Stage 2, which means roughly that they are very likely to eventually make it into the language, but may change in non-trivial ways before that happens.  Currently decorators are implemented in <a href="https://www.typescriptlang.org/docs/handbook/decorators.html">TypeScript</a>, as well as a <a href="https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy">3rd party babel plugin</a>, but as of January 2017 <a href="http://kangax.github.io/compat-table/esnext/#test-class_decorators">are not implemented in any browser engines</a>, and are not implemented in any first party babel plugins <a href="https://github.com/babel/babel/issues/2645">due to spec instability</a>.  Decorators are a key part of Angular2, and are used by other frameworks including <a href="http://aurelia.io/">Aurelia</a> and <a href="https://github.com/rwjblue/ember-computed-decorators">Ember</a>, so I don’t think they’re going away.  But I also don’t see them as ready for production use for teams that don’t have the capacity to dedicate the time to update existing code if/when the spec changes<sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup>.  If for one reason or other you’re comfortable with the risks however, decorators are a great way to clean up the MobX API, and I’m excited for the spec to get to the point where I can use them.</p>\n<h3>Comparison to Redux and setState</h3>\n<p>As a state management library that was built to be used with React, the obvious questions to ask about MobX are how it improves over React’s built in state handling, and how it compares to <a href="http://redux.js.org/">Redux</a>, the current most popular state management solution for React. MobX takes a different approach to each.</p>\n<p>It’s important to say at the start that MobX isn’t mutually exclusive with using setState.  It’s possible to use them together, with MobX managing application data and setState handling individual component/UI state.  But there is some advantages to using MobX for UI state as well.  The biggest reason is that MobX is smarter than setState about when re-rendering is required.  By default React Components re-render on any call to setState, regardless of whether the state change actually affects what is rendered or not. MobX’s creator <a href="https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#.x0o6y4rxv">wrote more about this on Medium</a>.</p>\n<p>Comparing MobX and Redux could be a whole article on its own, so I’m not going to go too deep here, but suffice it to say that MobX is more flexible than Redux, but as a result loses some of the benefits of Redux’s structured approach.  Specifically, it is easy to convert a single object to become a MobX observable and use it in an existing React component.  It can be easily inlined in an existing file and used for one component even.  You also don’t have to deal with the ceremony of using <a href="http://benmccormick.org/2016/06/04/what-are-mutable-and-immutable-data-structures-2/">immutable data</a>.  Redux is intended as a solution that will take over all your state, and doesn’t scale down nearly as well or mix with other solutions <sup id="fnref-3"><a href="#fn-3" class="footnote-ref">3</a></sup>.  However, Redux’s structure also has benefits.  It allows easy testings of each component of an app individually, the creation of powerful tooling that will work with any Redux app, and reliable guarantees of how state will be updated.  These things are mostly possible with MobX <sup id="fnref-4"><a href="#fn-4" class="footnote-ref">4</a></sup>, but require more developer discipline, and/or can’t be written as easily as universal tools. Overgeneralizing, I would prefer Redux in a new application, but would look to MobX for improving data management in an existing application.  MobX also has advantages in applications where you’re displaying a large amount of UI elements based on a relatively small amount of data, or have a lot of derived data (something like a spreadsheet), whereas Redux has benefits for applications that need to be extremely reliable and well tested.  </p>\n<h3>Stray Thoughts</h3>\n<ul>\n<li>If you do want more discipline in MobX, make sure to use <code>useStrict</code> to require updates to use Actions</li>\n<li>MobX has a nice set of <a href="https://github.com/mobxjs/mobx-react-devtools">devtools</a> that are useful if you’re opting in to using actions, and using React with MobX.</li>\n<li>If this isn’t clear yet, I definitely recommend hacking around with Mobx’s low level APIs to learn more about how it works before integrating it straight into a framework</li>\n<li><del>Also note that MobX 3.0 is imminent, there is a release candidate that you can play with now.</del> <strong>Update:</strong> That didn’t take long.  <a href="https://medium.com/@mweststrate/mobx-3-released-unpeeling-the-onion-ca877382f443#.mk6mdypt2">MobX 3.0 is out</a>.</li>\n</ul>\n<h3>More Resources</h3>\n<ul>\n<li>\n<p>The two most helpful resources I found for conceptually understanding MobX were in-depth articles by the library’s author <a href="">Michael Westrate</a>: <a href="https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.jd4hgh2zi">Becoming fully reactive: an in-depth explanation of MobX</a> on Medium and <a href="https://mobx.js.org/intro/concepts.html">Concepts &#x26; Principles</a> from the MobX documentation</p>\n</li>\n<li>\n<p>This <a href="https://twitter.com/AdamRackis/status/775706291259908096">tweet thread</a> and the linked article, are a good breakdown of the tradeoffs between MobX and Redux</p>\n</li>\n</ul>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>Technically this also uses class properties as well, another proposal that works well with decorators</p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n<li id="fn-2">\n<p>It’s possible any spec changes will be trivially fixable with a code mod script, but right now there is more uncertainty than I am personally comfortable with.  I’m grateful to people who are willing to take more risks here than me, they push the language forward.</p>\n<a href="#fnref-2" class="footnote-backref">↩</a>\n</li>\n<li id="fn-3">\n<p>I’m talking here about what is encouraged and easy, not what is possible.  It is of course possible to mix in Redux with other solutions.</p>\n<a href="#fnref-3" class="footnote-backref">↩</a>\n</li>\n<li id="fn-4">\n<p>MobX has some nice <a href="https://github.com/mobxjs/mobx-react-devtools">devtools!</a></p>\n<a href="#fnref-4" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',
fields:{slug:"/2017/01/09/mobx-first-impressions/"}}}],topic:"Mobx"}}}});
//# sourceMappingURL=path---topics-mobx-5566fb4a4737ed123ead.js.map