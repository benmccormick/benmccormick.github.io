---
title: "Backbone and ES6 Classes Revisited"
date: "2015-07-06T11:22:22+00:00"
layout: "post"
path: "/2015/07/06/backbone-and-es6-classes-revisited"
description: "A second look at using ES6 classes with Backbone"
keywords: "ES6, Backbone, classes, JavaScript, decorators"
category: "frameworks"
key: "bb-es6-2"
readNext: "bb-es6-1,backbone-devs-react,mn-series"
pageViews: "14438"
topics: ['JavaScript', 'ECMAScript', 'Backbone']
last30pageViews: "362"
---

A few weeks ago I wrote [an article][bbes6] explaining why the final spec for classes in the ES6/ES2015 version of JavaScript was not usable in Backbone applications.  That post got a lot of great feedback, including this [discussion][githubissue] with the Backbone core team. The gist of that discussion has been that there are several ways to make ES6 classes work with Backbone now, though they may be less clean than the current *Backbone.extend* syntax.  But there's hope for a really great experience: decorators, a [proposed feature for the ES7/ES2016 spec][decoratorsspec], provide a much cleaner interface when working with Backbone and native classes.

Let's start with a quick reminder on the problem that Backbone developers face when adapting ES6 classes.  Both *Backbone.extend* and ES6 classes serve as syntactic sugar around traditional JavaScript inheritance methods.  So the following code snippets are effectively equivalent:

```javascript
let ExampleView = Backbone.View.extend({
    foo: function() {
        alert('foo')
    }
});
```

```javascript
class ExampleView extends Backbone.View {
    foo() {
        alert('foo');
    }
}
```

and each corresponds roughly to this vanilla ES5 snippet

```javascript
function ExampleView() {
    Backbone.View.call(this);
}

ExampleView.prototype = Object.create(Backbone.View);
ExampleView.prototype.constructor = Backbone.View;
ExampleView.prototype.foo = function() {
    alert('foo');
};
```

All of that works fine.  The problem is that even though these abstractions are similar, they're not quite the same.  Specifically ES6 class syntax supports an opinionated subset of what you can accomplish with plain prototype inheritance.  There's good reason for this, since many developers don't understand prototype inheritance and can shoot themselves in the foot.  But ES6 class restrictions don't mesh well with Backbone's conventions.  Specifically, Backbone relies on adding properties to a class' prototype before a class' constructor is invoked <sup id="fnref:1">[1](#fn:1)</sup>.  ES6 classes don't provide any way to define properties on the prototype as part of the class definition.  They also do not allow you to add instance properties to a constructor prior to calling super() to run a parent class' constructor.  As a result, properties that are processed within Backbone objects' constructors like `events`, `className`, `urlRoot` and others can't be set within an ES6 class definition without resorting to some less than beautiful syntax.  There are however at least 3 different ways of dealing with this problem under the ES6 spec.  I'll take a look at each of them.

### ES6 solutions

The 3 main solutions I've seen proposed for using the current ES6 class spec with Backbone classes are passing properties to the `super` function, creating everything as a method, and adding properties to the prototype outside of the class definition.  I'll go through those one by one, using [a view from one of the Backbone TodoMVC implementations][todomvcview] as an example.

#### Pass properties to the super constructor

The first solution is to define a constructor function for each Backbone object that has properties, and pass the properties directly to the constructor.

