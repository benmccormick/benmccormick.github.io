import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import LinkList from './LinkList';

export class HomeMenu extends React.Component {
  render() {
    let { sortedPosts, popularPosts } = this.props;
    return (
      <div>
        <LinkList
          title="Recent Articles"
          pages={sortedPosts}
          showCategory={false}
          showDate={true}
        />
        <LinkList
          title="Popular Articles"
          pages={popularPosts}
          showCategory={false}
          showDate={true}
        />
        <hr />
        <div>
          <Link
            style={{
              boxShadow: 'none',
              fontFamily: 'brandon-grotesque, Helvetica, sans-serif',
              textDecoration: 'none',
            }}
            to={'/archive/'}
          >
            See More Articles »
          </Link>
        </div>
      </div>
    );
  }
}

HomeMenu.propTypes = {
  sortedPosts: PropTypes.array.isRequired,
  popularPosts: PropTypes.array.isRequired,
};
