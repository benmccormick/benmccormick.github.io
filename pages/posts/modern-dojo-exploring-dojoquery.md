---
title: "Modern Dojo: Exploring query"
date: "2013-11-13 23:15:00+00:00"
layout: "post"
path: "/2013/11/13/modern-dojo-exploring-dojoquery"
category: "frameworks"
pageViews: "126"
last30pageViews: "1"
---

It appears I'm going to be spending a significant amount of time working with [the Dojo toolkit][dojo] for my next project at work, so I've spent some time over the last few days trying to familiarize myself with the library.  Its quickly become apparent that there are a few challenges with learning Dojo at the pace I wanted.  First, Dojo is built as a lightweight core with many small modules of functionality available as components.  It's effectively completely modularized in a way that no other framework really is (though jQuery appears to be moving in that direction as well).  As such, learning it is a bit decentralized.  Second, Dojo, which has existed since 2005, made a big transition back in 2011 to move to an AMD format for managing its modular components.  This resulted in a significant change in basic syntax.  Since this change happened after jQuery's rise (which led to a significant drop in Dojo usage), it seems many examples on the web still use the old syntax, and I haven't seen any print resources published since the change.  As a result, the resources for learning modern Dojo seem somewhat piecemeal beyond the toolkit's website.


That being the case, I've decided to explore Dojo's primary modules on a case by case basis and document what I've learned here.  Hopefully this can be a helpful modern reference to others who are learning.  I'm going to start by exploring dojo/query, one of the primary Dojo modules, which provides jQuery selector style functions for Dojo users.

## What is dojo/query for?

dojo/query is the Dojo module for dom selection.  The core module provides basic CSS selection capability, with the ability to use CSS3 style selectors if needed.  It can be extended using other modules to provide more advanced DOM traversal and manipulation functionality, effectively matching jQuery's feature set in that area.

## How do you use dojo/query?

To use dojo/query, you first need to require the module, using an AMD style require or define call.  You can then call query (or whatever you've aliased it to), and pass it a CSS style selector.

```javascript
//Basic query example

require(["dojo/query"], function(query){
    //select all elements with class special
    var elementList = query(".special");

    //you can also add an optional second parameter to search
    //under a single DOM element,rather than the whole DOM
    var parentNode = document.getElementById("parent");
    elementList = query(".children",parentNode);
});
```
The query function returns a dojo/NodeList object.  This is a basic array-like wrapper object, similar to a jQuery object.  By default it contains some basic array manipulation functions, but you can also extend it with plugin modules for dom manipulation, dom traversal, and other functions.  In fact you can even write your own extensions to the object.  These extensions are loaded in as additional AMD modules. For instance, we can load dojo/NodeList-dom to extend NodeList with some basic DOM functionality

```javascript
//Extending NodeList

require(["dojo/query","dojo/NodeList-dom"], function(query){
    //add a btn class to all button elements
    query("button").addClass(btn);
});
```

In that simple example, the `addClass` method was added as an extension to the NodeList type by the NodeList-dom module.  So adding that module brought extra functionality.  Its relatively simple to add custom functionality in this way.  An example from the Dojo docs looks like this:

```javascript
//Dojo extension example

//definition (in myapp/NodeList-custom.js)
define(["dojo/_base/lang", "dojo/query", "dojo/NodeList-dom"], function(lang, query){
  lang.extend(query.NodeList, {
    makeRed: function(){
      this.style({ color: "red" });
      return this;
    }
  });
});

//usage (in another file)

require(["dojo/query", "myapp/NodeList-custom"], function(query){
  query(".greenText").makeRed();
});
```

This is great for modularizing common patterns and functionality, and is a core Dojo concept, not just a dojo/query feature.

## How does dojo/query perform?

I was curious about how dojo/query performance stacked up to jQuery.  So I set up some performance tests on [jsPerf][jsPerf] to take a look.  I compared Dojo to jQuery across a few common and simple selection and manipulation operations.  The results were informative.

You can see the results here for

- [ID selection][ids]
- [Class selection][classes]
- [DOM manipulation][manipulation]

The results varied a bit from platform to platform, but a few things stood out.

#### When selecting on IDs, don't use dojo/query

For the basic ID selection tests, dojo/query was blown away by almost everything. It is very very slow to handle it.  I was initially bothered by this, until I added the dojo/dom test.  dojo/dom's byID function is the "dojo way" of selecting an element by ID.

dom.byId appears to be a thin wrapper around the native API, with near native performance everywhere (and confusingly, better than native performance on IE11).  dojo/query meanwhile, lags way behind, literally 100x slower than a native query on Chrome 31.  You can still integrate with dojo/NodeList to get dojo/query's chaining functionality

```javascript
//Method chaining with search by ID

require(["dojo/query","dojo/dom", "dojo/NodeList-dom"], function(query,dom){

    var list = query.NodeList();
    list.push(dom.byId("menu"));

    list.addClass("sidebar").onclick(function(e) {
        alert ("this is the menu");
    })
});
```


#### For simple things operations, you can't beat native selectors

On the basic tests, the native selectors blow away the library results, with little downside.  When you're simply trying to access an element and, for instance, change its inner HTML, native selectors will scale much better.

However, the situation begins to become more complicated when more complex queries are involved.  My manipulation example is still a relatively simple example, but the trade-offs start becoming a lot more substantial very rapidly.  For the manipulation example, native code requires significantly more code.  The simplest method of doing things is not supported on IE9, and requires you to understand the distinction between an HTMLCollection and a normal Javascript array.  A solution that supports IE9 and handles other edge cases involves even more code, and performs in the same range as Dojo and jQuery.

#### dojo/query seems to lag behind jQuery in performance, but its in the ballpark

dojo/query was consistently outperformed by jQuery in the testing that I did.  But while the gap between native selectors and library versions is very wide, the dojo/jQuery divide seems to be on the order of a 2-4x increase in speed on basic operations.  Thats significant, but hardly damning. If selector performance is your primary criteria for choosing a library, jQuery should be your pick.  But Dojo is competitive enough here, that it doesn't seem disqualified for use if you have other reasons for doing so.

## When should I use dojo/query?

To sum it all up, it looks like the query library is a great choice for providing jQuery selector style functionality for Dojo users.  It's small, lightweight, and allows you to load only the things you need to get the job done.  If you only are looking for this type of selector functionality, a custom built jQuery package might be a better fit. But if you're already using Dojo, dojo/query will get the job done very well.  Just don't use it to search on id's.  Use dojo/dom or native selectors instead.

## More Resources

- [Official Dojo tutorial on dojo/query][query1]
- [Dojo docs on dojo/query][query2]
- [Dojo docs on NodeList][nodelist]



[dojo]:http://dojotoolkit.org/
[ids]: http://jsperf.com/dojo-query-vs-jquery-selectors
[classes]: http://jsperf.com/dojo-query-vs-jquery-selectors-for-class-search
[manipulation]: http://jsperf.com/dojo-query-vs-jquery-selectors-for-class-manipulation
[jsPerf]: http://jsperf.com/
[query1]: https://dojotoolkit.org/documentation/tutorials/1.9/using_query/
[query2]: http://dojotoolkit.org/reference-guide/1.9/dojo/query.html
[nodelist]:http://dojotoolkit.org/reference-guide/1.9/dojo/NodeList.html
