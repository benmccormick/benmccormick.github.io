---
title: "Designing Front End Apps For Reliability"
date: "2019/01/21"
layout: "post"
path: "2019/01/21/strategic-coding"
description: "Principles for creating more robust applications"
keywords: ""
category: "fe-architecture"
topics: ['Architecture', 'JavaScript']
key: "reliability-design"
isDraft: true
readNext: "fe-concerns,react-confessions,feedback-loops"
---

In my recent [post on Front End Architecture](https://benmccormick.org/2019/01/07/the-concerns-of-fe-architecture/) I identified **Reliability** as one of 6 areas of concern when thinking about front end architecture.  Reliability in this sense can be defined as follows:

> An application's ability to provide a consistent functional experience to all users in the intended audience over time.

Let's break that down a bit:

**Consistent** - Reliable applications function the same way over time or degrade gracefully, even on days with heavy load, leap years, and weekends.

**Functional** - Reliable applications allow the users to do the things they need to do, and are forgiving when a user attempts actions that weren't part of an ideal use case.

**All Users In The Intended Audience** - Reliable applications work for users with strange data who live in different locales, and those with bad network connections and old browsers, at least within the limits of what what the business intends to support.  There is some overlap here with the concept of **accessibility**.

**Over Time** - In the real world, no application is ever completely reliable.  Things break down, there are bugs, and new edge cases are discovered.  What we can aspire to though, is an application where things that are working consistently stay working consistently, and as bugs, regressions and edge cases are discovered they get fixed in permanent ways.


### Things Break Down

So why are applications often unreliable?  There are a fairly predictable set of issues that most applications run into that degrade reliability.

#### Unanticipated Usage Patterns

Users are agents of chaos.  Oftentimes front end applications perform unreliably because they're used in ways that nobody expected.  Maybe a developer didn't expect that anyone would ever try to navigate to a new page in the middle of a file download.  Maybe they didn't realize that when a button was slow to respond, users would click it repeatedly and eventually spawn enough requests to overload the backend system. Or maybe they didn't expect anybody to be using an ad blocker when using their site.  Some of these things can be planned for, many will be learned with experience, but there are pretty much always going to be surprises.  This is especially the case if development and testing is only done against sample data.  The real world is always stranger than expected.

#### External Failures

Google never has bugs right?  So if you're connecting to a Google API, you can probably count on it always working as expected?  Ah, the naiveté of youth.  All systems break down sometimes.  If you want your system to be robust, it needs to handle failures in any system that it interacts with, whether that's a Google API, your own backend servers, or a 3rd party script that you're loading onto the site alongside your app code.  You also need to be prepared for the various capability levels of the different browsers that will run your application, and recognize that not every user will be running the browser you're developing in.  Or you can trust in Google and await your eventual disappointment.

#### Bugs

Sometimes code breaks because it just wasn't written right. Bugs aren't necessarily incompatible with reliability.  They're a normal part of software development, but when there are a lot of bugs it can really hurt the reliability of the system.  Ultimately bugs are hurting reliability when users (and maybe even employees) don't trust that the system will work correctly.

#### Scaling Problems

Finally, some code works fine initially, but as things grow things break down.  On the Front End, this can be a cause of the external failure category above, but it can also happen with data.  A table that is able to display 10 items without problems may break down when it is passed 500 items.  A graph that was built to show 50 data points at a time would almost definitely run into issues if it was passed 50,000 items.  Any application that deals with user data or other real world data variations has to face these types of scalability, and they're often fairly challenging when designing user interfaces.

### Keeping Things Running

I'd like to offer some practical strategies for overcoming the challenges I've listed.  These are things you can consider during code reviews and when setting up your dev processes.

#### 1. Consider all states, and limit them if you can

One of the big leaps in JavaScript based UI development over the past decade has been moving from systems that we modeled as an initial UI state followed by a series of mutations (server generated HTML + jQuery) to systems that were modeled as partially driven with event systems that caused mutations to the UI (Backbone, Angular 1, Knockout), to systems that model the UI as a function of state (React, Vue, Angular2+, Modern Ember) State-driven systems tend to be more robust, because it is often more clear when a particular state might cause a problem, and it is more obvious when a problematic state occurs for a user how it happened.

As an example, if we have a green button and we want to turn it blue on hover and red when there is an error, in a jQuery world we might be tempted to simply write code like this:

```javascript
$(btn).on('errorEvent', () => $(btn).css('background, 'red'));
$(btn).on('hover', () => $(btn).css('background, 'blue'));
```

With code like this, a button that is hovered and has an error will have its color depend on the order of operations.  If we model it as a function of state though, we will see this distinction and will have to make a consistent decision one way or another

```javascript
function getButtonColor(hasError, isHovered) {
    if (hasError) {
        return 'red';
    } else if (isHovered) {
        return 'blue';
    } else {
        return 'green';
    }
}
```

This code is more consistent (a hovered button with an error will always be red), but its also more explicit, and a programmer reading this code is more likely to notice that `hasError && isHovered` is a possible state.  At which point they can make a decision about how they want to handle it.

This could easily be a whole article, but my final point here is that it's value to get used to thinking in terms of state machines.  If you see your UI as a "machine" that can be in a finite set of states, with a distinct set of actions that can move you between those states, it really helps the process of thinking through what states you may be missing or mishandling.  I wrote back in May about how [you can use MobX to create ergonomic state machines](https://benmccormick.org/2018/05/14/mobx-state-machines-and-flags/) for Ajax interactions.  Regardless of what technologies you use, this type of thinking can be helpful on both a micro (butto color) and macro (your application's routing strategies) level.

