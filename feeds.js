const fs = require('fs');
const Feed = require('feed');
const filter = require('lodash/filter');
const sortBy = require('lodash/sortBy');
const forEach = require('lodash/forEach');
const get = require('lodash/get');
const moment = require('moment');
const markdownIt = require('markdown-it');
const frontmatter = require('front-matter');
const footnotes = require('markdown-it-footnote');
const attrs = require('markdown-it-attrs');
const {mkDir, mkFile} = require('./utils/file_system');

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
}) .use(footnotes) .use(attrs);

const extractMarkdownContent = file => {
  let body = md.render(frontmatter(file).body);
  // handle local links
  return body.replace(/src="\//g, 'src="http://benmccormick.org/');

};

const getPageContent = page => {
  let file = fs.readFileSync(__dirname + '/pages/' + page.requirePath, 'utf-8');
  return extractMarkdownContent(file);
};

let buildFeed = pages => {
  let feed = new Feed({
    title: 'benmccormick.org',
    description: 'A blog by Ben McCormick',
    link: 'http://benmccormick.org',
    id: 'http://benmccormick.org',
    copyright: 'All rights reserved 2016, Ben McCormick',
    feedLinks: {
      atom: 'http://benmccormick.org/atom.xml',
      json: 'http://benmccormick.org/feed.json',
    },
    author: {
      name: 'Ben McCormick',
      email: 'ben@benmccormick.org'
    }
  });
  pages = sortBy(pages, page => get(page, 'data.date'));
  pages = pages.reverse();
  pages = filter(pages, f => (
    !get(f, 'data.layout') === 'page' || !get(f, 'data.title')
  ));
  pages = pages.slice(0, 10);

  forEach(pages, page => feed.addItem({
    title: page.data.title,
    id: 'https://benmccormick.org' + page.path,
    link: 'https://benmccormick.org' + page.path,
    date: moment(page.data.date).toDate(),
    content: getPageContent(page),
    author: [
      {
        name: 'Ben McCormick',
        email: 'ben@benmccormick.org',
        link: 'http://benmccormick.org'
      }
    ]
  }));
  feed.addContributor({
    name: 'Ben McCormick',
    email: 'ben@benmccormick.org',
    link: 'http://benmccormick.org'
  });
  return feed;
};


let createRSSFolder = () => mkDir('/public/rss/');
let generateAtomFeed = (feed) => mkFile('/public/atom.xml', feed.atom1());
let generateRSS = (feed) => mkFile('/public/rss/index.xml', feed.rss2());
let generateJSONFeed = (feed) => mkFile('/public/feed.json', feed.json1());

exports.buildFeeds = function(pages) {
  let feed = buildFeed(pages);
  createRSSFolder();
  generateAtomFeed(feed);
  generateRSS(feed);
  generateJSONFeed(feed);
};
