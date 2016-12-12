---
title: "Saving Time With Jest: Meetup Summary"
date: "2016-12-10 05:15:00+00:00"
layout: "post"
path: "/2016/12/10/saving-time-with-jest"
description: "A summary of my meetup talk on saving time with Jest"
keywords: "Jest JavaScript testing meetup talk Triangle React"
category: "tools"
pageViews: "79"
last30pageViews: "79"
---

This week I gave a talk at the brand new Triangle ReactJS meetup group on how [Jest][jest] can save developers time.  I was asked afterwards to share the content online for those who missed it.  My talk was mostly demos and wasn't recorded, so there unfortunately isn't much to share, but I thought I could write out the basic ideas behind the talk, and share them here.


### What is Jest

Jest is a JavaScript testing framework built by Facebook to address their internal problems testing JavaScript code.  It was open-sourced in 2014, but unlike Facebook's other recent high profile JavaScript OSS projects like React, Flux, Relay and GraphQL, it failed to develop much traction in the community and mostly stagnated for 2 years.  That changed in early 2016 when 2 Facebook developers, [Christoph Pojer][christoph] and [Dmitrii Abramov][abramov] began working on improving the project. Over the past year they've brought massive improvements to the developer experience of using Jest.

At a more practical level Jest is a test runner with a built in assertion library and support for code coverage, babel transpilation, and module mocking.  It began as a wrapper around [Jasmine][jasmine], an older JavaScript testing library, but has since replaced parts of Jasmine with replacement functionality, while retaining backwards compatibility.


### How Can Jest Save Me Time?

Jest saves developers  time in 4 main ways:

1. **Setup** - Jest is simple to configure
2. **Writing Tests** - Jest provides a method for writing simple UI tests, and makes it easy to port over existing tests
3. **Running Tests** - Jest runs tests in parallel, doesn't require a browser, and only runs the tests that are affected by the current code changes
4. **Fixing Tests** - Jest gives great error messages, helps you find the failing code, and has other smaller UX features that make it easy to debug your failing tests quickly.

<div>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Tonight <a href="https://twitter.com/ben336">@ben336</a> speaks about using <a href="https://twitter.com/hashtag/jest?src=hash">#jest</a> with <a href="https://twitter.com/hashtag/reactjs?src=hash">#reactjs</a> for your testing needs <a href="https://twitter.com/nestraleigh">@nestraleigh</a> <a href="https://t.co/CAV8wZUwFw">pic.twitter.com/CAV8wZUwFw</a></p>&mdash; Tracy Lee | ladyleet (@ladyleet) <a href="https://twitter.com/ladyleet/status/806655476515618822">December 8, 2016</a></blockquote>
</div>

### Setup

Setting up Jest is extremely straightforward. Here's a `Hello World` React Project


```json
//package.json
{
  "name": "simple_example",
  "version": "1.0.0",
  "description": "A minimal jest testing example",
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "react": "^15.4.1"
  },
  "devDependencies": {
    "babel-jest": "^17.0.2",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "jest": "^17.0.3",
    "react-test-renderer": "^15.4.1"
  }
}
```

In package.json we have 4 dependencies that are part of a normal React project setup, `react`, the 2 babel presets for using [es2015][ecma] syntax, and `react-test-renderer`, which is a react addon for rendering react for testing, similar to how `react-dom` renders components for the browser.  We then add `jest` and `babel-jest`.  `jest` provides the test runner, assertions API, mocking capabilities, and cli.  `babel-jest` is a drop-in dependency that lets Jest integrate with Babel.  Neither require any additional configuration in the normal case. Lets say the rest of our project looks like this:

```txt
├── __tests__
│   └── simple-component.spec.js
├── package.json
└── simple-component.js
```

```javascript
// simple-component.js
import React from 'react';

export const SimpleComponent = () => <div>
    Hello World
</div>;
```

