---
title: "Everyday Algorithms"
date: "2018/09/17"
layout: "post"
path: "/2018/09/17/everyday-algorithms/"
description: "Algorithm should not be a scary word"
keywords: ""
category: "software-productivity"
topics: []
key: "everyday-algorithms"
isDraft: true
readNext: "feedback-loops,ten-things-js,react-confessions"
---

Thinking about how to structure this…

For me I look at the requirements of showing a graph of 10 user icons with a color representing success/warning/error state and shading representing the coverage number and I break it down in my head like this:

‌

    What color should the icons be?
    How many should be colored in?
    Starting from the left, how many fully colored icons do I need?
    Do I need a half after that?
    How many neutral icons do I need to fill in the remainder

That’s our “algorithm” for this.

If I was writing code and needed a guide on how to structure it, I might actually start by just writing this:

‌
```javascript
const getCoverageIcons = coverage => {

// 1. What color should the icons be?

// 2. How many should be colored in?

// 3. Starting from the left, how many fully colored icons do I need?

// 4. Do I need a half after that?

// 5. How many neutral icons do I need to fill in the remainder

}
```

‌

This type of “comment mocking” helps me when I’m dealing with an algorithm that I have trouble keeping straight in my head, especially if I think I might get interrupted while writing it.

‌

I’d probably fill it in like this:

‌
```javascript
const GOOD = 'good', WARNING = 'warning';

const getCoverageIcons = coverage => {

// 1. What color should the icons be?

const status = (coverage < 40 || coverage > 80) ? WARNING : GOOD;

// 2. How many should be colored in?

// 3. Starting from the left, how many fully colored icons do I need?

// 4. Do I need a half after that?

// 5. How many neutral icons do I need to fill in the remainder

}
```
‌

Start just by saying “should the filled in ones be filled in Orange or Green? And again, like the status bar, don’t use the actual color names as variables since we could change those later but the concepts will probably stay the same.

‌
```javascript
const GOOD = 'good', WARNING = 'warning';

const getCoverageIcons = coverage => {

// 1. What color should the icons be?

const status = (coverage < 40 || coverage > 80) ? WARNING : GOOD;

// 2. How many should be colored in?

let countToColor;

let floorNumber = Math.floor(coverage / 10);

if (coverage % 10 >= 7.5) {
   countToColor = floorNumber + 1;
} else if (coverage % 10 >= 2.5) {
   countToColor = floorNumber + 0.5;
} else {
  countToColor = floorNumber;
}

// 3. Starting from the left, how many fully colored icons do I need?

// 4. Do I need a half after that?

// 5. How many neutral icons do I need to fill in the remainder

}
```

So for step 2, we get the count that we need colored in. That’s the rounded down value of coverage divided by 10, plus 0, .5, or 1 depending on the remainder.

‌

‌
```javascript
const GOOD = 'good', WARNING = 'warning', NEUTRAL = 'neutral';

const Icon = ({status, isHalf}) => {
    let classMap = {[GOOD]: green, [WARNING]:orange, [NEUTRAL]: gray};
    let halfClassMap = {[GOOD]: half, [WARNING]: orangeHalf}
    return <i className={`${icon} ${classMap[status]]} ${isHalf ? halfClassMap[status] : ''}`} />;
}

Icon.propTypes = {
  status: PropTypes.string.isRequired,
  isHalf: PropTypes.boolean
}


const getCoverageIcons = coverage => {

// 1. What color should the icons be?

const status = (coverage < 40 || coverage > 80) ? WARNING : GOOD;

// 2. How many should be colored in?

let countToColor;

let floorNumber = Math.floor(coverage / 10);

if (coverage % 10 >= 7.5) {
   countToColor = floorNumber + 1;
} else if (coverage % 10 >= 2.5) {
   countToColor = floorNumber + 0.5;
} else {
  countToColor = floorNumber;
}

// 3. Starting from the left, how many fully colored icons do I need?
let icons = [];
for (var i = 0; i < countToColor; i++) {
  icons.push(<Icon status={status} half={false}/>)
}


// 4. Do I need a half after that?

// 5. How many neutral icons do I need to fill in the remainder

}
```
‌

Ok this got a bit more complicated, but here we created an Icon component that takes our status and returns an <i/> with the appropriate classes. Since we have that, we can just iterate from 0 to countToColor and add Icons with our status.

‌
```javascript
const GOOD = 'good', WARNING = 'warning', NEUTRAL = 'neutral';

const Icon = ({status, isHalf}) => {
    let classMap = {[GOOD]: green, [WARNING]:orange, [NEUTRAL]: gray};
    let halfClassMap = {[GOOD]: half, [WARNING]: orangeHalf}
    return <i className={`${icon} ${classMap[status]]} ${isHalf ? halfClassMap[status] : ''}`} />;
}

Icon.propTypes = {
  status: PropTypes.string.isRequired,
  isHalf: PropTypes.boolean
}


const getCoverageIcons = coverage => {

// 1. What color should the icons be?

const status = (coverage < 40 || coverage > 80) ? WARNING : GOOD;

// 2. How many should be colored in?

let countToColor;

let floorNumber = Math.floor(coverage / 10);

if (coverage % 10 >= 7.5) {
   countToColor = floorNumber + 1;
} else if (coverage % 10 >= 2.5) {
   countToColor = floorNumber + 0.5;
} else {
  countToColor = floorNumber;
}

// 3. Starting from the left, how many fully colored icons do I need?
let icons = [];
for (var i = 0; i < countToColor; i++) {
  icons.push(<Icon status={status} half={false}/>)
}


// 4. Do I need a half after that?
if (countToColor % 1 === 0.5) {
   icons.push(<Icon status={status} half={true}/>);
}


// 5. How many neutral icons do I need to fill in the remainder

}
```

‌

This step is pretty simple, we just see if there was a half remainder in our countToColor and add the half if it exists.

‌
```javascript
const GOOD = 'good', WARNING = 'warning', NEUTRAL = 'neutral';

const Icon = ({status, isHalf}) => {
    let classMap = {[GOOD]: green, [WARNING]:orange, [NEUTRAL]: gray};
    let halfClassMap = {[GOOD]: half, [WARNING]: orangeHalf}
    return <i className={`${icon} ${classMap[status]]} ${isHalf ? halfClassMap[status] : ''}`} />;
}

Icon.propTypes = {
  status: PropTypes.string.isRequired,
  isHalf: PropTypes.boolean
}


const getCoverageIcons = coverage => {

// 1. What color should the icons be?

const status = (coverage < 40 || coverage > 80) ? WARNING : GOOD;

// 2. How many should be colored in?

let countToColor;

let floorNumber = Math.floor(coverage / 10);

if (coverage % 10 >= 7.5) {
   countToColor = floorNumber + 1;
} else if (coverage % 10 >= 2.5) {
   countToColor = floorNumber + 0.5;
} else {
  countToColor = floorNumber;
}

// 3. Starting from the left, how many fully colored icons do I need?
let icons = [];
for (var i = 0; i < countToColor; i++) {
  icons.push(<Icon status={status} half={false}/>)
}


// 4. Do I need a half after that?
if (countToColor % 1 === 0.5) {
   icons.push(<Icon status={status} half={true}/>);
}


// 5. How many neutral icons do I need to fill in the remainder
let numRemaining = 10 - Math.ceil(countToColor);
for(i=0; i< numRemaining; i++) {
  icons.push(<Icon status={Neutral} half={false}/>);
}
return icons;
}
```

Now we've put it all together, and things are working. Math.ceil here is just a round up (to the ceiling?) the opposite of Math.floor. Everything else in step 5 should be pretty self explanatory.
