const { Feed } = require('feed');
const filter = require('lodash/filter');
const sortBy = require('lodash/sortBy');
const forEach = require('lodash/forEach');
const get = require('lodash/get');
const includes = require('lodash/includes');
const moment = require('moment');
const { mkDir, mkFile } = require('../src/utils/file_system');

let buildFeed = pages => {
  try {
    let feed = new Feed({
      title: 'benmccormick.org',
      description: 'A blog by Ben McCormick',
      link: 'http://benmccormick.org',
      id: 'http://benmccormick.org',
      copyright: 'All rights reserved 2016, Ben McCormick',
      favicon: 'https://benmccormick.org/favicon.ico',
      image: 'https://benmccormick.org/logo.png',
      feedLinks: {
        atom: 'http://benmccormick.org/atom.xml',
        json: 'http://benmccormick.org/feed.json',
      },
      author: {
        name: 'Ben McCormick',
        email: 'ben@benmccormick.org',
      },
    });
    pages = sortBy(pages, page => new Date(get(page, 'date')));
    pages = pages.reverse();
    pages = filter(pages, p =>
      includes(['post', 'weekly-links', 'review'], get(p, 'layout'))
    );
    pages = pages.slice(0, 10);

    forEach(pages, page =>
      feed.addItem({
        title: page.title,
        id: 'https://benmccormick.org' + page.slug,
        link: 'https://benmccormick.org' + page.slug,
        date: moment(page.date).toDate(),
        content: page.html,
        author: [
          {
            name: 'Ben McCormick',
            email: 'ben@benmccormick.org',
            link: 'http://benmccormick.org',
          },
        ],
      })
    );
    feed.addContributor({
      name: 'Ben McCormick',
      email: 'ben@benmccormick.org',
      link: 'http://benmccormick.org',
    });
    return feed;
  } catch (e) {
    console.log('ERROR', e);
  }
};

let createRSSFolder = () => mkDir('/public/rss/');
let generateAtomFeed = feed => mkFile('/public/atom.xml', feed.atom1());
let generateRSS = feed => mkFile('/public/rss/index.xml', feed.rss2());
let generateJSONFeed = feed => mkFile('/public/feed.json', feed.json1());

exports.buildFeeds = pages => {
  let feed = buildFeed(pages);
  createRSSFolder();
  generateAtomFeed(feed);
  generateRSS(feed);
  generateJSONFeed(feed);
};
