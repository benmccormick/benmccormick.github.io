webpackJsonp([0xd75c85e798a5],{828:function(e,a){e.exports={data:{markdownRemark:{html:'<h3>JavaScript And The Web</h3>\n<p><a href="https://stackoverflow.blog/2018/01/11/brutal-lifecycle-javascript-frameworks/">The Brutal Lifecycle of JavaScript Frameworks | Stack Overflow Blog</a> - This was an interesting analysis on how JavaScript frameworks have risen and fallen.  Among the reasons that it’s interesting is that the data appears to be a bit of a Rorschach test.  The post itself is very negative about the pace of change in the JavaScript framework world.  But I saw a lot of twitter takes like this one:</p>\n<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">This “new framework every 6-months” FUD is comical. The crux is centered on 4 JS frameworks released over the last decade. <br><br>4. In 10 years. <br><br>It’s great for my business, but makes me chuckle. <br><br>It’s not really moving that fast y’all. <a href="https://t.co/BiH7UK0M9V">https://t.co/BiH7UK0M9V</a></p>&mdash; Joel ⛈ (@jhooks) <a href="https://twitter.com/jhooks/status/951924735654244352?ref_src=twsrc%5Etfw">January 12, 2018</a></blockquote>\n<p>Personally I lean more toward the side that there’s nothing wrong here.  The change in frameworks has come during a large change in use cases and technology used on the web.  Think PWAs verse server-side generated sites, and the large amount of new browser APIs and JavaScript language features.  These things have naturally brought new best practices which have been encoded in frameworks.  While it is true that a jQuery based site from 2009 might be difficult to maintain through today, that has less to do with the lack of support for the technology than it does with the fundamental nature of web development.  It would be much more difficult to build and scale a web application like <a href="https://slack.com/">Slack</a> using only jQuery and other 2009 technologies.<br>\nWhich is why it was surpassed for <em>web application</em> development first by a wave of frameworks that allowed you to model domain concepts in an object oriented way and tie that to a UI (Backbone, Angular1, Knockout), and then by a second wave that allowed you to do that with more declarative component-based UIs (React, Ember, Angular2+, Vue).  Those evolutions have come to match a real need.</p>\n<p><a href="https://stackoverflow.com/questions/48270127/can-a-1-a-2-a-3-ever-evaluate-to-true/48274520#48274520">Can (a ==1 &#x26;&#x26; a== 2 &#x26;&#x26; a==3) ever evaluate to true? | Stack Overflow</a> - This was a fun little question.  I don’t think I like it as an interview question for JavaScript, since it borders on trivia, and requires in-depth knowledge of the “bad parts” of JavaScript like <code>==</code> and <code>with</code> or global variable behavior that many new developers are just taught to avoid.  But it’s definitely a fun trivia question.  And it may even be a good interview question in Python, where you can do it using more commonly accepted parts of the language.</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">EqualToEverything</span><span class="token punctuation">:</span>\n  <span class="token keyword">def</span> <span class="token function">__eq__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">return</span> <span class="token boolean">True</span>\na <span class="token operator">=</span> EqualToEverything<span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">print</span><span class="token punctuation">(</span>a <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">and</span> a <span class="token operator">==</span> <span class="token number">2</span> <span class="token operator">and</span> a <span class="token operator">==</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">#prints True</span>\n</code></pre>\n      </div>\n<p><a href="https://hacks.mozilla.org/2018/01/making-webassembly-even-faster-firefoxs-new-streaming-and-tiering-compiler/">Making WebAssembly even faster: Firefox’s new streaming and tiering compiler | Lin Clark</a> - Web Assembly + Rust is quickly moving to the top of my “I’ve got to learn more about that” list.</p>\n<p><a href="https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1">Keep webpack Fast: A Field Guide for Better Build Performance | Slack Engineering</a> - This is a super helpful and detailed list of performance tips and tricks for Webpack builds, which unfortunately are easy to make slow and challenging to make fast for large projects.  Even after having my own fights with webpack last year, I learned a few things from this, and look forward to experimenting with them.</p>\n<h3>Tech and Business</h3>\n<p><a href="https://www.joelonsoftware.com/2018/01/12/birdcage-liners/">Birdcage Liners | Joel Spoelsky</a> - Joel’s first post in a while is a great piece on the problems with social media, as well as tech folks’ responsibility to think through the choices they’re making, including the secondary effects.  What type of future are we making?</p>\n<p><a href="https://motherboard.vice.com/en_us/article/9kng57/dogecoin-my-joke-cryptocurrency-hit-2-billion-jackson-palmer-opinion">My Joke Cryptocurrency Hit $2 Billion and Something Is Very Wrong</a> - I promise I snagged this link to post before bitcoin took a dip this week, but I don’t think it’s properly appreciated in many places just how crazy the cryptocurrency fad is becoming.  Meme-based joke currencies are being valued at billions of dollars, and there are many other similar newborn currencies with similar valuations out there.  I’m not going to try to give anyone investment advise, but it seems clear for now that at minimum these “currencies” are completely unusable for their theoretical purpose as currency given the price swings.</p>',frontmatter:{title:"Weekly Links: January 19th",keywords:"webpack webassembly stack overflow dogecoin",category:"opinion",date:"2018/01/19",path:"/2018/01/19/weekly-links-01-19-18/",layout:"weekly-links",hideFooter:null},fields:{slug:"/2018/01/19/weekly-links-01-19-18/"}}},pathContext:{slug:"/2018/01/19/weekly-links-01-19-18/",relatedPosts:[{path:"/2012/11/09/bayesian-witch-hunt",data:{title:"Bayesian Witch Hunt",path:"/2012/11/09/bayesian-witch-hunt",description:"A nerd tribute from a friend",date:"2012-11-09T12:00:00+00:00"}},{path:"/2012/12/29/i-hate-computing-ecosystems",data:{title:"I hate computing ecosystems",path:"/2012/12/29/i-hate-computing-ecosystems",description:"Why does nothing work together?",date:"2012-12-29T23:06:00+00:00"}},{path:"/2012/12/25/medium-the-end-of-history-and-the-last-website",data:{title:"Medium: The end of History and the last website",path:"/2012/12/25/medium-the-end-of-history-and-the-last-website",description:"Is there any use in personal websites anymore?",date:"2012-12-25T21:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2018-01-19-weekly-links-01-19-18-09cec07f7ed1901fac9e.js.map