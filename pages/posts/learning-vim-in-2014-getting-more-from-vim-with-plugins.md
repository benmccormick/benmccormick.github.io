---
title: "Learning Vim in 2014: Getting More from Vim with Plugins"
date: "2014-07-21 10:50:00+00:00"
layout: post
path: "/2014/07/21/learning-vim-in-2014-getting-more-from-vim-with-plugins"
---

It's impossible to design a tool that fits everyone's workflow perfectly.  No matter how many cases you hit, somebody will want to do something you don't support, will find your solution for their problem confusing, or they'll try to use your tool in a way you never imagined. Vim tries to deal with situations like that in 2 ways.  First by making it easy to [configure][configpost], and second by making it easy to extend.  Extending Vim happens through plugins. <span class="aside">
![xkcd workflow](/posts/images/xkcdworkflow.png)
</span>
Vim plugins allow you to enhance, change, or add to Vim's existing behaviors.  They're a powerful tool, and a key part of what has helped Vim remain relevant for 23 years, even as the computing world has changed dramatically around it.  They allow Vim to support languages that didn't exist the last time its core was updated, handle niche use cases that would never get solutions in the main Vim distribution, and also allow for powerful new features that benefit all users.

Your key focus when it comes to Vim plugins should be identifying your needs and finding plugins to fit them.  Don't just toss every plugin you see recommended somewhere into your .vim/bundle folder.  Plugins have costs; they slow down file loads, can fill up the key mapping space, and add complexity for users.  But they're also extremely powerful, and I recommend that everyone who controls their development environment think about using at least a few.

### Plugin Management: Hello Vundle

Before you install anything, you're going to need a strategy for managing your plugins.  Plugin management for Vim has a bit of a troubled history.  There's never been an official plugin management solution, and unlike Sublime Text's Package Control, there wasn't a simple, easy to use solution that the community standardized.  Instead, plugins were initially just placed into the .vim folder or elsewhere and then sourced in ~/.vimrc.  To allow for download or installation, authors used a variety of compression formats, including a Vim specific Vimball format.  Early efforts to standardize a process didn't go particulary well.


That changed with the rise of Github and Tim Pope's [Pathogen][pathogen].  Pathogen was the first plugin manager to make it relatively simple to include new plugins, by encouraging a standard directory format and installation process (using git repositories).  It began a standardization process that now means pretty much any modern Vim plugin can be installed with Pathogen without modification.

Despite Pathogen's historical significance, in 2014 you should use [Vundle][vundle], not Pathogen, to manage your plugins.  Vundle is an easy to use plugin manager that is compatible with the Pathogen format.  Vundle improves on Pathogen in several ways.  It allows you to list the plugins you want to use in your vimrc file, then will pull them down and install them for you.  So adding and removing plugins is just a configuration change, and it's always easy to see which ones you're currently using.  It makes it easy to pull plugins from a variety of sources, but optimizes for Github, and Vim.org.  Since roughly 99% of plugins that most users will need are available from one of those sources, this is extremely convenient.  You can find full documentation for using Vundle in its [Github repo][vundle], but trust me, it's the best option out there for 99% of users.

### What Can Plugins do for you?

Before you start installing plugins, it's worth thinking about what you need from them.  There are a few main purposes for using plugins.  I'm including a few examples of each to get you started as you figure out which plugins make sense for you.

#### Let Vim Get Your Files In Order

File management plugins are some of the most important plugins you can use with Vim.  Vim's built-in file management is pretty weak in some ways compared to editors like Sublime Text and TextMate.  Plugins can fill that gap.  The plugins listed below show several approaches to file management.  There's plenty of overlap in functionality here, but they're all worth trying to see which ones fit your style.

- [CtrlP][ctrlp] is probably my most used Vim plugin.  It provides fuzzy finding capabilities for Vim, to allow you to search for files in a similar way to Sublime Text's "Go To Anything" bar.

- [Ack.vim][ackvim] and [Ag.vim][agvim] are plugins to connect Vim with Ack and Ag respectively.  If you're not using one of these tools for code search, you [really should be][ackarticle].  They're much faster than grep or an IDE's built in search.  These plugins provide seamless integration for each within Vim, allowing you to easily jump to the code you're searching on, opening new tabs or splits if you like.

