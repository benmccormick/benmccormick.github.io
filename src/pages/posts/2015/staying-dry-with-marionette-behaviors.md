---
title: "Staying DRY with Marionette Behaviors"
date: "2015-03-23T04:04:17+00:00"
layout: "post"
path: "/2015/03/23/staying-dry-with-marionette-behaviors"
description: "How to keep your Views DRY using Behaviors in your Marionette app"
keywords: "Marionette.js behaviors JavaScript"
category: "frameworks"
readNext: "mn-series,backbone-devs-react,bb-radio"
topics: ['Backbone', 'Marionette']
pageViews: "9684"
last30pageViews: "146"
---

*This is the sixth post in a series on [Marionette.js][marionette].  For more background on what Marionette is, check out the series page, [Marionette Explained][marionetteexplained]*


Any successful project draws complaints, and [Backbone.js][backbone] is a successful project by pretty much any measurement.  The biggest complaints I've heard leveled against Backbone as an MVC framework revolve around the boilerplate involved in writing Backbone apps.  The claim goes that Backbone forces you to write the same event binding and workflow code over and over again.  In general I'd claim that's a feature of *bad* Backbone apps, and  not something unavoidable.  But it's certainly true that Backbone doesn't give you much guidance on how to reduce repetition and boilerplate in your code.  Making it easy to reduce repetition turns out to be one of the main roles of [Marionette][marionette]. This post is a look at one of the tools that Marionette provides to help you simplify your applications: the Behavior class.

Marionette Behaviors are reusable chunks of UI logic that you can mix into your Views.  When you have a common problem that you face across several Views, Behaviors can help you reduce boilerplate and repetition.  We'll take a look at a practical example first, and then we can get into the Behaviors API.  

Let's see how Behaviors can help us write better form validation code.  When I'm validating forms, I use the [backbone.validation][validation] library. It provides helpers for checking the validity of model properties and attaching error messages to inputs, but doesn't force a specific workflow. However, I have a specific flow I usually want.  A user should be able to enter data as they see fit to start, with no validation warnings until they've tried to submit the form.  After they've initially submitted the form, warnings should appear next to any invalid fields, and they should update and disappear as the user fixes their input.

