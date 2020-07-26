---
title: "Evil JavaScript"
date: "2018/07/04"
layout: "post"
path: "/2018/07/04/evil-javascript/"
description: "The code you write when you don't care about people"
keywords: "evil javascript proxies"
category: "javascript"
topics: ['javascript']
key: "evil-js"
readNext: "es6-the-bad-parts,javascript-stale-practices,mobx-state-machine-flags"
---

JavaScript developers sometimes complain that their language is unjustly maligned for having too many confusing features.  Plenty of other people are out there explaining why this is misguided, but for this post I want to lean in.  Rather than falling into the _traps_ that JavaScript exposes you to, what if we embrace our language's reputation instead, and see what code we can write if we don't care about the feelings of others?

The "Evil JavaScript" you'll see today takes advantage of an array of language features. Many of these techniques still work in other languages, so please don't worry that I'm limiting your pursuit of the dark side. But JavaScript certainly has a flair for evil that is hard to match.  If you write code that other people have to work with, the opportunities to annoy, confuse, aggravate and bamboozle are limitless.  The following is a small selection of choice techniques.


#### Modify objects in your getters

JavaScript objects can define `getters`, functions that let you access the result of a function as a property.  Used normally, that looks like this:

```javascript
let greeter = {
  name: 'Bob',
  get hello() { return `Hello ${this.name}`}
}
console.log(greeter.hello) // Hello Bob
greeter.name = 'World';
console.log(greeter.hello) // Hello World
```

Used evilly though, we can come up with fun self-destructing objects!

```javascript
let obj = {
   foo: 1,
   bar: 2,
   baz: 3,
   get evil() {
      let keys = Object.keys(this);
      if(keys) {
         delete this[keys[0]]
      }
      return 'Nothing to see here';
   }
}
```

Here, every time we read `obj.evil`, we delete one of the other properties on the object, with no indication to the code accessing `obj.evil` that anything extraordinary is happening.  But this is just the start of how we can introduce unexpected side effects.

#### Nobody expects a Proxy!

Getters are cool and all, but they've been around for years, and many developers know about them.  We now have an even more powerful variation on the same theme with Proxies.  Proxies are an ES6 feature that let you put a wrapper class around an object that lets you control what happens when a user accesses or updates any property.  So we can, for instance define an object that will, one third of the time return a value from a random key whenever a user tries to access a key.

```javascript
let obj = {a: 1, b: 2, c: 3};

let handler = {
    get: function(obj, prop) {
      if (Math.random() > 0.33) {
        return obj[prop];
      } else {
        let keys = Object.keys(obj);
        let key = keys[Math.floor(Math.random()*keys.length)]
        return obj[key];
      }
    }
};

let evilObj = new Proxy(obj, handler);

// this is example output that I received running the code
console.log(evilObj.a); // 1
console.log(evilObj.b); // 1
console.log(evilObj.c); // 3
console.log(evilObj.a); // 2
console.log(evilObj.b); // 2
console.log(evilObj.c); // 3
```

Our sneakiness is undermined a bit by devtools, where evilObj will be identified as a Proxy, but we can still lead other developers on a merry chase before we're caught.

#### Contagious functions

So far we've talked about how objects can modify themselves, but we can also create innocuous looking functions that infect the objects that are passed to them with strange behavior.  For instance lets say we had a simple `get` function to do safe property lookups on an object that may not exist:

```javascript
let get = (obj, property, default) => {
   if(!obj) {
      return default;
   }
   return obj[property];
}
```

It would be easy to make that function contagious by subtly changing the object it was passed.  For instance we could make it so the retrieved property no longer showed up when the user enumerates the keys.

```javascript
let get = (obj, property, defaultValue) => {
   if(!obj || !property in obj) {
      return defaultValue;
   }
   let value = obj[property];
   delete obj[property];
   Object.defineProperty(obj, property, {
      value,
      enumerable: false
   })
   return obj[property];
}

let x = {a: 1, b:2 };

console.log(Object.keys(x)); // ['a', 'b']
console.log(get(x, 'a'));
console.log(Object.keys(x)); // ['b']
```

