---
title: "MobX: First Impressions"
date: "2017-01-09 13:30:00+00:00"
layout: "post"
path: "/2017/01/09/mobx-first-impressions/"
description: "First impression of managing data with MobX"
keywords: "mobx JavaScript data React"
category: "frameworks"
---

I spent some time around the holidays this year playing with [MobX][mobx], a state management library for JavaScript.  MobX is an unopinionated library that provides a layer over normal JavaScript data structures that allow other code to efficiently observe data changes and update based on what has changed.  It's an interesting tool for handling state in web applications, especially in existing projects that might need to update state handling iteratively.  Here are some first impressions.

### What is MobX?

MobX has 3 core concepts developers need to understand:

1. **Observable state** - MobX provides functions to make data *observable*.  Observable data can be watched by other pieces of code which may efficiently update when the state changes.  Observable data is primarily created in MobX using the `observable` function.
2. **Derivations** - Functions that *watch* observable data are called derivations.  MobX has 2 primary types of derivations: *computed values* and *reactions*.  Computed values update a value based on other data, while reactions produce side effects: updates to a UI, a network call, or a logging statement for example. MobX provides a `computed` function for defining computed values; in most cases reactions will likely be mostly defined using a framework specific helper library like [mobx-react](https://github.com/mobxjs/mobx-react) or [ng2-mobx](https://github.com/500tech/ng2-mobx).  MobX does provide some lower level libraries for reactions though, including `autorun` and `when`.
3. **Actions** - Code that updates observable state is known as an action.  MobX has a formalized version of actions which can be defined using the `action` function, but it is also possible to modify state directly using any normal JavaScript code and maintain observable behavior.

In practice this looks something like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

let digits = observable([1, 2]);

const DigitPrinter = observer(({digits}) => {
  return (<div>
    {digits.join(', ')}
  </div>);
});

ReactDOM.render( <DigitPrinter digits = {digits} />, document.getElementById('root'));

/* prints 1, 2 */


digits.push(3);

/* DOM re-renders to print 1, 2, 3 */

digits[2] = 4;

/* DOM re-renders to print 1, 2, 4 */

```

The component is able to passively *observe* changes in the data, and re-render when it changes.  But MobX is actually even smarter than this example shows.  Let's look at another example, this time using a more complex data structure (a class).

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {extendObservable} from 'mobx';
import {observer} from 'mobx-react';
import moment from 'moment';

class Appointment {

  constructor() {
    extendObservable(this, {
      dueDate: '01-01-2017',
      title: 'Dinner with Joe'
      location: 'Chik-Fil-A',
      isToday: computed(function() {
        return moment(dueDate, 'MM-DD-YYYY').diff(moment.now(), 'days') === 0;
      }),
    });
  }

  toString() {
    return `${this.title} @ ${this.location}`;
  }
}


const TodayBox = observer(class TodayBox extends React.Component {
  render () {
    let {appointments} = this.props;
    return (<div>
      {appointments.filter(a => a.isToday).map(a => <span>a.toString()</span>)}     
    </div>);
  }
});

let appointment = new Appointment();

ReactDOM.render( <TodayBox appointments = {[appointment]} />, document.getElementById('root'));

/* prints an empty div */

appointment.title = 'Dinner with Bob';

/* Nothing relevant has changed. The component does not re-render */

appointment.dueDate = '01-09-2017';  

/*  assume that 01-09-2017 is "today" */
```

MobX has the "magical" ability to determine what changes actually affect the observer and not make unnecessary calls of reaction functions.  In practice, that magic allows you to write less, more efficient code for updating your UI based on data.

### How Does MobX work?

I have a learned skepticism of magical solutions like this.  Generally I find that time-saving magic like this ends up costing time when it comes to maintenance, and explicit relationships between code saves time over less-boilerplate heavy code. Fortunately, while the libraries code itself is fairly complex, it isn't too hard to understand the logic behind how MobX works.  

On the Observer side, MobX uses [ES5][es] setters and getters to proxy updates to observable data structure and listen in when data is updated.  This allows the type of event listening that [Backbone](http://backbonejs.org/) and other libraries provide, without requiring the user to go through special `set` or `get` methods to update an object's properties.  Most of the time you should be able to just be able to write code as you normally would, and MobX will make it work.  There are some exceptions though that mean its important to actually understand how the library work.  Getters and Setters only work when looking up an existing property on an object, so when using primitive values or adding new values to an existing object, some special syntax (the return of `get` and `set` methods) may be required.  In Mobx primitive observables are referred to as *boxed* values, and objects that require new values over time can be handled by using observable Maps, which use the API of [ES6][es] Maps. 

On the derivative side, reactions and computed values are always defined as functions.  MobX wraps these functions and is able to determine (through the method described above) what properties were accessed during each function run.  It then only listens for changes to these properties.  Thus it doesn't matter if you theoretically could access thousands of observable properties in a function, if you wrap those references in an if statement to a single property, and that property returns false on first run, the derivative function will only listen for changes on that property before running again. When an observable is updated, all derivative code is run synchronously and atomically so there is no concern of getting into bad intermediate states.

Most of the "magic" is covered by the 2 paragraphs above, and once you understand the ideas behind them (see the resources at the bottom of this post for more in-depth explanations), it is fairly easy to understand the reasoning behind the cases where the magic fails.


### Decorators

Developers who actually use MobX are probably questioning my examples by now, because I've been using a different syntax than the primary MobX documentation for showing my examples.  So let's talk about decorators.  The preferred way (according to the documentation) to write MobX code is to use decorators to define observers and observables.  Decorators are a [proposed new JavaScript feature](http://tc39.github.io/proposal-decorators/) for declaratively adding extra behavior to classes, class properties and class methods.  Using them with MobX, my above example would look like this [^1]:

```javascript

class Appointment {

  @observable dueDate = '01-01-2017'
  @observable title = 'Dinner with Joe'
  @observable location = 'Chik-Fil-A'

  @computed get isToday() {
    return moment(dueDate, 'MM-DD-YYYY').diff(moment.now(), 'days') === 0;
  }

  toString() {
    return `${this.title} @ ${this.location}`;
  }
}


@observer class TodayBox extends React.Component {
  render () {
    let {appointments} = this.props;
    return (<div>
      {appointments.filter(a => a.isToday).map(a => <span>a.toString()</span>)}     
    </div>);
  }
}
```

That obviously looks a lot cleaner than my example.  So what's the problem?  Again, decorators are a *proposed* JavaScript feature.  Currently they're in Stage 2, which means roughly that they are very likely to eventually make it into the language, but may change in non-trivial ways before that happens.  Currently decorators are implemented in [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html), as well as a [3rd party babel plugin](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy), but as of January 2017 [are not implemented in any browser engines](http://kangax.github.io/compat-table/esnext/#test-class_decorators), and are not implemented in any first party babel plugins [due to spec instability](https://github.com/babel/babel/issues/2645).  Decorators are a key part of Angular2, and are used by other frameworks including [Aurelia](http://aurelia.io/) and [Ember](https://github.com/rwjblue/ember-computed-decorators), so I don't think they're going away.  But I also don't see them as ready for production use for teams that don't have the capacity to dedicate the time to update existing code if/when the spec changes[^2].  If for one reason or other you're comfortable with the risks however, decorators are a great way to clean up the MobX API, and I'm excited for the spec to get to the point where I can use them.

### Comparison to Redux and setState

As a state management library that was built to be used with React, the obvious questions to ask about MobX are how it improves over React's built in state handling, and how it compares to [Redux](http://redux.js.org/), the current most popular state management solution for React. MobX takes a different approach to each.

It's important to say at the start that MobX isn't mutually exclusive with using setState.  It's possible to use them together, with MobX managing application data and setState handling individual component/UI state.  But there is some advantages to using MobX for UI state as well.  The biggest reason is that MobX is smarter than setState about when re-rendering is required.  By default React Components re-render on any call to setState, regardless of whether the state change actually affects what is rendered or not. MobX's creator [wrote more about this on Medium](https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#.x0o6y4rxv).

Comparing MobX and Redux could be a whole article on its own, so I'm not going to go too deep here, but suffice it to say that MobX is more flexible than Redux, but as a result loses some of the benefits of Redux's structured approach.  Specifically, it is easy to convert a single object to become a MobX observable and use it in an existing React component.  It can be easily inlined in an existing file and used for one component even.  You also don't have to deal with the ceremony of using [immutable data](http://benmccormick.org/2016/06/04/what-are-mutable-and-immutable-data-structures-2/).  Redux is intended as a solution that will take over all your state, and doesn't scale down nearly as well or mix with other solutions [^3].  However, Redux's structure also has benefits.  It allows easy testings of each component of an app individually, the creation of powerful tooling that will work with any Redux app, and reliable guarantees of how state will be updated.  These things are mostly possible with MobX [^4], but require more developer discipline, and/or can't be written as easily as universal tools. Overgeneralizing, I would prefer Redux in a new application, but would look to MobX for improving data management in an existing application.  MobX also has advantages in applications where you're displaying a large amount of UI elements based on a relatively small amount of data, or have a lot of derived data (something like a spreadsheet), whereas Redux has benefits for applications that need to be extremely reliable and well tested.  


### Stray Thoughts

- If you do want more discipline in MobX, make sure to use `useStrict` to require updates to use Actions
- MobX has a nice set of [devtools](https://github.com/mobxjs/mobx-react-devtools) that are useful if you're opting in to using actions, and using React with MobX.
- If this isn't clear yet, I definitely recommend hacking around with Mobx's low level APIs to learn more about how it works before integrating it straight into a framework
- ~Also note that MobX 3.0 is imminent, there is a release candidate that you can play with now.~ **Update:** That didn't take long.  [MobX 3.0 is out](https://medium.com/@mweststrate/mobx-3-released-unpeeling-the-onion-ca877382f443#.mk6mdypt2).

### More Resources

- The two most helpful resources I found for conceptually understanding MobX were in-depth articles by the library's author [Michael Westrate](): [Becoming fully reactive: an in-depth explanation of MobX](https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.jd4hgh2zi) on Medium and [Concepts & Principles](https://mobx.js.org/intro/concepts.html) from the MobX documentation

- This [tweet thread](https://twitter.com/AdamRackis/status/775706291259908096) and the linked article, are a good breakdown of the tradeoffs between MobX and Redux



### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my [post on Orthogonality and CSS in JS](http://benmccormick.org/2017/01/03/orthogonality-and-css-in-js/).



[^1]: Technically this also uses class properties as well, another proposal that works well with decorators
[^2]: It's possible any spec changes will be trivially fixable with a code mod script, but right now there is more uncertainty than I am personally comfortable with.  I'm grateful to people who are willing to take more risks here than me, they push the language forward.
[^3]: I'm talking here about what is encouraged and easy, not what is possible.  It is of course possible to mix in Redux with other solutions.
[^4]: MobX has some nice [devtools!](https://github.com/mobxjs/mobx-react-devtools)


[mobx]: https://mobx.js.org/
[es]: http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/
