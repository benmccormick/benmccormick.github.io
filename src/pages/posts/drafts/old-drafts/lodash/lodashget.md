---
title: "Lodash WIP"
date: "2018/09/17"
layout: "post"
path: "/2018/09/17/lodash-wip/"
description: "Lodash wip"
keywords: ""
category: "software-productivity"
topics: []
key: "lodash-1"
isDraft: true
readNext: "feedback-loops,ten-things-js,react-confessions"
---
# Diving Into lodash: Getting and Setting nested properties

Dealing with nested properties in JavaScript is a bit of a pain.  Because JavaScript has no explicit static typing system, it never makes guarantees about the structure of data, and there are no great language idioms for easily handling missing data.  There are a few common idioms for handling missing data.  Many developers will use `||` to assign a placeholder for a missing element, like this:

```javascript
let message = obj.message || 'Nothing to say';
```

When handling nested data that may be missing, the choice is usually between accessing it unsafely, checking each layer to see if it exists first, or using a try catch block:

```javascript
/*
if we expect user to look like this:
{
    name: 'Jon Smith',
    //...
    addresses: [{
        street: '311 Main St',
        city: 'Durham',
        state: 'NC',
        zip: '27701',
    }],
}
*/

//this is an unsafe lookup
let userCity = user.addresses[0].city;

//this is using checks

let userCity = user && user.addresses && user.addresses.length && user.addresses[0] && user.addresses[0].city ? user.addresses[0].city : 'Unknown City';

//this is using try catch
let userCity;
try {
   userCity = user.addresses[0].city;
} catch (e) {
    userCity = 'Unknown City';
}
```

Each of these is unsatisfactory in its own special way.  Using `||` for placeholder values can be unreliable.  It will replace `0`, `false` and `''` with placeholder values even when those might be valid values.  That means you need to think through the possible values every time you use it.  Unsafe lookups are in fact unsafe.  While they can be ok in sections of code where the values that are being passed have been guaranteed through other means, JavaScripts dynamic nature makes them a likely source of crashes in the long run.  Finally, the conditional and try catch options both obscure the logic of the code and come with their own pitfalls.  When going 3 levels deep its easy to miss a conditional check, and while in the above example it is obvious that an error is coming from missing values, try catches in the real world will often require more boilerplate to make sure that we've safely caught the right error and handled it correctly with the placeholder value.

lodash provides 3 methods for safely accessing nested data, and 5 more for safely updating that data.  In this post I'm going to quickly review those options.

### Accessing nested data

The 3 methods lodash provides for safely accessing nested data are `_.get`, `_.result`, and `_.invoke`.  Each provides a safe way of accessing data through a path.

`_.get` is the simplest of the 3.  It takes 3 arguments: an object, a path, and optionally a default value.  With `_.get`, our example from above looks like this:
```javascript
/*
if we expect user to look like this:
{
    name: 'Jon Smith',
    //...
    addresses: [{
        street: '311 Main St',
        city: 'Durham',
        state: 'NC',
        zip: '27701',
    }],
}
*/

let userCity = _.get(user, 'addresses[0].city', 'Unknown City');
```

If any portion of the nested path is undefined, `_.get` will return the default value, or undefined if one is not set.  The defaulting behavior is reliable.  It will only switch to the default on an undefined value along the path, not on a falsy value like `||`.

`_.result` has the same behavior and signature as `_.get` with one exception.  If the object and path evaluates to a function, `_.result` will evaluate the function and return the result.  This is extremely useful for designing flexible APIs, both for library authors and inside a larger application, as it is possible to specify options that can be passed either as data or as a function that will evaluate to data at run time.  [Backbone](http://backbonejs.org/) makes heavy use of this in their APIs, where many properties of Backbone Views and Models can be specified either as a string or a function.

Finally `_.invoke` is similar to `_.result`, but always attempts to call the result of evaluating the object and a path as a function.  If the end of the path is a function, `_.invoke` calls it and returns the result.  If the end of the path is undefined, `_.invoke` returns undefined.  If the end of the path is defined, but not a function, `_.invoke` throws an error.

```javascript
let obj = {
    a: () => 2,
    b: 3,
}

_.get(obj, 'a', 'default') // () => 2
_.result(obj, 'a', 'default') // 2
_.invoke(obj, 'a') // 2

_.get(obj, 'b', 'default') // 3
_.result(obj, 'b', 'default') // 3
_.invoke(obj, 'b') // Uncaught TypeError: func.call is not a function(…)

_.get(obj, 'c', 'default') // 'default'
_.result(obj, 'c', 'default') // 'default'
_.invoke(obj, 'c') // undefined
```

### Updating nested data

The 5 methods lodash provides for updating nested data are `_.set`, `_.setWith`, `_.unset`, `_.update`, and `_.updateWith`.

`_.set` is the simplest possible update.  It allows you to set a nested property, but builds out the path to the property if it doesn't exist. So for instance you can do this:

```javascript
let a = {};
_.set(a, 'b[0].c', 2);

console.log(a); // { b: [{c: 2}]}
```

Set tries to be smart about how it builds out the path, build arrays for `[n]` notation areas, and new objects for keys in the path.

`_.setWith` gives you a bit more control.  It works similarly to `_.set`, but exposes an extra argument _customizer_ that lets you define a function to manage the behavior at each level in the path.  The customizer takes the existing path values if they exist as well as the key names, and lets the user define the structure of the values to fill the path with.

`_.unset` does exactly what it sounds like.  It safely attempts to delete a nested property, and will return true if it successfully deletes a property, false otherwise.  It's syntax is similar to `_.get` and `_.set`, it takes 2 arguments, an object and a path.

```javascript
let a = {};
_.set(a, 'b[0].c', 2);
console.log(a); // { b: [{c: 2}]}
_.unset(a, 'b[0].c');
console.log(a); // { b: [{}]}
```

`_.update` works the same as set, but instead of taking a new value, takes a function.  That function gets the current property value, and then set's the result of passing that value to the updater function.  Like this:

```javascript

let a = {
    b: {
        c: 2
    }
};

const safeSquare = value => _.isFinite(value) ? value * value : 0;

_.update(a, 'b.c', safeSquare);
// a => {b: {c: 4}}
_.update(a, 'b.d', safeSquare);
// a => {b: {c: 4, d: 0}}
```

`_.update` is also paired with an `_.updateWith`, which takes a customizer function that works the same way as `_.setWith`.

### Subscribe

Thanks for taking the time to read this post!  JavaScript Development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out the other lodash posts in this series.

