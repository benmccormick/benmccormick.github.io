webpackJsonp([0xa24cce9d251],{768:function(n,a){n.exports={data:{markdownRemark:{html:'<p><a href="http://backbonejs.org/">Backbone.js</a> is a great way to structure web applications.  Its built in Models, Collections, Views and Routers are a very reasonable “minimum common ground” that pretty much any web project will be able to put to good use.  But more sophisticated applications have needs that extend beyond these basic concepts.  In addition to having some data that needs to be displayed, rich web apps often have resources and functionality that need to be shared across many different Views and Models.  There’s no definitive way to implement this consistently, but a common pattern is to create “services” of some type that Views and Models can communicate with.   </p>\n<p>This pattern is easiest to show with an example.  Let’s take a look at a simple logging implementation.  We might start out just using simple console commands throughout our code like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">doFoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Do a thing</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'We did Foo\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>That’s fine for a while, but what if we wanted to switch to a logging library like <a href="http://js.jsnlog.com/">JSNLog</a> or some 3rd party service?  We’d have a huge find and replace job to work through.  It’s better to centralize.  <a href="https://github.com/marionettejs/backbone.radio">Backbone.Radio</a> is perfect for this purpose.  We can use it to centralize our logic and create a logging module:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Radio <span class="token keyword">from</span> <span class="token string">\'backbone.radio\'</span>\n\n<span class="token keyword">let</span> loggingChannel <span class="token operator">=</span> Radio<span class="token punctuation">.</span><span class="token function">channel</span><span class="token punctuation">(</span><span class="token string">\'log\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nloggingChannel<span class="token punctuation">.</span><span class="token function">comply</span><span class="token punctuation">(</span><span class="token string">\'log\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nloggingChannel<span class="token punctuation">.</span><span class="token function">comply</span><span class="token punctuation">(</span><span class="token string">\'logError\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nloggingChannel<span class="token punctuation">.</span><span class="token function">comply</span><span class="token punctuation">(</span><span class="token string">\'logWarning\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>We could then log a message like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">doFoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Do a thing</span>\n  loggingChannel<span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">\'log\'</span><span class="token punctuation">,</span> <span class="token string">\'We did Foo\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>There are 2 main use cases for this sort of service pattern: centralizing common tasks and UI actions like logging or displaying an alert, and requesting a resource without having to worry about where it came from.  Both are easily possible using Backbone Radio, using code very similar to whats above.</p>\n<p>Using Backbone Radio like this is a useful pattern, but it’s very ad hoc and imperative.  Not very Backbone-like.  What if we could follow the Marionette route of pulling a useful pattern into an object and allow it to be configured declaratively?  We could instead create a “Service Object” like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Mn <span class="token keyword">from</span> <span class="token string">\'backbone.marionette\'</span>\n\n<span class="token keyword">let</span> LoggingService <span class="token operator">=</span> Mn<span class="token punctuation">.</span>Service<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\n    radioCommands<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        <span class="token string">\'log log\'</span><span class="token punctuation">:</span> <span class="token string">\'logMessage\'</span><span class="token punctuation">,</span>\n        <span class="token string">\'log logError\'</span><span class="token punctuation">:</span> <span class="token string">\'logError\'</span><span class="token punctuation">,</span>\n        <span class="token string">\'log logWarning\'</span><span class="token punctuation">:</span> <span class="token string">\'logWarning\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    logMessage<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    logError<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n    logWarning<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> logger <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LoggingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>This is much more in the Backbone and Marionette style, with a declarative hash to delegate to different functions based on channels and the events passed.  It makes it much easier to create “service objects” to make functionality available in a decoupled way.</p>\n<p>Declarative radio handling will be <a href="https://github.com/marionettejs/backbone.marionette/pull/2431">coming to Marionette Core</a> as part of Marionette version 3, but for now I’ve written a small library to make it available in the short term.  </p>\n<p><a href="https://github.com/benmccormick/marionette-service">marionette-service</a> provides the above Service Object to Marionette.  It allows you to listen to Radio Events, Commands or Requests, and associate them with callback functions.  It’s compatible with plans for Marionette v3, so all that will be required to remove it when upgrading will be a name change for service objects to use Marionette.Object rather than Marionette.Service. I’m excited to see how people use it.</p>\n<p>Marionette-service is available to install both on <a href="https://www.npmjs.com/package/marionette-service">npm</a>, and <a href="http://bower.io/search/?q=marionette%20service">bower</a>.  Or you can clone the repo directly from <a href="https://github.com/benmccormick/marionette-service">Github</a>.</p>\n<h3>More Resources</h3>\n<ul>\n<li>If you’re new to Backbone.Radio you can learn more about it from <a href="http://benmccormick.org/2015/01/26/backbone-radio/">my post</a>, or from the <a href="https://github.com/marionettejs/backbone.radio">official docs</a>.</li>\n<li>If you’re confused why somebody would want to separate out the implementation of a service through Radio rather than passing a service object directly, <a href="http://arguments.callee.info/2009/05/18/javascript-design-patterns--mediator/">this is a nice piece by HB Stone</a> on the power of loose coupling and the Mediator Pattern</li>\n</ul>',frontmatter:{title:"marionette-service: Service Objects for Marionette",keywords:"Marionette JavaScript marionette-service services Backbone Radio",category:"frameworks",date:"2015-05-25T14:02:00+00:00",path:"/2015/05/25/marionette-service-service-objects-for-marionette",layout:"post",hideFooter:null},fields:{slug:"/2015/05/25/marionette-service-service-objects-for-marionette"}}},pathContext:{slug:"/2015/05/25/marionette-service-service-objects-for-marionette",relatedPosts:[{path:"/marionette-explained",data:{title:"Marionette: Explained",path:"/marionette-explained",description:"A series of posts explaining Marionette.js",date:null}},{path:"/2015/09/09/what-can-backbone-developers-learn-from-react",data:{title:"Lessons Backbone Developers Can Learn From React",path:"/2015/09/09/what-can-backbone-developers-learn-from-react",description:"A look at the lessons that Backbone developers can learn from React",date:"2015-09-09T11:19:43+00:00"}},{path:"/2015/01/26/backbone-radio",data:{title:"Building Modular Web Apps With Backbone.Radio",path:"/2015/01/26/backbone-radio",description:"An overview of using Backbone.Radio in Marionette apps",date:"2015-01-26T12:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2015-05-25-marionette-service-service-objects-for-marionette-7cbb0ed58021fef25884.js.map