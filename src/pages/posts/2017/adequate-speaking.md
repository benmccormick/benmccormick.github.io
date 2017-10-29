---
title: "How To Give A Perfectly Adequate Conference Talk"
date: "2017-10-30T04:00:00+00:00"
layout: "post"
path: "/2017/10/30/adequate-talks/"
description: "Tips for making your talk useful and rewarding"
keywords: "conference talk speaking tech"
category: "opinion"
key: "adequate-talk"
readNext: "ten-things-js,favorite-interview,jest-matchers-1"
---

Tech talks at conferences or meetups generally end up being experienced in one of 4 ways by audience members.


1.  It's a disaster, and that leads to **rage**.

  > This person is not just wasting my time, I don't even understand what he's trying to tell me.  Is this a talk about Vue or just him telling his life story?

2. The talk is executed just fine, but it misses the mark in some way for the audience, leading to **boredom**.

  > The first 5 minutes seemed ok, but it didn't catch my attention, and now I've been on Facebook for 20 minutes and woah are we already wrapping up?  I don't really know how Vue relates to my work.  

3. The talk is perfectly adequate, and the audience leaves with some new and useful **knowledge**.

  > That was really interesting, I'll have to check out Vue soon, it sounds like it would really help me write more maintainable web apps.

4. The talk is incredible and memorable.  It leads to **inspiration**.

  > Wow I'm looking at web development in a whole new way now.  This really changes how I think about my job!


I have no idea how to give a talk that inspires people.  But after speaking a decent amount over the last few years, I've figured out what helps me give talks that can inform most people, and avoid having people leave bored or enraged.  I want to share what I know, because the truth is that giving a talk at a conference or meetup can be fun and rewarding, and I would love it if you too got the chance to enjoy that.  So here are my tips:

## The Pitch

#### 1. Show up!

The only way to give a talk that will interest and inform other people is to actually attempt it.  If you live in a place that has meetups, those are often the easiest place to start.  They're often run by one or 2 people who are going to be grateful to find new people who are willing to speak. Depending on format, you may be able to give a 5 or 15 minute talk along with other speakers at a meetup to ease into things.  If there's no meetup, you can apply to conferences.  Almost all conferences have open "Call for Paper"s, and many of them try to save some spots for new speakers.  Conference speaking is more of a crapshoot though, since they often have many applications for few spots, and your best bet is to apply widely, and possibly suggest several different talk ideas.  This year I applied to speak at 6 conferences, and actually spoke at 2, and that was by far my best ratio since I started applying to speak a few years ago.  

#### 2. Pick a topic that you’re interested in

Giving a talk can be a fun experience, but it can also be frustrating for both you and the audience.  The best way to suck all of the joy out it is to give a talk about something that you don't care about.  If you're uninterested in the topic, the work to prepare is either going to be a painful grind, or you won't do it.  In which case sitting through your talk may well be a painful grind for your audience.  

Note that I don't say to pick a topic you're passionate about.  Not every talk is going to be the pinnacle of your speaking career, and sometimes there may be nothing out there that is currently changing your life.  You can really help people by informing them of the useful, interesting information you have, and this doesn't need to be more than that.

#### 3. Pick an audience for whom that topic is relevant

So you have a talk topic, and that's great, but does your topic make sense for the people you're speaking to?  Sometimes when you start speaking you may pick a topic before you're sure where you're going to give the talk, other times you may have a place you want to speak, and you need to pick a topic for it.  Either way, make sure that you end up with a topic and an audience that match.  If you're talking to a group of beginner web programmers, a deep dive into the Rust memory model might not be the best choice.  If you're speaking to veteran python programmers, a talk about the basics of object oriented programming might miss its mark.  

Sometimes you may not know your audience exactly.  This is especially true for speaking at large multi-track conferences, where there may be developers (and/or non-developers) from a variety of backgrounds.  In this case, you'll still want to pick the audience you want to target (some subset of the group you know may be there), and then make sure to do a good job of following point #6 below.


#### 4. Pick a “main takeaway” for your audience

It's not enough to just have a topic and audience that generally match.  You're also going to want to know what you want the audience to get out of it.  Talking about "debugging" to a JavaScript audience could be a good talk, but do you want them to learn

- how to use Chrome devtools to find performance bugs?
- a repeatable step by step workflow for figuring out any bug?
- a story about how you solved a specific bug?

Unlike the "topic", the takeaway should be pretty specific.  Given the audience that you're targeting, what piece(s) of new information do you want them to receive as they walk away from your talk?

#### 5. Pick a talk format

There are a few main formats that most tech talks fall into:

- Present a problem, describe several possible solutions (possibly recommending one)
- Present a tool, explain what problems it solves and give examples of using it
- Present an idea or way of looking at things, and show how it applies in different situations
- Tell your story. Explain how a certain technology, idea, or problem in the tech community has affected your life.

All of these formats can work, for a first talk I'd recommend one of the first 2, keeping things concrete and making it easier to get to that "main takeaway".  


#### 6. Write a description that tells your audience what to expect

