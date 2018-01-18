---
title: "Weekly Links: December 23rd 2017"
date: "2017/12/23"
layout: "weekly-links"
path: "/2017/12/23/weekly-links-12-23-17/"
description: "Math in JS, Google vs Apple Maps, and cheating at Settlers"
keywords: "primes jest gatsby google maps settlers"
category: "opinion"
key: "weekly-links-12-23-17"
---

### JavaScript And The Web


[73,939,133 / Truncatable Primes | Reg Braithwaite](http://raganwald.com/2017/12/14/73939133.html) - A nice writeup about how brute force can be useful in solving a [Project Euler](https://projecteuler.net/) style math problem.


### Programming Tools and Practices

[Jest 22: Refinements & Custom Runners | Jest Blog](http://facebook.github.io/jest/blog/2017/12/18/jest-22.html) - This looks like a solid refinement release for Jest.  One warning: If you're running `jest -o` on precommit hooks as I described [here](https://benmccormick.org/2017/02/26/running-jest-tests-before-each-git-commit/), Jest 22 fails when run with 0 tests, so you need to specify the `--passWithNoTests` flag in order to let things go when you make a change that doesn't affect any tests.

[Introducing The Gatsby UX Research Program | Gatsby Blog](https://www.gatsbyjs.org/blog/2017-12-20-introducing-the-gatsby-ux-research-program/) - An unusual case of doing real UX research for an open source developer tool.  Very cool stuff.


### Non-Tech

[Google Maps’s Moat](https://www.justinobeirne.com/google-maps-moat) - If you have any interest in product design, maps, or computer intelligence, this is the one article you need to read this week.  Beautifully put together.  It's an in depth examination of the difference between Google and Apple maps, but it reads as a deeper exploration of how big data combined with computer learning and automation can have a huge impact on product design.

[How to cheat at settlers by loading the dice | Mike Izbicki](https://izbicki.me/blog/how-to-cheat-at-settlers-of-catan-by-loading-the-dice-and-prove-it-with-p-values.html) - This is just a fun application of statistics to my favorite board game.
