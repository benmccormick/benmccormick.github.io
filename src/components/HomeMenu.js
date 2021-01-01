import { css } from 'glamor';
import { Link } from 'gatsby';
import React from 'react';
import get from 'lodash/get';
import take from 'lodash/take';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import LinkBox from './LinkBox';
import ReviewList from './ReviewList';
import LinkList from './LinkList';
import { headerFontStack } from '../utils/typography';
import PageLink from './PageLink';

let bottomLink = css({
  boxShadow: 'none',
  fontFamily: headerFontStack,
  textDecoration: 'none',
});

const Bold = styled('span')({
  fontWeight: '700',
});

const Section = styled('div')({
  margin: '1.5rem 0',
});

const Spacer = styled('div')({
  width: '100%',
  height: '1.5rem',
});

let LayoutContainer = styled('div')({
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

export class HomeMenu extends React.Component {
  render() {
    let { sortedPosts, sortedReviews } = this.props;
    let firstPosts = take(sortedPosts, 3);
    let firstReviews = take(sortedReviews, 3);
    let reviewRegex = /Book Review: (.+)/;
    let getReviewTitle = page => {
      let title = get(page, 'data.title') || page.path;
      let result = reviewRegex.exec(title);
      return result ? result[1] : title;
    };
    return (
      <div>
        <h1> The Latest Articles </h1>
        {firstPosts.map(post => (
          <Section>
            <PageLink
              page={post}
              showCategory
              key={post.path}
              showDate
              showDescription
              showYear
              titleFn={page => (
                <span>
                  <Bold>{get(page, 'data.title') || page.path}</Bold>
                </span>
              )}
            />
          </Section>
        ))}
        <hr />
        <div>
          <LayoutContainer>
            <Link className={`${leftSide} ${bottomLink}`} to={'/archive/'}>
              See More Articles »
            </Link>
          </LayoutContainer>
        </div>
        <Spacer />
        <h1> The Latest Book Reviews </h1>
        <Section>
          {firstReviews.map(post => (
            <Section>
              <PageLink
                page={post}
                showCategory
                key={post.path}
                showDate
                showDescription
                showYear
                titleFn={getReviewTitle}
              />
            </Section>
          ))}
        </Section>
        <hr />
        <div>
          <LayoutContainer>
            <Link
              className={`${leftSide} ${bottomLink}`}
              to={'/reviews-archive/'}
            >
              See More Reviews »
            </Link>
          </LayoutContainer>
        </div>
      </div>
    );
  }
}

HomeMenu.propTypes = {
  popularPosts: PropTypes.array.isRequired,
  weeklyLinks: PropTypes.array.isRequired,
  sortedPosts: PropTypes.array.isRequired,
};
