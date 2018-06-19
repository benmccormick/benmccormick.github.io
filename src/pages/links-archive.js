import PropTypes from 'prop-types';
import React from 'react';
import { HeadContent } from '../components/HeadContent';
import Layout from '../components/Layout';
import { getWeeklyLinks } from '../utils/page-helpers';
import LinkList from '../components/LinkList';

class LinksArchive extends React.Component {
  render() {
    // Sort pages.
    let { history } = this.props;
    const posts = this.props.data.allMarkdownRemark.edges;
    const weeklyLinks = getWeeklyLinks(posts);
    return (
      <Layout history={history}>
        <div ref={el => (this.archiveContainer = el)}>
          <HeadContent keywords="blog,articles,posts,javascript,software tools,web development" />
          <LinkList
            pages={weeklyLinks}
            title="Past Weekly Links"
            showCategory={false}
            showPopular={false}
            showTrending={false}
            showDescriptions={true}
          />
        </div>
      </Layout>
    );
  }
}

LinksArchive.propTypes = {
  route: PropTypes.object,
};

export default LinksArchive;

export const pageQuery = graphql`
  query LinksArchiveQuery {
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
