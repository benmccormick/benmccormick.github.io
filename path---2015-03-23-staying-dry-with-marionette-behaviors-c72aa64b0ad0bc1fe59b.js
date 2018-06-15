webpackJsonp([0xdb0200a5177b],{768:function(n,a){n.exports={data:{markdownRemark:{html:'<p><em>This is the sixth post in a series on <a href="http://marionettejs.com/">Marionette.js</a>.  For more background on what Marionette is, check out the series page, <a href="http://benmccormick.org/marionette-explained/">Marionette Explained</a></em></p>\n<p>Any successful project draws complaints, and <a href="http://backbonejs.org/">Backbone.js</a> is a successful project by pretty much any measurement.  The biggest complaints I’ve heard leveled against Backbone as an MVC framework revolve around the boilerplate involved in writing Backbone apps.  The claim goes that Backbone forces you to write the same event binding and workflow code over and over again.  In general I’d claim that’s a feature of <em>bad</em> Backbone apps, and  not something unavoidable.  But it’s certainly true that Backbone doesn’t give you much guidance on how to reduce repetition and boilerplate in your code.  Making it easy to reduce repetition turns out to be one of the main roles of <a href="http://marionettejs.com/">Marionette</a>. This post is a look at one of the tools that Marionette provides to help you simplify your applications: the Behavior class.</p>\n<p>Marionette Behaviors are reusable chunks of UI logic that you can mix into your Views.  When you have a common problem that you face across several Views, Behaviors can help you reduce boilerplate and repetition.  We’ll take a look at a practical example first, and then we can get into the Behaviors API.  </p>\n<p>Let’s see how Behaviors can help us write better form validation code.  When I’m validating forms, I use the <a href="http://thedersen.com/projects/backbone-validation/">backbone.validation</a> library. It provides helpers for checking the validity of model properties and attaching error messages to inputs, but doesn’t force a specific workflow. However, I have a specific flow I usually want.  A user should be able to enter data as they see fit to start, with no validation warnings until they’ve tried to submit the form.  After they’ve initially submitted the form, warnings should appear next to any invalid fields, and they should update and disappear as the user fixes their input.</p>\n<p>That process is pretty easy to implement with backbone.validation.  I simply connect my Model to each form View I create, and in the Model I add some logic to re-validate each time the Model is changed, but only after the first time validation is triggered by a user submit.  That works great in most cases.  The problem comes when I need to re-render my view in the middle of this process.  This is a pretty common occurrence if your form has sub-views that may appear based on the contents of other parts of the form. In that case, I have to make sure that the validation state persists across renders.  That might look something like this. <sup id="fnref:1"><a href="#fn:1">1</a></sup></p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Mn <span class="token keyword">from</span> <span class="token string">\'marionette\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Validation <span class="token keyword">from</span> <span class="token string">\'backbone-validation\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> FormView <span class="token operator">=</span> Mn<span class="token punctuation">.</span>LayoutView<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\n    template<span class="token punctuation">:</span> <span class="token string">\'#form\'</span><span class="token punctuation">,</span>\n\n    ui<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        submit<span class="token punctuation">:</span> <span class="token string">\'.submit\'</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    events<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        <span class="token string">\'click @ui.submit\'</span><span class="token punctuation">:</span> <span class="token string">\'submitForm\'</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    modelEvents<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        <span class="token string">\'validated\'</span><span class="token punctuation">:</span> <span class="token string">\'setValidated\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    onRender<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">//any other post-render View code here</span>\n\n        Validation<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>validated<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>model<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    setValidated<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>validated <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    submitForm<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">//handle form submission</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>So it’s not that much code to add the functionality we want.  But when we need this code on multiple Views, adding and maintaining it becomes a pain quickly, creating the type of boilerplate that developers rage against.  So how can Behaviors help? It turns out to be easy to pull the functionality from our example out into a separate Behavior that any View can implement.  </p>\n<p>That would look something like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Mn <span class="token keyword">from</span> <span class="token string">\'marionette\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Validation <span class="token keyword">from</span> <span class="token string">\'backbone-validation\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> ValidationBehavior <span class="token operator">=</span> Mn<span class="token punctuation">.</span>Behavior<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\n    modelEvents<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        <span class="token string">\'validated\'</span><span class="token punctuation">:</span> <span class="token string">\'setValidated\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    onRender<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">//Set up any other form related stuff here</span>\n        Validation<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>view<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>hasBeenValidated<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>view<span class="token punctuation">.</span>model<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n\n    setValidated<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>hasBeenValidated <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> ValidationBehavior<span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>You could then pull the Behavior back into the View like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Mn <span class="token keyword">from</span> <span class="token string">\'marionette\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Validation <span class="token keyword">from</span> <span class="token string">\'backbone-validation\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> ValidationBehavior <span class="token keyword">from</span> <span class="token string">\'behaviors/validation\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> FormView <span class="token operator">=</span> Mn<span class="token punctuation">.</span>LayoutView<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\n    template<span class="token punctuation">:</span> <span class="token string">\'#form\'</span><span class="token punctuation">,</span>\n\n    ui<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        submit<span class="token punctuation">:</span> <span class="token string">\'.submit\'</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    events<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        <span class="token string">\'click @ui.submit\'</span><span class="token punctuation">:</span> <span class="token string">\'submitForm\'</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    behaviors<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        validation<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n            behaviorClass<span class="token punctuation">:</span> ValidationBehavior\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    submitForm<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">//handle form submission</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>We could do this for any number of Views that required validation.  The same thing can be done for many other types of functionality, including key-binding and “warn before delete”.</p>\n<h3>Behaviors API</h3>\n<p>Behaviors have essentially the same API as Marionette Views, because they’re meant to be extracted out of existing Views.  So the event hashes, ui elements, and life-cycle methods that you find on a Marionette View are all also available on Behaviors.  The life cycle functions on a Behavior execute immediately after their corresponding functions on the Behavior’s associated View. Behaviors also get <code>el</code>, <code>$el</code> and <code>$</code> properties that are proxied to the equivalent properties on the Behaviors view.</p>\n<p>Behaviors are not just mixins though. Behavior properties are isolated from the Views they’re associated with, preventing naming collisions and also encouraging reusable, decoupled designs.  Generally Behaviors don’t directly modify their associated Views or data.  The communication flow is one way, with Behaviors accepting input from their parent View in the form of an options object that is attached to the Behavior when it is created.  You can pass these options through using the behaviors hash on the View.  For instance to pass an error message to the validation behavior above, you could define your behaviors hash like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>    behaviors: {\n        validation: {\n            behaviorClass: ValidationBehavior,\n            errorMessage: \'You did something wrong.\'\n        }\n    },</code></pre>\n      </div>\n<h3>A quick note on how Behaviors attach to Views</h3>\n<p>You can see in the example above that the general form for attaching Behaviors to a View is to include a key-value pair for each Behavior, where the value is an object that lays out the options for the Behavior.  The interesting thing in the example above is that the name of the key doesn’t matter at all.  It’s not used by the library in any way; instead Marionette picks out the correct behavior to use based on the behaviorClass property in the value.  So why is the API structured like that?  To understand, you need to know that the Behaviors API supports two separate scenarios for looking up the correct Behaviors for a View.  </p>\n<p>The original API Marionette included for looking up Behaviors requires you to override a behaviorsLookup function on Marionette to tell the library where to retrieve your Behaviors from.  The keys of the behaviors hash on a view were passed to the lookup function, which then retrieved the Behavior classes from wherever the user chose to store them (probably a global namespace object).  </p>\n<p>That API works great for developers used to using namespaces to organize their code, but for developers using modern JavaScript module loaders, it introduces global state and indirection where it wasn’t needed.  To handle this case, the behaviorClass key was added as an option for the value object, allowing developers to specify Behaviors as dependencies of the file they were defining a View in, and then attach the Behavior directly to the View.  </p>\n<p>That makes much more sense for module users, but leads to a clunky API where the keys aren’t used.  Fortunately, in newer versions of Marionette you can get around this entirely, by defining your behaviors as an array on a view.  So the example above would look like:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>    behaviors: [{\n        behaviorClass: ValidationBehavior,\n        errorMessage: \'You did something wrong.\'\n    }]</code></pre>\n      </div>\n<p>This works due to an undocumented implementation detail in Marionette 2.4.1 <sup id="fnref:2"><a href="#fn:2">2</a></sup>, but will be <a href="https://github.com/marionettejs/backbone.marionette/pull/2368">fully supported</a> in future versions.  In future versions you also will be able to pass a class directly as an array item if the Behavior is not taking any arguments, further cleaning up the API.</p>\n<h3>When are Behaviors useful?</h3>\n<p>Marionette’s documentation explains Behaviors very broadly, which makes sense for official documentation since it gives ideas without limiting how users think about them.  But in my experience Behaviors are best used for three different use-cases.</p>\n<h4>Sharing common event handling logic</h4>\n<p>This is the most obvious use for Behaviors, and what the documentation focuses on.  It’s easy to set up common event based UI patterns like “warn on close” with behaviors.  But they also can be used for more complicated event based UI logic.  At Windsor Circle we use 2 behaviors to share common “drag and drop” code with a Droppable Behavior that can be implemented by a CollectionView and a Draggable Behavior for ItemViews.  That makes it simple to make any CollectionView based list sortable with drag and drop, and keeps the code in a nice central place where any improvements will be shared across the code base.</p>\n<h4>Sharing common life-cycle functions</h4>\n<p>In addition to event handling, Behaviors also give you access to the various <a href="http://benmccormick.org/2015/01/05/marionette-view-life-cycles/">life cycle</a> methods of Marionette Views.  That lets you split out common life cycle functionality and reduce code.  An easy example of this would be a Behavior that fades a View in each time by adding a css class with an animation associated with it.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>let FadeIn = Marionette.Behavior.extend({\n    onBeforeShow: function() {\n        this.$el.addClass(\'hidden fadein\');\n    },\n    onShow: function() {\n        this.$el.removeClass(\'hidden\');\n    }\n});</code></pre>\n      </div>\n<p>which would work with a CSS snippet like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>.fadein {\n  transition: opacity 1s;  \n  opacity: 1;\n}\n\n.fadein.hidden {\n    opacity: 0;\n}</code></pre>\n      </div>\n<h4>Simplifying integration with libraries</h4>\n<p>This final use case is a special case of the first 2, but I think its worth mentioning in its own\ncategory.  Many 3rd party Backbone or jQuery libraries require repetitive initialization code to use within a View.  This code is often the same across all Views, or only requires minor tweaks.  The perfect use case for a Behavior!  The Validation code above is one example of this, but it’s useful for many plugins.  For instance, if you use the <a href="http://harvesthq.github.io/chosen/">Chosen</a> jQuery plugin to create rich dropdown boxes, you could create a Behavior to automatically initialize select elements with Chosen, and optionally pass a class to restrict it to only initialize selects with a specific class.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>let UseChosen = Marionette.Behavior.extend({\n    onRender: function() {\n        let className = this.options.className,\n            chosenOptions = this.options.chosenOptions || {};\n        if(className) {\n            this.$(\'.${className}\').chosen(chosenOptions);\n        }\n        else {\n            this.$(\'select\').chosen(chosenOptions);\n        }\n    }\n});</code></pre>\n      </div>\n<h4>Wrap-Up</h4>\n<p>Behaviors are a great resource for avoiding repetition in your Backbone code.  If you have examples of good open-source Behaviors out there, please mention them in the comments.  I’d also love to hear what use cases you’ve found for them, even if the code isn’t public to share.</p>\n<h3>More Resources</h3>\n<ul>\n<li>Atomic Object has a <a href="http://spin.atomicobject.com/2014/09/11/marionette-behaviors-overview/">nice writeup</a> on Marionette Behaviors, and a <a href="http://spin.atomicobject.com/2014/09/12/testing-marionette-js-behaviors/">followup on testing them</a>.</li>\n<li>Behaviors seem to make the most sense to people when given examples of how you might use them.  One great open-source example is this <a href="https://github.com/behave-ui/behave-ui-hotkeys">key-binding Behavior</a> that makes it easy for you to add keyboard shortcuts to a View</li>\n</ul>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:1">\n        <p>\n        Going forward on this blog I\'m planning on using ES6 features in code examples where appropriate.  If the code looks weird to you check out <a href="https://babeljs.io/docs/learn-es6/">this nice summary of ES6 features</a>.    \n        </p>\n        <a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n    <li class="footnote" id="fn:2">\n        <p>\n        The latest version of Marionette at the time of writing.\n        </p>\n        <a href="#fnref:2" title="return to article"> ↩</a></p>\n    </li>\n</ol>\n</div>',frontmatter:{title:"Staying DRY with Marionette Behaviors",keywords:"Marionette.js behaviors JavaScript",category:"frameworks",date:"2015-03-23T04:04:17+00:00",path:"/2015/03/23/staying-dry-with-marionette-behaviors",layout:"post",hideFooter:null},fields:{slug:"/2015/03/23/staying-dry-with-marionette-behaviors"}}},pathContext:{slug:"/2015/03/23/staying-dry-with-marionette-behaviors",relatedPosts:[{path:"/marionette-explained",data:{title:"Marionette: Explained",path:"/marionette-explained",description:"A series of posts explaining Marionette.js",date:null}},{path:"/2015/09/09/what-can-backbone-developers-learn-from-react",data:{title:"Lessons Backbone Developers Can Learn From React",path:"/2015/09/09/what-can-backbone-developers-learn-from-react",description:"A look at the lessons that Backbone developers can learn from React",date:"2015-09-09T11:19:43+00:00"}},{path:"/2015/01/26/backbone-radio",data:{title:"Building Modular Web Apps With Backbone.Radio",path:"/2015/01/26/backbone-radio",description:"An overview of using Backbone.Radio in Marionette apps",date:"2015-01-26T12:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2015-03-23-staying-dry-with-marionette-behaviors-c72aa64b0ad0bc1fe59b.js.map