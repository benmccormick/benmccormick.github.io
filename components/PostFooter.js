import React from 'react';
import Subscribe from './Subscribe';
import RecommendedPosts from './RecommendedPosts';
import '../css/subscribe.css';


class PostFooter extends React.Component {

  render() {
    const { pages, post } = this.props;

    return (<div>
      <hr/>
      <div className = "subscribe-container">
        <Subscribe post = {post} pages = {pages} />
        <RecommendedPosts post = {post} pages = {pages} />
      </div>
    </div>);
  }

}

PostFooter.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
};

export default PostFooter;
