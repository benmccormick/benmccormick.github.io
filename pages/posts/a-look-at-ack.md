---
title: "A look at Ack"
date: "2013-11-25 23:50:00+00:00"
layout: "post"
path: "/2013/11/25/a-look-at-ack"
pageViews: "5305"
last30pageViews: "51"
---

Do you spend a lot of time searching your projects for a specific piece of code?  Frustrated by grep's weird syntax or slow IDE search tools?  [Ack][ack] is a tool like grep designed for programmers.  I use it for searching my source code to track down sections of code or look for occurences of a variable or reference.  It's a simple open-source tool that does one job well, and does it with blazing speed.

Ack performs a subset of grep's functionality, optimizing for the programmer's use case. In the simplest usage it will allow you to enter an expression, and will search files in the current directory/subdirectory for it, ignoring version control artifacts like .svn and .git files.

    # search all files in current directory recursively
    # to see if they contain "foobar"
    ack foobar

Ack then spits out nicely formatted output with the full file paths and line numbers of each occurence. For instance here is the output of searching the directory containing my blog posts for references to Microsoft.

![ack usage example](/posts/images/ack_msft.png)

These are very simple examples.  Because of ack's sensible defaults and focused design, these basic commands cover about 80% of what I'm looking for from a code search tool. But for those who want to do a bit more, ack can be much more powerful.  Because ack is written in perl, any perl-compatible regular expression can be used to search your files.  Ack provides plenty of options for formatting the output and it's also very easy to filter by filetype.

For instance, I have a small side project where I'm creating an event signup site with the front end code written in CoffeeScript.  If I want to see which files I've referenced events in without necessarily seeing all the details, I can use the `-l` flag to only show file names.

![filenames only](/posts/images/ack_signup.png)

Obviously this search brings up several types of files. Along with the CoffeeScript files I'm interested in, ack shows some html and css files, as well as a random server side file.  It also shows the generated JavaScript files.  I could get rid of these files by specifying a different root directory, but instead I'm going to show ack's  smart filtering by filetype.  To search only coffeescript files, I just need to add the `--coffee` flag to see all CoffeeScript matches.

![ack filetype filtering](/posts/images/ack_event.png)

Its also easy to add multiple filetype flags in order to search several filetypes, and you can even define custom filetype flags with an .ackrc file.  These also let you specify default options and set certain directories to be ignored on a global or per-project basis.

#### Other Options

Ack is hardly the only code search tool out there.  It's meant to improve on grep by focusing on the programmer's use cases, but there are ~~many~~ some situations where grep is still a good option.  Ack is situationally optimized for searching code, ~~and doesn't work as well for filtering piped output~~. Grep is also installed on many remote servers where you won't have access to ack.  So ack makes a great complement to grep, moreso than a replacement.

*Update: You can totally use Ack to filter piped output.  Another reason to use grep gone.*

In terms of direct competition, [ag][ag] is an attempt to improve on ack, mostly in terms of speed. Ag uses various tricks to optimize speed performance for code search, using an ack compatible syntax. Since its written in C rather than perl, it is indeed significantly faster.  I personally am more comfortable with ack.  Its more mature, has better documentation, and has always been fast enough for me.

~~Ag was not updated to support ack 2's filetype filtering, and generally seems to have focused on speed over all else.~~  It also has dependencies that I've found are a problem on old operating systems. Ack only depends on perl, and is thus very portable, even to Windows systems.  Still, if you find ack to be slow on your code base, or just like knowing you're doing everything as fast as possible, ag is a great alternative.

*Update: As of version 0.22.0 ag supports ack's filetype syntax, but does not allow you to define custom file types, a very useful ack feature.*

#### Summary

If you've been using grep or slow GUI tools to search your source code, you can do better. Ack is fast, easy to use, and optimized for programmers.  It's also free, open-source code you can use without cost or licensing worries.  If you want to go even faster, consider using ag.  Just make sure you're using a tool that was built for the work you're doing.


[ag]: https://github.com/ggreer/the_silver_searcher
[ack]: http://beyondgrep.com/

