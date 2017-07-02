<<<<<<< HEAD
const Feed = require('feed');
const filter = require('lodash/filter');
const sortBy = require('lodash/sortBy');
const moment = require('moment');
const markdownIt = require('markdown-it');
const fs = require('fs');
const frontmatter = require('front-matter');
const copyFile = require('./src/utils/file_system').copyFile;
=======
const {copyFile, mkFile} = require('./utils/file_system');
>>>>>>> master
const sm = require('sitemap');
const {buildFeeds} = require('./feeds');

function pagesToSitemap(pages) {
  const urls = pages.map((p) => {
    if (p.path !== undefined) {
      return {
        url: p.path,
        changefreq: 'daily',
        priority: 0.7
      };
    }
  });
  // remove undefined (template pages)
  return urls.filter(u => u !== undefined);
}

function generateSiteMap(pages) {
  const sitemap = sm.createSitemap({
    hostname: 'https://benmccormick.org',
    cacheTime: '60000',
    urls: pagesToSitemap(pages),
  });
  console.log('Generating sitemap.xml');
  mkFile('/public/sitemap.xml', sitemap.toString());
}


let copyCNAME = (cb) => {
  copyFile('/pages/CNAME', '/public/CNAME', err => err ? cb(false) : cb());
};

let copyManifest = (cb) => {
  copyFile('/pages/manifest.json',
    '/public/manifest.json', err => err ? cb(false) : cb());
};

let copySW = (cb) => {
  copyFile('/pages/sw.es6', '/public/sw.js', err => err ? cb(false) : cb());
};

<<<<<<< HEAD
exports.onPostBuild = function(pages, callback) {
  let feed = buildFeed(pages);
  createRSSFolder();
  generateAtomFeed(feed);
  generateRSS(feed);
=======
exports.postBuild = (pages, callback) => {
  buildFeeds(pages);
>>>>>>> master
  generateSiteMap(pages);
  copySW(
    () => copyCNAME(
      () => copyManifest(callback)
    )
  );
};

<<<<<<< HEAD
exports.modifyWebpackConfig = function(config, stage) {
  config.config.removeLoader('svg');
  config.config.loader('svg', function(cfg) {
=======
exports.modifyWebpackConfig = (config, stage) => {
  config.removeLoader('svg');
  config.loader('svg', function(cfg) {
>>>>>>> master
    cfg.test = /\.svgi$/;
    cfg.loader = 'svg-inline';
    return cfg;
  });
  return config;
};
