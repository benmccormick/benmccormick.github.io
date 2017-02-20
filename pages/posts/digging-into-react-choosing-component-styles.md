---
title: "Digging Into React: Choosing Component Styles"
date: "2016-05-02 02:32:36+00:00"
layout: "post"
path: "/2016/05/02/digging-into-react-choosing-component-styles"
description: "An examination of the various styles for defining React components"
keywords: "JavaScript, React, Component, createClass, class, functional component"
category: "frameworks"
key: 'react-component-styles'
readNext: ['jest-first', 'backbone-devs-react', 'callbacks-to-promises']
---

Over the past month I’ve been building my first production features using React.  One of the first things I’ve noticed is the amount of choices that come into a new React project.  A lot of this is about the ecosystem around React (Webpack vs Browserify? Redux vs Relay? Do I need CSS modules or Immutable.js?) but many of the choices are just part of the library, figuring out the best, or at least a consistent, way to do things.

One such choice is the syntax for defining components that you choose to use.  In React, you can define components in at least 3 different styles: the React.createClass style, the ES6 class style, and the pure functional style [^1]. Each has some advantages and disadvantages.

### React.createClass

React.createClass is the original style for defining React components, and is still the preferred style in the React documentation.

Here’s what a theoretical SaveButton component looks like in this style.  It is a simple component that listens for clicks and then uses a separate dispatcher object to send a request to save the data on the page.  After saving the button will either show some specified saved text or "Saved".

```javascript
import React from ‘react’;
import {dispatcher} from ‘./lib/dispatcher’;

export const SaveButton = React.createClass({

    propTypes: {
        //text to show after the component is saved
        savedText: React.PropTypes.string.isRequired,
        //primary text to show on the button
        text: React.PropTypes.string.isRequired,
    },

    getDefaultProps() {
        return {
             savedText: ‘Saved’,
        };
    },

    getInitialState() {
        return { saved: false };
    },

    save() {
        dispatcher.sendMessage(‘saveData’);
        this.setState({saved: true});
    },

    render() {
        let {text, savedText} = this.props;
        return (<span className=“button” onClick={this.save}>
           {this.state.saved ? savedText : text}
        </span>);
    },
});
```

