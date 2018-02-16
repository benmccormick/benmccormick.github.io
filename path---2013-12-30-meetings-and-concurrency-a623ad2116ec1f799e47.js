webpackJsonp([0xde84e840803c],{640:function(n,e){n.exports={data:{markdownRemark:{html:'<p>Working with a large number of people on any significant project eventually involves meetings.  You can delay it for a while, and you can try to replace them with all sorts of things, including email, IM, wikis, and guessing people’s intentions.  Doing so is, of course, completely worthwhile.  Eventually though, meetings are inevitable.</p>\n<p>There are several different flavors of meetings.  There are decision-making meetings, where a crowd of people gather together, either to argue, watch other people argue, or to carefully watch the hands of the clock make their way around its circumference. There are Powerpoint meetings, wherein an individual gathers his victims (sorry was that coworkers?) together and proceeds to read bullet points from a set of slides to them.  There is also the conference call meeting, which has led many people to a deeper appreciation for the mute button on their phone.  Rarest of all is the actual productive meeting, where information is exchanged, decisions are made, and life continues without irreparable harm.</p>\n<p>So is there any hope for productive meetings?  It’s important to realize that a meeting should be the last resort for most things.  Meetings are blocking synchronous activities.  Everyone gives up a set piece of time and that time is the same for everyone. The meeting length is limited by the attendee most willing to keep talking. Generally that time cannot be used for anything else by the people involved in the meeting.</p>\n<p>Programmers have several options for handling long running blocking operations while coding.  The first is the naive approach.  The following coffeescript is an example:</p>\n<div class="gatsby-highlight">\n      <pre class="language-coffeescript"><code>meetingDone <span class="token operator">=</span> <span class="token keyword">false</span>\n\n<span class="token comment"># are we done yet?</span>\n<span class="token keyword">until</span> meetingDone\n    <span class="token keyword">if</span> <span class="token function">person1Ready</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token function">person2Ready</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token function">person3Ready</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token function">longRunningMeeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n<span class="token comment">#Do whatever\'s next, plus anything that depends on the meeting</span>\n<span class="token function">followUpOnMeeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token function">backToWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>This is how things often work when it comes to meetings, but that code wouldn’t last long in a professional software environment.  Everything grinds to a halt until the meeting is done, which keeps the program from doing anything else or responding to user input.</p>\n<p>A second option while coding is the multi-threaded approach.  In coffeescript that looks something like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-coffeescript"><code><span class="token comment"># Do meeting tasks in a worker thread</span>\nmeeting <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Worker</span> <span class="token string">"meeting.js"</span>\n\n<span class="token comment"># When the meeting is done, act on a follow up message</span>\nmeeting<span class="token punctuation">.</span>addEventListener <span class="token string">"message"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span>\n    <span class="token function">followUpOnMeeting</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>data<span class="token punctuation">)</span>\n\nmeeting<span class="token punctuation">.</span>postMessage <span class="token string">"Start"</span>\n\n<span class="token comment"># get back to work right away</span>\n<span class="token function">backToWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>This is equivalent in the real world to limiting the people in a meeting.  Rather than allowing a meeting to block all our resources, we put only some of our resources into the meeting and then pass the results of the meeting on to the rest of the team once the meeting is complete.</p>\n<p>This is an important principle for meetings. Meetings should contain the minimum amount of people needed to accomplish their purpose.  When meetings grow beyond that size (due to laziness, politics, process or confusion) they begin to become exponentially less productive.</p>\n<p>Of course multi-threaded approaches can still suffer the same issues as single threaded programs if you try to do too much.  If the worker thread in the example above looks like the code below, we will not have gained much.</p>\n<div class="gatsby-highlight">\n      <pre class="language-coffeescript"><code><span class="token comment"># meeting.coffee</span>\nself<span class="token punctuation">.</span>addEventListener <span class="token string">"message"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span>\n    somebodyHasMadeADecision <span class="token operator">=</span> <span class="token keyword">false</span>\n\n    <span class="token comment"># are we done yet?</span>\n    <span class="token keyword">until</span> somebodyHasMadeADecision\n        <span class="token keyword">if</span>  <span class="token function">person1Indecisive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token function">person2Scared</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token function">person3Clueless</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token function">longRunningMeeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    self<span class="token punctuation">.</span>postMessage <span class="token string">"meeting is finally done"</span>\n</code></pre>\n      </div>\n<p>No matter who is involved it’s important for meetings to have a clear purpose.  Just like you wouldn’t put all of your program’s logic inside a single worker thread, the best meetings are simple, single purposed, and lightweight, based on clear, answerable questions.</p>\n<p>There’s a third approach that programmers can take to long running processes.  They can use asynchronous operations, as shown below using promise notation.</p>\n<div class="gatsby-highlight">\n      <pre class="language-coffeescript"><code><span class="token comment"># define an email response function</span>\nreadResponses <span class="token operator">=</span> <span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span>\n    respond <span class="token operator">=</span> <span class="token function">readEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">if</span> respond <span class="token keyword">then</span> <span class="token function">respondToEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n<span class="token function">sendEmail</span><span class="token punctuation">(</span><span class="token string">"importantTopic"</span><span class="token punctuation">)</span>\n    <span class="token comment"># responses and respond if necessary</span>\n    <span class="token punctuation">.</span><span class="token keyword">then</span><span class="token punctuation">(</span>readResponses<span class="token punctuation">)</span>\n    <span class="token comment"># read more responses and respond if necessary</span>\n    <span class="token punctuation">.</span><span class="token keyword">then</span><span class="token punctuation">(</span>readResponses<span class="token punctuation">)</span>\n    <span class="token comment"># follow up when the responses are done</span>\n    <span class="token punctuation">.</span>done followUpOnMeeting\n\n<span class="token comment"># After email we can go back to work right away</span>\n<span class="token function">backToWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>This async approach doesn’t delegate different resources for different problems, instead we change how we’re thinking about long running operations.  Rather than tying up resources to deal with them, we make them a separate operation that can be consumed and responded to when our program has available time. You can’t do that with meetings.</p>\n<p>By contrast, email, documentation, and other “information artifacts” can be consumed asynchronously, at different paces and different times by different people. They don’t block off any particular time that might need to be devoted to other things.  So Powerpoint meetings can become an email that contains a Powerpoint or wiki page, followed if necessary by clarifying questions which people can work through at their own pace. Decision meetings can become a back and forth discussion on a mailing list, that the interested parties can participate in as they have time and motivation.  It removes blocking issues completely by removing the requirement of all participants being on the same time schedule.</p>\n<p>So the takeaways from this coffee flavored reflection on meetings:  Async operations are your friends.  Don’t have meetings.  If you do, keep them short, small, and focused. Friends don’t let friends read their powerpoint slides line by line.</p>',frontmatter:{title:"Meetings And Concurrency",keywords:null,category:"opinion",date:"2013-12-30T11:00:00+00:00",path:"/2013/12/30/meetings-and-concurrency",layout:"post",hideFooter:null},fields:{slug:"/2013/12/30/meetings-and-concurrency"}}},pathContext:{slug:"/2013/12/30/meetings-and-concurrency",relatedPosts:[{path:"/2012/11/09/bayesian-witch-hunt",data:{title:"Bayesian Witch Hunt",path:"/2012/11/09/bayesian-witch-hunt",description:"A nerd tribute from a friend",date:"2012-11-09T12:00:00+00:00"}},{path:"/2012/12/29/i-hate-computing-ecosystems",data:{title:"I hate computing ecosystems",path:"/2012/12/29/i-hate-computing-ecosystems",description:"Why does nothing work together?",date:"2012-12-29T23:06:00+00:00"}},{path:"/2012/12/25/medium-the-end-of-history-and-the-last-website",data:{title:"Medium: The end of History and the last website",path:"/2012/12/25/medium-the-end-of-history-and-the-last-website",description:"Is there any use in personal websites anymore?",date:"2012-12-25T21:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2013-12-30-meetings-and-concurrency-a623ad2116ec1f799e47.js.map