```javascript
import * as $ from 'jquery';
import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as todosTemplate from 'text!templates/todos.html';
import * as Common from 'common';

class TodoView extends Backbone.View {

    constructor() {
        super({
            tagName:  'li',

            template: _.template(todosTemplate),

            events: {
                'click .toggle':    'toggleCompleted',
                'dblclick label':   'edit',
                'click .destroy':   'clear',
                'keypress .edit':   'updateOnEnter',
                'keydown .edit':    'revertOnEscape',
                'blur .edit':       'close'
            },
        });
    }

    initialize() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('completed', this.model.get('completed'));

        this.toggleVisible();
        this.$input = this.$('.edit');
        return this;
    }

    toggleVisible() {
        this.$el.toggleClass('hidden',  this.isHidden());
    }

    isHidden() {
        let isCompleted = this.model.get('completed');
        return (// hidden cases only
            (!isCompleted && Common.TodoFilter === 'completed') ||
            (isCompleted && Common.TodoFilter === 'active')
        );
    }

    toggleCompleted() {
        this.model.toggle();
    }

    edit() {
        this.$el.addClass('editing');
        this.$input.focus();
    }

    close() {
        let value = this.$input.val();
        let trimmedValue = value.trim();

        if (trimmedValue) {
            this.model.save({ title: trimmedValue });

            if (value !== trimmedValue) {
                this.model.trigger('change');
            }
        } else {
            this.clear();
        }

        this.$el.removeClass('editing');
    }

    updateOnEnter(e) {
        if (e.keyCode === Common.ENTER_KEY) {
            this.close();
        }
    }

    revertOnEscape(e) {
        if (e.which === Common.ESCAPE_KEY) {
            this.$el.removeClass('editing');
            // Also reset the hidden input back to the original value.
            this.$input.val(this.model.get('title'));
        }
    }

    clear() {
        this.model.destroy();
    }
};

export default TodoView;
```

There are a few advantages to this approach.  It keeps everything within the class definition, and lets Backbone itself manage attaching properties to the prototype, assuring compatibility with existing code.  However it adds a constructor call to a class that otherwise wouldn't need one, making it less obvious when a developer is actually modifying the constructor to do something important.  It also isolates properties from methods, whereas Backbone philosophically has always treated them interchangeably.  In fact that philosophy is the key to the next solution.


#### Treat everything like a method

Backbone evaluates all of its properties using Underscore's `_.result` function <sup id="fnref:2">[2](#fn:2)</sup>. `_.result` checks to see if an object property is a function. If it is then `_.result` will evaluate it and return the result.  This allows Backbone to accept its properties as either an object or a function.  Very handy.  So one workaround to the constructor problem is to make everything a method, including properties.  We can actually go one better than this, and use the `get` keyword to make our methods serve as *getters* for a property.  This means they will be accessible as properties, but defined as methods, retaining compatibility with any existing references if you're converting existing code.

```javascript
class TodoView extends Backbone.View {

    get tagName() { return 'li'}

    get template() { return _.template(todosTemplate)}

    get events() {
        return {
            'click .toggle':    'toggleCompleted',
            'dblclick label':   'edit',
            'click .destroy':   'clear',
            'keypress .edit':   'updateOnEnter',
            'keydown .edit':    'revertOnEscape',
            'blur .edit':       'close'
        }
    }

    initialize() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('completed', this.model.get('completed'));

        this.toggleVisible();
        this.$input = this.$('.edit');
        return this;
    }

    toggleVisible() {
        this.$el.toggleClass('hidden',  this.isHidden());
    }

    //... etc
};

export default TodoView;
```

