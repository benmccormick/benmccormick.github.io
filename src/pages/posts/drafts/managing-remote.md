---
title: 'Lessons From Managing A Distributed Team'
date: "2019/06/24"
layout: "post"
path: "/2019/06/24/managing-a-distributed-team"
description: "What to do when you can't just walk to your employee's desk."
keywords: ""
category: "soft-skills"
topics: []
key: "managing-distributed-team"
readNext: "manager-and-developer,herding-lions,soft-skills"
blog: 'lions'
isDraft: true
---

Working with people over the internet is different from meeting in an office five days a week.  This isn't a moral statement.  I've done and enjoyed both.  But working with a distributed team requires a different set of skills, especially when you're managing a team.  Here are a few of the most helpful lessons I've learned over the last year managing a distributed team.

#### Evaluate process and outcomes, not inputs

Focusing on output` is great advice for any team, but it's easier and more important when managing remote teams.  When you're not in the office with people, you won't see when they start in the morning or finish at night.  You won't be able to tell if they're taking long coffee breaks or checking Amazon between tasks.  You'll have to evaluate them on their output and on the methods they use to get work done.

Evaluating on outputs is tricky for tech work in the short term.  It's often hard to tell how hard a specific task should have been.  But over the long run, you'll need to find ways to see if developers are meeting their goals, and focus on that over the exact times they did work.  And this is good, because that is actually what matters.

Output is a lagging indicator though.  In the short term, what you can evaluate if "butts in seats" isn't an option.  I recommend process: is work being documented, are tests being written and are code reviews being done in a timely manner?  The nice thing about this is that you can check these things in low touch ways; by reviewing your issue tracking and version control systems rather than having status meetings or sending distracting slack messages.  This idea comes up in [Camille Fournier's book The Manager's Path](https://amzn.to/2XBg1iv), where she argues persuasively for always doing your information gathering in ways that don't disrupt your team first.

#### 1-1s are extra important

When I work in the same office with Sarah, she can drop down by my desk anytime to raise a small issue.  When we're working remotely, that may not feel as comfortable for a variety of reasons.  Good 1-1s provide space for the little things to come out.

#### When you get in-person time, focus on the relationship

Currently I get together with my team (and my manager) about once a quarter.  Initially my instinct was to save the "big work stuff" for that time.  And I still try to get a few big conversations in each time, ideally focused on career development and other things where the extra communication boost of being in person can be helpful.

But the most value from these visits has come in the gaps, when I go out to lunch with my team and chat, or we get together with a larger group after work.  Time spent together builds trust, and that trust lingers and pays off when you're back on the other side of the internet the next week.

#### Async communication is great.  Don't neglect "face to face" time.

When I read what others are doing around remote work, "embrace async communication" is a common theme.  I don't dispute this.  My team takes advantage of slack, bitbucket and other "async" tools every day.  But I also try to be intentional about working in "face to face" time through Zoom.  For my team that's a daily standup and weekly 1-1s, but it could be different for another team's process.  The key is to not *only* rely on writing.  Writing is an amazing way to communicate, but it will always lack the context of the human face.  For now I'm aiming for a mix of mostly async with regular "internet face to face", and occasional "in person".

It's also useful to personalize.  I regularly interact with two people who simply don't seem to interpret me well when I communicate primarily through text, but who have no problem when I'm talking an issue through with them on a call.  However I know others who appreciate that my thoughts tend to be a bit clearer in writing; they don't have to listen to me process through my ideas while speaking to arrive at what I finally want in the end[^1].  I communicate more effectively when I recognize this and match communication medium to relationships as much as possible.

#### Hire for remote success

Not everyone is going to thrive in a remote role.  Most companies hiring remote recognize this and try to filter for it in some form. A lot of companies' response here is to "only hire senior".  Which is probably a workable heuristic in some ways.  Developers that have a proven track record of success probably have built up some habits that will help them succeed in remote work even if they aren't naturally inclined to it.  But hiring only senior folks is expensive, and makes things like diversity and career growth paths harder.

I haven't done this enough to draw any hard conclusions on remote hiring yet.  But from what I've seen, the qualities I'd want to evaluate for are independence, technological comfort, writing skills, and a history of taking the initiative to seize opportunities (in whatever domain).  Obviously that's in addition to normal hiring criteria.

#### Tools and Process matter

The worst way to work remote is to not commit to it.  Commitment means aligning your process toward remote work.  Some lessons here.

**First, Hybrid meetings suck**.  There are 3 ways to do meetings: in person, remote, or hybrid.  An in person meeting involves putting a number of humans in a small room for an hour and letting them talk through an issue.  A remote meeting connects various people from the comforts of whatever work venue they've chosen, and discussion ensues over the internet.  In a hybrid meeting, some people are in the room, and some are connecting remotely.  Hybrid meetings are hell for the remote folks.  Usually they can't hear at least one person well.  They can't match faces to voices, lose context of what is happening in the room, and are sometimes just plain ignored by the folks in the room.

I really didn't understand how bad this was until I did it myself a few times.  If you're a leader who uses or tolerates hybrid meetings, I highly recommend trying to call into them remotely a few times.  As the boss you'll get a slightly different experience, but ask yourself: are you a first class meeting participant when you're calling in remote?  If not, is it acceptable to you to treat your remote workers as second class participants?

**Second, Use good tools**.  Bad collaboration software is a drag if you're working with people in person.  It's a killer for remote teams.  Use software that lets you communicate in timely and useful ways, keep your project critical information organized, and lets your team focus on getting stuff done.  There are hundreds of good tools out there these days, so there's no excuse for using bad ones.  My recommendations, which are not particularly controversial and also not the only good options: use Zoom for video chat, Slack for messaging, Bitbucket, GitHub, or Gitlab for Version Control, Trello or Jira[^2] for task tracking depending on the size of your team, and Google Drive for keeping documents and documentation together[^3].

[^1]: Yeah I'm an extravert.  I process through talking or writing.  But when I write, I get to edit and pretend the first part didn't happen.  And yeah, my wife asks me to send my ideas to her in writing.
[^2]: I... don't love Jira.  But Trello doesn't scale forever, and I haven't seen anything significantly better than Jira for large teams.
[^3]: My team doesn't actually use Google Docs for documentation, we use Confluence.  Which is... worse than Jira.  So this is more of a "don't be miserable like me" recommendation than one based on experience.  I'd be curious to hear if anyone has a documentation/wiki tool that they love.
