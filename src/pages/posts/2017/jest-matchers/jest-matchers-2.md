---
title: "Taking Advantage of Jest Matchers (Part 2)"
date: "2017-09-05T03:00:00+00:00"
layout: "post"
path: "/2017/09/04/jest-matchers-2/"
description: "More API options for descriptive Jest tests"
keywords: "jest matchers"
category: "javascript"
key: "jest-matchers-2"
readNext: "jest-matchers-1,ten-things-js,jest-git"
topics: ['Jest', 'Testing']
pageViews: "0"
last30pageViews: "0"
---

*This post continues my look at Jest matchers from [Part 1](https://benmccormick.org/2017/08/15/jest-matchers-1/).*

In part 1 I covered the first 4 types of Jest matchers.  In this post I'm going to cover *contains* matchers, *async* matchers, *snapshot* matchers, *function* matchers and *meta* matchers, as well as looking at a few extra tips and tricks for using matchers.


### Contains Matchers

Contains matchers are exactly what they sound like.  They're matchers that check to see if an array contains an item or if a string contains a substring.  

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

#### .resolves, .rejects

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

Snapshot testing is one of Jest's signature features.  It's been described in depth in many other places, including [on this blog](https://benmccormick.org/2016/09/19/testing-with-jest-snapshots-first-impressions/).  If you're unfamiliar with snapshot testing, I recommend checking out one of those deeper posts.  But at a high level, snapshots are an assertion that data has remained the same since the last time a test was run.  Jest has serializers for a bunch of built in data types and React components. But it's possible to define serializers for different data types to determine how that data should be represented in a snapshot.  

The core snapshot function, `toMatchSnapshot()` is fairly simple to explain. When run the first time, `toMatchSnapshot` takes the string representation of the data passed to it (generated by whatever serializer is used for that data type) and writes it to a snapshot file.  After the snapshot has been written once, future runs of `toMatchSnapshot` behave differently.  If Jest is run normally, `toMatchSnapshot` compares the serialized data to the value in the snapshot file, and fails the test if they are different.  If Jest is run with the `-u` option, it will instead update the snapshot file with the current serialized value.  This behavior lets us write tests that don't have a pre-defined "correct value", instead we can use our test cases to see what has changed, and choose to accept it or not.

#### toThrowErrorMatchingSnapshot

In addition to `toMatchSnapshot`, Jest offers a second snapshot matcher, `toThrowErrorMatchingSnapshot`, which catches errors and verifies that they match a snapshot, similar to the `toThrow` matcher I described in part 1.

### Function Matchers

One of Jest's nicer features is its function mocking system.  A full discussion of function mocking is outside the scope of this post, but suffice it to say that you can create "tracked" functions in Jest.  The following matchers work with those tracked functions to verify behavior, using an example of a function that takes another function and calls it with the given arguments.

```javascript
const executeFn = (fn, ...args) => fn(...args)
```

#### toHaveBeenCalled, toHaveBeenCalledTimes

The most basic matcher when dealing with functions is `toHaveBeenCalled`.  It works more or less how it sounds, and determines whether a function has executed during the test.

```javascript
test('does executeFn run the function passed to it?', () => {
  let fn = jest.fn();
  executeFn(fn);
  expect(fn).toHaveBeenCalled();
})
```

Jest also has a related matcher, `toHaveBeenCalledTimes` which lets you specify how many times a function has been called.

```javascript
test('does executeFn run the function passed to it only once?', () => {
  let fn = jest.fn();
  executeFn(fn);
  expect(fn).toHaveBeenCalledTimes(1);
})
```

#### toHaveBeenCalledWith, toHaveBeenLastCalledWith

Sometimes you don't just want to know if a function was called, but want to make sure that it was called with the right arguments.  Jest has you covered.

```javascript
test('does executeFn run the function with the passed arguments', () => {
  let fn = jest.fn();
  executeFn(fn, 1, 2);
  expect(fn).toHaveBeenCalledWith(1, 2);
})
```

`toHaveBeenCalledWith` lets you check that the function was called with the right arguments.  You have to be careful though, if the function was called multiple times, you're only verifying that it was called with those arguments at some point.  If you want to get more specific, you can use `toHaveBeenLastCalledWith`.

```javascript
test('does executeFn run the function with the passed arguments', () => {
  let fn = jest.fn();
  executeFn(fn, 1, 2);
  executeFn(fn, 3, 4);
  expect(fn).toHaveBeenCalledWith(1, 2); // true
  expect(fn).not.toHaveBeenLastCalledWith(1, 2); // true
})
```

### Bonus Content

That's all for matcher methods, but there are a few other helpful things to know about matchers that I didn't get to work into any of the matcher categories.  So here you go:

### Extension Methods

Jest's expect object has 2 methods for extending what it can do: `expect.addSnapshotSerializer` and `expect.extend`.  `expect.addSnapshotSerializer` lets you add a new snapshot serializer as a one off for a specific test file. A serializer is simply an object that defines `test` and `print` methods.  You can learn more [in the docs](http://facebook.github.io/jest/docs/en/configuration.html#snapshotserializers-array-string).

`expect.extend` allows you to define custom matchers!  It takes an object with methods that define the new matchers to add.  Each method should be a function that takes the expected value as a first argument, and then expected arguments to the matcher as the rest of the arguments.  For instance, here is a matcher to see whether a string is a palindrome.

```javascript
expect.extend({
  toBeAPalindrome(received) {
    if (typeof received !== 'string') {
      return 'expected ${received} to be a string, but it was a ${typeof received}';
    }
    const reversed = received.split('').reverse().join('');
    const pass = received === reversed;
    if (pass) {
      return {
        message: () => (
          `expected ${received} not to be a palindrome`
        ),
        pass: true,
      };
    } else {
      return {
        message: () => (`expected ${received} to be a palindrome but it was ${reversed} when reversed`),
        pass: false,
      };
    }
  },
});

test('Anna is a palindrome', () => {
  expect('anna').toBeAPalindrome(); // true
  expect('ann').not.toBeAPalindrome(); // true
});
```

### Matcher Wildcards

Several of the matchers I've described in these posts are focused on equality of a particular part of a structure. These include the template matchers, contains matchers, and the `toEqual` matcher.  In these cases you're trying to say that some part of an object is equal to something else.  But sometimes you want to be a bit open-minded about part of that.  Maybe you want to ensure that an object has an `email` property that is a string with the character `@` in it , or that it has a name property defined, but that could be anything as long as its defined.  Jest has wildcards that help you do this.

- `expect.any(<constructor>)` lets you match any object of a specific type
- `expect.anything()` matches anything except null and undefined
- `expect.stringMatching(regexp)` matches any string that matches the regex you pass it
- `expect.stringContaining(string)` matches strings against a substring
- `expect.arrayContaining(array)` matches arrays that have a specific set of values in them
- `expect.objectContaining(object)` matches objects that have a specific set of key/value pairs

Using wildcards looks like this:

```javascript
test('wildcard example', () => {

  expect('test').toEqual(expect.anything()); // true

  expect({foo: ['bar', 'baz', 'test']}).toMatchObject({
    foo: expect.arrayContaining(['bar', 'test'])
  }); // true
});
```

### expect outside of Jest

As I was finishing up this post, Jest 21 was released, along with the exciting news that `jest-matchers` has been renamed to `expect` and is now available as a standalone module that can be used in other test frameworks, including in the browser.  So if the matchers in these blog posts have looked appealing to you, but you have an existing test framework that you're tied to, feel free to check it out [on npm](https://www.npmjs.com/package/expect).


## More Resources

- The latest info on all of these matcher APIs is always going to be in their very readable [docs](http://facebook.github.io/jest/docs/en/expect.html).  Check them out for more examples and good links to a deeper dive on some of the other topics that these posts have touched on, like snapshot testing and mock functions.

[^1]: Similar to toBe and toEqual from part 1, strict equality here means it's the same reference and is equivalent to `x === y`, while recursive equality means the object's are structured the same and any object with the same structure and values will be considered equal.
