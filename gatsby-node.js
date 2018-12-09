const { buildFeeds } = require('./server-src/feeds');
const {
  createCategoryArchives,
  createTopicArchives,
  getPages,
  generateSiteMap,
  addSlugToPage,
  createBlogPosts,
  createNewsletters,
} = require('./server-src/page-processing');
const { createNewsletterNodes } = require('./server-src/newsletters');
const { copyCNAME, copyManifest } = require('./server-src/files');

exports.onPostBuild = ({ graphql, actions }) => {
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

exports.onCreateWebpackConfig = function({ actions }) {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.svgi$/,
          use: 'svg-inline-loader',
        },
      ],
    },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  addSlugToPage(node, getNode, createNodeField);
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  let blogPostPromise = createBlogPosts(graphql, createPage);
  let categoryArchivePromise = createCategoryArchives(graphql, createPage);
  let topicArchivePromise = createTopicArchives(graphql, createPage);
  let newsletterPromise = createNewsletters(graphql, createPage);
  return Promise.all([
    blogPostPromise,
    categoryArchivePromise,
    topicArchivePromise,
    newsletterPromise,
  ]);
};

exports.sourceNodes = ({
  graphql,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  createNewsletterNodes(graphql, createNode, createNodeId, createContentDigest);
};
