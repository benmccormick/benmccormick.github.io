import PropTypes from 'prop-types';
import React from 'react';
import { HeadContent } from '../components/HeadContent';
import { getSortedPosts } from '../utils/page-helpers';
import LinkList from '../components/LinkList';
import Layout from '../components/Layout';
import { TrendingIcon, FavoriteIcon } from '../components/PageLink';
import glamorous from 'glamorous';

const Legend = glamorous.div({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  //slightly dirty hack to get the Legend
  // aligned with the title
  marginTop: '-50px',
  paddingBottom: '30px',
  '> * ': {
    marginLeft: '10px',
  },
});

class CategoryArchive extends React.Component {
  render() {
    let { history, data } = this.props;
    // Sort pages.
    const posts = data.allMarkdownRemark.edges;
    const topics = data.site.siteMetadata.featuredTopics;
    const sortedPosts = getSortedPosts(posts);
    return (
      <Layout history={history} topics={topics}>
        <div ref={el => (this.archiveContainer = el)}>
          <HeadContent keywords="blog,articles,posts,javascript,software tools,web development" />
          <LinkList
            pages={sortedPosts}
            title="Articles"
            description={
              <Legend>
                <TrendingIcon /> Trending <FavoriteIcon /> Popular
              </Legend>
            }
            showCategory={true}
            showPopular={true}
            showTrending={true}
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
    site {
      siteMetadata {
        featuredTopics
      }
    }
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
