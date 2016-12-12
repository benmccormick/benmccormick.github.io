---
title: "Underscore vs Lo-Dash"
date: "2014-11-12 13:00:00+00:00"
layout: "post"
path: "/2014/11/12/underscore-vs-lodash"
description: "A comparison between Underscore and lodash"
keywords: "underscore lodash lo-dash JavaScript performance"
category: "frameworks"
pageViews: "109208"
last30pageViews: "2647"
---

Last week was the time for my team's quarterly "dependency update" where we go through all the third party libraries we're using and keep up on any updates or maintenance that need to happen.  That presented the opportunity for me to do a bit more research into an alternative for one of our libraries, [Underscore][underscore].  Underscore is a JavaScript utility library that provides helper functions for common idioms with a focus on functional programming.  It's a dependency for [Backbone][backbone], the MVC library that our web app is based on, and was originally created by Jeremy Ashkenas, who also wrote Backbone.  I love the functional style that Underscore subscribes to, and while the much improved browser support for ES5 functions like map, reduce and filter makes it less necessary than it used to be, Underscore still provides plenty of benefits.

For a while now though, I've been hearing about [Lo-Dash][lodash].  Lo-Dash began its life as a fork of Underscore, and still tracks Underscore's API enough to allow it to serve as a drop-in replacement.  But under the hood it's been completely rewritten, and it's also added a number of features and functions that Underscore does not provide.  About a year ago I saw a spurt of articles recommending that Underscore users switch to Lo-Dash, and it came up again recently when [Underscore's decision to not follow semantic versioning][underscoresemantic] caused problems for some NodeJS applications. The [definitive Stack Overflow question on the topic][stackquestion] seems to come down pretty solidly in favor of Lo-Dash.  And the Lo-Dash [documentation][lodashdocs] touted a prettier chaining syntax as a feature, something that caught my eye since I've always disliked Underscore's chaining mechanism.  As I did my research though I noticed that most of the comparisons are at least a year old.  Both libraries have continued to evolve and improve since then, so I thought there'd be value in adding another writeup comparing the current iterations.

### Why Do We Even Care?

Before I get into the weeds of comparisons, let me address why you'd want to use either of these libraries at all.  Underscore and Lo-Dash provide cross-browser compatible functional programming utility methods.  This post will be long enough without me trying to explain all the benefits of functional programming, but suffice it to say that if you're manipulating and transforming data in any reasonably complex way, an Underscore style library will help you write performant readable code easier than you could with what Javascript natively provides.  We'll touch more on performance later, but both Underscore and Lo-Dash perform better than native browser functional methods, and for complex data manipulations they're significantly more readable than a series of for loops.  They let you write code that's fast and reads like a description of what you intend to have happen.

### How are Underscore and Lo-Dash similar?

As stated above, Underscore and Lo-Dash provide similar functionality.  Lo-Dash's API is a superset of Underscore's.  It provides everything that Underscore does, along with a few additional helper functions.  Lo-Dash can generally serve as a drop-in replacement for Underscore with no changes; it works just fine with Backbone.  So to some extent this question could be answered simply with a link to Underscore's [documentation][underscoredocs].

### How are Underscore and Lo-Dash different?

This question could really be rephrased as "What has Lo-Dash added?".  Lo-Dash answers that with a pretty extensive list on its site, but the claims really boils down to a few things:

- Usability Improvements
- Extra Functionality
- Performance Gains

Let's examine those one by one.

#### Usability

Lo-Dash makes a number of additions to Underscore that don't add new capabilities, but increase usability for developers.  These include

1. ~~Built in Support for AMD Module Loaders~~
2. Short hand syntaxes for chaining
3. Custom Builds to only use what you need
4. Semantic versioning and 100% code coverage


Each of these are relatively small things that add up to time savings for developers.  ~~Supporting AMD natively saves a configuration step, allowing you to use Lo-Dash on requirejs-based projects without having to specify it as a shim.~~ *(**Update**: As of 1.6, Underscore also has native AMD support.)*  Lo-Dash also improves the syntax for chaining functions.  Underscore's chaining syntax has always felt a bit clunky to me.

```javascript
function getLongNames(users) {
    return _.chain(users).pluck('name').filter(function(name){
      return  name.length > 10;
    }).value();
}
```

Lo-Dash cleans that up a bit by not requiring the chain functionality and instead making the Lo-Dash object a function, jQuery style:

```javascript
function getLongNames(users) {
    return _(users).pluck('name').filter(function(name){
      return  name.length > 10;
    }).value();
}
```

It's a small nicety that clears away some syntactical noise.

Lo-Dash also provides custom builds.  By default Lo-Dash is significantly larger than Underscore.  The full library weighs in at 33KB minified, double Underscore's 16KB size<sup id="fnref:1">[1](#fn:1)</sup>.  But you can negate that a bit by only pulling in the things you need.  The "modern version" that drops compatibility for IE8 and other older browsers weighs in at 29KB minified (but not gzipped).  If you want to drop the Lo-Dash extra functionality entirely, and only use it for performance and usability reasons, you can build an underscore compatible version and use only 20kb.  You can also go even further, and for instance use only the functionality required by Backbone.  That will get you down to 13kb, smaller than the original Underscore library.

Finally, Lo-Dash provides semantic versioning and 100% code coverage.  To me these mostly serve as signals that this is a project interested in being disciplined about its engineering practices, which is a good sign.  But the semantic versioning issue seems to be particularly important for those using a utility library in Node, as Underscore's versioning practices have [caused problems][underscoresemantic] for some.

#### Extra Functionality

Lo-Dash includes several functions not included in Underscore.  Some of these are simply syntactical shortcuts for common idioms.  `_.forOwn` allows you to iterate over an objects own properties, allowing you to skip the common practice of including a guard function in a loop to avoid touching items on an objects prototype chain.  Similarly `_.create` is a simplified syntax for `Object.create` and `_.parseInt` is a safe version of the built-in parseInt function [which can have surprising behavior][mapparseintq].  Lo-Dash also provides helper function for deep cloning, merging and extensions, operations that are not available in most libraries.  Specifically `_.cloneDeep` and `_.merge` serve as "deep" versions of Underscore's `_.clone` and `_.extend`, and `_.where` accepts an argument to support deep comparisons.  If you are routinely doing comparisons and copying of nested objects for equality, these functions will definitely have their place for you.


#### Performance

Lo-Dash has an impressive set of [benchmarks][lodashbenchmarks] that you can run on its site which highlight its speed advantage over Underscore on a variety of operations. This is great, but benchmarking against specific tests like this can lead to local optimizations that might not lead to real-world speed.  I also don't have much interest in many of the functions tested; I use them rarely and can handle a speed dip if necessary.  I was mostly interested in how Underscore and Lo-Dash compared on their core functional methods.  So I set up some jsPerf tests that you can run yourself for [\_.each][eachtest], [\_.contains][containstest], [\_.map][maptest], [\_.reduce][reducetest], and [\_.filter][filtertest]. Here's a simplified version of the results, comparing Underscore and Lo-Dash performance in terms of their improvement over the speed of the browsers' native functions.  Results in the chart are averaged across browsers.

 > __Edit: There used to be a chart here. Unfortunately the 3rd party service I used to embed the chart lost my data.  A good reminder to own your own content.  At this point the exact performance data from 2014 would no longer be representative of the current state of things anyway.  The tests above will provide a more accurate look at current performance.__

These tests are not incredibly scientific, and the chart especially is oversimplified, but they're meant to represent real world usage in an easily digestible format.  Draw conclusions from them at your own risk.  That said, there were a few interesting results that I think are reasonably reliable.

1. **Both Underscore and Lo-Dash blow away the native functional methods.**

    With its latest versions Underscore has joined Lo-Dash in using loop based iteration to handle each, map, reduce and filter instead of proxying to the native code.  Counterintuitively this ends up being much faster.  Consistently across the board, Underscore and Lo-Dash beat native functions in terms of speed.  A little research indicates that this is because native functions optimize for sparse arrays and have more weird corner cases that they handle.  In any case, the performance difference is pretty startling across the board.

    You can still manage to beat the libraries' performance by using simple for loops, which is what underscore and lo-dash use after they handle edge cases of their own.  The tradeoff at that point becomes about readability and reliability vs speed, and I'd suggest that using loops is an optimization step in most cases where you'd want to use a utility library, rather than a good starting point.

2. **Lo-Dash is definitely not slower than Underscore**

    It's hard to know how significant some of the results here are, as there are a mix of differences which change across browsers.  Again, it's not a very scientific test.  But Lo-Dash is never significantly slower than Underscore on pretty much any test (the worst seems to be a ~7% difference on Firefox for `_.each()`).  And for several tests it came across as significantly faster (8x speed difference for contains on Firefox!).  I expect many of these differences would prove to be insignificant or inaccurate on a more rigorous test, but it would be very surprising if the net result was that Underscore was faster for common operations.



### Summary: What to use?

So to wrap it all up, if you need a utility library which one should you actually use?  I'll stop just short of unreserved recommendations for Lo-Dash that I saw when I researched this.  I think Lo-Dash is the clear winner for NodeJS users.  Its biggest weakness (file size) doesn't matter on the server, and its use of semantic versioning matters a lot more for developers depending on npm for dependency management.  So take the performance gains and extra capabilities and go with it.  However, there are more tradeoffs on the client.  Both Lo-Dash and Underscore are small, but optimizing page-weight still matters for many sites, especially on mobile devices.  Underscore has learned from Lo-Dash and improved its performance enough that the differences are often insignificant. And while Lo-Dash's extras are convenient, none of them seem essential unless you are comparing and cloning a lot of deeply nested objects.  So I'd advise web developers to weigh the tradeoffs and pick the library that best meets their priorities.

*(**Update:** There's been plenty of discussion on this post today.  Check out the comments below for a lot of helpful insight from [John-David Dalton](https://twitter.com/jdalton), Lo-Dash's creator and an Underscore contributor.  You can also check out the discussion on [Reddit](http://www.reddit.com/r/javascript/comments/2m2hs6/underscore_vs_lodash/).)*

### More Resources

- [Say Hello to Lo-Dash][hellolo], a blog post written by Lo-Dash's core team after they released 1.0 is a great summary of the advantages of Lo-Dash.  It's a year and a half old now, but mostly holds up pretty well, with the only real difference being that Underscore has pulled in several of the features they mention here since then.

- I mentioned this in the post, but Lo-Dash provides a much more thorough benchmarking page than what I provided [on their site][lodashbenchmarks].  They also provide a helpful [roadmap][lodashroadmap] to let users know about plans for Lo-Dash 3.0.


---


### Subscribe

Thanks for taking the time to read!  Javascript development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out  [my recent review of Building Backbone Plugins][bbp].  I'd also love any tips or hints you have for deciding between Lo-Dash and Underscore.


<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        These numbers are minified but not gzipped, based on the file size when I download the minified versions from the project site.
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>


[eachtest]: http://jsperf.com/lodash-underscore-and-native-each
[maptest]: http://jsperf.com/lodash-underscore-and-native-map
[reducetest]:http://jsperf.com/lodash-underscore-and-native-reduce
[containstest]: http://jsperf.com/lodash-underscore-and-native-contains
[filtertest]:http://jsperf.com/lodash-underscore-and-native-filter

[underscoresemantic]:https://github.com/jashkenas/underscore/issues/1805
[stackquestion]: http://stackoverflow.com/questions/13789618/differences-between-lodash-and-underscore
[lodashdocs]: https://lodash.com/docs
[underscoredocs]: http://underscorejs.org/
[mapparseintq]: http://stackoverflow.com/questions/14528397/strange-behavior-for-map-parseint
[lodashbenchmarks]:https://lodash.com/benchmarks
[bbp]:http://benmccormick.org/2014/07/09/understanding-the-backbone-mindset-a-review-of-building-backbone-plugins-by-derick-bailey/
[hellolo]: http://kitcambridge.be/blog/say-hello-to-lo-dash/
[lodashroadmap]:https://github.com/lodash/lodash/wiki/Roadmap

[underscore]: http://underscorejs.org/
[backbone]: http://backbonejs.org/
[lodash]: https://lodash.com/
