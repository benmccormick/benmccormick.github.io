---
title: "Improving Code Readability With Async/Await"
date: "2019/01/28"
layout: "post"
path: "/2019/01/28/readable-async"
description: "How async await can improve code maintainability"
keywords: "async await"
category: "javascript"
topics: ['JavaScript']
key: "readable-async"
isDraft: true
readNext: "callbacks-to-promises,fe-concerns,valuable-code-reviews"
---

When it first became a part of JavaScript, I wasn't sure how much I was going to use async-await.  I could see that it made things prettier in some cases, but I was pretty happy with my promise chains and thought that async-await might just be some extra language baggage.  Since then I've fully converted; it's one of my favorite features added to the language in recent years.  The reason?  It helps you write code in a linear manner.

A principle of readable code:

> Code should where possible be written in the order in which a reader needs to understand it.1

For complex classes, this ideally means that the "entry points" are towards the top, with the helper methods below to be read as needed[^1]. But for "linear" code that reflects a workflow, we want the code to progress in chronological order as much as possible.  With imperative code that tends to happen by default.  But JavaScript's asynchronous constructs have tended to obscure chronological orders.

As an example, here is a React component that displays the time remaining in a user session based off of some cookie values.  It checks a cookie on a regular interval to see whether it should display a warning about the session timeout.  Once it is showing the warning, it begins checking the cookie more frequently in order to show a timeout.  Once the session expires, it can stop checking.


```javascript

// When time is less than this, we should show warning
const MAX_TIME_TO_HIDE_WARNING = 1000 * 60 * 2;

// intervals in seconds to update timeout count
const CHECK_INTERVAL_WHEN_HIDING = 30 * 1000;
const CHECK_INTERVAL_WHEN_SHOWING = 0.5 * 1000;

class ShowSessionTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeRemaining: MAX_TIME_TO_HIDE_WARNING + 1,
        };
    }

   /* Update the remaining time till session timeout */
    updateRemaining() {
        let currentTime = Date.now();
        let timeRemaining = getCookie('serverExpiry') - currentTime;
        this.setState({
            timeRemaining,
        });
        return timeRemaining;
    }
    componentDidMount() {
        // while the modal is open, update every cycle but stop when the time remaining is 0
        const whileOpenCheck = () => {
            let timeRemaining = this.updateRemaining();
            if (timeRemaining >= 0) {
                setTimeout(whileOpenCheck, CHECK_INTERVAL_WHEN_SHOWING);
            }
        };
        // while the modal is closed, update every cycle but switch to the open cycle when we reach the threshold
        const whileClosedCheck = () => {
            let timeRemaining = this.updateRemaining();
            if (timeRemaining > MAX_TIME_TO_HIDE_WARNING) {
                setTimeout(whileClosedCheck, CHECK_INTERVAL_WHEN_HIDING);
            } else {
                setTimeout(whileOpenCheck, CHECK_INTERVAL_WHEN_SHOWING);
            }
        };
        // kick off our timeout loop
        setTimeout(whileClosedCheck, CHECK_INTERVAL_WHEN_HIDING);
    }

    render() {
        let {timeRemaining} = this.state;
        let showWarning = timeRemaining > MAX_TIME_TO_HIDE_WARNING;
        return showWarning ? <div>Time Remaining In Session: {timeRemaining} </div> : null;
    }
```

The `componentDidMount` method is the interesting part here.  Notice how the setTimeout based flow has resulted in the flow being reversed?

```javascript
    componentDidMount() {
        // THIS PART HAPPENS LAST IF AT ALL
        const whileOpenCheck = () => {
            let timeRemaining = this.updateRemaining();
            if (timeRemaining >= 0) {
                setTimeout(whileOpenCheck, CHECK_INTERVAL_WHEN_SHOWING);
            }
        };
        // THIS IS THE FIRST RECURSIVE LOOP
        const whileClosedCheck = () => {
            let timeRemaining = this.updateRemaining();
            if (timeRemaining > MAX_TIME_TO_HIDE_WARNING) {
                setTimeout(whileClosedCheck, CHECK_INTERVAL_WHEN_HIDING);
            } else {
                setTimeout(whileOpenCheck, CHECK_INTERVAL_WHEN_SHOWING);
            }
        };
        // THIS IS THE ENTRY POINT
        setTimeout(whileClosedCheck, CHECK_INTERVAL_WHEN_HIDING);
    }
```

The code is super hard to follow because its defined all out of order.  You have to understand the whole thing before you can wrap your mind around any piece of it, and your eye is going to be wandering back and forth.  Compare that to this reimplementation with async/await:

```javascript
    async checkRemainingAtIntervals() {
        while (this.updateRemaining() > MAX_TIME_TO_HIDE_WARNING) {
            await sleep(CHECK_INTERVAL_WHEN_HIDING);
        }
        while (this.updateRemaining() >= 0) {
            await sleep(CHECK_INTERVAL_WHEN_SHOWING);
        }
    }

    componentDidMount() {
        this.checkRemainingAtIntervals();
    }
```

We've pulled the logic out into a separate async function and suddenly everything is so much simpler: we're just using basic loops, with each loop condition updating the remaining time and then checking to see if we should keep looping.  Sleep in this case is just a [promisified](https://benmccormick.org/2015/12/30/es6-patterns-converting-callbacks-to-promises) setTimeout:

```javascript
export const sleep = millisecs => new Promise(res => delay(res, millisecs));
```

In fact this version is so much simpler that when I originally wrote the code that this post is based on, I immediately saw a bug that I had missed in the complex version: the time remaining in a session can go up as well as down.  If a user makes a request after I show the warning, the interval will go up and we should re-hide the warning.  But my first few takes both ignored that complexity.  Fortunately it's easy enough to add:

```javascript
    async checkRemainingAtIntervals() {
        let remaining = this.updateRemaining();
        // keep checking until the session expires
        while (remaining >= 0) {
            let warningIsShowing = remaining > MAX_TIME_TO_HIDE_WARNING;
            let interval =  warningIsShowing ?
                CHECK_INTERVAL_WHEN_HIDING :
                CHECK_INTERVAL_WHEN_SHOWING;
            await sleep(interval);
            remaining = this.updateRemaining();
        }
    }
```

We've actually gotten even simpler here, with a single loop that runs until the session
expires.  Each time the loop runs, it checks to see whether it should wait for a long or short interval before updating the remaining time again.  Everything happens in ~8 highly readable lines that will be easy to follow for anyone who has used a while loop.

Compared to our original version we have

1. Cut out several "intermediary variables" that were mostly managing complexity around async, but weren't part of the core problem
2. Matched the visual flow to the workflow
3. Simplified enough to catch a bug that I missed originally

I'm going to continue to use async-await as the basis for most of my asynchronous code going forward for benefits like this.  If you've been holding out, browser support has gotten very good and this is a great time to jump in.



**TL;DR**

- **Async Await can help readability by matching code structure to the program workflow**
- **Code that is structured more naturally can be easier to debug and see errors in**




[^1]: React's convention of putting render at the bottom of class components has always annoyed me as a result of this.
