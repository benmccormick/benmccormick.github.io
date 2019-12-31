import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../components/Layout';

import { HeadContent } from '../components/HeadContent';
import { WelcomeBox } from '../components/WelcomeBox';
import {
  getSortedPosts,
  getSortedReviews,
  getTopicLinks,
} from '../utils/page-helpers';
import { HomeMenu } from '../components/HomeMenu';
import '../utils/kusty';

class BlogIndex extends React.Component {
  render() {
    const pages = this.props.data.allMarkdownRemark.edges;
    const featuredTopics = this.props.data.site.siteMetadata.featuredTopics;
    const sortedPosts = getSortedPosts(pages, 5);
    const sortedReviews = getSortedReviews(pages, 5);

    return (
      <Layout>
        <div ref={el => (this.indexContainer = el)}>
          <HeadContent />
          <WelcomeBox />
          <HomeMenu sortedPosts={sortedPosts} sortedReviews={sortedReviews} />
        </div>
      </Layout>
    );
  }
}

BlogIndex.propTypes = {
  route: PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
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
            description
            isDraft
            category
            image
            amazonlink
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
