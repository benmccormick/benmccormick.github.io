---
title: "RSS Roundup"
date: "2013-06-29T11:40:00+00:00"
layout: "post"
path: "/2013/06/29/rss-roundup"
category: "reviews"
description: "A look at the options for RSS readers post-Google Reader"
pageViews: "24"
last30pageViews: "0"
---

We're at T-3 days till the Google Reader shutdown, and it seems like the "wait and see" crowd has made their initial decisions.  As a large crop of companies and products have weighed in, a large and diverse selection of "Google Reader replacements" have formed.  The groups behind them range from small indie developers (Feedbin, Go Reader) to fallen internet giants looking to reclaim glory (Digg, AOL). The readers themselves seem to fall into a few main categories:

- Free cloud service aiming for scale
- Free, paid, or ad-hoc self hosted option
- Former Reader clients allowing standalone RSS or a proprietary sync service
- Paid cloud hosted option

Lots of others have chimed in with reviews of each of these services over the last few days, but I think that its hard to recommend a specific service universally, since people have different things they're looking for in those services.  So I thought I'd take a look at the different categories and see why somebody would use them.

### Free cloud based services

It seems like the most popular Reader replacement has been Feedly.  Its one of several options that try to replicate what Reader provided while also maintaining its non-existent price tag.  In doing so, they also inherit the inherent dangers of a product that adds more expense than revenue for each user they gain.  Products like that can seem like an obvious choice for users in the short term, but the results are often [less pleasant][twitterapi] in the long term.  Business models built around free products incentivize behaviors in ways that are unrelated to the customers' best interests.  This can eventually cause privacy issues or unwanted restrictions.  *They also can go the way of Google Reader, a product that was killed off when the costs were no longer worth the benefits provided.*

However, this group does best meet the expectations of an audience used to the free "available anywhere" nature of Google Reader, and includes several excellent products.  Feedly clearly has become a major undertaking, and Digg Reader has an elegant minimalistic style. Each has its flaws, but also has a dedicated team behind it that is clearly listening to feedback and determined to succeed.

### Self Hosted Options

There is a certain type of person whose immediate reaction to seeing Google Reader's shutdown was to give up on external services and write their own. If you have tried that then you probably already have very strong opinions on this issue.  If you didn't, the good news is that several of these efforts have produced public open source options.  There are also other options for self-hosting RSS, most notably [Fever][Fever], a self hosted app that you can purchase for a 1 time $30 fee and then host yourself. There's also [Go Read][GoRead], an open source app whose author is currently hosting it for free on App Engine (with ads soon to come), but also has open-sourced it and made it easy to run on App Engine's free limits.

In the end, these options will appeal to those who want to control their experience, and especially those who want to tinker.  But for most this will look like a lot of work and expense for unclear benefits.

### Reader Clients

A huge ecosystem of apps was built up around Google Reader over the past several years.  There are "Google Reader" apps on every major platform with different styles and features to appeal to a wide variety of users.  Especially on mobile, most users accessed Reader through one of these apps, rather than through the site itself.  Now that Google Reader has removed the sync backbone of their community, these apps have had the opportunity and challenge of reinventing themselves.  Most have adapted one or more of the new services, but some are focusing on local RSS or are developing their own sync service.  [NetNewsWire][netnewswire] in particular seems to be going it alone.  This may make sense for somebody who's dedicated to a certain reader.  At the very least, the services supported by different apps are a big piece of the puzzle for those of us on the hunt for a new service.

### Paid Sync Services

Finally, there is a market re-emerging for paid RSS sync services.  Services like this began to emerge before Google Reader emerged as a dominant free alternative.  Now that Reader is gone, the service has become economically viable again.  The market appears to be settling on a cost of $18 to $25 a year for RSS hosting.  Several services fall into that sweet spot, including [Feedbin][Feedbin] and [Feed Wrangler][Feedwrangler].

## What now?

For now, the most important step for Google Reader refugees is to download your subscription information from Google.  Even if you've imported your information into a new service, it's important to have a local copy, especially since several of the new services don't support any export options.

After that I'd recommend trying a couple of the new services.  They work differently, and reflect the different ways people use RSS.  For me personally, I found Feedly's UI to be frustrating, and am still totally confused that Digg's otherwise excellent offering seems to provide no way to view only view unread items.  I was also concerned by the lack of a business model for Feedly, and the fact that Digg Reader appears mostly dedicated to supporting Digg, rather than serving as a standalone business.  I didn't seriously consider Fever or any other self-hosted services.  I want RSS to be a thought-free process for me, where I'm able to focus on the content and not the tool.  I'm willing to pay for that.

In the end I've settled on Feedbin.  I'm paying the $2/month rate, and have been quite satisfied so far. It has a clean and usable web interface, and works with my favorite iPhone client [Reeder][reeder]. It also makes it easy to quickly scan unread items, and move all items to read, which fits my personal workflow.  Feedbin works for me.  I hope you find what works for you.

## Related Reading

- Marco Arment [doesn't see a future for proprietary sync services][marcoall]
- Dr Drang had a rough experience trying to [do it himself][rssfailure], but now [seems happy with Feed Wrangler][drangfw]
- The Verge took a look at the more established options and [recommends Feedly][verge]



[twitterapi]: http://mashable.com/2012/11/16/tweetro-dead-twitter-api/
[Fever]: http://www.feedafever.com/
[Feedly]: http://cloud.feedly.com/
[Digg]: http://digg.com/login?next=%2Freader
[Feedbin]: https://feedbin.me/
[Feedwrangler]: http://feedwrangler.net/welcome.html
[GoRead]: http://mattjibson.com/blog/2013/06/26/go-read-open-source-google-reader-clone/
[mrreader]: https://itunes.apple.com/us/app/mr.-reader/id412874834?mt=8
[netnewswire]:http://netnewswireapp.com/
[reeder]: http://reederapp.com/
[marcoall]:http://www.marco.org/2013/06/28/all-or-nothing
[rssfailure]: http://www.leancrew.com/all-this/2013/06/my-rss-failure/
[drangfw]:http://www.leancrew.com/all-this/2013/06/feedle-dee-dee/
[verge]: http://www.theverge.com/2013/3/19/4119006/the-best-google-reader-alternatives
