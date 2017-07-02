---
title: "Mozilla: The state of Web Components"
date: "2015-06-14 21:35:58+00:00"
layout: "post"
path: "/2015/06/14/mozilla-the-state-of-web-components"
description: "A look at Mozilla's writeup on the current status of the web components spec"
category: "platform"
readNext: "component-based-dev,custom-elements-example"
pageViews: "290"
last30pageViews: "4"
---

Over on Mozilla's development blog, Wilson Page has a [great summary][statewc] of the current status of the Web Components spec:

> Web Components have been on developers’ radars for quite some time now. They were first introduced by Alex Russell at Fronteers Conference 2011. The concept shook the community up and became the topic of many future talks and discussions.
>
> In 2013 a Web Components-based framework called Polymer was released by Google to kick the tires of these new APIs, get community feedback and add some sugar and opinion.
>
> By now, 4 years on, Web Components should be everywhere, but in reality Chrome is the only browser with ‘some version’ of Web Components. Even with polyfills it’s clear Web Components won’t be fully embraced by the community until the majority of browsers are on-board.

I've been using Custom Elements (the least controversial part of the Web Components spec) in production for a little less than a year now thanks to a [small polyfill script][polyfill].  I know that many others are using a version of them through [Polymer][polymer].  It's been sad to see the spec stagnate without browser support for much longer than might have been expected, but it seems there's reason for hope.

> Web Components have been in planning for over three years, but we’re optimistic the end is near. All major vendors are on board, enthusiastic, and investing significant time to help resolve the remaining issues.

It's exciting to see public cooperation on this issue, something that was not very visible over the past few years as Chrome fired ahead with an implementation while others pursued other priorities.  If you care about this spec at all, make sure to read [the full article][statewc].  It's an interesting look at where the spec may be going as well as a nice peak behind the scenes of how web APIs become established.









[statewc]: https://hacks.mozilla.org/2015/06/the-state-of-web-components/
[polyfill]: https://github.com/WebReflection/document-register-element
[polymer]: https://www.polymer-project.org/1.0/
[safari]: http://benmccormick.org/2015/06/10/is-safari-being-left-behind/
