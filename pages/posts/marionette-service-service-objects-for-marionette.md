---
title: "marionette-service: Service Objects for Marionette"
date: "2015-05-25 14:02:00+00:00"
layout: post
path: "/2015/05/25/marionette-service-service-objects-for-marionette"
description: "Introducing marionette-service, a services library for Marionette apps"
keywords: "Marionette JavaScript marionette-service services Backbone Radio"
---

[Backbone.js][backbone] is a great way to structure web applications.  Its built in Models, Collections, Views and Routers are a very reasonable "minimum common ground" that pretty much any web project will be able to put to good use.  But more sophisticated applications have needs that extend beyond these basic concepts.  In addition to having some data that needs to be displayed, rich web apps often have resources and functionality that need to be shared across many different Views and Models.  There's no definitive way to implement this consistently, but a common pattern is to create "services" of some type that Views and Models can communicate with.   

This pattern is easiest to show with an example.  Let's take a look at a simple logging implementation.  We might start out just using simple console commands throughout our code like this:

```javascript
function doFoo() {
  // Do a thing
  console.log('We did Foo');
}
```

That's fine for a while, but what if we wanted to switch to a logging library like [JSNLog][jsnlog] or some 3rd party service?  We'd have a huge find and replace job to work through.  It's better to centralize.  [Backbone.Radio][radiodocs] is perfect for this purpose.  We can use it to centralize our logic and create a logging module:

```javascript
import * as Radio from 'backbone.radio'

let loggingChannel = Radio.channel('log');

loggingChannel.comply('log', function(message) {
    console.log(message);
});

loggingChannel.comply('logError', function(message) {
    console.error(message);
});

loggingChannel.comply('logWarning', function(message) {
    console.warn(message);
});
```

We could then log a message like this:

```javascript
function doFoo() {
  // Do a thing
  loggingChannel.command('log', 'We did Foo');
}
```

There are 2 main use cases for this sort of service pattern: centralizing common tasks and UI actions like logging or displaying an alert, and requesting a resource without having to worry about where it came from.  Both are easily possible using Backbone Radio, using code very similar to whats above.

Using Backbone Radio like this is a useful pattern, but it's very ad hoc and imperative.  Not very Backbone-like.  What if we could follow the Marionette route of pulling a useful pattern into an object and allow it to be configured declaratively?  We could instead create a "Service Object" like this:

```javascript
import * as Mn from 'backbone.marionette'

let LoggingService = Mn.Service.extend({

    radioCommands: {
        'log log': 'logMessage',
        'log logError': 'logError',
        'log logWarning': 'logWarning',
    },

    logMessage: function(message) {
        console.log(message);
    },

    logError: function(message) {
        console.error(message);
    },

    logWarning: function(message) {
        console.warn(message);
    },
});

let logger = new LoggingService();
```

This is much more in the Backbone and Marionette style, with a declarative hash to delegate to different functions based on channels and the events passed.  It makes it much easier to create "service objects" to make functionality available in a decoupled way.

Declarative radio handling will be [coming to Marionette Core][mnradioevents] as part of Marionette version 3, but for now I've written a small library to make it available in the short term.  

[marionette-service][marionetteservice] provides the above Service Object to Marionette.  It allows you to listen to Radio Events, Commands or Requests, and associate them with callback functions.  It's compatible with plans for Marionette v3, so all that will be required to remove it when upgrading will be a name change for service objects to use Marionette.Object rather than Marionette.Service. I'm excited to see how people use it.

Marionette-service is available to install both on [npm][npm], and [bower][bower].  Or you can clone the repo directly from [Github][marionetteservice].


### More Resources

- If you're new to Backbone.Radio you can learn more about it from [my post][radioexplained], or from the [official docs][radiodocs].
- If you're confused why somebody would want to separate out the implementation of a service through Radio rather than passing a service object directly, [this is a nice piece by HB Stone][stone] on the power of loose coupling and the Mediator Pattern


### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my other posts on [building Backbone apps with Marionette][marionetteexplained].

[jsnlog]: http://js.jsnlog.com/
[marionetteservice]: https://github.com/benmccormick/marionette-service
[backbone]: http://backbonejs.org/
[mnradioevents]: https://github.com/marionettejs/backbone.marionette/pull/2431
[npm]: https://www.npmjs.com/package/marionette-service
[bower]: http://bower.io/search/?q=marionette%20service
[marionetteexplained]: http://benmccormick.org/marionette-explained/
[radioexplained]: http://benmccormick.org/2015/01/26/backbone-radio/
[radiodocs]: https://github.com/marionettejs/backbone.radio
[stone]: http://arguments.callee.info/2009/05/18/javascript-design-patterns--mediator/
