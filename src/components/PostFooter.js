import PropTypes from 'prop-types';
import React from 'react';
import RecommendedPosts from './RecommendedPosts';
import '../css/subscribe.css';
import styled from '@emotion/styled-base';

const Footer = styled('div')({
  marginTop: '1rem',
});

class PostFooter extends React.Component {
  render() {
    const { recommendedPosts } = this.props;

    return (
      <Footer>
        <RecommendedPosts recommendedPosts={recommendedPosts} />
      </Footer>
    );
  }
}

PostFooter.propTypes = {
  post: PropTypes.object.isRequired,
  recommendedPosts: PropTypes.array,
};

export default PostFooter;
