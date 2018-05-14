---
title: "The New Hello World"
date: "2018/04/25"
layout: "post"
path: "/2018/04/25/the-new-hello-world/"
description: "JavaScript's learning curve is getting better again"
keywords: "JavaScript learning hello world"
category: "javascript"
topics: ['JavaScript']
key: "new-hello-world"
readNext: "ten-things-js,following-js-roadmap,proposals-in-production"
---

JavaScript has had a weird reputation inversion over the past decade.  For years it was the stripped down toy language that could.  It didn't have the features people wanted, and it did have the features they didn't want, but it ran everywhere and it was easy to just start building things.  The last decade has shown that you can actually build some serious applications in JavaScript.  But it has also eaten away at the ability to start simple and try new things.  State of the art for JavaScript apps now involves compile steps, a long tooling chain, and a million choices for developers to make.  So the folks who are helping new developers get started have a few options for teaching JavaScript:

1. **Embrace The Complexity** - Want to learn to write Web Apps?  Let's just toss you into a boilerplate that's using node, webpack, react, redux, redux-saga, react router, glamorous, eslint, prettier, npm scripts, lodash, and babel.  This is what production apps look like, so you might as well start learning in a realistic environment.
2. **Hide The Complexity** - This is where we maybe use something like [Codepen](https://codepen.io/) to provide a sandboxed area where we may be using Babel/React/etc, but the user doesn't have to configure or think about them too much.  My understanding is that [Glitch](https://glitch.com/) tries to go down this route to some extent as well.
3. **Discard The Complexity** - Teach coding like it's 2010 all over again!  This approach is to focus more on the JavaScript language as it's implemented in the browser, using script tags without a build step, and maybe even an older/simpler library like jQuery to explain DOM concepts and CSS.  This approach can eventually evolve towards introducing more complexity.

For the past few years I've seen a blend of all of these approaches when I've looked at other folks' beginner level resources.  It's been hard to determine the best way to prepare new developers for the complexities of the development process. But good news, I think that era is finally coming to an end.

### The Ideal Intro

In an ideal world, we'd be able to introduce new developers to the concepts that undergird modern web apps, and teach them syntax that is as up to date as possible without having to entangle them in the implementation details and distractions of production grade tools like Babel and Webpack.  So we want them to start out writing JavaScript code that is:

1. Modular
2. Cross-environment
3. Modern (ES6+ syntax as appropriate)
4. Simple to start with

The last 10 years of tool build up have been primarily focused on making it easy to achieve the first 3 goals in production (along with prioritizing other needs of large scale applications).  But production tooling is by nature less concerned with #4.  Fortunately native environments are starting to catch up on the first 3, and that means we can do better.  


### The New Hello World

Let's say we want to frame an intro through the classic "hello world" program.  Our goals are to create a JavaScript function that can print "Hello World", and then expand on that a bit.  And we want to teach this in a way that will still look familiar when our learners get themselves into a production JavaScript code base.  

#### Bare Bones

We might start with something super simple like this:

```html
<!-- index.html -->
<html>
  <body>
    <h3 id='name-display'></h3>
    <script>
      let displayArea = document.getElementById('name-display');
      displayArea.innerHTML = 'Hello World';
    </script>

  </body>
</html>
```

That's about as simple as a JavaScript hello world gets.  You can access it by opening the file directly from the file system in your browser, and it's easy enough to edit the text and see changes on refresh.

But in 2018, we can do something cool next.  We want to be modular and separate concerns, so lets create a hello world module.  This is an opportunity to introduce functions and modules.  It introduces our only small tooling step: adding a simple web server.

#### Hello Modules

On OSX, it's easy enough to set up a simple web server with `python -m SimpleHTTPServer 8080`.  We can do that with our existing index.html and verify that we can now see it at `localhost:8080` in our browsers[^1].

After that, we can start doing cool stuff, starting with creating a new module:

```javascript
//hello.js
export const sayHello = (name='World') => {
  return `Hello ${name}`;
};
```

This is our first function.  Depending on your audience, you may want to strip this down a bit and remove the default parameter, or spend some time explaining the different concepts in play here. But the focus can be on the concept of functions, as well as the ability to export them from a module.

Now we can update our index.js file to use the new function.  Assuming both files are in the same directory, that will look like this:

```html
<!-- index.html -->
<html>
  <body>
    <h3 id='name-display'></h3>
    <script type="module">
      import {sayHello} from './hello.js';
      let displayArea = document.getElementById('name-display');
      displayArea.innerHTML = sayHello();
    </script>

  </body>
</html>
```

Now we have a hello world built on a foundation that can scale towards modern JavaScript environments.  We have modules and modern syntax, and the only difficult setup step has been a lightweight web server so far.  The rest is just script tags.  

### Interactive

It's easy enough now to take our module and turn it into something interactive:

```html
<!-- index.html -->
<html>
  <body>

    <div id='container'>
      <h2> Enter a Name and Hit The Button</h2>
      <input id='name'>
      <button id='change-name'>Say Hello</button>
      <h3 id='name-display'></h3>
    </div>

    <script type='module'>
      import {sayHello} from './hello.mjs';

      let displayArea = document.getElementById('name-display');
      let input = document.getElementById('name');
      let button = document.getElementById('change-name');

      button.addEventListener('click', () => {
        displayArea.innerHTML = sayHello(input.value);
      });
    </script>

  </body>
</html>
```

This example introduces DOM events and let's the user decide who to say hello to.  It also is a good jumping off point for further experimentation for a new dev.


### Crossing Environments

Going from the browser to node, even though it is simpler in some ways, is always going to be a bigger jump for newcomers because of most people's unfamiliarity with the command line, and the base hurdle of installing node itself.  But once we're ready to move past browsers, our new hello world can be easily translated to node land.  The biggest hurdle is in the file names.  We will have to rename or copy `hello.js` to be named `hello.mjs` (Node's way of differentiating between files using ES6 syntax).  After that, we can write a simple script to start out:

```javascript
//node.mjs
import {sayHello} from './hello.mjs';
console.log(sayHello());
```

And then, as long as we're on an up to date version of Node, we can run it with `node --experimental-modules node.mjs`.  And we will see our Hello World.

There are some annoyances for beginners here.  Node only recently added module support, and beginners must

1. Rename their modules to the currently non-standard mjs ending
2. Have a recent version of Node (v8.5+)
3. add the experimental-modules flag and learn to ignore the warning it gives

But overall it isn't meaningfully harder than learning to use node has been in the past.

### Interactive Again

We can make our node.js version accept a command line arg easily enough, along with more opportunities to learn about functions, arrays and conditionals.

```javascript
//node.mjs
import {sayHello} from './hello.mjs';

const getLast = list => {
  if(list.length) {
      return list[list.length - 1]
  }
  return null;
}

console.log(sayHello(getLast(process.argv)));
```

### The Future

I'm excited to see the new dev experience moving back closer to alignment with the production web app experience.  I think that can only be a positive things.  Some steps that will help even more if/when they happen:

1. **Module file format standardization** - The .mjs extension seems to still be controversial, but it also seems a bit inevitable.  So the question will be whether it becomes more standard to use across all modular JS on the browser and node.  The current split and experimental support makes for a confusing distraction for new learners
2. **De-flagging** - Right now Firefox and Node still require flags for using modules.  That reduces beginner friendliness.
3. **Where is the jQuery of 2018** - This is more speculative, but I think the next step to a beginner friendly hello world is a "beginner friendly framework" that is based on the "one way data flow/declarative translation of state to UI" paradigm that has swept across pretty much all modern JS frameworks.  That's an important concept to understand, and there isn't anything I'm aware of out there right now that let's you build with those concepts but is as approachable to newcomers as jQuery is.  jQuery was a gateway to DOM manipulation, AJAX, and functional array manipulation for a generation of developers.  React and create-react-app is probably the closest to that concept today, but it isn't nearly as simple.  

That's all for now.  Code samples for this are [on github](https://github.com/benmccormick/hello-new).  Goodbye World.


[^1]: This should work in the latest Chrome, Safari and Edge out of the box.  I encountered a bit of slowness and flakiness on Chrome, but it worked like a charm in Safari.  Firefox still has this stuff behind a flag.
