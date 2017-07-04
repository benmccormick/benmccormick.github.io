import React from 'react';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import LinkList from '../components/LinkList';

class CategoryArchive extends React.Component {
  render() {
    // Sort pages.
    const posts = this.props.data.allMarkdownRemark.edges;
    const sortedPages = sortBy(posts, page =>
      get(page, 'node.frontmatter.date')
    )
      .reverse()
      .filter(page => get(page, 'node.frontmatter.layout') === 'post')
      .map(p => ({ data: p.node.frontmatter, path: p.node.fields.slug }));
    return (
      <div>
        <Helmet
          // title = {config.blogTitle}
          title={'benmccormick.org'}
          meta={[
            { name: 'description', content: "Ben McCormick's blog" },
            { name: 'keywords', content: 'blog, articles' }
          ]}
        />
        <LinkList pages={sortedPages} title="Articles" showCategory={true} />
      </div>
    );
  }
}

CategoryArchive.propTypes = {
  route: React.PropTypes.object
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
            description
            category
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
