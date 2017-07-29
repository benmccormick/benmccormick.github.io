import React from 'react';
import Subscribe from './Subscribe';
import RecommendedPosts from './RecommendedPosts';
import '../css/subscribe.css';

class PostFooter extends React.Component {
  render() {
    const { recommendedPosts, post } = this.props;

    return (
      <div>
        <hr />
        <div className="subscribe-container">
          <Subscribe post={post} />
          <RecommendedPosts recommendedPosts={recommendedPosts} />
        </div>
      </div>
    );
  }
}

PostFooter.propTypes = {
  post: React.PropTypes.object.isRequired,
  recommendedPosts: React.PropTypes.array
};

export default PostFooter;
