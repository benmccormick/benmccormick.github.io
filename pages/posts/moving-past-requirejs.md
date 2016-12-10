---
title: "Moving Past RequireJS"
date: "2015-05-28 14:10:00+00:00"
layout: "post"
path: "/2015/05/28/moving-past-requirejs"
pageViews: "33630"
last30pageViews: "1376"
---

RequireJS has been a hugely influential and important tool in the JavaScript world.  It's still used in many solid, well-written projects today.  But as it has stagnated and competitors have grown up, it now suffers compared to the alternatives.  It's time for new projects to look past RequireJS when deciding how to structure their front-end projects.

### What is RequireJS?

RequireJS is the most well known module loader for JavaScript.  Module loaders are tools for specifying dependencies for JavaScript files and loading those files into a browser.  They became necessary because JavaScript has not traditionally offered a built in way to specify what other code is needed to execute a file.  Developers coming from server side languages like Java and Python are used to being able to import anything they need from another file, letting the language handle the details.  Since that was not designed into JavaScript, the only alternative originally was having developers take care that all scripts were correctly loaded into a page together in the right order, then making references across files without the assurance that the other file existed.

Module loaders improve on that by allowing you to define dependencies for your JavaScript files, and assuring that those dependencies are loaded in the correct order so that the variables the code needs are there when referenced.  These dependencies are specified using one of several "module formats".  There are currently 3 primary competing standards for JavaScript modules: AMD or Asynchronous Module Definition, CommonJS, and EcmaScript 6 Modules.  I'll discuss these more below, but each of them provide syntax for listing the files that a module requires as a dependency, and the object that the module wishes to import from those files.

### Why not start a project with RequireJS?

RequireJS was the first JavaScript module loader to gain widespread popularity.  It's used in hundreds of successful production sites, and is widely referenced in JavaScript books, blog posts, and talks.  I personally led a project to convert a large web application to use it for dependency management in my previous job, and still use it now in a current project.  So why would I say not to use it for your project?  There are two sets of issues with RequireJS:  issues with the AMD module format, and increased competition in terms of the features expected from a module loader.

### The problems with AMD

RequireJS requires developers to use AMD modules.  That choice made a ton of sense in 2011 when RequireJS first launched.  It makes less sense today.  In 2011, the only popular alternative to AMD modules was the CommonJS standard, and AMD held a technical advantage over CommonJS. It was essentially a decision between a technological superiority and a cleaner API. In 2015, AMD is one of 3 realistic module syntax alternatives, and no longer holds a significant technical advantage, but it still has a less clear syntax and has begun to experience problems with network effects.  

#### Syntax Comparison 

AMD modules look like this:

```javascript
define(['file1','file2'], function(Class1, Class2) {
    let obj = new Class1(),
        obj2 = new Class2();
    return obj.foo(obj2);
});
```

A `define` function is used to define a new module.  It takes 2 arguments: an array of dependencies (specified as strings), and a callback function that is passed in the values exported by each dependency and run after all of the dependencies have been loaded.  AMD also provides a require function that takes the same arguments, but serves as the initialization point of a program, loading its dependencies and executing them when it's run.

Compare that to CommonJS and the ES6 Modules syntax:

```javascript
//commonJS
let Class1 = require('file1'),
    Class2 = require('file2'),
    obj = newClass1(),
    obj2 = new Class2();

module.exports = obj.foo(obj2);
```

```javascript
//ES6
import Class1 from 'file1';
import Class2 from 'file2';

let obj = newClass1(),
    obj2 = new Class2();

export default obj.foo(obj2);
```

There's some obvious niceties there.  CommonJS and ES6 modules don't require you to wrap your code in an outer function, which serves to reduce boilerplate and also aligns the import code more closely with the expectations of developers who have used imports in server-side languages.

But there are also other subtler problems with the AMD syntax.  Because you're asked to specify your dependencies as an array of strings that then result in parameters to a callback function, adding or removing a dependency requires code to be changed in 2 places. <sup id="fnref:1">[1](#fn:1)</sup>  This is no big deal in a simple example like above.  But what about in this real world example:

```javascript
define(['marionette',
        'radio',
        'underscore',
        'lib/analytics',
        'collections/widget',
        'collections/user',
        'models/user',
         'routers/widget_page_router',
        'views/widget_page/page'],

function(Mn, Radio, _, Analytics, WidgetCollection, UsersCollection,
    User, WidgetRouter, WidgetPage) {
        //module code here
});
```

If you were asked to remove a dependency here, it's easy to imagine accidentally putting a parameter in the wrong position in the list, or removing an item from one list without the other, causing the parameters to be set to the wrong values.  It's a small issue, but the type of subtle source of bugs that can drive developers crazy.

Finally the mixed use of require and define for pulling in dependencies seems to be confusing to many developers.  While it certainly isn't a large learning curve (require is for initiating new code, define is for defining a module that can be pulled into a dependency tree started by a require), it's an additional point of confusion that doesn't exist in CommonJS, which simply has a "starting script" that is run and pulls in its dependencies.

**Update**: *Commenters on Reddit have correctly pointed out that there's a [second usable AMD syntax][sugar] that cleans up some of these issues.  I didn't include it originally since it's not the "official" AMD syntax and I have not seen it widely used, but it is better and worth noting for users sticking with RequireJS/AMD*

#### Technical Advantages

When RequireJS was first created, AMD had a few technical advantages over CommonJS solutions.  AMD was set up to be asynchronous.  The callback function syntax made it easy to handle dependency loading over a network.  You made the define call, loaded the dependencies, and once all of the dependencies had been pulled over the network, ran the callback function.  This also allowed some dependencies to be lazy-loaded after the initial page load, since that could be handled like any other ajax request with a callback attached.  Since CommonJS was set up in a more synchronous fashion, it was less clear how to accomplish this, and early systems were less popular than requireJS.  

