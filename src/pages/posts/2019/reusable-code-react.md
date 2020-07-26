---
title: "Reusable Code In React: Inheritance, Composition, Decorators and Mixins"
date: "2019/02/11"
layout: "post"
path: "/2019/02/11/reusable-react"
description: "How React uses multiple code sharing patterns to create a great developer experience"
keywords: "react inheritance composition mixins"
category: "fe-architecture"
topics: ["architecture", "react"]
key: "reusable-react"
readNext: "react-confessions,fe-concerns,valuable-code-reviews"
---

Once you get past the initial complexity it creates by bucking conventions, React is the most developer friendly UI library I have ever used.  A big reason for that is the way it uses and encourages a variety of patterns to share codes and concepts across a code base. Let's look at how 4 traditional code re-use patterns are used by React and in the React ecosystem, using a simple counter example to explore why each pattern is used.

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

Inheritance is useful for highly structured objects where you have a lot of shared behavior across similar but slightly different objects and you want to be able to treat all of the objects as interchangeable from an API perspective. This is especially valuable when that interchangeable API is well defined and unlikely to change too much.  However it tends to lead to brittle structures when nested across multiple levels, and is a poor fit when dealing with dissimilar objects that need to share a few behaviors.

React Components are objects that we want to treat as interchangeable from an outside API perspective, and they have well defined points where behavior may need to be different between components but don't always need to differ: the lifecycle methods like render, componentDidMount, componentWillUnmount, etc.  Thus React relies on a single level of inheritance as the foundation of its class components.  Class components inherit from React.Component, and only implement the life cycle methods that they're interested in.  But all of them inherit useable setState and forceUpdate functions, and React can verify that by checking the `isReactComponent` property on the object.


Here is a basic counter component.  Notice how we don't have to define `setState` on our `Counter` class.  Instead it inherits it from React.Component.

```javascript
//counter.js
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }
    render() {
        let {count} = this.state;
        let increment = () => this.setState(state => {
            return {
               count: state.count + 1
            };
        });
        return <div className="fancy-layout">
            <div className="fancy-display">
                Current Count: {count}
            </div>
            <button
                className="incrementCounterBtn fancy-btn"
                onClick={increment}
            >Increment</button>
        </div>
    }
}
```

Outside of this single layer of inheritance for defining Class components, inheritance isn't used much in React development.  It turns out that better patterns have emerged for sharing application code.

**Inheritance Pattern**: Used sparingly to share common code across React class components.

#### Composition

Composition is a code reuse technique where a larger object is created by combining multiple smaller objects.  Composition is in some ways the natural pattern of the browser, as HTML uses it.  We build a table in html, not by adding a bunch of configuration to a single table object, but by combining a `table` tag with `tr`s, `td`s, and `th`s like this:

```html
<table>
    <thead>
        <tr><th>Web Framework</th><th>Language</th></tr>
    </thead>
    <tbody>
        <tr><th>Rails</th><th>Ruby</th></tr>
        <tr><th>Django</th><th>Python</th></tr>
        <tr><th>Flask</th><th>Python</th></tr>
        <tr><th>Play</th><th>Scala</th></tr>
        <tr><th>Play</th><th>Java</th></tr>
        <tr><th>Express</th><th>JavaScript</th></tr>
    </tbody>
</table>
```

React has fully embraced the HTML style of composing UI components, and it takes thing to the next level by allowing components to be stateful and pass values down into children.  For instance, if we wanted to split the counter component above into a separate control and display, perhaps using a standard set of UI components we could do it by extracting `FancyLayout`, `FancyButton` and `FancyDisplay` elements out into their own components and then composing them back into a single counter component.  This type of thing is useful for creating and reusing standard UI elements, and might look something like the following:


```javascript
// UI components defined elsewhere
const FancyLayout = ({children}) => <div className="fancy-layout">{children}</div>;
const FancyDisplay = ({children}) => <div className="fancy-display">{children}</div>;
const FancyButton = ({children, className, onClick}) => <button
    className={`fancy-layout ${className}`}
    onClick={onClick}
    >
        {children}
    </button>;


// counter.js
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }
    render() {
        let {count} = this.state;
         let increment = () => this.setState(state => {
            return {
               count: state.count + 1
            };
        });
        return <FancyLayout>
            <FancyDisplay>
                Current Count: {count}
            </FancyDisplay>
            <FancyButton
                className="incrementCounterBtn"
                onClick={increment}
            >Increment</FancyButton>
        </FancyLayout>;
    }
}
```

