# Comparing Text Editors: A geeky comparison of Vim, Sublime Text and Atom

-- Intro here --

I hate Sublime Text for not being Vim.  I hate Vim for not being Sublime Text.  I hate Atom for not living up to either of them.  I've written tutorials on using both Sublime Text and Vim at different points, and produced thousands of lines of code and writing in each.  More recently I've been tracking Atom and even contributed to it's vim-mode plugin. I am comfortable saying I'm knowledgeable about all 3, but all I can do when somebody criticizes any of them is nod and agree.

My [series on Vim][vim2014] last year led to more conversation and feedback than anything else I've written on this blog.  A huge percentage of that feedback consisted of "don't use Vim, use [Sublime/Atom/Emacs/an IDE] instead".   I'm unqualified (and terrified) to speak to the Emacs comparison, and I don't see IDEs as filling the same niche as a text editor, but Atom and Sublime are fair comparisons. So here's my best shot at a comparison for those trying to decide which one to use, and my gift to the (apparently large) crowd who like to get mad about text editors on the Internet.

I'm going to compare Vim, Atom and Sublime across the 5 broad areas that I think are important for a text editor:

- **Text Manipulation**: The core function of a text editor, how it works with text to make additions, deletions and changes
- **File Management**: How the editor interacts with the file system, organizes projects and displays files for editing 
- **Extensibility**: How extensible the editor is, including the extension language and what functionality is actually exposed
- **Experience & Design**: How it feels to use the editor.  Are you delighted by the small details or are there constant frustrations?
- **Reliability**: This encompasses both short term reliability in terms of application stability, and longterm reliability in terms of investing in the technology

The goal is not to declare a winner, but to explain the tradeoffs involved in choosing each one.  Note that this is piece is aimed at those who want to invest in learning a text editor and becoming more productive.  That involves a time commitment, and might not be right for everyone. If you're just looking for something that lets you write to and save files right now, go for whatever feels comfortable to you.  Sublime and Atom have pretty low learning curves for people who are used to Windows or Mac desktop environments, as do many IDEs.  For those of you still with me, let's take a deeper dive into each of these editors from a power user's perspective.

### Text Manipulation

Text documents are pretty simple.  If we exclude encoding issues and other weirdness, there's pretty much nothing you can achieve in one text editor that you can't achieve in another.  At the end of the day you're just moving characters around in a file, and even ed and Notepad are up to that.  So it's important to understand that these comparisons aren't about power so much as ease of use.  This is first and foremost a UX discussion.  We need to look at what tools each editor provides the user, and the possibilities and limitations those provide.

#### Vim

Vim is the modern heir of Vi, and it's soaked in its UX philosophy.  Vim's text manipulation capabilities are built around Vi's key-bindings and the Unix philosophy of small composable commands that work together.  It's a [beautiful language for editing][vimaslang].  But Vim's killer editing feature isn't so much the Vi keybindings (plenty of editors have that) but rather that its whole ecosystem embraces the Vi philosophy, allowing for a consistent, extensible experience.  This means a relatively small plugin like [Vim-Surround][vimsurround] can gain immense power and instant familiarity by working into Vim's language.  If a Vim user learns that `ysiw'` means "surround the current word with single quotes", they then will immediately know that `ysip'` will surround a paragraph with quotes, and `yss'` will surround the current line with quotes.  Because this way of editing is so firmly implanted into the editor's DNA, it allows for an incredibly consistent experience when editing text, even while using plugins.

Of course the downside of Vim's opinionated approach is obvious.  If you don't like it's conventions (and these days they're far from mainstream), you're going to have a rough time in Vim-land.  Sure you can remap keys and create a more "normal" keyboard experience, but you'll be fighting Vim every step along the way.  These non-mainstream conventions make for a steep learning curve for Vim, and also make it [easy to parody][quittingvim].

#### Sublime

Sublime doesn't share Vim's emphasis on composability.  It has a reasonable implementation of Vi keybindings, but most plugins aren't optimized for it.  It chooses instead to be more consistent with operating system conventions.  Sublime's killer editing feature is its wonderful multi-cursor mode, which allows you to place your cursor at multiple points in the document and edit all of them at once.  Vim and other editors offer features that allow you to replicate the effects of multiple cursors (macros for instance), but the visual feedback provided by watching all of the results of your keystrokes happening simultaneously is invaluable, and probably Sublime's most innovative feature.

**Verdict**: Sublime appeals to lots of people because it's easier to pick up and learn incrementally. Multiple cursors are also an amazing tool  But for power users, especially for those who already are comfortable with Vi key-bindings, Vim is hard to beat in terms of speed and efficiency of key bindings.   You can replicate Vim's core elsewhere, but you won't get Vim's ecosystem and the impressive set of "language" extensions it provides.

### File Management

File management covers several important questions.  Can I quickly access the files I want?  Can I view them in a useful way?  Can I quickly search files in my current project?  Can I easily switch to another project? In general this category is about how much the editor allows you to ignore the details of the file system and focus on the logic of your code or writing.

Vim's default file selection interface drives me crazy.  Possibly it's because I'm a relatively slow typist compared to most Vim users<sup id="fnref:2">[1](#fn:2)</sup>.  But honestly I think it's just because inefficiency makes me nuts.  By default to open a file in Vim, you need to type in the full path to that file from your current directory, or use it's rather clunky built in directory traversal tool.  You can enable wild cards and tab completion for typing in your files, but it still requires you to keep your projects directory structure in your head, and punishes you for having deeply nested project directories.  Once you've opened files, they're stored in the editor as buffers which you can then switch between either by going through them in order or referencing them by name or number.  It boggles my mind that in a world with instant search of the whole web and ubiquitous fast search at the operating system level, a modern text editor can ship without a real file search capability built in.

The good news is that we're not stuck with 

<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        Atom's issues right now:  it lacks Sublime's polish and Vim's utility, it apparently still chokes on large files (will probably always be an issue to some extent given its tech stack), and quite frankly doesn't have a killer feature to separate it yet (other than web tech extensibility).  I hope it succeeds, but it has a long way to go.
            <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
    <li class="footnote" id="fn:2">
        <p>
        About 62 wpm when I've taken typing tests.
            <a href="#fnref:2" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>

[vimaslang]:
[vimsurround]:
[quittingvim]: http://www.reddit.com/r/vim/comments/25x8bm/finally_found_a_vim_joke/