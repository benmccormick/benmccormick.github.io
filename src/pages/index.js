import PropTypes from 'prop-types';
import React from 'react';

import { HeadContent } from '../components/HeadContent';
import { WelcomeBox } from '../components/WelcomeBox';
import { fadeIn } from '../utils/react-helpers';
import {
  getSortedPosts,
  getPopularPosts,
  getWeeklyLinks,
  getTopicLinks,
} from '../utils/page-helpers';
import { HomeMenu } from '../components/HomeMenu';

class BlogIndex extends React.Component {
  componentDidMount() {
    fadeIn(this.indexContainer);
  }
  render() {
    const pages = this.props.data.allMarkdownRemark.edges;
    const featuredTopics = this.props.data.site.siteMetadata.featuredTopics;
    const sortedPosts = getSortedPosts(pages, 5);
    const popularPosts = getPopularPosts(pages, 5);
    const weeklyLinks = getWeeklyLinks(pages, 5);
    const topicLinks = getTopicLinks(featuredTopics, 5);
    return (
      <div ref={el => (this.indexContainer = el)}>
        <HeadContent />
        <WelcomeBox />
        <HomeMenu
          sortedPosts={sortedPosts}
          popularPosts={popularPosts}
          weeklyLinks={weeklyLinks}
          topicLinks={topicLinks}
        />
      </div>
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
