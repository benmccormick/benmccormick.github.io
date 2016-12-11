---
title: "How jQuery Works - An Introduction"
date: "2015-06-08 11:51:25+00:00"
layout: "post"
path: "/2015/06/08/how-jquery-works-an-introduction"
pageViews: "17293"
last30pageViews: "504"
---

*This is the first post in a series on "How jQuery Works".  This is not a series about how to use jQuery, instead these posts will focus on how jQuery actually works.  If you're interested in diving into the source of the most popular JavaScript library on the planet, keep reading.*

Every developer has had the experience of using "magic" code.  Not the "hacked into the NSA in 20 seconds" type of magic code you see in movies. This is the code created when you nervously typed an incomprehensible incantation that somebody else passed on to you, desperately hoping to receive the results you want, ignoring the sinking feeling in your stomach that you have no clue what to do if it fails.  Almost all code feels like this when you're pushing out to learn new things.  But it doesn't have to stay that way.

The primary goal of this blog has always been to help myself understand the tools I'm using, and to share that understanding with as many people as possible.  My experience is that really understanding a library or framework requires diving into the source code and swimming around a bit. Which sounds great.  But often the real world gets in the way. Real world source code is full of "special code".  Code that handles browser edge cases, performance optimizations that obscure meaning, indirection to allow shared solutions for common problems; all things that are completely necessary, and also likely to obscure the true structure of code.  So while reading the source is the best way to understand a library, it often helps to have some guideposts to lead you through. 

This post is the start of a new series diving into how jQuery (certainly a very magical library for many developers) works.  I'll pull snippets from the source code, but also try to lay out the big picture approaches the library takes to provide functionality that combines to form by far the best-known and most used JavaScript library out there <sup id="fnref:1">[1](#fn:1)</sup>. For this introduction, the focus will be on the overall structure of the jQuery repository, how the code is laid out for development purposes, how it's built into a single file for production use, and a quick look at the core jQuery object code.  Future posts will cover how different features of the libary work, including deep dives into selectors, ajax, animation, and events.

### So where to start?

When you look at the [jQuery Github repo][jqgithub], one of the first things you'll probably notice is that the source isn't developed as a single file the way it is distributed.  Instead it's split up into many files separated by functionality.  That makes it easier to find specific functions when you know what you're looking for, but harder to know where to start when trying to understand the big picture.  If you're new to the library, it could be overwhelming.

Fortunately it's not that hard to get the lay of the land.  jQuery is broken into modules using the AMD format, and built using requireJS.  So each file lists its dependencies, and it's easy enough to trace back what code is referenced where. So we can start by looking at `src/jquery.js`, which serves simply as a base file to require all of the other dependencies, then make the jQuery namespace available globally, both as `jQuery` and the famous `$`.

![jquery_js.png](/posts/images/jquery_js.png)

From that file we can see the layout of the library.  The core file is loaded and attached to the window, and all of the other "feature files" are also listed as dependencies to make sure they load.  Each of those files lists `core.js` as a dependency, so it is loaded first and creates the main jQuery namespace, which other dependencies then edit as needed.  If you're interested in the process of how the package is built, you can take a read through [build/tasks/build.js][buildfile], where the dependencies are built using requirejs <sup id="fnref:2">[2](#fn:2)</sup>.

### A look at core.js

We can see from jquery.js that [core.js][core] is an important file.  It exports the main jQuery namespace, and if we look around we'll see that it is required by about half of the files in the source directory as a dependency.  So what does it do?  core.js is responsible for defining the jQuery namespace, as well as the prototype for jQuery objects.  This is a great place to start before taking a more detailed look into the library's features, so lets take a look.  

```javascript
define([
	"./var/arr",
	"./var/document",
	"./var/slice",
	"./var/concat",
	"./var/push",
	"./var/indexOf",
	"./var/class2type",
	"./var/toString",
	"./var/hasOwn",
	"./var/support"
], function( arr, document, slice, concat, push, indexOf, class2type, toString, hasOwn, support ) {

var
	version = "@VERSION",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},
```

There's a lot going on in the first 20 or so lines.  First we see a pattern that will repeat in future files.  jQuery uses a lot of small utility functions throughout its code.  Rather than attaching those to a single object, each one gets its own file in the `var` directory, and then is imported as a dependency as needed.  These modules are typically quite small and often trivial.  For instance the document module that is pulled in from `var/document` consists in its entirety of the following code:

```javascript
define(function() {
	return window.document;
});
```

This is obviously a small shortcut, but it allows for consistent use of a pattern across the library. You'll see small utility modules like this loaded in every significant file throughout the source code.

After the imports, this file sets the version (the @VERSION annotation is replaced with the version number as part of the build process), and then creates the base jQuery function.  That base function proxies out to the `init` function if it is available, but more importantly serves as a namespace for the rest of the library.  All future functionality gets extended off of this object or its prototype.  After setting up a few constants, we dive right into that:

```
jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};
```

Here the code sets up the jQuery prototype, which is also made available as `jQuery.fn`.  jQuery objects, what you get when you select a set of elements with jQuery, have access to all of the methods defined on this prototype.  `jQuery.fn` is also the extension point for jQuery plugins, so that custom functions are available to jQuery objects.  Most of the functions built here are pretty basic ones that mimic built in array functions for jQuery objects.

