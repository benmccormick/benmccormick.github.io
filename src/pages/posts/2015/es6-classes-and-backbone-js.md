---
title: "Why Backbone.js and ES6 Classes Don't Mix"
date: "2015-04-07T03:19:44+00:00"
layout: "post"
path: "/2015/04/07/es6-classes-and-backbone-js"
description: "A rundown of the challenges of using ES6 classes in Backbone"
keywords: "Backbone, ES6, JavaScript, classes"
category: "frameworks"
key: "bb-es6-1"
readNext: "bb-es6-2,backbone-eco,backbone-devs-react"
pageViews: "20374"
topics: ['JavaScript', 'ECMAScript', 'Backbone']
last30pageViews: "413"
---

I've seen some confusion out there about how to use ES6 Classes with [Backbone][backbone].  In the original version of the ES6 class spec, this was actually a simple thing to do, though the syntax wasn't great.  With the finalized specification for classes and subclassing though, it's no longer practical to try and use the two together.  Here's a short explanation of the issues, as well as a discussion on whether any of this matters.

### What are ES6 Classes anyway?

ES6 <sup id="fnref:1">[1](#fn:1)</sup> is the newest version of JavaScript. It provides a variety of new features for JavaScript developers including native Promises, destructuring, modules and default function parameters.  One of these new features is a native JavaScript Class implementation.  It allows us to simplify class patterns that were formerly a bit verbose in JavaScript.  Take this example of JavaScript inheritance from [Javascript: The Good Parts][jtgp]:

```javascript
var Mammal = function (name) {
    this.name = name;
};

Mammal.prototype.get_name = function () {
    return this.name;
};

Mammal.prototype.says = function () {
    return this.saying || '';
};

var Cat = function (name) {
    this.name = name;
    this.saying = 'meow';
}

Cat.prototype = new Mammal();

Cat.prototype.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};

Cat.prototype.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
};
```

It's a bit verbose.  With ES6 classes we can instead write:

```javascript
class Mammal {
    constructor() {
        this.name = name;
    }

    get_name() {
        return this.name;
    }

    says() {
        return this.saying || '';
    }
}

class Cat extends Mammal {
    constructor() {
        super();
        this.saying = 'meow';
    }

    purr(n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    }

    get_name() {
        return this.says() + ' ' + this.name + ' ' + this.says();
    }
}
```

This allows us to clean things up a lot, removing some boilerplate and focusing the code on our intended functionality.  ES6 classes work quite nicely for simple JavaScript classes like that.  But what about Backbone objects like Models and Views?

We might think that we can just treat them as classes and the new syntax will "just work", similar to how CoffeeScript classes function.  So we'd take this example from the [Backbone website][backbone]

```javascript
var DocumentRow = Backbone.View.extend({

  tagName: "li",

  className: "document-row",

  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    //...
  }

});
```

and convert it to something like this:

```javascript
class DocumentRow extends Backbone.View {

  tagName: "li"

  className: "document-row"

  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  }

  initialize() {
    this.listenTo(this.model, "change", this.render);
  }

  render() {
    //...
  }
}
```

Unfortunately this errors out.  So what's the problem?  It turns out that ES6 classes don't support adding properties directly to the class instance, only functions/methods.  This makes sense when you understand what is actually happening.  With JavaScript inheritance, properties are generally meant to be set on an instance when its created, while methods are set on the prototype object and shared between every instance.  If properties are added to the prototype directly they will also get shared between every instance, creating problems if the property is an object with mutable state like an array.  You can see that in the following simple example:

```
var testClass = function(){};
testClass.prototype.foo = [];

var testA = new testClass();
var testB = new testClass();

console.log(testA.foo.length); //0
console.log(testB.foo.length); //0
testA.foo.push('x');
console.log(testA.foo.length); //1
console.log(testB.foo.length); //1
```

When we place a property on the prototype it can cause unexpected side effects.  Instead most of the time, we want to use the class' constructor to add any properties to each new instance.  ~~Since that is a bit unwieldy when adding many properties, Backbone abstracts away this difference with its extend function.~~ **Edit: Backbone actually does add properties directly to the prototype, going against conventions a bit.** But ES6 classes are focused on the prototype, and the code that is shared between instances. They make the opinionated default properties for instances are handled in the constructor. This maps very cleanly to the current semantics for existing JavaScript class creation, but is different than Backbone's abstraction. So using ES6 classes for Backbone, we'll need to give up this nicety.

```javascript
class DocumentRow extends Backbone.View {

    constructor() {
        this.tagName =  "li";
        this.className = "document-row";
        this.events = {
            "click .icon":          "open",
            "click .button.edit":   "openEditDialog",
            "click .button.delete": "destroy"
        };
        super();
    }

    initialize() {
        this.listenTo(this.model, "change", this.render);
    }

    render() {
        //...
    }
}
```

Until recently, this was a valid way of defining a Backbone View with ES6 classes.  It's questionable whether it was a real gain, given the relative ugliness of the syntax for defining instance properties, but it did work.   Unfortunately, in the final version of the ES6 spec for classes, this is no longer valid.  The final spec requires `super()` to be called before `this` is referenced in a constructor for classes that are extending another class.  So we have to change our constructor to look like this:

```javascript
class DocumentRow extends Backbone.View {

    constructor() {
        super();
        this.tagName =  "li";
        this.className = "document-row";
        this.events = {
            "click .icon":          "open",
            "click .button.edit":   "openEditDialog",
            "click .button.delete": "destroy"
        };
    }
}
```

Unfortunately this doesn't do what we expect. Backbone does significant initialization processing in its constructor, and most properties that Backbone expects to be defined on a Model or View need to be pulled in prior to the constructor executing in order to be used properly.  So with the final ES6 spec we no longer have any way of using declarative properties on subclasses if we want them to be processed by the constructor.

### So what are our options?

There are a few workarounds here, but they're ugly.  First, Backbone allows any of of its instance properties to also be defined as methods.  So we can rewrite our View like this:

```javascript
class DocumentRow extends Backbone.View {

    tagName() { return "li"; }

    className() { return "document-row";}

    events() {
        return {
            "click .icon":          "open",
            "click .button.edit":   "openEditDialog",
            "click .button.delete": "destroy"
        };
    }

    initialize() {
        this.listenTo(this.model, "change", this.render);
    }

    render() {
        //...
    }
}
```

We're starting to get ridiculous here though.  First, this isn't a one to one conversion, so if we're converting existing code, we could develop bugs from any code that directly referenced a View's properties.  And if that code modified those properties, its no longer as simple to modify them again.  Of course if it's a property that isn't processed within the constructor like the `url` property for Models, we can simply leave it as is.  But suddenly we're requiring ourselves to know what properties are processed in the constructor or not, as well as wrapping and rewrapping properties in functions.  We've added a lot of complexity, and it's not totally clear what we've gained.

The second option is to simply re-run the Backbone View or Model constructor a second time after adding the initialization properties.  This has a few issues though.  First, it's ugly.  Nobody wants to do this:

```javascript
class DocumentRow extends Backbone.View {

    constructor() {
        super();
        this.tagName =  "li";
        this.className = "document-row";
        this.events = {
            "click .icon":          "open",
            "click .button.edit":   "openEditDialog",
            "click .button.delete": "destroy"
        };
        Backbone.View.apply(this);
    }
}
```

But it also opens an opportunity for more subtle bugs.  Constructors aren't meant to be run twice.  Doing so, will among other things cause the Views initialization function to run twice, with a different `cid` (Backbone's internal unique id system) set on the View each time. That violates a ton of expectations, again for no clear gain.  So the long and the short of it is that there's no longer any viable way to use ES6 classes for Backbone objects without a clear loss in functionality and predictability.

