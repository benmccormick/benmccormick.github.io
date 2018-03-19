webpackJsonp([5740684077730],{672:function(e,t){e.exports={data:{markdownRemark:{html:'<p>Building large web applications using <a href="http://backbonejs.org/">Backbone.js</a> can be hard.  Backbone is a great tool, but it’s designed to be minimalist and useful in a wide variety of situations.  As a result, you get less guidance and support from the tool as you scale up than you do from more opinionated frameworks like <a href="https://angularjs.org/">Angular</a> and <a href="http://emberjs.com/">Ember</a>.  When a Backbone application grows, maintaining it requires adding structure, either through a custom set of conventions and components, or based on somebody elses framework.  There are a lot of different Backbone frameworks out there, but I want to make the case for using <a href="http://marionettejs.com/">Marionette.js</a>.  </p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/marionettelogo-a0c7dbedbcc10868db2db704e69cd9ad-3f7bf.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 355px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 124.7887323943662%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFYElEQVQ4y3WVe0xTVxzHW3TukWwucxPl0fbe9va+ykPoA5WgZuzhlmxzuqmZc+4lf7jNOTX4GkuMqEXepa3yEkoFKshUBGUKDtAyVFqgwgCrWczccFm2mWxZpI+z37m0cE3YSX75nXvO93x+v/O8EgmU9o5ObLNw/VL79+s7LncNO3uurR0duz1HMkNpOt2c1nDqdE/L+e9q8LfNXifFjKlyruWCpLyiSgDW2OsyqqrtCMDoQtul37u6nVl9roGoc61tTzY2ndlYW98wCEBUWn4clVVU2fGY7Tt3SesdjY9GPXDQGPYLd+3ep9/21c43CwpNrScbvkUQ8EGdo/GuvdaB8guKb27fkflh5q692oOHj9B4TIn5qPQRmOfmj5ISyzGhEXwCZPGMZ3h0IQAqj5ZWIGNO3m+HjLljFZXVGN4/Mupd0Xax4zmT+Wg8HlNcYpVW2U5MwtyEGkOERvxdZLLElVdWx8ASjBabLGOHjbmbv9y24/m4uMTHsg8a0yGbBvuJet+ppjOrDufkqUJAwdwkJOwm1QK4ee17whpa8gqTbQcOzc3OyUvI2vtN7Eyb8vX+7LRjOzKfsOYX6dqXp88eefaFiPb0V6cFN9T81Brs6boiRBjbvWe2ubpGtw7qMOWIIzaboDHX1VO1ZguB6/sud3LiQC6cHKQpDU2ddSmZj3uSDVVuFdPcG6vy2Fauzn0dIeHomBiDMIO8zVs3tRHcoEdBXXQu0jf0UdxWt4Ja4qI4aYgaApJ09y8UjwYVFPKqWORW0KhRrUXVK1evCmdQ8cmWeQW0YfySjEW3QTNEqNFtJWhJ2uci1JFTqfYpmacgynC/mkftusUTg3KVr5tgJ05Gc6hexo875HEy4QRE8W3mSA6dimUfDilU/s4kg7+XjfcNQBLAWCSaOz0fgPcxsGvp8sBgLBnsiNchW2Kq76wA1fSWRGtsFQDLp3R+R1IquhlLBHsSdUFnsiEwLFehPhX7mhioAOC/LhqAi9OCkCG6rGAD1foXg/akNH9jNIvKIllkorSBgpSXg3WKuIBHpkQ98cnBq9oU/6hcyHDDNFDJqPsh7etsPOo2LMXAYCfBIUcUi+y6Ff6apLSAhdb7TCkvBQqjeHQSAnhAA0B0NTnFfwvGAiNDDGRh19A1LiF4Rb/EPwJ1J8mcPSHTeJthyvbkZX+al7wybgVYwQLuYZOcq/XIlYEfMFCb4vNOAj8XA5lp4FLfHYJGg0p6vzUmnoD1+6sphkeWSCZQGqVBxoWad70UvWwU9AD0i4CfiYEUrGHwOhOHulNSfV44Dn0kU4r7GmU8WSfTuK3R/IPiKP4t4SIomXVj08DwlDeLN0UGwL9damFTJm4BENpqwv3HY/iny2N4mSiBTXdAA8CJq9rFsCnCLq8XZzgPgD8P0BrUmbp8YkwhAFtx33k5Ozusa5Exj4f0234CoDPJMOFM0geGJoHp0web4mbB1RvwUByI9PeGJzPsxX3DpFrqiOWl5dG8tJ9UzwrNKNtL0qgnUXvvBs3/M4D1SoaWhK5cWNR0V8WhEdiQuwCGAH9A39yQRgr9EhdBR4TuffM4LM8IQPHVg757rpB26vkCEQGNb4B9BPUs8AUAWhAGuieB4TXfA5oj4DPA3gZLeAch8bNDS2d693BWIWAENlfIS/6nFB4rjxAPIvGdBuMh66m/HbTLZhqMwbARU7oia+kaU4nVJAlHBL8brAamchb8B2Dvuwl6I/hMsA3CN0l/AbYKbAtYLgTPA/2neJlKD+WsAWiWGLgBOlvBl4E54H1zg98J3gQeB7kIZgZrB0ALtBeB3gj103Dkzg3Nj56b8ev9Of8BPFfACKJ2lRAAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Marionette Logo"\n        title=""\n        src="/static/marionettelogo-a0c7dbedbcc10868db2db704e69cd9ad-3f7bf.png"\n        srcset="/static/marionettelogo-a0c7dbedbcc10868db2db704e69cd9ad-b4ddb.png 143w,\n/static/marionettelogo-a0c7dbedbcc10868db2db704e69cd9ad-ba535.png 285w,\n/static/marionettelogo-a0c7dbedbcc10868db2db704e69cd9ad-3f7bf.png 355w"\n        sizes="(max-width: 355px) 100vw, 355px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>I’ve been using Marionette for the past year, and it’s been incredibly valuable.  It’s really helped ease a lot of the initial issues I found with scaling out Backbone.  But there was one big issue with Marionette when I started with it. It was not simple to figure out how exactly I should be using it.</p>\n<p>When I start to use a new piece of software, I’m always hoping to see 2 types of documentation.  The first is the nitty-gritty stuff that most people associate with documentation.  What are the APIs available, what can you pass to them, what components, features, or functions does it provide?  The second type is what I think of as the “story telling” documentation.  It overlaps a bit with marketing, but basically it’s the documentation that explains the value of the software, gives you ideas on how you might use it, and outlines the philosophy that lead to the tool.  Without the first type of documentation you end up with an exciting idea that you may struggle to implement.  Without the second type, you can end up with a lot of nice tools that you aren’t sure how to combine together.</p>\n<p>Marionette is great, but it’s a tool that doesn’t have much of the story telling documentation I mentioned above.  It gets off to a good start, with the following intro on its website:</p>\n<blockquote>\n<p>Backbone.Marionette is a composite application library for Backbone.js that aims to simplify the construction of large scale JavaScript applications.</p>\n</blockquote>\n<blockquote>\n<p>It is a Collection of common design and implementation patterns found in the applications that we have been building with Backbone, and includes pieces inspired by composite application architectures, event-driven architectures, messaging architectures, and more.</p>\n</blockquote>\n<p>But the site fails to follow through on explaining the values or philosophy that went into building it.  Instead, when you start with Marionette you’re left with a bunch of components that are well documented individually, without much guidance on how to put them together or use them.  Any explanation of the value added is scoped to an individual component in the docs, and there’s no real indication of why these particular components are bundled together. I’m going to try and provide this type of high level explanation of the value that Marionette can bring, laying out the big picture in this piece and then digging into each area of value in future posts.  To start, let’s look at the problems that Marionette is trying to solve.</p>\n<h3>Decisions, Decisions</h3>\n<p>Developing with Backbone is an exercise in decision making.  Backbone provides you with a minimalist set of Models and Collections that essentially serve as light wrappers around JavaScript objects synced over Ajax. It provides you lightweight Views that associate an object with a DOM node and some data.  It provides a router that associates URLs with function, and it provides helpers for managing events between all of these options.  That leaves Backbone developers with many questions to answer.</p>\n<ul>\n<li><strong>How do you render Views?</strong> - By default, Backbone’s render method does nothing. To use it, you need to fill in your own rendering function.  That could use a templating system like Underscore templates or Handlebars, jQuery manipulation of the DOM, or simple string inserts with <code>.innerHTML()</code>.  You could use the same method for every View, or mix it up and use different methods for different Views.</li>\n<li><strong>How do you manage relationships between objects?</strong> - By default Backbone provides a way to manage sets of Models as a Collection, but it doesn’t have any built-in utilities for handling nested Models or Collections.  And if you want to nest your Views you’re completely on your own.  You can have a View manage it’s child Views, have a single object that manages all Views, or let each View manage itself.</li>\n<li><strong>How do your Views communicate between each other?</strong> - Views will often need to communicate with each other.  If for instance one View needs to change the contents of another area of the page, it could do so directly through jQuery, could get a direct reference to a View managing that area and call a function on it, change a Model that another View listens to, adjust a URL that a router listens to, or fire an event that another View could respond to. Apps can use some combination of all of these methods.</li>\n<li><strong>How do you avoid repeating yourself?</strong> - If you’re not careful, Backbone can involve a lot of boilerplate.  Taking the naive approach, you could end up writing rendering code, View management code and event management code over and over again in every View.  If you try to get around that using inheritance, you can end up with brittle designs that require you to make calls down to a Views prototype when you want View specific code.  Avoiding that type of repetition and the maintenance overhead it brings is a challenge.</li>\n<li><strong>How do you manage a View’s life-cycle??</strong> - What code is responsible for rendering a View?  Does it render itself on creation?  Or is it the responsibility of the object creating it?  Does it get attached to the DOM immediately on render? Or is that a separate step?  When the View is removed from the DOM or deleted, how do you handle any cleanup that is needed?</li>\n<li><strong>How do you structure your application?</strong> - How do you get your app started?  Do you have a central object that starts everything, or is it more distributed?  If you do centralize, do you use the router to start things, or provide some other object for managing your code?</li>\n<li><strong>How do you prevent memory leaks?</strong> - If your application is a <a href="http://en.wikipedia.org/wiki/Single-page_application">Single Page Application</a> or it contains long lasting interactive sections, another issue that you may need to deal with is memory leaks.  It can be easy to create “zombie Views” in Backbone if you’re not attentive to the need to unregister events attached to a View after you’re done with it.</li>\n</ul>\n<p>That’s just a small sample of the type of decision making that you have to make for a Backbone project.  Those questions signify flexibility, but they also represent mental overhead.  If you’re like me, you see these common problems and think that you can get better results relying on a shared solution that leverages the experience of the community.  </p>\n<h3>What does Marionette Give You?</h3>\n<p>Marionette is an attempt to provide this type of shared solution, capturing Backbone best practices as a set of components and design patterns.  So what value does it provide?  Marionette gives you:</p>\n<ul>\n<li><strong>A Standardized Rendering process</strong> - Marionette takes an opinionated stand on how Views should be rendered.  Without any additional configuration, it will take a template that you specify with a View’s template property, compile it with Underscore’s templating function and pass it a model or collection.  If you need to pass it other data, or want to use a different template library, Marionette provides hooks to customize that process in a <a href="http://en.wikipedia.org/wiki/Don%27t_repeat_yourself">DRY</a> way.</li>\n<li><strong>A consistent View lifecycle</strong> - Marionette defines a consistent View life cycle where Views are initialized, rendered, shown, refreshed, and destroyed.  Each of these events has events and callbacks associated it, and any common boilerplate associated with them is handled behind the scenes.</li>\n<li><strong>The ability to define and manage complex layouts</strong> - Marionette provides region objects that define portions of the DOM that can display and swap out Views.  Combined with utilities to manage child views, you can easily create deeply nested View structures with Marionette while minimizing complexity.</li>\n<li><strong>A central event bus with semantic events to simplify communication between Views</strong> - Marionette includes Backbone.Wreqr or Backbone Radio as an event bus to allow communication between Views without explicitly coupling them.  </li>\n<li><strong>Helpers to help you write DRY Code</strong> - In addition to centralizing the rendering and view management code, Marionette provides hooks to allow you to abstract away details of the DOM and events in your View code, and a mechanism to pull common ui operations out into separate reusable objects</li>\n<li><strong>Helpers to avoid “Zombie Views” and memory leaks</strong> - Marionette’s lifecycle includes an explicit destroy phase that cleans up many common sources of memory leaks, and provides a hook for you to take care of the rest</li>\n<li><strong>A central Application object to initialize your application</strong> - Using Marionette, you’re able to specify a set of initializers that run any code that needs to be executed before your application starts, providing a clear structure and starting point to your app.</li>\n</ul>\n<p>That’s not the complete feature set, but it is the essential sales pitch.  I’ll be digging deeper into each of these advantages over my next few posts, but the important thing to understand is that Marionette provides a framework for building Backbone apps that builds on established practices from the community.  If you’re building a Backbone application and want to focus on the problems that are specific to your application, Marionette is a great way to move past common issues and focus on what’s unique to you.</p>\n<h3>More Resources</h3>\n<ul>\n<li>For a practical introduction to Marionette, you could do much worse than <a href="https://www.youtube.com/watch?v=PrQSpdWkN6Q">this talk</a> from the recent Nodevember conference.  Jeremy Fairbank, a member of the Marionette core team, explained how you can use Marionette to improve the architecture of your Backbone apps.</li>\n<li>The resource that best helped me understand Marionette isn’t technically about Marionette at all.  Derek Bailey’s book <a href="https://leanpub.com/building-backbone-plugins?a=3a4Srv2pP9p87WQ_eoDoGp">Building Backbone Plugins</a> lays out the philosophy and thinking behind Marionette without directly referencing it, explaining the challenges that he faced in building a useful abstraction over Backbone.  You can read my <a href="http://benmccormick.org/2014/07/09/understanding-the-backbone-mindset-a-review-of-building-backbone-plugins-by-derick-bailey/">full review</a> if you’re interested, but I highly recommend it for any Backbone developer as a way of better understanding how to structure your Backbone applications.</li>\n</ul>',frontmatter:{title:"The Case For Marionette.js",keywords:"JavaScript Marionette.js Backbone",category:"frameworks",date:"2014-12-02T01:53:52+00:00",path:"/2014/12/02/the-case-for-marionette-js",layout:"post",hideFooter:null},fields:{slug:"/2014/12/02/the-case-for-marionette-js"}}},pathContext:{slug:"/2014/12/02/the-case-for-marionette-js",relatedPosts:[{path:"/marionette-explained",data:{title:"Marionette: Explained",path:"/marionette-explained",description:"A series of posts explaining Marionette.js",date:null}},{path:"/2015/09/09/what-can-backbone-developers-learn-from-react",data:{title:"Lessons Backbone Developers Can Learn From React",path:"/2015/09/09/what-can-backbone-developers-learn-from-react",description:"A look at the lessons that Backbone developers can learn from React",date:"2015-09-09T11:19:43+00:00"}},{path:"/2015/01/26/backbone-radio",data:{title:"Building Modular Web Apps With Backbone.Radio",path:"/2015/01/26/backbone-radio",description:"An overview of using Backbone.Radio in Marionette apps",date:"2015-01-26T12:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2014-12-02-the-case-for-marionette-js-b7c965e9863095a4ab41.js.map