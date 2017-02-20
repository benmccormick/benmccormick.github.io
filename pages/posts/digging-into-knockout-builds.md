---
title: "Digging Into Knockout Builds"
date: "2014-01-06 23:30:00+00:00"
layout: "post"
path: "/2014/01/06/digging-into-knockout-builds"
category: "frameworks"
description: 'An in depth look at how KnockoutJS is organized'
readNext: ['revertible-observables', 'effective-js', 'productive-js-dev']

---

There's a lot you can learn by looking through other people's code.  This is especially true when you're looking at widely used open-source libraries, where you can see how people have solved real problems with code that has been battle-tested and debated.

In this spirit of code literacy, I spent some time this past weekend to look through the source code for [KnockoutJS][knockout].  Knockout is a MVVM library in Javascript designed to make 2 way declarative bindings easy.  I'm wanted to write a bit about what I saw in Knockout's structure and build process.

### Intro

Some of the first decisions a developer has to make when starting a new javascript project revolve around project structure and build processes.  They need to decide how they'll handle things like testing and minification.  For a library like Knockout, developers also need to figure out how to make sure that they don't expose any internal logic to the global scope.  This post takes a look at how Knockout deals with these challenges.  You can follow along by getting [the source][kosource] off of Github.


### Project Structure

Knockout is organized with a traditional `src`,`spec`,`build` structure, with the main src code in the src directory, [Jasmine][jasmine] tests in the spec directory, and build-related files in the build directory.  The src directory is fairly flat, with directories for bindings, templating and subscribables.  The spec directory does not mirror it exactly.  The spec files are organized around functional categories at the root of the source files, with a separate directory holding tests for the default bindings.   The build direction contains several files related to the build process, which I'll discuss below.  In the root directory there are dotfiles for [NPM][npm], [git][git], and [TravisCI][travis], a package.json file, and the gruntfile.

### Grunt

Knockout's build process is automated using Grunt, an automation tool built on [NodeJS][node].  Knockout's gruntfile weighs in at a very readable 150 lines of code, and only defines one task.  That default task looks like this:

```javascript
//Grunt Default Task
grunt.registerTask('default', ['clean', 'checktrailingspaces', 'build', 'test']);
```

So when you build knockout you're executing 4 steps.

#### Clean

This deletes the knockout-latest.debug.js and knockout-latest.min.js files from the `build/output` directory

#### Check Trailing Spaces

This checks source files for trailing spaces and throws an error if they exist, ending the build.

#### Build

More detail on this below.

#### Test

Test spawns a child process which calls 2 scripts: 'spec/runner.phantom.js' and 'spec/runner.node.js'.  The script runs asynchronously in the background, with the results being passed to standard out through a callback.


```javascript
//Grunt Test Task
grunt.initConfig({
    //...
    test: {
        phantomjs: 'spec/runner.phantom.js',
        node: 'spec/runner.node.js'
    }
});

grunt.registerMultiTask('test', 'Run tests', function () {
    var done = this.async();
    grunt.util.spawn({ cmd: this.target, args: [this.data] },
        function (error, result, code) {
            if (code === 127 /*not found*/) {
                grunt.verbose.error(result.stderr);
                // ignore this error
                done(true);
            } else {
                grunt.log.writeln(result.stdout);
                if (error)
                    grunt.log.error(result.stderr);
                done(!error);
            }
        }
    );
});
```

Overall a few things stand out about Knockout's gruntfile.

1. It's written with no dependencies other than the base grunt-cli package, which is specifically called out in package.json to be run locally.  This is in sharp contrast to most Grunt-based projects I've seen, which assume a global install of Grunt and then make heavy use of the Grunt plugin ecosystem.

2. The only code consistency check is flagging trailing whitespace. Rather than enforce styling with a tool like jsHint, the build process only protects the integrity of the diffs with the whitespace check. This is probably a consequence of the plugin-free build file set up.  Overall the build philosophy seems to aim to keep things as simple as possible.

### The Build Process

So what happens with the build command?  When it's executed the build command runs a task which creates 2 files, knockout-latest.debug.js and knockout-latest.min. Each of them contain the same content, with the debug version wrapped in an [IIFE][iife], and the minified version run through Google closure compiler.

The content is pulled together with the `getCombinedSources` function:

```javascript
//Grunt Build Task
function getCombinedSources() {
    var fragments = grunt.config('fragments'),
        sourceFilenames = [
            fragments + 'extern-pre.js',
            fragments + 'amd-pre.js',
            getReferencedSources(fragments + 'source-references.js'),
            fragments + 'amd-post.js',
            fragments + 'extern-post.js'
        ],
        flattenedSourceFilenames = Array.prototype.concat.apply([], sourceFilenames),
        combinedSources = flattenedSourceFilenames.map(function(filename) {
            return grunt.file.read('./' + filename);
        }).join('');

    return combinedSources.replace('##VERSION##', grunt.config('pkg.version'));
}
```

