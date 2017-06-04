---
title: "Adding RSS, Atom, and JSON Feed to Gatsby"
date: "2017-06-04 01:55:00+00:00"
layout: "post"
path: "/2017/06/03/rss-atom-json-gatsby/"
description: "How to support subscription feeds with Gastby"
keywords: "rss atom json feed gatsby"
category: "meta"
key: "rss-atom-json-feeds"
readNext: "new-look-2016,atom-tips,mariana"
pageViews: "0"
last30pageViews: "0"
---

For the last few months, this blog has been written in [Gatsby](https://github.com/gatsbyjs/gatsby), a static site generator for JavaScript.  One of the first problems I had to solve when migrating the blog was how to maintain my RSS feed, since Gatsby doesn't have any built in concept of an RSS feed.  This issue came up again this week as I decided to implement the new [JSON Feed](https://jsonfeed.org/) spec and give folks an additional option for subscribing to this blog.  Fortunately this turns out to be a pretty easy problem to solve because of the excellent npm module [feed](https://github.com/jpmonette/feed).

*feed* is an npm module that takes a bunch of information about a blog and its posts, and normalizes them into various syndication feed format.  Here's what setting up a feed option looks like for this blog:

```javascript
const fs = require('fs');
const Feed = require('feed');
const filter = require('lodash/filter');
const sortBy = require('lodash/sortBy');
const forEach = require('lodash/forEach');
const get = require('lodash/get');
const moment = require('moment');
const markdownIt = require('markdown-it');
const frontmatter = require('front-matter');


//markdownIt is a markdown parser that takes my raw md files and
//translates them into HTML that we can use in the feed
const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
});


// getPageContent is a function to help us grab the html content from a post path
const getPageContent = page => {
  let file = fs.readFileSync(__dirname + '/pages/' + page.requirePath, 'utf-8');
  let body = md.render(frontmatter(file).body);
  // handle local links
  return body.replace(/src="\//g, 'src="http://benmccormick.org/');
};

// build feed is our main function to build a `Feed` object which we
// can then serialize into various formats
const buildFeed = pages => {
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
  // ignore pages (non posts) and posts without titles (shouldn't be any)
  pages = filter(pages, f => (
    !get(f, 'data.layout') === 'page' || !get(f, 'data.title')
  ));
  // we only want the last 10 articles to show up in the feed
  pages = sortBy(pages, page => get(page, 'data.date'));
  pages = pages.reverse();
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
        link: 'https://benmccormick.org'
      }
    ]
  }));
  feed.addContributor({
    name: 'Ben McCormick',
    email: 'ben@benmccormick.org',
    link: 'https://benmccormick.org'
  });
  return feed;
};
```

Now we have a `buildFeed` method that takes a list of pages and generates a feed object.  Then we can use the feed object we've created to actually build write some files.  We'll trigger that in the `postBuild` callback of `gatsby-node`.  Here was my first version to support RSS and Atom:


```javascript

//mkDir and mkFile are just light wrappers around node's file system APIs
let createRSSFolder = () => mkDir('/public/rss/');
let generateAtomFeed = (feed) => mkFile('/public/atom.xml', feed.atom1());
let generateRSS = (feed) => mkFile('/public/rss/index.xml', feed.rss2());

exports.postBuild = pages => {
  let feed = buildFeed(pages);
  createRSSFolder();
  generateAtomFeed(feed);
  generateRSS(feed);
};
```

Prior to this week, `feed` didn't support JSON Feed, so I had stopped here.  But because JSON Feed is super simple to implement (its just JSON!), I decided to try to add it to `feed` this week.  It turned out it was as simple as adding a single function that looks like this:

```javascript
json1() {
   const { options, items } = this
   let feed = {
     version: 'https://jsonfeed.org/version/1',
     title: options.title,
   };

   if (options.link) {
     feed.home_page_url = options.link;
   }

   if (options.feedLinks && options.feedLinks.json) {
     feed.feed_url = options.feedLinks.json;
   }

   if (options.description) {
     feed.description = options.description;
   }


   if (options.image) {
     feed.icon = options.image;
   }

   if (options.author) {
     feed.author = {};
     if (options.author.name) {
         feed.author.name = options.author.name;
     }
     if (options.author.link) {
         feed.author.url = options.author.link;
     }
   }
   feed.items = items.map(item => {
     let feedItem = {
       id: item.id,
       // json_feed distinguishes between html and text content
       // but since we only take a single type, we'll assume HTML
       html_content: item.content,
     }
     if (item.link) {
       feedItem.url = item.link;
     }
     if(item.title) {
       feedItem.title = item.title;
     }
     if (item.description) {
       feedItem.summary = item.description;
     }

     if (item.image) {
       feedItem.image = item.image
     }

     if (item.date) {
       feedItem.date_modified = this.ISODateString(item.date);
     }
     if (item.published) {
       feedItem.date_published = this.ISODateString(item.published);
     }

     if (item.author) {
       let author = item.author;
       if (author instanceof Array) {
         // json feed only supports 1 author per post
         author = author[0];
       }
       feedItem.author = {};
       if (author.name) {
           feedItem.author.name = author.name;
       }
       if (author.link) {
           feedItem.author.url = author.link;
       }
     }
     return feedItem;
   });

   return JSON.stringify(feed, null, 4);
 }
 ```

 My [pull request](https://github.com/jpmonette/feed/pull/56/files) was accepted, so feed v1.1.0 now supports JSON feed and my final code to add [rss](http://benmccormick.org/rss/), [atom](http://benmccormick.org/atom.xml), and [json](http://benmccormick.org/feed.json) feed to this site looks like this:

 ```javascript
const fs = require('fs');
const Feed = require('feed');
const filter = require('lodash/filter');
const sortBy = require('lodash/sortBy');
const forEach = require('lodash/forEach');
const get = require('lodash/get');
const moment = require('moment');
const markdownIt = require('markdown-it');
const frontmatter = require('front-matter');
const {mkDir, mkFile} = require('./utils/file_system');


const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const extractMarkdownContent = file => {
  let body = md.render(frontmatter(file).body);
  // handle local links
  return body.replace(/src="\//g, 'src="http://benmccormick.org/');

};

const getPageContent = page => {
  let file = fs.readFileSync(__dirname + '/pages/' + page.requirePath, 'utf-8');
  return extractMarkdownContent(file);
};

const buildFeed = pages => {
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
  // ignore pages (non posts) and posts without titles (shouldn't be any)
  pages = filter(pages, f => (
    !get(f, 'data.layout') === 'page' || !get(f, 'data.title')
  ));
  // we only want the last 10 articles to show up in the feed
  pages = sortBy(pages, page => get(page, 'data.date'));
  pages = pages.reverse();
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
        link: 'https://benmccormick.org'
      }
    ]
  }));
  feed.addContributor({
    name: 'Ben McCormick',
    email: 'ben@benmccormick.org',
    link: 'https://benmccormick.org'
  });
  return feed;
};

let createRSSFolder = () => mkDir('/public/rss/');
let generateAtomFeed = (feed) => mkFile('/public/atom.xml', feed.atom1());
let generateRSS = (feed) => mkFile('/public/rss/index.xml', feed.rss2());
let generateJSONFeed = (feed) => mkFile('/public/feed.json', feed.json1());

 exports.postBuild = pages => {
   let feed = buildFeed(pages);
   createRSSFolder();
   generateAtomFeed(feed);
   generateRSS(feed);
   generateJSONFeed(feed);
};
```

### More Resources

- You can see the whole spec for [JSON Feed][jsonfeed] on their [site][jsonfeed].  It really is remarkably simple.  They also have a list of implementations and example sites.


[jsonfeed]: https://jsonfeed.org/
