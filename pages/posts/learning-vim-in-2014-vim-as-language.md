---
title: "Learning Vim in 2014: Vim as Language"
date: "2014-07-02 11:27:00+00:00"
layout: post
path: "/2014/07/02/learning-vim-in-2014-vim-as-language"
description: "An explanation of the grammar behind Vim"
keywords: "vim language grammar text object"

---

Wouldn't it be nice if your text editor just did what you said instead of making you slowly and manually add and delete characters?  Vim doesn't speak English, but it has a language of its own, built out of composable commands, that is much more efficient than the simple movement and editing commands you'll find in other editors.  In my [last post][vimbasics], I took an initial look at Vim as a language.  I'm going to dive deeper into that here.

### Vim Verbs: What can you do?

Vim's "verbs" mostly fall into 2 main categories.  Some of them act on a single character, and others act on a "motion" or "text object".  We'll look at motions in a second, but lets start by looking at the verbs.

#### Single character verbs

So like I said, there are a few vim actions that act on a single character.  They act as shortcuts for actions that you can also perform with motions, and allow you to save a few keystrokes.

<table>
<tr>
<th>Command</th>
<th>Action</th>
</tr>
<tr>
<td>x</td>
<td>Delete character under the cursor</td>
</tr>
<tr>
<td>r</td><td>Replace character under cursor with another character</td>
</tr><tr>
<td>s</td><td>Delete character under cursor and move to insert mode</td>
</tr>
</table>

These are great commands to know, and things that I use daily, but they act as a bit of an island.  Let's look at some verbs with more power.

<table>
<tr>
<th>Command</th>
<th>Action</th>
</tr>
<tr>
<td>d<motion></td><td>Delete text specified by motion</td>
</tr><tr>
<td>c<motion></td><td>Delete text specified by motion and go into insert mode</td>
</tr><tr>
<td>y<motion></td><td>Yank (copy) text specified by motion</td>
</tr>
</table>

These aren't the only 3 actions that you can use with motions, but they're probably the most important. The first 2 are roughly the same as deleting or cutting in most instances, with the option to choose what mode you end in. The 3rd is Vim's version of copying.

#### Motions

So how do we use these actions?  You'll notice that if you type any of the above characters into Vim by themselves, nothing happens.  That's because they're expecting something to act on.  If you're a grammar nerd or remember your 8th grade english classes, you can think of these as transitive verbs that need to act on a direct object.  These "direct objects" come in 2 forms, motions and text objects.  Motions are the motion commands that you can use at any time to move around Vim.  Some examples:

<table>
<tr>
<th>Command</th>
<th>Motion</th>
</tr>
<tr>
<td>$<motion></td><td>Go to the end of the line</td>
</tr><tr>
<td>G<motion></td><td>Go to the end of the file</td>
</tr><tr>
<td>f.<motion></td><td>Go to the next occurrence of `.` on the current line</td>
</tr>
</table>

All of these commands work as motions on their own, but when you combine them with actions you can get powerful effects.  So `d$` means "delete to the end of the line".  `cf)` means "change through the next closing parentheses" and `yG` means copy everything through the end of the file.  The list above is only a small subset of the motions available.  I'd suggest learning 1 or 2 to start and using them when appropriate.  As you get more comfortable with Vim you can continue to add more, and each one will unlock a set of commands for all of the actions you know.

The second type of "direct object" that Vim verbs can take is a text object.  You can think of text objects as a "defined chunk of text."  Some examples include selecting words, html tag contents, or the contents of a function.

<table>
<tr>
<th>Command</th>
<th>Text Object</th>
</tr>
<tr>
<td>iw</td><td>Applies to everything in the current word</td>
</tr><tr>
<td>it<motion></td><td>Applies to everything in current xml/html tag</td>
</tr><tr>
<td>i{<motion></td><td>Applies to everything inside nearest curly brackets</td>
</tr>
</table>

So using text objects you can change the contents of a word with the easily memorizable `ciw` (change in word), or copy the contents of an html `<a>` tag with yit.  It's worth mentioning here that one of the most powerful text objects is a bit of an oddball.  A really common thing people do is applying an action to the current line.  Vi's language makes this easy by allowing the shortcut for this text object to be a simple repeat of the action.  So `yy` yanks the current line, `dd` deletes it, and `cc` changes it.

#### Piece by Piece

The key here is that learning Vim isn't something you do in a weekend. It's an iterative process. Since the actions, motions, and text objects build on themselves, you can start to grow your toolbox exponentially as time goes on.  But you'll want to start with a few commands that you find make you productive.  I've personally found `ciw`, `dd` and `ci(` to be incredibly useful commands, and a great place to start as you learn to use these commands instead of the slower "mouse and select" methods that you may be used to. When we learn languages we all start with basic sentences, learn the grammar rules and grow from there.  Vim is no different. Start small and add to your toolbox as you build great things with it.

---

### More Resources

- [Your problem with Vim is that you don't grok vi](http://stackoverflow.com/a/1220118/1424361) - A concise explanation of what makes vi/vim special, and one of the most popular answers ever on Stack Overflow.
- [Why Atom can't replace Vim](https://medium.com/@mkozlows/why-atom-cant-replace-vim-433852f4b4d1) - A great piece on the big picture importance of composable commands.
- [Vim Text Objects: The Definitive Guide](http://blog.carbonfive.com/2011/10/17/vim-text-objects-the-definitive-guide/) - This is a nice rundown of the different text objects available, including some that you can add using plugins.

---
### Subscribe

This was the second in a series of posts on learning Vim in a modern way.  If you enjoyed the post consider subscribing to the [feed](http://feedpress.me/benmccormick) or joining my [mailing list](http://eepurl.com/WFYon). If you're new to Vim, also consider checking out the [first piece][vimbasics] in this series, on the basics of getting started with Vim, and the [next post](http://benmccormick.org/2014/07/07/learning-vim-in-2014-working-with-files/) in the series, on working with files in Vim.

---

#### Update

This post is currently on the front page of Hacker News. Feel free to join in the conversation [there](https://news.ycombinator.com/item?id=7976493)

[vimbasics]: http://benmccormick.org/2014/06/30/learning-vim-in-2014-the-basics/
