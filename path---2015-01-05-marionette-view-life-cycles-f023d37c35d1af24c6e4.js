webpackJsonp([0x635f8ccc9497],{669:function(e,t){e.exports={data:{markdownRemark:{html:'<p><em>This is the fourth post in a series on <a href="http://marionettejs.com/">Marionette.js</a>, a framework for developing apps with <a href="http://backbonejs.org/">Backbone.js</a>.  For more background on what Marionette is, check out the series page: <a href="http://benmccormick.org/marionette-explained/">Marionette Explained</a>  Also note that this article was written about Marionette v2.  The current latest version of Marionette is v3, and while most of the high level concepts remain the same, the specific syntax has changed in some cases.</em></p>\n<p>When building Single Page Applications, it’s important to manage UI components throughout their existence on the page, making sure they’re properly created, attached, and destroyed.  Marionette.js helps Backbone developers manage that by providing life cycle methods that developers can use when defining their Views.  These life cycle functions fit nicely with the rest of Marionette’s features, and can help simplify UI development with Backbone.</p>\n<p>Building scalable user interfaces is hard.  It’s a challenge that sits at the intersection of fields requiring very different skill sets: Software Development, Graphic Design, User Experience and Information Architecture.  Because interface code is concerned with both presentation and interaction logic and is exposed directly to user input, it can be difficult to reason about.  Fortunately, as modern web developers, we have 30+ years of industry knowledge to fall back on.  One lesson learned is the value of Object Oriented Programming concepts in UI design; specifically, the idea of breaking interfaces into a set of independent components, and giving each component a consistent “life cycle”, a set of events that occur between a component’s creation and destruction.</p>\n<p>Having a clear life cycle for UI components makes a developer’s life easier in a few ways:  It eases the process of reasoning about changes in a component over time, and how it interacts with other elements of the UI.  It creates consistent hooks to add behaviors, which promotes readability and reduces boilerplate code.  Finally, it smooths integrations with outside code that may need to be run when the component is in a specific state, without needing a bunch of conditional logic to detect when it should run.  Marionette Views provide a life cycle for Backbone Views that help give all of these benefits.</p>\n<p>The Marionette View life cycle is made up of a list of events and conventions.  Events are fired at each signficant step in a View’s life cycle.  Each event has a corresponding View method associated with it that Marionette automatically runs when the event is fired. These events and callbacks follow a consistent naming convention.  An event that occurs before a moment in the life cycle is fired in the form <code>before:&#x3C;eventname></code> and the callback is called <code>onBeforeEventName</code>. An event that is fired after the same moment in the life cycle will have the form <code>eventname</code> and the callback will be called <code>onEventName</code>.  By default the callback functions for each event do nothing, but developers can overwrite them to define behavior for a specific View instance.  For instance, defining the callback functions for the <code>render</code> and <code>before:render</code> events on a new View would look like this.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> ExampleView <span class="token operator">=</span> Mn<span class="token punctuation">.</span>ItemView<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\n    onRender<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// do stuff after the View is rendered</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    onBeforeRender<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// do stuff before the View is rendered</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Render is only one of the relevant moments in a View’s life cycle.  This is the full list of relevant methods and events, with a brief explanation of how each one might be used.</p>\n<h4>Initialize</h4>\n<p>The first function in a View’s life cycle is <code>initialize</code>. <code>initialize</code> isn’t a Marionette-specific method. It’s part of Backbone, but it’s important to make sure you understand where it fits into the View’s life.  Backbone provides two functions that are run when a View is instantiated, <code>constructor</code> and <code>initialize</code>.  <code>constructor</code> is used for Backbone and Marionette’s internal setup, and shouldn’t normally be overridden.  <code>initialize</code> is the suggested function for defining behavior on View setup.  It’s a great place for setting up event listeners, and allows workings directly with the options passed to the View on creation <sup id="fnref:1"><a href="#fn:1">1</a></sup>. Unlike the other methods on this list, <code>initialize</code> only provides a single method with no associated event.</p>\n<h4>onRender/onBeforeRender</h4>\n<p>The second step in the Marionette View life cycle is the render step, which exposes two events <code>render</code> and <code>before:render</code>, corresponding to the <code>render</code> and <code>onBeforeRender</code> callbacks.  These events fire before and after the View template is rendered.  In a Marionette View, rendering means that the View has generated a fragment of HTML, but it may or may not be visible or attached to the DOM.  onRender is useful for any direct manipulation of the generated HTML that doesn’t require it to be visible or attached to the DOM.</p>\n<h4>onAttach/onBeforeAttach (Marionette 2.3+)</h4>\n<p>After rendering, the next set of events that might fire in a Marionette View’s life cycle is <code>before:attach</code> and <code>attach</code>.  These events are fired whenever showing a View in a region causes it to be attached to the DOM.  Because Views can be rendered independently of Regions, and some Regions may not be attached to the DOM when a View is shown, this event may not always be fired immediately (or at all).  But if you’re using Regions to render all your Views, it can be very useful for setting up jQuery plugins or other operations that require HTML to be attached to the DOM before being acted on.  A nice aspect of the attach events is that they will propagate down a tree of LayoutViews if you’ve set up a View hierarchy as described in <a href="http://benmccormick.org/2014/12/22/building-complex-layouts-with-marionette-js/">my last post</a>, so you can count on the event firing even if you build the View tree and then attach the top View to the DOM later.</p>\n<h4>onShow/onBeforeShow</h4>\n<p>Another Region-specific set of events, <code>show</code> and <code>before:show</code> fire before and after a View is shown within a region.  These events are great for rendering child Views.  The Marionette docs recommend using <code>onBeforeShow</code> specifically for rendering children, since it allows for only a single DOM paint when rendering nested Views, and prevents attach events from firing multiple times, which might happen if the child Views are attached to the parent after the parent View has already been shown.</p>\n<h4>onDomRefresh</h4>\n<p>The <code>dom:refresh</code> event is the last Region-specific event  It’s triggered after an already shown View is rerendered.  Like onAttach, this can be useful for managing UI plugins that manipulate the DOM, if they need to be reinitialized when the HTML tree is refreshed. It differs from <code>onRender</code> in that it will not run the first time the View is rendered, and you can count on the View always being attached to the document when it fires.  So if an operation requires the View to be attached to the DOM, you can run any initial logic in <code>onShow</code>, and then put any refresher logic into an <code>onDomRefresh</code> callback.  If you’re running Marionette 2.3 or later though, onDomRefresh is less useful because onAttach provides similar functionality in a more consistent way.</p>\n<h4>onBeforeAddChild/onBeforeRemoveChild/onAddChild/onRemoveChild (CollectionView Only)</h4>\n<p>CollectionViews get their own special life-cycle events to manage adding and removing Models to the Collection.  CollectionViews automatically display a new ChildView when a Model is added to its Collection, and destroy the View when the Model is removed.  They fire events before and after each of these changes, to allow you to customize the behavior around each.  You could for instance hide specific Views if necessary. You could also modify them based on some logic, though that type of thing may be more appropriate within the child View’s code itself.</p>\n<h4>onDestroy/onBeforeDestroy</h4>\n<p>The final Marionette life-cycle event set is <code>destroy</code> and <code>before:destroy</code>.  Appropriately, these events are fired when a View is destroyed and serve as a place to handle any custom cleanup.  The most common use case for these functions is unbinding any events not covered by Marionette’s built-in event cleanup<sup id="fnref:2"><a href="#fn:2">2</a></sup>. It’s worth noting that you cannot use <code>onBeforeDestroy</code> to prevent the View being destroyed.  The Marionette team’s position here is basically that you should not call destroy directly on any View you don’t want destroyed.  If you’re swapping a View out of a region but don’t want it to be destroyed, Marionette provides a <code>preventDestroy</code> option to its show method that allows you to preserve the existing View.</p>\n<h3>Cogs In A Machine</h3>\n<p>The nice thing about Marionette’s View life cycles is the consistency it shares with the rest of Marionette.  The life cycles are built to work with the Region and Layout system I described in my last post.  If you lay out your Views using the system described in that post, you’ll be able to take advantage of all of the above functions consistently across your application.  Regions themselves have similar life cycle methods, with callbacks that run before and after showing Views, swapping Views and emptying the region. Finally, Marionette Applications, the object that Marionette uses to initialize the app, also has a single set of life-cycle events, <code>onStart</code> and <code>onBeforeStart</code> that can be hooked into when setting up your application.  This sense of cohesiveness in a set of components that share conventions makes Marionette easy to learn without obscuring what happens with the type of magic you see in other frameworks.</p>\n<h3>Take What You Need</h3>\n<p>Like everything else in Marionette and Backbone, life cycles are a pattern that you can choose to use or ignore.  If you want to define your own way of managing a Views life cycle, it’s perfectly possible to do so.  But the advantages provided by Marionette’s implementation are quite nice.  It presents a simple mental model of what occurs to a View over time, fits in with the other patterns provided by Marionette, and doesn’t require any extra boilerplate when you choose not to use them.  I personally use some of these methods a lot, and have never used a few of them at all.  But it’s helpful to know what is available so that you can keep that simple model of how a View changes over time and choose the appropriate hook for any given View code.  Code is scalable when you can take a few simple concepts and use them repeatedly to build up to something big.  That’s what Marionette can do for you.</p>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:1">\n        <p>\n        Marionette also exposes those options later using the <code>view.getOption()</code> method\n        </p>\n        <a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n    <li class="footnote" id="fn:2">\n        <p>\n        Marionette cleans up events created through its event hash objects, and any defined using listenTo.  But any custom eventing stuff you do will need to be cleaned up directly\n        </p>\n        <a href="#fnref:2" title="return to article"> ↩</a></p>\n    </li>\n</ol>\n</div>',frontmatter:{title:"The Life of a Marionette View",keywords:"Marionette.js JavaScript Backbone Views life cycle",category:"frameworks",date:"2015-01-05T04:01:45+00:00",path:"/2015/01/05/marionette-view-life-cycles",layout:"post",hideFooter:null},fields:{slug:"/2015/01/05/marionette-view-life-cycles"}}},pathContext:{slug:"/2015/01/05/marionette-view-life-cycles",relatedPosts:[{path:"/marionette-explained",data:{title:"Marionette: Explained",path:"/marionette-explained",description:"A series of posts explaining Marionette.js",date:null}},{path:"/2015/09/09/what-can-backbone-developers-learn-from-react",data:{title:"Lessons Backbone Developers Can Learn From React",path:"/2015/09/09/what-can-backbone-developers-learn-from-react",description:"A look at the lessons that Backbone developers can learn from React",date:"2015-09-09T11:19:43+00:00"}},{path:"/2015/01/26/backbone-radio",data:{title:"Building Modular Web Apps With Backbone.Radio",path:"/2015/01/26/backbone-radio",description:"An overview of using Backbone.Radio in Marionette apps",date:"2015-01-26T12:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2015-01-05-marionette-view-life-cycles-f023d37c35d1af24c6e4.js.map