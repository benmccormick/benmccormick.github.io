webpackJsonp([0xd72a4ed67a06],{728:function(e,t){e.exports={data:{markdownRemark:{html:'<p>I have a favorite question to ask in interviews for web developers.</p>\n<blockquote>\n<p>“How does the internet work?  In other words, when I open a browser and enter a url then hit enter, and a website shows up on my screen what can you tell me about what is happening?”</p>\n</blockquote>\n<p>Usually I get one of a few responses:</p>\n<h4>1. The clueless shrug</h4>\n<blockquote>\n<p>Uh….  ¯\\_(ツ)_/¯  </p>\n</blockquote>\n<p>Some people have no idea what to do with the question.  Things get awkward. This is mostly for junior positions but still isn’t the best sign.  Sometimes a few prods will get things back on track.</p>\n<h4>2. The bare minimum</h4>\n<blockquote>\n<p>It is asking a server for the site and the server sends you the site.    </p>\n</blockquote>\n<p>Some people can give a very basic response, but don’t give a lot of details.  This again mostly corresponds to less experienced devs and can be fine as a starting spot with some follow-up questions.</p>\n<h4>3. The CliffNotes</h4>\n<blockquote>\n<p>Your browser sends an HTTP request which gets routed through a local modem/router and gets sent to a name server for its url extension.  That name server routes the request to the correct IP address, which will resolve to some sort of web server.  That server will serve up either some static files, or run some backend code in order to generate a resource (probably an html page).  When the HTML page is returned, your browser will parse it, which will likely generate more requests, and the cycle will repeat.  </p>\n</blockquote>\n<p>Some people know how some of this works, maybe with a few hazy areas and can explain it in a reasonably straightforward way.  An explanation like this is a great start.</p>\n<h4>4. The Geek-out</h4>\n<blockquote>\n<p><Some variation on the previous answer... followed by:> Let me tell you all about my in depth knowledge of &#x3C;HTTP<em>network routing</em>JavaScript parsing/TCP/other related topic>  </p>\n</blockquote>\n<p>Some people dive in and explode with information.  </p>\n<h3>So why is this a good interview question again?</h3>\n<p>So which answer is best?  The geek-out right?  Well… its great when somebody gets there, but in my mind this question is more about the journey than the destination.</p>\n<p>It’s pretty easy to make the case that this is a pretty bad interview question.  It’s not clear what the expected answer is.  When I ask it in junior dev interviews, they often don’t have much of a clue how to answer it.  And it’s not strictly answerable in full detail by pretty much anyone.  But I’d argue that those things actually end up being strengths.  I like this question for 5 reasons.</p>\n<ol>\n<li>\n<p><strong>It tests the candidate’s ability to deal with ambiguity.</strong>  The question is intentionally vague and open ended.  Am I just looking for a perfunctory response like “it gets a resource from a server”?  Do I want a deep dive into how DNS works?  It’s ambiguous.  Candidates can respond to that ambiguity in one of a few ways.  </p>\n<p>They can freeze because they’re afraid of saying the wrong thing.  </p>\n<p>They can ask a clarifying question.  </p>\n<p>They can make a guess at what I want and start going down that road, while reading my reaction to see if they’re still on track.  </p>\n<p>Or they can decide they know what I want (or what they want to tell me) and shoot off like a rocket (potentially for a very long time).</p>\n<p>This is super useful information in an interview because developers deal with ambiguity all the time.  When a candidate encounters unclear requirements from a product manager, or unclear documentation from another developer, it’s good to have an idea how they’ll respond<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>.</p>\n</li>\n<li>\n<p><strong>It tests the breadth of a candidates knowledge.</strong> - For the most part, when I interview people, I ask them questions about the role they’re applying for:  Front-End Dev, Backend Dev, QA Engineer, etc.  But this question gives a candidate the chance to show that they understand what’s happening up and down the web stack from the code they interact with the most.</p>\n</li>\n<li>\n<p><strong>It gives the candidate a chance to explain a complex technical topic.</strong> - In my mind, good communication ability is the most important skill for a developer once they’ve achieved a minimum level of technical competence.  Being able to talk about problems and solutions clearly and explain them to a variety of audiences matters, and it matters a lot.  Can the candidate summarize a complex technical topic without getting bogged down in details?  Are they communicating with me (verbally or otherwise) to make sure I’m following their explanation?  Or are they fading off into a rambling run-on explanation of a trivial detail without any big picture context?</p>\n</li>\n<li>\n<p><strong>It forces the candidate to confront something they don’t know.</strong> - The internet is a perfect example of the Isaac Newton quote about <a href="https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants">standing on the shoulders of giants</a>.  It is the culmination of 50+ years of research and work on networked computer systems.  No candidate I interview for a web development position is going to understand every detail of how it works, because you can always go a layer deeper in the stack or afield into crazier edge case behavior.  So at some point in questioning (possibly very early), this question exhausts every candidate’s knowledge.  The question is how do they react?  Some candidates start guessing at things.  Some admit they don’t know.  Some try to skirt around areas they don’t feel confident in and work at avoiding any questions where they would have to admit they don’t know something.  And some will actually ask me how part of the system works.  This again is helpful because “not knowing the answer” is such a common experience in real world web dev.  It’s great to have some clues to how a candidate handles that.</p>\n</li>\n<li>\n<p><strong>It gives the candidate an opportunity to show off what they know.</strong>  I’ve gotten some amazing answers to this question.  It turns out some candidates actually know a lot about networking and HTTP/TCP/nameservers.  Some can give detailed answers about browsers and how they parse resources and display the DOM.  Maybe they just know a lot of random trivia about URLs and DNS.  Regardless, this is a chance to show off and prove that they’ve delved deep into something.</p>\n</li>\n</ol>\n<p>To be clear, I don’t think every interview question should be like this one.  Most should probably directly relate to the work the candidate is doing, be clearly comparable in an objective way candidate to candidate, and not risk sending the interview down a 10 minute rabbit hole.  But this one is my favorite, and I think there’s a place for questions that show how a candidate might handle some real world lack of structure.</p>\n<hr>\n<p>Feel free to hit me up on Twitter at <a href="https://twitter.com/ben336">@ben336</a> to tell me your favorite interview question.  I’ll retweet them.</p>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>There is of course a limit to how much any interview is going to teach you about how somebody will behave in a future job situation.  We’re all chasing breadcrumbs here.  </p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',frontmatter:{title:"My Favorite Interview Question",keywords:"hiring interview internet",category:"software-productivity",date:"2017-07-24T11:45:00+00:00",path:"/2017/07/24/my-favorite-interview-question/",layout:"post",hideFooter:null},fields:{slug:"/2017/07/24/my-favorite-interview-question/"}}},pathContext:{slug:"/2017/07/24/my-favorite-interview-question/",relatedPosts:[{path:"/2017/07/19/ten-things-javascript/",data:{title:"Ten Things A Serious JavaScript Developer Should Learn",path:"/2017/07/19/ten-things-javascript/",description:"Some of the important things to pick up in the JS world",date:"2017-07-19T04:00:00+00:00"}},{path:"/2017/02/26/running-jest-tests-before-each-git-commit/",data:{title:"Running Jest Tests Before Each Git Commit",path:"/2017/02/26/running-jest-tests-before-each-git-commit/",description:"A simple setup to run your Jest tests before every commit",date:"2017-02-26T23:00:00+00:00"}},{path:"/2017/01/03/orthogonality-and-css-in-js/",data:{title:"Orthogonality and CSS in JS",path:"/2017/01/03/orthogonality-and-css-in-js/",description:"Separation of concerns in the context of CSS and JavaScript",date:"2017-01-03T00:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2017-07-24-my-favorite-interview-question-ed09d82f5bb06b50dad9.js.map