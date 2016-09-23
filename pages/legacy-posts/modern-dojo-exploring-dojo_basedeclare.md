---
title: "Modern Dojo: Exploring declare"
date: "2013-11-14 23:15:00+00:00"
layout: post
path: "/2013/11/14/modern-dojo-exploring-dojo_basedeclare"
---

This is part 2 of my ongoing exploration of [Dojo][dojo]'s important modules and concepts.  Specifically this post will be examining dojo/_base/declare, Dojo's object oriented programming helper module.


## What is dojo/_base/declare used for?

dojo/_base/declare (henceforth "declare") is the Dojo module for dom assisting with Object Oriented Programming.  It provides a function that allows for easy "classical style" inheritance, as well as mixins.  It is fairly flexible, and there seem to be several ways to use it.  I'm going to explore those here.

## How do you use declare?

Dojo's declare function takes up to 3 arguments.  The first argument, which is optional, gives a fully qualified namespaced class name <sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>.  The second argument is a string or an array specifying a class or set of classes that the new class will inherit from.  This argument can also be null.  The final argument is an object with the properties we want the new class to contain.  The full 3 argument syntax looks like the example below.

```javascript
//declare with a className argument

//pull in the declare module
require(["dojo/_base/declare"], function(declare) {

  //we're going to create a class in the global myApp namespace
  declare("myApp.examples.Messenger",null, {
    message: "hello world",
    sendMessage: function() {
        console.log(message);
    }
  });
  //since our class was created globally, we can access it wherever
  //we want, by refering to the namespace property
  var messenger = new myApp.examples.Messenger();
  messenger.sendMessage();
});
```

This syntax works fine, but to me it seems fairly contrary to the spirit of Modern Dojo.  Rather than keeping the class definition bound in a module, it is instead pushed out as a global, using namespacing techniques rather than AMD style modules for code organization.  It seems to be solely a product of supporting legacy implementations and Dojo's declarative syntax.  As such I'm going to spend the rest of this piece focusing on the 2 argument syntax, where the above example would look like what we have below.

```javascript
//declare without the className argument

require(["dojo/_base/declare"], function(declare) {

  var Messenger = declare(null, {
    message: "hello world",
    sendMessage: function() {
        console.log(message);
    }
  });
  //since our class was created locally, we can access it here
  var messenger = new Messenger();
  messenger.sendMessage();

  //If we need access our class in other places, we can return it
  //from a module and then load it as a dependency where needed
});
```

So what is this simple example actually doing?  declare takes the object that you pass and adds it to the prototype chain of your class.  It's important to understand that properties on the prototype are shared between all objects based on that class.  This is perfect for functions, as they only need to be created once.  It also works well for primitive values, since if we rewrite them the values will be added to the object itself rather than the prototype.  Putting properties on the prototype can lead to unexpected behavior when dealing with arrays and more complex objects though.  So its important to understand how the prototype chain works.  For example, the code below produces unexpected output since the messages array is shared between all Messengers.

```javascript
require(["dojo/_base/declare"], function(declare) {

  var Messenger = declare(null, {
    messages: ["hello","world"],
    sendMessages: function() {
        console.log(this.messages);
    }
  });
  var messenger = new Messenger();
  var messenger2 = new Messenger();
  
  //change the messages array on messenger
  messenger.messages.push("extra value")
  //and the change has populated to all instances of Messages
  messenger2.sendMessage(); 
  //logs ["hello", "world", "extra value"]
});
```

Fortunately Dojo provides an easy way to get around this issue with the special constructor property.  If you define the constructor property of your object as a function, dojo treats that property as the constructor for your class and runs it when instantiating your class.  This allows you to have local properties, and only share properties that should be shared.

```javascript
//Constructor example

require(["dojo/_base/declare"], function(declare) {

  var Messenger = declare(null, {
    constructor: function() {
      this.messages = ["hello","world"]
    },
    sendMessages: function() {
        console.log(this.messages);
    }
  });

  var messenger = new Messenger();
  var messenger2 = new Messenger();
  //change the messages array on messenger
  messenger.messages.push("extra value")
  messenger.sendMessage(); //logs ["hello","world","extra value"]
  //and the change has not populated to other instances of Messages
  messenger2.sendMessage(); //logs ["hello","world"]
});
```

Dojo also provides a special helper function to allow you to define arbitrary properties on a member of the class when an object is created.  You can use code like this to accept object arguments that you can map to properties.

