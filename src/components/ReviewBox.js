import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import get from 'lodash/get';
import typography from '../utils/typography';
import styled from '@emotion/styled';
import star from '../svg/star.svgi';
import flame from '../svg/flame.svgi';
import Icon from './Icon';
import CategoryIcon from './CategoryIcon';
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
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',
  position: 'relative',
  justifyItems: 'center',
  alignItems: 'center',
  width: '180px',
  boxShadow: '0 2px 4px 0 rgba(43, 59, 93, 0.29)',
  ':hover': {
    textDecoration: 'none',
    boxShadow: '0 10px 30px 0 rgba(0, 0, 0, 0.29)',
  },
  height: '250px',
});

const BookInfoWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  width: '100%',
  background: 'rgba(255, 255, 255, 1)',
  opacity: 0,
  ':hover': {
    opacity: 0.95,
  },
});

const BookDescription = styled('p')({
  fontFamily: serifFontStack,
  // fontStyle: 'italic',
  fontSize: '18px',
  margin: 0,
  '@media all and (max-width: 700px)': {
    fontSize: '70%',
  },
});

const TitleRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '> *': {
    marginRight: '10px',
  },
  '@media all and (max-width: 700px)': {
    fontSize: '80%',
  },
});

const Image = styled('img')({
  marginBottom: 0,
  width: '100%',
  height: '100%',
});

const IconWrapper = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

class ReviewBox extends React.Component {
  render() {
    let { page, titleFn } = this.props;
    const _title = titleFn(page);
    return (
      <Link className={boxClass} to={page.path}>
        {page.data.image ? (
          <Image src={page.data.image} />
        ) : (
          <IconWrapper>
            <CategoryIcon category="reviews" />
            <div>{_title}</div>
          </IconWrapper>
        )}
        <BookInfoWrapper>
          <div>
            <TitleRow>{_title}</TitleRow>
            <BookDescription>{page.data.description}</BookDescription>
          </div>
        </BookInfoWrapper>
      </Link>
    );
  }
}

ReviewBox.propTypes = {
  page: PropTypes.object.isRequired,
  showDate: PropTypes.bool.isRequired,
  titleFn: PropTypes.func.isRequired,
};

ReviewBox.defaultProps = {
  showDate: true,
  showDescription: true,
  titleFn: page => get(page, 'data.title') || page.path,
};

export default ReviewBox;
