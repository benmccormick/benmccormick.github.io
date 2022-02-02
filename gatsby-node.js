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

exports.onPostBuild = ({ graphql, actions }) => {
  return getPages(graphql)
    .then(pages => {
      if (!pages) {
        console.error('NO PAGES :(');
        return false;
      }
      console.log('¯_(ツ)_/¯');
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
  return Promise.all([
    blogPostPromise,
    categoryArchivePromise,
    topicArchivePromise,
  ]);
};
