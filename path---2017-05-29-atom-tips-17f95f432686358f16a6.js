webpackJsonp([0xf927beae46a9],{805:function(e,t){e.exports={data:{markdownRemark:{html:'<p><a href="https://atom.io">Atom</a> is a modern hackable text editor.  I’ve been using it as my primary editor for a year and a half, and have picked up some tips along the way that I thought were worth sharing.  These tips assume that you have at least a passing familiarity with Atom: they’re the things that I’ve picked up over time that have made me more productive.</p>\n<h4>1. There is more to the Fuzzy Finder than meets the eye</h4>\n<p>Fuzzy finders have been a key feature on modern editors since TextMate first popularized the ⌘T command<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup> for searching through project files.  ⌘T (or ⌘P) still works great in Atom, but what you may not know is that Atom provides 2 other versions of the command. ⌘B searches only among currently open files.  ⇧⌘B searches only among files that are “dirty” according to git<sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup>.  Both of those options are built in.  You can also find other uses for the fuzzy-finder if you start exploring plugins, including <a href="https://atom.io/packages/atom-fuzzy-grep">atom-fuzzy-grep</a>, a plugin that lets you use the fuzzy-finder interface to search file contents using grep, <a href="https://benmccormick.org/2016/04/30/ack-tips/">ack</a>, ag, or ripgrep.</p>\n<h4>2. Atom is a great Vim replacement</h4>\n<p>If you’ve been following this blog for a while, you know I’ve written a lot about <a href="https://benmccormick.org/learning-vim-in-2014/">Vim</a>.  I still love the <a href="https://benmccormick.org/2014/07/16/learning-vim-in-2014-vim-as-art/">philosophy of Vim</a>, and think that the text editing <a href="https://benmccormick.org/2014/07/02/learning-vim-in-2014-vim-as-language/">language</a> it implements is the best way to edit code quickly.  But Atom’s <a href="https://atom.io/packages/vim-mode-plus">vim-mode-plus</a> is the best vi implementation I’ve seen outside of Vim, and unlike other editors, you don’t need to get frustrated with a halfway approach to Vi-keybindings, since you can make pretty much everything work in a vim-like way.  That’s because:</p>\n<h4>3. Atom’s keybindings are powerful and flexible</h4>\n<p>Any command exposed by the core editor or a plugin in Atom can be bound to a keyboard shortcut.  None of the default commands are hard-coded, and the editor provides powerful contexts for controlling what keys have lead to what action when.  That means if I want to use <code>ctrl-j/k/l/h</code> to control my navigation between split panes, but also use <code>ctrl-j/k</code> to move up and down in the autocomplete widget, I can just add these lines to my <code>keymap.cson</code> file</p>\n<div class="gatsby-highlight">\n      <pre class="language-coffeescript"><code><span class="token string">\'atom-text-editor, body\'</span><span class="token punctuation">:</span>\n  <span class="token string">\'ctrl-k\'</span><span class="token punctuation">:</span> <span class="token string">\'window:focus-pane-above\'</span>\n  <span class="token string">\'ctrl-j\'</span><span class="token punctuation">:</span> <span class="token string">\'window:focus-pane-below\'</span>\n  <span class="token string">\'ctrl-h\'</span><span class="token punctuation">:</span> <span class="token string">\'window:focus-pane-on-left\'</span>\n  <span class="token string">\'ctrl-l\'</span><span class="token punctuation">:</span> <span class="token string">\'window:focus-pane-on-right\'</span>\n\n<span class="token string">\'body atom-text-editor.autocomplete-active\'</span><span class="token punctuation">:</span>\n  <span class="token string">\'ctrl-k\'</span><span class="token punctuation">:</span> <span class="token string">\'autocomplete-plus:move-up\'</span>\n  <span class="token string">\'ctrl-j\'</span><span class="token punctuation">:</span> <span class="token string">\'autocomplete-plus:move-down\'</span>\n</code></pre>\n      </div>\n<p>Different commands are triggered in different context.  You can also take advantage of this with vim-mode to have “normal mode only” keyboard shortcuts like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-coffeescript"><code><span class="token string">\'atom-text-editor.vim-mode-plus.normal-mode\'</span><span class="token punctuation">:</span>\n  <span class="token string">\'] b\'</span><span class="token punctuation">:</span> <span class="token string">\'pane:show-next-item\'</span>\n  <span class="token string">\'[ b\'</span><span class="token punctuation">:</span> <span class="token string">\'pane:show-previous-item\'</span>\n</code></pre>\n      </div>\n<p>That implements a behavior I’d missed from Vim’s <a href="https://github.com/tpope/vim-unimpaired">unimpaired plugin</a> of moving between open files with <code>[b</code> and <code>]b</code>.</p>\n<h4>4. Make sure to sync your settings</h4>\n<p>One area where Atom is less ideal than Vim is setting portability.  It doesn’t have a single file where all configuration is stored, or a nice settings folder that can be synced.  Instead settings are intermingled with other data in a <code>~/.atom</code> folder, a fact that is obscured by the editor’s UI, which attempts to put a nice UI in front of all of these setting files and steer you away from editing them directly or caring about where they’re stored.  Which works great until you need to move your config to a new machine or sync between 2 machines.  </p>\n<p>Fortunately, there’s a great plugin <a href="https://github.com/atom-community/sync-settings">sync-settings</a> that makes this simple.  It does require setting up a gist to serve as your repo, but after that the process is painless and allows you to continue on unaware of the implementation details behind settings.</p>\n<h4>5. Check Timecop and clean up plugins that you’re not using</h4>\n<p>Atom is built on web technologies.  This is both the best and worst thing about Atom.  It leads to its greatest strengths: hackability, a focus on UX early on since they didn’t have to build a whole UI engine from scratch, and quick iteration.  But it also has very real tradeoffs, the biggest of which are battery life and startup performance<sup id="fnref-3"><a href="#fn-3" class="footnote-ref">3</a></sup>.  There’s not much to be done about the battery life drain; Atom is based on Chromium, and Chromium is a battery hog.  It is simply a tradeoff to understand when choosing an editor.  But startup performance is often greatly influenced by the packages that you choose to use.  Fortunately Atom includes a simple tool for tracking this called Timecop.</p>\n<p>You can find Timecop in the command palette (⇧⌘P by default).  When you run it, Timecop displays a report of all of your packages and themes and how they contribute to startup time.  It will look something like this:</p>\n<p>\n  <a class="gatsby-resp-image-link" href="/static/timecop-e54c55880eb9aea6f4fa92ea3c8409a0-0167c.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 65.93673965936739%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsSAAALEgHS3X78AAACgklEQVQ4y01TSW4UQRCc37DIeKb3vau7el/Hy9jG8iK8SGwCwQu4IHHiwAk48dQgqgbjOaRqpjozMiIya+HGJbykhBFIuGmJTJZwwwyWKGHnBay0Q94dol6fwRMNnEjCCnIsnRhOXMD0Mxi+gMKxeC6cpEYxnCCUI8yoYtSwYoY6+d8RPUwxEKxDOZ0hrtZw2MRJ223eQyQNzLjFwiag6I4RVTPstOGHehuqgEyd4w+w777DTQqIfoOkOWAuQUX7mBtXVDNiNb7eAsrxVCc6WcculU5QHQ0/RXj9Bd7bn7SlQM480R9rQJWng/VmRLkZAdfvKTmtkVOy6I7g5f0OQ0oIBJzNJ9hvfhFQIhtOkRHQV/bopg8MS81wOb/DwgglgmKEnw9wydBgt4dY0WR7vIN99JHguQby5aA9M6Jimxeq4HCoaF9uyJCd1BRFTQ8VdSb4WQvZH+l7N8phOBGH0iJr6V8xaokKxCcBSWVpvYatGAcZFmY6IhpudPj9NZ6TiZOzcLhFPLyCP95jL+7g8i4ebxC2FwgYFifv5Ie6Tt159QWWyYSFlfZIhiuE/SWK9hxz1sDOJqTjNdz6JbrhEnNJwxOuTnnCbyOBZhiU7cq1rrWyGaKZ0HSlmnLFKW/gFhPmWuLrVQ6b8greLSnpc13j99TjiZdRVqnlmjxX9F4Nw887/i4hygLDwMXeZ6KpTaYHqVqDVE87oS/PggL3dYcfY4+nvoStl3c7WeWhAt1Ou8KKD2HPI8Mln87jQjdYEiQsSf/gHC+43LfdhD+bAzKktzuLr6dM0P+r828fyVDoLoaWwk5806pQtIfYJ+CZbPCtrfGUgGrhzZ08FebuHRn/BUjpypXWiDLCAAAAAElFTkSuQmCC&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="screenshot of timecop" title="" src="/static/timecop-e54c55880eb9aea6f4fa92ea3c8409a0-d766e.png" srcset="/static/timecop-e54c55880eb9aea6f4fa92ea3c8409a0-a6b6e.png 143w,\n/static/timecop-e54c55880eb9aea6f4fa92ea3c8409a0-8e488.png 285w,\n/static/timecop-e54c55880eb9aea6f4fa92ea3c8409a0-d766e.png 570w,\n/static/timecop-e54c55880eb9aea6f4fa92ea3c8409a0-0167c.png 822w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>I wouldn’t recommend obsessing too much over timecop.  For most packages the benefit you receive is going to significantly outweigh any startup burden.  But if your editor starts to feel sluggish, this is a great first step to figuring out if there’s anything you can drop to make an impact.</p>\n<h4>6. The UI is just HTML and CSS, and that means you can edit it</h4>\n<p>Everything you see in an Atom UI is an HTML element, with classes that you can use to select and style them. This fact is mostly relevant when creating themes, but you can also use it to make one-off UI adjustments.  For instance, when I edit Markdown files, the <a href="https://github.com/sindresorhus/atom-editorconfig">editorconfig</a> plugin I have installed warns me about a possible conflict with another atom package. The warning shows up as a small colored mouse icon in the status bar.</p>\n<p>\n  <a class="gatsby-resp-image-link" href="/static/editor-mouse-39200e898c084d11c48d6b6d7da6471e-7a88b.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 44.88567990373045%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAABxElEQVQoz11S25KaQBTkR3bV8grKRQQRUBDkMuCirqtJLNc85P//odOMW1upPHT1mT7Sp8+MiunFcOIKUVajEAJZKZAToqpQEoWokBNVXUPUFfvUpC6wLRts9xekRFyd4advUHR3A3dbobk+cPzxQHO543D9xPX+B6efv6nfsT/fcKR2YK8h1++/JMSJfHlAnO8oTzcsNsXTcLHJsc4PCLIGK05peVOesExqmMEOpp9+YQfr+/xkS9bJsw5SKOZqy5UFDxmsMKd5CScq5bSWl0zfwvviFi5/LzUO/JftdQ7FkHcokBxvxCfi+oKEd7KtP76R/KdF4v1ZVx9YF0fE4iw3kitrc5+xE3mPLh/H4RR3ncFm/EW4g0NIpuYxsct+y15UYEkE6R7B7g0RDY1lBGViONAXPgaaJdEZTvE60NAf6egNZ3gZauhS64112R+ZNjR7JU3nDNIGCHYNQqL9xyjDqY2xbqM7mqGvGvKjljs0OsxjqGMTLwNVnl/J3ckUI4bYFFwxzGia8kGPCPmQba2oloeJuYRK9NVnygG5w0Qr08fcdNFTTQy1OSaGi/HMwcwOYHkRprYP3Qmhr9bQ3ZAeHv4C3PozyOM2PbUAAAAASUVORK5CYII=&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="screenshot of editorconfig mouse icon in the status bar" title="" src="/static/editor-mouse-39200e898c084d11c48d6b6d7da6471e-d766e.png" srcset="/static/editor-mouse-39200e898c084d11c48d6b6d7da6471e-a6b6e.png 143w,\n/static/editor-mouse-39200e898c084d11c48d6b6d7da6471e-8e488.png 285w,\n/static/editor-mouse-39200e898c084d11c48d6b6d7da6471e-d766e.png 570w,\n/static/editor-mouse-39200e898c084d11c48d6b6d7da6471e-7a88b.png 831w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>I find this warning distracting.  I know what its there for and have decided I don’t care about it, but I can’t dismiss it normally.  So instead I can take advantage of Atom’s flexibility to just get rid of it. All I need to do is open up devtools (⇧⌘I) and find the class.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/editor-mouse-devtools-bada6a2b6969a5a867626981a6af7347-fbee6.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 61.800947867298575%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsSAAALEgHS3X78AAAC00lEQVQoz3WQ63NaVRTF7x/hjNqxtoYQSQIBIYTyCpDLMxAgpIla6/huVNokZuJj9F/0i6MTY9JMa1qg4cLlcbnhBpL+PBzHGf3gmbPmrL1nn73XXoonsIw/ouJaDDPlcOPyRwmqBRL5uxIrhU2i6dJ/sJwpE04V/+bZdaIijmUr+GNZFE8ghjeYYMbpwz7vxbkYIZQskq18SKr0PvnNj8msfyCRrdwXuXukiu+hrr1LunyP+OqG4Fuy8VI8hxJcVokmUriXllkQ6tyBuFSYK66TLZTIrZUplNZZLZZlnM6tspLOkRBIZnJEU2vEchUiQq1s6L0TIxTPSIW2WQ/zvjDBlTzJwgaJXJl4tkQyv0FKxOpqhUxxk0xpS+aS+QqqsEUqFtb4IimUBX+EiJrH6Q3Klec8ARYWQ/KdDJmee0fmbXMepsTA6Xkfb7v9zHnv4Aup0q6A8C6srskNlRmXH5cvwi27kxtvOXhjalbAwas3bbx+y85rb07zyo3b3LbN45hdwD4zi83hYloM9ITTOAMJ3KEki5E0dtcSynZ1j+1H+3wh3gcT/vAbtqu7fP7VDp9uV/nkwdd89NmXVHe/oyrqHu0dsLP/PXvf/sTuwY8SOwc/8HBvX/5XLHOAdqahNwyGnS5dfQKTi86AQcvA7JuMr64YjUaMxmP+fcYiNoy+qNcxejqWZaHANb2nGr3HdfSzGk9P27TOTYZ9i7F5CS+v+b9zNbLQhQjTNBkIyIaN7pgn9QGnx2f8cqjx8689jh53qTUHNHSLRvuSZnck8aIzoq6PqIlcrS14y6TfPEdvtWTDyRbK0fMhv9csfjtscXiic1Ib8sezIcfP+gKm5H82Lc60S568GHJStzgWOBJ/ThsXdBp1eqJhU2v9s/JLcceY55qY1kLXenTaJlrToCO4aQzp6Abddptet0d/4nNbeGtccD226JwLhc0mbeHjYDDgLx72d/T2p6rUAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="screenshot of editorconfig mouse icon in the status bar with devtools open"\n        title=""\n        src="/static/editor-mouse-devtools-bada6a2b6969a5a867626981a6af7347-d766e.png"\n        srcset="/static/editor-mouse-devtools-bada6a2b6969a5a867626981a6af7347-a6b6e.png 143w,\n/static/editor-mouse-devtools-bada6a2b6969a5a867626981a6af7347-8e488.png 285w,\n/static/editor-mouse-devtools-bada6a2b6969a5a867626981a6af7347-d766e.png 570w,\n/static/editor-mouse-devtools-bada6a2b6969a5a867626981a6af7347-13239.png 855w,\n/static/editor-mouse-devtools-bada6a2b6969a5a867626981a6af7347-fbee6.png 1055w"\n        sizes="(max-width: 570px) 100vw, 570px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Then we can edit our styles.less file.  Atom will open it for you if you click the <em>your stylesheet</em> link at the top of the Settings>Themes page.  My edit to remove the mouse icon looks like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-less"><code><span class="token selector">.aec-icon-mouse</span> <span class="token punctuation">{</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h3>More Resources</h3>\n<ul>\n<li>The <a href="https://atom.io/docs">atom documentation</a> is really great, and worth diving into if you want to go deeper into Atom</li>\n<li>If you’re interested in learning more about keyboard driven text editing, check out <a href="https://benmccormick.org/learning-vim-in-2014/">my series on Vim</a>.</li>\n</ul>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>I’m using MacOS default keyboard shortcuts for this post.  Windows and Linux shortcuts are usually similar with <code>ctrl</code> often swapped for <code>⌘</code>.</p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n<li id="fn-2">\n<p>Dirty files are files that have been edited and not yet added to the index or committed.</p>\n<a href="#fnref-2" class="footnote-backref">↩</a>\n</li>\n<li id="fn-3">\n<p>I’ve definitely seen post-startup perf issues at points as well, but I suspect that those are implementation problems that will continue to improve as the editor matures and the underlying Chromium platform continues to push on performance.  This may be naive.</p>\n<a href="#fnref-3" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',frontmatter:{title:"Atom Productivity Tips",keywords:"atom tips vim editor fuzzy finder CSS",category:"tools",date:"2017-05-30T03:20:00+00:00",path:"/2017/05/29/atom-tips/",layout:"post",hideFooter:null},fields:{slug:"/2017/05/29/atom-tips/"}}},pathContext:{slug:"/2017/05/29/atom-tips/",relatedPosts:[{path:"/2016/01/11/the-most-interesting-atom-packages-ive-found-so-far",data:{title:"The Most Interesting Atom Packages I've found (so far)",path:"/2016/01/11/the-most-interesting-atom-packages-ive-found-so-far",description:"A rundown of the coolest Atom packages I've seen",date:"2016-01-11T02:25:49+00:00"}},{path:"/2017/05/28/mariana-syntax-atom/",data:{title:"Mariana Syntax Theme For Atom",path:"/2017/05/28/mariana-syntax-atom/",description:"Announcing a port of the Mariana color scheme to Atom",date:"2017-05-28T04:05:00+00:00"}},{path:"/2017/01/03/orthogonality-and-css-in-js/",data:{title:"Orthogonality and CSS in JS",path:"/2017/01/03/orthogonality-and-css-in-js/",description:"Separation of concerns in the context of CSS and JavaScript",date:"2017-01-03T00:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2017-05-29-atom-tips-17f95f432686358f16a6.js.map