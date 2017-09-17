const { mkFile } = require('../src/utils/file_system');
const sm = require('sitemap');
const path = require('path');
const groupBy = require('lodash/groupBy');
const get = require('lodash/get');
const compact = require('lodash/compact');
const sortBy = require('lodash/sortBy');
const pick = require('lodash/pick');
const take = require('lodash/take');

const createCategoryArchives = (graphql, createPage) =>
  new Promise((resolve, reject) => {
    const categoryPage = path.resolve('src/templates/category-page.js');
    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
        `
        {
          site {
            siteMetadata {
              categories {
                title
                description
                key
                icon
                subscribeText
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

        // Create category archives
        const categories = result.data.site.siteMetadata.categories;
        categories.forEach(category => {
          createPage({
            path: `category/${category.key}`, // required
            component: categoryPage,
            context: {
              category: category.key,
            },
          });
        });

        return;
      })
    );
  });
const getPages = graphql =>
  graphql(
    `
        {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  date
                  layout
                  title
                }
                html
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
      return false;
    }
    let pages = result.data.allMarkdownRemark.edges.map(edge => ({
      date: edge.node.frontmatter.date,
      title: edge.node.frontmatter.title,
      layout: edge.node.frontmatter.layout,
      html: edge.node.html,
      slug: edge.node.fields.slug,
    }));
    return pages;
  });

const getRelatedPosts = (keyMap, categoryMap) => node => {
  let readNext = node.frontmatter.readNext
    ? node.frontmatter.readNext.split(',').map(s => s.trim())
    : null;
  let nodes = readNext
    ? compact(readNext.map(key => get(keyMap, [key, 0])))
    : categoryMap[node.frontmatter.category];
  nodes = sortBy(nodes, 'frontmatter.date');
  nodes.reverse();
  let posts = nodes.map(n => ({
    path: n.fields.slug,
    data: pick(n.frontmatter, ['title', 'path', 'description', 'date']),
  }));
  return take(posts, 3);
};

const createBlogPosts = (graphql, createPage) =>
  new Promise((resolve, reject) => {
    const blogPost = path.resolve('src/templates/blog-post.js');
    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
        `
        {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  readNext
                  category
                  key
                  title
                  description
                  path
                  date
                  dontfeature
                }
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

        let { edges } = result.data.allMarkdownRemark;
        let nodes = edges.map(e => e.node);
        let keyMap = groupBy(nodes, 'frontmatter.key');
        let categoryMap = groupBy(nodes, 'frontmatter.category');
        let getRelatedPostsFromList = getRelatedPosts(keyMap, categoryMap);
        // Create blog posts pages.
        nodes.forEach(node => {
          createPage({
            path: node.fields.slug,
            component: blogPost,
            context: {
              slug: node.fields.slug,
              relatedPosts: getRelatedPostsFromList(node),
            },
          });
        });

        return;
      })
    );
  });

function pagesToSitemap(pages) {
  const urls = pages.map(p => {
    if (p.slug !== undefined) {
      return {
        url: p.slug,
        changefreq: 'daily',
        priority: 0.7,
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

const addSlugToPage = (node, getNode, createNodeField) => {
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

module.exports = {
  createCategoryArchives,
  getPages,
  addSlugToPage,
  createBlogPosts,
  generateSiteMap,
};