- [Unite.vim][unite] is an interesting attempt to combine the functionality of plugins like ctrlp, ack.vim and others into a single "omnisearch" interface.  I personally found it a bit unintuitive and poorly documented, but some people [swear by it][unitecred]. If you are able to make sense of it, it's certainly a great concept to pull in related functionality into a single interface.

- [The NERDTree][nerdtree] is one of the most popular Vim plugins out there.  It provides a more traditional side-drawer style navigation interface to complement Vim's other navigation options.  I personally prefer a "search over specifying" navigation style, so ctrlp and ack.vim work better for me.  But I keep NERDTree around for looking at other people's code in new projects, when I want to look around a directory to see what's available and how it's structured before diving in.

- [Projectionist.vim][projectionist] is something I've just begun to look into.  It's an interesting approach by Tim Pope to provide a more intuitive way to navigate structured projects.  Rather than fuzzy finding or sidebars, Projectionist invites you to create categories of files that you can open files from (for instance  model, view and controller files in a BackboneJS project).  This gives you the simplicity of traditional Vim file path opens while removing some of the memorization and clutter from the process.  Projectionist also allows you to specify alternate files for each file. That allows you to, for instance, jump quickly from a file to its unit test file.

#### Building On Vim's Built In Language

Another interesting class of Vim plugins are plugins that extend Vim's existing language concepts.  In my past few posts I've looked at how Vim is intended to be used by [combining composable commands with motions and text objects][language], then efficiently [repeating that process when possible][repeating].  

- [Surround.vim][surround] is another plugin by Tim Pope.  It provides an extra command to use with Vim's built in text objects. That command, `ys` allows you to surround a text object with some sort of enclosing tag. So `ysiw'` surrounds the current word with `'`, and `ysip<div class="example">` surrounds the current paragraph with `<div class="example">...</div>` tags.  There's also a separate command to replace surrounding characters with different ones.  It's extremely useful, especially for HTML editing and quoting.

- [commentary.vim][commentary] adds a "commenting" action, `gc` that can be used with existing motions.  So `gcc` comments out the current line, `gcG` comments out the remainder of a file, and so on.  This is yet another Tim Pope plugin.  I promise I'm not trying to make up for recommending Vundle over Pathogen, the guy has just been prolific.

- [Repeat.vim][repeat] is one final Tim Pope plugin for now.  Repeat allows you to extend the `.` command to work with user created commands.  It works with surround and commentary out of the box, but you can also set it up to work with your own commands. [The . command is one of the most important Vim commands][repeating], so being able to use it in more situations is definitely a win.

- [vim-text-obj-user][txtobj] is an interesting project to make it easy to create plugins that define custom text objects which then can be used with Vim commands like any other text object.  If that sounds scary to you, you can also take a look at the [list][toplugins] of plugins already built with the project, and use any that will be useful to you.

<img alt="Vim side by side styles" class="full-width" src="/posts/images/vimvisuals.png">

#### Help Vim Look Good

One of the best uses for plugins is making Vim a bit easier on the eyes. We can do a lot to change Vim's default look and feel.  For instance the screenshot above shows what MacVim looks like with and without loading my ~/.vimrc file and plugins.  If you're a writer or developer, you may be looking at Vim for as much as 8-10 hours a day.  So make it something you're happy to look at.

- Syntax highlighting plugins are one of the main things you can use to make your code easier to read.  Vim packages syntax highlighting for many common languages, but for less mainstream languages you'll need to download plugins to get syntax highlighting.  These plugins often may contain other niceties for the language, like syntax checking or support for compiling from within Vim.  For instance I use plugins for [Less][less], [CoffeeScript][coffeescript], and [Markdown][markdown].

- Colorschemes are also an important part of helping Vim look its best.  Most distributions of Vim bundle several colorschemes, but the most popular ones come as plugins.  If you're somebody who needs to know that somebody else has sweated the details of the tools you use so that you don't have to, I recommend [Solarized][solarized], a color scheme based on the relationships between different colors and designed to echo the readability of words on paper.  If you like to try different things and have more options, consider looking at [Base16][base16], a project to standardize color scheme creation for multiple editors.  The advantage of both of these schemes is that they're available for pretty much any editor or tool you'd want to use alongside or in place of Vim.