One of the best things about this style is its cohesive nature.  Everything about the component is described as a single object passed to React.createClass.  Since it is just an object that React processes, it is also able to accommodate more usage styles than ES6 classes and functional components.  Specifically we can use [mixins](https://facebook.github.io/react/docs/reusable-components.html#mixins) and add declarative properties like propTypes directly to the component definition.

The downside of the createClass approach is the custom nature of it.  External tools can’t inspect a component declaration and know what functions and methods will be available on the final component without either some deep inspection of the React source code or pre-existing knowledge of React.createClass that somebody has to document and maintain.

### ES6 Classes

Last March, with React v0.13, the React team introduced a second syntax for React components using ES6 classes.  The constraints of the ES6 class definition change the component API in a few ways.  With ES6 classes there is no way to add properties to the class property as part of the main definition, they need to be added afterwards [^2].  Some niceties that are possible with React.createClass don’t work with ES6 classes as well.  Mixins aren’t possible, and React will no longer “autobind” your functions to the component instance, so when passing class methods as callbacks in your components it is necessary to bind it to the current context, either by using arrow functions like
`<span onClick= {() => this.save()} >` or by binding the function like `this.save = this.save.bind(this)`.

```javascript
import React from ‘react’;
import {dispatcher} from ‘./lib/dispatcher’;

export class SaveButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = { saved: false };
    }

    save() {
        dispatcher.sendMessage(‘saveData’);
        this.setState({saved: true});
    },

    render() {
        let {text, savedText} = this.props;
        return (<span className=“button” onClick={() =>this.save()}>
           {this.state.saved ? savedText : text}
        </span>);
    },
});

SaveButton.propTypes = {
    //text to show after the component is saved
    savedText: React.PropTypes.string.isRequired,
    //primary text to show on the button
    text: React.PropTypes.string.isRequired,
};

SaveButton.defaultProps = {
    savedText: ‘Saved’,
};
```

While this approach makes some syntactic compromises and loses mixins, it has the advantage of standardization and tooling support.  A good JavaScript tool can easily tell that a SaveButton should have render and save methods, as well as detecting the methods it inherits from React.Component.  This is useful for things like auto-complete and linting, as well as (theoretically) run-time performance.


### Pure Functional Components

Last fall with React 0.14, React added a 3rd component style.  Functional components dispose of many of the secondary features of React, and focus on the `render` function.  They are the least powerful of all the component syntaxes.  In addition to losing mixins, pure functional components don’t have the life-cycle functions of the class based syntaxes and also don’t have any internal state.  For these components, all state must be managed externally through something like Redux, or parent components that do have state.

```javascript
import React from ‘react’;
import {dispatcher} from ‘./lib/dispatcher’;

export const SaveButton = ({text, savedText, isSaved, setSaved}) => {
    const save = () =>{
        dispatcher.sendMessage(‘saveData’);
        setSaved();
    },
    return (<span className=“button” onClick={save}>
       {isSaved ? savedText : text}
    </span>);
};

SaveButton.propTypes = {
    //text to show after the component is saved
    savedText: React.PropTypes.string.isRequired,
    //primary text to show on the button
    text: React.PropTypes.string.isRequired,
    // has the data already been saved?
    isSaved: React.PropTypes.bool.isRequired,
    // a function to update the application state and mark the page as saved
    setSaved: React.PropTypes.func.isRequired,
};

SaveButton.defaultProps = {
    savedText: ‘Saved’,
};
```

Despite being the least powerful of the 3 component styles, functional components do have some advantages.  First of all, they’re very simple.  It is easy to see what is going on with them, and easy for React to optimize for them.  Like ES6 classes, they’re easy to understand for 3rd party tools since they’re “just functions”, and easy to explain to new developers for the same reason.  They also work well with systems like Redux which already encourages pulling state out of components into global stores.


## Choosing a component style

So given these 3 styles, how do you choose which style to use for a component?  Balance a desire for consistency with a respect for the [Principle of Least Power](https://en.wikipedia.org/wiki/Rule_of_least_power).

For consistency purposes, don’t use more than 2 of these styles within a single project.  This mostly breaks down to “don’t use createClass and ES6 classes” together in the same project.  There are significant differences in capability and complexity between the first 2 styles and functional components. But the class based styles are similar enough that using both adds complexity but fails to do much in terms of signaling intent.  Switching between 2 different styles of communicating a concept should also indicate a meaningful difference in intent.

Of course the most consistent approach would be to always use createClass, since it is the most powerful and any component that can be implemented in the other 2 styles can be implemented using createClass.  This is where the principle of least power comes in.  Here is Tim Berners-Lee's initial description of that principle:

> Computer Science in the 1960s to 80s spent a lot of effort making languages which were as powerful as possible. Nowadays we have to appreciate the reasons for picking not the most powerful solution but the least powerful. The reason for this is that the less powerful the language, the more you can do with the data stored in that language. If you write it in a simple declarative from, anyone can write a program to analyze it in many ways. The Semantic Web is an attempt, largely, to map large quantities of existing data onto a common language so that the data can be analyzed in ways never dreamed of by its creators. If, for example, a web page with weather data has RDF describing that data, a user can retrieve it as a table, perhaps average it, plot it, deduce things from it in combination with other information. At the other end of the scale is the weather information portrayed by the cunning Java applet. While this might allow a very cool user interface, it cannot be analyzed at all. The search engine finding the page will have no idea of what the data is or what it is about. This the only way to find out what a Java applet means is to set it running in front of a person.

The less powerful react components styles are the more readable styles, both for humans and computers. That readability also limits the classes of errors and unexpected behaviors we can enact. So we should strive for simple components where we can, while balancing that with our desire for consistency.

For projects looking into this, there are a few simple questions that you can answer to decide which style to use.

1. Do you need to integrate with non-React libraries that modify the DOM?
2. Do you need to manage state within your components (IE are you not using an external state management library like Redux)?
3. Do you need to use mixins for anything in your project?

If you answered yes to any of these questions, then you need to include a class based component style in your options for your projects.  If you answered yes to #3, then you will need to use React.createClass.

Once you’ve made those decisions at the project level, the decisions are easy for an individual component.  If you answered no to all of the questions above (unlikely for a large project, but possible), you should always use functional components.  If not, you can ask the same 3 questions for each new component.  If the answer to all of the questions are no for a component, use a functional component, otherwise use the class based style you’ve chosen for your project.

### More Resources

- [The React documentation](https://facebook.github.io/react/docs/reusable-components.html#es6-classes) is the best place to look at the benefits and tradeoffs of the different component styles
- [James Nelson wrote a similar guide last year](http://jamesknelson.com/should-i-use-react-createclass-es6-classes-or-stateless-functional-components/) focused on the decision tree of what style to use for a component.  He dismisses the createClass style completely and has a similar but slightly different set of questions to ask.
- [This github thread](https://github.com/facebook/react/issues/5677) makes the important distinction that functional components are not yet optimized in any special way, though they may be in the future.

[^1]: Technically you can also use an ES5 class based style, but I’m going to ignore that.  It is not a common idiom for React programs as far as I can tell.

[^2]: There is a proposal for adding static properties to ES6 classes, but it is still in early stages right now and is not guaranteed to end up as part of the ECMAScript spec.
