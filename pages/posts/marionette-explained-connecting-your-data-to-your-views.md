---
title: "Marionette Explained: Connecting Data to Your Views"
date: "2014-12-10 12:30:00+00:00"
layout: "post"
path: "/2014/12/10/marionette-explained-connecting-your-data-to-your-views"
description: "How to bind data to your views in Marionette.js"
keywords: "JavaScript Marionette.js Backbone MVC Model View"
category: "frameworks"
readNext: ['mn-series', 'backbone-devs-react', 'bb-radio']
---

*This is the second post in a series on [Marionette.js][marionette].  For more background on what Marionette is, check out the first post in the series, [The Case For Marionette][caseformarionette].  Also note that this article was written about Marionette v2.  The current latest version of Marionette is v3, and while most of the high level concepts remain the same, the specific syntax has changed in some cases.*

One of the most interesting design choices of [Backbone][backbone] was the decision to not provide a default render function for Views. Backbone Views by default are an empty function that adds nothing to the DOM when rendered.  Although a View can have a Model or Collection associated with it, there is no built in way to associate that with the generated View.  When you contrast that to other modern frameworks like Ember, Angular and KnockoutJS, and their emphasis on using 2 way bindings to associate a data object to a rendered View, Backbone can feel a bit incomplete.  The goal is to allow for a variety of rendering approaches, without making one of them a favored approach.  But it leaves a situation where choosing a rendering procedure is one of the first steps in any new Backbone project.  Marionette provides a structured approach for binding your data to your view layer, while still providing flexibility to introduce customization.

### Rendering and Data-Binding in Marionette

![rendering diagram](/posts/images/renderpattern-3.png)

Marionette.JS handles rendering in a way that is similar to the [Model-View-ViewModel][mvvm] pattern that developers who have used KnockoutJS or Durandal will be familiar with <sup id="fnref:1">[1](#fn:1)</sup>. Marionette implements its render cycle through 2 primary methods available in all of its base View classes.  The first is `serializeData`. serializeData is a function that produces what is essentially a `ViewModel` in the sense of an MVVM application. It takes your data (a Backbone Model or Collection), and pulls it into a simplified form that a View can easily render.  By default Marionette will simply call the Model or Collection's `toJSON` function to serialize the Backbone object down into a simple JavaScript object.  But it's possible to override serializeData to provide more complicated logic.  For instance here's an example from the [Marionette TodoMVC project][marionettetodo] that takes a collection of todos and calculates a few values to show the number of completed todos.

```javascript
serializeData: function () {
    var active = this.collection.getActive().length;
    var total = this.collection.length;

    return {
        activeCount: active,
        totalCount: total,
        completedCount: total - active
    };
},
```

Once the serialized data/view model has been prepared, data is passed to the render function which starts by looking for a template to render.  In Marionette, templates are defined by setting the template property on your View, or by setting a getTemplate method if you want to conditionally load your templates. The render function takes that template, passes it the serialized data, and renders it using a template engine.  The default Marionette template engine is Underscore, which makes sense since it's a Backbone dependency already.  But it's easy to switch to a different templating engine.  Here's the entire chunk of code I wrote to use Handlebar templates in Windsor Circle's Marionette app.

```javascript
//render templates with Handlebars instead of Underscore
Backbone.Marionette.Renderer.render = function(template, data){
    var renderer = Handlebars.compile(template);
    return renderer(data);
};
```

### ItemView and CollectionView

Marionette provides several View classes that you can use as bases, but the core Views for representing data are ItemView and CollectionView.  An ItemView takes a single data object, either a Model or Collection and passes it to the template to render.  A CollectionView iterates over a Collection and renders a child View for each Model. You can either use the same View for every Collection, or mix and match Views based on the Model's properties.

So for instance, views for a simple todo list might look something like this <sup id="fnref:2">[2](#fn:2)</sup>:

```javascript
var TodoView= Marionette.ItemView.extend({
    tagName: 'li',
    template: '<span class="checkbox" {{checked}}></span><span class="text">{{ text}}</span><span class="delete"></span>',
    events: {
        'click .checkbox': 'toggleChecked',
        'click .delete' : 'deleteItem'
    },

    serializeData: function() {
        return {
            checked: this.model.get('checked') ? 'checked':'',
            text: this.model.get('text')
        };
    },

    toggleChecked: function() {
        //logic for checking the box
    },

    deleteItem : function () {
        //logic for deleting the todo
    }
});

var TodoListView = Marionette.CollectionView.extend({
    childView: TodoView,
    tagName: 'ul'

});
```

When the TodoListView is given a collection and rendered, it will display an unordered list of rendered TodoViews, with the data for each model bound to the template object associated with TodoView.

### A brief note on 2 way data-binding

Marionette data-binding is one-way by default.  Over the last few years the discussion around data-binding has gone from "cool there's structured data-binding" when Backbone first came out, to "how can you ship without 2-way data-bindings?" when Knockout, Angular and Ember popularized the 2-way approach, to "1 way bindings keep things simple and they're cool again" based on the popularity of React.  I'm not going to go deep into that debate during this post, but the important takeaway is that Marionette generally prefers explicit bindings to implicit.  So when model values change, it will be based on code that you've written, not implicit library code.

### Wrap-Up

I kept things pretty simple in this post, but consistent data binding is a core part of what Marionette provides.  Having a single documented system for attaching Model and Collection data to Views is a big win for keeping Backbone applications lean and readable.  When using these conventions you can move from View to View or project to project and quickly pick up on the intent and structure of the code.  Instead of trying to solve these problems for every  View, you can rely on the experience of others and focus on writing code to achieve your application's goals.

This was a short but important start to diving deeper into Marionette. I'll talk more about layouts, view life-cycles, and other Marionette features in future posts, but at their heart, web applications are about exposing data in rich UIs.  Without that core, your web applications won't have much function at all.  So make sure to understand and take advantage of this aspect of Marionette before you move on to anything else.


### More Resources

- If you absolutely must have 2 way data bindings in Backbone, [Backbone.stickit][stickit] is a good project to check out.  At Windsor Circle we use it for binding model data to forms (2 way data-binding's best use case).  Rather than the template based approach most libaries use for 2 way data-binding, stickit allows you to configure bindings declaratively in your view code.  

<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        MVVM is normally associated with 2 ways bindings though, which Backbone and Marionette do not provide
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
    <li class="footnote" id="fn:2">
        <p>
        In practice Marionette developers would likely use a ui hash on the TodoView, pull the template out into a separate file, and might have the CollectionView be a CompositeView to provide structure around the list.  But I'll dive into all of those things in more detail in future posts.
        </p>
        <a href="#fnref:2" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>

[backbone]: http://backbonejs.org/
[marionette]: http://marionettejs.com/
[caseformarionette]: http://benmccormick.org/2014/12/02/the-case-for-marionette-js/
[mvvm]: http://en.wikipedia.org/wiki/Model_View_ViewModel
[marionettetodo]: https://github.com/tastejs/todomvc/tree/gh-pages/examples/backbone_marionette
[marionetteexplained]:http://benmccormick.org/tag/marionette-explained/
[stickit]: http://nytimes.github.io/backbone.stickit/
