webpackJsonp([0xb8a148f303a2],{718:function(e,n){e.exports={data:{markdownRemark:{html:'<p>One of the realities of the constant change in the web development world is that “best practices” are often hotly contested.  One issue that the front end community doesn’t seem to have come to a consensus on yet is how tightly to bundle JavaScript, HTML and CSS in code.  Should they be bundled and managed completely separately?  Kept in different files and imported together into JavaScript component files?  Or can we remove HTML and CSS files entirely and generate everything in JavaScript? This is a discussion that still comes up all the time in my <a href="https://twitter.com/thomasfuchs/status/810885087214637057">twitter</a> <a href="https://twitter.com/TheLarkInn/status/812089065210335232">feed</a>.</p>\n<p>Many new frameworks that encourage a component based architecture (including React, Vue, and Angular2 <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>) provide affordances for including HTML and CSS directly in JavaScript, but those solutions are not yet used universally.  Many people are still very happy keeping CSS bundled separately.  I have no idea what the <em>best</em> solution is.  But I am interested in how people talk about the problem.  One major argument I have seen from people advocating both sides is that their preferred approach encourages good “separation of concerns”.</p>\n<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I&#39;m moving from storing my CSS, JS and HTML in different files, to physically putting them on different drives. Keep those concerns separate</p>&mdash; Ben Lesh (@BenLesh) <a href="https://twitter.com/BenLesh/status/812092408519413761">December 23, 2016</a></blockquote>\n<p>I’d like to take a deeper look at this and give some vocabulary that can hopefully help anyone working through discussions on how to manage CSS for components.  I’ll focus specifically on CSS since frameworks tend to be more agnostic to how it is blended with JS than they are about HTML, and on components since that is the main context in which people are arguing for blending of css. For this piece, I’ll consider a component to be a set of HTML, CSS, and JavaScript that combine to form a reusable piece of UI <sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup>.</p>\n<h3>Orthogonality, Cohesion, and Coupling</h3>\n<p><a href="http://amzn.to/2hNzQ0t">The Pragmatic Programmer</a>, one of the best books ever written on Software Engineering, uses the following three terms when talking about “Separation of Concerns”: orthogonality, cohesion, and coupling.  </p>\n<p>Orthogonality is the idea that modules should be written in a way that a change in one module should not require changes in any other module.</p>\n<blockquote>\n<p>Two or more things are orthogonal if changes in one do not affect any of the others. In a well-designed system, the database code will be orthogonal to the user interface: you can change the interface without affecting the database, and swap databases without changing the interface.</p>\n<p><strong>— The Pragmatic Programmer</strong></p>\n</blockquote>\n<p>Cohesion is a measure of how well the internal contents of a module relate to each other. A cohesive module is one with a single well defined purpose, where all code in the module is related to that purpose.  A less cohesive module might have multiple purposes, with pieces of code that are completely unrelated to each other.  <a href="https://sites.google.com/site/unclebobconsultingllc/">Robert C. Martin</a> describes this as each module having “a single reason to change”.</p>\n<p>Coupling is a measure of how dependent different modules are on the internal workings of other modules. In a loosely coupled system, any module can be completely rewritten as long as it exposes the same public interface, without any other modules needing to change.  In a tightly coupled system, changing the internal details of one module may require changes in many other modules.</p>\n<p>In the real world most systems are not purely orthogonal, and their modules are likely not 100% cohesive and uncoupled.  But striving for these goals is a good approximation of what many people mean when they talk about <em>separation of concerns</em>.</p>\n<h3>Conways Law</h3>\n<p><a href="http://amzn.to/2hNzQ0t">The Pragmatic Programmer</a> does touch on another application of orthogonality to software engineering:</p>\n<blockquote>\n<p>Have you noticed how some project teams are efficient, with everyone knowing what to do and contributing fully, while the members of other teams are constantly bickering and don’t seem able to get out of each other’s way?</p>\n<p>Often this is an orthogonality issue. When teams are organized with lots of overlap, members are confused about responsibilities. Every change needs a meeting of the entire team, because any one of them might be affected.</p>\n<p>How do you organize teams into groups with well-defined responsibilities and minimal overlap? There’s no simple answer. It depends partly on the project and your analysis of the areas of potential change. It also depends on the people you have available. Our preference is to start by separating infrastructure from application. Each major infrastructure component (database, communications interface, middleware layer, and so on) gets its own subteam. Each obvious division of application functionality is similarly divided. Then we look at the people we have (or plan to have) and adjust the groupings accordingly.</p>\n<p>You can get an informal measure of the orthogonality of a project team’s structure. Simply see how many people need to be involved in discussing each change that is requested. The larger the number, the less orthogonal the group. Clearly, an orthogonal team is more efficient.</p>\n<p><strong>— The Pragmatic Programmer</strong></p>\n</blockquote>\n<p>The idea is that teams work more efficiently when each can work in its own areas without having to be bogged down by using another group (or individuals) code, and only interacting with those modules through a well communicated interface.  This is also known as <a href="https://en.wikipedia.org/wiki/Conway&#x27;s_law">Conway’s Law</a>, which is often used disparagingly but still stands as a true observation about real life code.</p>\n<blockquote>\n<p>organizations which design systems … are constrained to produce designs which are copies of the communication structures of these organizations</p>\n<p><strong>— Conway’s Law</strong></p>\n</blockquote>\n<p>Although it usually isn’t phrased quite so explicitly, I believe Conway’s law is often related to what people mean when they discuss separation of concerns in front end development.</p>\n<h3>Boundaries and Interfaces between CSS and JavaScript</h3>\n<p>Let’s look at 2 examples of how CSS can be structured.  We’ll use a “page view counter” as our example. The element will show the number of users who have viewed the page, and respond to click events by showing a modal with the most popular pages on the site.\nFirst, for a more traditional example, I’ll show a <a href="http://marionettejs.com/">Marionette</a> View, with separate CSS. For a more integrated example, I’ll use a React component.</p>\n<h4>Marionette</h4>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//view-counter.js</span>\n\n<span class="token keyword">import</span> Mn <span class="token keyword">from</span> <span class="token string">\'backbone.marionette\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> template <span class="token keyword">from</span> <span class="token string">\'./view-counter.hbs\'</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> getPageViews<span class="token punctuation">,</span> showModal <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'../util/page-views\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> ViewCounter <span class="token operator">=</span> Mn<span class="token punctuation">.</span>View<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\n  template<span class="token punctuation">,</span>\n\n  className<span class="token punctuation">:</span> <span class="token string">\'page-view-counter\'</span><span class="token punctuation">,</span>\n\n  ui<span class="token punctuation">:</span>  <span class="token punctuation">{</span>\n    <span class="token string">\'showPageViewsModal\'</span><span class="token punctuation">:</span> <span class="token string">\'.show-modal-js\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n  events<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">\'click @ui.showPageViewsModal\'</span><span class="token punctuation">:</span> <span class="token string">\'showPageViewsModal\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">templateContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        pageViews<span class="token punctuation">:</span> <span class="token function">getPageViews</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n  <span class="token function">showPageViewsModal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">showModal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-hbs"><code>{{!view-counter.hbs}}\n\n<span class="page-view-counter__title"> Page Views: </span>\n<span class="page-view-counter__counter show-modal-js"> {{pageViews}} </span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code><span class="token selector">//view-counter.css\n\n.page-view-counter</span> <span class="token punctuation">{</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.page-view-counter__title</span> <span class="token punctuation">{</span>\n  <span class="token property">font-weight</span><span class="token punctuation">:</span> 700<span class="token punctuation">;</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.page-view-counter__counter</span> <span class="token punctuation">{</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h4>React</h4>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//view-counter.jsx</span>\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> showModal <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'../util/page-views\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">PageViewCounter</span> <span class="token operator">=</span> <span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div style <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>display<span class="token punctuation">:</span> <span class="token string">\'flex\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>\n      <span class="token operator">&lt;</span>span style <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>\n        fontWeight<span class="token punctuation">:</span> <span class="token number">700</span><span class="token punctuation">,</span>\n        padding<span class="token punctuation">:</span> <span class="token string">\'3px\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>\n        Page Views<span class="token punctuation">:</span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>\n      <span class="token operator">&lt;</span>span style <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>padding<span class="token punctuation">:</span> <span class="token string">\'3px\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>pageViews<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>The React and Marionette examples have set different module boundaries. In the Marionette example, we have defined 3 modules, split by code type.  Ignoring the leaky abstractions in the Marionette boundaries <sup id="fnref-3"><a href="#fn-3" class="footnote-ref">3</a></sup>, we can say we have 3 modules with clear singular purpose (styling, behavior,  structure) that use class names and  <code>templateContext</code> as interfaces.  The handlebars file exposes classes, which the CSS uses to style elements and the JavaScript code uses as attachment points for event handling.  The JavaScript view passes data to the template through templateContext.  In the React code we have defined a single module that exports a component as its only external interface. The module’s single purpose could be defined as “rendering a PageViewCounter”.</p>\n<h3>How do we define module boundaries?</h3>\n<p>If you’re excited to read which of the above examples is the <em>correct</em> module boundary definition, I’m sorry to disappoint you.  It turns out that module boundaries are more of an art than a science.  Let’s consider each of these examples by the criteria we laid out above.</p>\n<p>The Marionette modules are <strong>cohesive</strong>.  Each module is single purpose, with a clear reason why it might change.  The React module is also cohesive, as it describes a single atomic component. However, it has more reasons it might change.  We might change that module because of a change in the look and feel of the site, because of a change in the expected behavior of the click event, or because we’re changing the text inside the component.</p>\n<p>The Marionette modules are not quite <strong>decoupled</strong>.  While this CSS doesn’t nest selectors and we don’t have any explicit dependencies on the HTML structure, it is still written in a way that assumes <code>.page-view-counter__title</code> and <code>.page-view-counter__counter</code> will be direct children of <code>.page-view-counter</code>.  So changing the “internal details” of the Handlebars file by adding an extra element around those children would break the CSS. While the modules are not completely decoupled from each other, they don’t rely on any private details of other modules or global styles and can be used together as a reusable component.  The React module is similarly decoupled from the rest of the system, and as a single module faces no internal coupling issues.</p>\n<p>Both components should be <strong>orthogonal</strong> from the rest of the system, even though the Marionette modules may be less orthogonal internally.  The question of how they meet a Conway’s law style of orthogonality depends on a team.  If your team has designers, and developers separately working on style/structure and behavior, the Marionette version may allow for more efficient division of labor, with communication centering on class based communication.  If you instead have a group of polyglot front end developers who implement mocks from designers across all 3 areas, the React version will instead present a simpler implementation that maps better to your team, with the focus on interfaces across different components.  </p>\n<p>In the end decisions like this are an exercise in understanding context and preferences.  What will make your team productive? You can accept the coupling of the first example in order to gain the benefits of small focused modules.  Or you can take the larger scope of the React component in exchange for keeping all information relevant to a component in one place.  Are you making single developers responsible for a set of components?  Or are they responsible for behavior generally, with design handled by someone else? Make the decisions that work for your project.</p>\n<h3>More Resources</h3>\n<ul>\n<li><a href="http://amzn.to/2hNzQ0t">The Pragmatic Programmer</a> is a great book. Much of the vocabulary in this post comes from its Chapter 8, but the whole book is worth a read and is highly recommended.</li>\n<li>CSS Tricks has a good look at the <a href="https://css-tricks.com/the-debate-around-do-we-even-need-css-anymore/">pros and cons of CSS in JS</a>.  I focused on theory here, but this is much more hands on about the practical concerns around this debate.  </li>\n</ul>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>This is a bit of a generalization.  React provides an abstraction over HTML that replaces hand-written HTML, but doesn’t specify anything for CSS, CSS in JS solutions are simply popular in that community.  Vue and Angular both allow  CSS and HTML to share a file with JS, but CSS can still be handled separately.</p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n<li id="fn-2">\n<p>There are some distinctions about CSS in JS vs importing CSS into JS using webpack that I’m not really dealing with here.  This is a post about how to think about these decisions moreso than the specific options for bundling CSS and JS</p>\n<a href="#fnref-2" class="footnote-backref">↩</a>\n</li>\n<li id="fn-3">\n<p>The root HTML element in any Marionette component is always defined implicitly in JavaScript, and Handlebars is an expressive templating language that can handle more than structure.</p>\n<a href="#fnref-3" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',frontmatter:{title:"Orthogonality and CSS in JS",keywords:"CSS JavaScript Orthogonality Pragmatic Programmer",category:"software-productivity",date:"2017-01-03T00:00:00+00:00",path:"/2017/01/03/orthogonality-and-css-in-js/",layout:"post",hideFooter:null},fields:{slug:"/2017/01/03/orthogonality-and-css-in-js/"}}},pathContext:{slug:"/2017/01/03/orthogonality-and-css-in-js/",relatedPosts:[{path:"/2016/09/19/testing-with-jest-snapshots-first-impressions/",data:{title:"Testing with Jest Snapshots: First Impressions",path:"/2016/09/19/testing-with-jest-snapshots-first-impressions/",description:"First impression of testing UI components using Jest snapshots",date:"2016-09-19T12:41:00+00:00"}},{path:"/2017/02/18/context-to-best-practices/",data:{title:"Giving Context To Best Practices",path:"/2017/02/18/context-to-best-practices/",description:"What we talk about when we talk about best practices",date:"2017-02-18T23:30:00+00:00"}},{path:"/2015/12/30/es6-patterns-converting-callbacks-to-promises",data:{title:"ES6 Patterns: Converting Callbacks to Promises",path:"/2015/12/30/es6-patterns-converting-callbacks-to-promises",description:"How to convert a callback driven API to a Promise-based one",date:"2015-12-30T03:30:47+00:00"}}]}}}});
//# sourceMappingURL=path---2017-01-03-orthogonality-and-css-in-js-a58adc32013bf05362ca.js.map