AMD's asynchronous nature remains a theoretical advantage, but in practice, modern module loaders have found ways to solve these problems for CommonJS.  Webpack allows configuration options for lazy loading individual modules, and developers using Browserify have [found workarounds][lazybrowserify] to the problem.  At this point there's no real difference in the capabilities of AMD compared to other module formats.

#### Network Effects

While RequireJS and AMD were initially the most popular module system for the browser, CommonJS is built into Node.js and has always been the dominant module format on the server-side.   This was initially no big deal, but Node has grown in popularity and also become more important to client-side developers due to the tooling ecosystem around it.  Because of that, code that doesn't play well with Node is limited in ways that CommonJS  is not.  One area that I've noticed this is unit testing.  There's a whole ecosystem of unit-testing libraries that allow you to test your modules on the command line using Node (Mocha, jasmine-node, Jest).  This has nice advantages relative to running your tests in a browser.  It's easy to integrate into a build workflow, the test framework can run all tests in a directory without developers needing to manually add them to a test page, and there's no extra browser window required.  With AMD you can get part of the way there by making all of your tests asynchronous (painful) and importing requireJS or by using PhantomJS to run your browser tests on the command-line.  But you can't match the experience of full node compatibility.

In addition to the unit test example, there are many small node modules out there that can be usefully pulled into a web project.  Libraries like Ampersand.js and Event-Emitter are quite useful in a browser context, but only play nicely if you're using CommonJS.  While it's true that most libraries do support AMD, they tend to do so through a "Universal" module format that checks the environment to see what module format is being used and then uses appropriate format.  I'm unfamiliar with any examples of major JavaScript libraries that support AMD module loaders but not CommonJS.  So choosing AMD limits you in a way that choosing CommonJS does not.

This is not a disadvantage that's likely to get fixed for AMD modules anytime soon.  If these network effects shift at all, they're only likely to do so in favor of ES6 modules, which have the appeal of being a "blessed" part of the JavaScript language. So in the short and long term, it's fair to expect that using AMD modules will limit your compatibility with other tools and libraries compared to CommonJS.

### What are the alternatives to RequireJS?

In 2015, RequireJS is one of 3 major options on the module loading scene, along with [Browserify][browserify] and [Webpack][webpack].  Browserify is an attempt to build a module loader on top of the NPM ecosystem and node modules.  It uses CommonJS modules and integrates tightly with NPM.  Webpack is an attempt to unify the modules landscape by supporting AMD, CommonJS and ES6 modules.  It handles JavaScript, CSS and other assets, as well as preprocessors for each. RequireJS suffers in comparison to both of them, both in terms of features and workflow.

Browserify and Webpack both provide servers for development, allowing you to instantly integrate changes without a long build process or extra JavaScript files loaded into the browser. RequireJS doesn't have a great solution for development workflow, requiring you to either do a full build every time, or load a copy of the require.js JavaScript file up to your browser where it loads files from the client.  This has disadvantages both in terms of reliability (you'll be running the files in a different way in development than on production, and there will be timing differences due to the need to load the files on the client), and configuration (you'll need to have separate configurations for development and production that will have to be kept in sync somehow).

Browserify and Webpack also provide a clean syntax for preprocessing things like CoffeeScript or JSX files, using transforms or loaders (respectively).  These transforms can be applied to a subset of files with configuration. These methods compare favorably to RequireJS's plugin system, which require you to manually specify the plugins used each time you load a resource.  

All of this adds up to a strong case for not starting new projects with RequireJS.  It's a good tool that has benefited many projects, but as other people have learned from its pain points and provided superior solutions, the time has come to move on.

### Disclaimers

It should be noted here that this article is addressed primarily at developers starting new projects.  If you're working on an project that already uses RequireJS, you've probably already worked through the configuration pain, gotten used to the syntax, found a compatible unit testing library and developed a strategy for live development.  If these aren't things that are causing you pain, don't switch.  RequireJS is a stable tool that has stood the test of time.  It's not inherently flawed.  There are simply better options out there these days for developers starting new projects.  

### More Resources

- Axel Rauschmayer has a [great piece][rauschmodules] up on his blog 2ality describing ECMAScript 6 modules and how they compare to CommonJS 

- This [blog post][ampersand] is primarily an introduction post for Ampersand.js, a modular JS framework. But it also serves as a great look at the environment around nodejs and CommonJS modules, including a discussion of the advantages and disadvantages of using many small modules to structure applications.

- Several users on [reddit][redditlink], have pointed out that [systemjs][systemjs] is another competing module loader worth discussing.  I didn't include it because it's less mature and wouldn't be something I'd currently recommend for production apps, but it looks to be getting there quickly and is certainly another option to consider.

### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my recent post on [why Bower is useful][bower].

<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        AMD does allow you to use an alternative syntax that is more similar to CommonJS that avoids this issue with "off by 1" errors.  But since it's an alternative syntax, not the recommended one, I think it's fair to critique this as an issue.  My other points apply equally to both forms.
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>

[rauschmodules]: http://www.2ality.com/2014/09/es6-modules-final.html
[bower]: http://benmccormick.org/2015/01/22/is-bower-useful/
[lazybrowserify]:http://esa-matti.suuronen.org/blog/2013/04/15/asynchronous-module-loading-with-browserify/ 
[browserify]: http://browserify.org/
[webpack]:http://webpack.github.io/
[ampersand]: https://blog.andyet.com/2014/06/25/introducing-ampersand-js
[systemjs]: https://github.com/systemjs/systemjs
[redditlink]: http://www.reddit.com/r/javascript/comments/37lowt/moving_past_requirejs/
[sugar]: http://requirejs.org/docs/whyamd.html#sugar
