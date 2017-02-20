---
title: "What are Higher Order Components?"
date: "2016-12-14 14:30:00+00:00"
layout: "post"
path: "/2016/12/14/what-are-higher-order-components"
description: "An explanation of React's higher order components"
keywords: "react components higher order"
category: "frameworks"
key: 'what-are-hocs'
readNext: ['react-component-styles', 'callbacks-to-promises', 'mobx-first']
---

If you spend much time at all reading through articles and documentation around React, you're likely to run into the term "Higher Order component", often abbreviated HoC.  Since it is often used without context in React discussions, and is not a particularly intuitive term for many (most?) developers, I thought it was worth publishing a quick and simple explanation of what Higher Order Components are.

Higher Order Components are functions that take a React Component, and return a React Component.  The "higher order" phrasing is borrowed from the term "higher order function", a more widely used term in Mathematics and Computer Science that refers to a function that either takes one or more functions as an argument, returns a function, or does both.  Since React Components can be thought of as functions that take data and return ui elements, the naming and usage make sense.  Let's look at an example of a higher order component.


```javascript
const ExtraPropsComponent = (WrappedComponent, componentType) => {
  return class ExtraPropsChild extends React.Component {
    render() {
      let props = Object.assign({}, this.props, {
        importantFunction: () => 'foo',
        componentType,
      });
      return <WrappedComponent {...props}/>
    }
  }
}
```

This is a pretty basic HoC that takes a component and returns a new version of that component that will always be passed 2 extra props `importantFunction` and `componentType`. One is statically generated in this case, but the other is dynamically passed in when the component is generated.  The ability to pass dynamic content in when defining the component is one of the key wins of HoCs in the real world.  For instance, this is how Redux's [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) function works.

Note that this is different from a normal React Component that renders a subcomponent passed as an argument like this:

```javascript
let componentType = '???';
class ExtraPropsComponent extends React.Component
  render() {
      let { ChildComponent } = this.props;
      let props = Object.assign({}, this.props, {
        importantFunction: () => 'foo',
        componentType,
      });
      delete props.ChildComponent;

      return <ChildComponent {...props} />;
  }
}
```

These 2 examples are roughly equivalent for this case, but accomplish things in different ways.  The HoC is a function that takes a component and data when it is created and generates another component.  The normal component example is a component that takes a component as a property and accesses a variable that is in its scope at creation time to generate the element tree that it renders.  The HoC is more flexible as you could theoretically create multiple versions of a component using the single HoC.

```javascript

const FancyButton = ExtraPropsComponent(Button, 'fancy');
const CrazyButton = ExtraPropsComponent(Button, 'crazy');
const BoringButton = ExtraPropsComponent(Button, 'boring');
```

For the equivalent functionality without using an HoC, you would have to define the whole component for each case.

### Higher Order Components in the real world

I've already mentioned connect from [react-redux](https://github.com/reactjs/react-redux) as an example of a higher order component.  Other popular libraries that use HoC as part of their APIs include:

- [Radium](http://formidable.com/open-source/radium/): a library for inline styles in React that uses a higher order component to transform in-line styles added to a component into a more robust-css like system
- [React Router](https://github.com/ReactTraining/react-router): a routing library for React that uses `withRouter` a HoC that injects access to the router into components that it wraps
- [Relay](https://facebook.github.io/relay/): Facebook's library for connecting to GraphQL APIs includes Relay.Container, a HoC that allows developers to declare the data requirements for a component


### More Resources

- This was intentionally a very high level look at Higher Order Components.  If you want to go deeper, [this medium article](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.yhbug3ohe) is a great deep dive into all the use cases they allow.
- If you're interested in using HoCs in your own code base, [recompose](https://github.com/acdlite/recompose) is a utility library for making the syntax around defining and using them painless
