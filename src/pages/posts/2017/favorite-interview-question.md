---
title: "My Favorite Interview Question"
date: "2017-07-24T11:45:00+00:00"
layout: "post"
path: "/2017/07/24/my-favorite-interview-question/"
description: "How does the Internet work anyway?"
keywords: "hiring interview internet"
category: "soft-skills"
key: "favorite-interview"
topics: ['management', 'leadership']
readNext: "ten-things-js,jest-git,orthogonality-css-js"
---

I have a favorite question to ask in interviews for web developers.

> “How does the internet work?  In other words, when I open a browser and enter a url then hit enter, and a website shows up on my screen what can you tell me about what is happening?”

Usually I get one of a few responses:

#### 1. The clueless shrug

> Uh….  ¯\\\_(ツ)\_/¯

Some people have no idea what to do with the question.  Things get awkward. This is mostly for junior positions but still isn't the best sign.  Sometimes a few prods will get things back on track.

#### 2. The bare minimum

> It is asking a server for the site and the server sends you the site.

Some people can give a very basic response, but don't give a lot of details.  This again mostly corresponds to less experienced devs and can be fine as a starting spot with some follow-up questions.

#### 3. The CliffNotes

> Your browser sends an HTTP request which gets routed through a local modem/router and gets sent to a name server for its url extension.  That name server routes the request to the correct IP address, which will resolve to some sort of web server.  That server will serve up either some static files, or run some backend code in order to generate a resource (probably an html page).  When the HTML page is returned, your browser will parse it, which will likely generate more requests, and the cycle will repeat.

Some people know how some of this works, maybe with a few hazy areas and can explain it in a reasonably straightforward way.  An explanation like this is a great start.

#### 4. The Geek-out


> <Some variation on the previous answer... followed by:> Let me tell you all about my in depth knowledge of <HTTP_network routing_JavaScript parsing/TCP/other related topic>

Some people dive in and explode with information.

### So why is this a good interview question again?

So which answer is best?  The geek-out right?  Well... its great when somebody gets there, but in my mind this question is more about the journey than the destination.

It's pretty easy to make the case that this is a pretty bad interview question.  It's not clear what the expected answer is.  When I ask it in junior dev interviews, they often don't have much of a clue how to answer it.  And it's not strictly answerable in full detail by pretty much anyone.  But I'd argue that those things actually end up being strengths.  I like this question for 5 reasons.

1. **It tests the candidate's ability to deal with ambiguity.**  The question is intentionally vague and open ended.  Am I just looking for a perfunctory response like "it gets a resource from a server"?  Do I want a deep dive into how DNS works?  It's ambiguous.  Candidates can respond to that ambiguity in one of a few ways.

    They can freeze because they're afraid of saying the wrong thing.

    They can ask a clarifying question.

    They can make a guess at what I want and start going down that road, while reading my reaction to see if they're still on track.

    Or they can decide they know what I want (or what they want to tell me) and shoot off like a rocket (potentially for a very long time).

    This is super useful information in an interview because developers deal with ambiguity all the time.  When a candidate encounters unclear requirements from a product manager, or unclear documentation from another developer, it's good to have an idea how they'll respond[^1].

2. **It tests the breadth of a candidates knowledge.** - For the most part, when I interview people, I ask them questions about the role they're applying for:  Front-End Dev, Backend Dev, QA Engineer, etc.  But this question gives a candidate the chance to show that they understand what's happening up and down the web stack from the code they interact with the most.

3. **It gives the candidate a chance to explain a complex technical topic.** - In my mind, good communication ability is the most important skill for a developer once they've achieved a minimum level of technical competence.  Being able to talk about problems and solutions clearly and explain them to a variety of audiences matters, and it matters a lot.  Can the candidate summarize a complex technical topic without getting bogged down in details?  Are they communicating with me (verbally or otherwise) to make sure I'm following their explanation?  Or are they fading off into a rambling run-on explanation of a trivial detail without any big picture context?

4. **It forces the candidate to confront something they don’t know.** - The internet is a perfect example of the Isaac Newton quote about [standing on the shoulders of giants](https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants).  It is the culmination of 50+ years of research and work on networked computer systems.  No candidate I interview for a web development position is going to understand every detail of how it works, because you can always go a layer deeper in the stack or afield into crazier edge case behavior.  So at some point in questioning (possibly very early), this question exhausts every candidate's knowledge.  The question is how do they react?  Some candidates start guessing at things.  Some admit they don't know.  Some try to skirt around areas they don't feel confident in and work at avoiding any questions where they would have to admit they don't know something.  And some will actually ask me how part of the system works.  This again is helpful because "not knowing the answer" is such a common experience in real world web dev.  It's great to have some clues to how a candidate handles that.

5. **It gives the candidate an opportunity to show off what they know.**  I've gotten some amazing answers to this question.  It turns out some candidates actually know a lot about networking and HTTP/TCP/nameservers.  Some can give detailed answers about browsers and how they parse resources and display the DOM.  Maybe they just know a lot of random trivia about URLs and DNS.  Regardless, this is a chance to show off and prove that they've delved deep into something.

To be clear, I don't think every interview question should be like this one.  Most should probably directly relate to the work the candidate is doing, be clearly comparable in an objective way candidate to candidate, and not risk sending the interview down a 10 minute rabbit hole.  But this one is my favorite, and I think there's a place for questions that show how a candidate might handle some real world lack of structure.

---

Feel free to hit me up on Twitter at [@_benmccormick](https://twitter.com/_benmccormick) to tell me your favorite interview question.  I'll retweet them.


[^1]: There is of course a limit to how much any interview is going to teach you about how somebody will behave in a future job situation.  We're all chasing breadcrumbs here.
