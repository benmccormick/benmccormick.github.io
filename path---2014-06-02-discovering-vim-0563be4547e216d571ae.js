webpackJsonp([65217738419869],{738:function(e,t){e.exports={data:{markdownRemark:{html:'<p>I’ve now been using Vim as my primary text editor for the last 9 months.\nWhen I started, I intended to learn it well enough to use in environments that didn’t support Sublime Text. In the end though it ended up becoming my single purpose editor for all occasions. Writing code, blogging, diffs, and reading logs all go through vim.  So why do I use Vim?</p>\n<h4>More Efficient Movement and Editing</h4>\n<p>This is the first thing you hear about from experienced Vimmers, and its an important one.  Once you have your feet under you as a Vim user, you are just able to edit faster.  This can be hard to understand before using Vim (or other keyboard based tools).  Using a mouse doesn’t feel particularly inefficient, and when you start out, Vim’s keyboard mappings can feel arbitrary, unintuitive and slow.  This is one of those times where a little work is needed to get the proper perspective.  Once you’ve had time to learn the basics, even a mediocre typist like me <sup id="fnref:1">\n<a href="#fn:1">1</a></sup> can fly when editing by typing smarter not harder.  This isn’t a tutorial on the basics of Vim, but the keys for me were understanding Vim was <a href="http://stackoverflow.com/questions/1218390/what-is-your-most-productive-shortcut-with-vim/1220118#1220118">a language in its own right</a>, and the biggest gains in Vim come when you create repeatable options to eliminate inefficiencies. These can be macros, but can also be as simple as using Vim’s easy control for repeating the last action<sup id="fnref:2"><a href="#fn:2">2</a></sup>.  Vim is a huge toolbox of small tools that you can use together to create a powerful workstation.</p>\n<h4>Rich Plugin Ecosystem</h4>\n<p>Like many things in Vim, the value of its plugin system wasn’t immediately obvious.  Unlike Sublime, which has a community consensus primary package manager and repository, Vim has multiple package managers that pull packages from a variety of locations<sup id="fnref:3"><a href="#fn:3">3</a></sup>.  So you need to do some research to figure out what you should be using<sup id="fnref:5"><a href="#fn:5">5</a></sup> and find the right plugins.  But when you do, you’ll find that Vim has fantastic plugins for key tasks like <a href="https://github.com/kien/ctrlp.vim">fuzzy file search</a>, <a href="https://github.com/scrooloose/syntastic">syntax checking</a>, and <a href="https://github.com/mileszs/ack.vim">in-file search</a>.  It also has a rich depth of plugins for pretty much every language/framework/functionality in common usage, as well as some great plugins that extend Vim’s built in motion/editing language.</p>\n<h4>Long Term Security</h4>\n<p>This one is a judgement call, but from my point of view, Vim is the safest investment of my time out there.  It has a rich open source community, one that has shown that its willing to try <a href="http://neovim.org/">some big ideas</a> to keep from getting stale.  It’s had a great 20 years of usage and doesn’t appear to be in decline.  Sublime Text meanwhile, regrettably seems to be in danger of heading down a similar path to Textmate, with a single developer who has done great work, but <a href="http://www.sublimetext.com/forum/viewtopic.php?f=2&#x26;t=14591">doesn’t appear to be interested</a> in being involved in all of the different work that a software business requires.  I don’t think open source is the only way to rely on software<sup id="fnref:4"><a href="#fn:4">4</a></sup>, but for general purpose text editors, Vim seems the safest bet to still be around in 10 years.</p>\n<h4>My Brain is Broken Now</h4>\n<p>This is a warning as much as a reason for using Vim, but I’ve quickly found that I’m no longer able to use Sublime or other editors without being frustrated by the fact that they’re not Vim.  Many editors, including Sublime, provide support for a large subset of Vim’s key bindings and modal controls.  But they all fall down at random places.  The power of vim doesn’t lie in one specific functionality, but the composable nature of their different options.  When some of them aren’t there, all the others are weakened, and my trained brain falls out of high efficiency mode into slow plodding “think through every keystroke mode.”  So don’t say I didn’t warn you.  Vim will break your brain.</p>\n<p>Those are the primary reasons I use Vim now.  There are a few things I haven’t loved though.</p>\n<h4>Vim’s UI is uglier than Sublime Text.</h4>\n<p>I’m a front end developer, used to working with, and working to create, beautiful interfaces.  Vim is not beautiful.  It looks like exactly what it is, a text based program with a lineage reaching back to the 70s.  It doesn’t handle margins or padding well, doesn’t have pretty autocomplete menus or visual alerts.  If you use it in the terminal you may be severely restricted in your color options, and this situation is not something that is going to change anytime soon<sup id="fnref:6"><a href="#fn:6">6</a></sup>.  I still love Sublime Text’s UI.  Nice margins, smooth scrolling, the ability to set different font and syntax highlighting options on a filetype basis are all nice gems that Vim just doesn’t offer.  I’ve come to appreciate Vim’s minimalism, but would love to see if Neovim were to offer a way to beautify some of these things.</p>\n<h4>Vim is harder to learn than it should be.</h4>\n<p>I’ve seen some Vimmers object to this (its a power user tool, etc.) but the truth is, when pretty much every Vim tutorial starts by telling you that you should start by changing a bunch of the default settings, it becomes clear that learning Vim is harder than it should be. There’s no reason that basics like line numbers and syntax highlighting shouldn’t be turned on by default.  Configurability is great, but if you start out in a user-hostile state, many people won’t take the time to find the power.  There have been some efforts to change that.  Neovim seems to be actively rethinking this stuff, and projects like <a href="https://github.com/carlhuda/janus">Janus</a> aim to help people get started with a richer initial setup.  But the very existence of these reforms points to the fact that Vim shoots itself in the foot with defaults that may have made sense in the eighties, but appear archaic next to modern competitors.</p>\n<p>For now I’m enjoying the Vim experience.  Despite a few warts, I really do think its the best text editor you can use today, and I’m excited to see where it goes in the future.</p>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:1">\n        <p>\nI was never taught to type correctly growing up. Apparently this is unusual in my generation.  Early last year I decided to ditch my hunt and peck 5 finger style for "the proper way."  It was a great learning experience.  I now muddle along at a mediocre 62 WPM according to online typing tests.\n    \t<a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code><li class="footnote" id="fn:2">\n    <p></code></pre>\n      </div>\n<p>I highly recommend Drew Neil’s Practical Vim for anyone who wants to get serious about using Vim.  It taught me about the power of repetition in Vim as well as how to formulate Vim’s many disparate features into a coherent text editing philosophy.\n<a href="#fnref:2" title="return to article"> ↩</a></p>\n</li></p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code><li class="footnote" id="fn:3">\n    <p></code></pre>\n      </div>\n<p>Yes there’s an official repository, but have you been on Vim.org’s repository?  Its an ugly frustrating site that does nothing to highlightuseful plugins.  It also often contains information that is less up-to-date than the plugins github README, and some important packages like ctrlp are not represented there.        </p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>\t<a href="#fnref:3" title="return to article"> ↩</a></p>\n</li>\n\n<li class="footnote" id="fn:4">\n    <p>\n    I\'d have no problem investing time in IntelliJ or Visual Studio for instance if I felt like a heavy IDE like that was the way to go, and that they\'d add productivity to justify their cost.  They have established companies backing them that are able to do things like respond to customer feedback, provide product roadmaps, etc.\n\n\t<a href="#fnref:4" title="return to article"> ↩</a></p>\n</li></code></pre>\n      </div>\n   <li class="footnote" id="fn:5">\n    <p>\n  Hint: Use Vundle\n<p> <a href="#fnref:5" title="return to article"> ↩</a></p>\n</li></p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code><li class="footnote" id="fn:6">\n    <p>\n    Due to the terminal compatibility requirement\n\n\t<a href="#fnref:6" title="return to article"> ↩</a></p>\n</li></code></pre>\n      </div>\n</ol>\n</div>',frontmatter:{title:"Discovering Vim",keywords:null,category:"tools",date:"2014-06-02T22:00:00+00:00",path:"/2014/06/02/discovering-vim",layout:"post",hideFooter:null},fields:{slug:"/2014/06/02/discovering-vim"}}},pathContext:{slug:"/2014/06/02/discovering-vim",relatedPosts:[{path:"/learning-vim-in-2014",data:{title:"Learning Vim in 2014",path:"/learning-vim-in-2014",description:"A series of beginner level articles on Vim",date:null}},{path:"/2016/01/11/the-most-interesting-atom-packages-ive-found-so-far",data:{title:"The Most Interesting Atom Packages I've found (so far)",path:"/2016/01/11/the-most-interesting-atom-packages-ive-found-so-far",description:"A rundown of the coolest Atom packages I've seen",date:"2016-01-11T02:25:49+00:00"}},{path:"/2014/11/10/vim-workflows-file-switching-strategies",data:{title:"Vim Workflows: File Switching",path:"/2014/11/10/vim-workflows-file-switching-strategies",description:"A look at the different approaches you can take to managing files in Vim",date:"2014-11-10T04:06:52+00:00"}}]}}}});
//# sourceMappingURL=path---2014-06-02-discovering-vim-0563be4547e216d571ae.js.map