```javascript
//safeMixin example

var TestObject = declare(null, {
  val:"default",
  constructor: function() {
    //make the constructor arguments a mixin
    declare.safeMixin(this,args);
  }
})

//then we can stick with the default value
var test = new TestObject();
//or come up with our own
var spicyTest = new TestObject({val:"spicy"});

alert(spicyTest.val) //"spicy"
```

#### Inheritance

declare also provides a flexible inheritance option.  In the examples above, we created a class without any inheritance by passing null as the superClass argument.  But we can also specify a class as a superclass.  For instance to create a new messenger that alerts your message instead of logging them, you could inherit the existing Messenger class like the example below.

```javascript
//Basic Inheritance

var AlertMessenger = declare(Messenger, {
    sendMessage: function() {
      alert(this.messages)
    }
  });
var alerter = new AlertMessenger();
alerter.sendMessage(); //alerts the message
```

In this example, AlertMessenger inherits the constructor property from Messenger, but overrides the sendMessage function.  So we change the functionality in a classical OO way.

One nice feature of Dojo's OO implementation is that it is easy to make calls up the prototype change even when we are overriding functions.  So for instance if we wanted our AlertMessenger class to send an alert while still logging the message in the console, we could use `this.inherited` to make it happen.

```javascript
//this.inherited Example

var AlertMessenger = declare(Messenger, {
    sendMessage: function() {
      alert(this.messages);
      //calls up the prototype chain to Messenger's sendMessage function
      this.inherited(arguments);
    }
  });
var alerter = new AlertMessenger();
alerter.sendMessage(); //alerts and logs the message
```
So we still have access to overriden functions if used judiciously. Also, each constructor will be executed along the prototype chain, so there is no need to use `this.inherited` in a constructor context.

#### Mixins

But we're not limited to a single inheritance instance.  We can still do more.  We can also pass an array of classes to the className argument, allowing us to inherit from multiple types at once. The first argument is the base of the prototype chain, and its extended from there, with the additional class properties being mixed in.

```javascript
//Multi-Inheritance Example

var Lion = declare( null, {
  head: "lion",
  body: "lion",
  legs: "lion"
});

var Bird = declare(null, {
  head: "bird",
  wings: "bird"
});

var Human = declare (null, {
  head: "human"
});

//Sphinx is declared with 3 mixins
//lion is first, then bird, then human
var Sphinx = declare([Lion,Bird,Human],{
  //head gets overriden by human last, wings body and legs are never overriden and stay with their first set values

  aboutMe: function() {
     alert("I have the head of a "+ this.head +
           ", the wings of a " + this.wings +
           ", and the body of a " + this.body);
  }

  });

var sphinx = new Sphinx();

sphinx.aboutMe(); //I have the head of a human, the wings of a bird, and the body of a lion
```

## When should I use dojo/_base/declare

declare seems like a great choice for creating reusable objects, and allows for either a classical inheritance style or a more flexible mixin style.  Its a bit of overkill for simple or one off objects, but for defining the structure of a complex model, it seems like a great fit.

Personally I'm going to avoid the className syntax unless I find a use for it that I currently don't see.  It seems to be a legacy option that is completely at odds with the rest of Dojo's avoidance of global variables.  The 2 argument syntax on the other hand, seems like a great choice for creating maintainable and reusable classes.

declare should be especially useful for programmers who want to implement a classical inheritance structure in JS.  It makes the syntax quick and straightforward.  The only gotcha I see is the need to be aware of how the prototype chain works under the covers so that there's no being burned by unexpected sharing of changes.

### More Resources

- [Official Dojo tutorial on dojo/_base/declare][declare1]
- [Dojo docs on dojo/_base/declare][declare2]
- [JS Explained: Object Oriented Javascript][ooj]

### Other Modern Dojo Posts

- [Exploring dojo/query](/blog/2013/11/13/modern-dojo-dojo-query/)


<div class="footnotes"><ol>
    <li class="footnote" id="fn:1">
        <p>
        I'm not a fan of the dojo convention of having optional arguments be first in some cases.  It seems very strange that arguments might "shift" and not line up as expected.  I can understand in this case not wanting to have a small string parameter after a potentially large object listing the class properties, but it still makes for a confusingly inconsistent API.
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
</ol></div>

[dojo]:http://dojotoolkit.org/
[jsPerf]: http://jsperf.com/
[declare1]: http://dojotoolkit.org/documentation/tutorials/1.9/declare/
[declare2]: http://dojotoolkit.org/reference-guide/1.9/dojo/_base/declare.html
[ooj]: /blog/2013/01/12/javascript-explained-object-oriented-javascript/

