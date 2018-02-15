import PropTypes from 'prop-types';
import React from 'react';
import LinkList from './LinkList';

class RecommendedPosts extends React.Component {
  render() {
    const { recommendedPosts } = this.props;
    return (
      <div>
        <hr />
        <LinkList
          title="You Might Also Like These Articles"
          pages={recommendedPosts}
          showCategory={false}
          showDate={true}
          useBox={true}
        />
      </div>
    );
  }
}

RecommendedPosts.propTypes = {
  pages: PropTypes.array,
};

export default RecommendedPosts;
