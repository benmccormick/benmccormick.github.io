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

Async matchers handle testing functions that have an asynchronous component.  We'll look at `resolves` and `rejects` for testing Promises.  But first, it is worth noting that any matcher can be used for asynchronous testing if necessary.  You just have to use the callback option that is passed to each test function, like so:

```javascript
test('Delayed Test', done => {
  let delayedEval = condition => () => {
    expect(condition).toBe(true);
    done();
  }
  setTimeout(delayedEval(1 === 1), 0) // true
})
```

Jest detects whether the `done` callback has been defined for the function, and if it is waits for 5 seconds to see if `done` is called before failing, and evaluates any
asynchronous expects that occur before then.  This behavior is inherited from Jasmine, and works ok, but can be a bit difficult to work with.  Jest makes this easier in 2 ways.  First with a set of special matchers for working with promises, and second with a set of meta matchers that can make async tests more reliable.  We'll get to the meta matchers in a second, but first we'll look at the promise matchers.

# .resolves, .rejects

`resolves` and `rejects` are chaining matchers like `not` that let you write async tests with Promises.  Using `resolves` to rewrite the previous example looks like this:

```javascript
test('Delayed Test with promises', () => {
  let testPromise = new Promise((res, rej) => {
      setTimeout(() => res(1 === 1), 0);
  });
  expect(testPromise).resolves.toBe(true); // true
})
```

This waits for the promise to resolve, and then compares the resolved output with `toBe`.  If a rejection is expected, you can replace `resolves` with `rejects` for a similar test. This ends up being much clearer in my opinion than the callback-based async tests, since the assertion is much more direct, and you don't have to worry about cases where `done` might not be called where it should be.


### Meta Matchers

Meta matchers pair well with the `done` async matchers above, if you have to use them.  They just let you test that all of your assertions have actually run. The first one, `expect.assertions` tests that a specific number of assertions have been run at that point in the test.

```javascript
test('records have a name and an ID', () => {
    let record = getRecord(1);
    expect(record).toHaveProperty('id');  
    expect.assertions(1);  // true
    expect(record).toHaveProperty('fullName');
    expect.assertions(2);  // true
})
```

This can be useful for async tests to make sure things have run correctly before calling `done()`, for tests with conditional logic to make sure that the logic played out as expected, and for normal tests as an extra paranoid quality check to make sure that tests aren't accidentally deleted.

`expect.hasAssertions` is just a simpler version of this test that checks that you've asserted something in the test.  It's useful for the same things as `expect.assertions` but will be a little less reliable and also a bit less fragile when tests change.

Note that neither `expect.assertions` nor `expect.hasAssertions` count as assertions themselves and don't contribute to the assertion count.

### Snapshot Matchers
.toMatchSnapshot(optionalString)
.toThrowErrorMatchingSnapshot()

### Function Matchers
.toHaveBeenCalled()
.toHaveBeenCalledTimes(number)
.toHaveBeenCalledWith(arg1, arg2, ...)
.toHaveBeenLastCalledWith(arg1, arg2, ...)



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
