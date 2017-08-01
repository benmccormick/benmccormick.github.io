import React from 'react';
import Link from 'gatsby-link';
import sortBy from 'lodash/sortBy';
import take from 'lodash/take';
import parseInt from 'lodash/parseInt';
import get from 'lodash/get';
import Helmet from 'react-helmet';
// import { config } from 'config';
import include from 'lodash/includes';
import LinkList from '../components/LinkList';

class BlogIndex extends React.Component {
  render() {
    // Sort pages.
    const posts = this.props.data.allMarkdownRemark.edges;
    const sortedPages = take(
      sortBy(posts, page => get(page, 'node.frontmatter.date'))
        .reverse()
        .filter(page => get(page, 'node.frontmatter.layout') === 'post')
        .map(p => ({ data: p.node.frontmatter, path: p.node.fields.slug })),
      10
    );
    const popularPages = take(
      sortBy(posts, page =>
        parseInt(get(page, 'node.frontmatter.last30pageViews'))
      )
        .reverse()
        .filter(
          page =>
            !include(page.node.frontmatter.path, '/404') &&
            !page.node.frontmatter.dontfeature &&
            get(page, 'node.frontmatter.layout') === 'post'
        )
        .map(p => ({ data: p.node.frontmatter, path: p.node.fields.slug })),
      6
    );
    return (
      <div>
        <Helmet
          // title = {config.blogTitle}
          title={'benmccormick.org'}
          meta={[
            {
              name: 'description',
              content: "Ben McCormick's blog on JavaScript and Web Development",
            },
            {
              name: 'keywords',
              content: 'blog javascript development code react vim',
            },
          ]}
        />
        <LinkList
          title="Recent Articles"
          pages={sortedPages}
          showCategory={false}
        />
        <LinkList
          title="Popular Articles"
          pages={popularPages}
          showCategory={false}
        />
        <LinkList
          title="Past Series"
          pages={[
            {
              data: {
                title: 'Marionette: Explained',
                description:
                  'An in depth exploration of how to build better Backbone apps with Marionette',
              },
              path: '/marionette-explained/',
            },
            {
              data: {
                title: 'Learning Vim in 2014',
                description: 'A modern look at text editing with Vim',
              },
              path: '/learning-vim-in-2014/',
            },
          ]}
          showCategory={false}
          showDate={false}
        />
        <div
          style={{
            marginBottom: '2rem',
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              fontFamily: 'brandon-grotesque, Helvetica, sans-serif',
            }}
            to={'/archive/'}
          >
            See More Articles »
          </Link>
        </div>
      </div>
    );
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            layout
            dontfeature
            last30pageViews
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
