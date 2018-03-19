webpackJsonp([0x861588efaefa],{636:function(n,a){n.exports={data:{markdownRemark:{html:'<p>Last week I was looking for a way to use KnockoutJS on a configuration menu that required the user to be able to cancel or accept their input after filling out the menu.</p>\n<p>Initially I was just copying the initial data and refilling my data model manually on cancel.  I wasn’t satisfied with that solution though.  It didn’t seem like it would scale well if the menu got more complicated, and it lacked the elegance and frictionless nature of most knockout data management.</p>\n<p>After some searching I found <a href="http://www.knockmeout.net/2011/03/guard-your-model-accept-or-cancel-edits.html">Ryan Niemeyer’s Protected Observable example</a>, and it initially seemed like exactly what I wanted, a way to only persist changes to the view model if they were explicitly confirmed.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//knockout-protected.js</span>\n<span class="token comment">//https://gist.github.com/ben336/5537138#file-knockout-protected-js</span>\n\n<span class="token comment">//wrapper to an observable that requires accept/cancel</span>\nko<span class="token punctuation">.</span><span class="token function-variable function">protectedObservable</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>initialValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">//private variables</span>\n    <span class="token keyword">var</span> _actualValue <span class="token operator">=</span> ko<span class="token punctuation">.</span><span class="token function">observable</span><span class="token punctuation">(</span>initialValue<span class="token punctuation">)</span><span class="token punctuation">,</span>\n        _tempValue <span class="token operator">=</span> initialValue<span class="token punctuation">;</span>\n\n    <span class="token comment">//computed observable that we will return</span>\n    <span class="token keyword">var</span> result <span class="token operator">=</span> ko<span class="token punctuation">.</span><span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        <span class="token comment">//always return the actual value</span>\n        read<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n           <span class="token keyword">return</span> <span class="token function">_actualValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token comment">//stored in a temporary spot until commit</span>\n        write<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n             _tempValue <span class="token operator">=</span> newValue<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//if different, commit temp value</span>\n    result<span class="token punctuation">.</span><span class="token function-variable function">commit</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>_tempValue <span class="token operator">!==</span> <span class="token function">_actualValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n             <span class="token function">_actualValue</span><span class="token punctuation">(</span>_tempValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//force subscribers to take original</span>\n    result<span class="token punctuation">.</span><span class="token function-variable function">reset</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        _actualValue<span class="token punctuation">.</span><span class="token function">valueHasMutated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        _tempValue <span class="token operator">=</span> <span class="token function">_actualValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">//reset temp value</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>There was a problem with this approach though.  Ryan’s model saves the update to a temporary value and then moves it into an observable if the result is committed.  That works great for simple models and mostly behaves well if the user cancels out of the edit screen without committing or resetting. But it breaks down if you have another computed observable that depends on the value of the protected observable.  In my case I had an output that I wanted to show dynamically changing based on the input allowing experimentation.  Here’s a simplified example using a protected observable:</p>\n<iframe width="100%" height="300" src="http://jsfiddle.net/tc299/4/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>\n<p>As you can see, the tables field doesn’t update until you confirm the entry. Ideally though we’d like it to update as the user changes their guest number, so they can see the effect on cost and space used before they confirm a change in guests.  We want to do this while still preserving the users abilities to cancel changes if they don’t like the results though.  So how to we do this?  We make a small change to the default value returned by the protected observable.  Here’s what I’m calling a Revertible Observable:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">/*\nknockout-revertible.js\nhttps://gist.github.com/ben336/5537115#file-knockout-revertible-js\n*/</span>\n\n <span class="token comment">//wrapper to an observable that requires accept/cancel</span>\nko<span class="token punctuation">.</span><span class="token function-variable function">revertibleObservable</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>initialValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">//private variables</span>\n    <span class="token keyword">var</span> _actualValue <span class="token operator">=</span> initialValue<span class="token punctuation">,</span>\n        _tempValue <span class="token operator">=</span> ko<span class="token punctuation">.</span><span class="token function">observable</span><span class="token punctuation">(</span>initialValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//computed observable that we will return</span>\n    <span class="token keyword">var</span> result <span class="token operator">=</span> ko<span class="token punctuation">.</span><span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        <span class="token comment">//always return the current value</span>\n        read<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n           <span class="token keyword">return</span> <span class="token function">_tempValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token comment">//stored in a temporary spot until commit</span>\n        write<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n             <span class="token function">_tempValue</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//if different, commit temp value</span>\n    result<span class="token punctuation">.</span><span class="token function-variable function">commit</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">_tempValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!==</span> _actualValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            _tempValue<span class="token punctuation">.</span><span class="token function">valueHasMutated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n             _actualValue <span class="token operator">=</span> <span class="token function">_tempValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//force subscribers to take original</span>\n    result<span class="token punctuation">.</span><span class="token function-variable function">reset</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">_tempValue</span><span class="token punctuation">(</span>_actualValue<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">//reset temp value</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>This preserves the ability to see the results of your changes in realtime, while also allowing you to easily revert with a simple cancel button and no explicit data tracking.  Now our example can work as we’d like, with the customer getting immediate feedback on how their guest changes effect the total cost.</p>\n<iframe width="100%" height="300" src="http://jsfiddle.net/QQYrL/4/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>\n<p>Note that this isn’t a silver bullet.  An explicit confirmation is no longer required for the changes to be passed through, so its important to make sure that the user either confirms or resets the values after entering them.  But it allows for instant feedback on changes while still supporting the ability to dump the changes if the user decides they don’t like the result.  I think its a useful pattern for any situation where the user is entering data and you want to show them a preview of the outcome.  I hope others will find it as useful as I have.</p>\n<h3>Update</h3>\n<p>I showed this to Ryan and he replied with a nice simplification of the concept.</p>\n<blockquote class="twitter-tweet"><p>@<a href="https://twitter.com/ben336">ben336</a> nice Ben. I have had to do something similar in the past. Here is a simplified version that I have used: <a href="http://t.co/IiqFe90kwi" title="http://jsfiddle.net/rniemeyer/SFCgr/">jsfiddle.net/rniemeyer/SFCg…</a></p>&mdash; Ryan Niemeyer (@RPNiemeyer) <a href="https://twitter.com/RPNiemeyer/status/331954950009663488">May 8, 2013</a></blockquote>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">//Ryan Niemeyer\'s simplified knockout-revertible.js</span>\n<span class="token comment">//http://jsfiddle.net/rniemeyer/SFCgr/ Fiddle</span>\n ko<span class="token punctuation">.</span><span class="token function-variable function">revertibleObservable</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>initialValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">//private variables</span>\n    <span class="token keyword">var</span> result <span class="token operator">=</span> ko<span class="token punctuation">.</span><span class="token function">observable</span><span class="token punctuation">(</span>initialValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    result<span class="token punctuation">.</span>forEditing <span class="token operator">=</span> ko<span class="token punctuation">.</span><span class="token function">observable</span><span class="token punctuation">(</span>initialValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//if different, commit edit value</span>\n    result<span class="token punctuation">.</span><span class="token function-variable function">commit</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">var</span> editValue <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">forEditing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>editValue <span class="token operator">!==</span> <span class="token function">result</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token function">result</span><span class="token punctuation">(</span>editValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//force subscribers to take original</span>\n    result<span class="token punctuation">.</span><span class="token function-variable function">reset</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        result<span class="token punctuation">.</span><span class="token function">forEditing</span><span class="token punctuation">(</span><span class="token function">result</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>',frontmatter:{title:"Revertible Observables in Knockout",keywords:null,category:"frameworks",date:"2013-05-07T20:05:00+00:00",path:"/2013/05/07/revertible-observables-in-knockout",layout:"post",hideFooter:null},fields:{slug:"/2013/05/07/revertible-observables-in-knockout"}}},pathContext:{slug:"/2013/05/07/revertible-observables-in-knockout",relatedPosts:[{path:"/2013/11/14/modern-dojo-exploring-dojo_basedeclare",data:{title:"Modern Dojo: Exploring declare",path:"/2013/11/14/modern-dojo-exploring-dojo_basedeclare",description:"A dive into the _base/declare module",date:"2013-11-14T23:15:00+00:00"}},{path:"/2013/11/13/modern-dojo-exploring-dojoquery",data:{title:"Modern Dojo: Exploring query",path:"/2013/11/13/modern-dojo-exploring-dojoquery",description:"A dive into the query module",date:"2013-11-13T23:15:00+00:00"}},{path:"/2013/05/07/revertible-observables-in-knockout",data:{title:"Revertible Observables in Knockout",path:"/2013/05/07/revertible-observables-in-knockout",description:"Building an observable with simple undo functionality",date:"2013-05-07T20:05:00+00:00"}}]}}}});
//# sourceMappingURL=path---2013-05-07-revertible-observables-in-knockout-8ea5020bdd44ab6466e9.js.map