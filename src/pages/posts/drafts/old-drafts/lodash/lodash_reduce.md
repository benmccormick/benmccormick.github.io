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
# Diving into lodash: Reducing collections

7 years ago, TC39, the group responsible for authoring the ECMAScript standard produced ES5, the 4th major version of the JavaScript language[^1].  One of the hallmark features of that release was a set of functional methods for working with arrays: `forEach`, `map`, `filter` and `reduce`.  The first 3 seem to be fairly well understood and widely used by many JavaScript developers, but `reduce` has remained more obscure.

The purpose of `reduce` is to provide a simple functional way to reduce a list of values into a single value.  This can be done for simple mathematical operations like summing or maxing, to build complex objects out of a list of keys, or to transform a dataset into a different form.

`reduce` takes 2 arguments, a reducer function and an optional initial value (also called an accumulator) and returns an aggregate value.  For each item in an array the reducer function receives the current value of the aggregate, the next value in the array, the index of the value, and a reference to the whole collection.  In practice, using it can look like this:

```javascript
//generate a list of random numbers between 0 and 99
let nums = _.map(_.range(0, 100), () => _.random(0, 99));

//get the maximum value
let max = nums.reduce((max, num) => num > max ? num : max, 0)

// get the sum of all of the numbers
let sum = nums.reduce((total, num) => num + total, 0)

// Get the counts of the occurence of each number between 0 and 99 in nums
let frequencies =_.map(_.range(0,100), ()=>0);
frequencies = nums.reduce((arr, num) => arr[num]++, frequencies);
```

lodash provides its own version of the native `reduce`.  `_.reduce` works similarly to the native function, but takes the collection as its first object and like other lodash functions will accept any array-like object and iterate it like an array, or normal objects, with which it will iterate over key value pairs. `_.reduce` also has special compatibility with many lodash functions that take multiple arguments, and makes sure to pass them only the first 2 arguments to avoid the index and collection arguments contaminating the function.  This allows code like this more complex version of the example from [my article on merging objects in lodash][mergeclone] :

```javascript

let contacts = [{
    firstName: 'John',
    lastName: 'Smith',
    phone: '919.222.7855',
},{
    firstName: 'John',
    phone: '919.965.9999',
    email: 'john.smith@gmail.com',
},{
    firstName: 'John',
    lastName: 'Smith',
    twitter: '@johnsmith232',
}];

_.reduce(contacts, _.assign);
// {firstName: "John", lastName: "Smith", phone: "919.965.9999", email: "john.smith@gmail.com", twitter: "@johnsmith232"}
```

We can also use `_.reduce` to recreate other lodash methods like `_.map` or `_.reverse`.  Here's an implementation of `_.reverse`:

```javascript
const reverse = (arr) => _.reduce(arr, (newArr, val) => {
    newArr.unshift(val);
    return newArr;
}, []);
```

The above code works fine, but it is extremely inefficient for large arrays.

```javascript
reverse(_.range(0, 1000)) // 0.09 seconds
reverse(_.range(0, 100000)) // 2.84 seconds
reverse(_.range(0, 1000000)) // over 6 minutes
```

The problem is that we're shifting all of the values in the array everytime we insert a new value.  It would be great if we could just add values to the end instead, but we're getting them in the wrong order.  Fortunately, lodash provides `_.reduceRight`. `_.reduceRight` works the same way as `_.reduce`, but starts from the end of the collection rather than the beginning.  That allows us to create a more efficient `reverse`:

```javascript
const betterReverse = (arr) => _.reduceRight(arr, (newArr, val) => {
    newArr.push(val);
    return newArr;
}, []);

betterReverse(_.range(0, 1000000)) // 0.11 seconds
```

### _.transform

`_.transform` is a variation on reduce with some different behavior.  If you don't pass a specific initial value, `_.transform` will try to do the right thing by reading the prototype of the collection and using either an empty array or object.  Changes are then made by mutating the accumulator rather than returning a new value.  `_.reduce` will simply start with the first item in the list if nothing is provided. So we can do this:

```javascript
const reverse = arr => _.reduce(arr, (newArr, val) => newArr.unshift(val));
```

`_.transform` can also be short-circuited by returning false from the function. So we could use it to cut off an array at the first odd number:

```javascript
const cutOffAtOdd = arr => _.reduce(arr, (newArr, val) => {
  if (val % 2 === 1) {
    return false;
  }
  newArr.push(val);
});
```

`_.transform` is more limited to reduce as the returned collection has to be the same type as the original collection.  You can't replicate the `max` or `sum` functions from the beginning of this article with it for instance, since you can't mutate an array down to a number.


### _.keyBy and _.countsBy

One of the primary use cases for `_reduce` is taking a collection and building an object from it.  lodash provides 2 methods that handle specialized versions of this use case.



[^1]: If that sentence was confusing, feel free to check out this [quick primer](http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/) on ECMAScript/JS terminology.


[mergeclone]
