# Diving Into The Command Line: The Basics

If a tool is going to be a major part of your workflow on a day to day basis, it's important to understand how it really works.  That's especially true with the command line, since it doesn't provide much guidance if you don't know what you're doing. This post is a continuation of my "slow dive" into the basics of the command line, as we build up a foundation of knowledge that will ground us as we move into more advanced topics. This will be a look at the file system, variables, and basic configuration.

### Running Applications

We'll start by looking at one of our examples from [my first piece in this series][divingintro].

    man echo 

This command displays the documentation for the echo command.  But how does the shell interpret the command? Specifically how does it know what the man command is?  If I have 2 applications named man, which one gets run? Let's start by seeing what program is actually executed.  We can use the `which` application mentioned in my last post to figure that out. 

   which man

That command should produce something like `/usr/bin/man`, meaning that when we call `man` the program that will run is the man program located in the `/usr/bin/` directory. `/usr/bin` is one of a few directories that might contain system utilities depending on your operating system.  On OSX at least it contains many of the common system applications.  You can see the complete list for your system by running `ls /usr/bin`. `ls` is a command that lists the files in a given directory. Running it on `/usr/bin` should produce a long list of programs on OSX.  Exactly what is produced will depend on your operating system.  

So we know which version of `man` is running now.  It's the application that sits at `/usr/bin/man`.  But what if we had written or downloaded a new improved version of `man`, and it was sitting in our home directory at `/User/<username>/bin/man`?  How could we get that to run instead?  Would we need to name it something different or delete the existing `man` application?  And how will our shell even know that it exists?

It turns out that shells have certain directories they look for programs in.  When a user enters a command, they go through that list in priority order, looking for an application with a matching name.  If it finds a match, they stop looking and run that application.  If there is no match, the shell will return a message saying that the command was not found. That list of directories is called a shell's `PATH` and it is stored as a variable that we can view and change.  

### The PATH Variable

In my last post we got a brief glimpse of variables with the `echo $0` command.  Command line variables are very simple.  They consist of a name and a value.  You can access the value of a variable by prefixing its name with a `$`.  So we can see our current PATH by running

    echo $PATH

If you've never edited your PATH before, that command will probably produce something like 

    #echo $PATH
    /usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/X11/bin

You can now see how the PATH is setup.  Each directory is separated by a colon.  Priority goes left to right, so with the above PATH if you had 2 programs called `/usr/bin/app` and `/usr/local/bin/app`, typing `app` into the command line whould run `/usr/bin/app`.

It's good to know how PATH works, but what if we want to change it? The syntax for changing variables is pretty easy.  Let's start by adding a directory to our PATH. We're not quite ready to get into adding our own applications yet, so we're not going to care too much about what directory we add.  Instead we'll focus on how we can modify variables.  In this case we want to add a new directory (we'll say `/fake/directory`) to the end of our PATH.  
















[divingintro]: 

