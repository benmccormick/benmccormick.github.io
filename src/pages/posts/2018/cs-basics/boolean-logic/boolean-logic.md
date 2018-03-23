---
title: "Front End Computer Science Basics: Boolean Logic"
date: "2018/03/22"
layout: "post"
path: "/2018/03/22/cs-basics-boolean/"
description: "Breaking down a math concept at the center of programming"
keywords: "boolean computer science JavaScript"
category: "computer-science"
topics: ['Computer Science', 'JavaScript']
key: "cs-basics-boolean"
readNext: "cs-basics-variables,cs-for-fe,ten-things-js"
isDraft: true
---

*This is the second post in a series of posts on Computer Science basics for front end developers.  The goal is a practical focus on the practical implications of basic CS theory for JavaScript development.*

Modern programmers owe a lot to the efforts of many head in the sky theoretical mathematicians from the 1800s and early 1900s who were searching for mathematical truths and ended up making discoveries that serve as the basis of many modern computing inventions.  Boolean Algebra is one of a few branches of mathematics that was developed for purely theoretical reasons that has ended up shaping the computer revolution.  It fortunately has the virtue of being a relatively approachable to mathematical newbies.

Boolean algebra is a study of operations on logical values. Or in more understandable language, it is studying the rules of logic when we're limited to dealing with only 2 types of values, true or false.  The basic building blocks of boolean algebra are incredibly simple: in addition to the true and false values, usually encoded as 0 for false and 1 for true, boolean algebra considers 3 basic operations:

- the "AND" operator `∧` - `a∧b` is true if and only if `a` and `b` are both true.
- the "OR" operator `∨` - `a∨b` is true if at least one of `a` or `b` are true and false otherwise.
- the "NOT" operator `¬` - `¬` is a unary operator, it only affects a single value.  `¬a` is true if a is false, and false if a is true.

Of course this is a whole field of mathematics, so the interesting part comes as you start combining these pieces.  Mathematicians have discovered many "laws" that apply to boolean logic.  Some of these will probably look familiar to those of you who took high school algebra.  Here's a sample of the laws from [Wikipedia](https://en.wikipedia.org/wiki/Boolean_algebra).

![Boolean logic laws](boolean-laws.png)

The last 3 especially are worth remembering.  Taking them out of mathematical notation for a second and using pseudocode instead, the rules are:

- Double Negation: `not not x == x`
- De Morgan 1 `(not x) and (not y) === not (x or y)`
- De Morgan 2 `(not x) or (not y) === not (x and y)`

### Boolean Algebra in JavaScript

For most JavaScript developers, the preceding description of boolean algebra probably seemed suspiciously familiar.  It turns out that JavaScript has all the base units of boolean algebra in it's core language.  True and false are represented by the appropriately named boolean primitives `true` and `false`.  AND, OR, and NOT are represented by `&&`, `||` and `!` respectively.

![mapping of operators between pseudocode, mathematical and JavaScript notation](boolean-mappings.png)

So a JavaScript statement like

```javascript
let x = false;
let y = true
if(x && y) {  // false
  willNeverHappen();
}
```

is equivalent to `x∧y` in boolean algebra notation.  But this being JavaScript, there are some quirks and things to know about.  

First of all it's worth noting that boolean logic in JavaScript is lazy by default.  That means that JavaScript will only evaluate enough of a boolean expression to know what the result will be.  So in an expression like this:

```javascript
let alwaysReturnTrue = () => true;
let alwaysReturnFalse = () => false;
let value = alwaysReturnFalse() && alwaysReturnTrue();
```

the function `alwaysReturnTrue` will never be called.



### Truthy and Falsy

- everything can be cast to a boolean

### Implications and Hacks

1. Complex if statement refactoring
2. Shortcut && operators
3. !! for casting
4. 0s are dangerous