That process is pretty easy to implement with backbone.validation.  I simply connect my Model to each form View I create, and in the Model I add some logic to re-validate each time the Model is changed, but only after the first time validation is triggered by a user submit.  That works great in most cases.  The problem comes when I need to re-render my view in the middle of this process.  This is a pretty common occurrence if your form has sub-views that may appear based on the contents of other parts of the form. In that case, I have to make sure that the validation state persists across renders.  That might look something like this. <sup id="fnref:1">[1](#fn:1)</sup>

```javascript
import * as Mn from 'marionette';
import * as Validation from 'backbone-validation';

var FormView = Mn.LayoutView.extend({

    template: '#form',

    ui: {
        submit: '.submit'
    },

    events: {
        'click @ui.submit': 'submitForm'
    },

    modelEvents: {
        'validated': 'setValidated',
    },

    onRender: function() {
        //any other post-render View code here

        Validation.bind(this);
        if(this.validated) {
            this.model.validate();
        }
    },

    setValidated: function() {
        this.validated = true;
    },

    submitForm: function() {
        //handle form submission
    }

});
```

So it's not that much code to add the functionality we want.  But when we need this code on multiple Views, adding and maintaining it becomes a pain quickly, creating the type of boilerplate that developers rage against.  So how can Behaviors help? It turns out to be easy to pull the functionality from our example out into a separate Behavior that any View can implement.  

That would look something like this:

```javascript
import * as Mn from 'marionette';
import * as Validation from 'backbone-validation';

var ValidationBehavior = Mn.Behavior.extend({

    modelEvents: {
        'validated': 'setValidated',
    },

    onRender: function() {
        //Set up any other form related stuff here
        Validation.bind(this.view);
        if(this.hasBeenValidated) {
            this.view.model.validate();
        }
    },


    setValidated: function() {
        this.hasBeenValidated = true;
    },

});

export default ValidationBehavior;
```

You could then pull the Behavior back into the View like this:

```javascript
import * as Mn from 'marionette';
import * as Validation from 'backbone-validation';
import * as ValidationBehavior from 'behaviors/validation';

var FormView = Mn.LayoutView.extend({

    template: '#form',

    ui: {
        submit: '.submit'
    },

    events: {
        'click @ui.submit': 'submitForm'
    },

    behaviors: {
        validation: {
            behaviorClass: ValidationBehavior
        }
    },

    submitForm: function() {
        //handle form submission
    }
});
```

We could do this for any number of Views that required validation.  The same thing can be done for many other types of functionality, including key-binding and "warn before delete".

### Behaviors API

Behaviors have essentially the same API as Marionette Views, because they're meant to be extracted out of existing Views.  So the event hashes, ui elements, and life-cycle methods that you find on a Marionette View are all also available on Behaviors.  The life cycle functions on a Behavior execute immediately after their corresponding functions on the Behavior's associated View. Behaviors also get `el`, `$el` and `$` properties that are proxied to the equivalent properties on the Behaviors view.

Behaviors are not just mixins though. Behavior properties are isolated from the Views they're associated with, preventing naming collisions and also encouraging reusable, decoupled designs.  Generally Behaviors don't directly modify their associated Views or data.  The communication flow is one way, with Behaviors accepting input from their parent View in the form of an options object that is attached to the Behavior when it is created.  You can pass these options through using the behaviors hash on the View.  For instance to pass an error message to the validation behavior above, you could define your behaviors hash like this:

```
    behaviors: {
        validation: {
            behaviorClass: ValidationBehavior,
            errorMessage: 'You did something wrong.'
        }
    },
```

### A quick note on how Behaviors attach to Views

You can see in the example above that the general form for attaching Behaviors to a View is to include a key-value pair for each Behavior, where the value is an object that lays out the options for the Behavior.  The interesting thing in the example above is that the name of the key doesn't matter at all.  It's not used by the library in any way; instead Marionette picks out the correct behavior to use based on the behaviorClass property in the value.  So why is the API structured like that?  To understand, you need to know that the Behaviors API supports two separate scenarios for looking up the correct Behaviors for a View.  

The original API Marionette included for looking up Behaviors requires you to override a behaviorsLookup function on Marionette to tell the library where to retrieve your Behaviors from.  The keys of the behaviors hash on a view were passed to the lookup function, which then retrieved the Behavior classes from wherever the user chose to store them (probably a global namespace object).  

That API works great for developers used to using namespaces to organize their code, but for developers using modern JavaScript module loaders, it introduces global state and indirection where it wasn't needed.  To handle this case, the behaviorClass key was added as an option for the value object, allowing developers to specify Behaviors as dependencies of the file they were defining a View in, and then attach the Behavior directly to the View.  

That makes much more sense for module users, but leads to a clunky API where the keys aren't used.  Fortunately, in newer versions of Marionette you can get around this entirely, by defining your behaviors as an array on a view.  So the example above would look like:

```
    behaviors: [{
        behaviorClass: ValidationBehavior,
        errorMessage: 'You did something wrong.'
    }]
```

This works due to an undocumented implementation detail in Marionette 2.4.1 <sup id="fnref:2">[2](#fn:2)</sup>, but will be [fully supported][arraypr] in future versions.  In future versions you also will be able to pass a class directly as an array item if the Behavior is not taking any arguments, further cleaning up the API.


### When are Behaviors useful?

Marionette's documentation explains Behaviors very broadly, which makes sense for official documentation since it gives ideas without limiting how users think about them.  But in my experience Behaviors are best used for three different use-cases.

#### Sharing common event handling logic  

This is the most obvious use for Behaviors, and what the documentation focuses on.  It's easy to set up common event based UI patterns like "warn on close" with behaviors.  But they also can be used for more complicated event based UI logic.  At Windsor Circle we use 2 behaviors to share common "drag and drop" code with a Droppable Behavior that can be implemented by a CollectionView and a Draggable Behavior for ItemViews.  That makes it simple to make any CollectionView based list sortable with drag and drop, and keeps the code in a nice central place where any improvements will be shared across the code base.

#### Sharing common life-cycle functions

In addition to event handling, Behaviors also give you access to the various [life cycle][lifecycle] methods of Marionette Views.  That lets you split out common life cycle functionality and reduce code.  An easy example of this would be a Behavior that fades a View in each time by adding a css class with an animation associated with it.

```
let FadeIn = Marionette.Behavior.extend({
    onBeforeShow: function() {
        this.$el.addClass('hidden fadein');
    },
    onShow: function() {
        this.$el.removeClass('hidden');
    }
});
```

which would work with a CSS snippet like this:

```
.fadein {
  transition: opacity 1s;  
  opacity: 1;
}

.fadein.hidden {
    opacity: 0;
}
```



#### Simplifying integration with libraries

This final use case is a special case of the first 2, but I think its worth mentioning in its own
category.  Many 3rd party Backbone or jQuery libraries require repetitive initialization code to use within a View.  This code is often the same across all Views, or only requires minor tweaks.  The perfect use case for a Behavior!  The Validation code above is one example of this, but it's useful for many plugins.  For instance, if you use the [Chosen][chosen] jQuery plugin to create rich dropdown boxes, you could create a Behavior to automatically initialize select elements with Chosen, and optionally pass a class to restrict it to only initialize selects with a specific class.

```
let UseChosen = Marionette.Behavior.extend({
    onRender: function() {
        let className = this.options.className,
            chosenOptions = this.options.chosenOptions || {};
        if(className) {
            this.$('.${className}').chosen(chosenOptions);
        }
        else {
            this.$('select').chosen(chosenOptions);
        }
    }
});
```

#### Wrap-Up

Behaviors are a great resource for avoiding repetition in your Backbone code.  If you have examples of good open-source Behaviors out there, please mention them in the comments.  I'd also love to hear what use cases you've found for them, even if the code isn't public to share.

### More Resources

- Atomic Object has a [nice writeup][atomic] on Marionette Behaviors, and a [followup on testing them][testingatomic].
- Behaviors seem to make the most sense to people when given examples of how you might use them.  One great open-source example is this [key-binding Behavior][keybind] that makes it easy for you to add keyboard shortcuts to a View

<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        Going forward on this blog I'm planning on using ES6 features in code examples where appropriate.  If the code looks weird to you check out <a href="https://babeljs.io/docs/learn-es6/">this nice summary of ES6 features</a>.    
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
    <li class="footnote" id="fn:2">
        <p>
        The latest version of Marionette at the time of writing.
        </p>
        <a href="#fnref:2" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>

[validation]: http://thedersen.com/projects/backbone-validation/
[arraypr]: https://github.com/marionettejs/backbone.marionette/pull/2368
[lifecycle]: http://benmccormick.org/2015/01/05/marionette-view-life-cycles/
[marionetteexplained]: http://benmccormick.org/marionette-explained/
[marionette]: http://marionettejs.com/
[chosen]: http://harvesthq.github.io/chosen/
[atomic]: http://spin.atomicobject.com/2014/09/11/marionette-behaviors-overview/
[testingatomic]: http://spin.atomicobject.com/2014/09/12/testing-marionette-js-behaviors/
[keybind]: https://github.com/behave-ui/behave-ui-hotkeys
[backbone]: http://backbonejs.org/
