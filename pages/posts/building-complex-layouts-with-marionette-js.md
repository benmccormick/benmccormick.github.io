---
title: "Building Complex Layouts With Marionette.js"
date: "2014-12-22 04:43:47+00:00"
layout: post
path: "/2014/12/22/building-complex-layouts-with-marionette-js"
description: "How to build complex UIs with Marionette.js"
keywords: "Marionette, Backbone, UI, Architecture, JavaScript"
---

*This is the third post in a series on [Marionette.js][marionette].  For more background on what Marionette is, check out the first post in the series, [The Case For Marionette][caseformarionette]*

When building complex web applications, many of the first decisions you have to make revolve around the structure and layout of your application. Most applications will have some static portions like navigations or footers, and some dynamic portions holding content or page specific controls.  A good layout manager will allow you to easily control these layouts, helping you keep structure consistent between pages and actions while swapping out content on changes in routes or data.  

Backbone provides Views as a way of managing the display of a web app's UI.  But it doesn't provide any guidance on how you should use them to construct complex layouts.  Should you have one view per page and control the layout with templates and jQuery?  Use one View for each section of the page?  Or have a top level view that creates child views to manage different sections?  All of these are possible with Backbone, and none of them are particularly encouraged or discouraged by the library design.  In fact because Backbone doesn't provide any consistent conventions for managing subviews, rendering content, or attaching rendered content to the DOM, even projects that take the same approach to managing layout might implement these patterns quite differently.

In my [first post][caseformarionette], I talked about how one of the strengths of Marionette is the way it helps remove many of the decisions that Backbone developers have to make for each project by providing components based on community-tested patterns.  Layout is another area where Marionette can give you a standardized solution.  Marionette does this by providing Regions and by making it easy to manage child Views.


### Layout in Marionette

Regions are the primary tool Marionette provides for defining layouts.  A Region is a defined portion of the page, held within a root DOM element. You can swap different Views in and out of Regions, or show one View and let it stay there permanently.  Like everything in Backbone applications, Regions emit events, which allow you to design functionality that is triggered before or after a region's content changes.  Regions map very well to low fidelity layout wireframes like the one below, but they also can be used for organizing smaller components.  They're an organization tool for attaching and removing Views in a consistent way.

![Regions image](/posts/images/marionette_regions-1.png)

Regions really shine when it comes to child Views.  When you're setting up Views in a normal Backbone application, you have to be very careful to avoid memory leaks by replacing a view without properly destroying it, especially for long-running SPA style apps. If you're properly cleaning up Views when they're destroyed, another thing that Marionette can help with, Regions remove that pain by ensuring that a View is properly destroyed if replaced in a Region, removing boilerplate and the opportunity for subtle memory bugs.  They also provide a clean central way to attach child Views, making it easier to maintain consistency across a project and promoting readability when moving into different code.

### LayoutView

Regions are great, but for the most part you're not going to want to use them directly.  Instead, Marionette provides a special View class, LayoutView.  LayoutViews allow you to build View tree hierarchies.  You can have one top level View that controls the entire page, or a section of the page that your Marionette app lives in.  That root view can then contain Regions which you use to show child Views.  Some of those child Views may themselves be LayoutViews, and so on for as many levels as you like.  This setup allows you to create modular View classes with few responsibilities that you can easily replace or update without having to write a lot of boilerplate code.

That's the high level overview, but let's dig into what the code looks like.  To use regions in a LayoutView, we don't have to directly create them.  Instead we define a regions object that works similarly to the events object on normal Backbone Views.  The regions object takes a Region name as a key and a jQuery selector as a value, and then create Region objects for each key-value pair and attach them to the View.  If you need to do something more complicated you can create a regions function that returns an object with the key-value pairs that you would like.  Here's an example of what a LayoutView might look like in practice.

```javascript
var Mn = require('backbone.marionette');
var Radio = require('backbone.radio');
var FooterView = require('views/footer');
var HeaderView = require('views/header');
var IndexView = require('views/index');

var RootView = Mn.LayoutView.extend({

  regions: {
    header: '#navbar',
    content: '.content-area',
    footer: 'footer'
  },

  initialize: function() {
    Radio.channel('root').comply('set:content',function(contentView) {
        this.getRegion('content').show(contentView);
    });
  },

  onBeforeShow: function() {
    this.getRegion('header').show(new HeaderView());
    this.getRegion('footer').show(new FooterView());
    this.getRegion('content').show(new IndexView());
  }

});

```

This is an example of a RootView that could be shown in a standalone Region and used as the top-level of a View hierarchy.  There are a few things to note about this example.  It defines 3 regions, a header and footer that render static Views, and a content area that originally contains an index View.  The initialize function uses Backbone.Radio to listen for commands and can swap out the View held in the content region when commanded. Those views could be swapped based on users navigating to a new route, with the routes initializing the Views and passing the commands, or based on a data change of some type.  We can also see that the child Views are shown within the onBeforeShow callback.  I'll be discussing View life-cycle methods more in my next post, but for now just know that onBeforeShow runs immediately before a View is shown in a region.  You can use it when nesting your Views in order to make sure your Views are only attached to the DOM once, which prevents the browser from having to repaint the window multiple times.


### It's Turtles All The Way Down

The great thing about Marionette's View system is that you can take the 3 Views I've gone over in my last 2 posts, ItemView, CollectionView, and LayoutView, and use them to represent pretty much any layout you'd like.  The basic rules: LayoutViews are used to structure the page into regions and regions into subregions. ItemViews are used to bind data to a UI, and CollectionViews are used to iterate over a Collection when each item in a Collection has complex data or behaviors associated with it and should be bound to an individual View or View tree<sup id="fnref:1">[1](#fn:1)</sup>. This consistency makes it easy to learn how to structure Marionette apps, and makes it simple for experienced Marionette developers to jump into a new project quickly and get their bearings.  That's really the promise of Marionette in a nutshell: consistent patterns that allow for a better development experience.


### More Resources

- For more on nesting Marionette Views, you can check out [this talk][nestingvideo] by Marionette core team member Sam Saccone.  It's a quick 10 minute video covering much of the same stuff I went through here.
- I'll talk more about this in a future post, but if you have a Marionette app and want to visualize your View hierarchy, [Marionette Inspector][inspector] is a great new tool for debugging Marionette apps, and it's primary developer, Jason Lastner gave a [great talk][inspectortalk] describing how to use it at BackboneConf this week.



### Subscribe

Thanks for taking the time to read this post!  This is the 3rd post in a series on Marionette, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). If you're interested in Marionette development, you also may be interested in my [last post][jobpost]. Windsor Circle makes heavy use of Marionette and we're looking to hire Backbone developers.  If that sounds interesting, consider applying.




<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        Marionette also contains a 4th View type, CompositeView.  But it's essentially a helper for the case where you want to display a CollectionView inside a region of a LayoutView, and isn't strictly necessary.  Technically you can also use LayoutViews to replace ItemViews, but the semantic difference is useful for encouraging readability.
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>

[marionette]: http://marionettejs.com/
[bindingdata]: http://benmccormick.org/2014/12/10/marionette-explained-connecting-your-data-to-your-views/
[caseformarionette]: http://benmccormick.org/2014/12/02/the-case-for-marionette-js/
[nestingvideo]: https://www.youtube.com/watch?v=CTr-tTwRH3o
[inspector]: https://github.com/marionettejs/marionette.inspector
[inspectortalk]: https://www.youtube.com/watch?v=jbGm3mJXh_s
[jobpost]: http://benmccormick.org/2014/12/18/come-build-with-me/
