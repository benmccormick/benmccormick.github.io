---
title: "ES5, ES6, ES2016, ES.Next: What's going on with JavaScript versioning?"
date: "2015-09-14 03:11:34+00:00"
layout: "post"
path: "/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning"
description: "A summary of the naming conventions for the JavaScript language"
keywords: "JavaScript, ECMAScript, ES6, ES7, ES5"
category: "javascript"
pageViews: "94732"
last30pageViews: "7409"
---

JavaScript has a strange naming history. For its initial release in 1995 as part of Netscape Navigator, Netscape labeled their new language LiveScript, before renaming it to JavaScript a year later, hoping to capitalize on Java's popularity at the time ([JavaScript has no actual relationship to Java][javacomic]). In 1996 Netscape submitted JavaScript to [ECMA International][ecma] for standardization.  This eventually resulted in a new language standard, labeled ECMAScript.  All major JavaScript implementations since have actually been implementations of the ECMAScript standard, but the term JavaScript has stuck for historical and marketing reasons <sup id="fnref:1">[1](#fn:1)</sup>.  In the real world ECMAScript is usually used to refer to the standard while JavaScript is used when talking about the language in practice.

This has mostly been trivia for JavaScript developers, because ECMAScript didn't change much for the first 15 years of its existence, and real world implementations often differed significantly from the standard.  After the initial version of ECMAScript, work on the language continued and two more versions were quickly published.  But after ECMASCript 3 came out in 1999, there were no changes made to the official standard for a decade.  Instead various browser vendors made their own custom extensions to the language, and web developers were left to try and support multiple APIs.  Even after ECMAScript 5 was published in 2009, it took several years for wide browser support of the new spec, and most developers continued to write code in ECMAScript 3 style, without necessarily being aware of the standard.  

Around 2012 things started to change.  There was more of a push to stop supporting old Internet Explorer versions, and writing code in ECMAScript 5 (ES5) style became much more feasible.  At the same time work was underway on a new ECMAScript standard, at which point it became much more common to start referring to JavaScript implementations in terms of their support for different ECMAScript standards.  The new standard was originally named ES.Harmony, before eventually being referred to as ECMAScript 6th Edition (ES6). In 2015 TC39, the committee responsible for drafting the ECMAScript specifications, made the decision to move to a yearly model for defining new standards, where new features would be added as they were approved, rather than drafting complete planned out specs that would only be finalized when all features were ready.  As a result ECMAScript 6th edition was renamed ECMAScript 2015 (ES2015) before it was published in June.

Currently there are several proposals for new features or syntax to be added to JavaScript.  These include [decorators][decorators], [async-await][async], and [static class properties][classprops].  These are often refered to as ES7, ES2016, or ES.Next features, but should realistically be called proposals or possibilities, since the ECMAScript 2016 specification hasn't been written yet, and might include all or none of those features.  TC39 divides proposals into 4 stages.  You can see the current state of various proposals on [Babel's website][babelstages].

So where does that leave us in terms of terminology?  The following list might be helpful:

- **ECMAScript**: A language standardized by ECMA International and overseen by the TC39 committee.  This term is usually used to refer to the standard itself.
- **JavaScript**: The commonly used name for implementations of the ECMAScript standard.  This term isn't tied to a particular version of the ECMAScript standard, and may be used to refer to implementations that implement all or part of any particular ECMASCript edition.
- **ECMAScript 5 (ES5)**: The 5th edition of ECMAScript, standardized in 2009.  This standard has been implemented fairly completely in all modern browsers
- **ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)**: The 6th edition of ECMAScript, standardized in 2015.  This standard has been partially implemented in most modern browsers.  To see the state of implementation by different browsers and tools, check out [these compatibility tables][es6compat].
- **ECMAScript 2016**: The expected 7th edition of ECMAScript. This is scheduled to be released next summer.  The details of what the spec will contain have not been finalized yet
- **ECMAScript Proposals**: Proposed features or syntax that are being considered for future versions of the ECMAScript standard.  These move through a process of five stages: Strawman, Proposal, Draft, Candidate and Finished.

Going forward in this blog, I'll be referring to the recent ECMAScript version as ES6 (since that is how it is best known by most developers), next years spec as ES2016 (since that will be what it is called the whole way through its standardization process, unlike ES6/ES2015) and future language ideas that are not yet part of a draft or finalized spec as ECMAScript proposals or JavaScript proposals.  I'll do my best to point back to this post in any cases that might be confusing.  


### More Resources

- TC39 has a [github repo][proposalstc39] tracking all of their current open proposals.
- If you aren't familiar with ES6 yet, Babel has a [great rundown of its features][babeles6]
- If you want to go deeper with ES6 I've heard great things  about 2 books on the subject: [Exploring ES6][exploringes6] by Axel Rauschmayer and [Understanding ECMAScript 6][understandinges6] by Nicholas Zakas<sup id="fnref:2">[2](#fn:2)</sup>.  Axel's blog [2ality][2ality] is also a great ES6 resource.


### Subscribe

Thanks for taking the time to read this post!  JavaScript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my recent post on whether [Safari is being left behind][safari].

<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        And obviously because ECMAScript is an awful language name
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
    <li class="footnote" id="fn:2">
        <p>
        Note that I have not read either of these books yet, though I have read plenty of other content from both authors and consider them experts on the JavaScript language. So take that recommendation with an appropriate grain of salt.
        </p>
        <a href="#fnref:2" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>

[javacomic]: http://www.coderanch.com/t/456377/a/401/javascript-java.jpg
[decorators]:https://github.com/wycats/javascript-decorators
[async]:https://github.com/lukehoban/ecmascript-asyncawait
[classprops]:https://gist.github.com/jeffmo/054df782c05639da2adb
[babelstages]: https://babeljs.io/docs/usage/experimental/
[es6compat]: http://kangax.github.io/compat-table/es6/
[safari]: http://benmccormick.org/2015/06/10/is-safari-being-left-behind/
[proposalstc39]: https://github.com/tc39/ecma262
[exploringes6]:http://exploringjs.com/
[understandinges6]: https://leanpub.com/understandinges6
[2ality]: http://www.2ality.com/
[ecma]: http://www.ecma-international.org/
[babeles6]: https://babeljs.io/docs/learn-es2015/
