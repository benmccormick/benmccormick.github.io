---
title: "Taking Advantage of Jest Matchers (Part 2)"
date: "2017-08-21T04:00:00+00:00"
layout: "post"
path: "/2017/08/21/jest-matchers-2/"
description: "More API options for descriptive Jest tests"
keywords: "jest matchers"
category: "javascript"
key: "jest-matchers-2"
readNext: "jest-matchers-1,ten-things-js,jest-git"
pageViews: "0"
last30pageViews: "0"
---

*This post continues my look at Jest matchers from [Part 1](https://benmccormick.org/2017/08/15/jest-matchers-1/).*

In part 1 I covered the first 4 types of Jest matchers.  In this post I'm going to cover contains matchers, async matchers, snapshot matchers, function matchers and meta matchers, as well as looking at a few extra tips and tricks for using matchers.


### Contains Matchers

Contains matchers are exactly what they sound like.  They're matchers that check and see if an array or string contains an item or substring.  

#### toContain and toContainEqual

`toContain` and `toContainEqual` both check to see if a value is contained inside of an array or string.  When used against a string, they are both equivalent and check to see if a passed string is a substring of the expression being tested.  This means they serve as a more limited version of `toMatch` that will only take a substring and not a regex.  When used against an array or array-like object, `toContain` looks for matches using strict equality while `toContainEqual` looks for matches using recursive equality[^1].  In practice that looks like

```javascript
// toContain does exact matches
expect(['a', 'b', 'c']).toContain('a') // true
expect({0: 'a', 1: 'b', length: 2}).toContain('a'); // true
expect('abc').toContain('ab'); // true
expect('abc').not.toContain(/a/); // true
expect([{a: 'bc'}, {b: 'cd'}]).not.toContain({a: 'bc'}); // true

// toContainEqual does recursive matches
expect(['a', 'b', 'c']).toContainEqual('a') // true
expect([{a: 'bc'}, {b: 'cd'}]).toContainEqual({a: 'bc'}); // true
```



### Async Matchers
.resolves
.rejects

### Snapshot Matchers
.toMatchSnapshot(optionalString)
.toThrowErrorMatchingSnapshot()

### Function Matchers
.toHaveBeenCalled()
.toHaveBeenCalledTimes(number)
.toHaveBeenCalledWith(arg1, arg2, ...)
.toHaveBeenLastCalledWith(arg1, arg2, ...)

### Meta Matchers
expect.assertions(number)
expect.hasAssertions()


### Customization Methods
expect.addSnapshotSerializer(serializer)
expect.extend(matchers)

### wildcards
any
anything
stringMatching(regexp)
expect.stringContaining(string)
expect.arrayContaining(array)
expect.objectContaining(object)

[^1]: Similar to toBe and toEqual from part 1, strict equality here means it's the same reference and is equivalent to `x === y`, while recursive equality means the object's are structured the same and any object with the same structure and values will be considered equal.
