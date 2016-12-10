---
title: "Unexpected Javascript: That Doesn't Do What You Think"
date: "2013-01-15 23:30:00+00:00"
layout: "post"
path: "/2013/01/15/unexpected-javascript-that-doesnt-do-what-you-think"
pageViews: "731"
last30pageViews: "1"
---

When I started writing Javascript, I encountered a lot of stuff that was just plain weird.  Stuff didn't act the way I expected, syntax seemed misleading, and some behavior just seemed completely wrong.  I have a better understanding now and have come to appreciate Javascript for the quirky but stable language that it is once you know the rules.  But just for fun, here are some examples of assumptions that its easy to make when looking at Javascript for the first time.  All of the following statements are wrong (at least in some cases).  See if you know why.  And feel free to contribute more in the comments!


### Equality Problems

- `0.1+0.2 === .3` is true [^1]
- `10000000000000001+20000000000000000 === 300000000000000001` is true [^2]
- ` x === x ` is true for all values of x [^3]
- `"1.0e0" == {valueOf: function(){ return true;}};` is false [^4]
- if `x==y` and `x==z` then `z==y` [^5]
- `parseInt('016') === 16` is true. [^6]

### Environment Concerns

- `window` will always be available as a global variable [^7]
- Javascript will always be enabled on your web page [^8]
- If it works in firebug it will work in the browser [^9]

### Code Structure

- You don't need to add semicolons in javascript, they're inserted automatically [^10]
- I always add semicolons, so I don't need to know about how they're inserted [^11]
- The var keyword is unnecessary, variables are created just by referencing them. [^12]
- `return eval("x")` is the same as `var a = eval; return a("x");` [^13]
- Functions are the only thing in Javascript that restrict scope.  [^14]

### Function Issues

- I will always know what `this` is when the function is run [^15]
- You can get the last argument of the function using `arguments.pop()` [^16]
- The following will generate different names and alerts for each link: [^17]

```javascript
function addLinks () {
  for (var i=0, link; i<5; i++) {
    link = document.createElement("a");
    link.innerHTML = "Link " + i;
    link.onclick = function () {
        alert(i);
    };
    document.body.appendChild(link);
  }
}
```

-  The following function will return 1: [^18]

```javascript
(function f(){
    function f(){ return 1; }
    return f();
    function f(){ return 2; }
  })();
```

- The if statement code can be removed here with no side effects: [^19]

```javascript
function testf(){
  x=3;
  if(false){
    var x=5;
  }
}
```

#### Explanations here:



[^1]: Actually comes to 0.30000000000000004 See [here][floatingpoint]

[^2]: Loses the trailing 1 due to limits of [floating point numbers][floatingpoint]

[^3]: It turns out that `NaN === NaN` is false

[^4]: Both values get cast to 1 by the [== operator][eqeq]

[^5]: '' == '0' is false, 0=='' is true, as is 0 =='0'

[^6]: Prior to ECMAScript 5, strings with leading 0s were interpreted as Octal Notation.  This is resolved in newer browsers, but IE8 and other older browsers still show this behavior.

[^7]: Window is a browser construct.  It may not be available in all JS environments (for instance, it is not available in Node.js)  Unless you know exactly where your code will be run, be careful

[^8]: Especially in government situations, security conscious users may disable javascript.  Even if the user is able to enable JS, it may be disabled by default.  You can prepare your site for this.

[^9]: This is not always accurate.  Firebug executes in eval context, [and that may lead to strange behavior ][deletebreakdown].

[^10]: There are some cases when a JS parser may unexpectedly concatenate 2 lines you didn't intend.  This is particularly an issue when the next line begins with an arithmetic operator or a `(`, as is the case for immediately invoked function expressions.  You can see an example with [this fiddle][semicolonfiddle]

[^11]: You can still be burned by automatic semicolon insertion even if you don't want to take advantage of it.  The classic example is that Javascript will automatically insert a semicolon after `return` if you put the value to be returned on a new line, something that may happen often if you're returning a new object and like to start your curly braces on a new line.

[^12]: This is more of a beginner assumption.  Undeclared variables are automatically set as global variables and can cause plenty of problems if you don't understand this.

[^13]: Strangely, Javascript differentiates between direct calls to eval and indirect calls. You can read more on this [StackOverflow Question][SOeval]

[^14]: This is admittedly an edge case, but catch statements of try...catch blocks also restrict scope, and the `with` statement also modifies the scope, in a different way.  `with` is not recommended

[^15]: Even methods of an object can be called by another object with Javascript's call and apply functions.  The only way to guarantee that the correct value of this is used is to use [Javascript's bind function][bindmdn]

[^16]: `arguments` is not a real array.  It is array-like, in that it has a length value, and has integer properties that it accepts.  But you can't run normal array arguments on it without converting it to an Array object.

[^17]: This is the classic example of improper closure behavior.  I got this example from [this article][closures], where you can read more.

[^18]: Function declarations are hoisted to the top of the function.  Therefore both versions of f are defined, and the second one overrules the first, before f is called and return

[^19]: More variable hoisting.  In this case the var x declaration is hoisted to the top of the function, even though the assignment can never be executed.  This has the effect of making the variable local to the function rather than global, which is potentially very significant.  You can see the difference in this [jsFiddle][hoistingfiddle]/


[floatingpoint]: http://stackoverflow.com/questions/588004/is-javascripts-floating-point-math-broken
[eqeq]:http://stackoverflow.com/questions/359494/javascript-vs-does-it-matter-which-equal-operator-i-use
[closures]: http://robertnyman.com/2008/10/09/explaining-javascript-scope-and-closures/
[jsquiz]: http://perfectionkills.com/javascript-quiz/
[hoistingfiddle]: http://jsfiddle.net/H4bCx/
[deletebreakdown]: http://perfectionkills.com/understanding-delete/
[semicolonfiddle]: http://jsfiddle.net/2XSCk/
[SOeval]: http://stackoverflow.com/questions/9107240/1-evalthis-vs-evalthis-in-javascript
[bindmdn]:https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind

