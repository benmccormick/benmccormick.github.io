---
title: "Utility Functions"
date: "2019/03/11"
layout: "post"
path: "/2019/03/11/utility-functions"
description: "A few helpful functions that I bring along to all of my projects"
keywords: "utility functions"
category: "software-productivity"
topics: []
key: "utility-functions"
isDraft: true
readNext: "readable-async,how-to-learn,react-confessions"
---

As I've gone through projects over time, I've found a few functions that I end up creating for every significant project that I've worked on.  Some of the details differ from project to project, but the basic function remains the same.  I thought it would be helpful to do a rundown:

### React/JSX

Some of my utils are focused on making JSX nicer to deal with.  2 situations that I've run into a lot in JSX are conditionally showing an item in JSX, and determining which of several classes to add to an element based on logic.  Scenarios like these:

```js
<div>
    {shouldShowCreateButton ? <Button
            onClick={createWidget}
            type = 'primary'
            size = 'Large'
            disabled = {!createEnabled}
            className='create-button'
        >
            Create Widget
        </Button> : null}
</div>
```


```js
let classNames = 'create-button'
if (extraClass) {
    classNames += ' ' + extraClass;
}
if (createEnabled) {
    classNames += ' is-disabled');
}
if (hasCreateError) {
    classNames += ' has-error';
}
return <Button
        onClick={createWidget}
        type = 'primary'
        size = 'Large'
        disabled = {!createEnabled}
        className={classNames}
    >
        Create Widget
</Button>
```

These are both ok, and you'll see plenty of examples of code like them out there, but the first puts a big chunk of code in a ternary, and its not always going to be clear to a reader where that `: null` came from at the end, or why its there by the time they reach the end.

In the second example, we're dealing with a lot of ugly string concatenation.  There are other ways to handle this, like using template strings + ternaries but generally they each provide their own messy pieces.

To solve these situations, I like to define these 2 small functions:

```js
import isString from 'lodash-es/isString';
import filter from 'lodash-es/filter';
// A helper for React Components to reduce ternary use
export const showIf = (condition, element) => (condition ? element : null);

// A helper for handling class lists where some values may be undefined
// filters out anything that isn't a string and then adds spaces
export const classes = classList => {
    return filter(classList, c => {
        return isString(c) && c.length > 0;
    }).join(' ');
};
```

The first just formalizes the most common use of ternaries in JSX (conditionally showing an item) and adds an easy to understand name to it.

The second lets us work with an array of classNames instead of handling string concat ourselves, and will automatically filter out undefined or empty classNames.  This implementation does silently swallow errors on anything that is not a string, which may not be your preference.  Usage looks like this:

```js
<div>
    {showIf(shouldShowCreateButton, <Button
            onClick={createWidget}
            type = 'primary'
            size = 'Large'
            disabled = {!createEnabled}
            className='create-button'
        >
            Create Widget
        </Button>)}
</div>
```

the showIf reads much more clearly than the previous ternary, especially for language newbies who might not be used to ternaries.

```js
let classNames = ['create-button', extraClass];
if (createEnabled) {
    classNames.push('is-disabled');
}
if (hasCreateError) {
    classNames.push('has-error');
}
return <Button
        onClick={createWidget}
        type = 'primary'
        size = 'Large'
        disabled = {!createEnabled}
        className={classes(classNames)}
    >
        Create Widget
</Button>
```

Here we've gotten rid of the extra string code and are working on arrays, which is a nicer data structure for dealing with lists of stuff. Also since we're auto-filtering falsy stuff, we don't have to worry about whether extraClass was defined if it was passed as a prop to our component or something.

### Formatting

So the next few may be different for everyone.  The details here aren't important, the important thing is that you centralize your formatting of numbers and dates.  For instance, here are functions for formatting dates, normal numbers and percentages from a current project:

```js
import { format } from 'date-fns';
import isNumber from 'lodash-es/isNumber';

// takes either a string or a date object and formats it as a standard date with time
export const stdFormat = dateStr => {
    if (!dateStr) {
        return dateStr;
    }
    let date = new Date(dateStr);
    return format(date, 'MM/DD/YY hh:mm A');
};

export const commafy = (num, minDecimals = 0) => {
    if (isNumber(num)) {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: minDecimals,
        });
    } else {
        return num;
    }
};

export const percentify = (num, minDecimals = 0) => {
    if (isNumber(num)) {
        return num.toLocaleString('en-US', {
            style: 'percent',
            minimumFractionDigits: minDecimals,
        });
    } else {
        return num;
    }
};
```

The first one will take a date object and format it to something like `05/30/17 01:16 PM`.  The second will take a number and return a string formatted with appropriate commas: `1234567 -> '1,234,567'`.  The last one will convert a decimal to a percentage string: `0.5 -> '50%'`.

Note that none of these functions are very long.  I'm relying on a date library for the first piece and `toLocaleString` for the other 2.  So I could inline this in most places and not have it get much longer.  The benefit of these types of functions is not in saving typing.  It's in standardizing how you format or don't format things throughout an application.  This has 2 benefits:

1. It's easy to fix bugs, add features or switch between libraries for these common tasks across your application because all of the logic is centralized.  If I needed to start supporting more locales than just the US for percentage formatting, or use moment for my date formatting library I could easily do so with edits to only one file.  That file is also well unit tested, so those transitions would be safe.
2. It lets us control which formats are allowed.  For instance we're allowing the function caller to specify how many decimal points to show for the numeric functions, but not giving options to change the date format for the formatting function, because we want that to be the same everywhere.  If we need to support multiple formats for different scenarios, like a date-only format or a format for communicating with the API, we can add options for that which don't open up all formats, or expose them as separate functions.  With dates in particular, I want imports of libraries like moment or date-fns to be limited to 2 or 3 files at the most, and not used ad-hoc throughout the codebase.

Note that all my examples so far have utilized other utility libraries like lodash and date-fns.  The best utility functions are those that you don't have to maintain yourself.  I do recommend looking for libraries that you can tree-shake and only take what you need though.  Other ones like moment.js can make a big difference on your JavaScript bundle size if you let them.

### Timing

Timeout functions are useful, but the browsers built in functions are callback based and don't play well with promises or async await.  We can fix that:

```js
export const sleep = secs => new Promise(res => setTimeout(res, secs * 1000));
export const pause = () => sleep(0);
```

I now have a promisified version of setTimeout (`sleep`) and a special case version with a 0 timeout (useful for things that should happen as soon as possible after the current event loop executes. I prefer dealing with things in seconds over milliseconds, so I changed the API to use that.  That is probably not everyone's cup of tea, so feel free to copy and modify.

Usage looks like this:

```js
// function to kick off a "job" of some type and then
// check every 30 seconds to see if the job is complete
const createJobAndShowResults = async () => {
    createJob();
    // don't do this without a timeout/failure
    // condition in real life!
    while(true) {
        await sleep(30);
        let jobStatus = checkIfJobIsCompleted();
        if (jobStatus.complete) {
            return jobStatus;
        }
    }
};
```

### And Even More!

This is just a sample of the small functions I usually create in projects.  Pretty much all of them exist for one or more of the reasons that were already discussed:

1. Smoothing over awkward library syntax like multiple classes in JSX or HTML templates
2. Making user intention clear with a well named function, like showIf or stdDateFormat
3. Ensuring consistent application-specific behavior across common low-level operations like formatting or logging
4. Making it easy to replace 3rd party utility libraries  like date-fns by wrapping them in an application specific function
5. Improving browser level APIs, or shaping them to have useful defaults for the current application, like we did with toLocaleString and setTimeout.
