---
title: "Learning Vim in 2014: Configuring Vim"
date: "2014-07-14T10:50:00+00:00"
layout: "post"
path: "/2014/07/14/learning-vim-in-2014-configuring-vim"
description: "How to set up a modern vim config"
keywords: "vim configuration vimrc"
category: "tools"
readNext: "learning-vim,vim-files,vim-language"
pageViews: "39162"
last30pageViews: "721"
---

Plenty of Vim articles you'll find online start you off in the wrong place. Instead of teaching you how Vim works, they toss a bunch of scary looking code at you, tell you to shove it in a file, and claim that it will make Vim just like Textmate / Sublime / Emacs / Visual Studio. Except way cooler!  People quickly find out that if what they want is to use their old editor, they should just *use their old editor*, and learn to use it as efficiently as possible.

While writing about Vim the last few weeks, I've avoided recommending any configuration changes, other than the quick [sanity vimrc](https://gist.github.com/benmccormick/4e4bc44d8135cfc43fc3) I recommended in the first article, because I think it's important to learn what sets Vim apart before trying to configure it.  Not because it's good enough without configuration (honestly it's not), but because once you understand the core, you can use configuration to build a great version of Vim instead of trying to hack together a Rube-Goldberg Textmate clone. But now that I've covered some of the basics (and if you haven't yet, feel free to go ahead and start at [the beginning][part1]), it's time to look at Vim configuration.

### Basic Configuration

Configuration for Vim starts with a vimrc file. It's a text file located by default at `~/.vimrc` on *nix systems, and ` $VIM\_vimrc` on Windows.  To begin configuration you need to open that file, creating it if it doesn't exist. But before we go further, we should stop and figure out what we're doing.

I said that configuration starts with the vimrc file, but the truth is that your vimrc is just a normal text file that Vim sources by default.  The heart of Vim configuration is Vimscript, Vim's custom scripting language.  Vimscript is a full programming language, with variables and control structures.  But for this article we're going to focus on using it for configuration.

The basic commands that Vimscript uses for configuration are `let`, `set`, and `map`. `let` allows you to change a variable value with the syntax `let <var-name>=<value>`. `set` allows you to read or change an option value using `set <option-name>` for toggle options or `set <option-name>=<option-value>` for numeric or string-based options. `map` and its many variations allow you to create new keymappings by setting the output of one key combination to produce the value of another key combination.  You can use variations on map to specify how a key sequence should behave in different vim modes.

### Know what you're configuring

Now that you know the basic commands, I could show you an example .vimrc, explain it a bit and then tell you to copy it, change the stuff you don't like, and go on your way.  The problem with that? It leaves your vimrc file as a "pile of junk", that I understand and you don't.   If I did a good job, you might understand the purpose of individual lines, but they probably wouldn't be the best fit for you, and you probably wouldn't know exactly how to make it better.  In the end you'll keep tossing junk onto it until it becomes a confusing mess you want to avoid.  So instead, I'm going to walk through the types of configurations you might want to consider, give a few examples, and let you build from there.  So here are a few concepts to think about as you construct your vimrc file:

#### Adapt to your environment

Vi and Vim were originally developed in a low-resource terminal based environment.  Many of their default settings and assumptions reflect that.  Today though Vim is used in a wide variety of ways, from multimonitor Mac Pros with 16+GB of memory running multiple MacVim windows, to low memory remote servers running Vim in the terminal over ssh.  If you know what your environment will look like, you can optimize Vim for your own use.

For instance, if you're running in a high resource environment, (and pretty much any modern laptop or desktop these days qualifies as a high resource environment) you may want to enable some features that Vim disables by default, since those removing those features allow it to work well in very low memory situations.  Some  common choices:

```vimscript
syntax enable " Turn on syntax highlighting
set hidden " Leave hidden buffers open
set history=100 "by default Vim saves your last 8 commands.  We can handle more
```

On the other hand, if you know you're going to be running remotely on low resource machines, you might choose to disable those options to minimize the load and increase speed. I'll talk more about plugins in a later post, but they're another thing that works much better in your local environment than on remote servers, for both performance and logistical reasons.

#### Add some visual niceties

