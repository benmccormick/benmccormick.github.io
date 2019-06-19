---
title: "Implementing Memoization in JavaScript"
date: "2019/04/08"
layout: "post"
path: "/2019/04/08/memoization"
description: "Explaining Memoization through an implementation"
keywords: ""
category: "computer-science"
topics: ['React']
key: "memoization"
readNext: "consistency,reusable-react,book-review-five-dysfunctions"
isDraft: true
---

When React released [hooks](https://reactjs.org/docs/hooks-intro.html) last month, including a `useMemo` hook, it was the most prominent usage I'm aware of in the JavaScript community of the memoization technique to improve performance.  Since it's becoming more prominent in the React world, has a name that generally conveys nothing to those who are unfamiliar with it and is a useful programming concept for anyone to know, I thought it would be useful to explain memoization by writing out an example implementation in JavaScript.

### What Is Memoization?

The wikipedia definition of memoization is as follows:

> memoization ion is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

Some example situations where memoization is useful: restructuring complex data to get it ready for data display, when we may render many times, repeated calculations made against large lists of data, caching data that we're retrieving over a network (assuming we don't need to verify for changes).  Basically any expensive operation that is likely to be repeated and is a solely a product of the inputs passed to it.

So what does it look like to implement memoization in JavaScript?

### A JavaScript example

Let's say we want to write a `memoize` function that takes a random function and memoizes it.  Where do we start?  We can begin by just making sure that it can work correctly, returning a function that works the same way as the original function.  A starting place might look like this:

```javascript
// this doesn't actually memoize anything yet
const memoize = fn => (...args) => {
    return fn(...args);
}
```

So to start we define a `memoize` function that takes a function `fn` and returns a 3rd function that simply takes a set of args, passes them to `fn` and returns the result.  We haven't added any value so far, the function we've wrapped will function exactly the same as the original.  But we've set ourselves up to do interesting things.  Because we now have the ability to change how the function is called or not called based on the arguments.

#### Adding the Memoization

Since we now have the flexibility to determine how the function is called, we can write an initial implementation that applies the pattern of memoization using a cache object.

```javascript
const memoize = fn => {
    let cache = new MemoCache();
    return (...args) => {
        // check to see if these args are in the cache
        if (cache.has(args)) {
            // if they are return the value from the cache
            return cache.get(args);
        } else {
            // run the function and cache/return the result
            let result = fn(...args);
            cache.set(args, result);
            return result;
        }
    }
}
```

This is the heart of memoization:  instead of just passing through the result of the function, we're now defining a cache object which will store the result of previous calls.  If we've already made a call to the function with a specific set of arguments, we just return the saved result.  If this is the first time, we run the function, add the result to the cache, and then return it.


### Implementing the cache

Of course we're missing something here.  I didn't give an implementation for MemoCache because I didn't want to obscure the core algorithm.  But MemoCache is where the interesting choices happen here.  To implement it, we need to decide on 3 things:

**What counts as a unique call?**  When we memoize, we want to return a cached value if the arguments are the same.  But its possible to have different definitions of unique here.  If an array is passed, and then has one of its cells modified, is it still the same argument?  If we pass a function argument and the function body is the same but it was recreated with a new reference, is it the same?  In some cases we might want to treat an undefined argument the same as no argument at all?  This question will be dependent on your use case.

**How much do we care about memory usage?** If a function is called many times with many different arguments, memoize caches could potentially grow quite large and cause memory bloat.  To get around that we may want to limit the size of the cache. *Of note, this is why memoization should always be used as a performance optimization and not a guarantee that a function will only execute once with a given set of arguments*.

**How much do we care about lookup time?** Some strategies for looking things up (anything that depends on deep equality for instance) can be relatively slow.  If the function we're executing isn't very expensive and the objects we're comparing is complex, a deep comparison of arguments could even be slower than running the function.  So its important to be careful with your uniqueness tests.


For this example I'm going to implement a cache that compares arguments based on strict equality, and limits the total number of cached items to 100.  Because functions can have a variable number of arguments, we're going to create a recursive data structure to model a tree of arguments, while keeping track of the order of calls in an array.

```js
const VALUE = Symbol('CacheValue');
const IS_CHILD = Symbol('IS_CHILD_CACHE');
const MAX_CACHE_SIZE = 100;

class MemoCache {
    constructor() {
        this.root = new CacheNode();
        this.callList = []
        this.updateCallList = this.updateCallList.bind(this);
    }
    set(args, value) {
        return this.root.set(args, value, this.updateCallList)
    }
    get(args) {
        return this.root.get(args);
    }
    has(args) {
        return this.root.has(args);
    }
    updateCallList(node) {
        let idx = this.callList.indexOf(node);
        if(idx >= 0) {
            this.callList.splice(idx, 1);
        }
        this.callList.push(node);
        if (this.callList.length > MAX_CACHE_SIZE) {
            let deletedNode = this.callList.shift();
            deletedNode.deleteChild(VALUE);
        }
    }
}

class CacheNode {
    constructor(parent, key) {
        this.children = new Map();
        this.parent = parent
        this.key = key;
    }
    size() {
        let entries = this.children.entries();
        return entries.reduce((count, val) => count + (val instanceOf CacheNode ? val.size() : 1), 0)
    }
    deleteChild(val) {
        this.children.delete(val);
        if (this.parent && this.children.size() === 0) {
            this.parent.deleteChild(this.key);
        }
    }
    set(args, value, updateCall) {
        if (args.length === 0) {
            this.children.set(VALUE, value);
            updateCall(this);
        } else {
            let childArgs = args.slice(1);
            let key = args[0];
            if (!this.children.has(key)) {
                this.children.set(key, new CacheNode(this, key));
            }
            this.children.get(key).set(childArgs, value, updateCall);
        }
    }
    get(args) {
        if (args.length === 0) {
            return this.children.get(VALUE);
        } else {
            let childArgs = args.slice(1);
            let key = args[0];
            return this.children.get(key).get(childArgs)
        }
    }
    has(args) {
        if (args.length === 0) {
            return this.children.has(VALUE);
        } else {
            let childArgs = args.slice(1);
            let key = args[0];
            return this.children.has(key) &&
                this.children.get(key).get(childArgs);
        }
    }
}
```
