import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import LinkList from './LinkList';
import glamorous from 'glamorous';
import { css } from 'glamor';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

let LayoutContainer = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '66% 34%',
  gridTemplateRows: 'auto',
  '@media all and (max-width: 700px)': {
    gridTemplateColumns: '100%',
    gridTemplateRows: 'auto auto',
  },
  gridColumnGap: '50px',
});

let leftSide = css({
  gridColumn: 1,
  gridRow: 1,
});

let rightSide = css({
  gridColumn: 2,
  gridRow: 1,

  '@media all and (max-width: 700px)': {
    gridColumn: 1,
    gridRow: 2,
  },
});

let bottomLink = css({
  boxShadow: 'none',
  fontFamily: 'brandon-grotesque, Helvetica, sans-serif',
  textDecoration: 'none',
});

export class HomeMenu extends React.Component {
  render() {
    let { sortedPosts, weeklyLinks } = this.props;
    return (
      <div>
        <LayoutContainer>
          <LinkList
            title="Recent Articles"
            pages={sortedPosts}
            showCategory={false}
            showDate={false}
            showDescriptions={false}
            className={leftSide}
          />
          <LinkList
            title="Weekly Links"
            pages={weeklyLinks}
            showCategory={false}
            showDate={false}
            showDescriptions={false}
            className={rightSide}
            titleFn={post => format(parse(post.data.date), 'MMMM Do')}
          />
        </LayoutContainer>
        <hr />
        <div>
          <LayoutContainer>
            <Link className={`${leftSide} ${bottomLink}`} to={'/archive/'}>
              See More Articles »
            </Link>
            <Link
              style={{}}
              className={`${rightSide} ${bottomLink}`}
              to={'/links-archive/'}
            >
              See Past Weekly Links »
            </Link>
          </LayoutContainer>
        </div>
      </div>
    );
  }
}

HomeMenu.propTypes = {
  sortedPosts: PropTypes.array.isRequired,
  popularPosts: PropTypes.array.isRequired,
  weeklyLinks: PropTypes.array.isRequired,
};
