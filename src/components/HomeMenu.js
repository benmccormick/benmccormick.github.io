import { css } from 'glamor';
import { Link } from 'gatsby';
import React from 'react';
import format from 'date-fns/format';
import get from 'lodash/get';
import glamorous from 'glamorous';
import parse from 'date-fns/parse';
import PropTypes from 'prop-types';
import LinkBox from './LinkBox';
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
    let { sortedPosts, weeklyLinks, popularPosts, topicLinks } = this.props;
    let firstPost = sortedPosts[0];
    let firstLinkPost = weeklyLinks[0];
    return (
      <div>
        <h1> The Latest </h1>
        <Section>
          <LinkBox
            page={firstPost}
            titleFn={page => (
              <span>
                <Bold>{get(page, 'data.title') || page.path}</Bold>
              </span>
            )}
          />
        </Section>
        <Section>
          <LinkBox
            page={firstLinkPost}
            titleFn={page => (
              <span>
                <Bold>
                  Weekly Links: {format(parse(page.data.date), 'MMMM Do')}{' '}
                </Bold>
              </span>
            )}
          />
        </Section>
        <Spacer />
        <h1> More From The Blog </h1>
        <Section>
          <div>
            <LayoutContainer>
              <LinkList
                title="Recent Articles"
                pages={sortedPosts.slice(1)}
                showCategory={false}
                showDate={false}
                showDescriptions={false}
                className={leftSide}
              />
              <LinkList
                title="Weekly Links"
                pages={weeklyLinks.slice(1)}
                showCategory={false}
                showDate={false}
                showDescriptions={false}
                className={rightSide}
                titleFn={post => format(parse(post.data.date), 'MMMM Do')}
              />
            </LayoutContainer>
          </div>
        </Section>
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
