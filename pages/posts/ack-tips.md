---
title: "Ack Tips"
date: "2016-04-30 15:48:25+00:00"
layout: post
path: "/2016/04/30/ack-tips"
description: "A set of tips for using Ack, a command line search tool"
keywords: "ack, command line, grep, ag"
---

*Last summer I briefly considered creating a separate blog focused on command line tools.  The idea is that the articles would be shorter and more practical than the longer pieces I write here.  I ended up scrapping the idea, but had written a few posts on one of my favorite command line tools Ack, so I wanted to preserve them here, as a single, longer piece, separated into 3 "tips"*

### #1: Prefer ack or ag to grep

[grep](http://linux.die.net/man/1/grep) is one of the most well known unix utilties.  If you've had any exposure to the command line at all, you've probably searched for something using grep.  grep's standalone use is searching for content inside of files, but with Unix's piping philosophy it is useful as a general search and filtering tool.  Originally created for Version 4 Unix 42 years ago, it has been a staple of \*Nix operating systems ever since.   If you've been using it for even half that time, I'm sure a blog post isn't enough to convince you to stop.  But for the rest of us, there's an opportunity to do better.

[ack](http://beyondgrep.com/) and [ag](https://github.com/ggreer/the_silver_searcher) <sup id="fnref:1">[1](#fn:1)</sup> are similar projects with the same goal: providing a better experience than grep when searching directories of files, particularly for programmers.  The key selling points:

1. Improved speed when searching through directories
2. Ignores version control and binary files by default when searching
3. Easy filtering by file-type
4. A cleaner API for searching directories, without adding complexity to the single file case

This is easiest to see by comparing commands.

#### Searching for "javascript" in a file

```
grep javascript foo.txt
```

```
ack javascript foo.txt
```

#### Searching every file in the current directory for "javascript"

```
grep -r javascript .
```

```
ack javascript
```

#### Searching every file in the current directory for "javascript", excluding a .git directory

```
grep -r javascript . $(find . -type f | grep -v '\.git')
```

```
ack javascript
```

#### Searching every HTML file in the current directory for "javascript", excluding a .git directory

```
grep -r javascript . $(find . -name '*.html' -or -name '*.htm'| grep -v '\.git')
```

```
ack --html javascript
```

Basically, as the complexity of what you're trying to do increases in terms of multiple files, the overhead of using grep increases proportionately.  Because ack and ag are optimized for common use cases, they're able to scale much better.

### #2: Use Ack to get familiar with a new codebase

[ack](http://beyondgrep.com/) is an incredibly useful tool when approaching a new codebase, especially if you're focused on a specific feature. It allows you to quickly get a view of the codebase, and then zero in on the functionality you're interested in.  To see how this works, let's use jQuery's [source repo](https://github.com/jquery/jquery) as an example, and see what happens if we want to get a look at how it implements ajax.

```bash get jQuery
❯ git clone git@github.com:jquery/jquery.git
❯ cd jquery
```

We can start by trying to get a general idea of the size of the codebase.  Running `ack -f` to show all files in the directory will immediately overrun our terminal, so we can get a file count using `wc` instead

```bash
❯ ack -f |wc -l
    249
```

Ok thats a good amount of files.  But how many of them are actually source files?  We can filter down to just the javascript files.

```bash
❯ ack -f --js |wc -l
    155
```

But thats probably still a bit high, since not all of the JavaScript files are source files.  A quick `ls` shows that we probably want to filter down to the src directory.

```bash
❯ ack -f --js src |wc -l
    92
```

Ok so now we're down to 92 source files.  Still a bit much, but its probably worth printing them with `ack -f --js src` at this point to get an idea of the directory structure.  When we do that, we can see there's an ajax folder, which is probably what we're interested in.  To make sure we're not missing related files, we can continue on to searching for files with ajax in the file name directly.

```bash
❯ ack -g --js ajax src
    src/ajax/jsonp.js
    src/ajax/load.js
    src/ajax/parseJSON.js
    src/ajax/parseXML.js
    src/ajax/script.js
    src/ajax/var/location.js
    src/ajax/var/nonce.js
    src/ajax/var/rquery.js
    src/ajax/xhr.js
    src/ajax.js
    src/event/ajax.js
```

That gets us down to 11 files to look at.  But we might be getting a bit greedy.  Not every file related to ajax may have ajax in the file path.  We can use the `-l` option of ack to display the list of files that contain ajax somewhere in their text.

```bash
❯ ack --js -l ajax src
    src/ajax/jsonp.js
    src/ajax/load.js
    src/ajax/script.js
    src/ajax/xhr.js
    src/ajax.js
    src/event/ajax.js
    src/jquery.js
    src/manipulation/_evalUrl.js
    src/serialize.js
```

Ok that adds 3 additional files with ajax references.  But its not clear that they're relevant to jQuery's ajax implementation, it may just be a file reference or comment.  Lets use ack to get a quick look at how ajax is referenced in those files.  This part gets a bit more complicated.  We can use ack's `-v` option to invert our matching and find non-matching inputs, then use unix piping to filter our previous command.

```bash
❯ ack --js -l ajax src |ack -v ajax
    src/jquery.js
    src/manipulation/_evalUrl.js
    src/serialize.js
```

Now we can use ack's `-x` argument to search the files piped in through standard input.

```
❯ ack --js -l ajax src |ack -v ajax|ack -x ajax

    src/jquery.js
    20:     "./ajax",
    21:     "./ajax/xhr",
    22:     "./ajax/script",
    23:     "./ajax/jsonp",
    24:     "./ajax/load",
    25:     "./event/ajax",

    src/manipulation/_evalUrl.js
    2:      "../ajax"
    6:      return jQuery.ajax({
    9:              // Make this explicit, since user can override this through ajaxSetup (#11264)

    src/serialize.js
    61:             traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
```

So we can see pretty quickly that these files are safe to ignore in terms of understanding how ajax works in jQuery.  They're just module loads, an actual call to the ajax method for other purposes, and settings serialization. It is useful to note that `src/ajax` is loaded into the main jQuery file first. Its probably worth looking at it as the starting point for our investigation. We're well on our way to diving into the ajax functionality, able to focus on 11 of the 249 files in the repo immediately, already knowing how those files are loaded into the main library.

This was just a simple example.  Whenever you're spelunking into new code territory, consider using ack to get your bearings.  Things go a lot faster when you know the lay of the land in advance.

### #3: Take advantage of Ack's configurability

One of the nice things about [ack](http://beyondgrep.com/) is the fact that it takes an `.ackrc` configuration file <sup id="fnref:2">[2](#fn:2)</sup>. These files can be scoped at a directory level, a user level or at a root level, and mirror the options available on the executable itself.  This allows you to extend and customize acks behavior in 3 primary ways.

#### a. Add new filetypes, and bundle existing ones

One of ack's most useful features is the ability to add a `--<filetype>` flag to your searches to restrict your searches to a specific filetype.   ack comes with 75 builtin types including almost all common languages.  But those aren't always good enough.  To handle obscure languages, and not so obscure syntaxes like handlebars templates, ack lets you define new filetypes.  You're also able to modify existing filetypes to add additional file extensions to include under that filetype.  So for instance my ackrc includes these lines:

```
--type-add
hbs=hbs
--type-add
js=js,es6
```

The first 2 lines allow me to specifically search handlebars files, which are where all of the html content for my work projects is stored.  The next 2 lines include es6 files in my JavaScript searches, useful since I append JavaScript files that I intend to process with [Babel](https://babeljs.io/) with the `.es6` extenstion.  Customizing the js extension allows me to search all of my JavaScript together.  You can also define richer types in ackrc [based on file names using regular expressions or direct name matching](http://beyondgrep.com/documentation/ack-2.14-man.html#defining_your_own_types).

#### b. Set default options

Any option that the ack executable takes can have a default set or changed in an ackrc file.  This is mainly useful for the display option.  By default ack groups matches from different files and gives the file information above each group of matches.  It also shows all output in color.  Any of those things can be disabled or changed in your ackrc file.

#### c. Exclude unwanted directories or files

Oftentimes there are a predictable group of files that you may want to ignore in searches.  Perhaps you have a build directory that mirrors your source code, or documentation files mingled with your source.  You can put `--ignore-directory` or `--ignore-file`.  Ignore directory takes a directory name, while ignore-file takes matches in the same format as the custom filetypes mentioned above.

If you're starting to use ack, don't miss the chance to make your searches even more efficient by removing any rough edges with an `.ackrc`.


#### Installation Instructions

- [ack](http://beyondgrep.com/install/)
- [ag](https://github.com/ggreer/the_silver_searcher#installing)


### Subscribe

Thanks for taking the time to read this post!  Using tools efficiently is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my articles on [Vim](http://benmccormick.org/learning-vim-in-2014/).



<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
    <p>
       ack came first; ag was created as a faster version of ack.  ack is written in perl, making it more portable, and has a few more configuration options.  ag is written in C and is generally faster.  Your choice may vary depending on your use case.
    </p>
    <a href="#fnref:1" title="return to article"> ↩</a>
    </li>
    <li class="footnote" id="fn:2">
        <p>
       This is also one of the main traits that separates ack from <a href="https://github.com/ggreer/the_silver_searcher">ag</a>.
        </p>
        <a href="#fnref:2" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>
