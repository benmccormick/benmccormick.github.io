---
title: "Is Bower Useful?"
date: "2015-01-22 04:52:06+00:00"
layout: "post"
path: "/2015/01/22/is-bower-useful"
category: "tools"
pageViews: "2966"
last30pageViews: "59"
---



![bower logo](/posts/images/bower-1.png)

I first heard about [Bower][bower] about a year and half ago, and was immediately confused.  Bower is branded as a package manager for the web.  My immediate question: "Why create another package manager for JavaScript, when [npm][npm] was just starting to become a standard?"  I certainly wasn't the only one thinking it.

<div>
<blockquote class="twitter-tweet" lang="en"><p>&quot;What&#39;s bower?&quot;&#10;&quot;A package manager, install it with npm.&quot;&#10;&quot;What&#39;s npm?&quot;&#10;&quot;A package manager, you can install it with brew&quot;&#10;&quot;What&#39;s brew?&quot;&#10;...</p>&mdash; Stefan Baumgartner (@ddprrt) <a href="https://twitter.com/ddprrt/status/529909875347030016">November 5, 2014</a></blockquote>
</div>

If you can use npm to install Bower, you can use it to install packages directly.  And if you don't like npm, is it that hard to just pull in your dependencies manually?  Why use a package manager at all?

A year later, I now believe Bower is a useful and important part of the web development ecosystem, so in the interest of sharing knowledge and because I can't resist the chance to flout [Betteridge's law of headlines][betterlaw], here's my case for why Bower is useful.

### Manual package management doesn't scale

For quite a while I was content to manage my web dependencies manually.  I would go to a project site, hit the big download button, move the files into my project and get on with my day.  It was simple and required no setup or tools.  I was happy.  However I'm now managing a project that includes almost 30 external front end dependencies of some kind.  At that scale it's impossible to shrug off the pain points of the "Do It Yourself" approach.

The biggest problems come around keeping dependencies up to date. Simple solutions unravel quickly here.  First, while it would be lovely if every front end library included a version number in their distributed file, that's not always the case.  So keeping track of versions reliably invariably means some sort of external documentation.  Even when I knew the version, I would have to manually go to each libraries site to see if there was a newer version, then test it, and then either keep 2 copies of the library around or mess with git branches while I was testing to see if the new version caused any problems or regressions.  That was fine with a few libraries, but it doesn't scale well.

So my advice?  Don't try to manage your assets manually after your projects grow to a certain size.  You'll spend unnecessary time keeping them up to date, clutter your version control logs, and will have to actually document the versions somewhere anyway.  So manual package management is out.  But why not just use npm?

### npm is the right answer to the wrong question

npm is a fantastic package manager for node development.  Being able to immediately pull in a library and all of its dependencies then be confident that it will work with the module format you use is a fantastic thing, and npm has pulled it off well.  So why not just use it for all of your web development package management needs?

The problem is that it's impossible for tools to optimize for everything. npm has optimized for node development.  That leads to problems when using it in other settings.  First of all, many npm packages assume you're using the commonJS module format.  Node encourages small modules that may have many dependencies, linked with commonJS.  It's possible to use those modules on the front end of course if you use a tool like [Browserify][browserify], but your choice of package manager should not lock you into a specific module format or build tool.  Most major packages do distribute their code in a UMD format that can be loaded in multiple ways, but some do not, and when those packages have dependencies, we have another problem.

npm has a nested dependency tree, where each module also loads all of its dependencies individually.  This is fine on the server, where you can put node_modules into your .gitignore file and effectively pretend those files are not there.  When writing client-side code though, it's important to be efficient with bandwidth.  You can't load multiple versions of a dependency if, for instance, you used multiple libraries that depend on Underscore or jQuery.  That's a problem if you're using browserify, since you'll need to find a way to normalize those dependencies to a single file.  But nested dependencies are also annoying when using other problems, both due to the need to manually figure out what you need and avoid duplication as well as the awkwardness of making deep path references down several layers of node_modules folders.

Lastly, I'd encourage people considering npm for front-end package management to use a tool scoped for their needs. npm started as a package manager for node, and that is still its main use.  There are plenty of packages that can be useful both on node and in the browser, but many things only make sense in one environment.  For instance CSS libraries are not useful within node, and file system libraries won't work in the browser.  I'll admit that this ship may have already sailed though. Many popular browser only libraries like Bootstrap and Angular are available on npm right now as a response to people who are using npm for everything<sup id="fnref:1">[1](#fn:1)</sup>.

### So Why Bower?

The problems above explain the case for "yet another package manager".  So now we can talk about how Bower is better.  Bower is focused on front-end development, provides a flat dependency structure, and doesn't lock you in to a single way of doing things.  Let me break that down.

**Bower is focused on the front end.**  If you find a package registered on bower.io, you can be confident that it will useful on the front end, and won't be using node-specific dependencies.

**Bower has a flat dependency structure.**  If multiple libraries require a dependency, Bower will figure out the best version to load and place it in the top level of your bower_components directory.

**Bower doesn't lock you in.** Nothing about Bower is specific to a certain module format or build tool.  You can use it with RequireJS and Grunt, Webpack and Gulp, or by loading scripts directly into your HTML.

Bower addresses the pain points that come from manually managing your scripts or using npm.  You get easy version tracking and updating, keep your git logs clean, and can be confident that it will work cleanly with your existing setup.  If you're starting a new project or updating your dependencies on an existing one, consider using Bower to make your life easier.

### More Resources

- Want to hear the case for using npm in your front end development? You can find it [on their blog][npmblog].

- If you're interested in Bower, it's also worth checking out [Yeoman][yeoman], a project for quickly scaffolding out web projects using Bower and Grunt.



### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my [ongoing series on Marionette.js][marionette].

<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        Something npm is clearly <a href="http://blog.npmjs.org/post/101775448305/npm-and-front-end-packaging">encouraging</a>
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>



[bower]: http://bower.io/
[betterlaw]: http://en.wikipedia.org/wiki/Betteridge%27s_law_of_headlines
[npm]: https://www.npmjs.com/
[browserify]: http://browserify.org/
[marionette]: http://benmccormick.org/marionette-explained/
[npmblog]: http://blog.npmjs.org/post/101775448305/npm-and-front-end-packaging
[yeoman]: http://yeoman.io/
