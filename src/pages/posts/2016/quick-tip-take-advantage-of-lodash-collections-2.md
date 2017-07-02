---
title: "Quick Tip: Take advantage of lodash collections"
date: "2016-06-26 21:27:55+00:00"
layout: "post"
path: "/2016/06/26/quick-tip-take-advantage-of-lodash-collections-2"
description: "A quick look at the benefits of using lodash collection methods"
keywords: "lodash javascript collections arrays"
category: "frameworks"
pageViews: "557"
last30pageViews: "8"
---

One of the more frustrating things about using JavaScript in the browser is the number of different collection types that you need to deal with.  When using native APIs and 3rd party libraries, it's easy to encounter 3 or more different types of collections, including [NodeLists][nodelist], [HTMLCollections][htmlcollection], [jQuery Objects][jqobjects], and plain arrays.

```javascript
let a = document.querySelectorAll('div')
a instanceOf NodeList //true

let b = document.getElementsByTagName('div')
b instanceOf HTMLCollection //true

let c = $('div')
c instanceOf jQuery // true

let d = ['button1', 'button2', 'button3'].map(id => document.getElementById(id));
d instance of Array //true
```

This ends up mattering in practice because not every function that is available on Array is available on NodeList, HTMLCollections, and jQuery objects.

```javascript
let ids = document.querySelectorAll('div').map(el => el.id)
// Uncaught TypeError: document.querySelectorAll(...).map is not a function

ids = document.getElementsByTagName('div').map(el => el.id)
// Uncaught TypeError: document.getElementsByTagName(...).map is not a function

let numDivs = $('div').reduce((count, el) => count + 1, 0);
// Uncaught TypeError: $(...).reduce is not a function
```

Since we can't use native array methods on these alternate collections, we end up having to be very careful about knowing where we've retrieved data from, and how to convert those collections or how to work around their limitations.

It's useful to know about these distinctions, but in practice dealing with them is a pain.  One of the nice properties of [lodash](https://lodash.com/docs) is that it abstracts over these incompatibilities.  

```javascript
let ids = _.map(document.querySelectorAll('div'), el => el.id);
// ['container', 'left-box', 'right-box']

ids = _.map(document.getElementssByTagName('div'), el => el.id);
// ['container', 'left-box', 'right-box']

let numDivs = _.reduce($('div'), (count, el) => count + 1, 0));
// 3
```

For methods that iterate over a collection lodash treats all array-like objects (essentially anything with a length property) the same and iterates over their numerical properties from 0 to length-1.  This provides a nice consistency when working with DOM APIs and removes the mental overhead from managing their inconsistencies.  

[nodelist]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
[htmlcollection]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
[jqobjects]: https://learn.jquery.com/using-jquery-core/jquery-object/
[lodashvs]: http://benmccormick.org/2014/11/12/underscore-vs-lodash/
