import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { HeadContent } from '../components/HeadContent';
import { getSortedPosts } from '../utils/page-helpers';
import LinkList from '../components/LinkList';
import Layout from '../components/Layout';
import '../utils/kusty';

class CategoryArchive extends React.Component {
  render() {
    // Sort pages.
    const posts = this.props.data.allMarkdownRemark.edges;
    const sortedPosts = getSortedPosts(posts, Infinity, true);
    return (
      <Layout>
        <div ref={el => (this.archiveContainer = el)}>
          <HeadContent keywords="blog,articles,posts,javascript,software tools,web development" />
          <LinkList
            pages={sortedPosts}
            title="Blog"
            showCategory={true}
            showPopular={true}
            showTrending={true}
            useBox={true}
          />
        </div>
      </Layout>
    );
  }
}

CategoryArchive.propTypes = {
  route: PropTypes.object,
};

export default CategoryArchive;

export const pageQuery = graphql`
  query ArchiveQuery {
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
