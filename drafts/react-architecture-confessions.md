---
title: "React Architecture Confessions"
date: "2018/01/18"
layout: "post"
path: "/2018/01/18/react-confessions/"
description: "The mistakes I made while learning React and why I made them"
keywords: "react architecture mistakes confessions"
category: "software-productivity"
key: "react-confessions"
readNext: "large-improvements-small-team,ten-things-js,ll-context"
---


I've been reading through [Clean Architecture](http://amzn.to/2mKoejo) by Robert "Uncle Bob" Martin this month[^1], and it's reminded me of all of the mistakes I've made over the past few years while learning and using [React](https://reactjs.org/).  I've absolutely loved using React at work, and it has made so many things easier.  But it's a very unopinionated tool when it comes to structuring applications, and I made a lot of mistakes as I was using it to build some small side projects, and then transitioned a major production app to React from Backbone/Marionette.  These mistakes are all architectural; how I broke out components, communicated between components, and managed data and dependencies within components.

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


3. **Separate out UI library components from layout and feature components** - This rule is all about the Single Responsibility Principle.  When I build React components, I'm often interested in reusability, but it can be hard to tell whether a component actually needs to be reusable or not.  Thinking in terms of responsibilities can help.  In my current case, I'm a one man team working on a large app, but I can still think in terms of the business owners for a piece of code, and project out how things would be divided for a larger team.  In my case, that leads me to a mix of feature level modules (which may be made up of several React component classes), layout level components that glue the feature and UI level classes together with data, and UI library level components that provide low-level building blocks like buttons, modals and forms.

These modules can follow a hierarchy, where layout and feature level components can use UI library level components, but UI library level components don't depend on any feature level code, and thus can be maintained as a separate dependency.  

4. **Make targeted use case components** - This suggestion comes directly from the Interface Segregation Principle.  Because we don't want to depend on things we don't use, there can be some good value in creating lightly configurable components rather than directly using a single component with many configuration props.  For instance, in the (contrived) example below, we might consider using the `ActionButton` component below, rather than configuring it at every point.

Let's say we have a `<Button>` component that takes the following props: onClick, backgroundColor, showBorder, disabled, size.  We can use it directly like this:

```javascript
<Button
  onClick={action}
  backgroundColor={'#57A3E8'}
  showBorder={false}
  disabled={buttonIsDisabled}
  size={'large'}
> Do the Thing </Button>
```

However if we know that we're going to be using those settings in many places to create a semantically meaningful `<Button>`, we may want to create an `<ActionButton>` that only takes the
onClick and disabled properties, and keeps the styling properties constant.

```javascript
export const ActionButton = ({onClick, disabled, children}) => <Button
    backgroundColor={'#57A3E8'}
    showBorder={false}
    size={'large'}
    onClick={onClick}
    disabled={disabled}
  > {children} </Button>
```

which we can then use like this:

```javascript
<ActionButton onClick={action} disabled={buttonIsDisabled}>
Do the Thing
</ActionButton>
```

This has the benefit of semantic reusability and reducing copying, but more importantly
from a SOLID perspective, it means that the places we use `<ActionButton>` are insulated from
underlying changes in `<Button>`.  If we add new required props to `<Button>` we only need
to update `<ActionButton>`, and not the call spots.  More interestingly, if we significantly change the Button Component (this is where my simple example fails to scale), and maybe split the functionality out into multiple components, we only need to change ActionButton to point to the correct new component, or give it its own custom implementation, if its requirements diverge too far from the `<Button>` class.


5. **Pass dependencies as props where possible, don't import them directly** - This is the rule that I most wish somebody had taught me 2 years ago.  It can be very tempting to import dependencies directly into components for things like logging tools, data stores, messaging services, and other system components and utilities.  But doing so causes the components to be tied very tightly to that other code.  This has some practical disadvantages in the short term, for one thing it makes the code harder to test.  But it also has more subtle maintainability problems.  Essentially it violates the Open-Closed principle, because making changes to code is more likely to involve modifying the existing component, and less likely to be solvable with purely new code.


[^1]: At the time of writing this, it was super on sale on <a href="http://amzn.to/2mKoejo">Amazon</a>
[^2]: This is often phrased as "A module should only have one reason to change", but I thought Martin's phrasing in Clean Architecture was clear and helpful.
[^3]: Kent Dobbs' <a href="https://egghead.io/courses/advanced-react-component-patterns">Advanced React Component Patterns</a> course on egghead is a good place to learn more about the various patterns you can use to avoid this type of interface-breaking.
