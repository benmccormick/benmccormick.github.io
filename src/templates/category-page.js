import PropTypes from 'prop-types';
import React from 'react';
import CategoryArchive from '../components/CategoryArchive';
import { getSortedPosts } from '../utils/page-helpers';

const CategoryPage = ({ data, pathContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const sortedPosts = getSortedPosts(posts);
  return (
    <CategoryArchive pages={sortedPosts} categoryKey={pathContext.category} />
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;