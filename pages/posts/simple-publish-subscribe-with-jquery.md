---
title: "Simple Publish-Subscribe with jQuery"
date: "2013-02-13 21:00:00+00:00"
layout: "post"
path: "/2013/02/13/simple-publish-subscribe-with-jquery"
description: 'Building a basic pub-sub wrapper around jQuery'
category: "frameworks"
key: 'jquery-pub-sub'
---

Here's a cool pattern that I've been able to use in two of my projects lately:

```javascript
//Publish Subscribe with jQuery

var exampleHandle = function(){
	//do stuff when topic is published
	...
}

function subscribe(topic,handle){
    $("#subscription").bind(topic,handle);
}

function publish(topic,params){
	$("#subscription").trigger(topic,params)
}

function unsubscribe(topic,handle){
    $("#subscription").unbind(topic,handle);
}

```

[Publish-Subscribe][pubsub] is a pretty commonly used model for sending messages in software applications.  Implementations can vary, from the very heavyweight setups of things like [Java Message Service][jms] to much lighter methods.  This is an example of a lightweight pubsub implementation for javascript.

### Implementation Details

The method is based on jQuery's `trigger` and `bind` functions.  These allow you to listen for a custom event on an element, and manually trigger an event on an element.  This provides the basic backbone for the simple subscription model.


If an application element wants to subscribe to a topic, they bind a handler to the "subscription element".  This can be a designated element on the page, or just the window element.  You can also of course use different elements for different subscriptions.  Then, when something publishes to that topic, the handler function will execute.

For publishing, a function can pass a topic and parameters to the publish function.  This calls jQuery's `trigger` to set off the event topic, passing along the parameters.  These params are passed to the handle function.

If an element wants to cancel its subscription, they can pass the topic and handle function to the `unsubscribe` method. Note that the handle has to be the same function object that was used to originally subscribe, not a copy or similar function.  You also can use jQuery's `unbind` to cancel all subscriptions to a topic by only specifying the topic without the handle function.

I've found this to be a useful, lightweight way of creating loosely coupled messages across different components of my software systems.


---

### Further Reading

- [jQuery Documentation][jquery] - in depth information on bind, trigger and unbind


[pubsub]: http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern
[jms]: http://en.wikipedia.org/wiki/Java_Message_Service
[jquery]: http://api.jquery.com/category/events/event-handler-attachment/
