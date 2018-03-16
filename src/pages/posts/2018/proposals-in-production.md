---
title: "JavaScript Proposals In Production"
date: "2018/03/16"
layout: "post"
path: "/2018/03/16/proposals-in-production/"
description: "The problems with using proposed JavaScript features in production"
keywords: "JavaScript ECMAScript"
category: "javascript"
topics: ['ECMAScript', 'JavaScript']
key: "proposals-in-production"
readNext: "ecma-explanation,following-js-roadmap,ten-things-js"
---

*This post was adopted from a twitter thread that outgrew it's medium today.  You can see the original thread [here](https://twitter.com/ben336/status/974670479905705984).*

This morning I saw the following tweet:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">*TC39 proposes Array.flatten feature that breaks code that was working fine for 10 years*<br>&quot;IT&#39;S THEIR FAULT FOR DOING NONSTANDARD STUFF&quot;<br><br>*TC39 proposes changing classes feature not yet in standard*<br>&quot;IT&#39;S NOT FAIR I WROTE CODE USING THAT&quot;</p>&mdash; Dave Methvin (@davemethvin) <a href="https://twitter.com/davemethvin/status/974037352384430080?ref_src=twsrc%5Etfw">March 14, 2018</a></blockquote>

The tweet refers to [this proposal](https://github.com/allenwb/js-classes-1.1) for replacing a number of other proposals for augmenting JS's current class syntax, as well as recent backlash on twitter over [a proposal ](https://github.com/tc39/proposal-flatMap/pull/56) to not use flatten or flatmap for future JS standard syntax due to their previous use in mootools.  

Because people have been using Babel or other tools to transpile their code and use the proposed class syntax today, it would be frustrating for many devs if the proposal shifted under them.  I've been there.  And thus, story time:


A few years ago I used a polyfill for a browser API that wasn’t yet fully supported in all browsers.  And I used it in production code.  Browser support didn't pick up nearly as quickly as I expected, and then the spec changed.  Supporting that code has caused me problems repeatedly since, and there isn't a lot of support, given that the syntax isn't standardized.  Because [I am working with limited resources](https://benmccormick.org/2018/01/07/large-improvements-small-team/) I  still haven’t been able to get rid of the polyfill code completely.  It's baked into one of the most critical portions of my production application.  And so I've had to live with it and deal with some of it's non-ideal aspects for a long time.  Since then I’ve avoided putting anything in production that isn’t in a spec.  And I have absolutely no regrets about that.

**The lesson I’ve learned:** Polyfilling a partially supported spec for compatibility is fine.  Playing around with new proposals is fine (and actually a great idea if you want to influence the future of the language).  But I never want to use polyfills/transpiling for a *proposed spec* in production code. And yes that means no decorators/class properties/pipeline operators in my code for now.  But that's ok.  JavaScript is a pretty decent language today.  A little patience will help you in the end.  Even libraries like MobX that encourage the use of "future specs" will still work without them if they're reasonably well maintained.

### Why Does This Happen?

To some folks the lesson of "Don't use language features that aren't standardized yet" probably looks obvious.  So why does this happen? I think there’s a community/culture aspect to some of this.  For instance, many of the early adopters of React really wanted to push the language forward to achieve better developer experience, and were more likely to propose and advocate for new syntax.  This was fine for them, because many of these folks were either

a. Employees at large companies who had the resources to support whatever code extensions they wanted, and dedicate time to a large refactor if they got it wrong (not typical of most devs)
b. Consultants/teachers who are always trying to stay on the bleeding edge for teaching purposes and who don't build projects intended to be maintained long term (not typical of most devs)
c. Involved in the language standards process and experimenting with new syntax for the purpose of influencing the language, rather than writing production code with it (not typical of most devs)

Because of this, the need to compile JS for JSX purposes anyway and the heavy emphasis in the early React community on rethinking best practices, I've seen a lot more of this type of pre-standardization use of features in the React community than elsewhere.  The Ember community for instance doesn't seem to have the same problems. But it started with early adopters in React, and spread when folks who were less informed about the standards process cargo-culted the code examples.  So here we are.

### My suggestions

1. **Learn about the ECMAScript standards process.**  [This post](https://benmccormick.org/2017/07/10/how-to-follow-the-javascript-roadmap/) can get you started.
2. **Don't use non-standard code in production.**  It just isn't worth the headaches you may get later.