In this example we now have 4 components instead of one.  Three of them are laser-focused on defining a specific element type, and are "display only" with no logic of their own.  The 4th contains all of our logic and defines how the display pieces come together.

In the seminal 1994 book [Design Patterns](https://amzn.to/2WDhncv) the authors argue that composition should be strictly preferred over inheritance where possible because it creates less tightly coupled objects, and encourages designs where objects are small, focused and readable.  Composition also lets us hide complexity inside of child objects, because parent components only have to concern themselves with the APIs exposed by those child objects.  One of the keys to React's success has been making this type of composition clean and painless by encouraging strong component interfaces and utilizing JSX to provide a comfortable syntax for describing composed UIs while keeping all component concerns in the same place[^1].

It is worth noting that after this refactor, our counting logic is still tightly tied to the layout of our counter component.  Let's explore 2 more patterns that can help us extract our logic from the display completely.

**Composition Pattern**: The core pattern for separating concerns while creating complex UIs with React.


#### Decorators

Decorators are a pattern for editing an instance of a class to give it additional behaviors than it had previously.  In contrast to inheritance, decorators are not part of the class definition, but are modifications to the class at run time to allow a subset of objects to have additional data or behavior [^2].  In classic object oriented programming, this was implemented by having a decorator class that shared an interface with the class to be decorated, and called its methods through to that class, with additional behavior before or after the pass-through.  The React community has generally implemented this pattern slightly differently, by writing functions that take a component class and return a new component class that calls through to the original component, possibly with additional props passed in, extra components rendered around it, or conditional logic that causes it not to render in some cases.  The React community generally refers to this pattern as [Higher Order Components](https://reactjs.org/docs/higher-order-components.html).

Here's an example of using a higher order component called `withCounter` to separate out the display and logic portions of our Counter component.

```javascript
const withCounter = WrappedComponent => {
   class ComponentWithCounter extends React.Component {
      constructor(props) {
         super(props);
         this.state = {
            count: 0
         };
         this.increment = () => this.setState(state => {
            return {
               count: state.count + 1
            };
         });
      }

      render() {
         let {count} = this.state;
         return <WrappedComponent count={count} increment={this.increment} />
      }
  }
  return ComponentWithCounter;
};

// counter.js

// this is a display only version of the component with no logic
// very easy to test and simple to change
class CounterDisplay extends React.Component {
    render() {
        let {count, increment} = this.props;
        return <FancyLayout>
            <FancyDisplay>
                Current Count: {count}
            </FancyDisplay>
            <FancyButton
                className="incrementCounterBtn"
                onClick={increment}
            >Increment</FancyButton>
        </FancyLayout>;
    }
}

// this adds the logic back to the display only version
const Counter = withCounter(CounterDisplay);
```

Now we've taken our refactored `Counter` and split it into 2 more pieces.  The display logic remains in a simplified `CounterDisplay` component that doesn't have any state or business logic of its own.  `CounterDisplay` takes 2 new props, `count` and `increment` that allow it to implement the counting logic without having to know how it is implemented.

Meanwhile, we split the counting logic out into a Higher Order Component.  `withCounter` takes a React component and wraps it with another component that is solely responsible for keeping track of counts and providing the increment function.  In this case that is our CounterDisplay component, but if we decided we wanted to also have fancy counters that incremented when the user clicked a checkbox or hovered over a box or typed the word increment, it would be easy to reuse this logic.

Higher Order Components helped many React libraries like Redux and React Router define elegant APIs when they first came on the scene, but they've always been a power user technique.  There are many ways to screw them up, and although they allow for theoretical loose coupling, they still require a certain level of shared understanding between the decorator and decoratee, including knowing what props to make available, whether any methods have to be proxied through to the decorated component, and more.  The community as a whole has tended to favor render props over the past year[^3], and now looks poised to move towards our 4th pattern: mixins.

**Decorator Pattern**: Used to provide a nice interface for separating out logic shared by multiple components and centralizing it.


#### Mixins

The newest pattern that React has added to its bag of code reuse tricks is also one of the oldest.  In older versions of React there was a feature called "mixins" that was [later deprecated due to its ease of mis-use](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html).  "Mixins" are gone now, but the "Mixin pattern" is back!  React is in the process of introducing [hooks](https://reactjs.org/docs/hooks-intro.html), a new way of doing mixins.

So first, what is a mixin?  It is yet another way of defining shared behavior onto a class, in this case providing methods and/or data that are "mixed in" to one or more classes.  It differs from inheritance because a class using a mixin doesn't have to use the mixin as a parent class, and the class may use several mixins at once.  Mixins that are used together in one class may not be used together in another.  Mixins also different from the decorator pattern, because the mixin is part of the class definition, not something that is applied dynamically later.

Mixins are useful when you have classes with different purposes that shouldn't share an inheritance tree but do have some shared behavior.  In practice though they have historically been tricky to use because it is easy to tightly bind mixin code to the implementation of the code that it is mixed into.  Poorly implemented Mixins can result in naming collisions, inflexible code, and hard to trace errors.

React Hooks may not look like mixins, since they are used in a function, not a class.  But they fill the exact same role as traditional mixins, while avoiding some of the footguns (no naming collisions!).  Let's look at an example from Dan Abramov's blog post [introducing hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889).

```javascript
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return width;
}
```

This is a hook that provides the width of the current window to a React component, updating each time the window is resized.  You would use it in practice like this example of a header bar that replaces its menu items with a hamburger menu on smaller screens:

```javascript

const Header = () => {
    let windowWidth = useWindowWidth();
    let showHamburgerMenu = windowWidth < 800;

    return (<div>
        <Logo>
        {showHamburgerMenu ? <HamburgerMenu/> : <MenuItems/>}
    </div>)
}
```

This usage is different from a normal helper function, because it enhances the component; because this is using React's state code within the hook, this component will automatically update when needed.  So it is a way of reusing component behavior like Higher Order Components.  But we lose a lot of the disadvantages of HOCs.   `useWindowWidth` and `Header` are extremely loosely coupled.  `useWindowWidth` doesn't know anything about the header bar structure or logic, or the rules for when things should show.  It is only providing information.  At the same time, if we refactored it to get the window size in some other way, or to throttle updates, we wouldn't have to change anything about `Header`, since all it knows is that `useWindowWidth` will occasionally provide it an updated windowWidth.

The functional style makes this look different than a traditional object oriented "mixin pattern" example, but it is using the same concepts and solving the same problems.  This way of doing things has advantages; because it is "just a function" that gets called, we never need to worry about it having a naming collision with a different class method, or having to be aware of the structure of the outer component.  If it needs component specific information, we can just pass it an argument.

With Hooks, we can create a much cleaner version of our Higher Order Component example from the decorators section.

```javascript
// defined in a library file
const useIncrement = (initial = 0) => {
   const [count, increment] = useReducer(val => val + 1, initial);
   return [count, increment];
}

// counter.js
const Counter = () => {
    let [count, increment] = useIncrement();
    return <FancyLayout>
        <FancyDisplay>
            Current Count: {count}
        </FancyDisplay>
        <FancyButton
            className="incrementCounterBtn"
            onClick={increment}
        >Increment</FancyButton>
    </FancyLayout>
}
```

As with decorators we've extracted the logic in a reusable form, but we've done so with much less boilerplate.  I've removed the intermediate `CounterDisplay` here, because if we're not using it for anything else, it is easy enough to just include the hook directly in the definition.  But if we wanted, we could easily use that `CounterDisplay` component with a hooks enabled wrapper component:

```javascript
const Counter = () => {
    let [count, increment] = useIncrement();
    return <CounterDisplay count={count} increment={increment}/>;
}
```

**Mixin Pattern**: Hooks use a variation on the Mixin pattern to allow sharing related behavior and data between unrelated function components easily.

### Summary

If I took one thing out of this analysis personally, it was a renewed appreciation for considering the needs of a situation and finding the right approach for the job, rather than trying to fit every problem to my favorite solution.  I'm over 2000 words and I haven't even addressed all the different strategies React and the React community use for code re-use. *Sorry render props* 😢.   So next time you run into an architecture problem, consider a few different solutions and their tradeoffs.


**TL;DR**

React uses a variety of patterns for code reuse.
**Inheritance Pattern**: Used sparingly to share common code across React class components.
**Composition Pattern**: The core pattern for separating concerns while creating complex UIs with React.
**Decorator Pattern**: Used to provide a nice interface for separating out logic shared by multiple components and centralizing it.
**Mixin Pattern**: Hooks use a variation on the Mixin pattern to allow sharing related behavior and data between unrelated function components easily.

[^1]: Clunky JS based interfaces for specifying child components are visually difficult to scan and understand, while solutions that use external template files spread logic about a single component to multiple files, making it harder to keep everything in the developers head.
[^2]: Note that the decorator pattern is not the same thing as the TC39 proposal to [add a decorator syntax to JavaScript](https://github.com/tc39/proposal-decorators), or the TypeScript feature of the same name.  Both are related to modifying class behavior, but the mechanisms are not the same.
[^3]: Render props ultimately qualify as an advanced composition technique and so didn't get their own heading here, but they're definitely worth understanding.
