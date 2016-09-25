---
title: "Alternative JavaScript"
date: "2014-11-24 03:58:00+00:00"
layout: post
path: "/2014/11/24/alternative-javascript"
---

It's become a bit of a cliche that JavaScript is the "machine code of the web". But now that mobile browsers have conclusively killed Flash, Silverlight and other "plugin languages", JavaScript has become the only language that can reasonably claim to be "write once, run anywhere".  That's still a bit inflated though.  More accurately, you can use a subset of modern JavaScript that is compatible with the set of browsers and JavaScript environments that you want to support and run it in those places.  In practice this ends up being a version of JavaScript that matches the EcmaScript 5 spec <sup id="fnref:0">[1](#fn:0)</sup> for users who want to support modern browsers, or a very limited subset of the language that is somewhat similar to the ES3 spec for developers supporting old versions of Internet Explorer.  Because of the strange dynamic that the user rather than the developer of JavaScript code controls the language runtime that code uses, the JavaScript language has been forced to evolve slowly, with very few developers using the latest language features at any given time.  This, combined with a dislike of JavaScript from some developers has led to a proliferation of "compile to JavaScript" languages.

There's a problem with talking about "compile to JS" languages though.  That category groups 2 types of languages that are not especially similar.  The first type are languages that are completely different than JavaScript, which are then compiled down into JavaScript so that they can run in a web browser.  This is where the term "machine code of the web" really applies.  From the developer's point of view, the fact that the code is compiled to JS is an implementation detail, and the JavaScript that is generated is likely to be unreadable, without any clear relation to the structure of the original code. Examples of this type of "compile to JS" language include new languages created for this purpose like [Dart][dart] and [Haxe][haxe], as well as existing languages like [Clojure][clojurescript] and [Java][gwt].  The most extreme example of this has probably been [ASM.js][asmjs] and [emscripten][emscripten], which together allow developers to compile C++ code to a subset of JavaScript that browsers can optimize for performance.  This type of language is great for developers who have a strong preference in language style, or an existing codebase that they want to port to the web.

But there's a second type of "compile to Javascript" language. These are languages that embrace the structure and semantics of JavaScript and focus on providing an alternative syntax that provides some benefit.  Benefits can include better code readability, cleaner syntax for common operations,  and support for modern JavaScript features that are not yet safe to use in common browsers without a compile step.  These languages will generally compile down to readable ES5 JavaScript that can easily be matched up 1 to 1 with the original source code.  They're not intended to excuse you from learning JavaScript, instead they 're meant to smooth over the development process as you build JavaScript applications.  Examples of this second type of language include [CoffeeScript][coffeescript], [TypeScript][typescript], [JSX][jsx], [Sweet.js][sweetjs], and [Traceur][traceur].  In this post I'm going to take a look at the strengths and weaknesses of some of these alternative Javascript syntaxes, and thinking through when it's a good idea to use them.

I'll start by standing up for the much maligned vanilla ES5 JavaScript syntax.  It has advantages.  It's supported in many environments these days, including most browsers that people actually still use.  It has an incredible stable of tooling built up around it that allows for a smooth development experience.  And you can use it without jumping through any compile step hoops, or having to mentally translate the production code back to the source.  I'd argue that JavaScript sets a high bar for an alternate syntax to meet. Whether you agree or disagree with that, let's at least admit that there is a bar and that the convenience of broad support and 1-1 mapping is an advantage that any alternative has to overcome.

So what type of advantages can alternatives offer?  The different syntaxes I go through below all provide different strengths, but one mostly shared strength is that they allow you to start using some features of the newest version of JavaScript, EcmaScript 6.  ES6 brings a bunch of new features that make common development patterns easier, and looks to be a great improvement to the language.  By allowing you to take advantage of those features now, alternative syntaxes can speed up development and ease the transition into the new version of the language.  To get an idea of the more specific benefits an alternate syntax can bring, I'm going to go through 4 of the most popular syntaxes and explain why somebody would want to use them.


![coffeescript logo](/posts/images/logo.png)

CoffeeScript was the first alternative JavaScript syntax to gain popularity, and it is also one of the biggest breaks from the normal syntax.  Rewriting a simple Backbone view from the [TodoMVC project][todomvc] in CoffeeScript would look something like this.

```coffeescript
class AppView extends Backbone.View
    el: '#todoapp'
    statsTemplate: _.template $('#stats-template').html()
    events:
        'keypress #new-todo': 'createOnEnter'
        'click #clear-completed': 'clearCompleted'
        'click #toggle-all': 'toggleAllComplete'

    initialize: () =>
        @allCheckbox = @$('#toggle-all')[0]
        @$input = @$('#new-todo')
        @$footer = @$('#footer')
        @$main = @$('#main')
        @$list = $('#todo-list')

        @listenTo(app.todos, 'add', @addOne)
        @listenTo(app.todos, 'reset', @addAll)
        @listenTo(app.todos, 'change:completed', @filterOne)
        @listenTo(app.todos, 'filter', @filterAll)
        @listenTo(app.todos, 'all', @render)
        app.todos.fetch({reset: true})

    render: () =>
        completed = app.todos.completed().length
        remaining = app.todos.remaining().length

        if app.todos.length
            @$main.show()
            @$footer.show()

            @$footer.html @statsTemplate
                completed: completed,
                remaining: remaining

            filter = app.TodoFilter or ''

            @$('#filters li a')
                .removeClass 'selected'
                .filter "[href=\"#/#{filter}\"]"
                .addClass 'selected'
        else
            @$main.hide()
            @$footer.hide()

        @allCheckbox.checked = !remaining

    addOne: (todo) =>
        view = new TodoView
            model: todo
        @$list.append view.render().el

    addAll: () =>
        @$list.html ''
        app.todos.each @addOne, @

   # ... and so on
```

As you can see, Coffeescript uses Ruby and Python style significant whitespace, which gives it a very different feel than JavaScript.  But it retains the language's structure, giving it a low learning curve.  All of CoffeeScript's built in structures compile down to ES3-compatible code, so anything you write in CoffeeScript will work in any modern JavaScript environment as long as you don't use any incompatible APIs.

Coffeescript gives you plenty of niceties to help you write faster and more succinct code.  In general it's focused on taking common patterns and finding a short succinct way of representing them.  It removes some of the boilerplate from JavaScript code by replacing `function(){}` and `this.` with `() ->` and `@` respectively.  It's a small change, but giving these common patterns easily recognizable shorthand saves plenty of characters across a code base.  These aren't the only shorthands.  For instance it provides destructuring and string interpolation capabilities, allowing you to do things like this.

```coffeescript
a = "example"
b = "This is an #{a}"

[a, b] = [b,a]

# a ends up as "this is an example", b is "example"
```

It's easy to see that the EcmaScript 6 spec has been greatly influenced by CoffeeScript.  Features like classes, arrow functions, and splats/spreads are all parts of CoffeeScript that are going to be melded into the future of the language.  So why use it instead of something like Traceur which allows us to write ES6 code now?  The best answer I've seen was [this short piece][coffeescriptnotworthlearning] by Reg Brathwaite.  He argues that CoffeeScript is essentially a tool for writing good JavaScript.  The structure of the language encourages you to take advantage of JavaScript's good parts, and the compilation process is able to encode many JavaScript best practices.  CoffeeScript features don't add new capabilities to JavaScript, instead they encode accepted design patterns.

In terms of tooling, CoffeeScript has been around a while, and has built up a good base of support in the JavaScript community.  It's the recommended JavaScript syntax for Ruby on Rails projects and has wide support in the NodeJS community.  This community adoption means that many tools offer integrations for it.  You can also find some Coffeescript specific tooling.  For instance, there's a [CoffeeLint][coffeelint] tool that provides linting similar to JSHint.  CoffeeScript still doesn't have the ecosystem that basic JavaScript enjoys in this area, but it has established itself enough that most common scenarios are addressed.

**Why use Coffeescript:** You like the transformed syntax, you want concise shorthand for common JavaScript design patterns, and you want to be able to write more readable code <sup id="fnref:1">[2](#fn:1)</sup>



![TypeScript logo](/posts/images/CRS-56479.png)

TypeScript is a language created by Microsoft to provide static type checking for JavaScript.  It allows you to annotate variables with types, then validates your code when it's compiled into JavaScript. The benefits are pretty obvious.  Type checking forces you to think about the values that will get passed into functions and help you catch bad logic at compile time rather than runtime.   Static types also allow for smart intellisense-style completion.  As a Microsoft creation, this is fully supported in Visual Studio, but it's also available in other IDES like WebStorm, and there's some support for making it work in text editors like Vim and Sublime Text as well.

Although TypeScript is primarily about types, it also provides some other niceties that fit with it's theme of tools for building large JavaScript applications.  It provides classes that matches JavaScript's ES6 class syntax, and modules that can compile down to AMD or CommonJS format.  You also can use ES6 lambda functions.

Unlike CoffeeScript, TypeScript is unlikely to shorten your code.  Instead writing type definitions will likely lead to a larger code base, but one that's easier to reason about in a given context.

The TypeScript Hello World program from their site doesn't look too much different than the original Javascript.  The important thing to note is the ability to use ES6 features as well as the type annotations on functions.

```javascript

class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
};
var greeter = new Greeter("Hello, world!");
var str = greeter.greet();
document.body.innerHTML = str;
```

TypeScript was obviously built to be tool friendly, and if you're using an IDE like Visual Studio or WebStorm, they'll be able to take full advantage of that.  But the tooling around the text editors used by most JavaScript developers is less advanced.  There's a nice [community effort][tst] to build a TypeScript server that text editors can plug into for completion information and other IDE functions, similar to the way that [TernJS][tern] works.  But there's none of the official support that Microsoft has built into Visual Studio, and the lack of attention shows.  Still, the compiler itself fills many of the roles that linting tools play for normal JavaScript, and many developers interested in type safety are probably already using an IDE style editor that will provide full support.

**Why Use TypeScript:** You want static type checking as well as the option to use some ES6 syntax now.  Also a great choice if you're using an IDE and want better "intellisense" while writing code.



![Sweet.js logo](/posts/images/sweetjs-35aabaff7e0dd24e.png)

Sweet.js is a very different animal than the other syntaxes I'm covering here.  Strictly speaking it's not an alternative syntax at all.  It's a toolkit to building your own your own alternate syntax.  You do that by defining *macros*, which the compiler then loads and uses to transform your code.  For instance the example from [their website][sweetjs] shows how you can define ES6 style classes in your code.

```javascript
// Define the class macro here...
macro class {

  rule {

    $className {
        constructor $cparams $cbody
        $($mname $mparams $mbody) ...
    }

  } => {

    function $className $cparams $cbody

    $($className.prototype.$mname
      = function $mname $mparams $mbody; ) ...

  }

}

// And now classes are in JavaScript!
class Person {
  constructor(name) {
    this.name = name;
  }

  say(msg) {
    console.log(this.name + " says: " + msg);
  }
}
var bob = new Person("Bob");
bob.say("Macros are sweet!");

```

Sweet.js basically removes limits in terms of what your JavaScript syntax looks like.  If you can programatically define a syntax, you can use it.  And because Sweet.js macros are hygienic you can have confidence that you can use them without side effects.  This means that you can wipe away boilerplate, hiding it behind a new operator or keyword.  The modular nature of macros is also a big plus.  Rather than being locked into a syntax and set of capabilities <sup id="fnref:2">[2](#fn:2)</sup>, using macros allows you to mix and match the syntax you need.

Relative to the other languages on this list though, Sweet.js lacks a lot of the benefits of a community standard. Any macros you write will only be documented to the extent you document them, and while you can run linting tools on the output, pretty much any other tooling out there, including basic stuff like syntax highlighting, is likely to be unable to parse the non-standard syntax created by macros.

**Why use Sweet.js:** You want your JavaScript syntax to work in a very specific way, and none of the existing options appeal to you, or you find yourself writing a lot of repetitive boilerplate that you can remove with a syntax change.


![Traceur logo](/posts/images/68747470733a2f2f676f6f676c652e6769746875622e636f6d2f747261636575722d636f6d70696c65722f6c6f676f2f74632e737667.svg)

The last alternate syntax that I'm going to be going in depth on is a bit different, because it's technically just JavaScript syntax.  But it's a form of JavaScript syntax that's not supported everywhere yet.  [Traceur][traceur] is a project by Google that allows you to write code that's valid in EcmaScript 6, and transpile it down into browser-compatible ES5 JavaScript.  Effectively it's tomorrow's JavaScript a bit early.  This has some obvious advantages.  First, it will eventually obsolete the compile step as all of the features of ES6 will be supported in browsers someday, and the changing world of browser release policies seem likely to make that sooner than you might expect.  Secondly, tools and other support around ES6 is shaping up nicely, and it's guaranteed to get better, because this is just JavaScript.  It's the future of the web platform.

The case against using Traceur?  Besides the repeated themes of weaker tooling and an additional build step, Traceur simply doesn't offer as much as the other syntaxes mentioned here.  It doesn't significantly change the feel of the language like CoffeeScript, provide any clear new features like Typescript, or offer the flexibility of Sweet.js.  In the end it's "just Javascript", arriving a little bit early.  The question you need to answer is whether that's enough to justify the compile step.

**Why use Traceur:** You like JavaScript but are frustrated by slow standards adoption.  You want to use the newest features of the language now while still supporting a variety of platforms.

**Update:** *Since I originally wrote this post, [Babel](babeljs.io) (formally 6to5) has exploded in usage and popularity as a tool for using future JavaScript features today. There are very good reasons for this.  It is much better documented than Traceur, supports more features, and generally aims to be a tool that people are using to build things, whereas Traceur has always felt like more of a tool for learning about the future of JavaScript.  I would highly recommend Babel for anyone looking to use future JavaScript features in their web projects.*

### Other Options

I chose to highlight the 4 syntaxes above because they're the most popular general purpose alternate syntaxes for JavaScript.  But there are a few others worth mentioning here, for the sake of completeness if nothing else.

[JSX][jsx] is seemingly becoming quite popular as an extension to the JavaScript syntax, but I chose not to highlight it here because it is currently so tightly knit to [React][react].  While it is [technically possible][jsxnoreact] to use JSX for things other than React apps, in practice JSX has a limited enough scope <sup id="fnref:3">[3](#fn:3)</sup> that there's no real motivation to do so.  If you're building a React application though, JSX is certainly worth exploring, as is the next syntax.


[Flow][flow] is a new JavaScript syntax created by Facebook that uses the same type annotations as TypeScript, but does so in a way that aims to provide better type inference as well as supporting JSX.  I'm very interested to see where it goes, but for now it's still early days as it was only announced [last week][flowannounce].

[AtScript][atscript] also uses TypeScript's type annotations, is mostly tied to a single framework, and in terms of public usage doesn't really even exist yet <sup id="fnref:4">[4](#fn:4)</sup>.  So why is it worth a mention?  Because it is the syntax that AngularJS 2.0 is being developed in, and will be the first class "recommended syntax" for that framework when it is released next year.  Since Angular is currently the [most popular][angularpopular] JavaScript MV* framework, that carries some weight and makes AtScript worth tracking, especially for Angular developers. But in today's world it's not a real contender to be used in a project.

### Decisions

So how do you decide what JavaScript syntax to use?  My recommendation is to start by assuming ES5 JavaScript as a default.  Then examine any problems you've run into while using it.  Does your team struggle with JavaScript gotchas?  Has your project become large enough that a strong type system would provide more benefits than cost?  Do you really need some domain specific syntax to clean up your code?  Or are you happy and productive as is?  At that point you can decide whether a different syntax could help you get around those problems, or if the hassle of compilation steps and overhead of a new syntax would just end up making things worse.  You don't want to use CoffeeScript or Traceur because they're cool or different.  You'll want to use them if they solve your problems.


### More Resources

- I linked to Reg Brathwaite's [CoffeeScript is not a language worth learning][coffeescriptnotworthlearning] above, but I want to reiterate that it's worth a read for anyone who's interested in CoffeeScript, or who wants to understand why people would be excited to use it.
- Steve Sanderson's vide on [Architecting large Single Page Applications with Knockout.js][largeko] covers a lot of stuff and it's worth watching the whole thing.  But if you skip to the 49:30 mark, he has a nice 10 minute discussion of TypeScript, his teams experience building a large application in it, and the pros and cons they found.
- I'm admittedly a bit skeptical about the value of Sweet.JS, but if you want to hear the case for it from somebody who really believes in it, take a look at this essay: [Stop Writing JavaScript Compilers! Make Macros Instead][stopcompilers].  It does a great job of laying out the case for composable macros as an alternative to "monolithic" compilers.
- Finally, Axel Rauschmayer has a [great roundup][jstypes] of the various languages looking to add type systems to JavaScript, diving pretty deep into each and clearly explaining the differences between TypeScript, Flow and AtScript.


### Subscribe

Thanks for taking the time to read this post! JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my recent post on JavaScript utility libraries comparing [Underscore and Lo-Dash][underlodash].


<style>
.post-body img {
  margin: 40px auto 20px auto;
  display:block;
  max-height:200px;
}
</style>



<div class="footnotes">
<ol>
    <li class="footnote" id="fn:0">
        <p>
        <a href="http://en.wikipedia.org/wiki/ECMAScript">EcmaScript</a> is the "official" name for the JavaScript language as described in its specification.  EcmaScript 5 was the most recent finalized spec, published in December 2009. In practice though, JavaScript environements are never strict implementations of a specific spec.  Instead they gradually bring in features over time alongside the standards process.
        </p>
        <a href="#fnref:0" title="return to article"> ↩</a></p>
    </li>
    <li class="footnote" id="fn:1">
        <p>
        Yes readable is a "beauty is in the eye of the beholder thing".  But readability is certainly a reason that many people are interested in CoffeeScript, and many of it's operators are designed as meaningful shorthand for operations that are more bloated in JavaScript.  While that  may present an initial readability barrier, in the long term it can make for a more to the point code base.
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
    <li class="footnote" id="fn:2">
        <p>
        For instance it's taken CoffeeScript a looong time to implement support for generators.
        </p>
        <a href="#fnref:2" title="return to article"> ↩</a></p>
    </li>
    <li class="footnote" id="fn:3">
        <p>
        Effectively all JSX does is allow for a convenient representation of the DOM within JavaScript.  While this is very important for React, and may be useful in some other cases, it does not provide the level of general purpose value of any of the other syntaxes mentioned in this article.
        </p>
        <a href="#fnref:3" title="return to article"> ↩</a></p>
    </li>
    <li class="footnote" id="fn:4">
        <p>
        You can use it and get it to compile by passing an option to Traceur, but as far as I know nobody is actually doing so yet outside of the Angular 2.0 team.
        </p>
        <a href="#fnref:4" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>

[coffeescriptnotworthlearning]: https://github.com/raganwald-deprecated/homoiconic/blob/master/2011/12/jargon.md
[coffeelint]: http://www.coffeelint.org/
[haxe]: http://haxe.org/
[dart]:https://www.dartlang.org/
[gwt]: http://www.gwtproject.org/
[clojurescript]:https://github.com/clojure/clojurescript
[emscripten]:http://kripken.github.io/emscripten-site/
[asmjs]:http://asmjs.org/
[sweetjs]: http://sweetjs.org/
[coffeescript]:http://coffeescript.org/
[jsx]: http://facebook.github.io/react/docs/jsx-in-depth.html
[traceur]:https://github.com/google/traceur-compiler
[typescript]: http://www.typescriptlang.org/
[tst]:https://github.com/clausreinke/typescript-tools
[tern]:http://ternjs.net/
[underlodash]:http://benmccormick.org/2014/11/12/underscore-vs-lodash/
[stopcompilers]: http://jlongster.com/Stop-Writing-JavaScript-Compilers--Make-Macros-Instead
[jsxnoreact]:http://blog.vjeux.com/2013/javascript/jsx-for-the-real-dom.html
[flowannounce]:https://code.facebook.com/posts/1505962329687926/flow-a-new-static-type-checker-for-javascript/
[flow]: http://flowtype.org/
[react]: http://facebook.github.io/react/
[atscript]: https://docs.google.com/document/d/11YUzC-1d0V1-Q3V0fQ7KSit97HnZoKVygDxpWzEYW0U/edit
[angularpopular]: http://www.google.com/trends/explore#q=AngularJS%2C%20BackboneJS%2C%20KnockoutJS%2C%20EmberJS%2C%20ReactJS&date=1%2F2012%2035m&cmpt=q
[largeko]: http://vimeo.com/97519516
[jstypes]:http://www.2ality.com/2014/10/typed-javascript.html
[todomvc]:http://todomvc.com/
