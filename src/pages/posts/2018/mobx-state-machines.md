---
title: "MobX Patterns: State Machines & Flags"
date: "2018/05/14"
layout: "post"
path: "/2018/05/14/mobx-state-machines-and-flags/"
description: "Getting the best of state machine and flag patterns"
keywords: "mobx computed state machines"
category: "frameworks"
topics: ['JavaScript']
key: "mobx-state-machine-flags"
readNext: "mobx-first,ten-things-js,following-js-roadmap"
---

A few weeks ago, I was listening to the [React Podcast](https://changelog.com/reactpodcast), specifically their [episode on State Machines](https://changelog.com/reactpodcast/5) with [David Khourshid](https://twitter.com/davidkpiano).  About 20 minutes into the podcast, there was a discussion on the benefits of using enums over flags to model the state of objects that can change across multiple dimensions.  It reminded me of one of the nice patterns that [MobX](https://mobx.js.org/) makes possible, and I thought I'd share it here.

### Background

To set the stage here, the podcast discussion centered around modeling an async process like a promise. One possible way given was to use a mix of flags and if statements like this:

```javascript
// loading object
class ExampleLoader {
    constructor() {
      this.isLoading = false;
      this.hasError = false;
    }

    fetchData() {
      //fetch data from server and return it here
    }

    async load() {
      try {
        this.isLoading = true;
        let data = await this.fetchData();
        this.isLoading = false;
        this.hasError = false;
      } catch(e) {
        this.hasError = true;
        this.isLoading = false;
      }
    }
}

```

using one of these objects might look like this:

```javascript

if (loader.hasError) {
  // show error state
} else if (loader.isLoading) {
  // show loading state
} else {
  // show data State
}
```

In the podcast David Khourshid criticized this as a haphazard way to manage state, that doesn't show the whole picture.  Because we can't easily see how the various flags combine, it's tough to keep track of all possible states.  For instance, in the above example, did we really want to show the error state if we had an error, but have called `load()` again and both `hasError` and `isLoading` are now true?  Maybe that was the intention, but maybe that was just a state that was missed during the original construction of the program.  It's hard to tell.  

As an alternative to full blown state machine modeling, David advocated for an easy first step of swapping out flags for enums.  In that case the code above might look like:

```javascript
const STATES = {
  INITIAL: 'initial',
  LOADING: 'loading',
  ERROR: 'error',
  LOADED: 'loaded'
}
// loading object
class ExampleLoader {
    constructor() {
      this.state = STATES.INITIAL;
    }

    fetchData() {
      //fetch data from server and return it here
    }

    async load() {
      let {LOADING, ERROR, LOADED} = STATES;
      try {
        this.state = LOADING
        let data = await this.fetchData();
        this.state = LOADED;
      } catch(e) {
        this.state = ERROR;
      }
    }
}
```
with usage like this:

```javascript

switch(loader.state) {
  case STATES.ERROR:
  // show error state
  case STATES.LOADING:
  // show loading state
  case STATES.LOADED:
  // show data State
  case STATES.INITIAL:
  default:
  // show blank state
}
```

We can see just from using an enum, we've cleared some ambiguity: now it is clear that we should be showing a loading state when we're loading data, even if a previous load resulted in an error.  And we've also been forced to remember another state distinction that was missed originally, the difference between a successful load and the initial state before load is called.  This type of Enum-based approach is really helpful for modeling complex systems and especially async process state. But it's not perfect.  While ENUMs are great for listing out every possible state, sometimes we just need to know if an object is in a particular state.  For instance, we might have a special help-prompt component that should only show if our data is in an error state, but is otherwise divorced from the details of the data.  In that case `loader.hasError` is simpler and  cleaner than `loader.state === STATES.ERROR`.  It's a straight forward named expression that doesn't require importing a constant from another file or matching up to a string value.  Enums add some verbosity and ceremony to code that can otherwise be very simple.  Fortunately MobX allows us to have our cake and eat it too.

### MobX

MobX is a state management solution created by [Michael Weststrate](https://twitter.com/mweststrate).  It grew out of the React community but can be used with other frameworks or on it's own.  One of its nicest features are its intelligently updated [computed properties](https://mobx.js.org/refguide/computed-decorator.html).  With MobX we can write our loader object like this:

```javascript
import {extendObservable, computed, action } from 'mobx';
const STATES = {
  INITIAL: 'initial',
  LOADING: 'loading',
  ERROR: 'error',
  LOADED: 'loaded'
}
// loading object
class ExampleLoader {
    constructor() {
      let {INITIAL, LOADING, ERROR } = STATES;
      extendObservable(this, {
          state: INITIAL,
          isLoading: computed(() => this.state === LOADING),
          hasError: computed(() => this.state === ERROR),
          updateState: action(state => this.state = state),
      })
    }

    fetchData() {
      //fetch data from server and return it here
    }

    async load() {
      let {LOADING, ERROR, LOADED} = STATES;
      try {
        this.updateState(LOADING);
        let data = await this.fetchData();
        this.updateState(LOADED);
      } catch(e) {
        this.updateState(ERROR);
      }
    }
}
```

Now we have both our state enum, and we can check specific properties.  So both of the below examples work:

```javascript
// ENUM example
switch(loader.state) {
  case STATES.ERROR:
  // show error state
  case STATES.LOADING:
  // show loading state
  case STATES.LOADED:
  // show data State
  case STATES.INITIAL:
  default:
  // show blank state
}
```

```javascript
//Flags example
if (loader.hasError) {
  // show help component
}
```

And because MobX takes care of the details of efficiently updating our flags based on state, we know everything will stay in sync and remain performant, without a bunch of ugly code to make sure of that.
