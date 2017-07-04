import React from 'react';
import CategoryArchive from '../components/CategoryArchive';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';


const CategoryPage = ({data, pathContext}) => {
  const posts = data.allMarkdownRemark.edges;
  const sortedPages = sortBy(posts, page => get(page, 'node.frontmatter.date'))
          .reverse()
          .filter(page => (
              (get(page, 'node.frontmatter.layout') === 'post')
          )
  ).map(p => ({data: p.node.frontmatter, path: p.node.fields.slug}));
  return <CategoryArchive
    pages = {sortedPages}
    categoryKey = {pathContext.category}
  />;
};

CategoryPage.propTypes = {
  route: React.PropTypes.object,
};

export default CategoryPage;

export const pageQuery = graphql`
query PostsByCategory {
  allMarkdownRemark(limit: 2000, sort: {fields: [frontmatter___date], order: DESC}) {
    edges{
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
