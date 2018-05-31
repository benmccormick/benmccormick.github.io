---
title: "ES6: The Bad Parts"
date: "2018/05/21"
layout: "post"
path: "/2018/05/21/es6-the-bad-parts/"
description: "Three years later, what parts of ES6 are worth using?"
keywords: "es6 destructuring async"
category: "javascript"
topics: ['JavaScript']
key: "three-years-es6"
readNext: "ten-things-js,following-js-roadmap,proposals-in-production"
---

Next month will mark the 3 year anniversary of the ES2015 spec, [better known as ES6](https://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning).  It was a huge moment in the evolution of JavaScript, a spec update that brought a ton of high level features to the JavaScript language, and the start of a new process of improving the language that so far has resulted in far more transparency and cross-environment compatibility.  It was also the last "big bang" release of JavaScript, as TC39 has now moved to a pattern of annual small releases rather than making large multi-year language releases.  There's been a ton of hype around ES6 over the last 4 years, and I've been writing all of my code using the modern spec during that time[^1] so this seems like a good time to step back and evaluate the features that were added.  Specifically there are some features that I tried out or used for a whiel that I've since stopped using, because I think they made my code worse.

In his great 2008 book [JavaScript: The Good Parts](https://amzn.to/2LJBY9z) Douglas Crockford dedicated a chapter to the *Bad Parts* of JavaScript.  The bad parts are the features of JavaScript that he felt were [code smells](https://en.wikipedia.org/wiki/Code_smell).  Their usage was either a sign that the code was doing something strange and could probably be improved, or a potential pitfall for less experienced devs who didn't know all the intricacies of a complex feature.  Fortunately there is nothing as bad in ES6 as some of the old JavaScript stinkers like coercive equality, eval or the `with` statement.  ES6 was generally a fantastic well-designed release. But there are definitely some features and patterns that I've cut out of my own code over the past 3 years. In that spirit, here are my "bad parts" of ES6.


### The Bad Parts

#### const

In older versions of JavaScript, when a developer wanted to declare a variable, they would use the `var` keyword[^2].  This was mostly fine, but `var` had some peculiarities.  It created variables that were added to the global object, or scoped to a function, but didn't respect loop, if statement, or other block boundaries.  It was also possible to reference a `var` declared variable before it was declared, as long as it was eventually declared. These oddities would occasionally come back to bite developers in odd ways.  In response ES6 introduced 2 new keywords for declaring variables: `let` and `const`.  These each solved the primary quirks of `var`; they were block-scoped, so a variable declared inside of a loop was not referencable outside of that loop, and trying to access the variable before it was declared in code resulted in a reference area.  So this was a big step forward.  Unfortunately, it was also confusing, because we were given not 1, but 2 solutions.

The only difference between `const` and `let` is that a `const` variable cannot be re-assigned after it has been declared.  This seems like a useful guarantee, and generally it can be.  The problem is that it's named `const`, and what it guarantees doesn't quite match what most people expect from a "constant".

```javascript
const CONSTANT = 123;
// this will cause "TypeError: invalid assignment to const `CONSTANT`"
CONSTANT = 345;
const CONSTANT_ARR = []
CONSTANT_ARR.push(1)
// this will print [1] without an error
console.log(CONSTANT_ARR)
```

The problem is that `const` prevents reassignment, but it doesn't make objects immutable.  It is a fairly weak guarantee for most types of objects.  Because it adds relatively little value, and is otherwise redundant with `let`, I find myself choosing to always use `let` and staying away from `const`, which (for those unfamiliar with it) over-promises and under-delivers.

#### Template Literal Tags

If `const` is an example of the spec creating too many solutions to too few problems, template literals are the inverse.  The template literal syntax was JavaScript's way of tackling string interpolation and multi-line strings.  But just for kicks, they also decided to give it a magic string macro feature as well.  If you've never seen a template literal tag, they're a little like [decorators](https://github.com/tc39/proposal-decorators) for strings.  Here's an example from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):

```javascript
var person = 'Mike';
var age = 28;

function myTag(strings, personExp, ageExp) {

  var str0 = strings[0]; // "that "
  var str1 = strings[1]; // " is a "

  // There is technically a string after
  // the final expression (in our example),
  // but it is empty (""), so disregard.
  // var str2 = strings[2];

  var ageStr;
  if (ageExp > 99){
    ageStr = 'centenarian';
  } else {
    ageStr = 'youngster';
  }

  return str0 + personExp + str1 + ageStr;

}

var output = myTag`that ${ person } is a ${ age }`;

console.log(output);
// that Mike is a youngster
```

This isn't totally useless. [Here's a roundup of some use cases](https://codeburst.io/javascript-es6-tagged-template-literals-a45c26e54761).  HTML sanitization is a useful trait.  And this is the currently the cleanest way to do things when you're having to perform the same operation on all inputs to an arbitrary string template.  But that's a relatively rare scenario, and you can also accomplish the same use cases with a (more verbose) function API rather than using tagged literals.  And for most things, the function API won't even be worse.  This feature is not adding new capabilities, but is adding new concepts that future readers of my code have to be familiar with.  So I plan on staying clear as much as possible.

#### Overly crazy destructuring expressions

Some features are fine when used simply, but can spiral out of controls.  For instance I am happy to write ternary statements like

`let conferenceCost = isStudent ? 50 : 200`

but they can quickly spiral out of control if you start nesting them:

`let conferenceCost = isStudent ? hasDiscountCode ? 25 : 50 : hasDiscountCode ? 100 : 200`;

This is how I feel about destructuring.  Destructuring is one of the cooler features of ES6.  It let's you pull variables out of objects or arrays

```javascript
let {a} = {a: 2, b: 3};
let [b] = [4, 5];
console.log(a, b) // 2, 4
```

and also lets you rename variables, get nested values, and set defaults.

```javascript
let {a: val1} = {a: 2, b: 3};
let [{b}] = [{a:3, b:4} , {c: 5, d: 6}];
let {c=6} = {a: 2, c: 5};
let {d=6} = {a: 2, c: 5};
console.log(val1, b, c) // 2, 4, 5, 6
```

All of which is great, until you start combining those features.  For instance, this expression declares 4 variables, userName, eventType, eventDate, and eventId pulled out of different spots in the object structure of `eventRecord`.

```javascript
let eventRecord = {user: {name:'Ben M', email: 'ben@m.com'}, event: 'logged in, metadata: {date :'10-10-2017}, id:'123'};
let {user: {name:userName = 'Unknown'}, event:eventType='Unknown Event', metadata: [date: eventDate], id:eventId} = obj;
```

but it's pretty much impossible to follow.  An example like this is much easier to read with the destructuring split up into multiple parts or eliminated.

```javascript
let eventRecord = {user: {name:'Ben M', email: 'ben@m.com'}, event: 'logged in, metadata: {date :'10-10-2017}, id:'123'};
let userName = eventRecord.user.userName || 'Unknown';
let eventDate = eventRecord.metadata.date;
let {event:eventType='UnknownEvent', id:eventId} = eventRecord;
```

I don't have a clear line for when destructuring has gone too far, but anytime I can't instantly look at it and determine what variables are actually being declared rather than being used for nesting or renaming, I know it's time to break things down for readability.  Other folks may have even less tolerance than me and you'll have to adjust your coding style accordingly

#### Default Exports

[^1]: Thanks <a href="https://babeljs.io/learn-es2015/">Babel</a>!
[^2]: Or global scope, or a property on an object, or a function declaration
