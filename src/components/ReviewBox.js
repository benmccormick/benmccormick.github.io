import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import get from 'lodash/get';
import typography from '../utils/typography';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import glamorous from 'glamorous';
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
  gridTemplateRows: '200px 1fr',
  justifyItems: 'center',
  boxShadow: '0 1px 2px 0 rgba(43, 59, 93, 0.29)',
  ':hover': {
    // background: '#F1684E',
    // color: 'white',
    textDecoration: 'none',
    boxShadow: '0 10px 30px 0 rgba(0, 0, 0, 0.29)',
  },
});

const PageWrapper = glamorous.div({
  maxWidth: '60vw',
  '@media all and (max-width: 700px)': {
    maxWidth: '100vw',
  },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
});

const PageDescription = glamorous.p({
  fontFamily: serifFontStack,
  // fontStyle: 'italic',
  fontSize: '18px',
  margin: 0,
  '@media all and (max-width: 700px)': {
    fontSize: '70%',
  },
});

const TitleRow = glamorous.div({
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

const Image = glamorous.img({
  height: '90%',
  margin: '5%',
});

const IconWrapper = glamorous.div({
  padding: '10% 20%',
  width: '100%',
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
          </IconWrapper>
        )}
        <PageWrapper>
          <div>
            <TitleRow>{_title}</TitleRow>
            <PageDescription>{page.data.description}</PageDescription>
          </div>
        </PageWrapper>
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