This is super subtle, since enumeration is neither rare nor particularly common.  Since the actual bug wouldn't be tied to the infected object at all, it could persist in a code base for a long time.


#### Messing with Prototypes

Sometimes the old ways are best.  One of the most criticized features of the JavaScript language is the ability to modify built-in prototypes.  This was used in the early days of JavaScript to enhance built in objects like arrays.  For instance we can add a `contains` function for arrays like this:

```javascript
Array.prototype.contains = function(item) {
  return this.indexOf(item) !== -1;
}
```

It turns out that doing this in real libraries can [ruin the language for everyone else](http://2ality.com/2016/02/array-prototype-includes.html#frequently-asked-questions).  So providing additional useful prototype methods is a good long con for malicious developers with patience.  But for the impatient sociopaths reading along, we also have some short term fun we can unleash.  The fun thing about prototype manipulation is that it affects all code running in an environment, even if that code is running in modules or closures.  So if we introduce the following code as a 3rd party script (maybe an ad or analytics script?), we can introduce subtle bugs throughout a site.

```javascript
Array.prototype.map = function(fn) {
   let arr = this;
   let arr2 = arr.reduce((acc, val, idx) => {
      if (Math.random() > 0.95) {
         idx = idx + 1
      }
      let index = acc.length - 1 === idx ? (idx - 1 ) : idx
      acc[index] = fn(val, index, arr);
      return acc;
   },[]);
   return arr2;
}
```

We've rewritten `Array.prototype.map` to work just like normal `map` with the exception that we will randomly switch the order of 2 values 1/20th of the time.  An example result:

```javascript
let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let square = x => x * x;
console.log(arr.map(square));
// [1,4,9,16,25,36,49,64,100,81,121,144,169,196,225
console.log(arr.map(square));
// [1,4,9,16,25,36,49,64,81,100,121,144,169,196,225]
console.log(arr.map(square));
// [1,4,9,16,25,36,49,64,81,100,121,144,169,196,225]
```

We ran map 3 times, and the first was subtly different than the next 2 runs.  It's subtle enough that it won't always cause anything to happen, and the crazy thing about this hack is that there's no real way to know it's happening without actually reading the source code that caused it.  Our function doesn't show up weirdly in devtools, and it doesn't error under strict mode or anything else.  This is how developers go mad.


#### Naming things is hard

As one of the 2 hard problems in Computer Science, you don't have to be evil to come up with bad names[^1].  But it certainly doesn't hurt.  We'll pass over the chump change of misleading names and outdated comments.

```javascript
// initialize a date
let arrayOfNumbers = { userid: 1, name: 'Darth Vader'};
```

No let's get to the good stuff.  Did you know that much of unicode can be used to name variables in JavaScript?  If you're into fun and games of course, this means that emoji are in play:

```javascript
let 💩 = { postid: 123, postName: 'Evil JavaScript'}
```

But we want evil JavaScript, so let's go straight to lookalike characters.

```javascript
let oｂj = {};
console.log(obj); // Error!
```

The `ｂ` in `oｂj` may look normal, but it is actually a _fullwidth latin small letter b_ instead of a _latin small letter b_, and that distinction means that anyone typing in the variable directly is probably going to be very confused.

### Don't be evil

Despite appearances, it is the official position of this blog that evil JavaScript should not be encouraged and may in fact be harmful.  That said, it's always good to know the ways things can go wrong. Each of these patterns exist out in the wild somewhere.  Hopefully in less malicious forms than I've shown here.  But lack of intent doesn't make them easier to debug, and knowing just how bad things can get is a good start to seeing these bugs coming.  You never know what bug is sitting out there waiting to strike. Just because you're paranoid doesn't mean that they're not out to get you.




[^1]: This may be hard to believe for old time Linux folks of course. They've had years to associate the worst naming offender in the industry (Microsoft) with the deepest forms of evil.

