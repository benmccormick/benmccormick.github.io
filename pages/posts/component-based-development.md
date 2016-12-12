---
title: "Component Based Development"
date: "2014-08-07 11:30:00+00:00"
layout: "post"
path: "/2014/08/07/component-based-development"
category: "platform"
pageViews: "8552"
last30pageViews: "101"
---

If you look back at the history of JavaScript and the client-side web as a development platform, you can see that there were several critical turning points for the language. Javascript has evolved from a [10-day toy language][jsorigin] to possibly the [most used language in the world][githubstats], but that didn't happen overnight.

![JavaScript timeline](/posts/images/timeline.png)


JavaScript's growth started with its adoption as the lingua franca of the web when it shipped with Netscape and Internet Explorer in the 90s.  The introduction of Ajax and asynchronous data exchange in the mid-aughts was another sea change, bringing the potential for truly responsive web applications like Gmail for the first time.  [jQuery][jquery]'s introduction in 2006 dramatically reduced the pain involved in cross-browser development for rich applications. And the last 5 years have brought 2 more major changes with [Node.JS][node] and a [raft of MVC frameworks][mvc].  NodeJS is a server-side technology, but it has spurred a huge standardization and improvement in tooling for the web platform. That, along with great work by browser vendors on their developer tools, has led to drastically easier workflows for front end developers.  At the same time, frameworks like BackboneJS, AngularJS and EmberJS have brought architecture concepts to the client-side and made a new type of "Single Page App" possible and easy to build.


Those 5 shifts, along with other significant events like Google's creation of Chrome and the rise of mobile, have shaped the web development world as we see it today. Depending on who you listen to though, we may be on the cusp of another pivotal moment.  

*Component Based Development* is a blanket term I'm using to describe a movement that has been growing over the past year in web development.  The results of this movement have taken several forms.  There's an [official W3C standard][spec], Web Components, that will eventually be available in all browsers natively.  That standard has polyfills, which allow developers to begin using Web Components now, along with convenience extensions.  Several existing MVC frameworks have provided component features inspired by the Web Component spec.  And there are alternative component implementations, which embrace the ideas behind component based development without embracing the specific implementation of Web Components.

### So what is Component Based Development?

The heart of the component based development movement is a desire to provide greater code reusability and abstraction by bundling functionality into small composable components.  JavaScript applications started as monoliths.  The language doesn't provide private attributes by default, and applications were initially mostly small, so everything lived in the global scope.  As applications have become more complex, this has changed, first with namespacing, then with the module pattern, and again with module loaders like requireJS and Browserify.  The features mapped out by the Web Components standard will build on this trend.  Component based development in general is the natural conclusion of the march to modularity.  Components are intended to be "black box" building materials.  They have an API, but the developer doesn't need to know about the internals, and ideally can't take advantage of that knowledge regardless.

Talking about this type of abstraction is nothing new.  Whether you're using the module pattern or Backbone Views, it's always been a best practice to keep internal implementations hidden.  But web components in particular give this more teeth, by discouraging external CSS and Javascript from accessing the internal dom tree of the element. Other implementations can't rely on that native split yet, but they similarly promote a declarative style that discourages tightly coupled micro-managing code.

Components also have the potential to provide greater readability.  Compare Google Map's current *Hello World* example, with a web component powered alternative:

```
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map-canvas { height: 100% }
    </style>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=API_KEY">
    </script>
    <script type="text/javascript">
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);
    </script>
  </head>
  <body>
    <div id="map-canvas"/>
  </body>
</html>
```

```
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link rel="import" href="google-maps.html">
  </head>
  <body>
    <google-map></google-map>
  </body>
</html>
```

Quite a readability difference right?  Of course all of that Javascript and CSS didn't simply vanish.  It still needs to exist somewhere, in this case within an imported HTML file.  But it can be encapsulated and looked at only when necessary.  The user who's just glancing at your template can get a big picture view when she needs it, and then know where to dive in when she's specifically interested in your mapping technology.

