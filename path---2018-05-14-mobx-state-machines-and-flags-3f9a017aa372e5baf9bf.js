webpackJsonp([0xff4c5475ae60],{848:function(n,s){n.exports={data:{markdownRemark:{html:'<p>A few weeks ago, I was listening to the <a href="https://changelog.com/reactpodcast">React Podcast</a>, specifically their <a href="https://changelog.com/reactpodcast/5">episode on State Machines</a> with <a href="https://twitter.com/davidkpiano">David Khourshid</a>.  About 20 minutes into the podcast, there was a discussion on the benefits of using enums over flags to model the state of objects that can change across multiple dimensions.  It reminded me of one of the nice patterns that <a href="https://mobx.js.org/">MobX</a> makes possible, and I thought I’d share it here.</p>\n<h3>Background</h3>\n<p>To set the stage here, the podcast discussion centered around modeling an async process like a promise. One possible way given was to use a mix of flags and if statements like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">// loading object</span>\n<span class="token keyword">class</span> <span class="token class-name">ExampleLoader</span> <span class="token punctuation">{</span>\n    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>isLoading <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>hasError <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">//fetch data from server and return it here</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">async</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>isLoading <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>isLoading <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>hasError <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>hasError <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>isLoading <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>using one of these objects might look like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>loader<span class="token punctuation">.</span>hasError<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// show error state</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>loader<span class="token punctuation">.</span>isLoading<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// show loading state</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n  <span class="token comment">// show data State</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>In the podcast David Khourshid criticized this as a haphazard way to manage state, that doesn’t show the whole picture.  Because we can’t easily see how the various flags combine, it’s tough to keep track of all possible states.  For instance, in the above example, did we really want to show the error state if we had an error, but have called <code>load()</code> again and both <code>hasError</code> and <code>isLoading</code> are now true?  Maybe that was the intention, but maybe that was just a state that was missed during the original construction of the program.  It’s hard to tell.  </p>\n<p>As an alternative to full blown state machine modeling, David advocated for an easy first step of swapping out flags for enums.  In that case the code above might look like:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> STATES <span class="token operator">=</span> <span class="token punctuation">{</span>\n  INITIAL<span class="token punctuation">:</span> <span class="token string">\'initial\'</span><span class="token punctuation">,</span>\n  LOADING<span class="token punctuation">:</span> <span class="token string">\'loading\'</span><span class="token punctuation">,</span>\n  ERROR<span class="token punctuation">:</span> <span class="token string">\'error\'</span><span class="token punctuation">,</span>\n  LOADED<span class="token punctuation">:</span> <span class="token string">\'loaded\'</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// loading object</span>\n<span class="token keyword">class</span> <span class="token class-name">ExampleLoader</span> <span class="token punctuation">{</span>\n    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> STATES<span class="token punctuation">.</span>INITIAL<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">//fetch data from server and return it here</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">async</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">let</span> <span class="token punctuation">{</span>LOADING<span class="token punctuation">,</span> ERROR<span class="token punctuation">,</span> LOADED<span class="token punctuation">}</span> <span class="token operator">=</span> STATES<span class="token punctuation">;</span>\n      <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> LOADING\n        <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> LOADED<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> ERROR<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>with usage like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">switch</span><span class="token punctuation">(</span>loader<span class="token punctuation">.</span>state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">case</span> STATES<span class="token punctuation">.</span>ERROR<span class="token punctuation">:</span>\n  <span class="token comment">// show error state</span>\n  <span class="token keyword">case</span> STATES<span class="token punctuation">.</span>LOADING<span class="token punctuation">:</span>\n  <span class="token comment">// show loading state</span>\n  <span class="token keyword">case</span> STATES<span class="token punctuation">.</span>LOADED<span class="token punctuation">:</span>\n  <span class="token comment">// show data State</span>\n  <span class="token keyword">case</span> STATES<span class="token punctuation">.</span>INITIAL<span class="token punctuation">:</span>\n  <span class="token keyword">default</span><span class="token punctuation">:</span>\n  <span class="token comment">// show blank state</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>We can see just from using an enum, we’ve cleared some ambiguity: now it is clear that we should be showing a loading state when we’re loading data, even if a previous load resulted in an error.  And we’ve also been forced to remember another state distinction that was missed originally, the difference between a successful load and the initial state before load is called.  This type of Enum-based approach is really helpful for modeling complex systems and especially async process state. But it’s not perfect.  While ENUMs are great for listing out every possible state, sometimes we just need to know if an object is in a particular state.  For instance, we might have a special help-prompt component that should only show if our data is in an error state, but is otherwise divorced from the details of the data.  In that case <code>loader.hasError</code> is simpler and  cleaner than <code>loader.state === STATES.ERROR</code>.  It’s a straight forward named expression that doesn’t require importing a constant from another file or matching up to a string value.  Enums add some verbosity and ceremony to code that can otherwise be very simple.  Fortunately MobX allows us to have our cake and eat it too.</p>\n<h3>MobX</h3>\n<p>MobX is a state management solution created by <a href="https://twitter.com/mweststrate">Michael Weststrate</a>.  It grew out of the React community but can be used with other frameworks or on it’s own.  One of its nicest features are its intelligently updated <a href="https://mobx.js.org/refguide/computed-decorator.html">computed properties</a>.  With MobX we can write our loader object like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>extendObservable<span class="token punctuation">,</span> computed<span class="token punctuation">,</span> action <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'mobx\'</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> STATES <span class="token operator">=</span> <span class="token punctuation">{</span>\n  INITIAL<span class="token punctuation">:</span> <span class="token string">\'initial\'</span><span class="token punctuation">,</span>\n  LOADING<span class="token punctuation">:</span> <span class="token string">\'loading\'</span><span class="token punctuation">,</span>\n  ERROR<span class="token punctuation">:</span> <span class="token string">\'error\'</span><span class="token punctuation">,</span>\n  LOADED<span class="token punctuation">:</span> <span class="token string">\'loaded\'</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// loading object</span>\n<span class="token keyword">class</span> <span class="token class-name">ExampleLoader</span> <span class="token punctuation">{</span>\n    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">let</span> <span class="token punctuation">{</span>INITIAL<span class="token punctuation">,</span> LOADING<span class="token punctuation">,</span> ERROR <span class="token punctuation">}</span> <span class="token operator">=</span> STATES<span class="token punctuation">;</span>\n      <span class="token function">extendObservable</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n          state<span class="token punctuation">:</span> INITIAL<span class="token punctuation">,</span>\n          isLoading<span class="token punctuation">:</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> LOADING<span class="token punctuation">)</span><span class="token punctuation">,</span>\n          hasError<span class="token punctuation">:</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> ERROR<span class="token punctuation">)</span><span class="token punctuation">,</span>\n          updateState<span class="token punctuation">:</span> <span class="token function">action</span><span class="token punctuation">(</span>state <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">//fetch data from server and return it here</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">async</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">let</span> <span class="token punctuation">{</span>LOADING<span class="token punctuation">,</span> ERROR<span class="token punctuation">,</span> LOADED<span class="token punctuation">}</span> <span class="token operator">=</span> STATES<span class="token punctuation">;</span>\n      <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">updateState</span><span class="token punctuation">(</span>LOADING<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">updateState</span><span class="token punctuation">(</span>LOADED<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">updateState</span><span class="token punctuation">(</span>ERROR<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Now we have both our state enum, and we can check specific properties.  So both of the below examples work:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">// ENUM example</span>\n<span class="token keyword">switch</span><span class="token punctuation">(</span>loader<span class="token punctuation">.</span>state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">case</span> STATES<span class="token punctuation">.</span>ERROR<span class="token punctuation">:</span>\n  <span class="token comment">// show error state</span>\n  <span class="token keyword">case</span> STATES<span class="token punctuation">.</span>LOADING<span class="token punctuation">:</span>\n  <span class="token comment">// show loading state</span>\n  <span class="token keyword">case</span> STATES<span class="token punctuation">.</span>LOADED<span class="token punctuation">:</span>\n  <span class="token comment">// show data State</span>\n  <span class="token keyword">case</span> STATES<span class="token punctuation">.</span>INITIAL<span class="token punctuation">:</span>\n  <span class="token keyword">default</span><span class="token punctuation">:</span>\n  <span class="token comment">// show blank state</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//Flags example</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>loader<span class="token punctuation">.</span>hasError<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// show help component</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>And because MobX takes care of the details of efficiently updating our flags based on state, we know everything will stay in sync and remain performant, without a bunch of ugly code to make sure of that.</p>',frontmatter:{title:"MobX Patterns: State Machines & Flags",keywords:"mobx computed state machines",category:"frameworks",date:"2018/05/14",path:"/2018/05/14/mobx-state-machines-and-flags/",layout:"post",hideFooter:null},fields:{slug:"/2018/05/14/mobx-state-machines-and-flags/"}}},pathContext:{slug:"/2018/05/14/mobx-state-machines-and-flags/",relatedPosts:[{path:"/2017/01/09/mobx-first-impressions/",data:{title:"MobX: First Impressions",path:"/2017/01/09/mobx-first-impressions/",description:"First impression of managing data with MobX",date:"2017-01-09T13:30:00+00:00"}},{path:"/2017/07/19/ten-things-javascript/",data:{title:"Ten Things A Serious JavaScript Developer Should Learn",path:"/2017/07/19/ten-things-javascript/",description:"Some of the important things to pick up in the JS world",date:"2017-07-19T04:00:00+00:00"}},{path:"/2017/07/10/how-to-follow-the-javascript-roadmap/",data:{title:"How to follow the JavaScript roadmap",path:"/2017/07/10/how-to-follow-the-javascript-roadmap/",description:"Keeping up with the language's progress",date:"2017-07-10T12:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2018-05-14-mobx-state-machines-and-flags-3f9a017aa372e5baf9bf.js.map