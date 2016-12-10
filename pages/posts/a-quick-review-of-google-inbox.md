---
title: "A Quick Review Of Google Inbox"
date: "2014-11-04 03:45:30+00:00"
layout: "post"
path: "/2014/11/04/a-quick-review-of-google-inbox"
pageViews: "353"
last30pageViews: "2"
---

Google announced their new email product, [Google Inbox][inbox] last week, and I was able to get a Day 1 invitation from a friend at Google.  I've been using it for my personal email account since then.  A few people have asked me about it, so I thought I'd write up my impressions so far.

I think it's important to start by making it clear what Inbox is, because it seems like there's a lot of confusion out there.  Inbox is an alternative view to your existing Gmail account.  It is not a new webmail account, and it is not a generic mail client <sup id="fnref:1">[1](#fn:1)</sup>.  Changes that are made in Inbox are reflected in Gmail and vice versa.  Inbox is a "fresh coat of paint" with some add-on features, not a "whole new thing".  You can access the Inbox interface on the web at [inbox.google.com](http://inbox.google.com), or through apps for iOS and Android.  This review is primarily of the web interface, since I prefer to deal with my work and personal email through a single app on my phone, and that's not yet possible with Inbox.

![Inbox and Mailbox](/posts/images/sidebyside.png)

Using Inbox for the first time was a little bit of deja vu.  Google seems to have borrowed heavily from [Mailbox][mailbox], my current iPhone email app of choice.  The interface is heavily simplified compared to the a traditional mail client like Gmail or Outlook.  It relies heavily on the "To-Do" list metaphor that several modern clients like Mailbox and [Dispatch][dispatch] have popularized.  So instead of archiving or deleting messages, you mark them done, and if you aren't ready to deal with a particular email yet, you can "pin it" in your inbox, or set a reminder to bring it back up later.  Other than pinning<sup id="fnref:2">[2](#fn:2)</sup> , this format maps pretty well to how I deal with email in general, and is almost exactly Mailbox's workflow, so at least for me it felt natural. Like Mailbox, Inbox is opionionated software. It's optimized for triaging and processing email quickly.  If you spend more time composing emails than reading them, you'll probably find Inbox lacking in terms of compose tools.  But for the majority of us who are just trying to keep our heads above the email ocean, this type of streamlined workflow saves a lot of time.

Inbox's biggest innovation is its "bundles" concept.  Bundles are the next generation of Gmail's label system, and roughly map to labels when moving back and forth between Gmail and Inbox.  They're a standardized interface for the way I used labels to organize things anyway.  

![Here's what your labels look like](/posts/images/skiptheinbox.png)

In Gmail, I've set up a bunch of rules that apply a label to emails that meet a criteria, then have it skip the inbox.  This has the effect of being able to show things like unread updates from a social network as numbers on the left side of the screen, without cluttering my inbox.  I like that system in Gmail, but it has always been annoying that I can't easily see those numbers anywhere except the Gmail web interface.  On my phone, those labels/folders are hidden away unless I dig down for them.  With Inbox, I can change that rule to just apply the label without moving to the inbox, and then make that label a "bundle".  When I do that, those emails show up as grouped within my inbox, taking up minimal space.  It's easy to skim past them, or to bulk archive them if necessary.  Apparently I'm not the only one who's hacked this feature in on their own before, because Inbox contains a category of labels in its sidebar marked as "skipped the inbox", where it puts any labels set up as I've described.  Inbox lets you convert these labels to bundles in one click, meaning you don't actually have to go into Gmail and change the rules.  This has been nice for my personal email, I expect it to be amazing for my work email if/when Google Apps starts supporting the Inbox interface.  I get a lot of automated status/notification style emails for work, which I currently tend to auto-archive without reading.  For the most part this is fine, but for messages that indicate warnings of some type, I'd love to be able to see the count of current warnings in my inbox, with the option to bulk-delete with a click.

![The compose feature is very slick](/posts/images/smalldelights.png)

Other than Bundles, Inbox's other features can all clearly be traced back to Gmail or the new wave of to-do style mail clients.  The compose window and email viewing screen will both feel familiar to anyone used to Gmail's current interface, albeit a bit stripped down and simplified.  The compose button has the nice touch of showing the last few people you've emailed as default options to receive your new message.  Reminders is a Mailbox feature that I've never used much, but Inbox steps it up a bit by allowing you to enter your own reminders without an existing email (much better than sending yourself an email), and by integrating Google Now style intelligence, for instance including directions to the restaurant when it reminds you about a dinner. I still don't expect to get much use out of it personally, since I like my todos to get out of the email client to a more permanent resting place, but for those who use the inbox as their todo manager, it looks pretty slick.

One more praise: Inbox's interface is simple, but avoids the mistake Mailbox makes of going too far down that road.  Mailbox doesn't allow you to filter by label and de-emphasizes the "sent from" email, 2 attempts to simplify the interface that have caused me grief in the past.  Inbox avoids both those pitfalls while still removing a lot of clutter from the crowded Gmail interface.  My one complaint in this area is that chat received the short end of the stick in Inbox.  It's tucked up into the header bar by default, with no quick visual cue as to who is currently online.  Since I began writing this post, I've discovered it's possible to pin a contact list to the right side of the screen, which makes me quite happy.  That's not at all obvious or discoverable though, and the default is a huge step down from classic Gmail's wonderful in-browser chat interface. 

Of course the reason that Inbox can be simple is that it is "just Gmail".  It ignores a lot of complex configuration that you'd want in an email client, and in doing so simplifies the UI.  There's no rules editor for handling different types of mail beyond the built-in intelligent bundles, and no ability to handle things like email forwarding or aliases as far as I've seen.  It offloads that complicated stuff to the classic Gmail interface.  That fact allows Inbox to be simple and clear for less sophisticated users, while still allowing power users a backdoor to customize, but it does mean that Inbox is an addition to, not a replacement for Gmail, at least for now.

Inbox is an extremely impressive piece of UI design.  It's the first major app to feature Google's  new Material Design style, and if this is the type of imaginative rethinking that we'll get from Google's design teams going forward, I'm excited to see more.  My only real complaints at this point are the lack of support for Google Apps, something I'm sure will be rectified in the future, and the fact that, like Mailbox, it's design encourages users to treat the inbox as a long term todo list, rather than a triaging area.  I don't expect that second issue to be fixed, it's ingrained right down to the name of the application.  But since there isn't currently a better option on that front, I will happily enjoy Inbox's simplicity and nice design touches.  It has already replaced the default Gmail interface for me as my desktop mail client, and I expect it to replace Mailbox on my phone as soon as it supports Google Apps.  If Inbox sounds interesting to you I definitely recommend finding a friend with an invite and checking it out. 




<div class="footnotes">
<ol>
    <li class="footnote" id="fn:1">
        <p>
        I've seen some speculation that Inbox might eventually support clients other than Gmail to allow Google to gather data on email outside their ecosystem, but I highly doubt it.  Inbox is built on Gmail's proprietary concepts, and trying to pull things like reminders off without controlling the backend servers would be hacky at the very least.
        </p>
        <a href="#fnref:1" title="return to article"> ↩</a></p>
    </li>
    <li class="footnote" id="fn:2">
        <p>
        I don't want my inbox to be a long term to do list (which is what pinning seems to be for).  The to do metaphor is more helpful as a triaging tool, to split email into "ignore", "handle now", and do later.  If I'm ignoring or replying right away, I can do that and then mark them done.  If it needs to be done later, I don't want it to sit in the inbox.  I'll put it into a todo list app or my calendar instead and then archive it for reference if necessary.  
        </p>
        <a href="#fnref:2" title="return to article"> ↩</a></p>
    </li>
</ol>
</div>



[inbox]: http://www.google.com/inbox/?gclid=CNqBxtSE28ECFQMT7AodrBYAVQ
[mailbox]: http://www.mailboxapp.com/
[dispatch]:http://www.dispatchapp.net/

