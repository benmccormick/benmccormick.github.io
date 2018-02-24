webpackJsonp([0x6714ecb314c9],{711:function(e,a){e.exports={data:{markdownRemark:{html:'<p>Sometimes the best thing to do is steal somebody else’s good idea. I’ve been using <a href="https://atom.io">Atom</a> as my primary text editor for a year and a half now, but I still occasionally play with other editors and keep up with their updates.  There are a crazy number of good cross platform editors these days, and they all have a bunch of good ideas that get shared and remixed across each other. This week Sublime Text came out with a new release <a href="https://www.sublimetext.com/3dev">Dev Build 3132</a> that included 3 new color schemes.  One of them was Mariana, which I believe is a variation on the also great <a href="http://labs.voronianski.com/oceanic-next-color-scheme/">Oceanic Next</a>, with possibly some influences from my previous favorite dark theme <a href="https://github.com/chriskempson/tomorrow-theme">Tommorrow Night Eighties</a> <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>.  It stood out to me right away.</p>\n<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The Mariana syntax theme that shipped in the new Sublime Text is really nice <a href="https://t.co/xbmjBTNoWY">pic.twitter.com/xbmjBTNoWY</a></p>&mdash; Ben McCormick (@ben336) <a href="https://twitter.com/ben336/status/868160533345841152">May 26, 2017</a></blockquote>\n<p>Since I’m no longer using Sublime Text, I decided to port the theme to Atom.  I built on the work of the great <a href="https://github.com/atom-material/atom-material-syntax">atom-material-syntax</a> package to build out a new theme.  It turns out to be surprisingly easy to build a color scheme in Atom.  Fork an existing theme, change some colors and the details in package.json, delete a bunch of git tags <sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup>, and then run <code>apm deploy minor</code>, and you’re in business.  </p>\n<p>You can now download <a href="https://atom.io/themes/mariana-syntax">mariana-syntax</a> in Atom.  This was a quick port.  I’ll be working to optimize it for the languages I use (JS, Python, CSS/Less, HTML and Markdown) over the next few weeks.  I would love to see pull requests for other languages or for anything that I’ve missed so far.  I look forward to this just getting better and better. <strong>Update:</strong> Version 0.2.0 has shipped with optimized syntax for JavaScript, Python, CSS, JSON and Markdown.</p>\n<p>\n  <a class="gatsby-resp-image-link" href="/static/mariana-screenshot-a13c07ac2f3fde691852ce1738103fe8-7267d.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 570px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 83.00970873786407%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAsSAAALEgHS3X78AAACaUlEQVQ4y41U2XLaQBDUz7jyECMjCaFzV/eJOIQDduxyVR7y/7/Q6V0ZChOo5GHYXbTT2zM9M0Yx/EC/f0O7OcDLerhBAjdMMef6uIhgBxlmixjfrUDvLT/FoxPqVZ2fXAGT5oTTN8MMCvhxgW1Zo9u/o9/9RNtukLZriHZARFvmHdy0gSNrWHEFm2ZFpTb76myoCzEvj1WDpNujO36gPbyhXI9ImwF+tULYrDRwwL0jCUwfR9Q3zVAfXdlCZAOSvIQsCkT5CqIky7qBqLeQzYgF75wZierMzL4AV3vj9Idf7yC6EaIik2w1WVJr8LDaTMwuHO/tNUP1ogIQ5RYZw5bNFiEZ+nENScCIj9lXYdp3ARV9HgJZoSx7DbxkePOY4ZGhJbgq4/f5hRDOvZAV4EIoxxoZ2WyrHcbuiIK5a59f0Y6vqDdHNFzz4Qi/GJjP5szwL1FOLyjAvBxQZx1yOqRJizhbI2boCUVJCuaYucz6Z3h82Iq/CnMywwoLhlFQ6QYRwey8x4wFa4Y5nlThqj0L1tQrz7R5kGMe3jYtyhRC9aVQ79XZv0yH7KYd/HyAx1W1n5f2GvQkwlmIK1Vvqqx+lgSq9gesDh/YvvzC/v03ulF1ywtSllE+HBBQjEvQu4WtOyUhQ7ZXUK0RMfGi2UG2o25FPTAokE7LVbncKRt2SdIgYz9L1prgKqiqAtRKMtypd/8vr4b16eDSYclpsiSTidHEytK5nOzM6jOnlyLanFg2m8FQM81cCsw40749eXiYuZx9HhwvwoPpwgkEZJoikglMzkd1zwpS7aPnoSc5NyVLrcOjm+IPullL7uWsrxoAAAAASUVORK5CYII=&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="screenshot of mariana-syntax" title="" src="/static/mariana-screenshot-a13c07ac2f3fde691852ce1738103fe8-d766e.png" srcset="/static/mariana-screenshot-a13c07ac2f3fde691852ce1738103fe8-a6b6e.png 143w,\n/static/mariana-screenshot-a13c07ac2f3fde691852ce1738103fe8-8e488.png 285w,\n/static/mariana-screenshot-a13c07ac2f3fde691852ce1738103fe8-d766e.png 570w,\n/static/mariana-screenshot-a13c07ac2f3fde691852ce1738103fe8-7267d.png 824w" sizes="(max-width: 570px) 100vw, 570px">\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>To be clear, I’m not sure how great of an influence this was.  The scheme definitely bears a strong resemblance to both of those color schemes, and the release notes credit both authors as inspiration for the 3 new syntax-themes without naming specific schemes.</p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n<li id="fn-2">\n<p>This Stack Overflow article was helpful <a href="https://stackoverflow.com/a/15755041/1424361">https://stackoverflow.com/a/15755041/1424361</a></p>\n<a href="#fnref-2" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',frontmatter:{title:"Mariana Syntax Theme For Atom",keywords:"atom sublime text color schemes",category:"tools",date:"2017-05-28T04:05:00+00:00",path:"/2017/05/28/mariana-syntax-atom/",layout:"post",hideFooter:null},fields:{slug:"/2017/05/28/mariana-syntax-atom/"}}},pathContext:{slug:"/2017/05/28/mariana-syntax-atom/",relatedPosts:[{path:"/2016/01/11/the-most-interesting-atom-packages-ive-found-so-far",data:{title:"The Most Interesting Atom Packages I've found (so far)",path:"/2016/01/11/the-most-interesting-atom-packages-ive-found-so-far",description:"A rundown of the coolest Atom packages I've seen",date:"2016-01-11T02:25:49+00:00"}},{path:"/2017/04/14/grading-applications-on-config-portability/",data:{title:"Grading Applications On Config Portability",path:"/2017/04/14/grading-applications-on-config-portability/",description:"Which applications allow syncing settings cross-device?",date:"2017-04-14T21:30:00+00:00"}},{path:"/2017/01/03/orthogonality-and-css-in-js/",data:{title:"Orthogonality and CSS in JS",path:"/2017/01/03/orthogonality-and-css-in-js/",description:"Separation of concerns in the context of CSS and JavaScript",date:"2017-01-03T00:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2017-05-28-mariana-syntax-atom-bacc7438fd492656fb2f.js.map