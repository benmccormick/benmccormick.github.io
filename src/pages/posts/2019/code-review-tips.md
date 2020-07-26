---
title: "6 Keys To Valuable Code Reviews"
date: "2019/01/14"
layout: "post"
path: "/2019/01/14/value-from-code-reviews"
description: "Getting the most out of your code review process"
keywords: "code reviews"
category: "soft-skills"
topics: ["architecture", "code-reviews"]
key: "valuable-code-reviews"
readNext: "philosophy-of-software-design-book,fe-concerns,feedback-loops"
---

I've read 2 things lately that really reminded me of the value of code reviews.  One was [A Philosophy Of Software Design](https://amzn.to/2Elk5g8) by John Ousterhout, which I reviewed [here](https://benmccormick.org/2018/12/31/book-review-philosophy-of-software-design/).  Philosophy of Software Design is a practical guide to software design, and Ousterhout emphasizes code reviews as the best point for "practicing architecture" in real world projects.  The 2nd was Sophie Alpert's recent blog post [Why Review Code](https://sophiebits.com/2018/12/25/why-review-code.html), where she lists the various advantages she's seen from having code reviews.  I can't improve on her list, but I can endorse it.  I've seen all of the things she listed as benefits from code reviews in the past.  However I've seen these benefits come out in some environments more than others.  So I wanted to share 6 practical tips to getting the most valuable possible out of your team's code reviews.

#### 1. Make sure that code reviews are multi-directional

When you start doing code reviews, it can be tempting to only have senior developers review code.  After all, they're the ones who know the system best. But not only do you risk burning out your senior staff that way, you also miss out on some of the biggest benefits of code reviews.  You get different benefits with different team combinations.  I'm using Junior and Senior here relatively speaking, the roles may change over time or in different areas of the codebase.

- **Senior Reviewing Junior** - This is the first thing most folks think about.  This is an opportunity for a more experienced developer to catch bugs in a less experienced developer's code and also give suggestions for improving architecture-level structure, introducing new ways of doing things, or catching when there are opportunities for code consolidation that the original author might not have known about.
- **Junior Reviewing Senior** - When a less experienced developer reviews the code of a more experienced developer, its an opportunity for them to see new ways of doing things, and also get "cheap" exposure to new areas of a codebase.  It's also a great opportunity for them to ask questions about things they don't understand.  But it shouldn't be a one way street.  Often times a fresh pair of eyes are great at catching bugs, and if a code review is particularly confusing to a less experienced dev, it's a sign that the code may need to be rewritten or better documented so that it can be maintained in the future.
- **Peer Reviewing Peer** - When 2 developers have roughly equal skill and experience with the codebase, code reviews are still an opportunity for a second pair of eyes, but they also have the benefits of building team collective knowledge about the codebase and exposing times when there are differences in approach across the team.  Conversations at this level are a great place to standardize on best practices and team conventions.

#### 2. Hold reviewers responsible for the code they review

If a bug makes it past initial development efforts and is caught by QA or ends up in production, who is responsible for it?  Although there will ideally always be layers of accountability here, most developers I know naturally tend to hold themselves responsible when code they wrote breaks something, but also apply the same standard to others.  This can lead to rubber-stamp code reviews when things get busy, since there's no "skin in the game".  The benefits of code review tend to come out though, when developers take that same responsibility for the code they review.  A team culture that sees the reviewer and the developer as equally responsible for maintainable code, bug-smashing, and other architecture concerns will lead to better code reviews.  This means treating code review as a core job responsibilities for devs and rewarding those who do it well, rather than just tacking it on.

#### 3. Match technology to your process

The teams I've worked on that didn't have real code review processes also didn't have an easy setup to make it work.  They were reviewing diffs manually in their editors or over email.  Tools like Github, Bitbucket and Gitlab have made this much easier.  If you want this to be part of your process, make it as easy as possible.

#### 4. Use checklists where appropriate

In moderation, I've found checklists a useful tool for code reviews.  If your team has specific areas of focus that you want to improve compliance on, it can be helpful to give reviewers a list of items to sign off on.  For instance:

- Verify change supports internationalization
- Verify change doesn't add any new code with legacy framework
- If change is user-facing, verify it includes documentation updates

You can take this too far, the review process shouldn't be reduced to repetitive box-ticking.  But these can be great as guides for implementing new initiatives or addressing problem areas in code.


#### 5. Make code reviews as atomic as possible

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">10 lines of code = 10 issues.<br><br>500 lines of code = &quot;looks fine.&quot;<br><br>Code reviews.</p>&mdash; I Am Devloper (@iamdevloper) <a href="https://twitter.com/iamdevloper/status/397664295875805184?ref_src=twsrc%5Etfw">November 5, 2013</a></blockquote>

Huge code reviews are overwhelming, and much easier to rubber stamp.  When you develop a culture of creating small focused issues and reviewing each of them, it leads to more interaction and better results. Single issue (atomic) code reviews are best.  As a rule of thumb, if you can describe the change without using the words "and", "rewrite", or "a couple of different", you're probably doing alright.


#### 6. Leave space to make changes

Finally, code reviews will have the most value if as a team you're committed to acting on the feedback received.  That means being supportive when a code review leads to a re-write or refactor.  Sometimes that will need to be delayed of course, but in a healthy process there should usually be time to act on feedback.  This is of course easier if you've followed the previous suggestion and kept your code reviews small.

