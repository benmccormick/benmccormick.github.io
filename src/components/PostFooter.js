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
  post: React.PropTypes.object.isRequired,
  recommendedPosts: React.PropTypes.array,
};

export default PostFooter;
