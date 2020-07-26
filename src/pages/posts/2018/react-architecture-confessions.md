---
title: "React Architecture Confessions"
date: "2018/02/07"
layout: "post"
path: "/2018/02/07/react-confessions/"
description: "The mistakes I made while learning React and why I made them"
keywords: "react architecture mistakes confessions"
category: "fe-architecture"
topics: ['react', 'architecture', 'javascript']
key: "react-confessions"
readNext: "large-improvements-small-team,ten-things-js,ll-context"
---


I've been reading through [Clean Architecture](http://amzn.to/2mKoejo) by Robert "Uncle Bob" Martin this month[^1], and while it is great it has had the unpleasant effect of reminding me of all of the mistakes I've made over the past few years while learning and using [React](https://reactjs.org/).  I've absolutely loved using React at work, and it has made so many things easier.  But it's a very unopinionated tool when it comes to structuring applications, and I made a lot of mistakes as I was using it to build some small side projects, and then transitioned a major production app to React from Backbone/Marionette.  These mistakes are all architectural; how I broke out components, communicated between components, and managed data and dependencies within components.

I thought it would be useful to lay out the architecture mistakes I made as I was learning React, both as a solid reflection exercise for myself, and a warning to those of you who are just starting down the "component based UI" road.

### My Mistakes

#### 1. Including API calls directly in components

**What I did wrong**: This is an embarrassing one, but essentially in several places I had components directly fetching data from the server in their constructors or mount calls, and using that information to determine what to render.

**Why I did it**: This was to some extent a lack of planning.  I had all my core "business objects" modeled in some sort of separate object oriented way (either as Backbone or MobX objects) and was able to coordinate syncing them to the server outside of the component layer.  But some data in the system hadn't been modeled in that way, and when I encountered a need for those components (such as some types of system configurations) instead of stepping back and coming up with a design for modeling those configurations on the front end, I instead sometimes fell back to an ad-hoc API call.   This was also sometimes a result of lazily copying legacy code that had bad patterns while converting components to React, and other developers copying bad patterns when trying to figure out the new React code.

**What I should have done instead**: This could be a whole series of blog posts in itself, but essentially I should have been observing a few principles that would have set off alarm bells.

1. Components in a system of any size shouldn't know about the server. UI Components are about as "low level detail" as it gets in a UI architecture, and should be passed the data they need from a higher level portion of the system.
2. If the front end code needs data from the server, it is worth the time to properly model that data in terms of whatever data layer the front end is using.

#### 2. Breaking the "props as the component interface" abstraction

**What I did wrong**: One of the best things about React is the clear interfaces components provide with their list of props.  If properly documented with PropTypes or a type system like Flow or Typescript, it's easy to look at any React component and tell what data it expects to receive, and therefore how other code is expected to interact with it.  99% of the time, good React components act as a function of `(props, state) => UI`.  It is however, possible to get access to a component instance, and call functions on them.  There are  rare situations where this is the right way to do things, for instance [focusing an input](https://stackoverflow.com/questions/28889826/react-set-focus-on-input-after-render).

When I first started creating React components though, I overused that pattern, and accessed the interface directly to access or change its internal state.  I'd have components like this:

```javascript
class SpecialInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'abc'
    }
  }
  getValue() {
    return this.state.inputValue;
  }
  setValue(inputValue) {
    this.setState({inputValue});
  }
  render() {
    return <input
      className='fancy-input'
      defaultValue={this.state.inputValue}
      onChange={inputValue => this.setState({inputValue})}
    />;
  }
}
```

that I would access from parent container like this:

```javascript

class InputUser

  methodThatGotCalledOnSomeEvent() {
    doSomethingWith(this.input.getValue())
  }

  render() {
    return (<div>
      <SpecialInput ref={el => this.input = el}/>
    </div>);
  }
```

**Why I did it**:  Early on I was using this pattern in a way that copied other frameworks I was familiar with.  A parent component would need the state of it's child component, so it would maintain a reference to the child and query the child about the state.  When I converted Backbone components to React, sometimes I was basically just copy and pasting existing code, and making it work.

**What I should have done instead**:  React doesn't really encourage parents pulling state from their children.  Instead, if there is state that needs to be shared between components, it should be moved up to the parent component and then the state and an updater function should be passed down to the child component.  So my example above would look like this:

```javascript
class SpecialInput extends React.Component {
  render() {
    return <input
      className='fancy-input'
      defaultValue={this.props.value}
      onChange={event => this.props.updateValue(event.target.value)}
    />;
  }
}
```

that I would access from parent container like this:

```javascript

class InputUser extends React.Component {
  constructor(props) {
   super(props);
    this.state = {
      inputValue: 'abc'
    }
  }

  methodThatGotCalledOnSomeEvent() {
    doSomethingWith(this.state.inputValue)
  }

  render() {
    return <div>
        <SpecialInput
             value={this.state.inputValue}
             updateValue={inputValue => this.setState({inputValue})}
          />
    </div>

  }
}
```

#### 3. Interacting with 3rd party components directly

**What I did wrong**: My first year and a half using React, when I was using 3rd party UI components like [react-fixed-data-table](https://github.com/facebookarchive/fixed-data-table) I would always use them directly in my components, and take full advantage of their APIs.

**Why I did it**: Because every React library in the world has documentation showing how to use its components directly in code for a variety of different use cases, and nobody ever tells you to put an abstraction around their code

**What I should have done instead**: I should have wrapped the 3rd party libraries in one or more wrapper components.  This has a few advantages:

1. When we're using a UI component like a table in a new place in our App, if I've created a wrapper component that has presets for most common settings, I only need to configure the things that are meaningful to this new use case in my app
2. Targeted wrapper components like a `SortableTable` component or a `DropdownWithAutoComplete` component are easy to understand to a new reader of the code.  Instead of digging through configuration props, they can read the component name and understand the purpose of that component then focus on the data being passed to it
3. When making updates to a library it is much easier to test that the changes are safe if the uses of the library are limited to a few focused components, rather than being spread across a whole application
4. Similarly, if we need to switch to a new library, that is much easier with a limited footprint
5. It can be easier to create reliable automatic tests using a wrapper component, since you have more control of things like how mocking works and when the component interface changes than you do for 3rd party code

#### 4. Importing other parts of the system directly into display components

**What I did wrong**: The main application I work on uses a messaging system to allow communication between different parts of the system.  It's a legacy piece from when it existed as a Backbone application, and isn't a very React-y way of doing things, but that isn't really a problem.  This situation would be the same for a logging component or a data store.  What isn't great is that when I need to use the messaging system, I always import it directly into the component file.

**Why I did it**: Direct imports are convenient, the messaging system is a core part of my system, and it seemed like a normal way of accessing it.  I also wasn't aware of any better way to do it.

**What I should have done instead**:  The disadvantage of direct imports is that they're harder to test.  If I had passed my messaging system as a prop to whatever component needed it, it would be much easier to test that it was called in the way I expected, without having to mock out the whole messaging system library.  I also could abstract away the whole power of the messaging system, and only provide the specific functionality needed by a component.  When I first began working on this system though, I didn't know a practical way to do this.  The messenger system was often used by deeply nested components, and it seemed bad to pass it down a whole component tree.

The answer is to use the [Provider pattern](https://www.robinwieruch.de/react-provider-pattern-context/).  The provider pattern is a way to use React's context API to provide top level properties from a high level parent component to deeply nested child components.  It is a perfect pattern for providing important high level pieces of your application to low level components without tightly coupling them, while maintaining testability.[^2]

#### 5. Changing too many things at once

**What I did wrong**: When my team began converting our application from Backbone to React, it was tempting to try and change many things at once.  All the React examples you see online are using Babel/ES6, Webpack, Redux, React Router and tons of other shiny but complicated things.  Trying to implement it all in an existing project[^3] can be overwhelming and lead to [lava layers](http://mikehadlow.blogspot.com/2014/12/the-lava-layer-anti-pattern.html).  We actually started out with good discipline and converted files to use ES6 first, then added Webpack, then slowly started to convert UI components to React.  Unfortunately as we continued to convert React, we began replacing our Backbone data models with MobX, and began using CSS Modules in some places.  When our team size was reduced last year, we were left in a situation where the same functions were performed in different ways throughout the codebase.

**Why I did it**: It's easy to see things that could be better in a web application and immediately want to fix them!  Especially if parts of that change seem easier than other changes you're working on

**What I should have done instead**: I wrote about this [at length](https://benmccormick.org/2018/01/07/large-improvements-small-team/) last month, but there really is no substitute for taking things one at a time.  While it's tempting to think that it will be easier to convert to React if you're using other "react-y" tools and libraries, your code will ultimately be more maintainable if it is consistent throughout an application.  The only reliable way to do that is to make changes completely before you start making other changes.  It isn't sexy, and it will leave you at least a little ways off the bleeding edge, but it's the way to build large, reliable systems and keep them up to date.


[^1]: At the time of writing this, it was super on sale on <a href="http://amzn.to/2mKoejo">Amazon</a>
[^2]: Note that the Context API that the provider pattern is based on is changing, so I'd isolating out any provider code you write into a reusable component so that it is easy to update later
[^3]: Or even a new project for that matter!
