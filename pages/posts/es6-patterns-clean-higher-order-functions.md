---
title: "ES6 Patterns: Clean Higher Order Functions"
date: "2015-11-30 05:06:03+00:00"
layout: "post"
path: "/2015/11/30/es6-patterns-clean-higher-order-functions"
category: "javascript"
description: "A quick tip for clean functional syntax in ES6"
key: 'clean-higher-order-functions'
readNext: ['ecma-explanation', 'callbacks-to-promises', 'what-are-hocs']

---

<div class="explanation">
I've been writing code using the new features defined in the ECMAScript 2015 version of JavaScript (<a href="http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/">more commonly known as ES6</a>) since January.  Throughout the year I've seen myself start using a few new patterns that I think make my code better.  I'm going to share them here with a few quick hitter articles, starting with a simpler way of writing higher order functions
</div>


A higher order function is a function that either

1. Takes another function as an argument or

2. Returns a function when called

Although many people have never heard of them, higher order functions are a key part of JavaScript development and something that most JavaScript developers will encounter every day, whether they know the term or not.  jQuery, Underscore, and many other JavaScript libraries are built on higher order functions.  Many of the core JavaScript APIs, like map, filter, forEach, and setTimeout are functions that take functions as arguments.  If you're not comfortable with these patterns, learning about them can help you understand the JavaScript ecosystem better.  Hopefully this article will pique your interest.

For this pattern, I'll be focused on the second class of higher-order functions, functions that return other functions.  They can be useful in a variety of cases.  As an example, let's consider a blog commenting application with a list of users.  Our task is to get a list of comments for each user.  We can do that with the builtin `map` and `filter` functions and a simple helper function like this.

```javascript
import { commentList } from './comments';

function getCommentFromUser(userId) {
    return {
        user: userId,
        comments:commentList.filter(function (comment) {
            return comment.user === userId
        },
    };
}

let userIds = [1, 4, 5],
    userComments = userIds.map(getCommentFromUser);

//do stuff with comments
```

We've now written some simple, working code.  We take a list of user ids and return a list of users with the ids mapped to their comments.  Everything is fine, and we can move forward to do things with the comments.  If we don't need to maintain this code base, we could probably stop here.

The problem is, while this example works for the simple case, it isn't very flexible.  We pull the comments directly from a single source that we've made available to all of the code in our module.  We can't add any additional filters on the comments used or pull comments from additional sources without rewriting our mapping logic. If we decide we only want comments that were written in the past year for instance, we'll need to rewrite our function or mutate commentList in a way that could effect code in the rest of the file. That feels pretty sloppy, since mapping comments to users should be unrelated to determining what comments we're including in our groupings.  Fortunately we can solve this using a higher order function.  If we rewrite the code so that `getCommentFromUser` takes a list of comments and returns a function that takes an id, we can then control exactly what comments are included in the grouping.  For now we'll leave our full list, but it could be rewritten later to be a filtered list or to pull comments from multiple sources, without re-writing this logic.


```javascript
import { commentList } from './comments';

function getCommentFromUser (comments)
    return function (userId) {
        return {
            user: userId,
            comments: comments.filter(function (comment) {
                return comment.user === userId
            },
        };
    }
}

let userIds = [1, 4, 5],
    userComments = userIds.map(getCommentFromUser(commentList));

//do stuff with comments
```

Our code has gotten much more flexible, but at the cost of readability.  Most developers without significant functional programming experience will have to look twice at the 4 levels of nesting and multiple return statements in our helper function definition to understand what is going on.  We've added significant boilerplate in a way that muddies up the meaning of our function, when all we're really trying to do is provide a way to make the comments list used in the function configurable.  That is extremely "beginner-unfriendly".  At the same time using higher order functions like this is a useful pattern that serves a real need in the design of our application.  Fortunately, ES6 gives us the opportunity to clean up our syntax.  

ES6 provides "arrow functions", a shorthand for functions that have 2 main differences from the JavaScript `function` keyword.  First, they don't bind a `this` value as a context, instead using the `this` of the parent scope.  Secondly, they can be written inline, with no parentheses and an implicit return.  So you can write a squaring function as `const square = (x) => x * x;`.  The first property of these functions has many consequences that have been covered in depth elsewhere around the internet.  But when writing non object oriented functions that don't use `this` like our example above, it is mostly not relevant.  In this case though, the cleaner syntax that arrow functions provide allow us to write a clear and clean higher order function to solve our use case.  With arrow functions, our example from above now looks like this.

```javascript
import { commentList } from './comments';

const getCommentFromUser = (comments) => (userId) => ({
    user: userId,
    comments: comments.filter( (comment) => comment.user === userId),
})

let userIds = [1, 4, 5],
    userComments = userIds.map(getCommentFromUser(commentList));

//do stuff with comments
```

I like to call the `() => () =>` pattern a "double function", and have found it popping up all over the code I write since I began using ES6, especially when I'm using `map`, `filter`, and `reduce`.  Array transformations using those functions often require contextual information beyond the contents of the array.  A naive approach to this would involve having the function reference variables in the outer scope directly, like we did with commentList above.  More commonly that happens when a user inlines a function inside of a `map` call and references variables in the parent scope.  I've found that it is much clearer and less error prone to use a higher order function that takes only the variables that are needed for the transformation in, and returns a new function that can be used for the transformation.  This reduces the number of things that can effect the output of the function, allows for greater configurability without directly changing the transformation logic, and makes it clear to readers what values are expected to be used in the function.  Double functions make this easy, and they've easily been one of my favorite new code patterns with ES6.  


### More Resources

- If you're interested in higher order functions and JavaScript, I know of no better reference than [JavaScript Allongé][allonge].  It's a fantastic deep dive into the JavaScript language with a functional flavor, building understanding from the bottom up and providing many ideas for code recipes along the way.  And it's recently been rewritten to reflect the changes to the language that ES6 brought.
- Here's a nice [deep dive on arrow functions at 2ality][2ality] by Axel Rauschmayer.  If you haven't seen his blog, it's a fantastic reference on ES6 and JavaScript in general


[esversions]: http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/
[allonge]: https://leanpub.com/javascriptallongesix
[2ality]: http://www.2ality.com/2012/04/arrow-functions.html
