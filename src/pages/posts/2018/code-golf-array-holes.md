---
title: "Code Golf: Sparse Arrays"
date: "2018-06-19T06:00:00+00:00"
layout: "post"
path: "/2018/06/19/code-golf-sparse-arrays/"
description: "Solving a fun little coding challenge"
keywords: "code golf arrays"
category: "javascript"
topics: ['JavaScript']
key: "code-golf-array-holes"
readNext: "codemod-survival,ten-things-js,es6-the-bad-parts"
---

Today on Twitter, [Axel Rauschmayer](http://2ality.com/index.html) posted a fun little coding challenge:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Code golf: check if an Array has holes. I’ll reply with two ideas of mine in a few minutes.</p>&mdash; Axel Rauschmayer (@rauschma) <a href="https://twitter.com/rauschma/status/1009053456123027463?ref_src=twsrc%5Etfw">June 19, 2018</a></blockquote>

For context, Code golf is a type of challenge where participants attempt to find the shortest possible way to express a program.  Arrays that have holes, or sparse arrays, refer to arrays that don't have values at every index between their maximum and minimum values.  You could define a sparse array like this:

```javascript
let arr = [1];
arr[100] = 2
// arr.length is 100
```

or like this

```javascript
let arr = [1,,2];
// arr.length is 3
```

This is different from `let arr = [1, undefined, 2]`, because the index keys are not defined.  If this is difficult to understand, you can picture arrays as simple objects, with access to the `Array.Prototype` methods and a special `length` property that is aware of numeric keys.  The important thing is not whether a value is defined for a specific index, but whether a key was ever explicitly set.  Axel's suggested solutions take advantage of that distinction:

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">// Does someArray have holes?<br><br>someArray.findIndex((x,i,arr) =&gt; x === undefined &amp;&amp; !(i in arr)) &gt;= 0<br>Object.keys(someArray).length &lt; someArray.length<br>someArray.filter(_ =&gt; true).length &lt; someArray.length</p>&mdash; Axel Rauschmayer (@rauschma) <a href="https://twitter.com/rauschma/status/1009056501095428096?ref_src=twsrc%5Etfw">June 19, 2018</a></blockquote>

I'm going to standardize these into a function syntax for the purpose of comparison.  I'm only going to consider one liners, so we'll define a simple arrow function `isSparse`, and compare the length of the function bodies.

```javascript
// Solution 1
let isSparse = someArray => someArray.findIndex((x,i,arr) => x === undefined && !(i in arr)) >= 0
// Solution 1 condensed (49 characters)
let isSparse = a => a.findIndex((x,i,b)=>x===undefined&&!(i in b))>=0
// Solution 2
let isSparse = someArray => Object.keys(someArray).length < someArray.length
// Solution 2 condensed (30 characters)
let isSparse = a => Object.keys(a).length<a.length
// Solution 3
let isSparse = someArray => someArray.filter(_ => true).length < someArray.length
// Solution 3 condensed (33 characters)
let isSparse = a => a.filter(_=>true).length<a.length
```

Axel's solutions all rely on the fact that sparse items don't have keys, and that Object.keys and Array.prototype methods therefore don't iterate over them.  That's a good insight and a good foundation for getting even more concise.  We can use a few tricks to do that.

Let's start with his second solution, which was the shortest and clearest in practice and modify it a bit

```javascript
// We're comparing the length of the list of keys to the array length
let isSparse = a => Object.keys(a).length<a.length
//But we can use reduce to do this instead (28 characters)
let isSparse = a => a.reduce(x=>x-1,a.length)==0
```
So our first step is to use `reduce` to save 3 characters.  If you haven't seen `reduce` before, I recommend checking out [this great explainer](https://css-tricks.com/understanding-the-almighty-reducer/) by Sarah Drasner that I linked to in my [Weekly Links post](https://benmccormick.org/2018/06/15/weekly-links-06-15-18/) last week.  Essentially though, reduce is a generic method for iterating through an array to produce a new value.  It takes a function and an initial value, and uses the items of the array to iteratively transform the initial value.  In this case, I'm just decrementing the value for each defined item in the array, starting at length and seeing if it equals 0.  Which ends up being shorter than taking the length of the keys array.  But we can still do better!

Our next step will take advantage of a property of numbers in JavaScript.  When converting numbers to booleans, `0` is considered *falsy*, while every other number is considered *truthy*.  Since we want our function to produce a boolean, we can take advantage of this property, and write our function like this.

```javascript
// Boolean version (27 characters)
let isSparse = a => !!a.reduce(x=>x-1,a.length)
```

That seems like a bit of a local maximum.  But getting to this point made me realize that we weren't actually saving anything by using the boolean version over a comparison, since we can increment instead and end up at the same length.

```javascript
// Counting up to length (27 characters)
let isSparse = a => a.reduce(x=>x+1,0)<a.length
```

Doing it this way though, we can actually save 2 more characters, because if reduce doesn't have an initial value, it just uses the unmodified first element in an array as its initial value, and goes from there:

```javascript
// Final Version (25 characters)
let isSparse = a => a.reduce(x=>x+1)<a.length
```

So there you have it.  25 characters to identify sparse arrays.  I'd love to hear from you if you can do better.  Hit me up on [Twitter](https://twitter.com/ben336) or by [email](ben@benmccormick.org).
