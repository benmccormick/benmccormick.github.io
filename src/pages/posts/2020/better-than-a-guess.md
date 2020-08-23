---
title: "Better than a wild guess"
date: "2020/08/23"
layout: "post"
path: "/2020/08/23/better-than-a-guess"
description: "We know more than we think when we don't know something"
keywords: ""
category: "soft-skills"
topics: ["leadership", "management"]
key: "better-than-a-guess"
readNext: "soft-skills,herding-lions,management-resources-2-years"
---

I'm currently reading Doublas Hubbard's [How To Measure Anything](https://amzn.to/3lcY3yY) and it is driving home a point I've observed anecdotally throughout my career; when people don't know something exactly, they often throw away a ton of things that they do know.  You can see this in project estimation, where engineers often resist providing any estimate since "it's hard to tell before we actually build it".  You can see it in product planning, where teams I've worked with struggle to provide clear usage or business impact goals since "it is hard to tell how impactful this will be till we build it".  

Hubbard's advice for making properly calibrated estimates would probably help in multiple places in the software world:

1. **Use 90% confidence intervals when there's uncertainty, not point estimates or vague categories like "medium risk"** - Saying a piece of software work is "large" is much less actionable and informative than "we're 90% confident that it will take between 3 and 15 days to complete.  
2. **Use absurd scenarios and alternative bets to calibrate a confidence interval** - You may think you have no idea how long a novel new software project will take, but even for projects with high uncertainty this is untrue.  You can start by asking questions like "is there any chance this will be done tomorrow" and "is there any chance this project will take more than 5 years".  If the answer is no, then you've established a baseline confidence interval, and you can start working inward from there.  When you get to the point that something is feasible if unlikely, its a sign that you're probably near the 90% confidence interval[^1].  Once you have a starting place, you can further consider a hypothetical bet where you had to choose between a lottery with a 90% payout of $1000 and a scenario where you got the $1000 when the item ended in your range.  If you would clearly prefer one of those scenarios to the other, your range is probably too tight or too loose.
3. **Model your estimates with simple monte carlo simulations** - Hubbard recommends using Monte Carlo simulations (picking random numbers according to the distributions set up by your confidence intervals ~1000 times) in order to get a better intuition of what real world outcomes might look like.  Doing this right does mean understanding not just the confidence range, but also what the distribution looks like.  Estimating simple software feature work for instance, is likely not a normal distribution.  Many tasks will be straightforward and be completed quickly, but we'll hit occasional tasks that require significant restructuring of a program to complete.  It's a classic "long tail" scenario.
4. **Break Down Estimates Into component parts** - One of the most powerful techniques for making better estimates under uncertainty is "Fermi Decomposition", the process of breaking an estimation problem into smaller estimation problems (which may be more tractable) and then combining the estimate.  In software this can mean breaking up a large project into the component pieces of work and then estimating those.  Doing this right of course means capturing our uncertainty on the sub-estimates, so that we can roll that up into the larger estimate.  If we optimistically point estimate every element of a project, we're going to end up with a total estimate that is actually less likely, since we need *everything* to go well to hit that total estimate.  I commonly see engineers handle this by doing optimistic estimates and then adding a buffer period.  It would be better to be clear about uncertainty and do your decompositions with a range of values (although it does make sense to factor in uncertainty about tasks that may be missing).  
5. **Consider what measurements will be valuable** - When we start viewing our estimation goal as reducing uncertainty rather than eliminating it, its easier to see that some easy measurements might go a long way toward improving our projections, even if they won't take us to an exact value.  For instance if we want to know how many tickets we might close during an upcoming sprint, it can be easy to say that there's no way to know.  The new work is unique and isn't necessarily directly comparable to work we've done in the past.  However just because we can't make an exact projection doesn't mean we know nothing.  If we look at our last 10 sprints and see how many tasks we completed in each of them, we can feel confident that this upcoming sprint is likely to be between the minimum and maximum value in that range, or at least close.  If we're currently planning like we will accomplish something outside of that range, this could be very useful information.

All of this definitely has me thinking about the good and bad of software estimation, and how I might incorporate this into my team's rhythms.  Would love to hear stories of effective estimation processes in software.  What do you do that is better than wild guessing?




[^1]: Remember that 90% total interval means that there's a 95% chance that a value is greater than the lower bound and a 95% chance that the value is less than the upper bound.