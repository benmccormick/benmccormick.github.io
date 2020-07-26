---
title: "JavaScript “Stale Practices”"
date: "2018/06/26"
layout: "post"
path: "/2018/06/26/javascript-stale-practices/"
description: "Looking at a few previous JavaScript best practices that are now out of date."
keywords: "javascript best practices"
category: "javascript"
topics: ['javascript']
key: "javascript-stale-practices"
readNext: "new-hello-world,ten-things-js,es6-the-bad-parts"
---

Best practices don't last forever. This is especially true when a field is changing fast, and JavaScript development has changed a lot over the past 10 years.  The old best practices go stale, and new ones take their place.  Here are 5 JavaScript best practices that have gone stale recently.


#### Using the strict mode pragma to opt in to a sane JavaScript subset

When [ECMAScript 5](https://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning) was released, it introduced a special [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) that tweaks the behavior of some obscure features of the language.  Now, when a function or script file starts with the string `'use strict'`, code in that scope works differently than the same code without the `'use strict'` string.  Expressions that look like a mistake are flagged as an error instead of being ignored, code is restricted in ways that make it easier to optimize performance, and terms that may be used in future JavaScript versions are reserved as keywords and you can't use them as names for variables.

```javascript
'use strict';
var objWithDuplicates = {x: 1, x: 2}; // Fine normally, an error in strict mode
with(objWithDuplicates) { // with expressions are syntax errors in strict mode
    console.log(x);
}
var private = 'top secret'; // this is a ReferenceError in strict mode
```

Strict mode was a nice small improvement in JavaScript, and a good way to move past some of the mistakes of the past like `with` expressions.  But even though it was a good idea to use, and I was adding the silly `'use strict'` string to the start of all my functions for a few years, this is no longer necessary for many people.

The `use strict` string was necessary because the language designers wanted to maintain backwards compatibility, and they needed a way for developers to signal that they were writing new code that they were comfortable holding to a higher standard.  ECMAScript 2015 ([ES6](https://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning)) provided a better way of doing that.  [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) are a new type of script, and browsers can be confident that scripts loaded that way have been edited in a ES2015+ world.  Because of that confidence, JavaScript modules are strict mode by default.  So if you are using `import` and `export` in your code, you can stop adding `'use strict'` everywhere and just rely on the browser to do the right thing.  If you're compiling through [Babel](https://babeljs.io/) or other tools you'll still be ok, as they add the strict mode pragma for you when they compile your classes down to ES5 code.


#### Using anonymous functions when dealing with async code in loops

For many years, JavaScript's many async use cases combined with the way `var` works to create a classic programmer trap.  Here's some jQuery code to put a listener on a series of buttons and alert a different number for each one of them.

```javascript
for (var i = 0; i < buttons.length; i ++ ) {
    $(buttons[i]).click(function() {
        alert(i + 1);
    });
}
```

The idea is that if we have a list of 10 buttons, after we run this code clicking the first one will alert `1`, the next one `2`, and so on.  The problem is... it doesn't work.  If there is a list of 10 buttons, all of them will alert `10` when clicked.  But why?   The problem is that `var` doesn't create a new variable for each run of the loop.  The technical term here is that `var` isn't *block-scoped*.  It isn't limited by a set of curly braces, when `var` is called, it creates a variable that is accessible anywhere inside the function that contains it, or it creates a property on the global object if there is no containing function.  So when we run our loop, we aren't creating 10 separate `i` values, we're creating 1 `i` value and updating it 9 times.  Since the click handlers don't run until the user has clicked the button, `i` has been updated all the way to 9, and every button references it and alerts `10`.

For years, the recommended way of working around issues like this was to create an inner function.  Because JavaScript variables are function scoped, we can create a new function, pass it the current i value, and execute the function immediately.  When the click handler executes, it will have a reference to the arguments from the inner function, and will receive the correct variable value.

```javascript
for (var i = 0; i < buttons.length; i ++ ) {
    (function(innerI) {
        $(buttons[innerI]).click(function() {
            alert(innerI + 1);
        });
    })(i);
}
```

This example works, but it's obviously a bit convoluted, and would not look straightforward to a new JavaScript programmer who came across it.  It gives off some unmistakable "magic function" vibe.  Fortunately we can do better nowadays.

ECMAScript 2015 introduced the block scoped variable types `let` and `const`.  Now we can create loop iterators that stay scoped to the loop portion that they were assigned in.  This allows us to re-simplify our code, but have it actually work.

```javascript
for (let i = 0; i < buttons.length; i ++ ) {
    $(buttons[i]).click(() => alert(i + 1));
}
```

#### Using closures for all of our private variables

JavaScript has never had a first class method for creating objects with private state.  Any normal object you create will have all its properties available for reading and editing by any code that has access to it.  But there has always been a workaround.  We can once again take advantage of JavaScript's function scope.  This time we can write a function that creates an object.  The methods of that object will have access to any other variables inside that function.  This is called a closure.  A closure is a function that returns another function that maintains access to the outer function state.  In this case the returned function will be a method on an object.  Here's an example with a user, where the id is only readable and the name can only be updated with explicit get and set commands, which won't accept a falsy value:

```javascript
function createUser(name) {
    let id = uuid();
    return {
        getID() { return id },
        getName() { return name },
        setName(_name) { name = _name || 'Unknown'},
    }
}
```

This object factory pattern is still useful today, but sometimes we want something a bit more object oriented.  Fortunately there are now more ways of doing these things. ES2015 introduced the `Symbol` keyword.  Symbols are unique values that can only be accessed by code that has a reference to the symbol.  So we can use a symbol as a more advanced version of our factory code above, creating a class that accesses it's private state via a symbol.

```javascript
let ID = Symbol();
let NAME = Symbol();

export class User {
    constructor(name) {
        this[ID] = uuid();
        this[NAME] = name;
    }
    get id() { return this[ID]}
    get name() { return this[NAME]}
    set name(name) { this[NAME] = name || 'Unkown'}
}
```

This allows us to keep all of our private state local to the object rather than in a separate closure, and our objects with private state can be created with class constructor syntax when that is preferred or required.

I want to note that this new best practice will likely become stale itself soon.  TC39 is considering a proposal to add explicit private state to classes.  It is currently in [stage 3](https://ponyfoo.com/articles/tc39-ecmascript-proposals-future-of-javascript#stage-3) with TC39 and is likely to become a part of the language.  In the proposal, private state would look like this:

```javascript
export class User {
    #id = uuid()
    #name = 'Unknown'

    constructor(name) {
        this#name = name;
    }
    get id() { return this.#id}
    get name() { return this.#name}
    set name(name) { this.#name = name || 'Unkown'}
}
```

#### Reading `arguments` to create variadic functions

Variadic functions are functions that may contain  different numbers of arguments when called.  For instance, a sum function that takes multiple arguments and adds them all together.  Prior to ES6, this was accomplished by using the special `arguments` variable.

```javascript
function sum() {
    let len = arguments.length;
    if (len < 2) {
        throw 'Sum requires at least 2 arguments'
    }
    // convert arguments to a "real array"
    let args = Array.prototype.slice.call(arguments);
    return args.reduce(function(a, b) { return a + b}, 0);
}
// sum(1,2) === 3
// sum(1, 10, 20) === 31
```

Using arguments is a bit messy.  First, it's a magic variable like `this` that is automatically available in the scope of any function.  This isn't obvious to people who don't know about it.  Second, it's not a "real array", it's an "array-like object", and thus it doesn't have useful methods like `map`, `filter`, `reduce` available on its prototype.  You always have to deal with the whole object, even if you have some named arguments and some unnamed ones.   But ES6 provided a better solution with rest parameters.

```javascript
function sum(...nums) {
    if (nums.length < 2)
        throw 'Sum requires at least 2 arguments'
    }
    return nums.reduce((a, b) => a + b, 0);
}
```

Rest parameters allow us to capture a varying-length group of arguments and read them as a real array with a meaningful name we choose. Because it captures a varying-length list of arguments, rest parameters must be the final parameter defined for a function, but they don't have to be the first.  You can define a few static parameters and leave a rest parameter to capture the remainder.

```javascript
let createBlogPost = (name, date, ...tags) => ({
    id: uuid(),
    name,
    metadata: {
        date,
        tags,
    },
});
```

Rest parameters can do everything arguments do[^1], but they do it in a less magic way, without the confusion of managing a fake array.  At this point arguments should be considered an anti-pattern.


#### Using slice to convert something to an array

The previous snippet contained an extra outdated practice.  Did you notice this line?

```javascript
let args = Array.prototype.slice.call(arguments);
```

That was previously the best way to handle fake arrays like `arguments`, NodeLists, or just `{3: 1, length: 4}`. `slice` makes a copy of an array, optionally adding or deleting elements.  Here we're only passing `arguments` as the `this` value of the function, so it works the same as `arr.slice()`.  When called without arguments, `slice` is essentially a clone function.  But this code looks pretty bizarre if you haven't seen it before.  It also slides into the "wait did I mean slice or splice?" vortex of array method confusion. So it isn't a particularly readable solution.

ES6 introduced the `Array.from` method to improve this situation.  `Array.from` takes an array-like object and creates a real array copy of it.  So it can be a clone method for existing arrays, or a conversion method for fakes like `arguments`.  `Array.from(arguments)` certainly reads a lot cleaner than the slice method.  It should be noted that they aren't completely equivalent.  `slice` will leave missing indices as holes, while `Array.from` will add those indices and set them to undefined.  So you can see the following difference

```javascript
let fakeArray = {1: 3, 3: 5, length: 4};

// convert object to a real array
let slicedArray = Array.prototype.slice.call(fakeArray);
let frommedArray = Array.from(fakeArray);

// filter Out 5s
let slicedArrayNoFives = slicedArray.filter(x => x !== 5);
let frommedArrayNoFives = frommedArray.filter(x => x !== 5);

console.log(slicedArrayNoFives) // [3]
console.log(frommedArrayNoFives) // [undefined, 3, undefined]
```

You can see my [last post](https://benmccormick.org/2018/06/19/code-golf-sparse-arrays/) for more on holes in arrays.

### Moving Forward

The fun of this industry is that everything is always changing.  The frustration of this industry is that everything is always changing.  I'm sure ES2020 or whatever they call it by then will give us plenty of new "best practices".  In the meantime, no need to throw away all your code right away.  But if you're setting an example for others, it would be a great time to update some visible examples of stale practices to point to the newer, more friendly solutions.  Even if you don't have your own blog posts or documentation to change, you can update public documentation.  Did you know that anyone can update the MDN JavaScript documentation?  I was able to add information about module strict mode to the [MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) while working on this post.  And you can upvote modern answers to popular old questions on StackOverflow.

- [Using `Array.from` to convert `arguments`](https://stackoverflow.com/a/960870/1424361)
- [let instead of closures in loops](https://stackoverflow.com/a/16661498/1424361) [^2]

Or just do some refactoring of high traffic code in your own code bases, so that older code isn't copy and pasted, and you have good examples of the better way to do things.



[^1]: Ok technically arguments has an `arguments.callee` property that gives you a reference to the calling function, but you can recreate this by giving your function a name, and using `arguments.callee` is an error in strict mode.
[^2]: Yeah... that one is my answer.  I promise I'm not just trolling for upvotes :)
