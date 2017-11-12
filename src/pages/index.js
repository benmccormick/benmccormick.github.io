import React from 'react';

import { HeadContent } from '../components/HeadContent';
import { WelcomeBox } from '../components/WelcomeBox';
import { fadeIn } from '../utils/react-helpers';
import {
  getSortedPosts,
  getPopularPosts,
  getWeeklyLinks,
} from '../utils/page-helpers';
import { HomeMenu } from '../components/HomeMenu';

class BlogIndex extends React.Component {
  componentDidMount() {
    fadeIn(this.indexContainer);
  }
  render() {
    const pages = this.props.data.allMarkdownRemark.edges;
    const sortedPosts = getSortedPosts(pages, 5);
    const popularPosts = getPopularPosts(pages, 5);
    const weeklyLinks = getWeeklyLinks(pages, 5);
    return (
      <div ref={el => (this.indexContainer = el)}>
        <HeadContent />
        <WelcomeBox />
        <HomeMenu
          sortedPosts={sortedPosts}
          popularPosts={popularPosts}
          weeklyLinks={weeklyLinks}
        />
      </div>
    );
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