So this takes each of the files returned by the getReferencedSources function, and wraps them with 2 more files on each side.  Lets look at the wrapper files first.

extern-pre.js sets up an IIFE and defines several global values within the local scope.  This is done in order to protect against any reuse of these names in the local scope where knockout is loaded.

```javascript
//extern-pre.js
(function(undefined){
    // (0, eval)('this') is a robust way of getting a reference to the global object
    // For details, see http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023
    var window = this || (0, eval)('this'),
        document = window['document'],
        navigator = window['navigator'],
        jQuery = window["jQuery"],
        JSON = window["JSON"];
```

amd-pre.js determines the type of module system in use (if any) and passes the correct object into the inner scope as koExports.

```javascript
//amd-pre.js
(function(factory) {
  // Support three module loading scenarios
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    // [1] CommonJS/Node.js
    var target = module['exports'] || exports; //module.exports is for Node.js
    factory(target);
  } else if (typeof define === 'function' && define['amd']) {
    // [2] AMD anonymous module
    define(['exports'], factory);
  } else {
    // [3] No module loader (plain <script> tag) - put directly in global namespace
    factory(window['ko'] = {});
  }
})
```

The *-post.js files simply close these function statements.

So in the end we're left with an IIFE that wraps all of the content and defines global variables within the scope, and then executes a second IIFE which determines the module format in use and executes the inner factory function accordingly.  The factory function is made up of the various files in the src directory, concatenated together in the order specified in build/fragments/source-references.js.

### Initializing the library

The first few files loaded into the inner function are short files designed to provide a base for the library.

namespace.js sets up the ko object that is referenced internally in the file.

```javascript
//namespace.js
// Internally, all KO objects are attached to koExports (even the non-exported ones whose names will be minified by the closure compiler).
// In the future, the following "ko" variable may be made distinct from "koExports" so that private objects are not externally reachable.
var ko = typeof koExports !== 'undefined' ? koExports : {};
```

google-closure-compiler-utils.js defines two helper functions, exportSymbol and exportProperty which allow for greater minimization of the internal ko library while maintaining a consistent external api.  These functions are used everywhere throughout the library for defining externally facing function and property names.

```javascript
//google-closure-compiler-utils.js

// Google Closure Compiler helpers (used only to make the minified file smaller)
ko.exportSymbol = function(koPath, object) {
    var tokens = koPath.split(".");

    // In the future, "ko" may become distinct from "koExports" (so that non-exported objects are not reachable)
    // At that point, "target" would be set to: (typeof koExports !== "undefined" ? koExports : ko)
    var target = ko;

    for (var i = 0; i < tokens.length - 1; i++)
        target = target[tokens[i]];
    target[tokens[tokens.length - 1]] = object;
};
ko.exportProperty = function(owner, publicName, object) {
  owner[publicName] = object;
};
```

Finally version.js sets up a placeholder for ko.version, which is then replaced with the version number in Package.json as part of the grunt build task.

```javascript
//version.js
ko.version = "##VERSION##";

ko.exportSymbol('version', ko.version);
```

### Conclusion

There are a few interesting things we can note from Knockout's build approach.

#### Using IIFE's to isolate local scope is a practical and important technique for library design

If you've been counting, the debug version of the library is wrapped in 3 different levels of IIFEs before any code exposing external functionality is actually included.  This allows Knockout to provide several layers of data protection and abstraction, making sure that it is referencing the correct global variables and preventing scope leaks.

#### Its relatively straightforward to support module formats even if your library doesn't use them internally

Take a look again at amd-pre.js.  Its 15 lines of code to support AMD loaders, CommonJS loaders and normal script tag loading.  Knockout doesn't use a modern "module solution" approach to code organization.  Instead it uses a more traditional namespacing approach wrapped in IIFEs.  But it still plays well with others nicely.  It's hard to see how this type of effort wouldn't be worth it for library designers.




[iife]: http://benalman.com/news/2010/11/immediately-invoked-function-expression/
[git]: http://git-scm.com/
[npm]: https://npmjs.org/
[travis]:http://about.travis-ci.org/
[node]: xmpux.cisco.com
[jasmine]: http://pivotal.github.io/jasmine/
[knockout]: http://knockoutjs.com/
[kosource]: https://github.com/knockout/knockout
