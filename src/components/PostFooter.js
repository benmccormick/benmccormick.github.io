import PropTypes from 'prop-types';
import React from 'react';
import RecommendedPosts from './RecommendedPosts';
import '../css/subscribe.css';

class PostFooter extends React.Component {
  render() {
    const { recommendedPosts } = this.props;

    return <RecommendedPosts recommendedPosts={recommendedPosts} />;
  }
}

PostFooter.propTypes = {
  post: PropTypes.object.isRequired,
  recommendedPosts: PropTypes.array,
};

export default PostFooter;
