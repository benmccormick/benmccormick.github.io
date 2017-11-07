---
title: "Improving Gatsby Blog Deploy UX"
date: "2017/11/07"
layout: "post"
path: "/2017/11/07/blog-deploy-ux/"
description: "Travis CI and Inquirer.js make my Gatsby deploys easier"
keywords: "gatsby travis inquirer.js ci cli"
category: "tools"
key: "blog-deploy-ux"
readNext: "rss-atom-json-feeds,ten-things-js,friday-links-11-03-17"
---

About a year ago I switched back to using a static site generator for this blog.  Specifically, I chose [Gatsby](https://www.gatsbyjs.org/) and it has been fantastic.  It's incredibly easy to customize and make my own, and I can do fun things like adding metadata to my posts to enable features like the "read next" list at the bottom of each post, and the "most popular" posts feature that is actually generated from google analytics data.  The biggest downside of using a static site generator relative to a hosted service though is the annoyance of actually posting.  I could edit or write a post to my [Ghost](https://ghost.org/) blog from anywhere, which was a real perk of using that platform.  Until recently I was only able to deploy this site from a single computer, because I needed an API key for Google Analytics to be available.  That has been mostly fine, since I usually work on posts for this site over the course of a few days.

But last week I decided to start aiming for [weekly shorter linklog posts](https://benmccormick.org/2017/11/03/friday-links/), and that meant having a bit more flexibility with my deploys.  So this week I did 2 things: I set up a [Travis CI](https://travis-ci.org/) job to auto-deploy my app when changes hit the master branch, and wrote an initial version of a CLI for managing the blog.  The first version just helps me write out a templated new post.  My setup is pretty tailored to this blog, but I thought it'd be helpful to share, and maybe inspire some folks looking to do the same thing for their static site.

### Travis CI

Travis is a continuous integration environment that is free for open source.  I had used it very minimally for some open source projects, but never to deploy anything so I had to learn about the `deploy` option travis provides.  In the end my `.travis.yml` file was pretty simple and looked like this:

```yml
language: node_js
node_js:
- '8'
deploy:
  skip_cleanup: true
  provider: script
  script: scripts/deploy.sh
  on:
    branch: master
env:
  global:
  - ANALYTICS_KEY=./analytics-api-key.json
  - secure: r43TdsxdDrqYtmZiBmBSe+7u0UBdepMWAYmpTGzGJoAt9p0z+CxcR9ZIj4uMPvBtO3n1wcEvylWcmmY6smu57uXNPhQpyYJaw6HlnfKrz5GjRVX6Ti6oDm8Yyhha1IlcS73dJTpApFis30Kv7fsfDvpNcvVxpF1eDUlw2UAYCwI=
before_install:
- openssl aes-256-cbc -K $encrypted_dd5d287df7ed_key -iv $encrypted_dd5d287df7ed_iv
  -in analytics-api-key.json.enc -out analytics-api-key.json -d
```

Breaking that down a bit:

```yml
language: node_js
node_js:
- '8'
```

I'm using node for this project and I want to deploy on node 8, so these lines just make sure I have that environment available.

```yml
deploy:
  skip_cleanup: true
  provider: script
  script: scripts/deploy.sh
  on:
    branch: master
```

I've bundled my deploy steps into a script, `deploy.sh`.  This config tells travis to run the script after my (currently non-existent) tests have completed, and not to remove any built files before starting the deploy.  It also makes it clear that this should only happen for changes to the master branch.

```yml
env:
  global:
  - ANALYTICS_KEY=./analytics-api-key.json
  - secure: r43TdsxdDrqYtmZiBmBSe+7u0UBdepMWAYmpTGzGJoAt9p0z+CxcR9ZIj4uMPvBtO3n1wcEvylWcmmY6smu57uXNPhQpyYJaw6HlnfKrz5GjRVX6Ti6oDm8Yyhha1IlcS73dJTpApFis30Kv7fsfDvpNcvVxpF1eDUlw2UAYCwI=
before_install:
- openssl aes-256-cbc -K $encrypted_dd5d287df7ed_key -iv $encrypted_dd5d287df7ed_iv
  -in analytics-api-key.json.enc -out analytics-api-key.json -d
```

This section looks messy, but its all about the environment variables I need for deploying.  Specifically I'm pulling in a github key for deploys (thats the secure key), and then also pulling my google analytics key from a json file.  The JSON file is stored as an encrypted file in the directory with a key that only Travis can decrypt.  Then I use a public environment variable to tell my deploy script where to look up the file.  That allows me to set a different path locally and still have local deploys work even though I can't decrypt the checked in JSON file.


### CLI

I've started with an extremely basic CLI using [Inquirer.js](https://github.com/SBoudrias/Inquirer.js).  It asks me a series of questions and then generates a markdown doc with the appropriate YAML headings.  Inquirer.js, lodash, and ES6 template strings make this super easy.  It looks like this:

```javascript
const inquirer = require('inquirer');
const map = require('lodash/map');
const find = require('lodash/find');
const { mkFile } = require('../src/utils/file_system');
const categories = require('../src/pages/categories.json').categories;
const moment = require('moment');

let dates = {
  Today: 0,
  Tomorrow: 1,
  'Two Days From Now': 2,
  'Three Days From Now': 3,
};

inquirer
  .prompt([
    {
      type: 'list',
      name: 'type',
      message: 'What Type of Post is this',
      choices: ['Post', 'Page', 'Friday-Links'],
      filter: val => {
        return val.toLowerCase();
      },
    },
    {
      type: 'input',
      name: 'title',
      message: 'What should the title be?',
      validate: value => {
        if (value) {
          return true;
        }
        return "Title can't be empty";
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'What should the description say?',
      validate: value => {
        if (value) {
          return true;
        }
        return "Description can't be empty";
      },
    },
    {
      type: 'input',
      name: 'key',
      message: 'What should the post key be?',
      validate: value => {
        if (value) {
          return true;
        }
        return "Key can't be empty";
      },
    },
    {
      type: 'list',
      name: 'category',
      message: 'What Category of post is this',
      choices: map(categories, 'title'),
      filter: title => {
        return find(categories, { title }).key;
      },
    },
    {
      type: 'input',
      name: 'tags',
      message: 'Write out any tags you want to use',
    },
    {
      type: 'list',
      name: 'date',
      message: 'When is this going to be posted',
      choices: map(dates, (value, key) => key),
      filter: key => {
        return dates[key];
      },
    },
  ])
  .then(answers => {
    let postDate = moment().add(answers.date, 'days');
    let year = postDate.format('YYYY');
    let formattedDate = postDate.format('YYYY/MM/DD');
    mkFile(
      `/src/pages/posts/${year}/${answers.key}.md`,
      `---
title: "${answers.title}"
date: "${formattedDate}"
layout: "post"
path: "/${formattedDate}/${answers.key}/"
description: "${answers.description}"
keywords: "${answers.tags}"
category: "${answers.category}"
key: "${answers.key}"
readNext: "ten-things-js,favorite-interview,jest-matchers-1"
---

    `
    );
  });
```

Inquirer makes it really nice to gather up all the information, then I use a utility I've already written to dump it in a file.  I want to do a bunch more here in the future here, starting by giving this script the ability to read and parse my existing posts, which will let me enforce uniqueness on names and keys, as well as offer autocomplete on the readNext column, which I've left hardcoded for now, since its hard to type free form.  There's more to come here, and you all may feel free to steal and remix anything you find useful for your own blogs here.