This approach uses only standard class syntax, which is great.  Getters and methods are highly idiomatic class structures, and work fine with Backbone right now.  They also enforce the immutability of these properties, a design concern with the current Backbone property implementation <sup id="fnref:3">[3](#fn:3)</sup>.  But lets be real, `get tagName() { return 'li'}` is a significantly less clean interface than the `tagName: 'li'` syntax you get with *Backbone.extend*.  

#### Defining properties directly on the prototype

The final example is the most straightforward.  Since there's no special class syntax for adding properties to the prototype, we can just do so directly after we've defined the class.

```javascript
class TodoView extends Backbone.View {

    initialize() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('completed', this.model.get('completed'));

        this.toggleVisible();
        this.$input = this.$('.edit');
        return this;
    }

    toggleVisible() {
        this.$el.toggleClass('hidden',  this.isHidden());
    }

    //... etc
};

TodoView.prototype.tagName = 'li';
TodoView.prototype.template = _.template(todosTemplate);
TodoView.prototype.events = {
    'click .toggle':    'toggleCompleted',
    'dblclick label':   'edit',
    'click .destroy':   'clear',
    'keypress .edit':   'updateOnEnter',
    'keydown .edit':    'revertOnEscape',
    'blur .edit':       'close'
};

export default TodoView;
```

This approach is unambiguous, but its also removes the advantages of using abstracted syntax to begin with.  Adding directly to the prototype takes properties out of the context of the class definition, making it harder to view the class as a holistic unit.  Forcing properties to appear after the class definition also breaks with Backbone community conventions.  Almost all examples of Backbone code that I've seen put properties at the top of Backbone class declarations, above any methods, since they're usually important to read when trying to understand the purpose and role of an object.  They're then followed by methods, which often contain extensive logic that is less helpful in understanding a class' overall purpose.

Of these 3 solutions, I personally prefer using methods and getters.  However I don't see any of them as an improvement on the existing *Backbone.extend* syntax.

### ES7 and Decorators

JavaScript is not staying stagnant however.  The TC39 committee recently approved the final spec for ES6 and is aiming to release a new spec on a yearly basis going forward.  One proposed feature for a future spec is [JavaScript decorators][decoratorsspec].  Decorators are a declarative way of adding extra behavior to a class or class method.  They're simple functions that take a class or method as an argument and then return an augmented version.

For instance here's a simple example from the proposal of a decorator that adds an isTestable property to classes that it decorates.

```javascript
@isTestable(true)
class MyClass { }

function isTestable(value) {
   return function decorator(target) {
      target.isTestable = value;
   }
}
```

Based on that example, it's not hard to see how this is relevant to the syntax struggle we experienced above.  Here's a naive solution to our properties problem that utilizes a `props` decorator to add a Backbone-esque hash of properties to the prototype.

```javascript
//decorators.js
export function props(value) {
    return function decorator(target) {
        _.extend(target.prototype, value);
    }
}
```

```javascript
import * as $ from 'jquery';
import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as todosTemplate from 'text!templates/todos.html';
import * as Common from 'common';
import {props} from 'decorators'

@props({

    tagName:  'li',

    template: _.template(todosTemplate),

    events: {
        'click .toggle':    'toggleCompleted',
        'dblclick label':   'edit',
        'click .destroy':   'clear',
        'keypress .edit':   'updateOnEnter',
        'keydown .edit':    'revertOnEscape',
        'blur .edit':       'close'
    },
})
class TodoView extends Backbone.View {

    initialize() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('completed', this.model.get('completed'));

        this.toggleVisible();
        this.$input = this.$('.edit');
        return this;
    }

    toggleVisible() {
        this.$el.toggleClass('hidden',  this.isHidden());
    }

    //... etc
};

export default TodoView;
```

That's a big improvement over our ES6 solutions above.  Our properties are added declaratively at the top of the class and are still clearly associated with the class.  Everything lines up reasonably well with both Backbone and native idioms. This is also reminiscent of the [approach that Angular 2 is taking][angular2] with its interface, using decorators heavily for component configuration.  It turns out though that we can actually do better.

I got a tweet from Steven Langbroek last week asking me to look at his [idea for using decorators to provide a cool new syntax for event binding in Backbone][decoratorsgist].  I thought it was awesome and it inspired me to think in a more fine grained way about using decorators with Backbone.  How can we make the syntax better, as opposed to just replicating the current experience.  Here's what a more "fine grained" decorators approach might look like with our example.

```javascript
//decorators.js
export function tagName(value) {
    return function decorator(target) {
        target.prototype.tagName = value;
    }
}

export function template(value) {
    return function decorator(target) {
        target.prototype.template = _.template(value);
    }
}

export function on(eventName){
  return function(target, name, descriptor){
    if(!target.events) {
        target.events = {};
    }
    if(_.isFunction(target.events)) {
        throw new Error('The on decorator is not compatible with an events method');
        return;
    }
    if(!eventName) {
        throw new Error('The on decorator requires an eventName argument');
    }
    target.events[eventName] = name;
    return descriptor;
  }
}
```

```javascript
import * as $ from 'jquery';
import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as todosTemplate from 'text!templates/todos.html';
import * as Common from 'common';
import {tagName, template, on} from 'decorators';

@tagName('li')
@template(todosTemplate)
class TodoView extends Backbone.View {

    initialize() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('completed', this.model.get('completed'));

        this.toggleVisible();
        this.$input = this.$('.edit');
        return this;
    }

    toggleVisible() {
        this.$el.toggleClass('hidden',  this.isHidden());
    }

    isHidden() {
        let isCompleted = this.model.get('completed');
        return (// hidden cases only
            (!isCompleted && Common.TodoFilter === 'completed') ||
            (isCompleted && Common.TodoFilter === 'active')
        );
    }

    @on('click .toggle')
    toggleCompleted() {
        this.model.toggle();
    }

    @on('dblclick label')
    edit() {
        this.$el.addClass('editing');
        this.$input.focus();
    }

    @on('blur .edit')
    close() {
        let value = this.$input.val();
        let trimmedValue = value.trim();

        if (trimmedValue) {
            this.model.save({ title: trimmedValue });

            if (value !== trimmedValue) {
                this.model.trigger('change');
            }
        } else {
            this.clear();
        }

        this.$el.removeClass('editing');
    }

    @on('keypress .edit')
    updateOnEnter(e) {
        if (e.keyCode === Common.ENTER_KEY) {
            this.close();
        }
    }

    @on('keydown .edit')
    revertOnEscape(e) {
        if (e.which === Common.ESCAPE_KEY) {
            this.$el.removeClass('editing');
            // Also reset the hidden input back to the original value.
            this.$input.val(this.model.get('title'));
        }
    }

    @on('click .destroy')
    clear() {
        this.model.destroy();
    }
};

export default TodoView;
```

Now we're getting somewhere.  Steven's `on` decorator provides a really nice upgrade to Backbone's event system.  Event handlers are now in the context of the methods they refer to, making it much easier to get context as you scroll through a large view.  Our tagName gets a nice declarative setter at the top of the view rather than being bundled into an object hash.  And our template processing gets standardized, with the call to `_.template` abstracted away into the decorator.  That last decorator would probably be project specific, but the other 2 could easily be incorporated into a general Backbone decorator library.  

The main downside I see to this is one shared by a few of the other approaches.  Specifically that declaring a property like tagName as a method or as a property requires different implementation styles.  Backbone philosophically treats these scenarios as equivalent, and its not unusual to start with a static property for keys like `className`, `url`, or `template` and then refactor to use a function as code is reused in different situations.  Artificially separating out those scenarios is not very Backbone-like and might discourage that type of refactoring.

### Recommendations

If you want to use ES6 classes with Backbone in production today, you should probably make everything a method, and make liberal use of the getter functionality.  That seems to be the most Backbone-like, with everything contained in a single class definition, and easy refactoring when a property begins to require logic around it.  If you're experimenting though, you should definitely consider playing with decorators and see how you can make Backbone's interface better.  

*If you have ideas about this, feel free to contribute on the [github issue][githubissue]*

<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        I completely screwed up explaining this in my first piece.  I was under the mistaken impression that Backbone was adding properties like `className` and `events` to each instance rather than to the prototype.  Which makes no sense in retrospect, since those properties need to be present before the Backbone.View is run.
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
        <li class="footnote" id="fn:2">
            <p>
            Well, almost all. iDAttribute <a href="https://github.com/jashkenas/backbone/pull/3684">is still catching up</a>.
            <a href="#fnref:2" title="return to article"> ↩</a></p>
        </li>
        <li class="footnote" id="fn:3">
            <p>
            Oh you didn't realize that adding an item to the event hash for your view would add it to every instance of that View?  Whoops.
            <a href="#fnref:3" title="return to article"> ↩</a></p>
        </li>
</ol>
</div>

[bbes6]: http://benmccormick.org/2015/04/07/es6-classes-and-backbone-js/
[githubissue]: https://github.com/jashkenas/backbone/issues/3560
[decoratorsspec]: https://github.com/wycats/javascript-decorators
[todomvcview]: https://github.com/tastejs/todomvc/blob/gh-pages/examples/backbone_require/js/views/todos.js
[decoratorsgist]: https://gist.github.com/StevenLangbroek/6bd28d8201839434b843
[angular2]: https://angular.io/docs/js/latest/quickstart.html#section-angular-create-account
