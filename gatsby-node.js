const {copyFile, mkFile} = require('./src/utils/file_system');
const get = require('lodash/get');
const sm = require('sitemap');
const {buildFeeds} = require('./feeds');
const path = require('path');

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

exports.onPostBuild = function(pages, callback) {
  buildFeeds(pages);
  generateSiteMap(pages);
  copySW(
    () => copyCNAME(
      () => copyManifest(callback)
    )
  );
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
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (get(node, 'frontmatter.path')) {
      slug = node.frontmatter.path;
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }
    // Add slug as a field on the node.
    createNodeField({ node, name: 'slug', value: slug });
  }
};


exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const pages = [];
    const blogPost = path.resolve('src/templates/blog-post.js');
    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
        `
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        result.data.allMarkdownRemark.edges.forEach(edge => {

          createPage({
            path: edge.node.fields.slug, // required
            component: blogPost,
            context: {
              slug: edge.node.fields.slug,
            },
          });
        });

        return;
      })
    );
  });
};