### So Does Any Of This Matter?

The idea of using ES6 classes for Backbone has some appeal.  The "class" keyword is nice syntax and there's an appeal to using more standardized code and fewer library extensions.  Right now, many developers are also just curious about ES6 and how it fits into their workflow.  But does it really matter that this doesn't work?  I think a case can be made either way, with 2 clear points in each sides favor.  The case for this being a problem:

1. **ES6 Classes are becoming the standard**

    By pretty much any standard, Backbone is currently one of the 4 most popular JavaScript frameworks/libraries for building web applications, along with [Angular][angular], [Ember][ember], and [React][react].  What do the Angular, Ember, and React teams all have in common?  They're each working to make sure that current or future versions of their frameworks use ES6 classes to define objects.  As this style of code becomes ubiquitous, Backbone will start to look even more boilerplate heavy and non-standard.  Developers will also start learning about ES6 classes as part of standard JavaScript training, requiring them to map their knowledge about prototypes and class syntax to Backbone's concepts, rather than just using things they already understand as in other libraries.

2. **More Native == Less Library code**

    This is more of a far-future advantage, but at some point ES6 classes will be usable everywhere without library support, allowing libraries based on it to include less code for handling this themselves.<sup id="fnref:2">[2](#fn:2)</sup>

And the case that it doesn't really matter:

1. **Just because its standardized doesn't make it reusable**

    While it's true that ES6 classes are a standard, realistically Backbone code written using a class syntax isn't going to be easier or harder to convert to equivalent code using React for example.  Backbone's way of using it's standard functions and properties is a much bigger obstacle to code reuse than the particular way it defines classes.  ES6 classes and Backbone objects are in the end just different syntactic sugar over the same prototypical inheritance concepts.  A developer who understands the concepts will be able to use both, and code written in either style will not be easy to reuse outside the Backbone ecosystem.

2. **Sometimes doing it yourself is just better**

    The truth is that sometimes there are advantages to writing your own APIs.  Backbone's class code makes the things that are important to using Backbone easy, without any of the trade offs discussed in this article.  There's something to be said for using the right interface for the job.  There are trade offs for this, just as their are trade offs in other libraries choice to require or encourage a build step for their code.  Both these choices improve the developer API at a cost (complexity, extra code, extra process, etc).  Whether those trade offs are worth it is a judgment call.

It will be interesting to see how the lack of standardization here effects Backbone in the long run, if it does at all.  Along with native Promises, ES6 now offers 2 major features that are similar to but incompatible with important Backbone features <sup id="fnref:3">[3](#fn:3)</sup>. Along with ES5's get and set capabilities and ES7's Object.Observe <sup id="fnref:4">[4](#fn:4)</sup>, a significant number of Backbone features that once required library code will someday soon be natively supported. Of course Backbone has never been a set of features as much as a way of writing programs.  Since Backbone is essentially finished and there are [no plans to significantly change the interface][bb2], the continued improvements to the standard language serve as both a validation of Backbone's core concepts as well as a challenge to its future.   

**Update:** *There's been a [great discussion of this issue](https://github.com/jashkenas/backbone/issues/3560) on Backbone's Github issue tracker.  Feel free to weigh in there if you're interested in figuring this out.*


### More Resources

- If you do want to use ES6 now, [Babel][babel] is the best tool for making that happen.  The Babel website also contains a [great rundown][babeles6] of the various features that make up ES6.

- Axel Rauschmayer has [a great article][2alityclasses] describing the final spec for ES6 classes, including a description of the changes that made them incompatible with Backbone.

- React Developers have noted the same issues with property initializers that Backbone users encounter.  As part of version 0.13 of React, they're supporting a special property initialization syntax for classes, which may eventually be standardized.  There's more info on that in [this ESDiscuss thread][esdiscuss].  This standard is still being worked out but an experimental support version is available in Babel 5.0.0.  Unfortunately that version defines class properties as being instantiated after the superclass constructor is run, so this doesn't solve Backbone's issues here.

- If you were confused by the discussion of prototypes and the code examples of non-ES6 JavaScript classes, I wrote a quick explanation of [Object Oriented Programming in Javascript][oop] back in 2012.

<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        ECMAScript version 6, now officially ECMAScript 2015
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
        <li class="footnote" id="fn:2">
            <p>
            This is admittedly a bigger advantage for Ember, Angular 2.0, and React, which all encourage using a build step to convert ES6/Typescript/JSX to ES5 JavaScript.  That means they can all rely on ES6 class support now, since older browser support is handled through compilation.  
            </p><p>
            Backbone doesn't require or encourage a transpilation step (although CoffeeScript works very nicely for this case), and so it's more important for it to have a top-notch API supported by all JavaScript engines that it is likely to be run on.  It will be a long time before that is true of ES6 classes.
            <a href="#fnref:2" title="return to article"> ↩</a></p>
        </li>
    <li class="footnote" id="fn:3">
        <p>
        Promises are similar to jQuery deferreds, which are technically not a Backbone feature, but are a key part of Backbone development for many developers because they're used with Backbone sync.
        <a href="#fnref:3" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>

[jtgp]: http://www.amazon.com/gp/product/0596517742/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0596517742&linkCode=as2&tag=benmccormicko-20&linkId=XZEWUV7PCEO7DNTY
[backbone]: http://backbonejs.org/
[mnexplained]: http://benmccormick.org/marionette-explained/
[esdiscuss]: https://esdiscuss.org/topic/es7-property-initializers
[oop]: http://benmccormick.org/2013/01/12/explaining-javascript-object-oriented-programming/
[babel]: https://babeljs.io/
[babeles6]: https://babeljs.io/docs/learn-es6/
[bb2]: https://github.com/jashkenas/backbone/issues/3405
[2alityclasses]: http://www.2ality.com/2015/02/es6-classes-final.html
[angular]: https://angular.io/
[ember]: http://emberjs.com/
[react]: https://facebook.github.io/react/
