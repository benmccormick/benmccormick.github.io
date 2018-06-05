---
title: "ES6: The Bad Parts"
date: "2018/06/05"
layout: "post"
path: "/2018/06/05/es6-the-bad-parts/"
description: "Three years later, what parts of ES6 have I stopped using?"
keywords: "es6 destructuring const"
category: "javascript"
topics: ['JavaScript']
key: "es6-the-bad-parts"
readNext: "ten-things-js,following-js-roadmap,proposals-in-production"
---

This month is the 3 year anniversary of the ECMAScript2015 spec, [better known as ES6](https://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning).  It was a spec update that brought a ton of features to the JavaScript language, and the start of a new era of improving the language.  It was also the last "big bang" release of JavaScript, as TC39 has now moved to a pattern of annual small releases rather than making large multi-year language releases.

There has been a boatload of justified hype around ES6 over the last 4 years.  I've been writing all of my code using the modern spec during that time[^1]. So this is a good time to step back and evaluate the features that were added.  Specifically there are some features that I used for a while that I've stopped using, because they made my code worse.

In his book [JavaScript: The Good Parts](https://amzn.to/2LJBY9z) Douglas Crockford dedicated a chapter to the *Bad Parts* of JavaScript.  *The Bad Parts* are the features of JavaScript that he felt shouldn't be used.  Fortunately there is nothing as bad in ES6 as some of the old JavaScript stinkers like coercive equality, eval or the `with` statement.  ES6 was a well-designed release. But there are some features and patterns that I avoid. A JavaScript feature makes my *Bad Parts* list because:

1. **It's a trap.**  The feature looks like it does one thing, but has unexpected behavior in some cases that can easily lead to bugs
2. **It increases the scope of the language for little benefit.** The feature provides some small advantage, but requires the readers of my code to know about obscure features.  This is doubly true for *API features* where using the feature means that other code that interacts with my code must know about the feature.


In that spirit, here are my *Bad Parts* of ES6.


#### const

In older versions of JavaScript, we declared variables with the var keyword[^2].  This was mostly fine, but `var` has peculiarities.  It creates variables that are added to the global object, or scoped to a function, but don't respect other block boundaries.  It is also possible to reference a `var` declared variable before it is declared. These oddities occasionally come back to bite developers.  In response ES6 introduced 2 new keywords for declaring variables: `let` and `const`.  These solve the primary quirks of `var`; they are block-scoped, so a variable declared inside of a loop is not referencable outside of that loop, and trying to access the variable before it is declared in code results in a reference error. This was a big step forward.  It was also confusing, because we were given 2 solutions.

A `const` variable cannot be re-assigned after it has been declared. This is the only difference between `const` and `let`. This seems useful, and it can be.  The problem is the name. What it guarantees doesn't match what most people expect from a *constant*.

```javascript
const CONSTANT = 123;
// this will cause "TypeError: invalid assignment to const `CONSTANT`"
CONSTANT = 345;
const CONSTANT_ARR = []
CONSTANT_ARR.push(1)
// this will print [1] without an error
console.log(CONSTANT_ARR)
```

`const` prevents reassignment, but it doesn't make objects immutable.  This is a fairly weak guarantee for most value types.  Because this feature invites confusion, and `const` is otherwise redundant with `let`, I choose to always use `let`.

#### Template Literal Tags

`const` is an example of the spec creating too many solutions to too few problems. Template literals are the inverse.  The template literal syntax was TC39's way of tackling string interpolation and multi-line strings.  Then they decided to give it a string macro feature as well.

If you've never seen a template literal tag, they're a little like [decorators](https://github.com/tc39/proposal-decorators) for strings.  Here's an example from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):

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

Some features are fine when used simply, but can spiral out of controls.  For instance, I am happy to write ternary statements like

`let conferenceCost = isStudent ? 50 : 200`

but they become tough to follow if you start nesting them:

`let conferenceCost = isStudent ? hasDiscountCode ? 25 : 50 : hasDiscountCode ? 100 : 200`;

This is how I feel about destructuring.  Destructuring lets you pull variables out of objects or arrays

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
let eventRecord = {
  user: { name: "Ben M", email: "ben@m.com" },
  event: "logged in",
  metadata: { date: "10-10-2017" },
  id: "123"
};
let {
  user: { name: userName = "Unknown" },
  event: eventType = "Unknown Event",
  metadata: [date: eventDate],
  id: eventId
} = obj;

```

It's pretty much impossible to follow.  Code like this is much easier to read with the destructuring split into parts or eliminated.

```javascript
let eventRecord = {
  user: { name: "Ben M", email: "ben@m.com" },
  event: "logged in",
  metadata: { date: "10-10-2017" },
  id: "123"
};
let userName = eventRecord.user.userName || 'Unknown';
let eventDate = eventRecord.metadata.date;
let {event:eventType='UnknownEvent', id:eventId} = eventRecord;
```

I don't have a clear line for when destructuring has gone too far, but anytime I can't look at it and instantly know what variables are being declared, I know it's time to break things down for readability.

#### Default Exports

One nice thing about ES6 was the way it standardized things that had been accomplished using competing libraries.  Classes, Promises and modules all benefited from being folded into the spec after the community had time to absorb lessons learned from competitive user-land implementations.  ES6 modules are a great replacement for the AMD/CommonJS format wars, and provide a nice clean syntax for imports.

ES6 modules provide 2 main ways of exporting values: *named exports*, and *default exports*.

```javascript
const mainValue = 'This is the default export
export default mainValue

export const secondaryValue = 'This is a secondary value;
export const secondaryValue2 = 'This is another secondary value;
```

A module can define multiple named exports, but only a single default export.  When importing default exports, the importing file can give the default export any name as there isn't any lookup on name.  Named exports are imported by using the name of the variable in the exporting file, though renaming is possible.

```javascript
// default import
import renamedMainValue from './the-above-example';
// named import
import {secondaryValue} from './the-above-example';
// named import with a rename
import {secondaryValue as otherValue} from './the-above-example';
```

Default exports [were the preferred syntax of the folks designing ES6](https://esdiscuss.org/topic/moduleimport#content-0) and they intentionally gave it the cleanest syntax.  But in practice I've found named exports to be better.

1. Named exports match the names of the imported variable by default, making searching easier for those not using intelligent tooling.
2. Named exports can be matched to variables in other values prior to an import statement being written, allowing niceties like [auto-import](https://code.visualstudio.com/updates/v1_18#_auto-import-for-javascript-and-typescript) for those using intelligent tooling.
3. It's possible to use named imports consistently for everything, but that's only possible with default imports if you never want to export multiple values from a file.[^3] Using only named modules keep things simpler.

Naming things is good.  It promotes consistency in discussion and code.  I use named exports because I like clarity.


[^1]: Thanks <a href="https://babeljs.io/learn-es2015/">Babel</a>!
[^2]: Or global scope, or a property on an object, or a function declaration
[^3]: Exporting objects with multiple values as properties seems like a workaround here, but that loses the tree-shaking value that ES6 Modules provide for bundlers like webpack.
