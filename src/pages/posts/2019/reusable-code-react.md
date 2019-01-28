---
title: "Reusable Code In React: Inheritance, Decorators, Composition and Mixins"
date: "2019/01/28"
layout: "post"
path: "/2019/01/28/reusable-react"
description: "How React uses multiple code sharing patterns to create a great developer experience"
keywords: "react inheritance composition mixins"
category: "fe-architecture"
topics: ['Architecture', 'React']
key: "reusable-react"
isDraft: true
readNext: "react-confessions,fe-concerns,valuable-code-reviews"
---

Once you get past the initial complexity it creates by bucking conventions, React is the most developer friendly UI library I have ever used.  A big reason for that is the way it uses and encourages a variety of patterns to share codes and concepts across a code base. Let's look at how 4 traditional code re-use patterns are used by React and in the React ecosystem.

#### Inheritance

Inheritance is a code-reuse technique associated with object oriented programming.  If you're like me and learned to program in school using Java, it probably is one of the very first Computer Science concepts you learned.  For self-taught JavaScript devs it may be much less familiar.  Inheritance is a pattern for extending an existing class or object with additional methods or data, possibly overriding the implementations of other methods in the process.  A classic example of inheritance looks like this in JS:

```javascript

class Automobile {
    constructor() {
        this.vehicleName = automobile;
        this.numWheels = null;
    }
    printNumWheels() {
        console.log(`This ${this.vehicleName} has ${this.numWheels} wheels`);
    }
}

class Car extends Automobile {
    constructor() {
        super(this);
        this.vehicleName = 'car';
        this.numWheels = 4;
    }
}

class Bicycle extends Automobile {
    constructor() {
        super(this);
        this.vehicleName = 'bike';
        this.numWheels = 2;
    }
}

const car = new Car();
const bike = new Bicycle();
car.printNumWheels() // This car has 4 wheels
bike.printNumWheels() // This bike has 2 wheels
```

Inheritance is useful for highly structured objects where you have a lot of shared behavior across similar but slightly different objects where you want to be able to treat all of the objects as interchangeable from an API perspective. Especially when that interchangeable API is well defined and unlikely to change too much.  However it tends to lead to brittle structures when nested across multiple levels, and is a poor fit when dealing with dissimilar objects that need to share a few behaviors.

React Components are objects that we want to treat as interchangeable from an outside API perspective, and they have well defined points where behavior may need to be different between components but don't always need to differ: the lifecycle methods like render, componentDidMount, componentWillUnmount, etc.  Thus React relies on a single level of inheritance as the foundation of its class components.  Class components inherit from React.Component, and only implement the life cycle methods that they're interested in.  But all of them inherit useable setState and forceUpdate functions, and React can verify that by checking the `isReactComponent` property on the object.

```javascript
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }
    render() {
        return <button onClick={() => {
            this.setState(state => {   // This method is "inherited"
                state.count = state.count + 1
            })
        }}>{count}</button>
    }
}


#### Composition

- How React users reuse standardized UI pieces (also Redux's way of forming data stores)

#### Decorators

- One way that React users reuse standardized patterns across different types of components

#### Mixins

- Mixins (hooks!) provide a new way of sharing lifecycle behavior across components, and also provide new ways to reuse standardized data patterns
