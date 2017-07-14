const get = require('lodash/get');
const { mkFile } = require('../src/utils/file_system');
const sm = require('sitemap');
const path = require('path');

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
              category: category.key
            }
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
      slug: edge.node.fields.slug
    }));
    return pages;
  });

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
              slug: edge.node.fields.slug
            }
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
    urls: pagesToSitemap(pages)
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
  generateSiteMap
};
