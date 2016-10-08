---
title: "Understanding the Backbone Mindset: A review of Building  Backbone Plugins by Derick Bailey"
date: "2014-07-09 11:38:40+00:00"
layout: post
path: "/2014/07/09/understanding-the-backbone-mindset-a-review-of-building-backbone-plugins-by-derick-bailey"
---

As the saying goes, judging a book by its cover is a dangerous business.  A lot of books have titles that promise great things, and content that under-delivers and disappoints.  Every once in a while, though, you find a gem that does the opposite. [Building Backbone Plugins][bbp] sounds like a niche book for library developers.  But it actually is the best resource on [Backbone.JS][backbone] development I've found, a book that will benefit anyone who works with Backbone.

So what's the fuss about?  The book's author, Derick Bailey, is the creator of [Marionette.JS][marionette], a popular application framework for Backbone Apps.  *Building Backbone Plugins* explores the problems that Derick tried to solve with Marionette and then explains the mindset behind Marionette's solutions.  It is not a book exclusively about Marionette though.  The solutions in the book are example code that represents a simplified view of what Marionette does.  Instead the book looks at the common problems any developer will encounter in a Backbone project, and provides a possible solution, while working hard to generalize the lessons and concepts as much as possible.

Building Backbone Plugins is divided into 4 parts.  The first two look at Backbone Views and dealing with the DOM.  The third looks at Models and Collections.  The last part deals with application structure and events.  These are followed by a series of appendices that read as stretched-out blog posts on a variety of related topics that didn't quite fit into one of the 4 buckets that the rest of the book falls into.  

In my mind, the first two parts are the heart of the book.  They're a step-by-step look at how you can remove repetitive code from your Backbone Views and structure your application to expose the developers intent in each file, rather than burying the purpose in boilerplate. I learned a lot about how I could improve my Backbone code, and these two sections actually inspired me to start integrating Marionette into a project at work. The application structure advice in the fourth part is also particularly strong, with quality information about events, and ideas on how to scale a Backbone application beyond TodoMVC sizes.

On the other hand, the appendices feel a bit tacked on, and seem to be full of stuff the author wanted to add but couldn't figure out how to weave into the rest of the book.  Since it's legitimate content rather than simply greater detail on things that have been already covered, they don't act as real appendices and leave the book feeling a bit unfocused at the end. When you combine that with some weaker content in part 3 (where the author moves away from Marionette into some other smaller examples), the book can feel a bit choppy and directionless.  But the goldmine of knowledge and perspective in Parts 1, 2 and 4 more than make up for it.  

I would not recommend BBP as a "first book" on Backbone.  It assumes plenty of knowledge, and doesn't attempt to teach Backbone basics.  But for an intermediate level Backbone developer, or any Javascript developer who wants to grow their thinking about application structure, there is plenty of solid insight here. Meditations on handling nested views, cleaning up unused views, abstracting out repetitive boilerplate, and structuring genuinely large applications are all worth the price of the book.  Finally, if you're writing code using Marionette already, this book is a must-have.  Marionette's documentation does a great job of explaining the "what" and the "how" of Marionette.  But this book explains the all-important "why" of a framework that is based on encoding Backbone best practices into a library. It will help you think like an experienced Backbone developer.

### More Resources

- [Building Backbone Plugins][bbp] - You can purchase the book on leanpub. (Note: Affiliate Link)
- [Developing Backbone Applications](http://addyosmani.github.io/backbone-fundamentals/) - This book by Addy Osmani is a great resource for Backbone Beginners who want a more basic introduction to Backbone concepts.  It's available as a free HTMl site on github, but you also can <a href="http://www.amazon.com/gp/product/1449328253/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1449328253&linkCode=as2&tag=productjavasc-20&linkId=5RQTSOTPFIGKMLJK">purchase it as a paperback or ebook.</a><img src="http://ir-na.amazon-adsystem.com/e/ir?t=productjavasc-20&l=as2&o=1&a=1449328253" width="1" height="1" alt="" style="border:none !important; margin:0px !important;" />
- [Marionette.js][marionette] - This framework serves as the inspiration for Derick's book and is a great way to structure larger Backbone apps.

---
### Subscribe

I regularly write reviews of the technical books I read, as well as posting on a wide variety of other topics. If you enjoyed the post consider subscribing to the [feed](http://feedpress.me/benmccormick) or joining my [mailing list](http://eepurl.com/WFYon).  







[bbp]: https://leanpub.com/building-backbone-plugins?a=3a4Srv2pP9p87WQ_eoDoGp
[backbone]: http://backbonejs.org/
[marionette]:http://marionettejs.com/
