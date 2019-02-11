---
title: "CLI WIP"
date: "2018/09/17"
layout: "post"
path: "/2018/09/17/lodash-wip/"
description: "Lodash wip"
keywords: ""
category: "software-productivity"
topics: []
key: "cli-1"
isDraft: true
readNext: "feedback-loops,ten-things-js,react-confessions"
---

# Diving Into The Command Line: Getting Started

Do you want to learn to use the command line?  If you're not sure, I can understand that.  I ignored the command line for a long time after I started writing code.  I used IDEs, I learned just enough about my terminal application that I could copy and paste scripts when asked, and I generally stayed away from "text mode" as much as possible.  In my mind text based input felt like a relic from the past, a time-sink that would probably be obsolete in a few years as tools got better, and overall a huge pain that I wanted to avoid.

But I was wrong.  It turns out there are plenty of reasons why making good use of the command line environment is an incredibly relevant skill today.

1. **It gives you more freedom as a programmer.**  GUI only programmers and command line novices can function well in some situations.  But there are many areas where they will not have all the skills required. Anything requiring remote access to servers, significant Linux work, or dealing with the filesystem certainly will be a problem. If you know the command line well, that skillset will translate across many different environments.
2. **It saves you time.**  Building your command line skills is the strange kind of time savings that costs you huge chunks of time up front and then saves you 3 seconds... over and over again as years pass.  Learning about the command line, writing scripts and improving your configuration is an investment that pays off slowly.  But it does pay off.
3. **It minimizes incompatibility by working with text.**  Pretty much everything that happens on the command line deals with plain text, or plain text based formats like json and xml.  There are no proprietary formats like those used by the Microsoft Office suite.  Because of this, it's really easy to trade out tools and keep growing as new ones become available.  There is none of the lock-in or skill decay that can come from becoming dependent on a proprietary GUI tool.

Despite all of that value, the command line can be an incredibly inaccessible tool.  Compared to GUI tools with their visual affordances and clearly labeled menu items, command line usage can seem like an inscrutable process of typing out random incantations and hoping for the best.  If you want to be good at it, you might think you need to be a guru who does nothing else. That perception isn't helped by the introductory material available.  While command line applications usually have great API style documentation, it can be harder to find good directed learning material.

This post is the first in a new series of articles I'm writing to help meet that need.  This will be a slow, deliberate introduction to the command line, with an emphasis on understanding the concepts rather than giving "magic formulas" to do cool stuff.  The goal here isn't to make you an expert, but to build a foundation of knowledge that you can build on to accomplish the tasks that you care about.

### Definitions

Before going to far, it's helpful to define some terms.  *Command Line Interface* is a very generic term that essentially covers any program with which users interact primarily through text.  This series will be focusing specifically on the command line programs common to Unix-like operating systems like Linux and OSX <sup id="fnref:1">[1](#fn:1)</sup>, and when I use the term command line thats what I'll be referring to. For Unix and it's successors, command line interfaces typically consist of 3 components:

- **A Terminal** is an application that provides access to a text based interface to your operating system.  It renders the text interface and maps operating systems controls to a standard, but doesn't provide any APIs or capabilities in and of itself
- **A Shell** is a user interface for accessing an operating systems services. The desktop interfaces for Windows and OSX are technically shells.  But generally in modern terms, shell is used to refer to command line interfaces for an operating system, and that is how I will be using the term. Command line shells provide a syntax for accessing the various system and user applications availabe in an operating system, as well as services like the file system.
- **A command line application** is an application that can be run or interacted with through the command line.  Examples include basic utilities like `cp`, the program that allows you to copy files to a different location, as well as complex applications not bundled with an operating system like `git`, a version control system.

So for the most part, most "using the command line" involves opening a terminal and then using a shell to interact with command line applications.

### Getting Setup

