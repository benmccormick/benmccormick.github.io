---
title: "Lessons Backbone Developers Can Learn From React"
date: "2015-09-09 11:19:43+00:00"
layout: post
path: "/2015/09/09/what-can-backbone-developers-learn-from-react"
description: "A look at the lessons that Backbone developers can learn from React"
keywords: "Backbone React JavaScript frameworks"
---

Since I started programming professionally, I've always kept an informal list of technologies I want to check out.  Things that I thought would be useful for my career, would expose me to new ideas, or just looked plain cool.  I spent a chunk of my Labor Day weekend working through that list a bit by learning more about [React][react], the JavaScript View library from Facebook. React is a fascinating piece of technology, and a strong ecosystem of tools and libraries is growing up around it.  For developers starting brand new front-end projects in 2015, it ranks as one of the 2 main libraries I'd suggest looking into as a base, along with [Ember][ember].  Most developers though are not starting brand new projects.  We're maintaining existing code, or starting a new project while trying to reuse components of an old one.  Fortunately, React is about ideas as much as it is technology.  For this piece, I'm going to go through the big ideas of React and look at 3 of them that developers working on other frameworks (and [Backbone][backbone] in particular) can learn from.  There's a lot more to React and its community than just these 3 ideas, so I'll also include some extra resources at the bottom for those interested in learning more about it.

### Idea 1: Interfaces should be a tree of composable components

React interfaces are constructed by combining many small "components", each of which can be created by combining other smaller components.  In the end a normal React interface will resemble a tree, with a top level component that encompasses the whole app and many smaller components nested inside of it.  It's a model that should be familiar; the browser DOM works the same way.

Building interfaces this way lets you reuse more code and also makes code easier to reason about.  Because you're composing your interfaces rather than using inheritance or monolithic page objects to build your pages, you can write common code for items like buttons, date-pickers and lists once and then re-use them all over place, even creating larger components like a dialog box out of smaller components like buttons, inputs and an overlay.  And since components are small and focused, it's much easier to dive into them and understand what is going on.  Since react components are built to work in this standardized ways, you can be comfortable knowing that no other code is going to be changing the area of the UI controlled by that component.

Backbone doesn't enforce a specific way to organize your UI code.  You can create a single Backbone View for a whole page, have different non-nested views control different portions of a page, or use a nested scheme.  For simple sites or apps, each of these can make sense.  You probably don't need a nested component tree for a simple content page with one or two pieces of interactive behavior.  But for large rich apps, small composable Views (or other building blocks) can provide much more flexibility, allowing you to mix and match pieces of your application to build diverse pages without becoming overwhelmed with code.

Building this sort of tree system in Backbone is one of the main selling points of [Marionette][marionette], the most popular of several libraries that add conventions on top of Backbone's structure.  Marionette provides collection Views and layout Views that [let you build rich View trees][complexmn] that are very similar in structure to a React app, while maintaining compatibility with Backbone's code and the Backbone communities conventions.  It's also possible to compose an applications interface with a mix of Backbone and other "components"; for instance using [web components][webcomponents], React Components, or even jQuery UI widgets to represent individual pieces in an application and then tying together their layout using Backbone Views.   

That's not to say there are no problems with implementing this style in Backbone though.  For one thing, when nesting one Backbone view inside of another, Backbone does not provide strong encapsulation of child views.  Because Backbone Views act on HTML directly, when a parent view listens to an event or modifies HTML directly, it is possible for the view to listen to events on elements controlled by a child view and even modify those elements directly.  That can create confusing side effects, since in a deeply nested view tree it means an event could lead to code being triggered in one of many different Views, and the state of that piece of DOM could be affected by many different areas of code at once.  In Backbone these problems must mostly be solved with programmer discipline, a weight that adds to the difficulty of deeply nested UIs, but doesn't prevent them.

### Idea 2: Modern JavaScript leads to cleaner code

