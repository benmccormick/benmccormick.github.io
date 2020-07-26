---
title: "Consistency"
date: "2019/04/01"
layout: "post"
path: "/2019/04/01/consistency"
description: "How do we encourage standards in a code base without losing perspective?"
keywords: ""
category: "software-productivity"
topics: ['management', 'leadership']
key: "consistency"
readNext: "utility-functions,reusable-react,book-review-five-dysfunctions"
---

The last few weeks I've had several conversations with a coworker about consistency in code: why do we do things one way here, and a different way there?  Some of this is macro level; Where do we split chunks of related functionality into different files?  Some of it is micro level; what should the rules be for when we use an inline function instead of pulling it out into its own named method?  Some of it is trivial; Do we use `_` or `-` to separate words in file names?  In our current codebase we're not always consistent on many of these issues.  As we've discussed the various issues, I realized that some of them bothered me more than others, and (more interestingly to me) my ideas have changed here over time.

### The Platonic Ideal

>  In a perfectly consistent system, 3 developers writing the same module would produce line by line identical code

There's an extreme point of view out there that says "while a perfectly consistent system might not be possible, the closer we can get to that the better".  The benefits of consistency are many: consistent naming helps with code search and connecting different parts of a system.  Consistent code structure makes code easier to scan once a developer is familiar with the system, and it makes exceptions stand out as something intentional and interesting.  Consistent formatting removes potential distractions.   So what's not to love?  Shouldn't we always try to add more consistency?  I see 2 primary reasons why it might not be worth trying to enforce every single rule we can come up with.

#### We're only human

The first reason not to enforce "everything" is that our human attention spans can only internalize so many rules at once.  When we're trying to remember a large number of rules, its easy to miss one.  But more importantly, when we're writing code or reviewing it, focusing too much on human enforced consistency rules can distract from the actual purpose of the code, making it harder to notice the substance of code because we're so focused on the form.

#### Standards too soon

The other thing that can happen when you try to standardize everything is a loss of creativity.  Sometimes it's helpful to experiment for a while to find the right pattern in a codebase.  In an ideal situation experiments like that will happen on the side, or be explored in branches, but for small teams or new codebases, it will likely happen at least partially in production.


### User Friendly Consistency

So what **can** we do to get the benefits of consistency? The 4 ways I like to see this happen are:

#### Automation

The best way to enforce stylistic consistency and other straightforward things like naming conventions is to use automation.  Linters like [eslint](https://eslint.org/) and auto-formatters like [Prettier](https://prettier.io/).  My rule here is that any linter rule that is about stylistic consistency should be auto-fixable, if not it isn't clear enough or isn't worth it.  For "correctness rules" it can be ok to flag errors without auto-fixing, if human judgement is needed.

#### Code Review Checklists

Code reviews can be a good way to limitedly enforce consistency; but its good to limit scope to avoid [developers trying to become human compilers](https://samsaccone.com/posts/code-reviews-not-nits.html).  If you try to enforce too many things in code reviews, its easy for people to get caught up in going through a list and forget to apply human judgement to the context of the current code. But [code review checklists](https://benmccormick.org/2019/01/14/value-from-code-reviews) are a good way to make a coordinated push on high value items that are either new or often neglected.  This checklist should consist of a few important things to check during every review. The list should be re-examined on a regular basis and ideally kept to 5 or less items.

#### Focused Refactoring

Sometimes its appropriate to have "refactoring initiatives" to standardize on a particular pattern over time.  This can be good for standardizing on a particular library for a task, or removing an older pattern that persists in the codebase after a better way has been found.  My advice here is to [only do one of these at a time, and complete them before starting a new one](https://benmccormick.org/2018/01/07/large-improvements-small-team/).  One of the biggest causes of inconsistency is when a team attempts to "[standardize](https://xkcd.com/927/)" on a solution, then abandons that for a new solution without finish the migration, resulting in a [lava layer architecture](http://mikehadlow.blogspot.com/2014/12/the-lava-layer-anti-pattern.html).

#### Focus on the high level

If there is one place to apply human consistency checks its at the structural level.  If your high level patterns are consistent, the code base will be easy to navigate, and modular code written in a standardized high level structure will be [easy to delete](https://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to).  Overall low level code that is inconsistent or poorly written is easier to overcome than high level code as long as you're taking advantage of code reviews and the other methods suggested here to improve new code, because most low level code is only read occasionally.  So high traffic "messy code" can be a focus of refactoring efforts, and the rest can continue working without disturbing anything.

Messy code is much more problematic at a structural level though, because when different areas of the code are arranged in different ways, it becomes much harder to find functionality when debugging.  This type of inconsistency also tends to make bulk improvements harder, as you have to have a much greater understanding of all the ways a codebase is put together.
