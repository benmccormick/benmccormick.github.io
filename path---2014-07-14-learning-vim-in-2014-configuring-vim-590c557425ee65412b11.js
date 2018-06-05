webpackJsonp([0x8d0295af3ed4],{743:function(e,t){e.exports={data:{markdownRemark:{html:'<p>Plenty of Vim articles you’ll find online start you off in the wrong place. Instead of teaching you how Vim works, they toss a bunch of scary looking code at you, tell you to shove it in a file, and claim that it will make Vim just like Textmate / Sublime / Emacs / Visual Studio. Except way cooler!  People quickly find out that if what they want is to use their old editor, they should just <em>use their old editor</em>, and learn to use it as efficiently as possible.</p>\n<p>While writing about Vim the last few weeks, I’ve avoided recommending any configuration changes, other than the quick <a href="https://gist.github.com/benmccormick/4e4bc44d8135cfc43fc3">sanity vimrc</a> I recommended in the first article, because I think it’s important to learn what sets Vim apart before trying to configure it.  Not because it’s good enough without configuration (honestly it’s not), but because once you understand the core, you can use configuration to build a great version of Vim instead of trying to hack together a Rube-Goldberg Textmate clone. But now that I’ve covered some of the basics (and if you haven’t yet, feel free to go ahead and start at <a href="http://benmccormick.org/2014/06/30/learning-vim-in-2014-the-basics/">the beginning</a>), it’s time to look at Vim configuration.</p>\n<h3>Basic Configuration</h3>\n<p>Configuration for Vim starts with a vimrc file. It’s a text file located by default at <code>~/.vimrc</code> on *nix systems, and <code>$VIM\\_vimrc</code> on Windows.  To begin configuration you need to open that file, creating it if it doesn’t exist. But before we go further, we should stop and figure out what we’re doing.</p>\n<p>I said that configuration starts with the vimrc file, but the truth is that your vimrc is just a normal text file that Vim sources by default.  The heart of Vim configuration is Vimscript, Vim’s custom scripting language.  Vimscript is a full programming language, with variables and control structures.  But for this article we’re going to focus on using it for configuration.</p>\n<p>The basic commands that Vimscript uses for configuration are <code>let</code>, <code>set</code>, and <code>map</code>. <code>let</code> allows you to change a variable value with the syntax <code>let &#x3C;var-name>=&#x3C;value></code>. <code>set</code> allows you to read or change an option value using <code>set &#x3C;option-name></code> for toggle options or <code>set &#x3C;option-name>=&#x3C;option-value></code> for numeric or string-based options. <code>map</code> and its many variations allow you to create new keymappings by setting the output of one key combination to produce the value of another key combination.  You can use variations on map to specify how a key sequence should behave in different vim modes.</p>\n<h3>Know what you’re configuring</h3>\n<p>Now that you know the basic commands, I could show you an example .vimrc, explain it a bit and then tell you to copy it, change the stuff you don’t like, and go on your way.  The problem with that? It leaves your vimrc file as a “pile of junk”, that I understand and you don’t.   If I did a good job, you might understand the purpose of individual lines, but they probably wouldn’t be the best fit for you, and you probably wouldn’t know exactly how to make it better.  In the end you’ll keep tossing junk onto it until it becomes a confusing mess you want to avoid.  So instead, I’m going to walk through the types of configurations you might want to consider, give a few examples, and let you build from there.  So here are a few concepts to think about as you construct your vimrc file:</p>\n<h4>Adapt to your environment</h4>\n<p>Vi and Vim were originally developed in a low-resource terminal based environment.  Many of their default settings and assumptions reflect that.  Today though Vim is used in a wide variety of ways, from multimonitor Mac Pros with 16+GB of memory running multiple MacVim windows, to low memory remote servers running Vim in the terminal over ssh.  If you know what your environment will look like, you can optimize Vim for your own use.</p>\n<p>For instance, if you’re running in a high resource environment, (and pretty much any modern laptop or desktop these days qualifies as a high resource environment) you may want to enable some features that Vim disables by default, since those removing those features allow it to work well in very low memory situations.  Some  common choices:</p>\n<div class="gatsby-highlight">\n      <pre class="language-vimscript"><code>syntax enable " Turn on syntax highlighting\nset hidden " Leave hidden buffers open\nset history=100 "by default Vim saves your last 8 commands.  We can handle more</code></pre>\n      </div>\n<p>On the other hand, if you know you’re going to be running remotely on low resource machines, you might choose to disable those options to minimize the load and increase speed. I’ll talk more about plugins in a later post, but they’re another thing that works much better in your local environment than on remote servers, for both performance and logistical reasons.</p>\n<h4>Add some visual niceties</h4>\n<p>If we’re honest, I think most people can agree Vim is pretty hard to look at out of the box.  Very few visual affordances, no syntax highlighting or line numbers, and it’s style is dependent on your terminal color scheme or an ugly default gVim theme. But that’s pretty easy to fix. We can get syntax highlighting and line numbers with this snippet:</p>\n<div class="gatsby-highlight">\n      <pre class="language-vimscript"><code>syntax enable\nset number</code></pre>\n      </div>\n<p>Getting a decent color scheme will require you to download it as a plugin, but if you’ve done that or if you like one of the colorschemes that ship with your Vim distribution it’s easy to set up with <code>colorscheme &#x3C;theme-name></code>.  Beyond that, there’s plenty more you can do to improve the visual feel of Vim.  I’d look into customizing your status bar, relative vs absolute line numbers, and plugins like <a href="https://github.com/bling/vim-airline">Airline</a> and <a href="https://github.com/reedes/vim-thematic">Vim-Thematic</a>.</p>\n<h4>Set up keybindings</h4>\n<p>Many of Vim’s useful commands are either not given default keybindings, or are given hard to remember obtuse ones.  Don’t want to spend your whole life typing <code>source ~/.vimrc</code> into each file everytime you add something to your configuration? I shortcut that to <code>\\rr</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-vimscript"><code>map <leader>rr :source ~/.vimrc<CR></code></pre>\n      </div>\n<p>You might be wondering what the <leader> notation is there.  The <code>&#x3C;leader></code> key is a Vim convention for a key that comes before user created keystrokes.  It’s meant to minimize conflicts, and allow plugins to provide default mappings while still allowing the user a bit of flexibility.  The leader key can be set in your vimrc with the command <code>let mapleader=&#x3C;yourleaderkey></code>.  The default is <code>\\</code>, and I would recommend leaving it that way to start.  You can change it later if you find it to be inconvenient, and it doesn’t cause any conflicts since its the default key.  Common replacements like <code>,</code> overwrite useful functionality that may not be immediately obvious (<code>,</code> allows you to move backwards on a characterwise search for instance).</p>\n<h4>Configure plugins and file-type specific settings</h4>\n<p>I’ll touch more on plugins in a future post, but many of them allow extensive configuration, including setting keybindings, changing default behaviors, and enabling/disabling extra functionality. All of that happens here in the vimrc and should mostly use the let/set/map commands that we’ve already seen.</p>\n<p>You can also set file-type specific rules.  Rather than placing these in your main vimrc, these go into a special “file type plugins” directory, <code>~/.vim/ftplugin</code>.  Within that directory, you can create files like javascript.vim, python.vim or html.vim, and those files will be loaded after the vimrc when you open files of that type. Using those files, you can create completely separate profiles for each file type.</p>\n<h3>Discover what’s out there</h3>\n<p>I’ve intentionally avoided telling you what your vimrc should look like here.  I’ve tried to show you the big picture of what you can do, and now I’ll leave it to you to figure out what pieces you need to be comfortable and productive.  It will be different for everybody.</p>\n<p>My advice?  Now that you know what you’re looking for, go and take a look at other people’s configurations. Start with something like this <a href="https://github.com/benmccormick/dotfiles/blob/master/vim/vimrc.symlink">vimrc boilerplate</a>, and add the things you like.</p>\n<p>It’s pretty easy to find good configurations online if you look.  <a href="https://github.com/ben336/dotfiles/blob/master/vim/vimrc.symlink">My vimrc file</a> is on Github.  It’s certainly not the best out there, but its relatively small and easy to follow.  If you know developers you admire who use Vim, ask to see their vimrc files, or see if they have any fancy tricks to share.  For those without those resources,  Github’s <a href="http://dotfiles.github.io/">dotfile page</a> is a great place to look.  It contains links to several very detailed “dotfile repos” from various developers. You don’t have to copy everything from these files (in fact you shouldn’t), but you can pull the things that look useful, get rid of things that don’t, and try things out as you slowly build up your own workspace, built to do the jobs that you need it to do.</p>\n<hr>\n<h3>More Resources</h3>\n<ul>\n<li><a href="http://dotfiles.github.io/">Github’s dotfile page</a> provides some great pointers to dotfile repositories from experienced developers that can help you come up with cool configuration ideas</li>\n<li><a href="https://github.com/carlhuda/janus">Janus</a> is a great resource for users who’d prefer to avoid configuration and just start with a useable editor.  Though if that’s you, you may find you’re better off <a href="http://delvarworld.github.io/blog/2013/03/16/just-use-sublime-text/">just using Sublime Text</a></li>\n</ul>\n<hr>',frontmatter:{title:"Learning Vim in 2014: Configuring Vim",keywords:"vim configuration vimrc",category:"tools",date:"2014-07-14T10:50:00+00:00",path:"/2014/07/14/learning-vim-in-2014-configuring-vim",layout:"post",hideFooter:null},fields:{slug:"/2014/07/14/learning-vim-in-2014-configuring-vim"}}},pathContext:{slug:"/2014/07/14/learning-vim-in-2014-configuring-vim",relatedPosts:[{path:"/learning-vim-in-2014",data:{title:"Learning Vim in 2014",path:"/learning-vim-in-2014",description:"A series of beginner level articles on Vim",date:null}},{path:"/2014/11/10/vim-workflows-file-switching-strategies",data:{title:"Vim Workflows: File Switching",path:"/2014/11/10/vim-workflows-file-switching-strategies",description:"A look at the different approaches you can take to managing files in Vim",date:"2014-11-10T04:06:52+00:00"}},{path:"/2014/07/02/learning-vim-in-2014-vim-as-language",data:{title:"Learning Vim in 2014: Vim as Language",path:"/2014/07/02/learning-vim-in-2014-vim-as-language",description:"An explanation of the grammar behind Vim",date:"2014-07-02T11:27:00+00:00"}}]}}}});
//# sourceMappingURL=path---2014-07-14-learning-vim-in-2014-configuring-vim-590c557425ee65412b11.js.map