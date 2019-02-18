---
title: "Computer Science for Front End Developers?"
date: "2018/02/20"
layout: "post"
path: "/2018/02/20/cs-for-fe/"
description: "What Computer Science concepts are useful for front end devs? "
keywords: "computer science networking front end"
category: "computer-science"
topics: ['Computer Science']
key: "cs-for-fe"
readNext: "react-confessions,large-improvements-small-team,ten-things-js"
---

I am primarily a front end web developer, and I have a Computer Science degree.  In my experience, this is neither rare nor particularly common.  Folks seem to get into front end dev because they're trying to solve particular problems, and those problems exist whether you have a PhD in high performance computing or you've never written a line of code before.  Front end web development is how you make code real to people, and it is the minimal requirement for making something that people can actually interact with in a web browser.  As a result, a dizzying array of folks get into Front end dev, and you'll find a broader set of experience levels than devs who work further "down the stack".  All of which means that many front end devs have never had any sort of "formal" Computer Science education.

Some CS degree holders turn up their nose at this, and it contributes to the reputation in some quarters of JavaScript and web dev not being "real programming".  Some self-taught devs see themselves as being liberated from the "irrelevant theory" of formal Computer Science and see no need for that type of background for Front End development.  We all have the capacity to turn any sort of credential into a tribal mark.  My own experience is that developers can function just fine on the front end without a formal computer science background, but that my own education has helped me in my day to day work, mostly in subtle and indirect ways.

I've been thinking for a while about what Computer Science topics are actually useful for front end developers.  It's not obvious to me where to draw the lines, because you'll never directly encounter many of the concepts that are covered in a typical Computer Science curriculum while making web applications. But I still have an intuition that my background in these subjects is helping me in my day to day.  This weekend I decided to ask Twitter about it.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Pondering what a blog series on “Computer Science for Front End Devs” would look like.  <br><br>Thinking this would be a high level of “what you missed if you don’t have a CS degree”, focusing on a subset relevant to FE devs.<br><br>Would love input.  What would you expect to be covered?</p>&mdash; Ben McCormick (@_benmccormick) <a href="https://twitter.com/_benmccormick/status/965373638697463809?ref_src=twsrc%5Etfw">February 18, 2018</a></blockquote>


I got a high degree of interest from that tweet, and so decided to keep digging into the idea.  I did some research into the typical structure of a modern Computer Science curriculum, and came up with the lists below. Depending on the school, certain topics may be elevated or diminished, grouped or split, but the general shape tends to look the same for most schools I've looked at.

### Intro class

Generally there is an intro class or 2 that can be skipped by students with previous experience that covers core programming concepts, usually with an Object-oriented philosophical tilt.

- **Programming basics**
    - Variables
    - Basic Data Structures
    - Control Structures/Recursion/Iteration
    - Object Oriented Programming principles

### Core Curriculum

There are also often 3-5 other "core" classes that all CS majors must take.  They generally break down something like this:

- **Data Structures and Algorithms**
    - Big O analysis
    - Common Data Structures - Linked Lists, Stacks, Queues Trees, Heaps, Graphs, etc
    - Common Algorithms - Searches, Sorts, Graph algorithms, etc
- **Computer Systems**
    - Start at the hardware level
    - Assembly
    - Compilers
    - Memory Models
    - Concurrency
    - Operating Systems
    - Processes
    - File Systems
    - Networking
- **Mathematical Foundations**
    - Proofs and logic
    - Formal lanugages/Context Free Grammars/Turing Machines
    - NP-Completeness
    - Probability Theory
    - Bayes Theorem
    - Hashing
- **Software Engineering (not always core)**
    - Architecture of larger programs
    - Balancing risk/quality/cost
    - Design Patterns
    - Designing for security/robustness/scalability

### Potential Specialties

Finally, programs usually have a selection of electives that students can take to dive deeper into different specialty areas.  These electives usually mirror the research interests of the faculty of the school but may include some of the following:

- **Systems Design**
- **Human-Computer Interaction**
- **Computer Networking**
- **Artificial Intelligence and Machine Learning**
- **Databases**
- **Computer Vision**


## Computer Science for the web

So how much of this is relevant to your average front end developer?  Some of it is more tightly tied to web programming than others.  Most of the basics will be picked up through osmosis for a typical front end dev, but a rigorous look at concepts like object-oriented programming and recursion might be beneficial.  While most can usually get by with simple data structures, a background in common "intermediate" data structures like stacks, trees, and graphs can be quite useful in day to day web dev.  Software Engineering principles are as obviously useful when building web sites as they are when you're building firmware or operating systems. On the other hand, Computer Systems and Mathematical foundation concepts are usually not directly applicable in front end work.  In my own experience, they serve as useful background for understanding the abstractions that my day to day work is built on.  It's good to have an intuition as to how browsers work, what is happening when we send data to a file, or what "text encoding" means.  And you may end up in a crazy situation where you need to understand the code behind Babel or V8, and knowledge of compilers becomes a real part of your job.


I'm trying to figure out the best way to teach some of this stuff to somebody who hasn't and is never going to spend 4 years taking these classes.  So I'd love help from anyone reading:

1. **If you have a CS degree and write front end code, how has it helped you?**
2. **If you were going to try and share part of that education with somebody with different experiences, which parts would you say are important?  What resources would you recommend?**
3. **If you don't have a CS degree, do you feel like you're missing out on anything?  What useful-seeming concepts have you heard about but found it hard to find resources on?**


If you have any answers for those questions I'd love to hear from y'all on [Twitter](https://twitter.com/_benmccormick) or [email](mailto:ben@benmccormick.org).
