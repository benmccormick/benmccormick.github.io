webpackJsonp([0x97a176cf4560],{753:function(e,t){e.exports={data:{markdownRemark:{html:'<p>The best attribute of HTML is its ability to be simultaneously machine-readable and human-readable.  I’d argue that it’s one of the biggest reasons for the web platform’s success. Anyone can  “view page source” and have some understanding of what they’re seeing.  Javascript based “Single Page Applications” have undermined this a bit.  Now the original HTML of a page may just be an empty body tag, and even when you inspect the generated page, it will probably just be a sea of div tags.</p>\n<p>That’s going to start changing in the near future.  Custom Elements, part of the <a href="http://www.w3.org/standards/techs/components#w3c_all">Web Components spec</a>, are a way of bringing back the semantic web.  They allow you to encapsulate HTML and Javascript functionality into “elements” which you can include in your HTML like any existing native element, with all their semantic benefits.   The best part? They’re <a href="http://developer.telerik.com/featured/web-components-ready-production/">usable in production now</a>.</p>\n<h3>So What does it look like to use custom elements?</h3>\n<p>Talking about this stuff is great, but this is an API for shippable code, not just an abstract spec. So let’s look at a simple example.  In a past job, I made pretty extensive use of the <a href="http://jqueryui.com/">jQuery UI</a> widget library.  jQuery UI is great, but I always found it a bit akward to work with in practice. When it’s used, it takes an existing HTML Element, usually a <code>&#x3C;div></code> and transforms it into a widget.  That means that to understand the end result created by the widget code, you have to look in at least 2 places, the original HTML code that contained the transformed element, and the JavaScript code that contained the call. It creates mental overhead knowing that you always had to remember to widgetize the dom element when it’s rendered. It also means accepting that the final result of the widget might look significantly different than the original.  For instance, here’s the before or after for the progress bar widget.  I chose it for it’s simplicity, but you can see that the final result is barely recognizable from the source.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-7ce94.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 81.86003683241252%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAIAAACZeshMAAAACXBIWXMAABYlAAAWJQFJUiTwAAACBElEQVQoz3WS7XKcIBiF9/5vID9yL2l/dDKd2bSZpt3Ntn6BX6gICK6KKNpX7STZdHMGDyLz8B6Q3TzP0zRprTlXlKqUSFW3velbrbted+Ad2Ktg2Pf9vGoHj7W2qoTj+Pf3+69f9k8Pj+7hmIURjRKWF5TSbBUhJE3TPM+rqnqFobIQoixLhHHw8xd++IEeD+nJ488uCxNgPM9zXdf3ffAwDDnnV+A4jnEYkjzLGCsEF0pymOAcSkEPLqUEUil1EVspCUtiHGeEQgNAMM4Z4+BLzzbfdAFD7Twv93vYs3s8RgiRhdka32D+oiswIfTb9+B0iiFCBWmrisu1VZBWrKk/hqGy6yRRViAUMS9kLlrcCShOEMpcN4XVN/49DAdWlhy2WgqW5QWPCcMxW53nFLA4zouivF4Z4IKWvp8GAaG0ZIIzIdhyyltWttb8d1rwU+DM38aem1aTTBIi23a5QHCTjNaj6YfBbMP+jYwxF/A72WkCv7k73twdXob/azddmxjt8vH28+H20wrbD2DFahmJoW3qepTStGdjtTJN2571udLgpjM17KYZpOy7RtdKd41p6qHrxp3uRooEDwL/KXo+VMhXWRAmfhL7KXJE6JXYSfGfKPSEcxIpyinGFG75b7gNZoldICmLRst2GOwwzv0wg492Cd8b+/IO2eFlsosGGNr5L4lNhlMBuZtwAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="source -> display"\n        title=""\n        src="/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-d766e.png"\n        srcset="/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-a6b6e.png 143w,\n/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-8e488.png 285w,\n/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-d766e.png 570w,\n/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-13239.png 855w,\n/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-7ce94.png 1086w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>This seems like the perfect opportunity to use a custom element.  If we can encapsulate all that behavior, we’ll be able to ensure that the progress bar is always rendered when it appears, and we can hide any ugly transformed DOM elements underneath a shiny semantic element.  Sounds great! So let’s see how this works.</p>\n<p>To start, we need an object to serve as our progress bar element’s prototype.  It should inherit from the base <em>HTMLElement</em> class. We can create the prototype object like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> ProgressBar  <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>HTMLElement<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Now that we have our Prototype element, we can register it as a custom element using the <code>document.registerElement</code> API. For now this is only natively available in Chrome, but it’s quite reasonable to <a href="https://github.com/WebReflection/document-register-element">polyfill</a>. <code>registerElement</code> accepts 2 arguments: the name of the element<sup id="fnref:1"><a href="#fn:1">1</a></sup>, and an optional second argument to allow you to specify a prototype for your element.  So let’s set up a <code>progress-bar</code> element:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">registerElement</span><span class="token punctuation">(</span><span class="token string">\'progress-bar\'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>\n  prototype<span class="token punctuation">:</span>ProgressBar\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Our <code>ProgressBar</code> object will now serve as the prototype for the <code>progress-bar</code> element.  That means we can extend it and give it extra functionality which will then be available on every instance of that element.  Besides allowing us to attach arbitrary properties or functionality to an element, this lets us hook into the “lifecycle callbacks” of HTML Elements, which you can see in this chart from <a href="https://github.com/WebReflection/document-register-element">HTML5Rocks</a>:</p>\n<table class="table">\n  <thead>\n    <tr>\n      <th>Callback name</th>\n      <th>Called when</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>createdCallback</td>\n      <td>an instance of the element is created</td>\n    </tr>\n    <tr>\n      <td>attachedCallback</td>\n      <td>an instance was inserted into the document</td>\n    </tr>\n    <tr>\n      <td>detachedCallback</td>\n      <td>an instance was removed from the document</td>\n    </tr>\n    <tr>\n      <td>attributeChangedCallback(attrName, oldVal, newVal)</td>\n      <td>an attribute was added, removed, or updated</td>\n    </tr>\n  </tbody>\n</table>\n<p>Let’s start by looking at createdCallback.  Since this gets run when the element is first created, this is a great time to run any initialization code that doesn’t require the element to be present in the DOM yet.  Since jQuery UI’s progress bar code doesn’t require the element to be attached to the DOM, we can do all of our initialization here.  That could look something like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>ProgressBar<span class="token punctuation">.</span><span class="token function-variable function">createdCallback</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">\'&lt;div id="bar">\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">progressbar</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    value<span class="token punctuation">:</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">\'value\'</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token number">0</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>So using jQuery, we create a new div element and immediately transform it into a progressbar object. Then we attach it inside our custom element container. Pretty straightforward.</p>\n<p>Note that we set the value of our progress bar from the <em>value</em> attribute of our element.  HTML attributes provide a very convenient “public API” for Custom Elements.  You have complete access to an elements attributes inside these callbacks, allowing for easy declarative APIs. In the case of our simple progress bar, <code>value</code> is the only attribute we care about, and other attributes are ignored.</p>\n<p>But what if the value of our element changes?  Attributes aren’t a one time only API.  If we want to react to changes in the attribute, we can use the aptly named <em>attributeChangedCallback.</em>  That callback fires everytime an attribute changes, allowing us to catch the change and respond appropriately.  A more sophisticated element might contain a registry of callbacks for different elements, but for this example we can focus on changes to value.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>ProgressBar<span class="token punctuation">.</span><span class="token function-variable function">attributeChangedCallback</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>attrName<span class="token punctuation">,</span> oldVal<span class="token punctuation">,</span> newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> $bar<span class="token punctuation">;</span>\n  <span class="token keyword">if</span><span class="token punctuation">(</span>attrName <span class="token operator">===</span> <span class="token string">\'value\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    $bar <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'bar\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    $bar<span class="token punctuation">.</span><span class="token function">progressbar</span><span class="token punctuation">(</span><span class="token string">\'value\'</span><span class="token punctuation">,</span><span class="token operator">+</span>newVal<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>And that’s it! We now have a working <code>progress-bar</code> element, that we can put anywhere in our HTML with no extra js configuration.</p>\n<p data-height="257" data-theme-id="8140" data-slug-hash="cFyep" data-default-tab="result" class=\'codepen\'>See the Pen <a href=\'http://codepen.io/ben336/pen/cFyep/\'>Custom Elements Progressbar Example</a> by Ben McCormick (<a href=\'http://codepen.io/ben336\'>@ben336</a>) on <a href=\'http://codepen.io\'>CodePen</a>.</p>\n<p>Of course there is plenty more we could do.  A more complicated element might require some initialization to be moved to the <code>attachedCallback</code>, and might require better cleanup using the <code>detachedCallback</code>.  For communication with the rest of our app that didn’t fit well into the “changing attributes” model, we might need to implement an eventing system or global registry for accessing data.  But those are all additions on this basic, useful building block.</p>\n<p>If you’re interested in trying out custom elements, there’s never been a better time to get started. It’s easy to try out proof of concepts in Chrome, and there’s a <a href="https://github.com/WebReflection/document-register-element">light-weight polyfill</a> with support back to IE9 for those who want to start using them in production.  If this is something that excites you, there’s no reason not to start using this tool in your code today.</p>\n<h3>More Resources</h3>\n<ul>\n<li>HTML5Rocks has an awesome <a href="https://github.com/WebReflection/document-register-element">detailed look</a> at Custom Elements that covers all of the ground we looked at here, and more.  If you want to dive deeply into this feature, it’s a great read to get started.</li>\n<li>Telerik posted another <a href="http://developer.telerik.com/featured/web-components-ready-production/">great piece</a> on this topic a few weeks ago, which focuses more on the case for Custom Elements being production ready now</li>\n<li>If you’re interested in using more than just Custom Elements, <a href="http://www.polymer-project.org/">The Polymer Project</a> by Google is an ambitious library built around the Web Component spec.  They attempt to polyfill the whole spec, then wrap convenience functions around the low level elements.  It’s an interesting, ambitious project, though not yet ready for production.</li>\n</ul>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:1">\n        <p>\n        The Web Components spec specifies that valid names should be in the form of 2 words separated by a hyphen in order to avoid conflicts with existing and future "official" HTML elements.\n        <a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n</ol>\n</div>',frontmatter:{title:"Custom Elements By Example",keywords:null,category:"platform",date:"2014-08-28T12:33:00+00:00",path:"/2014/08/28/custom-elements-by-example",layout:"post",hideFooter:null},fields:{slug:"/2014/08/28/custom-elements-by-example"}}},pathContext:{slug:"/2014/08/28/custom-elements-by-example",relatedPosts:[{path:"/2014/08/07/component-based-development",data:{title:"Component Based Development",path:"/2014/08/07/component-based-development",description:"Exploring the Web Components spec, and the future of web architecture",date:"2014-08-07T11:30:00+00:00"}}]}}}});
//# sourceMappingURL=path---2014-08-28-custom-elements-by-example-b524da8b658b12d59025.js.map