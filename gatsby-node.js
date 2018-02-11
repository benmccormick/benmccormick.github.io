const { buildFeeds } = require('./server-src/feeds');
const {
  createCategoryArchives,
  createTopicArchives,
  getPages,
  generateSiteMap,
  addSlugToPage,
  createBlogPosts,
} = require('./server-src/page-processing');
const { copyCNAME, copyManifest } = require('./server-src/files');

exports.onPostBuild = ({ graphql, boundActionCreators }) => {
  return getPages(graphql)
    .then(pages => {
      if (!pages) {
        return false;
      }
      buildFeeds(pages);
      generateSiteMap(pages);
    })
    .then(copyCNAME, () => 'Failed before we could copy over the CNAME')
    .then(copyManifest, () => 'Failed before we could copy over the manifest');
};

exports.modifyWebpackConfig = function(config, stage) {
  config.config.removeLoader('svg');
  config.config.loader('svg', function(cfg) {
    cfg.test = /\.svgi$/;
    cfg.loader = 'svg-inline';
    return cfg;
  });
  return config;
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  addSlugToPage(node, getNode, createNodeField);
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  let blogPostPromise = createBlogPosts(graphql, createPage);
  let categoryArchivePromise = createCategoryArchives(graphql, createPage);
  let topicArchivePromise = createTopicArchives(graphql, createPage);
  return Promise.all([
    blogPostPromise,
    categoryArchivePromise,
    topicArchivePromise,
  ]);
};
