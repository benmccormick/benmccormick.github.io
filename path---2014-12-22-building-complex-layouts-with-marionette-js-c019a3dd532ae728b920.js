webpackJsonp([0x78b228043c20],{762:function(n,a){n.exports={data:{markdownRemark:{html:'<p><em>This is the third post in a series on <a href="http://marionettejs.com/">Marionette.js</a>.  For more background on what Marionette is, check out the first post in the series, <a href="http://benmccormick.org/2014/12/02/the-case-for-marionette-js/">The Case For Marionette</a>  Also note that this article was written about Marionette v2.  The current latest version of Marionette is v3, and while most of the high level concepts remain the same, the specific syntax has changed in some cases.</em></p>\n<p>When building complex web applications, many of the first decisions you have to make revolve around the structure and layout of your application. Most applications will have some static portions like navigations or footers, and some dynamic portions holding content or page specific controls.  A good layout manager will allow you to easily control these layouts, helping you keep structure consistent between pages and actions while swapping out content on changes in routes or data.  </p>\n<p>Backbone provides Views as a way of managing the display of a web app’s UI.  But it doesn’t provide any guidance on how you should use them to construct complex layouts.  Should you have one view per page and control the layout with templates and jQuery?  Use one View for each section of the page?  Or have a top level view that creates child views to manage different sections?  All of these are possible with Backbone, and none of them are particularly encouraged or discouraged by the library design.  In fact because Backbone doesn’t provide any consistent conventions for managing subviews, rendering content, or attaching rendered content to the DOM, even projects that take the same approach to managing layout might implement these patterns quite differently.</p>\n<p>In my <a href="http://benmccormick.org/2014/12/02/the-case-for-marionette-js/">first post</a>, I talked about how one of the strengths of Marionette is the way it helps remove many of the decisions that Backbone developers have to make for each project by providing components based on community-tested patterns.  Layout is another area where Marionette can give you a standardized solution.  Marionette does this by providing Regions and by making it easy to manage child Views.</p>\n<h3>Layout in Marionette</h3>\n<p>Regions are the primary tool Marionette provides for defining layouts.  A Region is a defined portion of the page, held within a root DOM element. You can swap different Views in and out of Regions, or show one View and let it stay there permanently.  Like everything in Backbone applications, Regions emit events, which allow you to design functionality that is triggered before or after a region’s content changes.  Regions map very well to low fidelity layout wireframes like the one below, but they also can be used for organizing smaller components.  They’re an organization tool for attaching and removing Views in a consistent way.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/marionette_regions-1-331a9e83c26d8624a64ca39ca049925c-4da0d.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 72.12953876349363%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAIAAACgpqunAAAACXBIWXMAABYlAAAWJQFJUiTwAAABPElEQVQoz5WQX0vCYBSH348XaLYtE7USosSwIiIvvOuqLxLun85qOSmom7qS7oK1uTn7FiHn7abz7p2bqSyFh7EdeM7v7EfeB28fjjv0x94o+BoHjh+4MV7geKPPYQS+x9iub9s2uex/18zJ8QM0nuD6ldZMqPcSTi047zPOrGR40oOqCVcvE5KRaVaGTAtEFSq3kG3BphyBc0mDUodRaLNPPs8psHEDdeuHSCogogLFNlw80h0dZsnrsK1FxENchH7zmRIMRAQlmm4pwCcpYFhOhoO7qSyGctlgW1aR8fgjM5QFlQXiheXOqslMvqcEf2bXgD0DimExc8kCR/kzT2RJS2qYk1Er6Gz1fpetFhbl9LN5ybgXn+JSOW67tCD/c/asvHZhwjQhry8pLEU+5G3zZPyxSneN5KpJfwHK4TFj7bg1hAAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Regions image"\n        title=""\n        src="/static/marionette_regions-1-331a9e83c26d8624a64ca39ca049925c-d766e.png"\n        srcset="/static/marionette_regions-1-331a9e83c26d8624a64ca39ca049925c-a6b6e.png 143w,\n/static/marionette_regions-1-331a9e83c26d8624a64ca39ca049925c-8e488.png 285w,\n/static/marionette_regions-1-331a9e83c26d8624a64ca39ca049925c-d766e.png 570w,\n/static/marionette_regions-1-331a9e83c26d8624a64ca39ca049925c-13239.png 855w,\n/static/marionette_regions-1-331a9e83c26d8624a64ca39ca049925c-cab6d.png 1140w,\n/static/marionette_regions-1-331a9e83c26d8624a64ca39ca049925c-71f14.png 1710w,\n/static/marionette_regions-1-331a9e83c26d8624a64ca39ca049925c-4da0d.png 2038w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Regions really shine when it comes to child Views.  When you’re setting up Views in a normal Backbone application, you have to be very careful to avoid memory leaks by replacing a view without properly destroying it, especially for long-running SPA style apps. If you’re properly cleaning up Views when they’re destroyed, another thing that Marionette can help with, Regions remove that pain by ensuring that a View is properly destroyed if replaced in a Region, removing boilerplate and the opportunity for subtle memory bugs.  They also provide a clean central way to attach child Views, making it easier to maintain consistency across a project and promoting readability when moving into different code.</p>\n<h3>LayoutView</h3>\n<p>Regions are great, but for the most part you’re not going to want to use them directly.  Instead, Marionette provides a special View class, LayoutView.  LayoutViews allow you to build View tree hierarchies.  You can have one top level View that controls the entire page, or a section of the page that your Marionette app lives in.  That root view can then contain Regions which you use to show child Views.  Some of those child Views may themselves be LayoutViews, and so on for as many levels as you like.  This setup allows you to create modular View classes with few responsibilities that you can easily replace or update without having to write a lot of boilerplate code.</p>\n<p>That’s the high level overview, but let’s dig into what the code looks like.  To use regions in a LayoutView, we don’t have to directly create them.  Instead we define a regions object that works similarly to the events object on normal Backbone Views.  The regions object takes a Region name as a key and a jQuery selector as a value, and then create Region objects for each key-value pair and attach them to the View.  If you need to do something more complicated you can create a regions function that returns an object with the key-value pairs that you would like.  Here’s an example of what a LayoutView might look like in practice.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> Mn <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'backbone.marionette\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> Radio <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'backbone.radio\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> FooterView <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'views/footer\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> HeaderView <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'views/header\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> IndexView <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'views/index\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> RootView <span class="token operator">=</span> Mn<span class="token punctuation">.</span>LayoutView<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\n  regions<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    header<span class="token punctuation">:</span> <span class="token string">\'#navbar\'</span><span class="token punctuation">,</span>\n    content<span class="token punctuation">:</span> <span class="token string">\'.content-area\'</span><span class="token punctuation">,</span>\n    footer<span class="token punctuation">:</span> <span class="token string">\'footer\'</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n  initialize<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    Radio<span class="token punctuation">.</span><span class="token function">channel</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">comply</span><span class="token punctuation">(</span><span class="token string">\'set:content\'</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span>contentView<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRegion</span><span class="token punctuation">(</span><span class="token string">\'content\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span>contentView<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n  onBeforeShow<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRegion</span><span class="token punctuation">(</span><span class="token string">\'header\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">HeaderView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRegion</span><span class="token punctuation">(</span><span class="token string">\'footer\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FooterView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRegion</span><span class="token punctuation">(</span><span class="token string">\'content\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">IndexView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>This is an example of a RootView that could be shown in a standalone Region and used as the top-level of a View hierarchy.  There are a few things to note about this example.  It defines 3 regions, a header and footer that render static Views, and a content area that originally contains an index View.  The initialize function uses Backbone.Radio to listen for commands and can swap out the View held in the content region when commanded. Those views could be swapped based on users navigating to a new route, with the routes initializing the Views and passing the commands, or based on a data change of some type.  We can also see that the child Views are shown within the onBeforeShow callback.  I’ll be discussing View life-cycle methods more in my next post, but for now just know that onBeforeShow runs immediately before a View is shown in a region.  You can use it when nesting your Views in order to make sure your Views are only attached to the DOM once, which prevents the browser from having to repaint the window multiple times.</p>\n<h3>It’s Turtles All The Way Down</h3>\n<p>The great thing about Marionette’s View system is that you can take the 3 Views I’ve gone over in my last 2 posts, ItemView, CollectionView, and LayoutView, and use them to represent pretty much any layout you’d like.  The basic rules: LayoutViews are used to structure the page into regions and regions into subregions. ItemViews are used to bind data to a UI, and CollectionViews are used to iterate over a Collection when each item in a Collection has complex data or behaviors associated with it and should be bound to an individual View or View tree<sup id="fnref:1"><a href="#fn:1">1</a></sup>. This consistency makes it easy to learn how to structure Marionette apps, and makes it simple for experienced Marionette developers to jump into a new project quickly and get their bearings.  That’s really the promise of Marionette in a nutshell: consistent patterns that allow for a better development experience.</p>\n<h3>More Resources</h3>\n<ul>\n<li>For more on nesting Marionette Views, you can check out <a href="https://www.youtube.com/watch?v=CTr-tTwRH3o">this talk</a> by Marionette core team member Sam Saccone.  It’s a quick 10 minute video covering much of the same stuff I went through here.</li>\n<li>I’ll talk more about this in a future post, but if you have a Marionette app and want to visualize your View hierarchy, <a href="https://github.com/marionettejs/marionette.inspector">Marionette Inspector</a> is a great new tool for debugging Marionette apps, and it’s primary developer, Jason Lastner gave a <a href="https://www.youtube.com/watch?v=jbGm3mJXh_s">great talk</a> describing how to use it at BackboneConf this week.</li>\n</ul>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:1">\n        <p>\n        Marionette also contains a 4th View type, CompositeView.  But it\'s essentially a helper for the case where you want to display a CollectionView inside a region of a LayoutView, and isn\'t strictly necessary.  Technically you can also use LayoutViews to replace ItemViews, but the semantic difference is useful for encouraging readability.\n        </p>\n        <a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n</ol>\n</div>',frontmatter:{title:"Building Complex Layouts With Marionette.js",keywords:"Marionette, Backbone, UI, Architecture, JavaScript",category:"frameworks",date:"2014-12-22T04:43:47+00:00",path:"/2014/12/22/building-complex-layouts-with-marionette-js",layout:"post",hideFooter:null},fields:{slug:"/2014/12/22/building-complex-layouts-with-marionette-js"}}},pathContext:{slug:"/2014/12/22/building-complex-layouts-with-marionette-js",relatedPosts:[{path:"/marionette-explained",data:{title:"Marionette: Explained",path:"/marionette-explained",description:"A series of posts explaining Marionette.js",date:null}},{path:"/2015/09/09/what-can-backbone-developers-learn-from-react",data:{title:"Lessons Backbone Developers Can Learn From React",path:"/2015/09/09/what-can-backbone-developers-learn-from-react",description:"A look at the lessons that Backbone developers can learn from React",date:"2015-09-09T11:19:43+00:00"}},{path:"/2015/04/07/es6-classes-and-backbone-js",data:{title:"Why Backbone.js and ES6 Classes Don't Mix",path:"/2015/04/07/es6-classes-and-backbone-js",description:"A rundown of the challenges of using ES6 classes in Backbone",date:"2015-04-07T03:19:44+00:00"}}]}}}});
//# sourceMappingURL=path---2014-12-22-building-complex-layouts-with-marionette-js-c019a3dd532ae728b920.js.map