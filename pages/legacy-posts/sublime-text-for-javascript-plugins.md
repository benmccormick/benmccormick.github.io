---
title: "Sublime Text For Javascript: Packages"
date: "2013-01-03 21:00:00+00:00"
layout: post
path: "/2013/01/03/sublime-text-for-javascript-plugins"
---

This is the final post in my series on Sublime Text, and how to get the most out of the editor.
The series is focused on Javascript development, as that is how I use Sublime Text, but it
should be applicable to any developer who uses Sublime Text as part of their workflow.

 * [Sublime Text For Javascript: Keyboard Shortcuts][keyboard]
 * [Sublime Text For Javascript: Configuration][configuration]
 * [Sublime Text For Javascript: Packages][plugins]

A large part of Sublime Text's power comes from its extensive collection of packages.
There are packages for pretty much every use case.  I'm going to limit myself to listing 5 of the most useful for Javascript development, but its definitely worth looking around at the options to find more that fit what you want to do.


### #1. Package Control - The Essential Plugin

[Package Control][packagecontrol] is the very first package anyone should install for Sublime Text.  It makes it easy to install any other package without having to clone Git repositories or work through Sublimes file structure.  And the author has made it relatively easy to install Package control as well.  All that is required is a quick copy and paste of code provided on the developers website.  Package control makes it easy to install new packages, snippets, themes, and color schemes.

### #2. Sublime Linter - Write Better Code

[Sublime Linter][sublimelinter] is a code quality tool for Sublime Text that makes it easy to find and fix code that doesn't meet the standards that you define.  For javascript code you can choose to use jsHint[jshint] or jsLint[jslint], the two most popular javascript linters.  I highly recommend this package.  It places a border around lines that are non-conformant with a message in the bottom border of the editor, but otherwise stays out of your way.  It makes it easy to fix code issues as you're editing, rather than waiting till the end and getting a huge error dump when you run your code through the linter.

### #3. Emmet - Get Through The Boilerplate

[Emmet][Emmet] is a tool for web developers that allows you to use CSS style prefixes to quickly generate html code.  It allows quick generation of boilerplate HTML with a familiar syntax, so you can focus on code instead of markup.  The github project for the package is [here][Emmetplugin]

### #4. Git - Take Control Of Your Project Inside Your Editor

[Git][git] has rapidly become the go to version control system for open-source projects, and is also used by many private organizations and individual developers.  If you're using Git to manage your javascript projects, you should definitely install the [git package][gitplugin] for Sublime Text.  Its not a command line replacement, some commands move much slower than it would with command line, but it allows the convenience of using common commands like add, diff, and blame from within your editor.

### #5. Clipboard History - Improve your clipboard

[Clipboard History][clipboardhistory]  is a nice little utility that lets you see the recent history of your clipboard.  It only works for snippets copied from within Sublime Text, but its a nice little tool for refactoring, when you're moving code around quickly and want to delete something without losing it completely.

### Find your own

In the end different packages work for different people.  I highly recommend installing Package Control and browsing around through the options.  If you find a great package, leave a comment here and let me know.  There are a lot of packages out there, and everybody's needs are different



[keyboard]: http://benmccormick.org/2012/12/30/sublime-text-for-javascript-keyboard-shortcuts

[configuration]: http://benmccormick.org/2013/01/01/sublime-text-for-javascript-configuration

[plugins]: http://benmccormick.org/2013/01/03/sublime-text-for-javascript-plugins

[packagecontrol]: http://wbond.net/sublime_packages/package_control

[gitplugin]: https://github.com/kemayo/sublime-text-2-git/wiki

[git]: http://git-scm.com/

[sublimelinter]:https://github.com/SublimeLinter/SublimeLinter

[jshint]: http://www.jshint.com/

[jslint]: http://www.jslint.com/

[Emmet]: http://docs.emmet.io/

[Emmetplugin]: https://github.com/sergeche/emmet-sublime

[clipboardhistory]: https://github.com/kemayo/sublime-text-2-clipboard-history

