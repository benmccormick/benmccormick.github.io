webpackJsonp([0xdcbdde3d99a8],{751:function(e,t){e.exports={data:{markdownRemark:{html:'<p>Becoming productive in Vim is about more than just knowing all of the features available to you<sup id="fnref:1"><a href="#fn:1">1</a></sup>. It’s all about knowing which ones to use in which situations.  In my series from this summer on <a href="http://benmccormick.org/learning-vim-in-2014/">learning Vim</a>, I focused a lot on the different tools Vim provides for solving problems.  Today I’ll show how I put some of those tools together to actually be more productive.</p>\n<p>A good tool should allow you to focus on your problem while using it, without making you spend a lot of time thinking about extraneous things. File switching is an area in text editing that can really slow you down if you let it.  The first file switching method that most Vim users is the simple <code>:e</code> command to open a file.  Technically it’s the only command you need for file switching, since you can use it to open up any file you want and start editing it.  But doing so requires you to essentially internalize the complete structure of your file system and type out full paths every time.  On a large project with nested directories that becomes a significant mental load and use of time, even if you’re taking advantage of Vim’s tab completion features. And it’s a mental load that’s inessential to the task at hand.  You need to recall the precise layout of your file structure every time only because the tool isn’t able to make things easier for you.</p>\n<p>Fortunately Vim is able to make easier things easier for you when you use the right tool for the job.  That means rather than using one file switching strategy to rule them all, we can combine several tools to reduce the mental load on us and focus on our code or writing. I’ll specifically look at a few common scenarios and my approach for each.  This isn’t the only workflow you can use to address these scenarios, but hopefully it will inspire you to improve your own Vim workflow.  So here are the different scenarios:</p>\n<h4>I want to move to a file with a name I know</h4>\n<img src="ctrlp" class="full-width" alt ="ctrlp screenshot">\n<p>When you’re moving to a file with a name that you know, it’s hard to beat the power of a fuzzy finding plugin like <a href="https://github.com/kien/ctrlp.vim">CtrlP</a> or <a href="https://github.com/Shougo/unite.vim">Unite</a>.  CtrlP allows me to type in the name of a file without remembering or typing a long directory path and instantly get a list of potential files.  Usually the file I’m looking for is the top hit.  </p>\n<h4>I want to move to a file, but I don’t know what it’s called</h4>\n\n  <a class="gatsby-resp-image-link" href="/static/nerdtree-f758239e22215a1a088d5d133db80d1a-548f7.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 75.6190476190476%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAABYlAAAWJQFJUiTwAAACbUlEQVQoz01SWU8UQRDu/6ArsOwxs3PP9Bx9Tc8FvClBYAl4EOODvvlsEPYCJWb93X49mxh3v3RqqruqvqqvyJ/t4sfqbr3ZLFbr5frx+fnXdvt7uVxsNivg4eH++939/WKFqxWweVw/PuGE7+nnEzmb3xxM3OHYOhhZ+8NxFEcxTbwwiRNKaZ6kaRAlgB9GQWwML4j8MLEdJ05icvvps6y7qunSnOOCCdmjLLjksswKHtMszYskzWhWpDnbfcY0FVKT84u5LHV7fAKXNXOF0lyVsgS00pXSNTywhSoN4NdaVTXe1E1HLuZXVdt1RyegtAsuqxpEcJZVo6sGHmSpmhZOGAgCkK7pjsn1uw9NdwSqCJ55AQxUYD3nf8gZ51LtbLSTZoY88pL3H2/r9ggBtuNOrFkhFJDlvOAiZ6LgiknVGyYdEyrnAs0jGB2R88u56wVJmjueD9p+EIRh0P98GIDnw+/hyna8Hi7sqe0UTJDXp2cvBnujiXU4tqyZo7TpmTGeFUXBOPgCWcHygu+mTbMcnyCCKZA3p2ev9ofINJralm3USyi0jqMoCsMQsof4R+ZEWbADORh4n+WMvL24HOyZ4PHUnlozoStZVrpuMWo0aQZet5gtnLuBw1O3LUYID7m6vhnsHZjKEwuVuZHUyKubFhOGgddoREOhCgpVUA5ZdnL8H2yj55TSNE0SiuU0Z5bTLKPowvFD1w+RHS8xsMPRFIqQ+dX1y8E+REJlnGCq6xracGH2xWyVlChmNk+ateNS4g1miVvy5dvXqeN4Qez6kR9EuBNKQU/GRT9tkwX8sTx955oJ48cWNG37F9LbuhljME6tAAAAAElFTkSuQmCC&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="NerdTree screenshot" title="" src="/static/nerdtree-f758239e22215a1a088d5d133db80d1a-d766e.png" srcset="/static/nerdtree-f758239e22215a1a088d5d133db80d1a-a6b6e.png 143w,\n/static/nerdtree-f758239e22215a1a088d5d133db80d1a-8e488.png 285w,\n/static/nerdtree-f758239e22215a1a088d5d133db80d1a-d766e.png 570w,\n/static/nerdtree-f758239e22215a1a088d5d133db80d1a-13239.png 855w,\n/static/nerdtree-f758239e22215a1a088d5d133db80d1a-cab6d.png 1140w,\n/static/nerdtree-f758239e22215a1a088d5d133db80d1a-71f14.png 1710w,\n/static/nerdtree-f758239e22215a1a088d5d133db80d1a-548f7.png 2100w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    \n<p>This scenario happens most often on projects that you’re unfamiliar with and just getting into.  You’re looking for some functionality, but don’t know exactly what it’s called within the project and need to look through the file system for hints.  In this case you need a directory browsing tool.  Vim bundles <a href="http://www.vim.org/scripts/script.php?script_id=1075">netrw</a> by default and it’s a good starting place.  If you have issues with netrw, many people install <a href="https://github.com/scrooloose/nerdtree">NerdTree</a> as an alternative file explorer.  I personally don’t use NerdTree very often these days.  Most of my work over the last year or so has been on one large project or smaller experimental projects and I haven’t needed it.  But it’s been very useful when I’ve cloned down a github repository to look it over or make changes.  It’s the best way to quickly get the lay of the land of a project within Vim, and to find a specific file before you really know what you’re looking for.</p>\n<h4>I want to move to a file that I already have open</h4>\n\n  <a class="gatsby-resp-image-link" href="/static/bufferlist-889d10621b12f6cd57d28562b9d9e8bd-157c6.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 76.25%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAABYlAAAWJQFJUiTwAAACQklEQVQoz2VT247TMBDNJyDtLpTtJW0SJ3Yc3xrHTpr08gA/AMtFu+xSygohgcT/v3GcrlZCqEfTM7bHM2fGiebLTKp1pbTUppKaci6UVmYtVHCVqYU2UgdXhDPhZE7ZYpm8e38TlZXwm75u/LpxtWtr6xrfwbXO67Wtw6Jf27NtTG1NDdsg/vPtXZSRouQVnIIyWvLRlgQuK1NSAKSgOS2xnhGKhMskS1IyuZ7dfPwUIQxlSiEqIaRSEj+lGK9IgVsECG4MwYyzSiBPDsLF9Wzx4RxsjJYS4QgO/9ooqANnnCdZjuSwIwlYpSTL6WQ6ZqZl1Xhvoco6Y60d1UKbdS4IDi1ozzoBiAd8t0GnjqfvEQrDNmIa58MtLhDXdo0LMda10jy1GmOopBJSo5HLNDt+O0UFpWPZKFqoUDY2g3ZW8lE2zwtGRkA2NEIFyGwRh8zwm9ZjEgFNmAqyhfy+QdmoOtQ1bgG4GCWYdU1ycnp8jLKMcM5YSQvcWDIWJsWSjKyAFECrChCsYEiLOMG04iS7eDm5e/ga6aYedvt203f9tt/uQEY+nAnEY310B9jhsOu2/bDdW+1//vgVbd4Ovse5rd8Mrt2Y2gldj70xXKJJGiQshp4Zt+/8m671vZrWv49/ojSjeNvIkOXFdB5jBujN6+kcHJiNFk9i+kQCZvHqxcXl7f1DGBUaszsc8DGgkbB4A7PFch6vngGdz+T8Qi+vJvcPxwhfVFkVXLBKUqFLocR0/k/k/4hX6cXVq9sv938BUs+jv9pRgOgAAAAASUVORK5CYII=&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="Buffer list" title="" src="/static/bufferlist-889d10621b12f6cd57d28562b9d9e8bd-d766e.png" srcset="/static/bufferlist-889d10621b12f6cd57d28562b9d9e8bd-a6b6e.png 143w,\n/static/bufferlist-889d10621b12f6cd57d28562b9d9e8bd-8e488.png 285w,\n/static/bufferlist-889d10621b12f6cd57d28562b9d9e8bd-d766e.png 570w,\n/static/bufferlist-889d10621b12f6cd57d28562b9d9e8bd-13239.png 855w,\n/static/bufferlist-889d10621b12f6cd57d28562b9d9e8bd-cab6d.png 1140w,\n/static/bufferlist-889d10621b12f6cd57d28562b9d9e8bd-71f14.png 1710w,\n/static/bufferlist-889d10621b12f6cd57d28562b9d9e8bd-157c6.png 2080w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    \n<p>A common scenario in Vim involves moving back and forth between 2 files, possibly a file and its corresponding test file.  If you don’t want to use splits, that means you’ll want a quick command to move between open files.  Fortunately Vim keeps a list of active buffers open.  When I’m only flipping between 2 files I’ll usually use the <code>:bprev</code> and <code>:bnext</code> commands, which I’ve aliased to <code>[b</code> and <code>]b</code> <sup id="fnref:2"><a href="#fn:2">2</a></sup>. If I have more than a few files open though I’ll usually either use <code>:b</code> and type the name of the file, or just use ctrlp again, which doesn’t require me to remember if the file I wasn’t is actually already open or not.</p>\n<h4>I want to move back to the place I just was</h4>\n\n  <a class="gatsby-resp-image-link" href="/static/indy-46a8e0095062fcaf00ddde565ebaa717-6964c.jpg" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 66.40625%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAANABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAMBBP/EABcBAAMBAAAAAAAAAAAAAAAAAAECAwT/2gAMAwEAAhADEAAAAZVj05ENTH//xAAbEAACAQUAAAAAAAAAAAAAAAABEQACEBITMf/aAAgBAQABBQJogu2vKvkc/8QAGBEAAgMAAAAAAAAAAAAAAAAAABEBEiH/2gAIAQMBAT8Bs8gZ/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQACEv/aAAgBAgEBPwFyJcX/xAAbEAABBAMAAAAAAAAAAAAAAAAQAAERITJRcf/aAAgBAQAGPwJ5OVaXB//EABsQAAICAwEAAAAAAAAAAAAAAAERACExQWGB/9oACAEBAAE/IbMqGBBOkVsYihK/wQ1QS4gLan//2gAMAwEAAgADAAAAEPQv/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQARUf/aAAgBAwEBPxBHZaL/xAAYEQACAwAAAAAAAAAAAAAAAAAAEQExUf/aAAgBAgEBPxCEKxtP/8QAHBABAQACAgMAAAAAAAAAAAAAAREAITFBUXGh/9oACAEBAAE/EOaBEHjzbm46YrV3lYFVBB2D9ym1wl6ZByeiZ//Z&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="indy" title="" src="/static/indy-46a8e0095062fcaf00ddde565ebaa717-6fbc3.jpg" srcset="/static/indy-46a8e0095062fcaf00ddde565ebaa717-da4c7.jpg 143w,\n/static/indy-46a8e0095062fcaf00ddde565ebaa717-1d39e.jpg 285w,\n/static/indy-46a8e0095062fcaf00ddde565ebaa717-6fbc3.jpg 570w,\n/static/indy-46a8e0095062fcaf00ddde565ebaa717-9d77e.jpg 855w,\n/static/indy-46a8e0095062fcaf00ddde565ebaa717-6964c.jpg 1024w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    \n<p>“Rabbit Holing” happens to me all the time when I’m working on code.  I start looking at one thing, then look at code related to that, and before I know it I’m 4 files deep following a chain of stuff I’m debugging.  Oftentime I want to move back up that chain.  I could of course remember what files I opened and use one of the methods above, but that requires me to internalize the memory of events.  The command that maps best to my desire to move back up the chain is using Vim’s jumplist.  Vim keeps track of every “jump” you make within a window or split, and allows you to move back up and down that jump list as you like, both within files and across them. The commands to move up and down the jump list are mapped to <code>&#x3C;c-o></code> and <code>&#x3C;c-i></code> by default.  When I use them I don’t have to keep track of what files I’m moving across or even if I’m switching files at all.  I can just investigate my issue and have confidence that I’ll be able to get back.  Think of it as tying down a rope before you dive into a cave full of snakes.</p>\n<h4>I want to create a new file</h4>\n<p>Creating a new file means that we finally find a use for the basic <code>:e</code> command.  Because you need to specify a full directory path anyway when you’re creating a file, it makes sense to use the basic Vim commands here.  If you need to create a directory to put the file in, you can use the shell command with <code>:!mkdir &#x3C;path/to/dir></code>.  While writing this piece I learned that ctrlp has the ability to create a new directory path and file in a single command, which is a nice touch.  But you lose out on Vim’s autocompletion of paths if you’re creating a directory nested in existing directories.  I find the builtins to be simplest here.</p>\n<h4>I want to edit a specific piece of code, but don’t know what file it’s in</h4>\n\n  <a class="gatsby-resp-image-link" href="/static/agvim-a01c0db5bdb62c7f983a8d508ff140cd-ed99b.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 76.75988428158149%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAABYlAAAWJQFJUiTwAAACkklEQVQoz1WSeW/aMBjG8++knVVLxxVK7thOHCeQw0mAAi1QytruUK+pXXdoWhnrNmi6T9DPvTcg7ZB+evK8b2zHfmLhZvr+64/ZYpEtsmxxe5dlv4D54m6+yK6ns9m37/PbvA/lz0UGCh74cj29v78XxLqkqqqsyHVJUhRZURWgWquXxS2xLotbUu6rNVCgItZK1Ro0Hz152uvvCrqJKGOYWMS2bUqJZdsOtakNT0QsVTcVzQDAaAZSdUPWDN3EpYq4OxgJholdzwUoc2AaYyz3DnUYIzbFFrWoAwYRe4ll2TDMlVXt7PytQGwWpe0wSniSBjwJeRryJIpTnrSgE6ctKIOIhzxuBpEfAjxO27Dc8cmpoOk6IQhh00QmGEwQwQhjBFutyyro6tgrVn5LUtbWN/PJJsKwcCMIm37Y8AMgXz4IG0HT833Pbzb8qAmlH8I3medR5rqNpm7ol++uIDCDuZBUHhIIqONQAxMTEx0BGAzkYiAMmUmKCqcFU3hePDk9E0xsOcyzKAQDIbm2w6jjwpEIdSzKiLXUPDPIicFQQhkYSdEuLq8EyrxOt5e0OkmrFcUxT5IkhZzSiMc8j21JnEByOUneT9IW8xofPn4SYCfwqwHNRLKqi5Jek/SyKJWAqlQW5XJNLlbrpRxpRaUmP35WeHN8JgR+YzxIhn0+6vNBNxr2eL8T7GyHO91otxtCB8pBjw960bAfLw0f7STtmN3MPguQ4uHBYLy3PdnbfrUXHQyjo3HnaL9zOG5Phgko8GKUgr6cdOEVmNcHvf0Bz+ZToVCsrG9WNorVjefVv/oPhWWzUBT/sFmqPXi4tj85EmzfMS2saSbcWLi9/4M1fWl0JCv6CsgZUVI35dOL89/WcbldvwE1qAAAAABJRU5ErkJggg==&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="Ag.vim" title="" src="/static/agvim-a01c0db5bdb62c7f983a8d508ff140cd-d766e.png" srcset="/static/agvim-a01c0db5bdb62c7f983a8d508ff140cd-a6b6e.png 143w,\n/static/agvim-a01c0db5bdb62c7f983a8d508ff140cd-8e488.png 285w,\n/static/agvim-a01c0db5bdb62c7f983a8d508ff140cd-d766e.png 570w,\n/static/agvim-a01c0db5bdb62c7f983a8d508ff140cd-13239.png 855w,\n/static/agvim-a01c0db5bdb62c7f983a8d508ff140cd-cab6d.png 1140w,\n/static/agvim-a01c0db5bdb62c7f983a8d508ff140cd-71f14.png 1710w,\n/static/agvim-a01c0db5bdb62c7f983a8d508ff140cd-ed99b.png 2074w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    \n<p>Finally, possibly the most common scenario for me is when I know I have a particular piece of code I need to edit, but don’t have it mapped to a particular file in my head.  Rather than forcing myself to recall the file, the easiest path is to let Vim take the information I know and help me out.  Specifically I use Ag.vim for code search within projects.  It is a wrapper around Ag, a <a href="http://benmccormick.org/2013/11/25/a-look-at-ack/">fantastic code search program based on Ack</a>.  It allows me to enter a search term, and then pulls up all occurrences of that term within my project.  One of it’s best features is filtering by file type, which allows me to type something like <code>:Ag --less "\\.widget"</code> and search my LESS files for all rules effecting the class <code>.widget</code>.  </p>\n<h3>Let Vim Work For You</h3>\n<p>The workflow I described is not the “one true way” to navigate files in Vim.  Some people hate plugins and will prefer to use <code>:e</code>,<code>:b</code>, and netrw for everything. You can certainly do many of the things above with NerdTree or CtrlP if you prefer to simplify to one tool.  And <a href="https://github.com/Shougo/unite.vim">Unite</a> is an attempt to pull almost all of these scenarios into one tool.  The point is to be aware of the inessential work created in the different scenarios you face when coding and offload the work to Vim in a way that makes sense to you.</p>\n<hr>\n<h3>More Resources</h3>\n<ul>\n<li>\n<p><a href="http://vimcasts.org/blog/2013/01/oil-and-vinegar-split-windows-and-project-drawer/">Oil and Vinegar</a> is a nice Vimcasts article on how to make NerdTree work well with multiple splits</p>\n</li>\n<li>\n<p>I wrote a more <a href="http://benmccormick.org/2014/07/07/learning-vim-in-2014-working-with-files/">introductory post</a> this summer on the tools you can use to manage files in Vim.  It talks in a bit more detail about some of the Vim features I mentioned above.</p>\n</li>\n</ul>\n<div class="footnotes">\n<ol>\n    <li class="footnote" id="fn:1">\n        <p>\n        That\'s true of many things actually.  \n        </p>\n        <a href="#fnref:1" title="return to article"> ↩</a></p>\n    </li>\n    <li class="footnote" id="fn:2">\n        <p>\n        I actually use <a href="https://github.com/tpope/vim-unimpaired">unimpared.vim</a> to provide consistent keybindings for these types of motions.\n        </p>\n        <a href="#fnref:2" title="return to article"> ↩</a></p>\n    </li>\n</ol>\n</div>',frontmatter:{title:"Vim Workflows: File Switching",keywords:null,category:"tools",date:"2014-11-10T04:06:52+00:00",path:"/2014/11/10/vim-workflows-file-switching-strategies",layout:"post",hideFooter:null},fields:{slug:"/2014/11/10/vim-workflows-file-switching-strategies"}}},pathContext:{slug:"/2014/11/10/vim-workflows-file-switching-strategies",relatedPosts:[{path:"/learning-vim-in-2014",data:{title:"Learning Vim in 2014",path:"/learning-vim-in-2014",description:"A series of beginner level articles on Vim",date:null}},{path:"/2014/07/16/learning-vim-in-2014-vim-as-art",data:{title:"Learning Vim in 2014: Vim as Art",path:"/2014/07/16/learning-vim-in-2014-vim-as-art",description:"How using Vim is more of an artform than a science",date:"2014-07-16T10:41:00+00:00"}},{path:"/2014/07/02/learning-vim-in-2014-vim-as-language",data:{title:"Learning Vim in 2014: Vim as Language",path:"/2014/07/02/learning-vim-in-2014-vim-as-language",description:"An explanation of the grammar behind Vim",date:"2014-07-02T11:27:00+00:00"}}]}}}});
//# sourceMappingURL=path---2014-11-10-vim-workflows-file-switching-strategies-cf026e8a52ec65cdf7f4.js.map