Using modern JavaScript is less a core idea of React, and more a value of its community.  When researching React, almost every example of React code I found was written using [ES6 style JavaScript code][babel2015] and a modern module system (commonJS or ES6 modules using either [webpack][webpack] or [browserify][browserify]).  Many React developers are even pushing the boundaries of todays browsers and standards and experimenting with how their code could be improved by proposed ES7 features.  I rarely see Backbone code examples using these styles.  They're usually in ES5 style or [Coffeescript][coffeescript] and use AMD modules or global namespaces to structure code.  Some of this is a natural function of the hype cycle: most Backbone code examples were written 3-4 years ago when it was the hot new JavaScript framework, while most React examples are written now.  But the net result is that most people who use Backbone today aren't being exposed to these new styles and tools.  Since things like JavaScript APIs and module loaders can be chosen separate from what framework you choose <sup id="fnref:1">[1](#fn:1)</sup>, this is an opportunity to take advantage of innovation from other places without giving up an investment in Backbone.

Take the following code examples for instance.  This is the same View written in 3 styles: ES5 with namespaces, ES6 and ES7.  Compare the readability and usability in each case.  The example is just a simple view that takes a template, logs a message when it is created and shows a different modal when 2 different buttons are clicked, with a callback function after the modal is closed.

```javascript
//ES5 with namespaces
(function(App, Backbone, Modal, _) {

    App.ExampleView = Backbone.View.extend({

        template: App.templates['exampleview'],

        events: function() {
            'click .example-button': 'showSuccess',
            'click .example-button2': 'showError',
        },

        constructor: function() {
            Backbone.View.apply(this, [].slice.call(arguments));
            console.log('Created a Example View');
        },

        render: function() {
            this.$el.html(_.template(this.template)(this.model.attributes));
        },

        showSuccess: function() {
            this.showModal('You did it');
        },

        showError: function() {
            this.showModal('You failed', 'Error');
        },

        showModal: function(message, title) {
            if (typeof title === 'undefined') {
                title = 'Alert';
            }
            Modal.show(message, title, this.onModalClose.bind(this));
        },

        onModalClose: function() {
            console.log('re-rendering after modal closes to capture any changes');
            this.render();
        },
    })

})(App || {}, Backbone, Modal, _);
```

Obviously the scenario is a bit contrived here (we'd want to generalize any logging in the constructor in real life, and we would listen for model changes to re-render rather than just blindly doing it in a callback).  But notice how many confusing things are going on that are completely incidental to what the code is doing.  A JavaScript beginner would have a lot to work through in this example.  Why is the whole file wrapped in a function?  Where do Backbone and Modal come from?  What's going on with `Backbone.View.apply(this, [].slice.call(arguments));`?  That's even aside from the incidental complexity of having to know what order your files are loaded in when using this particular module style.  We can do so much better.

```javascript
//ES6
import {View} from Backbone;
import * as Modal from 'utils/modal';
import {template} from 'lodash';
import * as ExampleViewTemplate from 'templates/exampleview';

export const ExampleView = View.extend({

    template: ExampleViewTemplate,

    events() {
        'click .example-button': 'showSuccess',
        'click .example-button2': 'showError',
    },

    constructor(...args) {
        View.apply(this, args));
        console.log('Created a Example View');
    },

    render() {
        this.$el.html(template(this.template)(this.model.attributes));
    },

    showSuccess() {
        this.showModal('You did it');
    },

    showError() {
        this.showModal('You failed', 'Error');
    },

    showModal(message, title='Alert') {
        Modal.show(message, title, () => this.onModalClose());
    },

    onModalClose() {
        console.log('re-rendering after modal closes to capture any changes');
        this.render();
    },
});
```

ES6 allows us to clean up our original example a lot!  We're able to ditch the wrapping function, and instead pull our dependencies directly at the top of the file, with clear pointers to module paths so that new developers can easily go find the code we're referencing.  At a smaller level, we've cleaned up many of the annoyances from the original code.  We no longer have to slice arguments; instead we can use the rest operator to collect all of the arguments as an array and pass them to the constructor directly.  Similarly, we don't need to explicitly check for undefined anymore in showModal since we can display default arguments.  Finally, we can get rid of some function boilerplate, removing the function keyword completely for object methods and changing the `bind(this)` from onModalClose to use an ES6 lambda function.  All of this is helpful, and represents the best of what is stable for production at the moment.  But if we want to look ahead to the current proposed ES7 additions, we'll be able to clean this code up even more.

```javascript
//ES7
import {View} from Backbone;
import * as Modal from 'utils/modal';
import {template} from 'lodash';
import * as ExampleViewTemplate from 'templates/exampleview';

export class ExampleView extends View {

    template = ExampleViewTemplate;

    constructor(...args) {
        super(args);
        console.log('Created a Example View');
    }

    render() {
        this.$el.html(template(this.template)(this.model.attributes));
    }

    @on('click .example-button')
    showSuccess() {
        this.showModal('You did it');
    }

    @on('click .example-button2')
    showError() {
        this.showModal('You failed', 'Error');
    }

    showModal(message, title='Alert') {
        Modal.show(message, title, ::this.onModalClose);
    }

    onModalClose() {
        console.log('re-rendering after modal closes to capture any changes');
        this.render();
    }
}
```

ES7 allows us to clean up more boilerplate using classes <sup id="fnref:2">[2](#fn:2)</sup>, static properties, and `::` as a special shorthand for function binding.  But it also allows us to start actually improving the interface of Backbone itself.  The example above uses decorators to define extra behaviors that wrap the View's methods. In this case decorators [allow us to contextualize the events to function mapping][es7backbone] for our View, improving on the default events hash that Backbone provides.  There are many examples of similar convenient conventions that are being experimented with in the React community. Backbone developers can learn a lot here by looking through React code.  Since React components are syntactically similar to Backbone Views (even though the underlying model is quite different), it's easy to learn a lot of new JavaScript techniques that can be used in Backbone in the process.

### Idea 3: Don't use DOM as a source of state

The final big idea that Backbone developers can learn from React is its insistence on not using the DOM as a source of state.  React encourages a programming model where in theory, any component can be re-rendered at any time based on a change in data.  That means that any UI state must be captured in code and not in the UI.  This is another approach that requires programmer discipline in Backbone.  It means that instead of just typing out `this.$('.main-content').addClass('highlighted')`, you'll want to set an `contentIsHighlighted` variable somewhere and then either re-render your view or do a structured update based on your state.  That way, instead of having to read the DOM later to know the state of your application it is all copied in code.  This leads to better testability, more predictable code and fewer edge cases when the structure of your HTML changes.  

This idea was historically the primary benefit for Backbone apps over pure jQuery applications.  But the truth is that while Backbone does a good job of pulling application data into code with models and collections, it makes it very tempting to encode UI state info in the DOM by exposing jQuery helpers and not providing a canonical way to store view state.  Still, a little discipline goes a long way.  By using a separate Backbone Model as a view-model or just storing your state as properties on the view object itself, you can pull your state out of the DOM and make it much easier to inspect and reason about when you're debugging your code or trying to refactor.

You probably can't take this idea to the full extent that React takes it using Backbone.  The extreme end of the React philosophy is to use React components as stateless functions that simply take application data and ui state as arguments and return an HTML representation of the UI.  This means that React interfaces can be re-rendered completely after any change without losing information.  React supports this and makes it performant by using a "virtual DOM" to generate the new HTML that would result from a data or state change, compare it to the existing HTML, and then only make the changes that are required in the actual DOM <sup id="fnref:3">[3](#fn:3)</sup>.  That works well in React since it has a clear concept of what is controlled by each component.  As previously noted, Backbone does not strongly encapsulate its Views, which complicates doing the type of virtual DOM analysis that React manages.  So it's more practical to focus on pulling state out of Views and managing re-renders based on Backbone's event system (the idiomatic Backbone approach).  If you want to pursue the UI as pure functional programming paradigm, you'd probably do better moving off Backbone to a system designed for that like React, [cycle.js][cycle], [Om][om], or [rxjs][rxjs].  But even if you can't go all in on functional UI programming in your current code base, understanding the problems inherent with using DOM to manage state will help you write better Backbone apps.

### React Resources Round-up

If you're interested in learning more about React, many others have put together better resources than I'm capable of.  Here's a quick roundup of some of the resources I've found helpful.

#### Intro

- If you want to get a big picture view of what React is about, I'd recommend starting with this [2013 conference video](https://www.youtube.com/watch?v=x7cQ3mrcKaY) where a member of the React team, addresses some of the criticisms that React received early on and lays out the ideas behind the library.  Some of the details have changed since, but the big picture view remains.
- The React documentation is also exceptionally well-written and accessible.  This blurb on [thinking in react](http://facebook.github.io/react/docs/thinking-in-react.html) is a good place to start.

#### Talks

- If you want to see some of the nice potential side effects that React can provide [this talk](https://www.youtube.com/watch?v=xsSnOQynTHs) by Dan Abramov, the creator of Redux, shows how easy it is to create developer tools that significantly improve a developers feedback loop and user experience while writing code.
-  The [keynote from React Europe](https://www.youtube.com/watch?v=PAA9O4E1IM4) gives a good feel for the current state of the ecosystem around React.


#### Articles

- [Pure UI][pureui] by Guillermo Rauch is the best explanation I've read of the benefits of the UI model that React encourages, though it is not specifically about React.
- One of the biggest instinctive objections many developers have when they first see React code is the mixing of JavaScript and the HTML syntax of JSX inside a single file.  [Eric Elliot has a nice post on medium](https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918) examining those objections and explaining why JSX makes sense.

#### Projects

- [Flux](https://facebook.github.io/flux/) is one of the 2 main data management frameworks that Facebook and the React team recommend for use with React.  The second newer one, [Relay](https://facebook.github.io/relay/) is a bit more crazy advanced and requires a very specific type of backend API to implement.  If you're interested in Flux, also make sure to check out [Redux](https://github.com/rackt/redux), an opinionated flux implementation focused pure functional programming concepts.
- [React Router](https://github.com/rackt/react-router) is a router for React applications based on Ember's router.  It provides a nice declarative model for defining routes based on JSX, the JS language extension that Facebook created along with React
- [Babel](https://babeljs.io/) isn't a react specific technology, but its important to understand it if you want to digest most of the React examples out there, or build a React app yourself, since it is now recommended as the tool for writing React code in an idiomatic style.


### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). If you're interested in Backbone you also might want to check out my [series on Marionette.js](http://benmccormick.org/marionette-explained/).



<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        Well at this point many frameworks are doubling down on "1st class experiences" with Babel (React/Ember) or Typescript (Angular2).  But Backbone at least doesn't care what transpilers you use or don't, and the other libraries are all still usable with vanilla ES5 JavaScript.
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
    <li class="footnote" id="fn:2">
        <p>
        Yes I know that classes are an ES6 feature.  But without decorators, using them with Backbone <a href="http://benmccormick.org/2015/07/06/backbone-and-es6-classes-revisited/">is clunky</a>.
        </p>
        <a href="#fnref:2" title="return to article"> ↩</a></p>
    </li>
        <li class="footnote" id="fn:3">
            <p>
            In addition to other performance enhancements if an app is structured in a way that it can be determined exactly which data changed.
            </p>
            <a href="#fnref:3" title="return to article"> ↩</a></p>
        </li>
</ol>
</div>


[react]: http://facebook.github.io/react/
[ember]: http://emberjs.com/
[marionette]: http://marionettejs.com/
[backbone]: http://backbonejs.org/
[complexmn]: http://benmccormick.org/2014/12/22/building-complex-layouts-with-marionette-js/
[webcomponents]: http://webcomponents.org/
[es7backbone]: http://benmccormick.org/2015/07/06/backbone-and-es6-classes-revisited/
[pureui]: http://rauchg.com/2015/pure-ui/
[cycle]: http://cycle.js.org/
[om]: https://github.com/omcljs/om
[rxjs]: https://github.com/Reactive-Extensions/RxJS
[babel2015]:https://babeljs.io/docs/learn-es2015/
[webpack]: https://webpack.github.io/
[browserify]: http://browserify.org/
[coffeescript]: http://coffeescript.org/
