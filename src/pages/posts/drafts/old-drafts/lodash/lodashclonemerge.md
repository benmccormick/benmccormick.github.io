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
# Diving Into lodash - Merging and Cloning Objects

When working with data, it's common to have to merge data from multiple objects to create a new object, create a copy of an existing object, or update an existing object with properties form another object.  [lodash][lodash] makes these operations easy.  Let's take a look at what it provides.

### Merging Objects

In my last post I mentioned an example application where we want to merge 2 contact records:

```javascript
let contact1 = {
    firstName: 'John',
    lastName: 'Smith',
    phone: '919.222.7855',
};

let contact2 = {
    firstName: 'John',
    phone: '919.965.9999',
    email: 'john.smith@gmail.com',
};
```

There I talked about `_.assign` as an alternative to the native `Object.assign`.  `_.assign` is lodash's most basic "merging" function.  `_.assign`, like `Object.assign` takes 2 or more arguments: a destination object, and 1 or more source objects. It then returns the destination object.  When there are conflicts, the rightmost object "wins".  Using it looks like this:

```javascript
//merge contact2 into contact1
_.assign(contact1, contact2);
/*
// contact1
{
    firstName: 'John',
    lastName: 'Smith',
    phone: '919.965.9999',
    email: 'john.smith@gmail.com',

}
*/

//merge contact1 and contact 2 into a new object

let newContact = _.assign({}, contact1, contact2);

/*
// newContact
{
    firstName: 'John',
    lastName: 'Smith',
    phone: '919.965.9999',
    email: 'john.smith@gmail.com',

}
*/
```

`_.assign` is great as a compatible stand-in for Object.assign.  But lodash provides several other variant methods for merging that give a clear unambiguous syntax for a variety of use cases.

`_.assignIn`  is a variant of `_.assign` that adds both enumerable "own" properties and enumerable "inherited" properties from the source objects to the destination object.  This is in contrast to `_.assign` and `Object.assign` which only add enumerable "own" properties.

In JavaScript inheritance works through a "prototype object".  Both through ES6's class syntax and older function-based syntaxes for Object Oriented programming in JavaScript, objects that inherit from another object have the *parent* object defined as their "prototype".  `_.assignIn` will pull enumerable properties off of each source's prototype object (and its prototype object, and so on up the chain), and add them directly to the destination object.

`_.assignWith` is another `_.assign` variant that allows lodash to handle more complicated merges. In our example above, merging our 2 contacts causes us to lose contact1's phone number.  But in a real application that is probably not what we would want.  `_.assignWith` will allow us to preserve both phone numbers by merging them into an array.  `_.assignWith` takes the same arguments as `_.assign` but adds an optional final `customizer` argument.  `_.assignWith` expects `customizer` to be a function that takes 5 arguments: (objValue, srcValue, key, object, source). When merging values, customizer is run to determine what the destination value should be.  So our example above can become:

```javascript
//merge contact2 into contact1
_.assignWith(contact1, contact2, (dest, src, key) => {
    let bothDefined = !(_.isUndefined(dest) || _.isUndefined(src));
    if (key === 'phone' || key === 'email' && bothDefined) {
        return _.flatten([src, dest]);
    } else {
        return _.isUndefined(src) ? dest : src;
    }
});
/*
// contact1
{
    firstName: 'John',
    lastName: 'Smith',
    phone: ['919.965.9999', '919.222.7855'],
    email: 'john.smith@gmail.com',

}
*/
```

The customizer argument can be used for more things, including implementing a "safe" merge where an error is thrown on any conflict, or averaging 2 numeric values that are being merged.  There is also a `_.assignInWith` that combines `_.assignIn` and `_.assignWith`.

`_.defaults` is another variation on `_.assign`.  `_.assign` works "left to right", starting with the destination and then adding properties on top of that from each source in the list of arguments, with objects to the right "winning" when their are conflicts.  So we get `{ foo: 10`} in the following expression:

```
_.assign({foo: 0}, {foo: 5}, {foo: 10});
```

Sometimes we might want to reverse that flow, with the destination object "winning" any conflicts.  This is specifically helpful if we want to fill in an existing object with the "defaults" for fields that are not defined.

```
let obj1 = {
    foo: 0
};
let obj2 = {
    foo: 5,
    bar: 10
};

_.defaults(obj1, obj2);
// {foo: 0, bar: 10}
```

### Deep Merging

All of the methods we've looked at so far work on the top level key-value pairs of their source and destination objects.  But sometimes we need to merge nested objects.  lodash provides 3 methods for this use case: `_.merge`, `_.mergeWith` and `_.defaultsDeep`.

