---
title: "Learning Vim in 2014: Search"
date: "2014-08-04 01:16:20+00:00"
layout: "post"
path: "/2014/08/04/learning-vim-in-2014-search"
description: "How to search for anything in Vim"
keywords: "vim, search"
pageViews: "10218"
last30pageViews: "36"
---

Have you ever tried to summarize something that was just too big to explain?  I've covered a lot of ground in my posts on Vim this past month, but it's only scratched the surface of what Vim has to offer.  The goal was to create a foundation that people could start with, and then let them build on their own. There's not a conclusive way to say what somebody "needs to know" when learning Vim.  Most people don't (and shouldn't) use every feature of the editor, they use the ones that make sense for them.  So I've tried to cover the things that I know people have found useful, and the philosophy behind how Vim works, and then let you figure out what you'd like to use on your own.  This post wraps up the series, but I wanted to highlight one last feature of Vim, its fantastic search capabilities.

### Search

Vim has an extremely powerful built in search tool.  To use it, you can type `/` at anytime in normal mode to start entering search terms.  For instance `/foo` followed by enter searches for the next occurrence of `foo` in the document.  You can then skip over matches with `n` or go backwards with `N`.  If you wanted to start by searching backwards, you could have started with `?foo` instead of `/foo`, in which case `n` and `N` would reverse behavior, with `N` moving forward in the document and `n` moving back.  It's easiest to think of `n` as "next match" and `N` as "previous match", with the direction determined by the search operator, `/` or `?`.

The search tool can be used for more than simple literal expressions, it also takes regular expressions.  So `/fo.\|bar` will match `foo`, `fox`, and `bar`.  You also can search for lines containing both foo and bar with the expression `/.*foo\&.*bar`.  If you want to dig deeper into Vim's regex language, I'd recommend typing in `:h pattern` to check out the excellent documentation.

### Substitute

Search is great, but in many cases what we want to use it for is replacing or acting on each instance.  Vim's search and replace command looks something like `:%s/foo/bar/g`, which will replace all occurences of `foo` in the document with `bar`.  Let's break that down a bit.  `:s` (substitute) is Vim's search and replace command.  By default it only works on the current line, so in order to get it to act on the whole document I prepended the `%` character, which sets the range to include everything.  If you want a smaller range, you can select the text you want to act on in visual mode. Typing `:` will then preload the range into the command area.  Substitute takes an expression in the form `/<search expression>/<replace string>/<modifiers>`  where search expression defines the search, replace string is the text to substitute in, and modifiers are single letter arguments that change the behavior.  By default only the first instance of an expression per line is substituted, so I added the `g` modifier to tell Vim to substitute all instances of the search expression on a line.  Other useful modifiers are `i`, which makes the search case insensitive, and `c` which has Vim prompt for confirmation before substituting each instance. Confirmation is helpful if you want to change most but not all occurences of a phrase. One useful behavior of substitute to be aware of: If you leave the search expression blank, it reuses your last search.  So if you've been playing around with a regex to get the right expression, once you get it right you can type `:%s//<replacement>/g`, and it will replace all instances, without forcing you to retype your complicated regex.

Finally, it's worth noting that search plays nicely with Vim's [composable actions][vimaslanguage], and you can use it as a motion command with `y`, `c`, `d` or other actions.  For instance `d/foo` will delete all text up to the next occurence of foo in the document. `y?foo` will yank all text backwards to the previous occurence of foo in the document.

### Inline Searching

Along with the primary search and substitute commands, Vim has other specialty searching tools.  One of these is its `f` and `t` commands. `f<char>` moves to a single character on the current line.  While less powerful than `/`, this can be super useful because of its quick composability and guarantee of not moving out of the current scope.  It's really easy to type `cf)` to delete through the end of the parentheses.  `t` works similarly, but is non-inclusive, so you can use `ct)` to delete everything up to and not including the parentheses.  I remember it as "change find character" and "change to character" respectively.  Like `/`, these commands support backwards and repeated search.  `F` and `T` search backwards on the current line, and `;` and `,` are the default commands for "next match" and "previous match" respectively.

### Cross-file searching with vimgrep and grep

Searching within a file is nice, but what if you want to search in multiple files?  Vim provides 2 commands for that.  The first, `:vimgrep`, uses Vim's internal regex engines to search across multiple files. You could for instance type `:vimgrep /function/i ./*.js` to search all Javascript files in the current directory for the "function" keyword.  You'd then be able to loop through them using the `:ln` and `:lp` commands.

The second command, `:grep`, integrates with an external search application (grep by default), to do the searching.  The advantage of the first is that it's portable and will be available anywhere and everywhere that Vim is.  But generally external tools are going to be faster than Vim's internal search engine.  Grep for instance is faster than vimgrep.  I personally use the external tool [ack][ack] which is faster than grep.  Regardless though, Vim has support for whatever approach you choose to take.

### Cross-file replace with the arglist

Up till now we've mostly been dealing with tasks that Vim has good answers for.  If you want to do a search and replace across multiple files in Vim though, you end up in some of the more esoteric parts of Vim-land.  In order to do a search and replace across multiple files in Vim, you need to first define a set of files to edit, and then run the replace command.  Unfortunately there is no way in Vim to cleanly do this all in a single command.  Instead you must pull your list of files from one of 3 places, the arglist, the buffer list, or the window list.  The arglist is by default the files that you specified to open when you initially opened Vim, the buffer list is your list of currently opened buffers, and the window list is the list of files in currently open windows.  Since you probably don't want to have to open or view all the files that you want to run a search/replace on, and you may want to have files open or visible without running a replace on them, the arglist is the list of choice for replacements.  Vim allows you to edit the contents of the arglist at any time using the `:argadd` and `argdelete` commands.  So to replace `foo` with `bar` for all javascript files in the current directory you might type something like.

```vimscript
:argd * "Clear arglist
:arga ./*.js  "Add javascript files
:argdo %s/foo/bar/g "Substitute on each file
```

`argdo` is the command to execute a command across all files in the arglist.  `bufdo`, `tabdo`, and `windo` work the same way for every "open buffer", "active window in each tab", and "window in the current tab" respectively. Personally I find this all to be a pain.  A single command that let you specify an action and a range to run it on like `:do '%s/foo/bar/g' ./*.js` would make plenty of sense.  But since that doesn't exist, it's worth at least knowing that the arglist is there, and being able to resort to it if necessary.

### The Power Of Search

Most people start out using Vim knowing that they can move around with *hjkl* and switch between files with `:e <filename>` as they learn more they grow their toolbox. Search is a great tool for moving quickly around text in Vim, and for powerfully making big edits.  Searching allows you to allow your brain to focus on the big picture, rather than remembering exactly where each piece of code or content is located. Like everything else in Vim, it's a tool that you can combine with other tools to create powerful workflows.

---



### More Resources

- [Vimcasts](http://vimcasts.org/episodes/operating-on-search-matches-using-gn/) has a nice piece on the `gn` command, an alternative to `n` that lets you select the next search match in visual mode

- [Vim's wiki](http://vim.wikia.com/wiki/Search_and_replace) also has a nice writeup of the `:substitute` command, with lots of examples and details.



---



### Subscribe

This was the seventh entry in a series of posts on learning Vim in a modern way.  If you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). Also check out the [other posts][vim2014] in the series.



[vim2014]: http://benmccormick.org/tag/learning-vim-in-2014/
[vimaslanguage]:http://benmccormick.org/2014/07/02/learning-vim-in-2014-vim-as-language/
[ack]: http://beyondgrep.com/
