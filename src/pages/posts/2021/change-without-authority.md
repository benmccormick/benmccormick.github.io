---
title: "Driving Change Without Authority"
date: "2021/01/19"
layout: "post"
path: "/2021/01/19/driving-change-without-authority"
description: "9 ways to make things better without a title"
keywords: ""
category: "soft-skills"
topics: ["leadership", "productivity"]
key: "change-without-authority"
readNext: "how-teams-go-faster,play-other-positions,simple-burnout-triage"
---

I recently had a conversation with a coworker where they mentioned that they didn't feel like they had the same power to change other people's behavior that I did since I was a manager.  It's a common sentiment that has some truth but usually will make a manager start laughing or crying if you suggest that it represents reality.  Managing people well involves very little imposing your will on a situation and a lot more driving change indirectly.  The good news is that most of the techniques for this type of indirect change not only can be used by non-managers, many of them are actually more effective coming from engineers directly.  A lot of these techniques deserve posts of their own and I intend to keep these short, so consider this a brainstorming list for the next time you want to change something on your team and don't feel empowered to do so.

### Build the thing you want to exist

A software engineer's ultimate power move is the ability to create new things.  If you're in an argument on the best path forward for a project, just going ahead and building the thing you think should exist can be incredibly powerful.  This could be a proof of concept for larger things, or the full thing for smaller features.  Opposition and bikeshedding often melts away in the face of a working example of the future.  This is especially effective if the argument has been about whether your preferred solution is possible.  

Note that this path can be overused, is helped along by a gentle touch, and I wouldn't recommend it if you put so much time and effort into it that you'd be crushed if people still said no.  But it is a powerful way to move discussions forward.

### Make it easier

Do you want everybody to write more/better tests?  Create some best practice examples and documentation.  Maybe make some training videos showing how you write tests.  Write some helpers to encompass common testing patterns.  Make sure your testing tools are updated to versions with the latest features, and consider whether there are different tools you can use to make adoption easier.  This type of work is also great for establishing yourself as an expert in the area (see below).

### Make your preference a default

Similar to making it easier, you can often change behavior simply by making it the path of least resistance.  Want people to use spaces instead of tabs?  Encode that into a linter and set it to run against every Pull Request.  Want to make sure people add information to new issues?  Create an issue template.  Humans are very susceptible to [nudges](https://amzn.to/3930gJz) and default behaviors, and are much more willing to accept new behaviors when they don't require conscious action from them.


### Identify allies and opponents

If you want to change behavior in your team, it can be helpful to have multiple people fighting for a change.  A great place to start here is just identifying who agrees with you.  Not everyone who is willing to accept a change might want to fight for it as much as you, but establishing an understanding of where people stand is helpful for you to identify potential allies as well as people who you may have to work harder to convince. 

When you know who *disagrees* with you, those people can actually be the most helpful in helping you move a change forward if they're willing to give clear feedback, since they'll help establish the conditions under which a team might accept a change.  

If you find that you're primarily fighting apathy rather than opposition, it can be a good time to pivot to other methods like "making it a default" or "show the future".

### Show the future

In his 1936 classic [How To Win Friends and Influence People](https://amzn.to/3oZu7Yx), Dale Carnegie said that one of the fundamental techniques in working with people was "Arouse in the other person an eager want".  When we want to drive forward a change and are faced with apathy, often times the issue is that other people don't understand why the change we're advocating would be valuable for them. 

A great technique in this case is to be crystal clear on what we expect to get from the change -- and to do so in a way that resonates with them.  If we want to have more automated tests, we might explain to our fellow engineers that more tests can help prevent future rolled back releases, resulting in less crunch time work.  Meanwhile, our product manager might be more interested to know that it will result in fewer angry customers and missed deadlines due to rework.  

It's important not to oversell here.  If you make it sound like adding a few tests will remove all quality issues with your product this route can backfire with the team quickly dropping support when the initial results underwhelm.  But understanding and explaining the "why" in a way that resonates with every relevant teammate is a powerful technique.

### Ask authentic questions

When you are looking to change things and it feels like you're the only one who sees the value in what you're doing a great place to start can be asking authentic questions of others.  For instance, if we went back to our testing example you might ask "Do you think writing more tests would be valuable?", "why do you think we don't write more tests now", or "how do you think our test suite should evolve from here?".  

If asked sincerely those questions will help you refine your understanding of the challenge in front of you, will open the minds of the people you're asking toward the challenge, and may win some converts just by including people.  The sincerely part is important here though - people can generally tell when you're actually listening to what they have to say versus including perfunctory "feedback requests" on your way to pushing an agenda.

### Work in "public"

When you're trying to encourage a particular practice it can be helpful to demonstrate the work "in public".  So if you want people writing more tests, share screenshares of yourself writing tests, run a brown bag lunch where you do some live coding, or share your test PRs in a public slack channel where people will see it.  You might even write public blog posts about the work you're doing, or speak about it at a meetup.

There are a few goals here: to show people what it looks like to do the work, to "normalize" the practice, and to give it visibility.  Doing work publically like this can be a way to attract other interested folks who you might not have expected to be sympathetic, it can raise your own profile, and it can be a way to get great feedback.

### Explain your work

One mistake I see people who are trying to drive change make is an assumption that everybody understands what they're doing.  When you're first introducing a new technology, process, or improvement to your team you should always assume that you need to make the case for it, starting with clearly explaining what the change is and what you're intending to accomplish with it. 

This technique can be combined with many of the other ones here, and can be accomplished in many ways.  A short RFC style document where you outline the change you want can be great.  Putting extra detailed comments and descriptions into pull requests where you're implementing a desired change can be helpful, as can screencasts, blog posts, or brown bags.  For smaller changes this may just mean going out of your way to be extra explicit about the "why" when you make pull request comments requesting people to move in a certain direction.

### Establish your expertise

As I said at the beginning, "change by authority" is not generally the best path.  People are happier doing things because they see the value, not because somebody told them to do so.  That said, sometimes change does need to come through authority.  When that is the case though, there are two types of relevant authority in most engineering organizations.  Hierarchical authority (IE directives from somebody with a managerial title above you in a reporting relationship) and expertise authority.  While hierarchical authority changes slowly and comes with all sorts of other pros and cons, anyone can develop the authority of expertise with a level of dedication and work.  

If you want to drive testing culture on your team it can be helpful to establish yourself as an expert on testing.  The bar for this might be quite high or quite low depending on your existing culture, but the path is similar either way; do the work consistently over time, educate yourself, and demonstrate the impact of the work you're doing.  A little bit of this might not go very far, and if the organization explicitly doesn't value the change you're trying to make it is possible that expertise won't change the equation here.  But if there is willingness to consider growth, establishing yourself as an expert will ensure that you will be part of the conversations when it is time to make a change, and you'll get to contribute to making change happen.