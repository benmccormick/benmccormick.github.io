const { mkFile } = require('../src/utils/file_system');
const sm = require('sitemap');
const path = require('path');
const groupBy = require('lodash/groupBy');
const get = require('lodash/get');
const compact = require('lodash/compact');
const pick = require('lodash/pick');
const take = require('lodash/take');

const createTopicArchives = async (graphql, createPage) => {
  const topicPage = path.resolve('src/templates/topic-page.js');
  // Query for all markdown "nodes" and for the slug we previously created.
  const result = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                readNext
                topics
                category
                key
                title
                description
                layout
                path
                date
                dontfeature
                isDraft
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
  );
  if (result.errors) {
    console.log(result.errors);
    throw result.errors;
  }
  let { edges } = result.data.allMarkdownRemark;
  const topics = {};

  // Loop through all nodes (our markdown posts) and add the tags to our post object.

  edges
    .filter(post => !post.node.frontmatter.isDraft)
    .forEach(post => {
      if (post.node.frontmatter.topics) {
        post.node.frontmatter.topics.forEach(topic => {
          if (!topics[topic]) {
            topics[topic] = [];
          }
          topics[topic].push(post);
        });
      }
    });
  console.log(JSON.stringify(Object.keys(topics), null, 2));
  Object.keys(topics).forEach(topicName => {
    const posts = topics[topicName];
    createPage({
      path: `/topics/${topicName}`,
      component: topicPage,
      context: {
        posts,
        topic: topicName,
      },
    });
  });
  return;
};

const createCategoryArchives = async (graphql, createPage) => {
  const categoryPage = path.resolve('src/templates/category-page.js');
  // Query for all markdown "nodes" and for the slug we previously created.
  const result = await graphql(
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
  );
  if (result.errors) {
    console.log(result.errors);
    throw result.errors;
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
};
const getPages = async graphql => {
  const result = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                date
                layout
                title
                isDraft
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
  );
  if (result.errors) {
    throw result.errors;
  }
  let pages = result.data.allMarkdownRemark.edges
    .filter(edge => !edge.node.frontmatter.isDraft)
    .map(edge => ({
      date: edge.node.frontmatter.date,
      title: edge.node.frontmatter.title,
      layout: edge.node.frontmatter.layout,
      html: edge.node.html,
      slug: edge.node.fields.slug,
    }));
  return pages;
};

const getRelatedPosts = (keyMap, categoryMap) => node => {
  let readNext = node.frontmatter.readNext
    ? node.frontmatter.readNext.split(',').map(s => s.trim())
    : null;
  let nodes = readNext
    ? compact(readNext.map(key => get(keyMap, [key, 0])))
    : categoryMap[node.frontmatter.category];
  let posts = nodes.map(n => ({
    path: n.fields.slug,
    data: pick(n.frontmatter, [
      'title',
      'path',
      'description',
      'date',
      'category',
    ]),
  }));
  return take(posts, 3);
};

const createBlogPosts = async (graphql, createPage) => {
  const blogPost = path.resolve('src/templates/blog-post.js');
  // Query for all markdown "nodes" and for the slug we previously created.
  const result = await graphql(
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
                isDraft
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    console.log(result.errors);
    throw result.errors;
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
};

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
  try {
    const sitemap = sm.createSitemap({
      hostname: 'https://benmccormick.org',
      cacheTime: '60000',
      urls: pagesToSitemap(pages),
    });
    console.log('Generating sitemap.xml');
    mkFile('/public/sitemap.xml', sitemap.toString());
  } catch (e) {
    console.log('ERROR', e);
  }
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
  createTopicArchives,
  getPages,
  addSlugToPage,
  createBlogPosts,
  generateSiteMap,
};
