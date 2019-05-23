import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { HeadContent } from '../components/HeadContent';
import { getSortedPosts } from '../utils/page-helpers';
import LinkList from '../components/LinkList';
import Layout from '../components/Layout';

class LionsArchive extends React.Component {
  render() {
    // Sort pages.
    const posts = this.props.data.allMarkdownRemark.edges;
    const sortedPosts = getSortedPosts(posts, Infinity, true).filter(
      post => post.data.blog === 'lions'
    );
    return (
      <Layout>
        <div ref={el => (this.archiveContainer = el)}>
          <HeadContent keywords="blog,articles,posts,javascript,software tools,web development" />
          <LinkList pages={sortedPosts} title="Articles" showCategory={true} />
        </div>
      </Layout>
    );
  }
}

LionsArchive.propTypes = {
  route: PropTypes.object,
};

export default LionsArchive;

export const pageQuery = graphql`
  query LionsArchiveQuery {
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
            pageViews
            description
            category
            isDraft
            blog
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
