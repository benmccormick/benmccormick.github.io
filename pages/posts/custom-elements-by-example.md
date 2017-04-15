---
title: "Custom Elements By Example"
date: "2014-08-28 12:33:00+00:00"
layout: "post"
path: "/2014/08/28/custom-elements-by-example"
category: "platform"
description: "Explaining Custom Elements and the Web Components spec"
key: "custom-elements-example"
readNext: "component-based-dev"
pageViews: "2961"
last30pageViews: "103"
---

The best attribute of HTML is its ability to be simultaneously machine-readable and human-readable.  I'd argue that it's one of the biggest reasons for the web platform's success. Anyone can  “view page source” and have some understanding of what they're seeing.  Javascript based “Single Page Applications” have undermined this a bit.  Now the original HTML of a page may just be an empty body tag, and even when you inspect the generated page, it will probably just be a sea of div tags.

That's going to start changing in the near future.  Custom Elements, part of the [Web Components spec][wcspec], are a way of bringing back the semantic web.  They allow you to encapsulate HTML and Javascript functionality into "elements" which you can include in your HTML like any existing native element, with all their semantic benefits.   The best part? They're [usable in production now][telerikready].

### So What does it look like to use custom elements?

Talking about this stuff is great, but this is an API for shippable code, not just an abstract spec. So let's look at a simple example.  In a past job, I made pretty extensive use of the [jQuery UI][jqueryui] widget library.  jQuery UI is great, but I always found it a bit akward to work with in practice. When it's used, it takes an existing HTML Element, usually a `<div>` and transforms it into a widget.  That means that to understand the end result created by the widget code, you have to look in at least 2 places, the original HTML code that contained the transformed element, and the JavaScript code that contained the call. It creates mental overhead knowing that you always had to remember to widgetize the dom element when it's rendered. It also means accepting that the final result of the widget might look significantly different than the original.  For instance, here's the before or after for the progress bar widget.  I chose it for it's simplicity, but you can see that the final result is barely recognizable from the source.



![source -> display](/posts/images/code_comparison-1.png)

This seems like the perfect opportunity to use a custom element.  If we can encapsulate all that behavior, we'll be able to ensure that the progress bar is always rendered when it appears, and we can hide any ugly transformed DOM elements underneath a shiny semantic element.  Sounds great! So let's see how this works.

To start, we need an object to serve as our progress bar element's prototype.  It should inherit from the base *HTMLElement* class. We can create the prototype object like this:

```javascript
var ProgressBar  = Object.create(HTMLElement.prototype);
```

Now that we have our Prototype element, we can register it as a custom element using the `document.registerElement` API. For now this is only natively available in Chrome, but it's quite reasonable to [polyfill][polyfill]. `registerElement` accepts 2 arguments: the name of the element<sup id="fnref:1">[1](#fn:1)</sup>, and an optional second argument to allow you to specify a prototype for your element.  So let's set up a `progress-bar` element:

```javascript
document.registerElement('progress-bar',{
  prototype:ProgressBar
});
```

Our `ProgressBar` object will now serve as the prototype for the `progress-bar` element.  That means we can extend it and give it extra functionality which will then be available on every instance of that element.  Besides allowing us to attach arbitrary properties or functionality to an element, this lets us hook into the "lifecycle callbacks" of HTML Elements, which you can see in this chart from [HTML5Rocks][html5rocks]:

<table class="table">
  <thead>
    <tr>
      <th>Callback name</th>
      <th>Called when</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>createdCallback</td>
      <td>an instance of the element is created</td>
    </tr>
    <tr>
      <td>attachedCallback</td>
      <td>an instance was inserted into the document</td>
    </tr>
    <tr>
      <td>detachedCallback</td>
      <td>an instance was removed from the document</td>
    </tr>
    <tr>
      <td>attributeChangedCallback(attrName, oldVal, newVal)</td>
      <td>an attribute was added, removed, or updated</td>
    </tr>
  </tbody>
</table>

Let's start by looking at createdCallback.  Since this gets run when the element is first created, this is a great time to run any initialization code that doesn't require the element to be present in the DOM yet.  Since jQuery UI's progress bar code doesn't require the element to be attached to the DOM, we can do all of our initialization here.  That could look something like this:

```javascript
ProgressBar.createdCallback = function() {
  var bar = $('<div id="bar">').progressbar({
    value:+this.getAttribute('value') || 0
  });
  $(this).html(bar);
};
```
So using jQuery, we create a new div element and immediately transform it into a progressbar object. Then we attach it inside our custom element container. Pretty straightforward.

Note that we set the value of our progress bar from the *value* attribute of our element.  HTML attributes provide a very convenient "public API" for Custom Elements.  You have complete access to an elements attributes inside these callbacks, allowing for easy declarative APIs. In the case of our simple progress bar, `value` is the only attribute we care about, and other attributes are ignored.

But what if the value of our element changes?  Attributes aren't a one time only API.  If we want to react to changes in the attribute, we can use the aptly named *attributeChangedCallback.*  That callback fires everytime an attribute changes, allowing us to catch the change and respond appropriately.  A more sophisticated element might contain a registry of callbacks for different elements, but for this example we can focus on changes to value.

```javascript
ProgressBar.attributeChangedCallback = function(attrName, oldVal, newVal) {
  var $bar;
  if(attrName === 'value') {
    $bar = $(this.getElementById('bar'))
    $bar.progressbar('value',+newVal);
  }
}
```

And that's it! We now have a working `progress-bar` element, that we can put anywhere in our HTML with no extra js configuration.

<p data-height="257" data-theme-id="8140" data-slug-hash="cFyep" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/ben336/pen/cFyep/'>Custom Elements Progressbar Example</a> by Ben McCormick (<a href='http://codepen.io/ben336'>@ben336</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Of course there is plenty more we could do.  A more complicated element might require some initialization to be moved to the `attachedCallback`, and might require better cleanup using the `detachedCallback`.  For communication with the rest of our app that didn't fit well into the "changing attributes" model, we might need to implement an eventing system or global registry for accessing data.  But those are all additions on this basic, useful building block.

If you're interested in trying out custom elements, there's never been a better time to get started. It's easy to try out proof of concepts in Chrome, and there's a [light-weight polyfill][polyfill] with support back to IE9 for those who want to start using them in production.  If this is something that excites you, there's no reason not to start using this tool in your code today.

### More Resources

- HTML5Rocks has an awesome [detailed look][html5rocks] at Custom Elements that covers all of the ground we looked at here, and more.  If you want to dive deeply into this feature, it's a great read to get started.
- Telerik posted another [great piece][telerikready] on this topic a few weeks ago, which focuses more on the case for Custom Elements being production ready now
- If you're interested in using more than just Custom Elements, [The Polymer Project][polymer] by Google is an ambitious library built around the Web Component spec.  They attempt to polyfill the whole spec, then wrap convenience functions around the low level elements.  It's an interesting, ambitious project, though not yet ready for production.


<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        The Web Components spec specifies that valid names should be in the form of 2 words separated by a hyphen in order to avoid conflicts with existing and future "official" HTML elements.
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>


[wcspec]: http://www.w3.org/standards/techs/components#w3c_all
[components]:http://benmccormick.org/2014/08/07/component-based-development/
[telerikready]: http://developer.telerik.com/featured/web-components-ready-production/
[jqueryui]: http://jqueryui.com/
[polyfill]: https://github.com/WebReflection/document-register-element
[html5rocks]: https://github.com/WebReflection/document-register-element
[polymer]: http://www.polymer-project.org/