```javascript
// __tests__/simple-component.spec.js
import React from 'react';
import renderer from 'react-test-renderer';
import {SimpleComponent} from '../simple-component';

it('shows Hello World', () => {
  const component = renderer.create( <SimpleComponent/>);
  let componentJSON = component.toJSON();
  expect(componentJSON.children[0]).toBe('Hello World');
});
```

Given this project, we only have to run

```
yarn # or npm install
jest
```

and jest will automatically find our test file and run the test.

<img src="/posts/images/jest-hello-world.gif" class="full-width" alt ="gif of running jest">


### Writing Tests

Jest provides Snapshot Tests, which are a quick way of writing tests to catch changes in the rendered output of a UI component (or any other serializable content).  [I've written about Snapshot testing before][snapshots], so I won't go into depth here.  But snapshot tests are significantly faster to write than traditional assertion based tests, and for the write type of code can provide greater or equal benefit.  This is one area where technically Jest may not save you time.  Instead it may take your team to a place where you're actually willing to write tests for your UI components for the first time.

There are also a great set of codemods for Jest. [jest-codemods](https://github.com/skovhus/jest-codemods) can help you take your existing suite of tests from Mocha, Ava, or tape and translate it over to Jest automatically.  Of course if you were using Jasmine previously, your tests can be migrated without changes. So Jest saves you time by not requiring you to rewrite any tests.


### Running Tests

Jest runs tests fast by default.  While I've seen from comments on my last Jest post and elsewhere that some people may have been able to optimize mocha or AVA to be fast enough that switching to Jest was a downgrade, for most people Jest is going to be faster than whatever they may have been using before.  This is true because of performance reasons (tests run in parallel, and mock out timers to avoid unnecessary waiting), but also because of UX decisions.  Jest is able to use git and node's modules system to detect what files have changed since the last commit, and which tests are affected by that.  Because of that, it is able to optionally run only the tests that might have changed on each run (`jest -o`).  Since it is usually able to run tests fast as a result (since it only runs a few at a time), Jest also is able to have an awesome watch mode (`jest --watch`).  In watch mode, tests rerun as files change, and there are options to target specific tests, run all tests, or fix snapshots as you go.


<img src="/posts/images/jest-watch.gif" class="full-width" alt ="gif of running jest --watch">


### Fixing Tests

Jest provides 4 main conveniences for fixing tests

1. Error messages have clear formatted diffs, making it easy to know the difference between what was received and expected
2. Error messages have a clear traceback to the line that failed, either the assertion in the test file, or the exception in the source file
3. Even though tests run in parallel, Jest makes sure that any console output from the test is placed in line with the test output, making it easy to debug with quick console messages
4. When running Jest multiple times, Jest runs the tests that failed in the previous run prior to other tests, leading to a faster feedback loop even when not using watch mode

<img src="/posts/images/jest-error.png" class="full-width" alt ="gif of running jest --watch">


### More Resources

- Another speakup at Wednesday's meetup has a Jest related blog post out this week.  Nate Hunzaker blogged about [using Jest with Nightmare.js for acceptance tests](https://www.viget.com/articles/acceptance-testing-react-apps-with-jest-and-nightmare)

- If you live in the Triangle area (thats Raleigh/Durham, North Carolina to the rest of the world) make sure to check out the [Triangle React meetup](http://www.meetup.com/trianglereact/).  The plan as I understand it is to do events once a month, alternating project nights and talks.  I believe [Tracy][tracy] is looking for more speakers too, so hit her up if you're interested.  This time 4 of us spoke for 15-20 minutes, so it isn't as much preparation as other events where you're the only speaker.


### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). If you're excited about Jest, you also might want to check out my [post on Jest Snapshots][snapshots].


[jest]: https://facebook.github.io/jest/
[christoph]: https://twitter.com/cpojer
[abramov]: https://twitter.com/abramov_dmitrii
[ecma]:http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/
[snapshots]: http://benmccormick.org/2016/09/19/testing-with-jest-snapshots-first-impressions/
[tracy]: https://twitter.com/ladyleet
[jasmine]: https://jasmine.github.io/
