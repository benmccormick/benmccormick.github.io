---
title: "Vim Workflows: File Switching"
date: "2014-11-10 04:06:52+00:00"
layout: post
path: "/2014/11/10/vim-workflows-file-switching-strategies"
---

Becoming productive in Vim is about more than just knowing all of the features available to you<sup id="fnref:1">[1](#fn:1)</sup>. It's all about knowing which ones to use in which situations.  In my series from this summer on [learning Vim][learningvim], I focused a lot on the different tools Vim provides for solving problems.  Today I'll show how I put some of those tools together to actually be more productive.

A good tool should allow you to focus on your problem while using it, without making you spend a lot of time thinking about extraneous things. File switching is an area in text editing that can really slow you down if you let it.  The first file switching method that most Vim users is the simple `:e` command to open a file.  Technically it's the only command you need for file switching, since you can use it to open up any file you want and start editing it.  But doing so requires you to essentially internalize the complete structure of your file system and type out full paths every time.  On a large project with nested directories that becomes a significant mental load and use of time, even if you're taking advantage of Vim's tab completion features. And it's a mental load that's inessential to the task at hand.  You need to recall the precise layout of your file structure every time only because the tool isn't able to make things easier for you.

Fortunately Vim is able to make easier things easier for you when you use the right tool for the job.  That means rather than using one file switching strategy to rule them all, we can combine several tools to reduce the mental load on us and focus on our code or writing. I'll specifically look at a few common scenarios and my approach for each.  This isn't the only workflow you can use to address these scenarios, but hopefully it will inspire you to improve your own Vim workflow.  So here are the different scenarios: 


#### I want to move to a file with a name I know

![ctrlp screenshot](/posts/images/ControlP_-____Dropbox_blog_drafts__-_VIM.png)

When you're moving to a file with a name that you know, it's hard to beat the power of a fuzzy finding plugin like [CtrlP][ctrlp] or [Unite][unite].  CtrlP allows me to type in the name of a file without remembering or typing a long directory path and instantly get a list of potential files.  Usually the file I'm looking for is the top hit.  

#### I want to move to a file, but I don't know what it's called

![NerdTree](/posts/images/NERD_tree_1_-____Dropbox_blog_drafts__-_VIM.png)

This scenario happens most often on projects that you're unfamiliar with and just getting into.  You're looking for some functionality, but don't know exactly what it's called within the project and need to look through the file system for hints.  In this case you need a directory browsing tool.  Vim bundles [netrw][netrw] by default and it's a good starting place.  If you have issues with netrw, many people install [NerdTree][nerdtree] as an alternative file explorer.  I personally don't use NerdTree very often these days.  Most of my work over the last year or so has been on one large project or smaller experimental projects and I haven't needed it.  But it's been very useful when I've cloned down a github repository to look it over or make changes.  It's the best way to quickly get the lay of the land of a project within Vim, and to find a specific file before you really know what you're looking for.

#### I want to move to a file that I already have open

![Buffer list](/posts/images/switching_between_files_md____Dropbox_blog_drafts__-_VIM.png)

A common scenario in Vim involves moving back and forth between 2 files, possibly a file and its corresponding test file.  If you don't want to use splits, that means you'll want a quick command to move between open files.  Fortunately Vim keeps a list of active buffers open.  When I'm only flipping between 2 files I'll usually use the `:bprev` and `:bnext` commands, which I've aliased to `[b` and `]b` <sup id="fnref:2">[2](#fn:2)</sup>. If I have more than a few files open though I'll usually either use `:b` and type the name of the file, or just use ctrlp again, which doesn't require me to remeimber if the file I wasn't is actually already open or not.

#### I want to move back to the place I just was

![Indy](/posts/images/5114935852_49b373e961_b.jpg)

"Rabbit Holing" happens to me all the time when I'm working on code.  I start looking at one thing, then look at code related to that, and before I know it I'm 4 files deep following a chain of stuff I'm debugging.  Oftentime I want to move back up that chain.  I could of course remember what files I opened and use one of the methods above, but that requires me to internalize the memory of events.  The command that maps best to my desire to move back up the chain is using Vim's jumplist.  Vim keeps track of every "jump" you make within a window or split, and allows you to move back up and down that jump list as you like, both within files and across them. The commands to move up and down the jump list are mapped to `<c-o>` and `<c-i>` by default.  When I use them I don't have to keep track of what files I'm moving across or even if I'm switching files at all.  I can just investigate my issue and have confidence that I'll be able to get back.  Think of it as tying down a rope before you dive into a cave full of snakes.

#### I want to create a new file

Creating a new file means that we finally find a use for the basic `:e` command.  Because you need to specify a full directory path anyway when you're creating a file, it makes sense to use the basic Vim commands here.  If you need to create a directory to put the file in, you can use the shell command with `:!mkdir <path/to/dir>`.  While writing this piece I learned that ctrlp has the ability to create a new directory path and file in a single command, which is a nice touch.  But you lose out on Vim's autocompletion of paths if you're creating a directory nested in existing directories.  I find the builtins to be simplest here.


#### I want to edit a specific piece of code, but don't know what file it's in

![Ag.vim](/posts/images/_No_Name__-_-_VIM_and_Ghost_Admin.png)

Finally, possibly the most common scenario for me is when I know I have a particular piece of code I need to edit, but don't have it mapped to a particular file in my head.  Rather than forcing myself to recall the file, the easiest path is to let Vim take the information I know and help me out.  Specifically I use Ag.vim for code search within projects.  It is a wrapper around Ag, a [fantastic code search program based on Ack][ackag].  It allows me to enter a search term, and then pulls up all occurrences of that term within my project.  One of it's best features is filtering by file type, which allows me to type something like `:Ag --less "\.widget"` and search my LESS files for all rules effecting the class `.widget`.  


### Let Vim Work For You

The workflow I described is not the "one true way" to navigate files in Vim.  Some people hate plugins and will prefer to use `:e`,`:b`, and netrw for everything. You can certainly do many of the things above with NerdTree or CtrlP if you prefer to simplify to one tool.  And [Unite][unite] is an attempt to pull almost all of these scenarios into one tool.  The point is to be aware of the inessential work created in the different scenarios you face when coding and offload the work to Vim in a way that makes sense to you.

---

### More Resources

- [Oil and Vinegar][oil] is a nice Vimcasts article on how to make NerdTree work well with multiple splits

- I wrote a more [introductory post][vimfiles] this summer on the tools you can use to manage files in Vim.  It talks in a bit more detail about some of the Vim features I mentioned above.

---


### Subscribe

Thanks for taking the time to read!  I write a good deal about text editing,  and development tools, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out [my series on learning Vim][learningvim] from this summer.  And of course, if you have your own tips for more efficient Vim workflows, please put them in the comments.

---


<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        That's true of many things actually.  
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
    <li class="footnote" id="fn:2">
        <p>
        I actually use <a href="https://github.com/tpope/vim-unimpaired">unimpared.vim</a> to provide consistent keybindings for these types of motions.
        </p>
        <a href="#fnref:2" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>


[learningvim]: http://benmccormick.org/learning-vim-in-2014/
[ctrlp]: https://github.com/kien/ctrlp.vim
[unite]: https://github.com/Shougo/unite.vim
[nerdtree]: https://github.com/scrooloose/nerdtree
[ackag]: http://benmccormick.org/2013/11/25/a-look-at-ack/
[oil]: http://vimcasts.org/blog/2013/01/oil-and-vinegar-split-windows-and-project-drawer/
[vimfiles]: http://benmccormick.org/2014/07/07/learning-vim-in-2014-working-with-files/
[netrw]: http://www.vim.org/scripts/script.php?script_id=1075

