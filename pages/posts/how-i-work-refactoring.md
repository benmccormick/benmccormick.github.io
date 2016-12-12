---
title: "How I Work:  Refactoring"
date: "2013-02-03 21:00:00+00:00"
layout: "post"
path: "/2013/02/03/how-i-work-refactoring"
category: "software-productivity"
pageViews: "498"
last30pageViews: "1"
---

I recently took the time to re-examine a section of code that I've worked on as part of a team for the last year.  Looking at it with fresh eyes I saw plenty of room for improvement.  The issues weren't the result of one bad checkin or poor decision.  Instead they were the result of "death by a thousand cuts", a series of small decisions made by different people that were individually justifiable but eventually resulted in brittle, hard to maintain code.

Over the last few days I've been taking some time to refactor the code.  Doing so made me think about what questions I should be asking while refactoring code.  Here are a few of the things I look for when I'm working to clean up code:

#### Does each function do only one thing?

This has been the hardest bad habit for me to break.  I have a natural inclination when adding new functionality to try to toss it into a related function.  This seems great as first, but its how you go from a function that "removes special characters from a string", to one that "removes extra characters from a string", to one that "processes strings", and finally to "the string function" that takes a string and returns a new output determined by a glob of unreadable code that nobody understands and everyone is scared to touch.

Functions that perform only one purpose are easier to understand, easier to use, easier to test, and easier to port to new environments.  When functions start to perform multiple purposes it becomes harder to maintain [DRY][dry] principles.  If one function performs actions A&B, another performs B&C, and a 3rd one performs A&C, you have to duplicate each action twice, adding code bloat and opening up the risk of inconsistent changes across methods.

#### Does each object/concept have a consistent naming convention throughout the system?

One source of frustration I've had when debugging the code for my project has been the fact that different developers have started different naming conventions for objects within the code.  This results in a single object being called chartObj within function, chart within another, params in another place, and chartData in another instance.  Sometimes these different references even pop up within the same function.  This inconsistency makes it much harder for an unfamiliar developer to understand how the system functions.  This again can lead to duplicating information, if a developer modifying a function or class doesn't realize they already have the information they need.

#### What assumptions have I made?

One thing that can easily add confusion within a system is making undocumented assumptions.  One common assumption thats made for javascript code is that it will always run in a browser, or have access to a specific library such as jQuery.  While some of these assumptions are necessary, its worthwhile documenting them in some way, either in the comments or through code checks that through exceptions if the assumptions are violated.

This is important because requirements change.  The particular code that I'm working with was originally intended to run only in the browser, without any thought of server-side use.  When a requirement made it necessary to run it with PhantomJS, plenty of changes were needed.  This isn't necessarily problematic, because this particular change was not likely when the original code was made, and the adaptation was not hard.  More problematic was the fact that developers not directly involved with the phantomJS work still were acting under the assumption that the code would run within a browser environment.


These three questions are obviously not the only things that can be wrong in code, but in my experience they're especially treacherous because they can come in slowly and then make every future change harder.

---

### Further Reading

- [Coding Horror: Curly's Law][curly] a readable explanation of DRY principles
- [Refactoring.com][refactoringcom]- A nice collection of resources on refactoring by Martin Fowler, who also has written a well regarded <a href="http://www.amazon.com/gp/product/0201485672/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0201485672&linkCode=as2&tag=productjavasc-20">book</a><img src="http://ir-na.amazon-adsystem.com/e/ir?t=productjavasc-20&l=as2&o=1&a=0201485672" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
 on refactoring.


[dry]: http://en.wikipedia.org/wiki/Don't_repeat_yourself
[curly]: http://www.codinghorror.com/blog/2007/03/curlys-law-do-one-thing.html
[refactoringcom]: http://refactoring.com/
[refactoringbook]: http://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0201485672/ref=sr_1_1?ie=UTF8&qid=1359930251&sr=8-1&keywords=martin+fowler+refactoring
