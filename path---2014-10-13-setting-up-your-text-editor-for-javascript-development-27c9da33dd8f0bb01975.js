webpackJsonp([0xf92f33e4d6ab2000],{"./node_modules/json-loader/index.js!./.cache/json/2014-10-13-setting-up-your-text-editor-for-javascript-development.json":function(e,t){e.exports={data:{markdownRemark:{html:'<p>The coding workflow for JavaScript developers gets better all the time.  Over the last 10 years, the JavaScript ecosystem has built up a rich set of tools to make your life easier.  Most of the buzz around tooling comes from browser devtools and the various build systems available for JavaScript projects, but you can also take advantage of improved tools within your code editor.  While there are some great IDEs for JavaScript development out there like WebStorm and Visual Studio, most JavaScript developers seem to prefer lighter-weight text editors.  So this post is going to be a quick look at the tools I use for more seamless JavaScript development in a text editor.</p>\n<h3>Basics</h3>\n<p>Before we get to anything JavaScript specific, there are a few important things to set up.  First, I’m assuming that you’re using a modern, extensible text editor. Those include, but are not limited to: <a href="http://www.sublimetext.com/">Sublime Text</a>, <a href="http://www.vim.org/">Vim</a>, <a href="https://atom.io/">Atom</a> and <a href="http://www.gnu.org/software/emacs/">Emacs</a>. There is great support for all of the below tips in each of these editors<sup id="fnref:0"><a href="#fn:0">1</a></sup>.</p>\n<p>In addition you should have</p>\n<ol>\n<li>Reasonable default configurations<sup id="fnref:1"><a href="#fn:1">2</a></sup></li>\n<li>A fast system for navigating between files<sup id="fnref:2"><a href="#fn:2">3</a></sup></li>\n<li>Great code searching<sup id="fnref:3"><a href="#fn:3">4</a></sup></li>\n</ol>\n<p>If you’re still working through those things, make sure to take the time to learn a bit more about your editor along with any JavaScript specific tools you use.  There’s a ton of efficiency you can gain from having those 3 things in place.</p>\n<p>Finally the first two tips below require <a href="http://nodejs.org/">node.JS</a> and npm to be installed, as they rely on node libraries to function.  If you’ve never installed those before, the process is pretty painless.</p>\n<p>Once you have all of that in place, we can move on to other things.</p>\n<h3>Syntax Linting</h3>\n<p>JavaScript is a dynamic, weakly-typed language.  It is also written by human beings.  As a result, it can be easy to start running bad code without realizing that it has problems.  Some types of problems you’ll find out about quickly.  Bad syntax will halt program execution for instance.  But others will linger, subtly effecting logic or just making the code hard to understand for future developers (including yourself).   </p>\n<p>JavaScript linters (also called syntax checkers) can provide some of the safety of a compiler, and also help enforce a consistent set of styles to help maintain readability.  They are not magic.  JavaScript is still a weakly typed language with some weird syntactical sinkholes. It’s relatively easy to make logic mistakes if you’re undisciplined.  But linters are a great safety tool, especially for developers newer to JavaScript and its conventions.  Run as part of a build process, they can prevent you shipping bad code and help standardize conventions across a team</p>\n<p>While it’s a great idea to make linters part of your build process, you get even more power from integrating them with your editor.  Almost all modern text editors include some sort of plugin for displaying syntax errors and warnings in the gutter to the left of the text.  You can check out the integration pages for <a href="http://eslint.org/docs/integrations/">ESLint</a> and <a href="http://www.jshint.com/install/">jsHint</a> to get a feel for the plugins available for your editor.  </p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="undefined"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; z-index: -1; display: block; "\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 82.47422680412372%;position: relative; width: 100%; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAIAAACZeshMAAAACXBIWXMAABYlAAAWJQFJUiTwAAACZUlEQVQoz5VT227TQBDNX+SNP0hje22v17v2ru11El9yaRsoUYWKhPoAiAhUEaUlLQ9F4icQxa1ClV7UIgVoVR75MGYTFSRIHxiNRrPePTtn5qxL3w4+fj3/cPLlaDqdXl3uHBbFeDw+mUyK4vDTwUFRFMeT08+nF+PJ+eX06uj47Pr65ueP7+A304tSHMdZmsgoTKVsR2HeqK8st7Ms6XZXwjAIhPCTruy9iNdfyl6/tv6q++DRuzW+v8ZP9zZLjzH2PVapVOJYOg42TRNjGxJsq0gcR9f1yiIbDoelh5bFGFVgx+HYNk2kaZph6MhQhpCpaeadYMaYNwN7HgPCaZpAhOt83/M9z3Vd2CWmzlwHviDCDZtalEHB3d1RCTC+r2gjhHzT9BByXQLOfc8lpHK3qcqUUqgDVKHJyv/YnLYCQ3sLT1SrS7OobAEYaAND6CTyJZcNmbZFnIWRlI2slrbyzjKtxXl3tdNuUur+DQ4EY7cDS4IgcN26YJHwkqQOIrOgTgVcGmMhQIJ/Ks9oz8FGtQpC2Qh00i3LAtmWlqqgPChW1SBXtmBgsAgZ68gooiQVbp5n9VrcEG4t5AamBmaIEJMxXdN+g/v9vhrY/IWBwpz7sISS0B7kLnGE4LZDlbbEMxjTLEsnxPJ9eHYKDOfmk3ARkhgzBwzb2GaUEqIeBkTYVYRvac/5DwaDP7TrcRTLEH4GGD7IDjCYAptRINRDjlLE5lyHETAGPhqNStnGVr6xFS1vxKFst5qtVjPP015///6zt6tP9zqbO80n29u9eFveG/Dym6A8FOXXvAz52fvnvwBbjv9L12jLgAAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="linting picture"\n        title=""\n        src="/static/408e8e46351809a2a211494fb1bf74ae-d766e.png"\n        srcset="/static/408e8e46351809a2a211494fb1bf74ae-a6b6e.png 143w,\n/static/408e8e46351809a2a211494fb1bf74ae-8e488.png 285w,\n/static/408e8e46351809a2a211494fb1bf74ae-d766e.png 570w,\n/static/408e8e46351809a2a211494fb1bf74ae-13239.png 855w,\n/static/408e8e46351809a2a211494fb1bf74ae-141ef.png 970w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<h3>TernJS + Autocomplete</h3>\n<p>Linters are great for telling you what not to do, but can’t give you much guidance on what you actually are able to do.  Fortunately we have other tools for that.  <a href="http://ternjs.net/">Tern.js</a> is a fantastic library that provides “intellisense” style autocompleting for JavaScript code, along with other IDE-like features including documentation links and refactoring support. It’s not perfect, since JavaScript’s nondeterministic syntax sometimes makes it hard to tell what properties a variable will actually have at runtime, but it takes a good shot at it and is able to go pretty far, especially for libraries where it can expose the full API to you within the editor.  To get the most out of Tern, you’ll need to set up a Tern project definition, where you can specify any files that you always want loaded, and any plugins you want to use. The preloaded files is useful if you’re making global references to a namespace or library, and the plugins can give you support for module systems, so that you can handle references that are passed into a module from a different file in code using requireJS or Angular.</p>\n<p><img src="/46e25e5899958f3bd960e5692375a92b.gif" alt="ternjs picture"></p>\n<h3>Snippets</h3>\n<p>JavaScript development, especially on the front end, can involve a lot of repetitive boilerplate code<sup id="fnref:4"><a href="#fn:4">5</a></sup>.  Whether it’s module boilerplate like AMD require/define wrappers, library boilerplate like directive definitions in Angular or a Model definition in Backbone, or our own favorite patterns that we repeat a lot, we end up writing a lot of code over and over again.  Snippets are a great way to accomplish that.  They were one of the key features of Textmate when it first became popular.  Today they’re built in to Sublime Text and Atom, and there are popular libraries for both <a href="https://github.com/SirVer/ultisnips">Vim</a> and <a href="https://github.com/capitaomorte/yasnippet">Emacs</a> to simulate the same functionality.</p>\n<p>Snippets allow you to define templates for common boilerplate code, allowing you to quickly insert repetitive content, including adding hooks for text that will vary across uses.  For instance here’s a snippet I have defined for creating a new AMD module<sup id="fnref:5"><a href="#fn:5">6</a></sup>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>#A new AMD define module\nsnippet dfn\ndefine([$1],function($2) {\n    $0  \n});\nendsnippet</code></pre>\n      </div>\n<p>This allows me to type <em>dfn&#x3C;tab></em> at any time to expand out the template.  Initially my cursor will be in spot <code>$1</code>, and I can then enter text and tab to spot <code>$2</code>, with my final tab ending me at <code>$0</code>.  Snippet libraries can also provide other functionality like functions to show the current time, filename, or other contextual information.   Some can also mirror text so that you can enter a string once and have it appear throughout the template.  It can be a great time saver when you’re chugging through the boilerplate code of your project.</p>\n<hr>\n<h3>More Resources</h3>\n<ul>\n<li>\n<p>If you want to implement JavaScript syntax checking definitely check out <a href="http://eslint.org/">ESLint</a> or <a href="http://www.jshint.com/">jsHint</a>.  They both offer a lot more options and flexibility than <a href="http://www.jslint.com/">jsLint</a>, the pioneer in this area.  It’s pretty easy to find an integration plugin for most common editors through those websites or Google, but <a href="https://github.com/scrooloose/syntasticsu">Syntastic</a> for Vim and <a href="https://github.com/SublimeLinter/SublimeLinter3j">Sublime Linter</a> for Sublime Text come especially recommended and have the advantage of supporting all 3 major JavaScript linters as well as syntax checking for multiple languages.</p>\n</li>\n<li>\n<p><a href="http://ternjs.net/">Tern’s website</a> has great documentation and links to the editor specific implementations for different editors.  If you’re a Vim user I’d also recommend taking a look at <a href="https://github.com/Valloric/YouCompleteMe">YouCompleteMe</a> for an improved autocomplete interface that works well with Tern and UltiSnips.</p>\n</li>\n<li>\n<p>For snippet libraries, you can take a look at <a href="https://github.com/SirVer/ultisnips">UltiSnips</a> for Vim and <a href="https://github.com/capitaomorte/yasnippet">Yasnippet</a> for Emacs.  If you want an application agnostic snippet solution, <a href="http://kapeli.com/dash">Dash</a> is a documentation management program for OSX that also has a rich snippet component you can use in any program the same way you’d use an editor specific solution.</p>\n</li>\n</ul>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:0">\n        <p> Other than the lack of an official Tern plugin for Atom\n        <a href="#fnref:0" title="return to article"> ↩</a></p>\n    </li>\n    <li class="footnote" id="fn:1">\n        <p>\n        Sublime Text and Atom provide pretty reasonable defaults. Vim users could consider checking out my piece on <a href="http://benmccormick.org/2014/07/14/learning-vim-in-2014-configuring-vim/">configuring Vim</a>.  I don\'t know enough to advise for Emacs, you\'re on your own their, but google is your friend.\n        <a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n    <li class="footnote" id="fn:2">\n        <p>\n        This really deserves a post of its own, not a footnote, but in general my approach to this is fuzzy search, split panes and a way to retrace my movements.   \n        <a href="#fnref:2" title="return to article"> ↩</a></p>\n    </li>\n    <li class="footnote" id="fn:3">\n        <p>\n        Sublime Text and Atom have reasonably nice built in search tools, but I\'d recommend using a plugin that integrates with ack or ag, two <a href="http://benmccormick.org/2013/11/25/a-look-at-ack/">very nice search tools</a>.  I don\'t see such a plugin for Atom on their repository site right now, but the other 3 certainly support it.\n        <a href="#fnref:3" title="return to article"> ↩</a></p>\n    </li>\n    <li class="footnote" id="fn:4">\n        <p>\n        Hopefully not too much obviously\n        <a href="#fnref:4" title="return to article"> ↩</a></p>\n    </li>\n    <li class="footnote" id="fn:5">\n        <p>\n        This is using the syntax for Vim\'s Ultisnips plugin.\n        <a href="#fnref:5" title="return to article"> ↩</a></p>\n    </li>\n</ol>\n</div>',frontmatter:{title:"Setting Up Your Text Editor For JavaScript Development",keywords:null,category:"tools",date:"2014-10-13T01:05:51+00:00",path:"/2014/10/13/setting-up-your-text-editor-for-javascript-development",layout:"post",hideFooter:null}}},pathContext:{slug:"/2014/10/13/setting-up-your-text-editor-for-javascript-development",relatedPosts:[{title:"Learning Vim in 2014",path:"/learning-vim-in-2014",description:"A series of beginner level articles on Vim"},{title:"The Most Interesting Atom Packages I've found (so far)",path:"/2016/01/11/the-most-interesting-atom-packages-ive-found-so-far",description:"A rundown of the coolest Atom packages I've seen"},{title:"Vim Workflows: File Switching",path:"/2014/11/10/vim-workflows-file-switching-strategies",description:"A look at the different approaches you can take to managing files in Vim"}]}}}});
//# sourceMappingURL=path---2014-10-13-setting-up-your-text-editor-for-javascript-development-27c9da33dd8f0bb01975.js.map