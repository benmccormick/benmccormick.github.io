webpackJsonp([0x6e6c66120b95],{744:function(e,o){e.exports={data:{markdownRemark:{html:'<p>Have you ever tried to summarize something that was just too big to explain?  I’ve covered a lot of ground in my posts on Vim this past month, but it’s only scratched the surface of what Vim has to offer.  The goal was to create a foundation that people could start with, and then let them build on their own. There’s not a conclusive way to say what somebody “needs to know” when learning Vim.  Most people don’t (and shouldn’t) use every feature of the editor, they use the ones that make sense for them.  So I’ve tried to cover the things that I know people have found useful, and the philosophy behind how Vim works, and then let you figure out what you’d like to use on your own.  This post wraps up the series, but I wanted to highlight one last feature of Vim, its fantastic search capabilities.</p>\n<h3>Search</h3>\n<p>Vim has an extremely powerful built in search tool.  To use it, you can type <code>/</code> at anytime in normal mode to start entering search terms.  For instance <code>/foo</code> followed by enter searches for the next occurrence of <code>foo</code> in the document.  You can then skip over matches with <code>n</code> or go backwards with <code>N</code>.  If you wanted to start by searching backwards, you could have started with <code>?foo</code> instead of <code>/foo</code>, in which case <code>n</code> and <code>N</code> would reverse behavior, with <code>N</code> moving forward in the document and <code>n</code> moving back.  It’s easiest to think of <code>n</code> as “next match” and <code>N</code> as “previous match”, with the direction determined by the search operator, <code>/</code> or <code>?</code>.</p>\n<p>The search tool can be used for more than simple literal expressions, it also takes regular expressions.  So <code>/fo.\\|bar</code> will match <code>foo</code>, <code>fox</code>, and <code>bar</code>.  You also can search for lines containing both foo and bar with the expression <code>/.*foo\\&#x26;.*bar</code>.  If you want to dig deeper into Vim’s regex language, I’d recommend typing in <code>:h pattern</code> to check out the excellent documentation.</p>\n<h3>Substitute</h3>\n<p>Search is great, but in many cases what we want to use it for is replacing or acting on each instance.  Vim’s search and replace command looks something like <code>:%s/foo/bar/g</code>, which will replace all occurences of <code>foo</code> in the document with <code>bar</code>.  Let’s break that down a bit.  <code>:s</code> (substitute) is Vim’s search and replace command.  By default it only works on the current line, so in order to get it to act on the whole document I prepended the <code>%</code> character, which sets the range to include everything.  If you want a smaller range, you can select the text you want to act on in visual mode. Typing <code>:</code> will then preload the range into the command area.  Substitute takes an expression in the form <code>/&#x3C;search expression>/&#x3C;replace string>/&#x3C;modifiers></code>  where search expression defines the search, replace string is the text to substitute in, and modifiers are single letter arguments that change the behavior.  By default only the first instance of an expression per line is substituted, so I added the <code>g</code> modifier to tell Vim to substitute all instances of the search expression on a line.  Other useful modifiers are <code>i</code>, which makes the search case insensitive, and <code>c</code> which has Vim prompt for confirmation before substituting each instance. Confirmation is helpful if you want to change most but not all occurences of a phrase. One useful behavior of substitute to be aware of: If you leave the search expression blank, it reuses your last search.  So if you’ve been playing around with a regex to get the right expression, once you get it right you can type <code>:%s//&#x3C;replacement>/g</code>, and it will replace all instances, without forcing you to retype your complicated regex.</p>\n<p>Finally, it’s worth noting that search plays nicely with Vim’s <a href="http://benmccormick.org/2014/07/02/learning-vim-in-2014-vim-as-language/">composable actions</a>, and you can use it as a motion command with <code>y</code>, <code>c</code>, <code>d</code> or other actions.  For instance <code>d/foo</code> will delete all text up to the next occurence of foo in the document. <code>y?foo</code> will yank all text backwards to the previous occurence of foo in the document.</p>\n<h3>Inline Searching</h3>\n<p>Along with the primary search and substitute commands, Vim has other specialty searching tools.  One of these is its <code>f</code> and <code>t</code> commands. <code>f&#x3C;char></code> moves to a single character on the current line.  While less powerful than <code>/</code>, this can be super useful because of its quick composability and guarantee of not moving out of the current scope.  It’s really easy to type <code>cf)</code> to delete through the end of the parentheses.  <code>t</code> works similarly, but is non-inclusive, so you can use <code>ct)</code> to delete everything up to and not including the parentheses.  I remember it as “change find character” and “change to character” respectively.  Like <code>/</code>, these commands support backwards and repeated search.  <code>F</code> and <code>T</code> search backwards on the current line, and <code>;</code> and <code>,</code> are the default commands for “next match” and “previous match” respectively.</p>\n<h3>Cross-file searching with vimgrep and grep</h3>\n<p>Searching within a file is nice, but what if you want to search in multiple files?  Vim provides 2 commands for that.  The first, <code>:vimgrep</code>, uses Vim’s internal regex engines to search across multiple files. You could for instance type <code>:vimgrep /function/i ./*.js</code> to search all Javascript files in the current directory for the “function” keyword.  You’d then be able to loop through them using the <code>:ln</code> and <code>:lp</code> commands.</p>\n<p>The second command, <code>:grep</code>, integrates with an external search application (grep by default), to do the searching.  The advantage of the first is that it’s portable and will be available anywhere and everywhere that Vim is.  But generally external tools are going to be faster than Vim’s internal search engine.  Grep for instance is faster than vimgrep.  I personally use the external tool <a href="http://beyondgrep.com/">ack</a> which is faster than grep.  Regardless though, Vim has support for whatever approach you choose to take.</p>\n<h3>Cross-file replace with the arglist</h3>\n<p>Up till now we’ve mostly been dealing with tasks that Vim has good answers for.  If you want to do a search and replace across multiple files in Vim though, you end up in some of the more esoteric parts of Vim-land.  In order to do a search and replace across multiple files in Vim, you need to first define a set of files to edit, and then run the replace command.  Unfortunately there is no way in Vim to cleanly do this all in a single command.  Instead you must pull your list of files from one of 3 places, the arglist, the buffer list, or the window list.  The arglist is by default the files that you specified to open when you initially opened Vim, the buffer list is your list of currently opened buffers, and the window list is the list of files in currently open windows.  Since you probably don’t want to have to open or view all the files that you want to run a search/replace on, and you may want to have files open or visible without running a replace on them, the arglist is the list of choice for replacements.  Vim allows you to edit the contents of the arglist at any time using the <code>:argadd</code> and <code>argdelete</code> commands.  So to replace <code>foo</code> with <code>bar</code> for all javascript files in the current directory you might type something like.</p>\n<div class="gatsby-highlight">\n      <pre class="language-vimscript"><code>:argd * "Clear arglist\n:arga ./*.js  "Add javascript files\n:argdo %s/foo/bar/g "Substitute on each file</code></pre>\n      </div>\n<p><code>argdo</code> is the command to execute a command across all files in the arglist.  <code>bufdo</code>, <code>tabdo</code>, and <code>windo</code> work the same way for every “open buffer”, “active window in each tab”, and “window in the current tab” respectively. Personally I find this all to be a pain.  A single command that let you specify an action and a range to run it on like <code>:do \'%s/foo/bar/g\' ./*.js</code> would make plenty of sense.  But since that doesn’t exist, it’s worth at least knowing that the arglist is there, and being able to resort to it if necessary.</p>\n<h3>The Power Of Search</h3>\n<p>Most people start out using Vim knowing that they can move around with <em>hjkl</em> and switch between files with <code>:e &#x3C;filename></code> as they learn more they grow their toolbox. Search is a great tool for moving quickly around text in Vim, and for powerfully making big edits.  Searching allows you to allow your brain to focus on the big picture, rather than remembering exactly where each piece of code or content is located. Like everything else in Vim, it’s a tool that you can combine with other tools to create powerful workflows.</p>\n<hr>\n<h3>More Resources</h3>\n<ul>\n<li>\n<p><a href="http://vimcasts.org/episodes/operating-on-search-matches-using-gn/">Vimcasts</a> has a nice piece on the <code>gn</code> command, an alternative to <code>n</code> that lets you select the next search match in visual mode</p>\n</li>\n<li>\n<p><a href="http://vim.wikia.com/wiki/Search_and_replace">Vim’s wiki</a> also has a nice writeup of the <code>:substitute</code> command, with lots of examples and details.</p>\n</li>\n</ul>',frontmatter:{title:"Learning Vim in 2014: Search",keywords:"vim, search",category:"tools",date:"2014-08-04T01:16:20+00:00",path:"/2014/08/04/learning-vim-in-2014-search",layout:"post",hideFooter:null},fields:{slug:"/2014/08/04/learning-vim-in-2014-search"}}},pathContext:{slug:"/2014/08/04/learning-vim-in-2014-search",relatedPosts:[{path:"/learning-vim-in-2014",data:{title:"Learning Vim in 2014",path:"/learning-vim-in-2014",description:"A series of beginner level articles on Vim",date:null}},{path:"/2014/11/10/vim-workflows-file-switching-strategies",data:{title:"Vim Workflows: File Switching",path:"/2014/11/10/vim-workflows-file-switching-strategies",description:"A look at the different approaches you can take to managing files in Vim",date:"2014-11-10T04:06:52+00:00"}},{path:"/2014/07/02/learning-vim-in-2014-vim-as-language",data:{title:"Learning Vim in 2014: Vim as Language",path:"/2014/07/02/learning-vim-in-2014-vim-as-language",description:"An explanation of the grammar behind Vim",date:"2014-07-02T11:27:00+00:00"}}]}}}});
//# sourceMappingURL=path---2014-08-04-learning-vim-in-2014-search-6572e193654d39cc1104.js.map