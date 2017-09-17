import React from 'react';
import { HeadContent } from '../components/HeadContent';
import { getSortedPosts } from '../utils/page-helpers';
import { fadeIn } from '../utils/react-helpers';
import LinkList from '../components/LinkList';

class CategoryArchive extends React.Component {
  componentDidMount() {
    fadeIn(this.archiveContainer);
  }
  render() {
    // Sort pages.
    const posts = this.props.data.allMarkdownRemark.edges;
    const sortedPosts = getSortedPosts(posts);
    return (
      <div ref={el => (this.archiveContainer = el)}>
        <HeadContent keywords="blog,articles,posts,javascript,software tools,web development" />
        <LinkList pages={sortedPosts} title="Articles" showCategory={true} />
      </div>
    );
  }
}

CategoryArchive.propTypes = {
  route: React.PropTypes.object,
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
