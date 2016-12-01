---
title: "The Most Interesting Atom Packages I've found (so far)"
date: "2016-01-11 02:25:49+00:00"
layout: post
path: "/2016/01/11/the-most-interesting-atom-packages-ive-found-so-far"
---

I've been using [Atom][atom] as my primary text editor for the last 3 months.  I don't completely love it.  There are elements (startup speed, maturity of some core editing components, not being able to run it in a terminal) that I miss from my experiences with Vim and/or Sublime Text.  I'm using Atom though because the core editing experience is now "good enough" and the way the editor is built allows for some very cool and unique experiences.  Atom (like [Visual Studio Code][vsc]) is built on [Electron][electron], Github's JavaScript environment for building desktop apps.  Because it is built with web technologies and was designed from the beginning to be extensible, it is much easier for most developers to build rich visual extensions on top of Atom that provide unique UIs for editor functions than it is in Sublime Text, Vim, Emacs or an IDE.  The following are some of the "most interesting" Atom packages I've found.  Interesting in this case means that they really only could have been done as they are in Atom or a similarly flexible editor.


### Pigments

At first use, [Pigments][pigments] seems like a pretty run of the mill color highlighter.  There are similar projects for Sublime Text and Vim that look at color names in a CSS or LESS file and highlight them with the color they represent.

<img class="full-width" alt="pigment-preview" src="/posts/images/color_less_-__Users_Ben_Code_Windsor_wcui_dev_src_wcui_-_Atom.png">

But Pigments does much more than that.  In addition to highlighting text, Pigments searches your project and creates a directory of all the colors used in your projects.  You can look through your palette and quickly go to the definition of any individual color.  Because pigments tracks everything, it can highlight LESS/SCSS variables as well as plain color names, even if those variables were originally defined in a different file.  Pigments also hooks into Atom's autocomplete, and displays a preview of the color options when autofilling colors.

<img class="full-width" alt="Pigments project" src="/posts/images/Palette_-__Users_Ben_Code_Windsor_wcui_dev_src_wcui_-_Atom_and_Editor_-_benmccormick_org.png">

It is a rich way of managing colors for a whole project, the best way of seeing at a glance every color used in your CSS project that I've ever seen.

### Expose

[Expose][expose] is a file management tool modeled after Mac OSX's expose feature.  With it, you can instantly display all open files as small thumbnails, and switch quickly between them using the keyboard, which can be super helpful when tabs get out of control.

<img class="full-width" alt="expose" src="/posts/images/frequency_cap_es6_-__Users_Ben_Code_Windsor_wcui_dev_src_wcui_-_Atom_and_Editor_-_benmccormick_org.png">

### Autocomplete-plus

[Autocomplete-plus][autocomplete] started as a community package but has now become part of the core editor.  It's also probably the least unique idea I'm listing here.  It's still worth including on this list though, for 2 reasons.  First, autocomplete plus has flexible visual context options, allowing autocomplete providers to show the type of the autocomplete option, a brief description, and potentially a more in depth description.  So users can distinguish between (for instance) completions offering a snippet, a function, a keyword, or an import.

<img class="full-width" alt="autocomplete-plus" src="/posts/images/frequency_cap_es6_-__Users_Ben_Code_Windsor_wcui_dev_src_wcui_-_Atom.png">

Autocomplete-plus is also a great example of the flexible nature of Atom.  Because Atom itself is made up of packages, with a very small core package, it's easy to replace key parts of the editor like the auto-complete package with a community version.  And if that version ends up being better in the long run, it's possible to pull that into the editors core, as happened with autocomplete-plus.

### Todo-show

[Todo-show][todo] is a cool little package that searches your project for comments containing TODO, FIXME, CHANGED, REVIEW and other configurable comment strings, and lists them as a table.  It's a simple idea that formalizes something that many developers do all the time.

<img class="full-width" alt="todo-show" src="/posts/images/frequency_cap_es6_-__Users_Ben_Code_Windsor_wcui_dev_src_wcui_-_Atom-1.png">

**Update**:  Twitter has pointed out this even crazier riff on this concept that I'd seen a while ago but had been unable to find when I dove back into Atom.  [Imdone](http://imdone.io/) is a trello-like experience in the editor for managing todos.

<div>
<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/ben336">@ben336</a> <a href="https://twitter.com/AtomEditor">@AtomEditor</a> You might also like imdone-atom. It&#39;s a drag and drop TODO task board with issue tracking integration!</p>&mdash; imdone.io (@imdoneIO) <a href="https://twitter.com/imdoneIO/status/686577997395013633">January 11, 2016</a></blockquote>
</div>

### Linter

Similar to autocomplete-plus, you may think you've seen [Linter][linter] before.  It's similar to Syntastic for Vim and SublimeLinter for Sublime Text.  But Atom's flexibility allows it to be better than both of those.  Like Syntastic and SublimeLinter, Linter integrates with many different linting providers to show errors and warnings that tools pick up on through static analysis in files.  But rather than being limited to the line-by-line gutter warnings or showing collections of warnings through awkward use of UI elements meant for a different purpose, Linter shows you a live collection of errors at the bottom of the file and lets you easily switch back and forth between that and errors for all open project files.

<img class="full-width" alt="linter" src="/posts/images/frequency_cap_es6_-__Users_Ben_Code_Windsor_wcui_dev_src_wcui_-_Atom-2.png">

### git-time-machine

[git-time-machine][time-machine] is the newest package on this list.  It's only a month old, but is quite possibly my favorite example of Atom's potential.  After setting it up, you can use a keyboard shortcut to see a bubble plot of that files git history, and then hover to see the commit messages, and click to see an old version of the file.  It is the most accessible UI I've ever seen for working with git history.

<img class="full-width" alt="time-machine" src="/posts/images/Fullscreen_1_10_16__9_24_PM.png">

### Subscribe

Thanks for taking the time to read this post!  Software tools are one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my post on [productive JavaScript development](http://benmccormick.org/2015/11/25/productive-javascript-development/).






[atom]:https://atom.io/
[vsc]:https://code.visualstudio.com/
[electron]: http://electron.atom.io/
[expose]:https://atom.io/packages/expose
[pigments]:https://github.com/abe33/atom-pigments
[autocomplete]: https://github.com/atom/autocomplete-plus/
[todo]: https://atom.io/packages/todo-show
[linter]: https://atom.io/packages/linter
[time-machine]: https://github.com/littlebee/git-time-machine
