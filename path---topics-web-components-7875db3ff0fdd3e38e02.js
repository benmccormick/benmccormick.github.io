webpackJsonp([0x9ddb930c5c3e],{922:function(e,t){e.exports={pathContext:{posts:[{node:{frontmatter:{readNext:"component-based-dev,custom-elements-example",topics:["Web Components"],category:"platform",key:null,title:"Mozilla: The state of Web Components",description:"A look at Mozilla's writeup on the current status of the web components spec",layout:"post",path:"/2015/06/14/mozilla-the-state-of-web-components",date:"2015-06-14T21:35:58+00:00",dontfeature:null,isDraft:null},html:'<p>Over on Mozilla’s development blog, Wilson Page has a <a href="https://hacks.mozilla.org/2015/06/the-state-of-web-components/">great summary</a> of the current status of the Web Components spec:</p>\n<blockquote>\n<p>Web Components have been on developers’ radars for quite some time now. They were first introduced by Alex Russell at Fronteers Conference 2011. The concept shook the community up and became the topic of many future talks and discussions.</p>\n<p>In 2013 a Web Components-based framework called Polymer was released by Google to kick the tires of these new APIs, get community feedback and add some sugar and opinion.</p>\n<p>By now, 4 years on, Web Components should be everywhere, but in reality Chrome is the only browser with ‘some version’ of Web Components. Even with polyfills it’s clear Web Components won’t be fully embraced by the community until the majority of browsers are on-board.</p>\n</blockquote>\n<p>I’ve been using Custom Elements (the least controversial part of the Web Components spec) in production for a little less than a year now thanks to a <a href="https://github.com/WebReflection/document-register-element">small polyfill script</a>.  I know that many others are using a version of them through <a href="https://www.polymer-project.org/1.0/">Polymer</a>.  It’s been sad to see the spec stagnate without browser support for much longer than might have been expected, but it seems there’s reason for hope.</p>\n<blockquote>\n<p>Web Components have been in planning for over three years, but we’re optimistic the end is near. All major vendors are on board, enthusiastic, and investing significant time to help resolve the remaining issues.</p>\n</blockquote>\n<p>It’s exciting to see public cooperation on this issue, something that was not very visible over the past few years as Chrome fired ahead with an implementation while others pursued other priorities.  If you care about this spec at all, make sure to read <a href="https://hacks.mozilla.org/2015/06/the-state-of-web-components/">the full article</a>.  It’s an interesting look at where the spec may be going as well as a nice peak behind the scenes of how web APIs become established.</p>',fields:{slug:"/2015/06/14/mozilla-the-state-of-web-components"}}},{node:{frontmatter:{readNext:"custom-elements-example",topics:["Web Components"],category:"platform",key:"component-based-dev",title:"Component Based Development",description:"Exploring the Web Components spec, and the future of web architecture",layout:"post",path:"/2014/08/07/component-based-development",date:"2014-08-07T11:30:00+00:00",dontfeature:null,isDraft:null},html:'<p>If you look back at the history of JavaScript and the client-side web as a development platform, you can see that there were several critical turning points for the language. Javascript has evolved from a <a href="http://www.computer.org/csdl/mags/co/2012/02/mco2012020007.html">10-day toy language</a> to possibly the <a href="http://adambard.com/blog/top-github-languages-for-2013-so-far/">most used language in the world</a>, but that didn’t happen overnight.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/timeline-548be792358b15fd4f279d468d527bc4-555be.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 97.00000000000001%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAIAAAAf7rriAAAACXBIWXMAABYlAAAWJQFJUiTwAAADRklEQVQ4y2VT224bVRSdX0DihQfeKoQKpU1bO3bsSRxn7Lk6cW3X41tctbRN4vQHQIIHRFWQEJeImyglgkItUteey5kZx3asor5VUdWqaQMkSEjlJ4hoy9ozJqiqtHS0z9rymbXXXuZuv//W1VdfNNIhQwx3RDpNMWxIOENG6hjxwjFDDN2YGWsnx0xpHDBSx3945YWtyyvcva8+7ohhr6K6ZdkrK25J8Upyt6oCXknqVsDI1C3JLl3Ba15V7aSO77R+4nat6703C8NGfbBU7S9UBouVjcXqxlKAmn9W+gvloEXdpepwud47W/zr1ga3+eG7zSMvO3NTeMyAJDFsyRFbidrqhIURpHFLiZJa/7SUCK5Mi19746WHq19ydz691Eoc8sqylU2wvGDnknZ+xikI7skUKwgsN8PyAQRc3WLaOZlyi+J1/uCvzVVu11zrnsoOlmq+tn151UBkAJA9vztS3qitn8mT7Lsrl8x0yC0ITm7anuXtuUk2y7O5SQwCsOyUk52yMnEW1CcSTjbhFYT29OHfrl3hNj9670byCMsmrAxvKFFrdtLEtBne0mKmGsVzlhY35KipxkwtZtHrU+zEdGvy9e2r33C7xs/denajMb+vMLB04BuOEyP0/x/E55fn10/nSDZ2jc9iqzDDLZIZtF5d7OIsSZ4uwjnAyc+g9nQw0npFgec7rR+5O59c7CTH7EwcMTKxpEzclKO2FqNVqVSYUgTi28JRrCrgMXyLP/jw+6+539tNrz43aNT6vub++dLI5IVnrCbxMDxQ3qhhQY9+GXD3L38GJ7yKggXSDnUpUA640IxZ9DQrphl108To6fWKZioTu50mt/nBO+3EIQaT5QgJnuVNKcwyceiHSMw2KggBM+HmpiH7wXdfkGxYN7xQhxhEZbDoR7pBADNcnv+vnkcXPgPDC6cQkkc3e9zWlc8RaXjIEMxcEkkkewtwWEBIKacFwc5Ty8mPGK8o4id/mGvc7Ytvt/jXyO10yNLgMIFCluFBoqacqBOGHKFajVnSODK3Nn5g69sVbru56lY1mIx/We+cTjhb7J/XiQmuxBA5wjm9v1h2qtqfPcY9efz4n7295/C3j/36+e7ek6dP/wWi4zLLYP8d8QAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="JavaScript timeline"\n        title=""\n        src="/static/timeline-548be792358b15fd4f279d468d527bc4-d766e.png"\n        srcset="/static/timeline-548be792358b15fd4f279d468d527bc4-a6b6e.png 143w,\n/static/timeline-548be792358b15fd4f279d468d527bc4-8e488.png 285w,\n/static/timeline-548be792358b15fd4f279d468d527bc4-d766e.png 570w,\n/static/timeline-548be792358b15fd4f279d468d527bc4-13239.png 855w,\n/static/timeline-548be792358b15fd4f279d468d527bc4-cab6d.png 1140w,\n/static/timeline-548be792358b15fd4f279d468d527bc4-555be.png 1400w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>JavaScript’s growth started with its adoption as the lingua franca of the web when it shipped with Netscape and Internet Explorer in the 90s.  The introduction of Ajax and asynchronous data exchange in the mid-aughts was another sea change, bringing the potential for truly responsive web applications like Gmail for the first time.  <a href="http://jquery.com/">jQuery</a>’s introduction in 2006 dramatically reduced the pain involved in cross-browser development for rich applications. And the last 5 years have brought 2 more major changes with <a href="http://nodejs.org/">Node.JS</a> and a <a href="http://blog.stevensanderson.com/2012/08/01/rich-javascript-applications-the-seven-frameworks-throne-of-js-2012/">raft of MVC frameworks</a>.  NodeJS is a server-side technology, but it has spurred a huge standardization and improvement in tooling for the web platform. That, along with great work by browser vendors on their developer tools, has led to drastically easier workflows for front end developers.  At the same time, frameworks like BackboneJS, AngularJS and EmberJS have brought architecture concepts to the client-side and made a new type of “Single Page App” possible and easy to build.</p>\n<p>Those 5 shifts, along with other significant events like Google’s creation of Chrome and the rise of mobile, have shaped the web development world as we see it today. Depending on who you listen to though, we may be on the cusp of another pivotal moment.  </p>\n<p><em>Component Based Development</em> is a blanket term I’m using to describe a movement that has been growing over the past year in web development.  The results of this movement have taken several forms.  There’s an <a href="http://www.w3.org/standards/techs/components#w3c_all">official W3C standard</a>, Web Components, that will eventually be available in all browsers natively.  That standard has polyfills, which allow developers to begin using Web Components now, along with convenience extensions.  Several existing MVC frameworks have provided component features inspired by the Web Component spec.  And there are alternative component implementations, which embrace the ideas behind component based development without embracing the specific implementation of Web Components.</p>\n<h3>So what is Component Based Development?</h3>\n<p>The heart of the component based development movement is a desire to provide greater code reusability and abstraction by bundling functionality into small composable components.  JavaScript applications started as monoliths.  The language doesn’t provide private attributes by default, and applications were initially mostly small, so everything lived in the global scope.  As applications have become more complex, this has changed, first with namespacing, then with the module pattern, and again with module loaders like requireJS and Browserify.  The features mapped out by the Web Components standard will build on this trend.  Component based development in general is the natural conclusion of the march to modularity.  Components are intended to be “black box” building materials.  They have an API, but the developer doesn’t need to know about the internals, and ideally can’t take advantage of that knowledge regardless.</p>\n<p>Talking about this type of abstraction is nothing new.  Whether you’re using the module pattern or Backbone Views, it’s always been a best practice to keep internal implementations hidden.  But web components in particular give this more teeth, by discouraging external CSS and Javascript from accessing the internal dom tree of the element. Other implementations can’t rely on that native split yet, but they similarly promote a declarative style that discourages tightly coupled micro-managing code.</p>\n<p>Components also have the potential to provide greater readability.  Compare Google Map’s current <em>Hello World</em> example, with a web component powered alternative:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code><!DOCTYPE html>\n<html>\n  <head>\n    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />\n    <style type="text/css">\n      html { height: 100% }\n      body { height: 100%; margin: 0; padding: 0 }\n      #map-canvas { height: 100% }\n    </style>\n    <script type="text/javascript"\n      src="https://maps.googleapis.com/maps/api/js?key=API_KEY">\n    </script>\n    <script type="text/javascript">\n      function initialize() {\n        var mapOptions = {\n          center: new google.maps.LatLng(-34.397, 150.644),\n          zoom: 8\n        };\n        var map = new google.maps.Map(document.getElementById("map-canvas"),\n            mapOptions);\n      }\n      google.maps.event.addDomListener(window, \'load\', initialize);\n    </script>\n  </head>\n  <body>\n    <div id="map-canvas"/>\n  </body>\n</html></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code><!DOCTYPE html>\n<html>\n  <head>\n    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />\n    <link rel="import" href="google-maps.html">\n  </head>\n  <body>\n    <google-map></google-map>\n  </body>\n</html></code></pre>\n      </div>\n<p>Quite a readability difference right?  Of course all of that Javascript and CSS didn’t simply vanish.  It still needs to exist somewhere, in this case within an imported HTML file.  But it can be encapsulated and looked at only when necessary.  The user who’s just glancing at your template can get a big picture view when she needs it, and then know where to dive in when she’s specifically interested in your mapping technology.</p>\n<p>In the end this is just another way of managing complexity.  There is unavoidable complexity associated with connecting to the Google Maps API and styling the map appropriately.  But when that complexity sits inside an element, it reduces the cognitive load of looking at HTML. That allows you to focus on the semantic meanings of element and the document structure. This kind of clarity is much nicer than our current status quo of searching  through a Javascript modified “div soup” to figure out how our generated DOM is structured.  With current MVC frameworks the HTML may tell you nothing about the final DOM without going through several Javascript files.  The transparency of components is a reclamation of one of the Web’s original central advantages: a semantic markup language that was both human and machine readable.  The tension between the needs of web “documents” and “applications” has slowly eroded the Web’s declarative foundations, but component implementations do their best to embrace it.</p>\n<h3>So Why Should I Care?</h3>\n<p>Did that introduction excite you?  Or are you sitting there yawning?  You may think this is solving problems you don’t have. You also might be the guy still supporting IE8, who can’t even contemplate worrying about “Web Standards” if they aren’t even supported in IE11.  If that’s you, it’s still worth following this movement, even if you’re not coding like this just yet on your current projects.</p>\n<p>For one thing, the component based mentality is already having a big effect on the crop of frameworks that people are using <strong>now</strong>.  EmberJS and Angular have supported component-like features for a while now.  KnockoutJS (which supports back to IE6!) is about to release significant support for a component-based development strategy. And the latest JavaScript Framework darling, Facebook’s ReactJS, is a completely component based library that supports browsers back to IE8.  </p>\n<p>Component based development has also gained significant support in the community.  I already mentioned the strong support from existing libraries, but there’s more to it than that. <a href="http://facebook.github.io/react/">Facebook</a>, <a href="http://www.polymer-project.org/">Google</a>, and <a href="http://mozbrick.github.io/">Mozilla</a>, three of the web’s foundational companies, have all released component based libraries.  Google’s Polymer library in particular has been featured as the center of their web developer tooling lately.  Web Components are already supported in Chrome and Firefox.  Along with the community support and the trend towards auto-updating browsers, this is likely to be a relevant every-day technology sooner than you may think.</p>\n<h3>The Takeaway</h3>\n<p>2014 is an interesting time for web development.  There’s a lot to be excited about, as the component paradigm is leading to a lot of interesting experiments that create new possibilities.  Ideas like React’s Virtual DOM and Polymer’s completely declarative application structures are going to be tested and tried, and we’re likely to be better off in the end.  </p>\n<p>There’s also plenty to be skeptical about.  The lack of any known support for Web Components in Safari or IE is troubling.  While Polymer’s “everything is an element” philosophy is fascinating, I suspect that we’ll look back and see it as an example of taking a good idea too far.  And like any technology, until it’s been proven in production, we can’t really know how these technologies will evolve.</p>\n<p>For anyone invested in the Web Platform, it’s time to be informed. Regardless of where each individual spec goes, the ideas behind this movement are going to influence our professions for years to come.  Over the next month or so, I’m going to be diving deep into the current state of components, taking a look at the various aspects of the Web Component spec and also looking at the various libraries that are providing their own take on component based development. I hope you’ll come along, and help grow the conversation about the future of the web platform.</p>\n<hr>\n<h3>More Resources</h3>\n<ul>\n<li>\n<p>In <a href="http://addyosmani.com/blog/the-webs-declarative-composable-future/">The Web’s Declarative, Composable Future</a> Addy Osmani lays out a manifesto for component based development, and Web Components in particular.  If you’re struggling to understand why somebody would want Web Components, this is the piece to read.</p>\n</li>\n<li>\n<p>TJ VanToll reminds us that <a href="http://developer.telerik.com/featured/web-components-arent-ready-production-yet/">Web Components Aren’t Ready For Production… Yet</a> on Telerik’s Developer Blog.  He does a good job of higlighting the browser support issues along with the difficulties of polyfilling this particular technology.</p>\n</li>\n<li>\n<p>This <a href="https://github.com/knockout/knockout/issues/1273">Github discussion</a> is an interesting look into the thought process of why a traditional MVC library would be interested in providing component features, and the value they bring.</p>\n</li>\n</ul>',fields:{slug:"/2014/08/07/component-based-development"}}},{node:{frontmatter:{readNext:"component-based-dev",topics:["Web Components"],category:"platform",key:"custom-elements-example",title:"Custom Elements By Example",description:"Explaining Custom Elements and the Web Components spec",layout:"post",path:"/2014/08/28/custom-elements-by-example",date:"2014-08-28T12:33:00+00:00",dontfeature:null,isDraft:null},html:'<p>The best attribute of HTML is its ability to be simultaneously machine-readable and human-readable.  I’d argue that it’s one of the biggest reasons for the web platform’s success. Anyone can  “view page source” and have some understanding of what they’re seeing.  Javascript based “Single Page Applications” have undermined this a bit.  Now the original HTML of a page may just be an empty body tag, and even when you inspect the generated page, it will probably just be a sea of div tags.</p>\n<p>That’s going to start changing in the near future.  Custom Elements, part of the <a href="http://www.w3.org/standards/techs/components#w3c_all">Web Components spec</a>, are a way of bringing back the semantic web.  They allow you to encapsulate HTML and Javascript functionality into “elements” which you can include in your HTML like any existing native element, with all their semantic benefits.   The best part? They’re <a href="http://developer.telerik.com/featured/web-components-ready-production/">usable in production now</a>.</p>\n<h3>So What does it look like to use custom elements?</h3>\n<p>Talking about this stuff is great, but this is an API for shippable code, not just an abstract spec. So let’s look at a simple example.  In a past job, I made pretty extensive use of the <a href="http://jqueryui.com/">jQuery UI</a> widget library.  jQuery UI is great, but I always found it a bit akward to work with in practice. When it’s used, it takes an existing HTML Element, usually a <code>&#x3C;div></code> and transforms it into a widget.  That means that to understand the end result created by the widget code, you have to look in at least 2 places, the original HTML code that contained the transformed element, and the JavaScript code that contained the call. It creates mental overhead knowing that you always had to remember to widgetize the dom element when it’s rendered. It also means accepting that the final result of the widget might look significantly different than the original.  For instance, here’s the before or after for the progress bar widget.  I chose it for it’s simplicity, but you can see that the final result is barely recognizable from the source.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-7ce94.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 81.86003683241252%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAIAAACZeshMAAAACXBIWXMAABYlAAAWJQFJUiTwAAACBElEQVQoz3WS7XKcIBiF9/5vID9yL2l/dDKd2bSZpt3Ntn6BX6gICK6KKNpX7STZdHMGDyLz8B6Q3TzP0zRprTlXlKqUSFW3velbrbted+Ad2Ktg2Pf9vGoHj7W2qoTj+Pf3+69f9k8Pj+7hmIURjRKWF5TSbBUhJE3TPM+rqnqFobIQoixLhHHw8xd++IEeD+nJ488uCxNgPM9zXdf3ffAwDDnnV+A4jnEYkjzLGCsEF0pymOAcSkEPLqUEUil1EVspCUtiHGeEQgNAMM4Z4+BLzzbfdAFD7Twv93vYs3s8RgiRhdka32D+oiswIfTb9+B0iiFCBWmrisu1VZBWrKk/hqGy6yRRViAUMS9kLlrcCShOEMpcN4XVN/49DAdWlhy2WgqW5QWPCcMxW53nFLA4zouivF4Z4IKWvp8GAaG0ZIIzIdhyyltWttb8d1rwU+DM38aem1aTTBIi23a5QHCTjNaj6YfBbMP+jYwxF/A72WkCv7k73twdXob/azddmxjt8vH28+H20wrbD2DFahmJoW3qepTStGdjtTJN2571udLgpjM17KYZpOy7RtdKd41p6qHrxp3uRooEDwL/KXo+VMhXWRAmfhL7KXJE6JXYSfGfKPSEcxIpyinGFG75b7gNZoldICmLRst2GOwwzv0wg492Cd8b+/IO2eFlsosGGNr5L4lNhlMBuZtwAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="source -> display"\n        title=""\n        src="/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-d766e.png"\n        srcset="/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-a6b6e.png 143w,\n/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-8e488.png 285w,\n/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-d766e.png 570w,\n/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-13239.png 855w,\n/static/code_comparison-1-8279aff531e5a460800bdf049e11b7d8-7ce94.png 1086w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>This seems like the perfect opportunity to use a custom element.  If we can encapsulate all that behavior, we’ll be able to ensure that the progress bar is always rendered when it appears, and we can hide any ugly transformed DOM elements underneath a shiny semantic element.  Sounds great! So let’s see how this works.</p>\n<p>To start, we need an object to serve as our progress bar element’s prototype.  It should inherit from the base <em>HTMLElement</em> class. We can create the prototype object like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> ProgressBar  <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>HTMLElement<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Now that we have our Prototype element, we can register it as a custom element using the <code>document.registerElement</code> API. For now this is only natively available in Chrome, but it’s quite reasonable to <a href="https://github.com/WebReflection/document-register-element">polyfill</a>. <code>registerElement</code> accepts 2 arguments: the name of the element<sup id="fnref:1"><a href="#fn:1">1</a></sup>, and an optional second argument to allow you to specify a prototype for your element.  So let’s set up a <code>progress-bar</code> element:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">registerElement</span><span class="token punctuation">(</span><span class="token string">\'progress-bar\'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>\n  prototype<span class="token punctuation">:</span>ProgressBar\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Our <code>ProgressBar</code> object will now serve as the prototype for the <code>progress-bar</code> element.  That means we can extend it and give it extra functionality which will then be available on every instance of that element.  Besides allowing us to attach arbitrary properties or functionality to an element, this lets us hook into the “lifecycle callbacks” of HTML Elements, which you can see in this chart from <a href="https://github.com/WebReflection/document-register-element">HTML5Rocks</a>:</p>\n<table class="table">\n  <thead>\n    <tr>\n      <th>Callback name</th>\n      <th>Called when</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>createdCallback</td>\n      <td>an instance of the element is created</td>\n    </tr>\n    <tr>\n      <td>attachedCallback</td>\n      <td>an instance was inserted into the document</td>\n    </tr>\n    <tr>\n      <td>detachedCallback</td>\n      <td>an instance was removed from the document</td>\n    </tr>\n    <tr>\n      <td>attributeChangedCallback(attrName, oldVal, newVal)</td>\n      <td>an attribute was added, removed, or updated</td>\n    </tr>\n  </tbody>\n</table>\n<p>Let’s start by looking at createdCallback.  Since this gets run when the element is first created, this is a great time to run any initialization code that doesn’t require the element to be present in the DOM yet.  Since jQuery UI’s progress bar code doesn’t require the element to be attached to the DOM, we can do all of our initialization here.  That could look something like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>ProgressBar<span class="token punctuation">.</span><span class="token function-variable function">createdCallback</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">\'&lt;div id="bar">\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">progressbar</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    value<span class="token punctuation">:</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">\'value\'</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token number">0</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>So using jQuery, we create a new div element and immediately transform it into a progressbar object. Then we attach it inside our custom element container. Pretty straightforward.</p>\n<p>Note that we set the value of our progress bar from the <em>value</em> attribute of our element.  HTML attributes provide a very convenient “public API” for Custom Elements.  You have complete access to an elements attributes inside these callbacks, allowing for easy declarative APIs. In the case of our simple progress bar, <code>value</code> is the only attribute we care about, and other attributes are ignored.</p>\n<p>But what if the value of our element changes?  Attributes aren’t a one time only API.  If we want to react to changes in the attribute, we can use the aptly named <em>attributeChangedCallback.</em>  That callback fires everytime an attribute changes, allowing us to catch the change and respond appropriately.  A more sophisticated element might contain a registry of callbacks for different elements, but for this example we can focus on changes to value.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>ProgressBar<span class="token punctuation">.</span><span class="token function-variable function">attributeChangedCallback</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>attrName<span class="token punctuation">,</span> oldVal<span class="token punctuation">,</span> newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> $bar<span class="token punctuation">;</span>\n  <span class="token keyword">if</span><span class="token punctuation">(</span>attrName <span class="token operator">===</span> <span class="token string">\'value\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    $bar <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'bar\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    $bar<span class="token punctuation">.</span><span class="token function">progressbar</span><span class="token punctuation">(</span><span class="token string">\'value\'</span><span class="token punctuation">,</span><span class="token operator">+</span>newVal<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>And that’s it! We now have a working <code>progress-bar</code> element, that we can put anywhere in our HTML with no extra js configuration.</p>\n<p data-height="257" data-theme-id="8140" data-slug-hash="cFyep" data-default-tab="result" class=\'codepen\'>See the Pen <a href=\'http://codepen.io/ben336/pen/cFyep/\'>Custom Elements Progressbar Example</a> by Ben McCormick (<a href=\'http://codepen.io/ben336\'>@ben336</a>) on <a href=\'http://codepen.io\'>CodePen</a>.</p>\n<p>Of course there is plenty more we could do.  A more complicated element might require some initialization to be moved to the <code>attachedCallback</code>, and might require better cleanup using the <code>detachedCallback</code>.  For communication with the rest of our app that didn’t fit well into the “changing attributes” model, we might need to implement an eventing system or global registry for accessing data.  But those are all additions on this basic, useful building block.</p>\n<p>If you’re interested in trying out custom elements, there’s never been a better time to get started. It’s easy to try out proof of concepts in Chrome, and there’s a <a href="https://github.com/WebReflection/document-register-element">light-weight polyfill</a> with support back to IE9 for those who want to start using them in production.  If this is something that excites you, there’s no reason not to start using this tool in your code today.</p>\n<h3>More Resources</h3>\n<ul>\n<li>HTML5Rocks has an awesome <a href="https://github.com/WebReflection/document-register-element">detailed look</a> at Custom Elements that covers all of the ground we looked at here, and more.  If you want to dive deeply into this feature, it’s a great read to get started.</li>\n<li>Telerik posted another <a href="http://developer.telerik.com/featured/web-components-ready-production/">great piece</a> on this topic a few weeks ago, which focuses more on the case for Custom Elements being production ready now</li>\n<li>If you’re interested in using more than just Custom Elements, <a href="http://www.polymer-project.org/">The Polymer Project</a> by Google is an ambitious library built around the Web Component spec.  They attempt to polyfill the whole spec, then wrap convenience functions around the low level elements.  It’s an interesting, ambitious project, though not yet ready for production.</li>\n</ul>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:1">\n        <p>\n        The Web Components spec specifies that valid names should be in the form of 2 words separated by a hyphen in order to avoid conflicts with existing and future "official" HTML elements.\n        <a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n</ol>\n</div>',
fields:{slug:"/2014/08/28/custom-elements-by-example"}}}],topic:"Web Components"}}}});
//# sourceMappingURL=path---topics-web-components-7875db3ff0fdd3e38e02.js.map