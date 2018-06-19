import PropTypes from 'prop-types';
import React from 'react';
import CategoryArchive from '../components/CategoryArchive';
import { getSortedPosts } from '../utils/page-helpers';
import Layout from '../components/Layout';

const CategoryPage = ({ data, pageContext, history }) => {
  const posts = data.allMarkdownRemark.edges;
  const sortedPosts = getSortedPosts(posts);
  return (
    <Layout history={history}>
      <CategoryArchive pages={sortedPosts} categoryKey={pageContext.category} />
    </Layout>
  );
};

CategoryPage.propTypes = {
  route: PropTypes.object,
};

export default CategoryPage;

export const pageQuery = graphql`
  query PostsByCategory {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            category
            title
            description
            date
            dontfeature
            path
            layout
            key
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
