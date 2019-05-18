---
title: "Book Review: A Philosophy of Software Design"
date: "2018/12/31"
layout: "review"
path: "/2018/12/31/book-review-philosophy-of-software-design/"
description: "A solid intermediate book on the art of writing software"
keywords: "software engineering "
category: "reviews"
topics: ['Architecture', 'Book Review']
key: "philosophy-of-software-design-book"
amazonlink: https://amzn.to/2RgZhxd
image: https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1732102201&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=benmccormicko-20&language=en_US
readNext: "clean-architecture-book,react-confessions,large-improvements-small-team"
---

A lot of the software books out there these days are marching towards their expiration dates the day they're written.  When I see titles like "Angular 2 Development", "Learning JavaScript with React", "Writing Native Apps with Ionic 2 and Lodash 4" I know that the book will soon have out of date code examples and will not contain the latest ways a community is using the libraries they're discussing.  There is value in these types of books and they often represent a monumental amount of thought and time from their authors, but 5 years from now they will no longer be relevant.  I love reading books that I know will last.

[A Philosophy Of Software Design](https://amzn.to/2Rpu6zX) by [John Ousterhout](https://en.wikipedia.org/wiki/John_Ousterhout) is a book that will last.  It's full of timeless software writing advice that isn't tied to a particular language, library or point of time.  Although not formally organized this way, it seems to be divided into ~4 parts: 2 chapters on the idea of complexity, a concept which Ousterhout uses as the unifying theme of the book, 8 chapters on what I'd describe as the structural design of software systems, 7 chapters on more "code level concerns" like naming conventions, comments and making code obvious, and then a final 2 chapters that feel a bit more like appendixes which discuss some common software trends and designing for performance.

The best part of the book is those first few chapters where Ousterhout eloquently describes the problems that complexity can cause in a software project and lays out the distinction between a tactical and strategic approach to coding.  This is the heart of the titular **philosophy** of Software Design: the idea that software engineering is ultimately a fight against complexity.  It's a strong vision clearly articulated.

The "structural" sections of the book are all sound in an opinionated way.  The book makes an argument for larger implementations hidden behind smaller abstractions, which Ousterhout calls "deep modules", and much of the structural section is through that lens.  This isn't as open-minded as architecture advice I've seen elsewhere, but the benefit is that it's prescriptiveness makes it much easier to use as a guide or code review tool than more situational or caveated advice.  That practical aspect is clearly a goal of the book, and the approach therefore makes sense.

After chapter 11, the book takes a sudden detour from higher level concepts into much more concrete realms.  There is an extensive treatment of commenting style, naming conventions and other ways to make code readable and obvious.  There is a coherent through-line of building maintainable systems throughout, but the transition felt strange.  The content is still good though.

The book ends on a chapter addressing modern software trends through the lens of the concepts considered in the book, which felt like a good place to wrap up, and then a chapter on designing for performance.  Given the books focus on complexity and the size of the performance topic, this chapter is content to argue that simple designs are friendly to performance, without trying to unpack many performance related topics.  It felt a bit tacked on to me, but it makes sense as a piece of objection handling for those who feel that they can't simplify their architecture for performance reasons.

*A Philosophy of Software Design* is going to be my new go to recommendation for developers who are able to write code that runs but want to start thinking about how to write better code.  It doesn't have the depth of something like [Clean Architecture](https://benmccormick.org/2018/02/14/book-review-clean-architecture/), but it is extremely readable and approachable, and I've never seen an architecture-level book that was so focused on actionable advice.  If you take the advice in the first chapter and consult the book during code reviews, every chapter in the book has something to consider when looking at a piece of non-trivial code.  That makes it a perfect introduction to higher-level software design thinking.  If you think that would be a fit for you, [go ahead and check it out](https://amzn.to/2Rpu6zX).
