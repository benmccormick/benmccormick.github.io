---
title: "Building Modular Web Apps With Backbone.Radio"
date: "2015-01-26 12:00:00+00:00"
layout: post
path: "/2015/01/26/backbone-radio"
---

*This is the fifth post in a series on [Marionette.js][marionette].  For more background on what Marionette is, check out the series page, [Marionette Explained][marionetteexplained]*

One of the great things about Backbone is how it encourages a modular approach to building UIs.  Different portions of the pages are separated into individual Views, allowing you to simplify your reasoning about your code by focusing on bite-sized chunks at a time.  Easier said than done though, right?  In practice, it's not hard to create Backbone applications with large views that have tight dependencies on each other.  This usually isn't an intentional decision, but part of a slow decay as developers work to connect the various aspects of their applications.  

So far in this series I've talked about how Marionette makes it easier to create maintainable Views.  Now I'm going to look at [Backbone.Radio][radio], Marionette's tool for communication between application components.

### What's so hard about modular architecture?

There are many advantages to designing your web UI in a modular or component-based fashion.  Your code tends to be easier to reason about and test, it's easier to swap out one piece of code for another, and it greatly increases the chances that you'll be able to reuse your code in other places.  Unfortunately for all except the most basic applications, different components of a UI always have to be aware of the things that happen in other areas of the UI.  It may be something simple like responding to a button click by showing a modal, or more complicated like updating multiple dashboard items when the user applies a filter, but these connections will exist.  At this point you have options.  You can begin having components reference each other directly for example, or you could try to capture state within a shared data object that each component watches.  But there's another solution that borrows from many years of development best practice on backend systems.  You can use a message bus.

### A simple Message Bus

A message bus is a software architecture model for communicating between two systems.  The idea is that instead of referencing each other directly, system components are able to send messages through a shared mediator object.  It's quite straightforward to create a simple message bus using Backbone.  

Backbone.Events is Backbone's event object, which gets mixed into the various Backbone classes to provide the Backbone event functions (`on`, `off`, `listenTo`, `trigger`, etc).  It's easy and common to mix it into a separate object.  That's all you need to create a message bus: something like this:

```javascript
var mediator = _.extend({},Backbone.Events);
```

Now Models and Views can listen to or trigger events on the mediator object, allowing them to communicate without having to be directly aware of each other.  This is a great pattern, and quite useful as is, but there are some limitations.  With a mediator object, all events are global.  Any object can listen to any event, and you have to be careful to avoid naming collisions when using common terms.  It's also a single object for multiple types of communication.

### The Backbone.Radio API

Backbone.Radio builds on this concept to provide a more powerful message bus.  Instead of a single object, Radio provides multiple "channels" each of which can correspond to a page or functional section of your web app. Also, instead of a single events API, Radio provides three, Events, Commands, and Requests, each built for a different use case.  

#### Events

Radio Events are the exact same as our simple message bus.  When you create a channel with Radio, they extend Backbone.Events.  That means you can call any Backbone.Events function on them, or pass them to the `listenTo` method of other Backbone objects.  Events provide Radio's publish-subscribe functionality.  Multiple objects can subscribe to an event using `on` or `listenTo`.  And any object can publish an event using `trigger`.  For those of you unfamiliar with Backbone's events, they have two features that you might not expect.  First, unlike native browser events or jQuery events, Backbone events are synchronous; when you trigger an event, all callbacks that are registered on that event run immediately.  Second, it's easy to pass data with Backbone events.  Unlike native browser events which tend to simply consist of an event and a target, any data you pass when you trigger an event gets passed directly to the callback function, making it a true messaging system.

![events diagram](/posts/images/68747470733a2f2f692e636c6f756475702e636f6d2f75396f433353314c78452e737667.svg)

**Functions Provided** - `on`, `off`, `trigger`, `once`, `listenTo`, `listenToOnce`, `stopListening`

#### Commands

**Update January 2016** - *During 2015, Commands were deprecated from Backbone.Radio as part of their 1.0.0 release.  From a code level, they're simply a request that doesn't return a value, so feel free to keep any existing code, but change command to request and comply to reply*

