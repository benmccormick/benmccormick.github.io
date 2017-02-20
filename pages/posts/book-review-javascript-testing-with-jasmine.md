---
title: "Book Review: Javascript Testing with Jasmine"
date: "2013-04-23 20:30:00+00:00"
layout: "post"
path: "/2013/04/23/book-review-javascript-testing-with-jasmine"
description: "A book review of JavaScript Testing with Jasmine by Evan Hahn"
keywords: "JavaScript Book Review JavaScript Testing with Jasmine"
category: "reviews"
---

I received a copy of Javascript Testing with Jasmine by Evan Hahn this week, and it seemed like perfect timing.  The developers on my team at work have been discussing using Jasmine to automate the testing of Javascript code in our product, and I may be spending a significant amount of time with it soon.  I was hoping to pick up on some tips and tricks, and maybe learn some things about testing.  It ended up being a quick read with some useful tidbits that left me wanting more.


### What is it?

Javascript Testing with Jasmine is a short little book about testing with Jasmine, a testing framework inspired by the Behavior Driven Development style.  The book is short (only 52 pages), which is appropriate for its limited scope. It's split into 7 chapters with each chapter comprised of a few pages of example and explanation:

1. What is Software testing?
2. Jasmine
3. Writing good tests
4. Matchers in depth
5. More Jasmine Features
6. Spies
7. Using Jasmine with other tools

### What's it like?

Unfortunately the book manages to simultaneously feel like its filling space in many spots, and like it missed opportunities to provide value in others. Chapters 4 and 5 for instance fail to say much that is not already in Jasmine's ["describe by showing"-style documentation.][jasminedocs] Chapter 1 seems to be searching for interesting things to say about testing, and failed to meaningfully explain the distinction between BDD and generic Test Driven Development.  The section on Jasmine and Coffeescript in Chapter 7 could be succinctly summarized as "Yes you can use Jasmine with Coffeescript".  At the same time, the book misses opportunities to talk about things like writing testable code, or refactoring existing code to be meaningfully tested with Jasmine. I would have loved to see more about automating testing and fitting it into the development process, or running tests from the command line with phantomJS.

That's not to say that there's nothing good here.  I found the explanation of spies to be very helpful, and the detailed documentation-like aspects would be more helpful to a Javascript beginner than Jasmine's __"show me the code"__ docs.  All in all the book serves as a great reference guide for the library.  I'm just not sure how much value it adds compared to a quick Google search.

### Summary

In the end this feels like the type of book that made sense before Google took over the Internet.  It provides all the basic how-tos and background information, but fails to provide any deep insight.  If you're starting a new Javascript BDD project and want a quick reference this may make sense as a quick reference guide, but for most people the information in here can be found just as easily with a little use of your favorite search engine and a trip to the Jasmine docs.

### Where can I buy it?

You can get it from Amazon here: <a href="http://www.amazon.com/gp/product/1449356370/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1449356370&linkCode=as2&tag=benmccormicko-20&linkId=JTR6CUZAHM7HLHOQ">JavaScript Testing with Jasmine (Affiliate Link)</a><img src="http://ir-na.amazon-adsystem.com/e/ir?t=benmccormicko-20&l=as2&o=1&a=1449356370" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />


---

### Further Reading

- [Jasmine Home Page][jasminedocs] - Learn more about Jasmine straight from the source
- [Medium Equals Message][cwebb] - another review of the book from Chris Webb



This review is part of the [O'Reilly Blogger Program][oreilly].  I am not compensated for this review, but did receive a free review copy of the book.  The opinions expressed here are my own.

[jasminedocs]:http://pivotal.github.io/jasmine//
[oreilly]: http://oreilly.com/bloggers/
[cwebb]: http://blog.mediumequalsmessage.com/book-review-javascript-testing-with-jasmine
