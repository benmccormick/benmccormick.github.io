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
  gridTemplateColumns: '5rem 1fr 6rem',
  gridTemplateRows: '1fr',
  boxShadow: '0 1px 2px 0 rgba(43, 59, 93, 0.29)',
  ':hover': {
    // background: '#F1684E',
    // color: 'white',
    textDecoration: 'none',
    boxShadow: '0 10px 30px 0 rgba(0, 0, 0, 0.29)',
  },
  '@media all and (max-width: 700px)': {
    gridTemplateColumns: '5rem 1fr 0px',
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

const DateContainer = glamorous.span({
  whiteSpace: 'nowrap',
  display: 'flex',
  fontSize: '18px',
  justifyContent: 'space-between',
  alignItems: 'center',
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

class LinkBox extends React.Component {
  render() {
    let { page, showDate, titleFn } = this.props;
    const _title = titleFn(page);
    return (
      <Link className={boxClass} to={page.path}>
        <CategoryIcon category={page.data.category} />
        <PageWrapper>
          <div>
            <TitleRow>{_title}</TitleRow>
            <PageDescription>{page.data.description}</PageDescription>
          </div>
        </PageWrapper>
        {showDate ? (
          <DateContainer className="no-mobile">
            {format(parse(page.data.date), 'MMM Do YYYY')}
          </DateContainer>
        ) : null}
      </Link>
    );
  }
}

LinkBox.propTypes = {
  page: PropTypes.object.isRequired,
  showDate: PropTypes.bool.isRequired,
  titleFn: PropTypes.func.isRequired,
};

LinkBox.defaultProps = {
  showDate: true,
  showDescription: true,
  titleFn: page => get(page, 'data.title') || page.path,
};

export default LinkBox;