The good news?  If you're on a Unix-like system like Linux or OSX, you already have everything you need to get started learning the command line installed on your system.  You'll need to find your terminal.  On OSX, Terminal.app is bundled with the OS and you can find it by searching for Terminal in spotlight.  On Linux the name of the application will vary by your distribution and setup, but you should have something with a name like Terminal/Console/Konsole available somewhere.  If you're using Windows and want to follow along, you'll need to be able to access a copy of Linux.  You can do that either by installing a Linux Virtual Machine to run inside of Windows using something like [VirtualBox][vbox] <sup id="fnref:2">[2](#fn:2)</sup>, or connecting to a Linux machine you have access to with an ssh program like [PuTTY][putty].

Once you've opened your terminal, we need to check and see what shell you're using. To do that we're going to ask the shell to ouput the name of the currently running program, which will in this case, be the shell.  So we'll call `echo`, a program that writes whatever input it receives to the screen, and pass it `$0` a special variable that holds the name of the current program.  To do that type the following snippet into your terminal and hit enter.

    echo $0

This should have ouputted the name of a shell, something like bash, ksh, csh, or zsh. Most modern systems will have defaulted to bash. I'm going to assume that you're using bash going forward.  For the most part though the things I'm covering will be generic and will not depend on a specific shell.  I'll do my best to explain what does.  If you want to switch shells, you can temporarily use bash by calling it directly (ie typing `bash` into your terminal and hitting enter), or if you have admin privileges, you can permanently switch the default shell using `chsh`, the change shell command for Linux <sup id="fnref:3">[3](#fn:3)</sup>.

### Basic Structure of commands

So now you have a terminal window open, and you're running a shell.  You've already written your first command, `echo $0`.  Let's have a little bit more fun with the echo command for a moment, and break down what we're doing.  We can input

    echo "Hello World"

which prints out hello world.  This is a good example of the general form that shell commands take. The first thing printed is a program name, in this case `echo`.  That's followed by 0 or more arguments.  So in our above example, echo is the program, and "Hello World" was an argument passed to it.  But how do we even know what echo does or what arguments it takes? It turns out that Unix programs have a convention that most other commandline applications follow of exposing help documentation in a standardized fashion.  This allows for a program to act as a "universal help button" for command line applications.  `man` is that standardized application.  We can run `man` just like we do echo, by calling it and passing it an argument, in this case the name of the program we want to learn about.  Calling

    man echo

should yield something like this:

![Output of man echo](manecho.png)

Echo has a very short help document.  We can see it what it does, similar to how I described it above.  But the interesting part of this for us is the usage synopsis.  That shows the format of arguments that echo expects.  For synopses like this, square brackets indicate that an argument is optional, and ellipses indicate an indefinite amount.  So echo takes an optional `-n` as a first argument, followed by 0 or more strings of text separated by spaces.  The `-n` is our first look at flags, a special type of command line argument that lets a user specify the behavior or configuration of an application.  For instance when the `-n` flag is added, echo no longer includes a newline character at the end of its output.  You can test that by exiting the man page (hit *q* and then enter), and trying it yourself.  It should look something like this.

![Example of echo -n](echon.png)

In other cases, flags can be used to allow for optional configuration arguments.  Allowing you to type `foo -c bar` means you can only change the configurations you don't want to use the defaults for, and avoid having to type out every configuration argument each time you use a program.

To see a more complicated example of a program usage synopsis, we can run man on itself.  Running `man man` should yield something like this

![output of man man](manman.png)

As you can see there are many options, each of which allows for slightly different behavior.  This is a fairly typical synopsis for more complex command line programs.  There's no need to worry about memorizing all the options though.  Because Unix-style applications tend to have very focused use-cases, it's good enough to know the purposes of different applications, and then figure out the details as you go.  As you use them more, some may stick in your memory, and you may write scripts so that you don't have to remember others.  Regardless, man is a great resource for the times you forget.


### Summary

 - Learning to use the command line can improve your efficiency, and is a necessity for many computing situations
 - "Using the Command Line" involves opening a terminal, and using the shell to interact with various operating system services and command line applications
- Unix-like operating systems come preinstalled with everything you need to use the command line
- A typical command consists of an application name, followed by a series of arguments
- To understand a program's purpose and expected arguments, call `man <program name>`
- **Applications Introduced** - echo, man, chsh <sup id="fnref:4">[4](#fn:4)</sup>

---
### More Resources

- If you're not sure what shell is preinstalled on your operating system, this [Stack Overflow question][whichshell] is a good resource for figuring it out.

- If you're looking for something a bit quicker to get started, [this is a nice writeup][gettingstartedcommand] from last year that moves more quickly through some of the basics a new command line user might want to know

---

### Subscribe

This was the first post in a new series on learning to use the command line. If you enjoyed the post  please consider subscribing by using the [feed](http://feedpress.me/benmccormick), with [twitter](http://twitter.com/benmccormickorg) or by joining my [mailing list](http://eepurl.com/WFYon).

---



<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        For the most part this falls under <a href="http://en.wikipedia.org/wiki/POSIX">POSIX</a> standards.
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
        <li class="footnote" id="fn:2">
            <p>
            I'd recommend installing Ubuntu, it has great documentation and a helpful community to get you started.
            </p>
            <a href="#fnref:2" title="return to article"> ↩</a></p>
        </li>
        <li class="footnote" id="fn:3">
            <p>
            The full command is <code>chsh -s %%bash full path%%</code>.  To find the full path to the bash shell, you can use <code>which</code>, a program that returns the path of the program name passed to it.  So run <code>which bash</code>, then put the output of that into the chsh statement.  It should look something like this: <code>chsh -s /bin/bash</code>.  If bash isn't installed on your system, consider upgrading to a newer system, or do some googling as to the best way to install it on your OS.
            </p>
            <a href="#fnref:3" title="return to article"> ↩</a></p>
        </li>
        <li class="footnote" id="fn:4">
            <p>
            And *which*, but only for the people who read the footnotes.
            </p>
            <a href="#fnref:4" title="return to article"> ↩</a></p>
        </li>
</ol>
</div>

[vbox]: https://www.virtualbox.org/
[putty]:http://www.chiark.greenend.org.uk/~sgtatham/putty/
[whichshell]: http://stackoverflow.com/questions/3327013/how-to-determine-the-current-shell-im-working-on
[gettingstartedcommand]: http://www.makeuseof.com/tag/a-quick-guide-to-get-started-with-the-linux-command-line/