`_.merge` is similar to `_.assign`.  It takes a destination object, and multiple source objects and merges them together.  Unlike `_.assign` it is a deep merge.  So when we nest objects and arrays, we can merge like this:

```javascript
let contact1 = {
    firstName: 'John',
    lastName: 'Smith',
    address: {
        street: '1 Main St',
        state: 'NC',
    }
};

let contact2 = {
    firstName: 'John',
    phone: '919.965.9999',
    address: {
        street: '1 Main St',
        city: 'Durham',
        state: 'North Carolina',
    }
};

_.merge(contact1, contact2);
/*
{
    firstName: 'John',
    lastName: 'Smith',
    phone: '919.965.9999',
    address: {
        street: '1 Main St',
        city: 'Durham',
        state: 'NC',
    }
}
*/
```

Now that we've seen `_.merge`, it's hopefully not surprising that `_.mergeWith` is similar to `_.assignWith`, with deep merging possibilities.  `_.mergeWith` has the same API as `_.assignWith`, with the only change being an extra argument, `stack`, passed to the customizer function.  `stack` is an internal lodash data structure that allows you to keep track of the traversal as you move through nested deep merges. Finally, `_.defaultsDeep` has the same API as `_.defaults` but performs a deep merge.

There's one last merging function in lodash, and it is a bit of an oddball.  `_.mixin` is a legacy function from when lodash began as a fork of underscore, and it is a bit of an oddball in terms of syntax.  `_.mixin` has only one required argument, a source object.  It does not take multiple sources.  Instead, you can optionally pass a destination object as a first object, and an options object as a 3rd object.  The original intention of `_.mixin` was providing a way to extend the `underscore`/`lodash` object, and so the default destination is `_` itself.  I'll discuss that and the options argument more when I write about chaining lodash functions, but for now the important thing to know is that the main distinction between `_.mixin` and `_.assign` when merging a single source to a single destination is that `_.mixin` will add functions from the source object onto both the destination object and its prototype.

### Cloning Objects

Like merging, cloning objects is an important operation in many programs.  Because JavaScript objects are [mutable][mutablelink] by default, passing them around can often be unsafe if we don't know how they're going to be used.  If we want to pass information to a function, but don't want to allow it to mutate "our copy", we can clone it.

After learning about lodash's merge operations we already have everything we need to shallow clone an object using the methods above.  We can write our own shallow clone function like this:

```
const shallowClone = obj => _.extend({}, obj);
```

But lodash is all about simplifying common operations, so it provides its own `_.clone` function.  This function is a bit more powerful than our simple example above.  In addition to handling plain objects, it can also handle arrays, numbers, strings, Buffers and more.  It essentially tries to do something intelligent with anything you throw at it, though it will return empty objects for non-cloneable objects like functions and DOM nodes.

Simple cloning is great, but we sometimes want to do something more complicated.  Let's consider the following order record:

```javascript
let order = {
    id: 123,
    productIds: [12345, 6789],
    shippingAddress: {/*...*/},
    billingInfo: {/*...*/},
    total: '56.85',
    orderDate: '09/21/2015'
}
```

If we want to allow a client to repeat their order, we might want to clone this object to make sure we capture all of the order metadata correctly.  The problem is that there are some fields we don't want to capture, specifically id and orderDate.  We could explicitly list the fields we want to copy, but then we'd have to update the code anytime we added a new field.

`_.cloneWith` helps solve this problem.  Like `_.assignWith` `_.cloneWith` takes a customizer function that allows us to choose how to handle an individual key. We can either return a value to use as the cloned value, or undefined.  Returning undefined causes the method to revert to the base code.  So we can handle our clone like this:

```javascript
const mergeFunc = (value, key, object, stack) => {
    switch(key) {
    case 'id':
        return generateNewId();
    case 'date':
        return moment().format('MM/DD/YYYY');
    default:
        return undefined;
    }
};

let newOrder = _.cloneWith(order, mergeFunc);
```

The final 2 clone methods lodash provides are `_.cloneDeep` and `_.cloneDeepWith`.  If you've been paying attention up till now, these 2 should be self explanatory.  They work the same as `_.clone` and `_.cloneWith` but also clones nested objects.

It may seem weird that lodash has 12 different functions for cloning and merging objects, but hopefully I've been able to show how that can be helpful.  Use the right tool for the job!

### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out the [first post in this series][firstpost].




[lodash]: https://lodash.com/
[mutablelink]: http://benmccormick.org/2016/06/04/what-are-mutable-and-immutable-data-structures-2/
[firstpost]:
