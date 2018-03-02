webpackJsonp([0x95a79d1266e7],{702:function(n,a){n.exports={data:{markdownRemark:{html:'<p>If you spend much time at all reading through articles and documentation around React, you’re likely to run into the term “Higher Order component”, often abbreviated HoC.  Since it is often used without context in React discussions, and is not a particularly intuitive term for many (most?) developers, I thought it was worth publishing a quick and simple explanation of what Higher Order Components are.</p>\n<p>Higher Order Components are functions that take a React Component, and return a React Component.  The “higher order” phrasing is borrowed from the term “higher order function”, a more widely used term in Mathematics and Computer Science that refers to a function that either takes one or more functions as an argument, returns a function, or does both.  Since React Components can be thought of as functions that take data and return ui elements, the naming and usage make sense.  Let’s look at an example of a higher order component.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">ExtraPropsComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span>WrappedComponent<span class="token punctuation">,</span> componentType<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token keyword">class</span> <span class="token class-name">ExtraPropsChild</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">let</span> props <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        importantFunction<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">\'foo\'</span><span class="token punctuation">,</span>\n        componentType<span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">return</span> <span class="token operator">&lt;</span>WrappedComponent <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>This is a pretty basic HoC that takes a component and returns a new version of that component that will always be passed 2 extra props <code>importantFunction</code> and <code>componentType</code>. One is statically generated in this case, but the other is dynamically passed in when the component is generated.  The ability to pass dynamic content in when defining the component is one of the key wins of HoCs in the real world.  For instance, this is how Redux’s <a href="https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options">connect</a> function works.</p>\n<p>Note that this is different from a normal React Component that renders a subcomponent passed as an argument like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> componentType <span class="token operator">=</span> <span class="token string">\'???\'</span><span class="token punctuation">;</span>\n<span class="token keyword">class</span> <span class="token class-name">ExtraPropsComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">let</span> <span class="token punctuation">{</span> ChildComponent <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>\n      <span class="token keyword">let</span> props <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        importantFunction<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">\'foo\'</span><span class="token punctuation">,</span>\n        componentType<span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">delete</span> props<span class="token punctuation">.</span>ChildComponent<span class="token punctuation">;</span>\n\n      <span class="token keyword">return</span> <span class="token operator">&lt;</span>ChildComponent <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>These 2 examples are roughly equivalent for this case, but accomplish things in different ways.  The HoC is a function that takes a component and data when it is created and generates another component.  The normal component example is a component that takes a component as a property and accesses a variable that is in its scope at creation time to generate the element tree that it renders.  The HoC is more flexible as you could theoretically create multiple versions of a component using the single HoC.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> FancyButton <span class="token operator">=</span> <span class="token function">ExtraPropsComponent</span><span class="token punctuation">(</span>Button<span class="token punctuation">,</span> <span class="token string">\'fancy\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> CrazyButton <span class="token operator">=</span> <span class="token function">ExtraPropsComponent</span><span class="token punctuation">(</span>Button<span class="token punctuation">,</span> <span class="token string">\'crazy\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> BoringButton <span class="token operator">=</span> <span class="token function">ExtraPropsComponent</span><span class="token punctuation">(</span>Button<span class="token punctuation">,</span> <span class="token string">\'boring\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>For the equivalent functionality without using an HoC, you would have to define the whole component for each case.</p>\n<h3>Higher Order Components in the real world</h3>\n<p>I’ve already mentioned connect from <a href="https://github.com/reactjs/react-redux">react-redux</a> as an example of a higher order component.  Other popular libraries that use HoC as part of their APIs include:</p>\n<ul>\n<li><a href="http://formidable.com/open-source/radium/">Radium</a>: a library for inline styles in React that uses a higher order component to transform in-line styles added to a component into a more robust-css like system</li>\n<li><a href="https://github.com/ReactTraining/react-router">React Router</a>: a routing library for React that uses <code>withRouter</code> a HoC that injects access to the router into components that it wraps</li>\n<li><a href="https://facebook.github.io/relay/">Relay</a>: Facebook’s library for connecting to GraphQL APIs includes Relay.Container, a HoC that allows developers to declare the data requirements for a component</li>\n</ul>\n<h3>More Resources</h3>\n<ul>\n<li>This was intentionally a very high level look at Higher Order Components.  If you want to go deeper, <a href="https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.yhbug3ohe">this medium article</a> is a great deep dive into all the use cases they allow.</li>\n<li>If you’re interested in using HoCs in your own code base, <a href="https://github.com/acdlite/recompose">recompose</a> is a utility library for making the syntax around defining and using them painless</li>\n</ul>',frontmatter:{title:"What are Higher Order Components?",keywords:"react components higher order",category:"frameworks",date:"2016-12-14T14:30:00+00:00",path:"/2016/12/14/what-are-higher-order-components",layout:"post",hideFooter:null},fields:{slug:"/2016/12/14/what-are-higher-order-components"}}},pathContext:{slug:"/2016/12/14/what-are-higher-order-components",relatedPosts:[{path:"/2016/05/02/digging-into-react-choosing-component-styles",data:{title:"Digging Into React: Choosing Component Styles",path:"/2016/05/02/digging-into-react-choosing-component-styles",description:"An examination of the various styles for defining React components",date:"2016-05-02T02:32:36+00:00"}},{path:"/2015/12/30/es6-patterns-converting-callbacks-to-promises",data:{title:"ES6 Patterns: Converting Callbacks to Promises",path:"/2015/12/30/es6-patterns-converting-callbacks-to-promises",description:"How to convert a callback driven API to a Promise-based one",date:"2015-12-30T03:30:47+00:00"}},{path:"/2017/01/09/mobx-first-impressions/",data:{title:"MobX: First Impressions",path:"/2017/01/09/mobx-first-impressions/",description:"First impression of managing data with MobX",date:"2017-01-09T13:30:00+00:00"}}]}}}});
//# sourceMappingURL=path---2016-12-14-what-are-higher-order-components-a15fab26e343711ca0da.js.map