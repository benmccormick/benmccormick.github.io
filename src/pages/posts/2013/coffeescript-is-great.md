---
title: "Coffeescript Is Great"
date: "2013-02-23T23:50:00+00:00"
layout: "post"
path: "/2013/02/23/coffeescript-is-great"
category: "javascript"
pageViews: "1024"
last30pageViews: "0"
---

This past week I decided to try and learn more about [Coffeescript][coffeescript] by converting a side project I've been working on to use Coffeescript and LESS.  I really enjoyed the experience of working with Coffeescript and hope to use it more in the future. I thought I'd share a quick post about my experience, and outline what I see as the advantages and disadvantages.

### What is Coffeescript?

[Coffeescript][coffeescript] is a programming language with a Ruby-like syntax that compiles transparently into readable, best-practice Javascript.  To break that down:

#### It's a language with Ruby-like syntax
Coffeescript features a short concise syntax with significant whitespace, short operators for many common actions, and syntax that encourages a pseudo-english style of coding.  For instance `if empty page then fill page else read page` would be valid syntax for calling a function `empty()` on an object `page` and then calling the `fill` method on it if it was empty or the `read` method if it was not.

#### It compiles to readable best-practice Javascript
The coffeescript compiler generates Javascript that is easy to read and avoids common pitfalls like unexpected casting with the `==` operator.

#### It compiles transparently
The generated javascript also matches up in a 1-1 relationship with the coffeescript source, so it's still easy to debug and understand what coffeescript is related to the associate Javascript.  I'm also excited to try out the [Coffeescript source maps][sourcemaps] for Chrome and bypass this issue completely by debugging directly on the Coffeescript, but haven't had the opportunity to set this up yet.

### What I like about Coffeescript

#### It's super concise
I love writing short code.  Brevity and readability aren't __exactly__ the same thing, but they often overlap, and it's usually easier to debug code when there's less of it, all things being equal.  Coffeescript allows you to write less boilerplate.  An easy example is checking whether an element exists. Compare the JS implementation below to the equivalent Coffeescript.

```javascript
if(el !== null && typeof el ?== 'undefined'){
    //do something with el
}
```

```coffeescript
if el?
  #do something with el
```

#### It doesn't look like Java

This is a bit counterintuitive coming from a guy who learned programming through Java and has never written a line of Ruby, but I think Javascript's "Java-like" conventions are usually detrimental.  It has curly brace blocks, but not block level scope. It has constructors but not classical inheritance.  It's possible to write valid code that looks exactly like Java in Javascript, and not understand why the behavior is slightly different than you expect.  Coffeescripts syntax feels less likely to lead you down a bad road.

#### It avoids the "bad parts" of Javascript

Javascript has some "features" that cause more problems than they're worth, including the `==` operator, automatic semicolon insertion, and the `with` statement.  Coffeescript either avoids these parts completely, or helps the programmer navigate them without having to think about it.  So you can still write your while statements by dropping into normal Javascript code if you must, but Coffeescript won't make it easy.

### What I didn't like so much

#### Debugging is slower

While it's certainly much better than it could be due to the transparent compilation, debugging in coffeescript still means that you're debugging a "product" of your code, not the code itself.  That level of abstraction has a cost.  That cost will vary depending on your experience, code style and tooling (certainly source maps have potential to minimize it), but it will exist, and it needs to be factored in to any language decisions.

#### Function Parameters without Parentheses

Coffeescript lets you write function parameters without parentheses.  While this allows the cute **sentence-like** one liners that they demonstrate on their website, in practice I've found it to really hurt readability.  It's often not clear where the function begins and ends, especially if you're nesting function calls.  Coffeescript is also not consistent in how it applies these rules, because in some cases you DO have to use parentheses.  When declaring a function you must use parentheses if there are 1 or more arguments.  When calling a function you must use parentheses if there are no arguments.    I've found that I struggle to read function calls if there are more than 1 parameters without parentheses.  As a result I've used parentheses everywhere there is one or more parentheses, and for now on I'm planning on including them even for single param functions just to be consistent.

### Conclusions

I'm very glad I tried Coffeescript.  I think it definitely has its place as a concise syntax on top of Javascript that especially makes sense for larger projects where the investment in adjusting to it will pay off over time.  I overall think it adds readability and maintainability from Javascript, though it is by no means perfect in either area.  I'm excited to see what happens with this language going forward.

---

### Further Reading

- [The Case Against Coffeescript][caseagainst] - a good roundup of some valid criticisms of Coffeescript, especially with regard to readability

- [Interactive Coffeescript Compiler][compiler] - If you want to mess around with Coffeescript, their website has an interactive compiler that translates your Coffeescript to Javascript side by side.  There is also a full tutorial breaking down the languages syntax.


[coffeescript]: http://coffeescript.org/
[sourcemaps]: http://ryanflorence.com/2012/coffeescript-source-maps/
[caseagainst]: http://ryanflorence.com/2011/case-against-coffeescript/
[compiler]: http://coffeescript.org/#try:alert%20%22Hello%20CoffeeScript!%22
