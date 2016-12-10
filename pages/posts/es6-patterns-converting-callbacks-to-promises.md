---
title: "ES6 Patterns: Converting Callbacks to Promises"
date: "2015-12-30 03:30:47+00:00"
layout: "post"
path: "/2015/12/30/es6-patterns-converting-callbacks-to-promises"
pageViews: "16028"
last30pageViews: "1903"
---

<div class="explanation">
I've been writing code using the new features defined in the ECMAScript 2015 version of JavaScript (<a href="http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/">more commonly known as ES6</a>) since January.  Throughout the year I've seen myself start using a few new patterns that I think make my code better.  I'm going to share them here with a few quick hitter articles.  If you missed it, I wrote about <a href="http://benmccormick.org/2015/11/30/es6-patterns-clean-higher-order-functions/">clean higher order functions</a> earlier this week.  This post focuses on working with asynchronous code in ES6.  
</div>


### Background

One of the nicest new features of ES6 JavaScript is the standardization of Promises.  Promises are a method for managing asynchronous code that serve as an alternative to the standard callback function syntax that has been the JavaScript standard for years.  If you're unfamiliar with them, a good example of a Promise based API is the new `fetch` api provided by browsers.  `fetch` is a replacement for the older callback based XMLHttpRequest API.  A quick example of an HTTP request with the 2 APIs provides a nice comparison of how Promises can lead to clearer code.

A simple get request with XMLHttpRequest looks like this:

```
function reqListener() {  
  var data = JSON.parse(this.responseText);  
  console.log(data);  
}

function reqError(err) {  
  console.log('Fetch Error :-S', err);  
}

var request = new XMLHttpRequest();  
request.onload = function() {
  var data = JSON.parse(this.responseText);  
  //do stuff with data
};  

request.onerror = function() {
    alert('There was a problem with the request');
}
request.open('get', '/api/foo/bar', true);  
request.send();
```

whereas with fetch we get this instead

```
fetch('/api/foo/bar').then(function(data) {
    return data.json();
}).then(function(jsonData) {
    //do stuff with the data
}).catch(function(e) {
    alert('There was a problem with the request');
})
```

This is admittedly a slightly unfair example due to XMLHttpRequest's clunky object oriented API, but the key take away here is that promises allow for easier visualization of a program's flow, as well as the ability to easily chain both synchronous and asynchronous operations together into a unified API.

Promises have been around for a little while in user-land.  There are a bunch of Promise libraries out there that eventually standardized on a spec called `Promises/A+`.  Promises/A+ compliant libraries include [Q][q], [Bluebird][bluebird], and [rsvp][rsvp].  There are also many older libraries that provide Promise-like capabilities but are not completely spec compatible, most notably [jQuery deferreds][jqd].  But with ES6 Promises are being standardized.  Happily, since the implementation uses the standard that user-land libaries have agreed upon, the Promise spec is compatible with existing implementations, and existing code bases can remove their existing libraries in favor of the browser supplied version, or have code written to use the browser version interop cleanly with their existing code.  Support for Promises now exists in the latest versions of all major browsers, but it never made it to Internet Explorer and is Edge only for Microsoft browsers.  So most developers will still want to consider using a polyfill for the time being.

### Converting callback-driven code to use Promises

If you believe that Promises are worthwhile, you'll immediately encounter a problem in today's JavaScript world.  Many JavaScript APIs, including most standard browser APIs and older but still popular libraries like jQuery and Backbone are heavily callback driven.  Rather than mixing 2 different styles of asynchronous code, wouldn't it be nice if we could easily convert callback-based APIs to use Promises?  It turns out that it's not that hard.  Let's take the simplest example possible to start.  `setTimeout` is a straightforward browser API that waits for a specified period of time and then executes a callback.  A standard use looks like this:

```
function doStuff() {/*...*/}

setTimeout(doStuff, 300);
```

A Promise-based API for this function would likely look something like this code.

```
timeout(300).then(doStuff)
```

We can create an API like that using setTimeout.  To do that, we'll need a function `timeout` which takes a timeout variable and returns a Promise.  

You can define A+ compliant Promises using the Promise constructor, which expects a single function as an argument.  That function takes 2 arguments, a `resolve` function and a `reject` function.  The wonderful thing is that under the covers these are just callback functions that the Promise api glosses over.  

Since we already have an API that can handle callbacks, the implementation of our `timeout` function is pretty simple.

```
function timeout(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, delay);
    });
}
```

We don't use the reject callback, since setTimeout doesn't provide any hooks for an error state. So we pass resolve as the callback to setTimeout, and that is all we need.  Now we have a great chainable setTimeout function that we could include in a Promise chain.

Moving on to a more complicated example, let's take our `XMLHttpRequest` code from above and see if we can create a simplified version of the `fetch` API using `XMLHttpRequest` under the covers.  In this case I'm going to use ES6 style arrow functions to reduce the boilerplate a bit.

```
const fetch = (url, options = {method:'get'}) => new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();  
    request.onload = resolve
    request.onerror = reject;
    request.open(options.method, url, true);  
    request.send();
});
```

This is a simplified implementation that doesn't come close to covering all the use cases of fetch, but it provides a great example of how simple it can be to transform a callback based api to a Promise based one, without having to rewrite the existing code<sup id="fnref:1">[1](#fn:1)</sup>.   

For what it's worth, it is equally easy to convert functions in the other direction.  For instance a callback based implementation of fetch can be a one liner.

```
const callbackFetch = (url, options, succ, err) => fetch(url, options).then(succ).catch(err);
```

It's useful to know that the various syntaxes for asynchronous code in JavaScript are effectively equivalent and interoperable.  When designing APIs for your code, both for public libraries with external libraries and components that you use in an application, these patterns can be useful for providing a consistent API, even if you're using code under the covers that presents it's asynchronous code in a different way than your API.  


### More Resources

- The free online version of Exploring ES6 by Axel Rauschmayer has a [great chapter][exploringjs] on ES6 Promises explaining the API and how they fit in with the A+ standard.
- There was also a [great post by David Catuhe on one of the MSDN blogs][asynccity] earlier this year highlighting how asynchronous code has evolved in JavaScript over the years, including a look at the new `async/await` patterns proposed for ES2016.



### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out the first post in this series on [cleaner higher order functions][doublefuncs].



<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        And even a full implementation of fetch using XMLHttpRequest is only<a href="https://github.com/github/fetch/blob/master/fetch.js"> ~300 lines</a>
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>


[jqpromise]: http://abdulapopoola.com/2014/12/12/the-differences-between-jquery-deferreds-and-the-promisesa-spec/
[exploringjs]: http://exploringjs.com/es6/ch_promises.html
[q]: https://github.com/kriskowal/q
[bluebird]: https://github.com/petkaantonov/bluebird
[rsvp]: https://github.com/tildeio/rsvp.js
[jqd]: https://api.jquery.com/category/deferred-object/
[asynccity]: http://blogs.msdn.com/b/eternalcoding/archive/2015/09/30/javascript-goes-to-asynchronous-city.aspx
[doublefuncs]: http://benmccormick.org/2015/11/30/es6-patterns-clean-higher-order-functions/
