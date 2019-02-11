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
# Diving into lodash: Iteration

One of the fundamental tasks that every programmer will encounter on a regular basis is iterating over a list of values.  JavaScript provides a simple functional utility for accomplishing this, the `forEach` function on arrays. You can see an example below of using it to solve the [fizzbuzz problem](http://c2.com/cgi/wiki?FizzBuzzTest).

```JavaScript
/*
Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.
*/

//Create an array from 1 - 100
let nums = _.range(1, 101);
//check each one
nums.forEach(num => {
    let fizz = num % 3 === 0;
    let buzz = num % 5 === 0;
    return `${fizz ? 'Fizz' : ''}${buzz ? 'Buzz' : ''}${!fizz && !buzz) ? num : ''}`;
});
```

Following the pattern that we've seen in past posts of this series, lodash has its own variation on forEach `_.forEach`.  `_.forEach` (which is also aliased as `_.each`) matches the native forEach method, and takes 2 arguments, a collection and a function.    It executes the function once for each item in the collection, passing in 3 arguments, the value, the key/index, and the collection object.  It then returns the original collection.  Iteration can be short-circuited any time by returning false from the function.  The main differences from the native method are that it works on any [collection][collections], not just arrays and that it takes the collection as an argument, while the native method is a method on Array.prototype that only takes a single function as an argument.

```javascript
//script to add a uniqueID to each div on a page in the form <n>of<num divs>

// divs is a NodeList (which doesn't have native forEach)
let divs = document.querySelectorAll('div');

const addUniqueId = (div, index, collection) => div.id = `${index}of${collection.length}`;

_.forEach(divs, addUniqueId);
```

lodash also has `_.forEachRight` (`_.eachRight`) which works the same way as `_.forEach` but iterates right to left on a collection rather than left to right.  It's hard to improve on the example from the [lodash docs][lodashdocsright] to explain this one:

```javascript
_.forEachRight([1, 2], function(value) {
  console.log(value);
});
// → Logs `2` then `1`.
```

`_.forEach` iterates over any collection, including objects.  But objects have several special cases.  First of all, `_.forEach` will attempt to iterate over anything that has a length property as an array, resulting in the following unintuitive bug:

```javascript
let box = {
    width: 3,
    length: 2,
    height: 4
};

_.forEach(box, (val, key) => console.log(key, val));
// 0 undefined
// 1 undefined
```

lodash addresses this by providing a `_.forOwn` function, that acts the same as `_.forEach` but treats everything as an object and iterates over each of its properties, regardless of what they are.

```javascript
let box = {
    width: 3,
    length: 2,
    height: 4
};

_.forOwn(box, (val, key) => console.log(key, val));
// width 3
// length 2
// height 4
```

Another edge case around objects is that they can inherit properties from their prototype object chain.  Both `_.forEach` and `_.forOwn` ignore properties on the prototype chain.  So shared properties get lost:

```javascript
class Box {
    constructor(width, length, height) {
        this.width = width;
        this.length = length;
        this.height = height;
    }
}

Box.prototype.material = 'wood';
let box = new Box(3, 2, 4);

_.forOwn(box, (val, key) => console.log(key, val));
// width 3
// length 2
// height 4

_.forEach(box, (val, key) => console.log(key, val));
// width 3
// length 2
// height 4
```

lodash provides a separate function, `_.forIn`, which is identical to `_.forOwn` but iterates over inherited properties as well as "own" properties.

```javascript
class Box {
    constructor(width, length, height) {
        this.width = width;
        this.length = length;
        this.height = height;
    }
}

Box.prototype.material = 'wood';
let box = new Box(3, 2, 4);

_.forIn(box, (val, key) => console.log(key, val));
// width 3
// length 2
// height 4
// material wood
```

Like `_.forEach` both `_.forIn` and `_.forOwn` have corresponding 'Right' methods, `_.forInRight` and `_.forOwnRight` that iterate over properties in the exact order.  Since property iteration in JavaScript is not guaranteed to be reliable, I'm not aware of any particular use for these methods, other than API consistency.  I'd love to hear from readers in the comments if you use those methods, and I'll update this section with that information.




[collections]: Need a post on what lodash considers a collection
[lodashdocsright]: https://lodash.com/docs#forEachRight