Radio Commands are similar to Events, with the distinction that only a single callback can handle or "comply" to a given command.  Commands do not add any functionality on top of events; instead, they provide a semantic distinction and enforce simpler logic.  When `exampleChannel.command('something')` is called, you know that it is requesting an action be performed, and you can be confident that there will be no side effects.  Only one object will comply to the command.  Commands are a maintenance-friendly tool; they make your code easier to follow by doing less and doing it more obviously.

![commands diagram](/posts/images/68747470733a2f2f692e636c6f756475702e636f6d2f3765394d35724b464f722e737667.svg)

**Functions Provided** - `comply`, `stopComplying`, `command`, `complyOnce`

#### Requests


Radio Requests share the one-to-one nature of Commands, but provide functionality not seen in Backbone.Events.  You can use Requests to retrieve information from other objects.  Each request can be serviced by a single response callback, with the request receiving the return value of the callback function.  This is very useful for providing resources in a decoupled manner, where a View or other object doesn't have to know the details of how an object is stored or retrieved.

![commands diagram](/posts/images/68747470733a2f2f692e636c6f756475702e636f6d2f744556555f74755249582e737667.svg)

**Functions Provided** - `reply`, `stopReplying`, `request`, `replyOnce`

#### Channels

Radio Channels are a method of segmenting out your messaging across functions.  Instead of holding every event inside a global namespace, objects can interact with a Channel that's limited to the functionality they need.  This minimizes the chances of naming collisions across the app, and provides additional semantic guidance for future readers of the code.  It's much easier to trace through small, focused messaging networks than a large, global one when you're trying to understand a complex behavior.


### Backbone.Radio in practice

Radio's API is fairly small and simple.  Its power comes from the development patterns it enables.  The following are examples from my own code of how Radio assists in building modular testable UI code.

#### Decouple your Views with Radio Events

[Loose coupling][loosecoupling] is one of the most commonly cited design principles in Object Oriented Programming.  In Backbone, loose coupling can be applied to mean that your Views should know as little about each other as possible.  In my own work I implement this by allowing Views to know about and reference their own child Views, but do not allow them to directly reference any other Views.  If Views need to communicate up or across a tree of Views, I use Radio.

Radio Events are great for alerting other parts of the application about a change of state.  For instance, in an application where we have a main content area and a sidebar that provides context for the main area (for instance, a mail app like Gmail that shows contact info in the sidebar next to an open email), we could use Radio Events to keep our sidebar in sync with the main content.  That might look something like this.

```javascript
var Mn = require('backbone.marionette');
var Radio = require('backbone.radio');

var inboxChannel = Radio.channel('inbox');

var ContactView = Mn.ItemView.extend({

    template: '#contact-template',
    
    initialize: function() {
        this.listenTo(inboxChannel, 'show:email', this.showContact);
        this.listenTo(inboxChannel, 'show:inbox', this.showAd);
    },

    showContact: function(emailObject) {
        //show the contact for the emailObject 
    },

    showAd: function() {
        //when we don't have a contact to show, show an ad instead 
    }

});

module.exports = ContactView;
```

Note that our sidebar View doesn't need to know anything about the inbox area.  The `show:email` event could be fired by our inbox view, by a navigation View, or by our router on page load.  The sidebar doesn't know and doesn't care.  

It's also important to note that the event represents a change in state external to our component.  Something else changed (the state of the inbox), and the sidebar component is reacting to this.  There might be many coponents that react to this state change, or just this one.  Our View doesn't know or care.

#### Centralize UI Logic with Commands

While Events are a way of notifying other components about a change in state, commands are useful when you want to cause a change in state without having to know the implementation.  For instance, in an application that I work on, we have a centralized event-logging module that can take application events that we want logged and send them to a backend API and also to Google Analytics.  We use commands for this.  In practice the logging module looks a bit like this.

```javascript
var Radio = require('backbone.radio');

function log(event) {
    // Send event to the backend API and Google Analytics
}

Radio.channel('appEvents').comply('log',log);

```

Then we can run `Radio.channel('appEvents').command('log', event)` anywhere we want to log an application event.  We could use events for this, but there's value in using commands.  We're explicitly saying that we want our application to log a specific piece of data, whereas a similar event would have the connotation that an event had occured, and anything that wanted to respond to it could.  We can be more confident of what's happening here.

#### Share Resources Across Nested Views with Requests

One of the challenges of nested View architectures like Marionette or ReactJS is deciding how to pass data down to deeply nested View components.  One approach is to pass all necessary data into the top level view and then pass it down along the View tree to whatever View needs it.  That has the advantage of a clear data flow, but the disadvantage of cluttering up parent Views with data they don't need and tightly coupling the parent Views to the implementation of their children.  Another approach is simply making the data available globally, which has all the disadvantages that global data normally brings.  Radio requests provide a nice solution to this problem.  You can define "data providers" that are responsible for providing any data you need that is not passed directly down a view chain. These could be separate modules similar to Angular's service objects.  They could be other UI components like a datepicker.  Or they could just be models and collections you define at the root of your application but don't pass directly to your Views.  In the same application as above, I have a set of task views that can have users assigned to them.  Because these tasks are deeply nested in the UI, I don't pass the collection of possible Users to assign down the View tree.  Instead, I define that collection within my top level application object and then request it when the user opens up the user-picker View.  I use jQuery deferreds to make sure that the collection has been populated before the picker appears.  That all looks something like this:

```javascript
//in app.js
var usersDeferred = (new UserCollection()).fetch();
resourceChannel.reply('userlist',function() {
    return usersDeferred;
});
```

```javascript
//in task.js
var usersDeferred = resourceChannel.request('userlist');
usersDeferred.done(this.showUserPicker);
```


### A Quick Note on Backbone.Radio and Marionette

Those of you who have used Marionette before may be a bit confused as to why this post is part of my Marionette article.  As of version 2.3, the current shipping version of Marionette, Radio is not distributed as part of the library.  Marionette instead ships with [Backbone.Wreqr][wreqr] as its message bus implementation.  Wreqr is a precursor to Radio with a significantly more confusing API.  Radio provides a cleaner approach, as well as a more intuitive name.  However, because Marionette follows semantic versioning, they're waiting for 3.0 to make Radio the default.

In the meantime, though, it's easy to replace Wreqr with Radio.  You can simply make sure that you're loading in Radio instead of Wreqr, and then implement the following [shim][radioshim]:

```
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone.marionette', 'backbone.radio', 'underscore'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('backbone.marionette'), require('backbone.radio'), require('underscore'));
  } else {
    factory(root.Backbone.Marionette, root.Backbone.Radio, root._);
  }
}(this, function(Marionette, Radio, _) {
  'use strict';
 
  Marionette.Application.prototype._initChannel = function () {
    this.channelName = _.result(this, 'channelName') || 'global';
    this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
  }
}));
```

It's also worth pointing out that Radio has no direct dependency on Marionette, and can be used on any Backbone project.  For example, it might be an interesting tool to implement a Flux-style dispatcher in an application using Backbone and React. All of the benefits Radio provides can help any application with decoupled View components.

**Thanks to the Marionette Teams for the diagrams above, which come directly from the Backbone.Radio [README][radio].**

### More Resources

- Although it's focused on Node and backend use cases, [this video][mighty] is a great rundown of semantic messaging patterns.

### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out the rest of my [series on Marionette][marionetteexplained].

<style>
.post-body img {
  max-width:50%;
  padding:10px;
  display:block;
  margin-top:30px;
}
</style>

[marionette]: http://marionettejs.com/
[marionetteexplained]: http://benmccormick.org/marionette-explained/
[loosecoupling]:http://en.wikipedia.org/wiki/Loose_coupling
[wreqr]: https://github.com/marionettejs/backbone.wreqr
[radioshim]:https://gist.github.com/thejameskyle/48afb443b8c8c6ee4f46
[mighty]: https://www.youtube.com/watch?v=rWz8OoVuDls
[radio]: https://github.com/marionettejs/backbone.radio

