webpackJsonp([0x939ee64a377f],{678:function(n,e){n.exports={data:{markdownRemark:{html:'<p><em>This is the fifth post in a series on <a href="http://marionettejs.com/">Marionette.js</a>.  For more background on what Marionette is, check out the series page, <a href="http://benmccormick.org/marionette-explained/">Marionette Explained</a></em></p>\n<p>One of the great things about Backbone is how it encourages a modular approach to building UIs.  Different portions of the pages are separated into individual Views, allowing you to simplify your reasoning about your code by focusing on bite-sized chunks at a time.  Easier said than done though, right?  In practice, it’s not hard to create Backbone applications with large views that have tight dependencies on each other.  This usually isn’t an intentional decision, but part of a slow decay as developers work to connect the various aspects of their applications.  </p>\n<p>So far in this series I’ve talked about how Marionette makes it easier to create maintainable Views.  Now I’m going to look at <a href="https://github.com/marionettejs/backbone.radio">Backbone.Radio</a>, Marionette’s tool for communication between application components.</p>\n<h3>What’s so hard about modular architecture?</h3>\n<p>There are many advantages to designing your web UI in a modular or component-based fashion.  Your code tends to be easier to reason about and test, it’s easier to swap out one piece of code for another, and it greatly increases the chances that you’ll be able to reuse your code in other places.  Unfortunately for all except the most basic applications, different components of a UI always have to be aware of the things that happen in other areas of the UI.  It may be something simple like responding to a button click by showing a modal, or more complicated like updating multiple dashboard items when the user applies a filter, but these connections will exist.  At this point you have options.  You can begin having components reference each other directly for example, or you could try to capture state within a shared data object that each component watches.  But there’s another solution that borrows from many years of development best practice on backend systems.  You can use a message bus.</p>\n<h3>A simple Message Bus</h3>\n<p>A message bus is a software architecture model for communicating between two systems.  The idea is that instead of referencing each other directly, system components are able to send messages through a shared mediator object.  It’s quite straightforward to create a simple message bus using Backbone.  </p>\n<p>Backbone.Events is Backbone’s event object, which gets mixed into the various Backbone classes to provide the Backbone event functions (<code>on</code>, <code>off</code>, <code>listenTo</code>, <code>trigger</code>, etc).  It’s easy and common to mix it into a separate object.  That’s all you need to create a message bus: something like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> mediator <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>Backbone<span class="token punctuation">.</span>Events<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Now Models and Views can listen to or trigger events on the mediator object, allowing them to communicate without having to be directly aware of each other.  This is a great pattern, and quite useful as is, but there are some limitations.  With a mediator object, all events are global.  Any object can listen to any event, and you have to be careful to avoid naming collisions when using common terms.  It’s also a single object for multiple types of communication.</p>\n<h3>The Backbone.Radio API</h3>\n<p>Backbone.Radio builds on this concept to provide a more powerful message bus.  Instead of a single object, Radio provides multiple “channels” each of which can correspond to a page or functional section of your web app. Also, instead of a single events API, Radio provides three, Events, Commands, and Requests, each built for a different use case.  </p>\n<h4>Events</h4>\n<p>Radio Events are the exact same as our simple message bus.  When you create a channel with Radio, they extend Backbone.Events.  That means you can call any Backbone.Events function on them, or pass them to the <code>listenTo</code> method of other Backbone objects.  Events provide Radio’s publish-subscribe functionality.  Multiple objects can subscribe to an event using <code>on</code> or <code>listenTo</code>.  And any object can publish an event using <code>trigger</code>.  For those of you unfamiliar with Backbone’s events, they have two features that you might not expect.  First, unlike native browser events or jQuery events, Backbone events are synchronous; when you trigger an event, all callbacks that are registered on that event run immediately.  Second, it’s easy to pass data with Backbone events.  Unlike native browser events which tend to simply consist of an event and a target, any data you pass when you trigger an event gets passed directly to the callback function, making it a true messaging system.</p>\n<p><img src="/events-b0d8f4148e5c2054b5aa69db422ca94a.svg" alt="events diagram"></p>\n<p><strong>Functions Provided</strong> - <code>on</code>, <code>off</code>, <code>trigger</code>, <code>once</code>, <code>listenTo</code>, <code>listenToOnce</code>, <code>stopListening</code></p>\n<h4>Commands</h4>\n<p><strong>Update January 2016</strong> - <em>During 2015, Commands were deprecated from Backbone.Radio as part of their 1.0.0 release.  From a code level, they’re simply a request that doesn’t return a value, so feel free to keep any existing code, but change command to request and comply to reply</em></p>\n<p>Radio Commands are similar to Events, with the distinction that only a single callback can handle or “comply” to a given command.  Commands do not add any functionality on top of events; instead, they provide a semantic distinction and enforce simpler logic.  When <code>exampleChannel.command(\'something\')</code> is called, you know that it is requesting an action be performed, and you can be confident that there will be no side effects.  Only one object will comply to the command.  Commands are a maintenance-friendly tool; they make your code easier to follow by doing less and doing it more obviously.</p>\n<p><img src="/commands-0d940b905285467c9345d4608fafbaa2.svg" alt="commands diagram"></p>\n<p><strong>Functions Provided</strong> - <code>comply</code>, <code>stopComplying</code>, <code>command</code>, <code>complyOnce</code></p>\n<h4>Requests</h4>\n<p>Radio Requests share the one-to-one nature of Commands, but provide functionality not seen in Backbone.Events.  You can use Requests to retrieve information from other objects.  Each request can be serviced by a single response callback, with the request receiving the return value of the callback function.  This is very useful for providing resources in a decoupled manner, where a View or other object doesn’t have to know the details of how an object is stored or retrieved.</p>\n<p><img src="/requests-1c9139c16fb2e5f48ac88fba8a3f8116.svg" alt="requests diagram"></p>\n<p><strong>Functions Provided</strong> - <code>reply</code>, <code>stopReplying</code>, <code>request</code>, <code>replyOnce</code></p>\n<h4>Channels</h4>\n<p>Radio Channels are a method of segmenting out your messaging across functions.  Instead of holding every event inside a global namespace, objects can interact with a Channel that’s limited to the functionality they need.  This minimizes the chances of naming collisions across the app, and provides additional semantic guidance for future readers of the code.  It’s much easier to trace through small, focused messaging networks than a large, global one when you’re trying to understand a complex behavior.</p>\n<h3>Backbone.Radio in practice</h3>\n<p>Radio’s API is fairly small and simple.  Its power comes from the development patterns it enables.  The following are examples from my own code of how Radio assists in building modular testable UI code.</p>\n<h4>Decouple your Views with Radio Events</h4>\n<p><a href="http://en.wikipedia.org/wiki/Loose_coupling">Loose coupling</a> is one of the most commonly cited design principles in Object Oriented Programming.  In Backbone, loose coupling can be applied to mean that your Views should know as little about each other as possible.  In my own work I implement this by allowing Views to know about and reference their own child Views, but do not allow them to directly reference any other Views.  If Views need to communicate up or across a tree of Views, I use Radio.</p>\n<p>Radio Events are great for alerting other parts of the application about a change of state.  For instance, in an application where we have a main content area and a sidebar that provides context for the main area (for instance, a mail app like Gmail that shows contact info in the sidebar next to an open email), we could use Radio Events to keep our sidebar in sync with the main content.  That might look something like this.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> Mn <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'backbone.marionette\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> Radio <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'backbone.radio\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> inboxChannel <span class="token operator">=</span> Radio<span class="token punctuation">.</span><span class="token function">channel</span><span class="token punctuation">(</span><span class="token string">\'inbox\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> ContactView <span class="token operator">=</span> Mn<span class="token punctuation">.</span>ItemView<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\n    template<span class="token punctuation">:</span> <span class="token string">\'#contact-template\'</span><span class="token punctuation">,</span>\n\n    initialize<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">listenTo</span><span class="token punctuation">(</span>inboxChannel<span class="token punctuation">,</span> <span class="token string">\'show:email\'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>showContact<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">listenTo</span><span class="token punctuation">(</span>inboxChannel<span class="token punctuation">,</span> <span class="token string">\'show:inbox\'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>showAd<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    showContact<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>emailObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">//show the contact for the emailObject</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    showAd<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">//when we don\'t have a contact to show, show an ad instead</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> ContactView<span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Note that our sidebar View doesn’t need to know anything about the inbox area.  The <code>show:email</code> event could be fired by our inbox view, by a navigation View, or by our router on page load.  The sidebar doesn’t know and doesn’t care.  </p>\n<p>It’s also important to note that the event represents a change in state external to our component.  Something else changed (the state of the inbox), and the sidebar component is reacting to this.  There might be many coponents that react to this state change, or just this one.  Our View doesn’t know or care.</p>\n<h4>Centralize UI Logic with Commands</h4>\n<p>While Events are a way of notifying other components about a change in state, commands are useful when you want to cause a change in state without having to know the implementation.  For instance, in an application that I work on, we have a centralized event-logging module that can take application events that we want logged and send them to a backend API and also to Google Analytics.  We use commands for this.  In practice the logging module looks a bit like this.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> Radio <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'backbone.radio\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Send event to the backend API and Google Analytics</span>\n<span class="token punctuation">}</span>\n\nRadio<span class="token punctuation">.</span><span class="token function">channel</span><span class="token punctuation">(</span><span class="token string">\'appEvents\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">comply</span><span class="token punctuation">(</span><span class="token string">\'log\'</span><span class="token punctuation">,</span>log<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Then we can run <code>Radio.channel(\'appEvents\').command(\'log\', event)</code> anywhere we want to log an application event.  We could use events for this, but there’s value in using commands.  We’re explicitly saying that we want our application to log a specific piece of data, whereas a similar event would have the connotation that an event had occured, and anything that wanted to respond to it could.  We can be more confident of what’s happening here.</p>\n<h4>Share Resources Across Nested Views with Requests</h4>\n<p>One of the challenges of nested View architectures like Marionette or ReactJS is deciding how to pass data down to deeply nested View components.  One approach is to pass all necessary data into the top level view and then pass it down along the View tree to whatever View needs it.  That has the advantage of a clear data flow, but the disadvantage of cluttering up parent Views with data they don’t need and tightly coupling the parent Views to the implementation of their children.  Another approach is simply making the data available globally, which has all the disadvantages that global data normally brings.  Radio requests provide a nice solution to this problem.  You can define “data providers” that are responsible for providing any data you need that is not passed directly down a view chain. These could be separate modules similar to Angular’s service objects.  They could be other UI components like a datepicker.  Or they could just be models and collections you define at the root of your application but don’t pass directly to your Views.  In the same application as above, I have a set of task views that can have users assigned to them.  Because these tasks are deeply nested in the UI, I don’t pass the collection of possible Users to assign down the View tree.  Instead, I define that collection within my top level application object and then request it when the user opens up the user-picker View.  I use jQuery deferreds to make sure that the collection has been populated before the picker appears.  That all looks something like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//in app.js</span>\n<span class="token keyword">var</span> usersDeferred <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">UserCollection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nresourceChannel<span class="token punctuation">.</span><span class="token function">reply</span><span class="token punctuation">(</span><span class="token string">\'userlist\'</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> usersDeferred<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//in task.js</span>\n<span class="token keyword">var</span> usersDeferred <span class="token operator">=</span> resourceChannel<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token string">\'userlist\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nusersDeferred<span class="token punctuation">.</span><span class="token function">done</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>showUserPicker<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h3>A Quick Note on Backbone.Radio and Marionette</h3>\n<p>Those of you who have used Marionette before may be a bit confused as to why this post is part of my Marionette article.  As of version 2.3, the current shipping version of Marionette, Radio is not distributed as part of the library.  Marionette instead ships with <a href="https://github.com/marionettejs/backbone.wreqr">Backbone.Wreqr</a> as its message bus implementation.  Wreqr is a precursor to Radio with a significantly more confusing API.  Radio provides a cleaner approach, as well as a more intuitive name.  However, because Marionette follows semantic versioning, they’re waiting for 3.0 to make Radio the default.</p>\n<p>In the meantime, though, it’s easy to replace Wreqr with Radio.  You can simply make sure that you’re loading in Radio instead of Wreqr, and then implement the following <a href="https://gist.github.com/thejameskyle/48afb443b8c8c6ee4f46">shim</a>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>(function(root, factory) {\n  if (typeof define === \'function\' && define.amd) {\n    define([\'backbone.marionette\', \'backbone.radio\', \'underscore\'], factory);\n  } else if (typeof exports !== \'undefined\') {\n    module.exports = factory(require(\'backbone.marionette\'), require(\'backbone.radio\'), require(\'underscore\'));\n  } else {\n    factory(root.Backbone.Marionette, root.Backbone.Radio, root._);\n  }\n}(this, function(Marionette, Radio, _) {\n  \'use strict\';\n\n  Marionette.Application.prototype._initChannel = function () {\n    this.channelName = _.result(this, \'channelName\') || \'global\';\n    this.channel = _.result(this, \'channel\') || Radio.channel(this.channelName);\n  }\n}));</code></pre>\n      </div>\n<p>It’s also worth pointing out that Radio has no direct dependency on Marionette, and can be used on any Backbone project.  For example, it might be an interesting tool to implement a Flux-style dispatcher in an application using Backbone and React. All of the benefits Radio provides can help any application with decoupled View components.</p>\n<p><strong>Thanks to the Marionette Teams for the diagrams above, which come directly from the Backbone.Radio <a href="https://github.com/marionettejs/backbone.radio">README</a>.</strong></p>\n<h3>More Resources</h3>\n<ul>\n<li>Although it’s focused on Node and backend use cases, <a href="https://www.youtube.com/watch?v=rWz8OoVuDls">this video</a> is a great rundown of semantic messaging patterns.</li>\n</ul>',frontmatter:{title:"Building Modular Web Apps With Backbone.Radio",keywords:"Backbone, JavaScript, Backbone Radio, Marionette, messaging",category:"frameworks",date:"2015-01-26T12:00:00+00:00",path:"/2015/01/26/backbone-radio",layout:"post",hideFooter:null},fields:{slug:"/2015/01/26/backbone-radio"}}},pathContext:{slug:"/2015/01/26/backbone-radio",relatedPosts:[{path:"/marionette-explained",data:{title:"Marionette: Explained",path:"/marionette-explained",description:"A series of posts explaining Marionette.js",date:null}},{path:"/2015/09/09/what-can-backbone-developers-learn-from-react",data:{title:"Lessons Backbone Developers Can Learn From React",path:"/2015/09/09/what-can-backbone-developers-learn-from-react",description:"A look at the lessons that Backbone developers can learn from React",date:"2015-09-09T11:19:43+00:00"}},{path:"/2015/04/07/es6-classes-and-backbone-js",data:{title:"Why Backbone.js and ES6 Classes Don't Mix",path:"/2015/04/07/es6-classes-and-backbone-js",description:"A rundown of the challenges of using ES6 classes in Backbone",date:"2015-04-07T03:19:44+00:00"}}]}}}});
//# sourceMappingURL=path---2015-01-26-backbone-radio-6fb398c1a910de6b79fb.js.map