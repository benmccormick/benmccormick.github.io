---
title: "Weekly Links: October 7th"
date: "2018/10/07"
layout: "weekly-links"
path: "/2018/09/23/weekly-links-09-23-30/"
description: "Keys in React, Destructuring, and Followership"
keywords: ""
topics: []
category: "opinion"
key: "weekly-links-09-30-18"
---

### Javascript & the Web

[Common Mistakes with Keys in React | Li He](https://medium.com/blackrock-engineering/5-common-mistakes-with-keys-in-react-b86e82020052)

This was a nice summary of a topic that lots of people likely breeze over in React until it burns them.  Short and informative; good stuff.

[Extracting command line arguments from Node.js using destructuring |  Nicholas C. Zakas](https://humanwhocodes.com/blog/2018/10/extracting-command-line-arguments-nodejs/)

Destructuring is one of those JavaScript featurs that it's easy to go a little crazy with.  You go from not knowing it exists to writing expressions like this in a day[^1]:

```javascript
const {user:{fname:userFirstName = 'Jon', lname:userLastName= 'Smith}} = data;
```

That type of thing will drive the people reading your programs crazy eventually.  This article provides a nice example of where destructuring shines.

### Leadership

[Followership | Jason Wong](https://www.attack-gecko.net/2018/09/04/followership/)

This is a really interesting breakdown of "follower styles".  I'll admit I'm a sucker for 2x2 grid frameworks, but I love em because they're powerful communication tools.  I'll be thinking about how I can use this with my team, as well as thinking about how I relate to those in authority over me.[^2]






[^1]: That sets 2 variables, `userFirstName` and `userLastName` pulling them from `data.user.fname` and `data.user.lname` respectively, and defaulting them to John and Smith if they're not defined. ...obviously?