- [Thematic][thematic] is a tool to allow you to manage your visual schemes.  So if you like to use different color schemes or fonts in different situations, Thematic can make that easy. You can define a set of "themes", and then switch between them whenever you feel like it.  As somebody who uses Vim for both writing and programming, it's nice to be able to use different themes for different situations.  I currently use Solarized for code, and the Pencil theme for writing.  Thematic and Pencil are two of a [wide variety of plugins for writers][esau] that Reed Esau has written.

- [Airline][airline] is a plugin to pretty up your status bar.  It creates the nice triangular effects in the image above, and integrates with other plugins to show helpful information in the status bar.  It does require modified fonts to use though, so you'll need to have pretty full control of the system you're on to use this one.

#### Help Vim Understand Your Code

Vim is not an IDE.  By default it doesn't understand much about code, and very little about specific languages.  It offloads that knowledge to the operating system, through things like `:make` and `ctags`, and to plugins.  Here are a few plugins that can help make Vim a bit more "code aware".

- [Syntastic][syntastic] is a syntax checking plugin for Vim that integrates with external syntax checkers to provide in-editor feedback on your code as you make changes.  For instance, it can integrate with jshint, llvm or javac to provide immediate feedback on a file.

- [YouCompleteMe][ycm] is a code completion engine for Vim that builds on Vim's built in autocomplete features to offer "smart completion" for as many situations as possible.  It can integrate with Clang, Jedi, Omnisharp, and Vim's omnicompletion in order to bring smart autocomplete to a variety of languages.

- [Fugitive][fugitive] and [Git-gutter][gitgutter] are 2 plugins that bring Git integration into Vim.  Fugitive provides a wrapper around the Git executable to allow you to easily manage your git actions from within Vim. GitGutter focuses on individual files and lets you see where you've made uncommited modifications in the current file.  They complement each other well, and are both very useful for heavy Git users.

- [delimitMate][delimit] is a simple plugin that removes a huge annoyance by auto inserting matching braces and brackets in a smart, intuitive way.  Lack of auto brace insertion was a big mental hurdle for me coming from Sublime Text.  DelimitMate makes things work the way I expect.

- Language specific plugins are another plugin group worth investigating.  There are way too many examples to list here, but one that I use and enjoy is [TernJs][tern], a code intelligence plugin for Javascript that you can use with something like YouCompleteMe to get the type of IDE style autocompletion that is very rare for Javascript code.

#### Help Vim Play Nice With Others

Some plugins exist to provide tighter integration between Vim and external programs.  We've already touched on a few of those, like Ack.vim and Syntastic.  Vim is intended to follow the Unix philosophy of doing one thing well and working well with other programs.  Integration plugins allow for deeper versions of that.

- [Tmux Navigator][tmuxnav] is a must have plugin for [Tmux][tmux] users.  It allows you to easily move between tmux and Vim splits using a single set of keyboard mappings.  It lets Vim and tmux work together in a completely natural way, without the user having to keep track of where one ends and the other begins.  

- [Dash.vim][dash] is an OSX only plugin that provides integration with Dash.app, a documentation manager app for OSX, making it easy to look up library method definitions from within Vim.

#### Grant Vim Superpowers

The last category of plugins are scripts that allow Vim to do things that are totally different than anything it can do on its own.  These may be features pulled from other editors, or features inspired by Vim but implemented differently than the Vim core.  These can be pretty amazing, but I'd be careful with them to start.  You'll want to learn how Vim works before piling a bunch of big extensions on top of it.

- [Ultisnips][ultisnips] allows Vim to use Textmate like "snippets" that allow you to save canned templates of code or text, then insert and modify them whenever you're ready.  If this sounds interesting, I'd recommend checking out the recent [Vimcast][ultivimcast] episodes where Drew explores Ultisnips.

- [EasyMotion][easymotion] is a plugin that introduces a new type of movement to Vim.  It creates alternative versions of the Vim movements like `f` and `w` that allow you to find a character or word anywhere on the screen, and specify it by using a key character that temporarily appears on the screen in place of each possible target character.  If that's hard to follow, check out the [demo][easydemo].

