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
