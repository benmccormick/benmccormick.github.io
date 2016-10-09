const Feed = require('feed');
const filter = require('lodash/filter');
const sortBy = require('lodash/sortBy');
const moment = require('moment');
const MarkdownIt = require('markdown-it');
const fs = require('fs');
const frontmatter = require('front-matter');

const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});


let buildFeed = (pages) => {
  let feed = new Feed({
    title: 'benmccormick.org',
    description: 'A blog by Ben McCormick',
    link: 'http://benmccormick.org',
    id: 'http://benmccormick.org',
    copyright: 'All rights reserved 2016, Ben McCormick',
    author: {
      name: 'Ben McCormick',
      email: 'ben@benmccormick.org'
    }
  });
  pages = sortBy(pages, function(page) {
    var ref;
    return (ref = page.data) != null ? ref.date : void 0;
  }).reverse();

  let ref = filter(pages, function(f) {
    var ref, ref1;
    if (f.data.layout === 'page') {
      return false;
    }
    return (((ref = f.data) != null ? ref.title : void 0) != null) && !((ref1 = f.data) != null ? ref1.draft : void 0);
  }).slice(0, 10);

  for (i = 0, len = ref.length; i < len; i++) {
    page = ref[i];
    feed.addItem({
      title: page.data.title,
      id: "https://benmccormick.org" + page.path,
      link: "https://benmccormick.org" + page.path,
      date: moment(page.data.date).toDate(),
      content: md.render(frontmatter(fs.readFileSync(__dirname + "/pages/" + page.requirePath, 'utf-8')).body),
      author: [
        {
          name: "Ben McCormick",
          email: "ben@benmccormick.org",
          link: "http://benmccormick.org"
        }
      ]
    });
  }
  feed.addContributor({
      name: "Ben McCormick",
      email: "ben@benmccormick.org",
      link: "http://benmccormick.org"
  });
  return feed;
};

let createRSSFolder = () => {
    try {
        fs.mkdirSync(__dirname + "/public/rss/");
    } catch (e) {
        //this is fine, it may fail if the file already exists
    }
};
let generateAtomFeed = (feed) => {
  return fs.writeFileSync(__dirname + "/public/atom.xml", feed.render('atom-1.0'));
};
let generateRSS = (feed) => {
  return fs.writeFileSync(__dirname + "/public/rss/index.xml", feed.render('rss-2.0'));
};

exports.postBuild = function(pages, callback) {
    let feed = buildFeed(pages)
    createRSSFolder();
    generateAtomFeed(feed);
    generateRSS(feed);
  return callback();
};
