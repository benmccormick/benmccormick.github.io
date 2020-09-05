import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { HeadContent } from '../components/HeadContent';
import { getSortedReviews } from '../utils/page-helpers';
import Layout from '../components/Layout';
import get from 'lodash/get';
import LinkList from '../components/LinkList';

class ReviewsArchive extends React.Component {
  render() {
    // Sort pages.
    const posts = this.props.data.allMarkdownRemark.edges;
    const sortedPosts = getSortedReviews(posts);
    let reviewRegex = /Book Review: (.+)/;
    let getReviewTitle = page => {
      let title = get(page, 'data.title') || page.path;
      let result = reviewRegex.exec(title);
      return result ? result[1] : title;
    };
    return (
      <Layout>
        <div ref={el => (this.archiveContainer = el)}>
          <HeadContent keywords="blog,articles,posts,javascript,software tools,web development" />
          <LinkList
            pages={sortedPosts}
            title="Book Reviews"
            titleFn={page => getReviewTitle(page)}
          />
        </div>
      </Layout>
    );
  }
}

ReviewsArchive.propTypes = {
  route: PropTypes.object,
};

export default ReviewsArchive;

export const pageQuery = graphql`
  query ReviewsQuery {
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
            amazonlink
            image
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