### A note about jQuery objects

I've glossed over jQuery objects twice now, but we've seen enough already to get a deeper understanding of what they are.  jQuery objects are the objects created when the jQuery init function is used as a constructor to create a new object <sup id="fnref:3">[3](#fn:3)</sup>.  That sounds fancy, but in reality that's what is happening every time you make a simple jQuery call like `$('#foo')` or `$('div')`.  The jQuery namespace function is being called and returns a new object with `jQuery.init` as the constructor.  Since `init` shares a prototype with the namespace function <sup id="fnref:4">[4](#fn:4)</sup>, these objects all have access to `jQuery.prototype`.  The second post in this series will talk more about how the init function parses the various inputs that you can pass to the namespace function, but for now it's best to focus on understanding that the namespace function and jQuery.fn are not magic, but are just a wrapper and alias for portions of a fairly normal prototypical inheritance example in JavaScript.

### Extend

After the base functions get added to the prototype, a special function is created and added to both the prototype and the namespace function directly.

```javascript

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) ||
					(copyIsArray = jQuery.isArray(copy)) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};
```

`$.extend` is jQuery's way of merging properties from one object into another.  It's also a very handy shortcut for cloning an object (`var clone = $.extend({},obj)`).  We'll see an example usage shortly, but since it's a common function, it's worth digging into how it works for a second.

Looking at the code above, we can see that extend takes a variable number of arguments, the first of which can optionally be a boolean telling the function to "deep copy".  If only a single object is passed, the function acts as if the jQuery prototype was passed as the first object, and targets that, otherwise it targets the first non-boolean argument.

`extend` then loops over each argument after the target and for each one goes over each of its keys.  For each object in order, properties are copied from the arguments to the target object.  If deep copy is set, properties that are objects are merged by calling `extend` recursively.  Otherwise, existing properties are overwritten.  This continues left to right till all arguments have been merged.

The source code helpfully gives us an immediate example of how `extend` can be useful.  jQuery makes several properties and helpful functions available directly off of the `$` namespace.  Several of them are added here using extend.  You can see how the object notation flows much better than a long series of assignments with `=` would.

```javascript
jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	//... many more functions and properties here
});
```

After working through 2 more helper functions, the namespace object gets returned, wrapping up `core.js`.  So 2 files and ~500 lines of source code in, we already have a pretty good idea of how jQuery is structured, both in terms of using AMD modules to separate out the source, and using a namespace function and its prototype as a central object to attach functionality.


### More Resources

- It's no longer maintained with newer versions, but a few years ago Rob Flaherty created an annotated version of jQuery 1.6's source.  You can see that [here][annotated]
- Along the same lines: John Resig, jQuery's creator, recently went through his original jQuery library (a early ~1.0 version) and [annotated it with both code commentary and historical notes][resig]. It's a great look inside the history of the library.


### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my [post on the difference between Underscore and lodash][underscorevslodash].




<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        You can see that on <a href="https://www.google.com/trends/explore#q=jQuery%2C%20backbone%2C%20Angular%2C%20Ember%2C%20React&date=1%2F2010%2065m&cmpt=q&tz=">Google Trends</a>, <a href="http://bower.io/stats/">Bower stats</a>, or <a href="https://github.com/jquery/jquery">Github stars</a>
        </p>
        <a href="#fnref:1" title="return to article">↩</a></p>
    </li>
    <li class="footnote" id="fn:2">
        <p>
        jQuery's build process is actually super intersting, as they allow custom builds that optionally exclude portions of the library.  If you get a chance make sure to look through build.js and note the function to remove requireJS boilerplate after the modules have been built.
        </p>
        <a href="#fnref:2" title="return to article">↩</a></p>
    </li>
        <li class="footnote" id="fn:3">
            <p>
            If you're unclear on how constructors and prototypes work in JavaScript, feel free to catch up with <a href="http://benmccormick.org/2013/01/12/explaining-javascript-object-oriented-programming">this post</a> I wrote on Object Oriented Programming in JavaScript a few years back.
            </p>
            <a href="#fnref:3" title="return to article"> ↩</a></p>
        </li>
            <li class="footnote" id="fn:4">
                <p>
                Ok so we didn't have quite enough information to fully understand this yet, but you can see where the init function gets its prototye <a href="https://github.com/jquery/jquery/blob/master/src/core/init.js#L115">here</a>.
                </p>
                <a href="#fnref:4" title="return to article"> ↩</a></p>
            </li>
</ol>
</div>

[jqgithub]: https://github.com/jquery/jquery
[buildfile]: https://github.com/jquery/jquery/blob/master/build/tasks/build.js
[core]: https://github.com/jquery/jquery/blob/master/src/core.js
[underscorevslodash]: http://benmccormick.org/2014/11/12/underscore-vs-lodash/ 
[annotated]: http://robflaherty.github.io/jquery-annotated-source/
[resig]: http://ejohn.org/blog/annotated-version-of-the-original-jquery-release/