The final step of putting together a pitch is writing a description that accurately lets attendees know what to expect.  A great title and description do a few things.  

- You actually have something to submit to a meetup organizer or a conferences call for papers.
- A good description helps ground you as you prepare the content of the talk.  You can look at your slides and see if you're actually focusing on the things you wanted to communicate[^1].  
- A well written title and description will help attract your target audience to your talk.  If you're giving a talk for beginners or advanced users, or users of a particular technology, make sure that's clear in the description.  People go out of their way to go to talks where they know they're the target audience, and nothing kills the mood of a talk than a situation where the talk isn't relevant to most of the audience.  

Note that in general, a good description matters more than the exact title of the talk, but if you're at a multi-track conference, make sure to give a descriptive title, as conferences will often only include the talk name in their schedules, without a top-level description.  Naming your talk about the creative uses of Golang "Go-ing Crazy" is fine for a Go meetup, but if people are going to be choosing what session to attend based on your talks name, something more descriptive would be nice, even if it has a little less personality.

## The Preparation

#### 7. Have slides

I've seen some amazing live-coding talks.  I've given one myself at a meetup.  There is definitely a place for them, as well as for minimally visual talks with 2-3 slides.  But if you're aiming for informative, structuring your talk around a good slide deck is your best bet.  

Slides shouldn't have too much information: they're the backbone of your talk, and aren't meant to stand alone[^2].  Instead, they provide structure both for you and the audience as you move through your presentation.

#### 8. Have a talk track

Slides are good, but they're just the start.  You need a talk track that is more than just "reading off my slides".  To feel really well prepared for a talk, I usually write out a complete script for the talk that I intend to follow, and then edit that after several practice run throughs.  For the actual talk I usually boil most of that script down to bullet points to keep me focused.  There will be some experimentation needed there to figure out what works best for you.

#### 9. Make sure your A/V setup works!

I was reminded just last week about the importance of testing that you can give your talk in the venue you're speaking at with the equipment you have as early as possible.  I was forced to give a talk last week on my manager's laptop after mine failed to connect to the venue's projector.  It ended up being a dumb problem on my side that I could have solved if I'd verified my setup earlier and had more time to figure things out.  So that's my a/v setup parable.  The things to remember here:

- Show up early and test your setup if at all possible (event organizers are usually happy to help with this and may insist on this)
- Bring your own adapters.  In the US, at least be ready to connect to HDMI and VGA.  I can't speak to what might be common internationally, but at the very least it's good to be paranoid
- Make sure to bring a power cable.  Your slides going black in the middle of your talk is not a good look.


## The Delivery

#### 10. Have notes

So now it is time to actually give your talk.  Make sure to bring notes.  Most presentation software programs like Powerpoint and Keynote have nice built in presenter note features for this (make sure to practice setting it up so that you see the notes and the audience just sees the slide). You also can just use paper notes in a notebook. Notes are important to keep you on track in case you freeze, and may be something you just want to read for portions of the talk.  

Here again you have several choices for how to handle notes:

- You can read your talk from a script. This lowers your ability to connect with your audience, but it is low risk, and you'll guarantee that you'll hit the content you intend to.  As a native english speaker, I probably underrate this a bit too.  If you're presenting in a second language and reading can help you confidently deliver the material, it may be worth doing so.  
- You can work off of bullet point notes, which were ideally pulled out of a full script that you wrote originally.  So you're talking naturally, with some notes to give you structure and help pull you back in if you're fumbling around.  
- You can memorize your talk verbatim.  This is hard and high risk (if you forget something it can become an awkward stumble as you try to get back to your script), but has a chance at being a very compelling experience

I have found that bullet point notes work well for me, but if you're great at memorizing things, or would be more comfortable reading and are ok with sacrificing some connection to the audience, all 3 can work.  

#### 11. Give context and set expectations (again)

At the start of your talk, you want to answer 3 questions:

1. Who are you?
2. Who is this for?
3. What are you going to be talking about?

You may think you answered these questions with your description, but there will definitely be people at your talk who didn't read your description, and others who misread it.  Giving context at the beginning of your talk helps people prepare to hear the things that matter in your talk.  If this is a conference, it lets people decide whether they want to stay for your talk or not.  Don't be discouraged if some people walk out of your talk after your explanation.  That's a sign that you've done a good job clarifying the scope of your talk, and honoring their time. Having those folks leave now will be a much better experience than having them staring at Facebook and distracting others throughout your talk, and it is now more likely that the people in front of you are the audience you wanted to address.

#### 12. Be Confident and Grateful

When you know your topic and you've prepared well, the actual speaking part



### More Resources

- Rands has a [great post](http://randsinrepose.com/archives/out-loud/) on preparing for a presentation.  Lots of great little details in there.


[^1]: It's ok to change your description later if things change as you prep the talk.
[^2]: People will often ask for the slides of my talk after I give them.  I usually link them, since people ask, but the slides on their own really aren't a substitute for the talk (and if they are informative to that level, the talk will probably suffer as the audience tries to take in too much information).