In the end this is just another way of managing complexity.  There is unavoidable complexity associated with connecting to the Google Maps API and styling the map appropriately.  But when that complexity sits inside an element, it reduces the cognitive load of looking at HTML. That allows you to focus on the semantic meanings of element and the document structure. This kind of clarity is much nicer than our current status quo of searching  through a Javascript modified "div soup" to figure out how our generated DOM is structured.  With current MVC frameworks the HTML may tell you nothing about the final DOM without going through several Javascript files.  The transparency of components is a reclamation of one of the Web's original central advantages: a semantic markup language that was both human and machine readable.  The tension between the needs of web "documents" and "applications" has slowly eroded the Web's declarative foundations, but component implementations do their best to embrace it.


### So Why Should I Care?

Did that introduction excite you?  Or are you sitting there yawning?  You may think this is solving problems you don't have. You also might be the guy still supporting IE8, who can't even contemplate worrying about "Web Standards" if they aren't even supported in IE11.  If that's you, it's still worth following this movement, even if you're not coding like this just yet on your current projects.

For one thing, the component based mentality is already having a big effect on the crop of frameworks that people are using **now**.  EmberJS and Angular have supported component-like features for a while now.  KnockoutJS (which supports back to IE6!) is about to release significant support for a component-based development strategy. And the latest JavaScript Framework darling, Facebook's ReactJS, is a completely component based library that supports browsers back to IE8.  

Component based development has also gained significant support in the community.  I already mentioned the strong support from existing libraries, but there's more to it than that. [Facebook][react], [Google][polymer], and [Mozilla][xtags], three of the web's foundational companies, have all released component based libraries.  Google's Polymer library in particular has been featured as the center of their web developer tooling lately.  Web Components are already supported in Chrome and Firefox.  Along with the community support and the trend towards auto-updating browsers, this is likely to be a relevant every-day technology sooner than you may think.

### The Takeaway

2014 is an interesting time for web development.  There's a lot to be excited about, as the component paradigm is leading to a lot of interesting experiments that create new possibilities.  Ideas like React's Virtual DOM and Polymer's completely declarative application structures are going to be tested and tried, and we're likely to be better off in the end.  

There's also plenty to be skeptical about.  The lack of any known support for Web Components in Safari or IE is troubling.  While Polymer's "everything is an element" philosophy is fascinating, I suspect that we'll look back and see it as an example of taking a good idea too far.  And like any technology, until it's been proven in production, we can't really know how these technologies will evolve.

For anyone invested in the Web Platform, it's time to be informed. Regardless of where each individual spec goes, the ideas behind this movement are going to influence our professions for years to come.  Over the next month or so, I'm going to be diving deep into the current state of components, taking a look at the various aspects of the Web Component spec and also looking at the various libraries that are providing their own take on component based development. I hope you'll come along, and help grow the conversation about the future of the web platform.

---



### More Resources

- In [The Web's Declarative, Composable Future][addy] Addy Osmani lays out a manifesto for component based development, and Web Components in particular.  If you're struggling to understand why somebody would want Web Components, this is the piece to read.

- TJ VanToll reminds us that [Web Components Aren't Ready For Production... Yet][telerik] on Telerik's Developer Blog.  He does a good job of higlighting the browser support issues along with the difficulties of polyfilling this particular technology.

- This [Github discussion][kocomponents] is an interesting look into the thought process of why a traditional MVC library would be interested in providing component features, and the value they bring.


---

### Subscribe

This was the first entry in a series of posts on component based development.  If you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon).

[githubstats]:http://adambard.com/blog/top-github-languages-for-2013-so-far/
[jsorigin]: http://www.computer.org/csdl/mags/co/2012/02/mco2012020007.html
[polymer]: http://www.polymer-project.org/
[react]: http://facebook.github.io/react/
[xtags]: http://mozbrick.github.io/
[addy]: http://addyosmani.com/blog/the-webs-declarative-composable-future/
[telerik]: http://developer.telerik.com/featured/web-components-arent-ready-production-yet/
[kocomponents]: https://github.com/knockout/knockout/issues/1273
[mvc]: http://blog.stevensanderson.com/2012/08/01/rich-javascript-applications-the-seven-frameworks-throne-of-js-2012/
[jquery]: http://jquery.com/
[node]: http://nodejs.org/
[spec]: http://www.w3.org/standards/techs/components#w3c_all
