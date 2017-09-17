import React from 'react';
import LinkList from './LinkList';

class RecommendedPosts extends React.Component {
  render() {
    const { recommendedPosts } = this.props;
    return (
      <LinkList
        title="You Might Also Like These Articles"
        pages={recommendedPosts}
        showCategory={false}
        showDate={true}
      />
    );
  }
}

RecommendedPosts.propTypes = {
  pages: React.PropTypes.array,
};

export default RecommendedPosts;
