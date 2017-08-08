---
title: "How I Use Stack Overflow"
date: "2013-06-11T21:19:00+00:00"
layout: "post"
path: "/2013/06/11/how-i-use-stack-overflow"
category: "tools"
description: "Getting the most out of Stack Overflow"
pageViews: "235"
last30pageViews: "0"
---

>The problem with self directed learning is that our ability to learn is often constrained by the very problem we are trying to solve, our limited knowledge of a field.

One of the first things I learned as I began to work in the software industry was that self driven learning is necessary for staying relevant.  Especially when working on evolving platforms like the web and mobile, things change fast.  The web frameworks of 2005 have little direct relevance to web development in 2013, and mobile development in its current form was a category that didn't even exist in 2005.  If you want to be at the top of your field, or even anywhere close, learning and growing independently of whatever your current task happens to be is incredibly important.  But it can be hard to put into practice.

The problem with self directed learning is that our ability to learn is often constrained by the very problem we are trying to solve, our limited knowledge of a field. Some of these problems resolve themselves quite easily.  A beginning Javascript programmer may not know that he needs to include a script in order to use the jQuery syntax he's seen online, but he'll discover it very quickly when his script fails to run.  But it's quite possible to go on programming for years without realizing that it's bad practice to couple your view and model too tightly, or even without gaining a deep understanding of how a web application model actually works. We create our models of how programming works, and it's easy to stay inside those closed doors.  It can be easy to try and fit new languages into existing understandings, which is why you find people writing Java that looks like C and Javascript that looks like Java.  We don't grow because we don't ask the right questions.

#### Enter Stack Overflow

> The killer feature when asking questions is that developers often won't answer within the scope of what you asked; they'll help you ask the right questions instead

If the problem is that we don't ask the right questions, a Q&A site may seem like a dubious solution.  But [Stack Overflow][so] has been the best tool I've ever found for self-directed learning. It's a crazy hybrid between a wiki, Q&A site, forum, and video game originally conceived by [Jeff Atwood][ja] and [Joel Spolsky][js] back in 2008.  With ambitions to become a comprehensive programming archive for the web, the site has become a critical resource for programmers. In fact it's the [92nd most visited website in the world][alexa] as of June 2013.

So how does StackOverflow enable self directed learning?  The most obvious way is allowing open-ended questions to be asked, with answers crowd-sourced from a global community of developers.  The killer feature when asking questions is that developers often won't answer within the scope of what you asked; they'll help you ask the right questions instead.  If you ask how to change the backgrounds of a group of DOM items given a list of ids, you're likely to get an answer (or 5) while also helpfully being informed of the existence of classes.  Because multiple answers are allowed you may be exposed to multiple approaches. There is plenty to be learned this way.  Stack Overflow also helps automate this process by suggesting related questions as you type your questions, based on keywords.  The AI behind this is quite good, and usually causes me to abandon my question writing as I realize that my question has already been asked and answered.

#### Learning

> Questions asked by other people that you can't answer are the best part of Stack Overflow

Stack Overflow really began making a difference in my work and learning though when I moved past asking questions and also began contributing.  At the end of 2012 I started making a serious effort to begin answering questions, both as a way to contribute back to the community, and as a way of learning about my primary language at work, Javascript.  I was, and am, by no means a Javascript expert.  But I have learned a lot through the following process:

1. *Browsing regularly through new questions under the Javascript and Coffeescript tags.*

2. *Picking out interesting  questions that haven't been answered satisfactorily yet.  If there are good answers that I can't add to substantially, I upvote them.  If there are harmfully misleading or unhelpful answers I may downvote them with a comment.*

3. *If I know the answer to the question, I answer it, with an attempt to cite some sources for further information.  This happens sometimes, but much more often I don't know the answer off the top of my head.  This is where learning takes place.*

4. *If I don't know the answer I'll try to research it.  This may involve some combination of:*
    1. *Making a test with jsFiddle and learning about the behavior hands on.*
    2. *Looking up the relevant spec on MDN, Github, or library documentation*
    3. *Looking at related Stack Overflow questions to see if there are relevant resources or information there.*

    *Once I have an answer I'll return to the original question.  Sometimes (usually in fact) somebody else will have beaten me to a response. If that happens, I evaluate whether I can add value.  If I can, I answer. If not I upvote the best answer and move on.*

This is where Stack Overflow really begins to show benefits.  When I do the research to answer a question I usually learn many things along with whatever the specific question was. Questions asked by other people that you can't answer are the best part of Stack Overflow.  They are opportunities to not just expand your field of knowledge, but also to think about problems and solutions that you had never even contemplated.  So go, find a question that you don't understand, and see what it takes to answer it.  You may just learn something.


[so]:http://stackoverflow.com/
[ja]: http://www.codinghorror.com/blog/
[js]: http://www.joelonsoftware.com/
[alexa]: http://www.alexa.com/siteinfo/stackoverflow.com
