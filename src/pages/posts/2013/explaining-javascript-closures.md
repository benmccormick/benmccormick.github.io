---
title: "Explaining Javascript: Closures"
date: "2013-01-08T23:30:00+00:00"
layout: "post"
path: "/2013/01/08/explaining-javascript-closures"
category: "javascript"
description: "Diving into one of JavaScripts more confusing concepts"
key: "closures"
topics: ['JavaScript']
pageViews: "164"
last30pageViews: "0"
---

Javascript can be a confusing language when you start to use it.  Designed in a hurry with a functional programming heart and an object oriented skin, Javascript looks a lot like Java or C at first glance.  That expectation causes frustration though when you realize that writing Java style code means that you have no private variables, no block scope, no threads, and no abstract/classes or interfaces.  When I started writing Javascript I had only ever written in pure object oriented languages.  My javascript code was inefficient, fragile, and no fun to write.  I wanted to share some of the things I've learned since here, to help other people making that adjustment.

### Closures

Closures are one of the key concepts to understand when you start writing Javascript.  By default, all javascript objects are global, and blocks such as for loops and if statements do not restrict scope.  Closures are Javascript's mechanism for information hiding and controlling scope.  They also allow for some advanced functionality in an elegant way.


#### Laying the ground

There are a few things you need to understand about Javascript before closures make sense.

#### Functions are objects
Javascript uses First Class Functions, meaning that Functions are Objects in Javascript.  They can be passed to other functions, assigned properties, and be added as properties of another object.  This is very important to understand about Javascript, and a big difference between Javascript and Java/C++.

```javascript
    var f = function(x){
        return x*2;
    }
    f(3);//6
    var f2 = function(func, param){
        return func(param) + 1;
    }

    f2(f,5); // 11
```

#### Functions have their own scope
Functions are effectively the only construct in Javascript that can limit scope.  Unlike other languages, code blocks don't automatically limit scope.  So variables defined in for loops and if statements are not confined to those constructs, and Javascript doesn't have an exact equivalent to javascript classes.  Instead functions are used to manage scope.  The key point is that from within a function you can reference variables defined outside the function, but you cannot access variables defined within a function from outside that function.

```javascript
    var a = 1;

    var f = function(){
        var b = 2;
        alert(a);
        alert(b);
    }
    f();// alerts 1, alerts 2
    a = 3;
    f(); //alerts 3, alerts 2
    alert(b) // undefined
```

#### Functions can be defined inside of other functions

This naturally follows from the other two points.  Functions are just objects and can be defined anywhere.  So you can define a function inside another function, and use it as the return value of the outer function.

```javascript
    var outer = function(){

        var inner = function(x){
            return x*2;
        };
        return inner;
    };
    var a = outer();

    a(2); // 4
```



#### What is a Closure?

A closure is a function defined inside of another function and returned by that function which maintains a reference to variables in the outer functions scope.  Since the inner function was created within the scope of the outer function, it can reference variables defined within the scope of the outer function.  This is best seen by example.

```javascript
    var outer = function(){
        var y = 3
        var inner = function(x){
            return x*y;
        };
        return inner;
    };
    var triple = outer();

    triple(2); // 6;
    alert(y); //undefined
```

Since the outer function scope is maintained, you can also use the variables within that class to track state for the function so that it can only be modified through the function.  This is how javascript implements private variables.

```javascript
    var outer = function(){
        var y = 0
        var inner = function(){
            alert(y);
            y++;
        };
        return inner;
    };
    var message = outer();
    message() // 0
    message() // 1
    message() // 2
    message() // 3
    //...
```

#### Closures in practice

Closures are one of the most commonly used idioms in javascript.  They're used anytime a programmer wants to protect their implementation of a feature, and prevent other code from directly referencing internal variables.  Its also the key concept in the popular [module pattern][module], and many more javascript patterns.  If you are writing javascript of any complexity, or need to understand other people's javascript code, understanding closures is essential.

## Further Reading

- [Mozilla Documentation on Closures][mdnclosures]
- [Ben Cherry on the Module Pattern][module]
- [Effective Javascript][effectivejs] is a great book for understanding javascript.  I wrote a review of it [here][effectivejsreview]



[module]: http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
[mdnclosures]: https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Closures
[effectivejs]: http://www.amazon.com/Effective-JavaScript-Specific-Software-Development/dp/0321812182
[effectivejsreview]: http://benmccormick.org/blog/2013/01/06/book-review-effective-javascript/