Of course many applications are in practice "infinite" state machines, with an incredible variety of possible states.  You can still use these techniques on individual parts of your application, but it is also helpful to think about how you can limit the number of states to improve reliability.  More on this in the future.

#### 2. Don’t trust the network

This one is straightforward, and easy to check in code reviews.  Don't assume that anything over a network will return quickly.  Don't assume it will return correctly.  And in fact, don't assume it will return at all.  You may be limited in how you can handle these possibilities, but the baseline competence here is handling them.  Have strategies for loading states, timeouts, error handling and bad formats.  Things like service workers can help here, but also make the problems around the network even more complicated by introducing a new caching layer.  When you start making calls over a network, you're entering the realm of distributed systems and things get tricky fast.  But the least you can do is recognize the complexity and make a plan for it.

#### 3. Consider variations in data

Do you have a test data set that you develop against?  Is that your primary source of validation before you send code off into the wild?  Some of that may be unavoidable and out of your control, but remember that users are agents of chaos.  You will encounter data you didn't expect, so plan ahead for challenges.  How would your data visualization function if the dataset you ended up displaying was 2x the size of your test database?  10x? 1000x?  What if the list of products to display in your table contained product names 200 characters long?  Or if some of them were empty?  The real world is strange and you should be ready.

#### 4. You should have testing

This is another topic that's too big to cover fully here, but basically there's a reason that QA engineers have jobs.  You should have a plan for testing.  That plan will be better if it contains meaningful amounts of automated regression testing, with a clear process for making sure bugs are tested automatically once they've been discovered and fixed.  If you don't know where to start, always focus on testing the most important things well over testing everything mediocrely. And if you're not in a position to do meaningful automated testing, consider what it will take to get there.

#### 5. Monitoring

Finally, sometimes it's just not possible to catch problems before they ship.  But you can still catch them before too many of your customers do if you put in the work.  I'll be honest, I've never had a monitoring setup that I've been happy with at work, but on the front end good monitoring can mean sending console logs over the network so that they're shared with whatever backend logging solution you're using, tracking feature usage through analytics to look for any large problems or lack of usage that may indicate bugs, and even more advanced stuff like session recording in some cases.


