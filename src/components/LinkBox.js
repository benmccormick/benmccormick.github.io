import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import get from 'lodash/get';
import typography from '../utils/typography';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import styled from '@emotion/styled';
import star from '../svg/star.svgi';
import flame from '../svg/flame.svgi';
import Icon from './Icon';
import CategoryTag from './CategoryTag';
import { css } from 'glamor';
import { sansFontStack, serifFontStack } from '../utils/typography';

export const TrendingIcon = () => <Icon color="#E55934" icon={flame} />;
export const FavoriteIcon = () => <Icon color="#D7AF70" icon={star} />;

const boxClass = css({
  fontFamily: sansFontStack,
  fontSize: '120%',
  // 1px margin on the size in order to fix border on Safari
  margin: `0 1px ${typography.rhythm(1 / 2)} 1px`,
  color: 'initial',
  background: '#FFFFFF',
  transition: 'all 0.5s ease',
  display: 'grid',
  gridTemplateColumns: '67% 28%',
  gridColumnGap: '5%',
  gridTemplateRows: '5rem 1fr',
  boxShadow: '0 1px 2px 0 rgba(43, 59, 93, 0.29)',
  padding: '0 0.5rem 0.5rem 0.5rem',
  ':hover': {
    // background: '#F1684E',
    // color: 'white',
    textDecoration: 'none',
    boxShadow: '0 10px 30px 0 rgba(0, 0, 0, 0.29)',
  },
  '@media all and (max-width: 700px)': {
    gridTemplateColumns: '100%',
    gridTemplateRows: 'auto auto auto auto',
    gridRowGap: '0.5rem',
    padding: '0.5rem',
    marginBottom: `2rem`,
  },
});

const CategoryArea = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  '@media all and (max-width: 700px)': {
    justifyContent: 'flex-start',
    marginTop: '1em',
  },
});

const PageDescription = styled('p')({
  fontFamily: serifFontStack,
  // fontStyle: 'italic',
  opacity: '0.6',
  fontSize: '18px',
  margin: 0,
  '@media all and (max-width: 700px)': {
    fontSize: '70%',
  },
});

const DateContainer = styled('span')({
  whiteSpace: 'nowrap',
  display: 'flex',
  fontSize: '18px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  opacity: '0.6',
  '@media all and (max-width: 700px)': {
    display: 'none',
  },
});

const TitleRow = styled('h1')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 0,
  '> *': {
    marginRight: '10px',
  },
  '@media all and (max-width: 700px)': {
    fontSize: '80%',
  },
});

class LinkBox extends React.Component {
  render() {
    let { page, showDate, titleFn, showCategory } = this.props;
    const _title = titleFn(page);
    return (
      <Link className={boxClass} to={page.path}>
        <TitleRow>{_title}</TitleRow>
        {showDate ? (
          <DateContainer className="no-mobile">
            {format(parse(page.data.date), 'MMM Do YYYY')}
          </DateContainer>
        ) : (
          <div />
        )}
        <PageDescription>{page.data.description}</PageDescription>
        <CategoryArea>
          {showCategory ? <CategoryTag category={page.data.category} /> : null}
        </CategoryArea>
      </Link>
    );
  }
}

LinkBox.propTypes = {
  page: PropTypes.object.isRequired,
  showDate: PropTypes.bool.isRequired,
  showCategory: PropTypes.bool.isRequired,
  titleFn: PropTypes.func.isRequired,
};

LinkBox.defaultProps = {
  showDate: true,
  showDescription: true,
  showCategory: true,
  titleFn: page => get(page, 'data.title') || page.path,
};

export default LinkBox;