---

### More Resources

- [VimAwesome][vimawesome] is a recent project to collect popular Vim plugins in a beautiful, searchable format. It lists some categories similar to what I have above and sorts plugins by popularity.  It seems to pull rankings based on mentions in Github dotfiles, which is a creative and useful way of ranking plugins.

- [Vimcasts has a bunch of plugin related episodes][vimcastplugins], many of which touch on some of the plugins mentioned in this article

- Plugins are great, but only have real value if you understand how Vim can make you productive.  If you haven't seen them yet, consider checking out the [other posts][vim2014] in this series to learn how Vim works before loading up on plugins.

---

### Subscribe

This was the sixth (and longest) entry in a series of posts on learning Vim in a modern way.  If you made it all the way down here, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). Also check out the [next post](http://benmccormick.org/2014/07/28/learning-vim-in-2014-copy-and-paste-the-vim-way/) in the series, covering Vim's copy and paste functionality.


[configpost]:http://benmccormick.org/2014/07/14/learning-vim-in-2014-configuring-vim/
[vim2014]: http://benmccormick.org/tag/learning-vim-in-2014/
[giveaway]:http://benmccormick.org/2014/07/11/new-twitter-feed-and-practical-vim-giveaway/
[pathogen]:https://github.com/tpope/vim-pathogen
[vundle]:https://github.com/gmarik/Vundle.vim
[ctrlp]:https://github.com/kien/ctrlp.vim
[ackvim]:https://github.com/mileszs/ack.vim
[agvim]:https://github.com/rking/ag.vim
[ackarticle]:http://benmccormick.org/2013/11/25/a-look-at-ack/
[unite]:https://github.com/Shougo/unite.vim
[unitecred]:http://www.codeography.com/2013/06/17/replacing-all-the-things-with-unite-vim.html
[nerdtree]:https://github.com/scrooloose/nerdtree
[projectionist]:https://github.com/tpope/vim-projectionist
[language]:http://benmccormick.org/2014/07/02/learning-vim-in-2014-vim-as-language/
[repeating]:http://benmccormick.org/2014/07/16/learning-vim-in-2014-vim-as-art/
[surround]:https://github.com/tpope/vim-surround
[commentary]:https://github.com/tpope/vim-commentary
[repeat]:https://github.com/tpope/vim-repeat
[txtobj]:https://github.com/kana/vim-textobj-user
[toplugins]:https://github.com/kana/vim-textobj-user/wiki
[less]:https://github.com/groenewege/vim-less
[coffeescript]:https://github.com/kchmck/vim-coffee-script
[markdown]:https://github.com/plasticboy/vim-markdown
[solarized]:http://ethanschoonover.com/solarized
[base16]:https://github.com/chriskempson/base16
[thematic]:https://github.com/reedes/vim-thematic
[airline]:https://github.com/bling/vim-airline
[esau]: http://wynnnetherland.com/journal/reed-esau-s-growing-list-of-vim-plugins-for-writers
[syntastic]:https://github.com/scrooloose/syntastic
[ycm]:https://github.com/Valloric/YouCompleteMe
[fugitive]:https://github.com/tpope/vim-fugitive
[gitgutter]:https://github.com/jisaacks/GitGutter
[delimit]:https://github.com/Raimondi/delimitMate
[tern]:http://ternjs.net/
[tmuxnav]:https://github.com/christoomey/vim-tmux-navigator
[tmux]:http://tmux.sourceforge.net/
[dash]:http://kapeli.com/dash
[ultisnips]:https://github.com/SirVer/ultisnips
[ultivimcast]:http://vimcasts.org/episodes/meet-ultisnips/
[easymotion]:https://github.com/Lokaltog/vim-easymotion
[easydemo]:https://camo.githubusercontent.com/d5f800b9602faaeccc2738c302776a8a11797a0e/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f333739373036322f323033393335392f61386539333864362d383939662d313165332d383738392d3630303235656138333635362e676966
[vimawesome]:http://vimawesome.com/
[vimcastplugins]:http://vimcasts.org/categories/plugins/
