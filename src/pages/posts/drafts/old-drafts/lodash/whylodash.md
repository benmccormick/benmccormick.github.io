---
title: "Lodash WIP"
date: "2018/09/17"
layout: "post"
path: "/2018/09/17/lodash-wip/"
description: "Lodash wip"
keywords: ""
category: "software-productivity"
topics: []
key: "lodash-1"
isDraft: true
readNext: "feedback-loops,ten-things-js,react-confessions"
---
# Diving Into lodash

For the next few weeks, I'm going to be writing about one of my favorite libraries, [lodash][lodash].  lodash is a utility library, a collection of helpful functions for common small operations.  Over the following posts, I'm going to be walking through the whole API of lodash v4, and hopefully giving some new ideas on how each part might be useful to you.  Before that starts though, a quick word on why utility libraries in general and lodash in particular are a good idea.

#### Utility libraries can provide better developer ergonomics

Many of the functions that lodash provide have some equivalent in the JavaScript base language.  For instance `_.filter`, `_.map`, and `_.forEach` may seem redundant due to the widely supported `Array.prototype.filter`, `Array.prototype.map` and `Array.prototype.forEach`.  And its east to ask why lodash has `_.parseInt` when JavaScript provides a native `parseInt`.  In general redundancies like this in lodash are for 1 of 3 reasons: compatibility (covered below), better ergonomics for common use cases, or to overcome usability problems in the native API.

`_.filter` and its compatriots are a good example of improving the experience of using a native API for common use cases.  Let's say we have a list of movies that we want to allow the user to filter by release year. The movie data looks something like this:

```json
{
    name: 'The Dark Knight',
    director: 'Christopher Nolan',
    studio: 'Warner Bros',
    releaseYear: '2008',
    gross: 533316061,
    runtime: 152,
}
```

Our movie lists are split by studio, so we also need to filter by studio, and make sure it matches the current studio.  Using `Array.prototype.filter` that looks like this:

```javascript
const onFilterChanged(newFilterValue, currentPage) => {
    this.moviesToShow = this.moviesList.filter(movie => {
        return movie.releaseYear === newFilterValue && movie.studio === currentPage;
    });
};
```

with lodash we can take advantage of an alternate declarative syntax for the common case of matching on specific properties for filtering.

```javascript
const onFilterChanged(newFilterValue, currentPage) => {
    this.moviesToShow = this.moviesList.filter({
        releaseYear: newFilterValue,
        studio: currentPage,
    });
};
```

We've changed what is probably the most common case for filtering from an *imperative* action where the matching logic has to be written out to a *declarative* action where we just specify an interface to match against.  This increases clarity and reduces the potential for logic errors.  It's a small gain, but the type that adds up over a large code base.

Unlike `_.filter`, `_.parseInt` doesn't add new syntax or capabilities over the native `parseInt`.  So why does it exist?  It turns out that JavaScript's native API choices have occasional unfortunate consequences.  One of the more interesting bad situations you can create is by trying to mix `map` and `parseInt`.

```javascript
var list = ['10', '10', '10', '10', '10'];
list.map(parseInt) // [10, NaN, 2, 3, 4]
```

Wait what??  It turns out that `parseInt` accepts 2 arguments: a value to parse, and a radix, which determines what base to interpret the number as.  If radix is 0 or undefined, `parseInt` defaults to base 10 (or 16 for hexadecimal numbers).  Meanwhile, `map` always passes 3 arguments to the functions that it calls: value, index and the original array.  So when it is used with parseInt, the index becomes the radix value, resulting in the mess you see above.  `_.parseInt` maintains spec compliant behavior, but adds an additional check; if _.parseInt is passed a 3rd argument, it ignores the radix value and reverts to the default, thus catching the `map` edge case without effecting normal use.

This might seem like a tiny edge case, but the real value that lodash is providing is preventing you as a developer from needing to know every detail and sinkhole in the JavaScript spec and browser implementations.  Instead you're free to focus on your application and it's business logic.  lodash will handle the details and evolve over time as new traps are created or fixed.

#### Utility libraries help with compatibility

Though browser compatibility is much less of an issue than it used to be, there are still plenty of traps out there.  Let's say we want to merge 2 contact objects that we've identified as being the same user:

```javascript
let contact1 = {
    firstName: 'John',
    lastName: 'Smith',
    phone: '919.965.9999'
};

let contact2 = {
    firstName: 'John',
    email: 'john.smith@gmail.com',
};
```

In modern browsers, this is fairly straightforward.  We can use [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to merge the 2 contacts.

```javascript
//create new merged contact object
let newContact = Object.assign({}, contact1, contact2);

//update contact1 to contain the merged contact information
Object.assign(contact1, contact2);
```

Unfortunately, while ubiquitous in modern browsers, Object.assign can't be counted on without a polyfill.  If you have to support Internet Explorer or Safari 8 and don't use a polyfill, the code gets ugly fast.

```javascript
//create new merged contact object
var newContact = {};
var keys1 = Object.keys(contact1), keys2 = Object.keys(contact2);


keys1.forEach(function(key) {
    newContact[key] = contact1[key];
});

keys2.forEach(function(key) {
    newContact[key] = contact2[key];
});

//update contact1 to contain the merged contact information
keys2.forEach(function(key) {
    contact1[key] = contact2[key];
});
```

lodash provides `_.assign`, which effectively serves as a replacement for Object.assign that will work in IE9+, Safari 8+, Node.js and evergreen browsers.  As with the usability examples, the issue is less that this is a huge savings or insurmountable problem, and more a security net that allows you to focus on your app rather than spending all your time on [caniuse.com](http://caniuse.com/).

#### lodash is flexible, tested, and comprehensive

There are many utility libraries for JavaScript including lodash, [underscore][underscore], and [ramda][ramda].  This post is not meant to be about comparing them [^1]. But I do want to quickly point out that lodash consistently shows up as the most popular according to [npm stats](https://www.npmjs.com/browse/star).  One reason for that is its flexibility.  You can use all of lodash as a traditional namespaced library, pull in individual functions, and even use the whole library through an [alternative functional syntax](https://github.com/lodash/lodash/wiki/FP-Guide).  The fact that it is so widely used also provides the comfort of knowing that you are unlikely to be the first person to experience a bug with the library.  It is also actively maintained, with an [incredibly high level of activity](https://github.com/lodash/lodash/graphs/contributors) maintained consistently since it was forked from underscore in 2012.

### Coming Soon: A deep dive

The hard part about discussing lodash as compared to a framework like React is the diversity of what lodash does.  Most of its API methods are functions that provide incremental gains in very specific situations.  These functions are not all tightly related to each other and lodash v4 provides well over 100 methods.  This means that learning lodash is non-linear, and you can use parts of it for years without ever using other parts.  In this series I'm going to attempt to give a broad view of that API, with the hope that I'll broaden your toolbox of approaches the next time you're facing a JavaScript problem.

### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my post comparing [lodash and underscore](http://benmccormick.org/2014/11/12/underscore-vs-lodash/).

[^1]: I did do a lodash/underscore comparison a while back: <a href="http://benmccormick.org/2014/11/12/underscore-vs-lodash/"></a>


[lodash]: https://lodash.com/
[ramda]: http://ramdajs.com/
[underscore]: http://underscorejs.org/
