const sortBy = require('lodash/sortBy');
const reduce = require('lodash/reduce');
const last = require('lodash/last');

const buildNewsletterHTML = (linksHTML, recentArticleNodes) => {
  return linksHTML;
};

const createNewsletterNodes = async (
  graphql,
  createNode,
  createNodeId,
  createContentDigest
) => {
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
                layout
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
  nodes = sortBy(nodes, 'frontmatter.date');
  nodes = reduce(
    nodes,
    (newsletters, node) => {
      if (
        node.frontmatter.layout === 'weekly-links' &&
        !node.frontmatter.isDraft
      ) {
        node.fields.recentArticles = [];
        newsletters.push(node);
      } else if (
        last(newsletters) &&
        node.frontmatter.layout === 'post' &&
        !node.frontmatter.isDraft
      ) {
        last(newsletters).fields.recentArticles.push(node);
      }
      return newsletters;
    },
    []
  );
  // Create blog posts pages.
  nodes.forEach((linksNode, idx) => {
    let newsletterNum = idx + 1;
    let newsletterData = {
      frontmatter: {
        key: `newsletter/${newsletterNum}`,
        title: `Newsletter #${newsletterNum}: ${linksNode.frontmatter.date}`,
        path: `newsletter/${newsletterNum}`,
        date: linksNode.frontmatter.date,
        issueNumber: newsletterNum,
      },
      html: buildNewsletterHTML(
        linksNode.html,
        linksNode.fields.recentArticles
      ),
      fields: {
        slug: linksNode.fields.slug,
      },
    };
    const newsletterString = JSON.stringify(newsletterData);
    const newsletterMeta = {
      id: createNodeId(`data-for-${newsletterData.key}`),
      parent: null,
      children: [],
      internal: {
        type: `Newsletter`,
        mediaType: `text/html`,
        content: newsletterString,
        contentDigest: createContentDigest(newsletterString),
      },
    };
    const node = Object.assign({}, newsletterData, newsletterMeta);
    createNode(node);
  });

  return;
};

module.exports = {
  createNewsletterNodes,
};
