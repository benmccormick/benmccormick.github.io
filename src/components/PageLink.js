import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import typography from '../utils/typography';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import styled from '@emotion/styled';
import star from '../svg/star.svgi';
import flame from '../svg/flame.svgi';
import Icon from './Icon';
import { css } from 'glamor';
import { headerFontStack, bodyFontStack } from '../utils/typography';
import { getCategory } from '../utils/page-helpers';
import get from 'lodash/get';

export const TrendingIcon = () => <Icon color="#E55934" icon={flame} />;
export const FavoriteIcon = () => <Icon color="#D7AF70" icon={star} />;

const ListItem = styled('li')({
  marginBottom: typography.rhythm(1 / 2),
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const PageWrapper = styled('div')({
  maxWidth: '50vw',
  '@media all and (max-width: 700px)': {
    maxWidth: '100vw',
  },
  display: 'flex',
  alignItems: 'center',
});

const linkClass = css({
  boxShadow: 'none',
  fontSize: '14px',
  fontFamily: headerFontStack,
  textDecoration: 'none',
});

const PageDescription = styled('p')({
  fontFamily: bodyFontStack,
  // fontStyle: 'italic',
  fontSize: '14px',
  margin: 0,
  color: '#777777',
});

const Header = styled('span')({
  fontFamily: bodyFontStack,
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: '#777777',
});

const TitleRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '> *': {
    marginRight: '10px',
  },
  '> a': {
    fontSize: '16px',
    color: '#474747',
    '&:hover': {
      color: '#F1684E',
    },
  },
});

class PageLink extends React.Component {
  render() {
    let { page, showDate, showDescription, titleFn } = this.props;
    const _title = titleFn(page);
    let categoryInfo = getCategory(page.data.category);
    const prettyCategory = get(categoryInfo, 'title');
    const categoryLink = `/category/${page.data.category}`;
    return (
      <ListItem>
        <PageWrapper>
          <div>
            {showDate ? (
              <Header>
                {format(parse(page.data.date), 'MMM Do')}{' '}
                <Link to={categoryLink}>{prettyCategory}</Link>
              </Header>
            ) : null}
            <TitleRow>
              <Link className={linkClass} to={page.path}>
                {_title}
              </Link>
            </TitleRow>
            {showDescription ? (
              <PageDescription>{page.data.description}</PageDescription>
            ) : null}
          </div>
        </PageWrapper>
      </ListItem>
    );
  }
}

PageLink.propTypes = {
  page: PropTypes.object.isRequired,
  showDate: PropTypes.bool.isRequired,
  showCategory: PropTypes.bool.isRequired,
  showDescription: PropTypes.bool.isRequired,
  titleFn: PropTypes.func.isRequired,
};

PageLink.defaultProps = {
  showCategory: true,
  showDate: true,
  showDescription: true,
};

export default PageLink;