If we're honest, I think most people can agree Vim is pretty hard to look at out of the box.  Very few visual affordances, no syntax highlighting or line numbers, and it's style is dependent on your terminal color scheme or an ugly default gVim theme. But that's pretty easy to fix. We can get syntax highlighting and line numbers with this snippet:

```vimscript
syntax enable
set number
```

Getting a decent color scheme will require you to download it as a plugin, but if you've done that or if you like one of the colorschemes that ship with your Vim distribution it's easy to set up with `colorscheme <theme-name>`.  Beyond that, there's plenty more you can do to improve the visual feel of Vim.  I'd look into customizing your status bar, relative vs absolute line numbers, and plugins like [Airline][airline] and [Vim-Thematic][thematic].

#### Set up keybindings

Many of Vim's useful commands are either not given default keybindings, or are given hard to remember obtuse ones.  Don't want to spend your whole life typing `source ~/.vimrc` into each file everytime you add something to your configuration? I shortcut that to `\rr`.

```vimscript
map <leader>rr :source ~/.vimrc<CR>
```

You might be wondering what the <leader> notation is there.  The `<leader>` key is a Vim convention for a key that comes before user created keystrokes.  It's meant to minimize conflicts, and allow plugins to provide default mappings while still allowing the user a bit of flexibility.  The leader key can be set in your vimrc with the command `let mapleader=<yourleaderkey>`.  The default is `\`, and I would recommend leaving it that way to start.  You can change it later if you find it to be inconvenient, and it doesn't cause any conflicts since its the default key.  Common replacements like `,` overwrite useful functionality that may not be immediately obvious (`,` allows you to move backwards on a characterwise search for instance).

#### Configure plugins and file-type specific settings

I'll touch more on plugins in a future post, but many of them allow extensive configuration, including setting keybindings, changing default behaviors, and enabling/disabling extra functionality. All of that happens here in the vimrc and should mostly use the let/set/map commands that we've already seen.

You can also set file-type specific rules.  Rather than placing these in your main vimrc, these go into a special "file type plugins" directory, `~/.vim/ftplugin`.  Within that directory, you can create files like javascript.vim, python.vim or html.vim, and those files will be loaded after the vimrc when you open files of that type. Using those files, you can create completely separate profiles for each file type.

### Discover what's out there

I've intentionally avoided telling you what your vimrc should look like here.  I've tried to show you the big picture of what you can do, and now I'll leave it to you to figure out what pieces you need to be comfortable and productive.  It will be different for everybody.

My advice?  Now that you know what you're looking for, go and take a look at other people's configurations. Start with something like this [vimrc boilerplate][boiler], and add the things you like.

It's pretty easy to find good configurations online if you look.  [My vimrc file](https://github.com/ben336/dotfiles/blob/master/vim/vimrc.symlink) is on Github.  It's certainly not the best out there, but its relatively small and easy to follow.  If you know developers you admire who use Vim, ask to see their vimrc files, or see if they have any fancy tricks to share.  For those without those resources,  Github's [dotfile page][dotfileio] is a great place to look.  It contains links to several very detailed "dotfile repos" from various developers. You don't have to copy everything from these files (in fact you shouldn't), but you can pull the things that look useful, get rid of things that don't, and try things out as you slowly build up your own workspace, built to do the jobs that you need it to do.

---


### More Resources

- [Github's dotfile page][dotfileio] provides some great pointers to dotfile repositories from experienced developers that can help you come up with cool configuration ideas
- [Janus][janus] is a great resource for users who'd prefer to avoid configuration and just start with a useable editor.  Though if that's you, you may find you're better off [just using Sublime Text][sublime]


---


[janusconfig]: https://github.com/carlhuda/janus/tree/master/janus/vim
[part1]: http://benmccormick.org/2014/06/30/learning-vim-in-2014-the-basics/
[airline]:https://github.com/bling/vim-airline
[thematic]:https://github.com/reedes/vim-thematic
[dotfileio]: http://dotfiles.github.io/
[boiler]: https://github.com/benmccormick/dotfiles/blob/master/vim/vimrc.symlink
[janus]: https://github.com/carlhuda/janus
[sublime]:http://delvarworld.github.io/blog/2013/03/16/just-use-sublime-text/
[practicalvimgiveaway]: http://benmccormick.org/2014/07/11/new-twitter-feed-and-practical-vim-giveaway/
