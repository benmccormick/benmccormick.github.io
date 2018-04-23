webpackJsonp([0x7e31863bb5d0],{707:function(e,t){e.exports={data:{markdownRemark:{html:'<p>My post on <a href="http://benmccormick.org/2016/03/07/the-sad-state-of-the-backbone-ecosystem/">the sad state of the Backbone ecosystem</a> from this weekend was surprisingly popular.  I got a lot of responses pointing out <a href="https://twitter.com/ben336/status/707063566940016645">some things I got wrong</a>, sharing my concerns, or pushing back on my main points.  Objections to the post came in 2 primary forms, which I want to quickly address.  The first concern is that the Backbone ecosystem doesn’t matter. The second concern is that the trend I’m identifying as decline and decay is actually stability.</p>\n<h3>Does Backbone’s ecosystem matter?</h3>\n<p>The first concern came in 2 main forms.  The first (and more polite) form was from commenters who shared their experience and said that they’d found Backbone’s core to be enough when combined with their own code.  The second group was a generalization of that, effectively saying that Backbone is a minimal framework, and <strong>real programmers</strong> can write their own code on top of that.  I’m sympathetic to the first framing, much less so to the second.</p>\n<p>One of the beauties of Backbone is that it can be used in a variety of ways.  Its small and simple enough that you can pull it in and use only part of it (maybe just the models or event system for instance), but it has been scaled to be used for large web applications like Trello, Rdio, Backbone, Bitbucket and others. Some of those use cases quite frankly, don’t need anything else most of the time.  If you’re writing a very simple single screen piece of interactive behavior with Backbone, you don’t need any special extra libraries for that.</p>\n<p>I personally work on a large scale web application (~200 Backbone Views) that has been developed for over 3 years and will continue to be developed (hopefully) for a long time. In that situation, having well documented, tested and supported third party libraries for common tasks like rich tables, form validation, UI component libraries, and integrations with other tools is tremendously useful.  As an experienced developer, I’m capable of writing all of these things myself, but doing so takes time, and the result is likely to be less stable, less well documented, and less well thought through than a popular open source solution.  To be clear, nobody is obligated to write these things for me.  I’m merely making a factual statement that the experience of writing a large web application in Backbone becomes more difficult as the community around the library shrinks.</p>\n<p>There’s a second reason why down playing the importance of an ecosystem is harmful though.  I’ve said that I am capable of writing the various components of an ecosystem myself.  But that’s only true of me because I have years of experience writing code, and specifically of working with different libraries that gave me ideas on how those problems should be tackled.  A community that says you should be able to do everything yourself without starting places and good examples is a community that is hostile to beginners.  Let’s not let the JavaScript community be that.</p>\n<h3>Is Backbone just stable?</h3>\n<p>The second disagreement (and the most common theme on <a href="https://news.ycombinator.com/item?id=11237283">Hacker News</a>) was that the current state of Backbone and its ecosystem is not sad at all.  Backbone is stable, and thats something to be celebrated.  In some cases this echoed what I actually said in the post.  I specifically called out the core Backbone library as a good example of stable software:</p>\n<blockquote>\n<p>I’m starting with Backbone itself to give an idea what a stable mature project graph looks like. Backbone isn’t getting the activity it used to, but there’s still a steady flow of bug fixes and documentation updates, and issues are being worked through.</p>\n</blockquote>\n<p>Backbone is stable, and in a vacuum that is something to be happy about.  Stability has not prevented it from having an active team of contributors who are continuing to refine it and make small improvements.  This is great, and on it’s own would make me incredibly pleased as a user.  The problem comes with the libraries around it.  Excepting Marionette, which appears to be getting ready to launch their long awaited version 3, activity in the ecosystem has stagnated in a different way than Backbone core.</p>\n<p>Unlike Backbone core, secondary libraries have important issues requested by several people being ignored.  I’ve chosen to avoid calling out specific projects because I don’t think anyone has a responsibility to fix other people’s open source problems and don’t want to add to open source guilt.  But it is not hard to find examples of this if you browse through popular Backbone packages on Github.</p>\n<p>Unlike Backbone core, secondary libraries sometimes have no clear active maintainer who can be counted on to put out a release in the case of an emergency change being needed.  This matters because Backbone and JavaScript libraries in general live on an unstable platform.  Browsers change all the time.  While they do their best to maintain backwards compatibility, browsers occasionally introduce bugs, and occasionally fix bugs that a library may have been relying on or working around. In addition to disaster scenarios like that, tools change and best practices change over time.  When documentation stagnates and doesn’t keep up with changes, libraries become less useful and approachable over time.  Most Backbone tutorials on the web, and the documentation for many libraries, assume that scripts will be loaded in directly and that variables will be referenced through namespacing.  In a world where module loaders are becoming a default tool for larger JavaScript applications, thats a gap that makes libraries hard to learn, or teaches out of date practices to less experienced developers.</p>\n<p>A healthy stable project ought to be able to check off 3 boxes.</p>\n<ol>\n<li>\n<p>It meets the goals of its authors</p>\n</li>\n<li>\n<p>Major bugs are fixed as they’re reported.</p>\n</li>\n<li>\n<p>It is maintained to the extent that as new issues come in, they are responded to and dealt with</p>\n</li>\n</ol>\n<p>That definition could mean that a library handles a single use cases, and there is rare activity because nobody ever encounters any problems.  But for larger projects, this likely means refinements to fix small issues, documentation changes, and an occasional big bugfix over time. Its these things that make the difference between stable software and abandonware.</p>\n<h3>What does it matter in the end?</h3>\n<p>I didn’t write my original post to say that Backbone is dead.  I wanted to highlight a way in which the experience of using it has declined over time.  It is specifically a way that makes using Backbone harder for me.  I’m grateful to the many people who have built Backbone and the ecosystem around it, and think it is still a very useful tool.  This ecosystem issue does make me unlikely to recommend Backbone for folks who are building web applications “at scale”.  I think Ember or possibly React are better choices for that.  For small one off projects, and for content focused sites that need as little JavaScript as possible while still providing a rich experience, Backbone is a great choice.  </p>',frontmatter:{title:"Stability vs Decline",keywords:null,category:"software-productivity",date:"2016-03-09T06:04:39+00:00",path:"/2016/03/09/stability-vs-decline",layout:"post",hideFooter:null},fields:{slug:"/2016/03/09/stability-vs-decline"}}},pathContext:{slug:"/2016/03/09/stability-vs-decline",relatedPosts:[{path:"/2016/03/07/the-sad-state-of-the-backbone-ecosystem",data:{title:"The Sad State of the Backbone Ecosystem",path:"/2016/03/07/the-sad-state-of-the-backbone-ecosystem",description:"A look at the current state of Backbone libraries",date:"2016-03-07T05:06:40+00:00"}},{path:"/2015/09/09/what-can-backbone-developers-learn-from-react",data:{title:"Lessons Backbone Developers Can Learn From React",path:"/2015/09/09/what-can-backbone-developers-learn-from-react",description:"A look at the lessons that Backbone developers can learn from React",date:"2015-09-09T11:19:43+00:00"}},{path:"/2015/01/26/backbone-radio",data:{title:"Building Modular Web Apps With Backbone.Radio",path:"/2015/01/26/backbone-radio",description:"An overview of using Backbone.Radio in Marionette apps",date:"2015-01-26T12:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2016-03-09-stability-vs-decline-d4ac73da199b2eb6ee37.js.map