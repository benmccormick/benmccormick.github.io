import { css } from 'glamor';
import { Link } from 'gatsby';
import React from 'react';
import get from 'lodash/get';
import take from 'lodash/take';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import LinkBox from './LinkBox';
import ReviewList from './ReviewList';
import LinkList from './LinkList';
import { sansFontStack } from '../utils/typography';

let bottomLink = css({
  boxShadow: 'none',
  fontFamily: sansFontStack,
  textDecoration: 'none',
});

const Bold = glamorous.span({
  fontWeight: '700',
});

const Section = glamorous.div({
  margin: '1.5rem 0',
});

const TriColumnSection = glamorous.div({
  margin: '1.5rem 0',
  display: 'grid',
  gridTemplateColumns: '30% 30% 30%',
  gridTemplateRows: '1fr',
  gridColumnGap: '5%',
});

const Spacer = glamorous.div({
  width: '100%',
  height: '1.5rem',
});

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

export class HomeMenu extends React.Component {
  render() {
    let { sortedPosts, sortedReviews, popularPosts, topicLinks } = this.props;
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
            <LinkBox
              page={post}
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
          <ReviewList
            pages={firstReviews}
            titleFn={page => (
              <span>
                <Bold>{getReviewTitle(page)}</Bold>
              </span>
            )}
          />
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
        <Spacer />
        <h1> More From The Blog </h1>
        <Section>
          <LayoutContainer>
            <LinkList
              title="Most Read Articles"
              pages={popularPosts}
              showCategory={false}
              showDate={false}
              showDescriptions={false}
              className={leftSide}
            />
            <LinkList
              title="Featured Topics"
              pages={topicLinks}
              showCategory={false}
              showDate={false}
              showDescriptions={false}
              className={rightSide}
            />
          </LayoutContainer>
        </Section>
      </div>
    );
  }
}

HomeMenu.propTypes = {
  popularPosts: PropTypes.array.isRequired,
  weeklyLinks: PropTypes.array.isRequired,
  sortedPosts: PropTypes.array.isRequired,
};
