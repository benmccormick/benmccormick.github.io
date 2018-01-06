import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import LinkBox from './LinkBox';
import glamorous from 'glamorous';
import { css } from 'glamor';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

let bottomLink = css({
  boxShadow: 'none',
  fontFamily: 'brandon-grotesque, Helvetica, sans-serif',
  textDecoration: 'none',
});

const Bold = glamorous.span({
  fontWeight: '700',
});

const Section = glamorous.div({
  margin: '1.5rem 0',
});

export class HomeMenu extends React.Component {
  render() {
    let { sortedPosts, weeklyLinks } = this.props;
    let firstPost = sortedPosts[0];
    let firstLinkPost = weeklyLinks[0];
    return (
      <div>
        <Section>
          <LinkBox
            page={firstPost}
            titleFn={page =>
              <span>
                <Bold>Most Recent Post: </Bold>{' '}
                {get(page, 'data.title') || page.path}
              </span>}
          />
          <Link className={`${bottomLink}`} to={'/archive/'}>
            See More Articles »
          </Link>
        </Section>
        <Section>
          <LinkBox
            page={firstLinkPost}
            titleFn={page =>
              <span>
                <Bold>Weekly Links: </Bold>{' '}
                {format(parse(page.data.date), 'MMMM Do')}
              </span>}
          />
          <Link style={{}} className={`${bottomLink}`} to={'/links-archive/'}>
            See Past Weekly Links »
          </Link>
        </Section>
      </div>
    );
  }
}

HomeMenu.propTypes = {
  sortedPosts: PropTypes.array.isRequired,
  popularPosts: PropTypes.array.isRequired,
  weeklyLinks: PropTypes.array.isRequired,
};
