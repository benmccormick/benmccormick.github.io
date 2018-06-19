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
import { css } from 'glamor';
import { sansFontStack, serifFontStack } from '../utils/typography';

export const TrendingIcon = () => <Icon color="#E55934" icon={flame} />;
export const FavoriteIcon = () => <Icon color="#D7AF70" icon={star} />;

const boxClass = css({
  fontFamily: sansFontStack,
  fontSize: '120%',
  // 1px margin on the size in order to fix border on Safari
  margin: `0 1px ${typography.rhythm(1 / 2)} 1px`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '3px dashed #E2777A',
  padding: '15px',
  color: 'initial',
  transition: 'background 0.5s ease, color 0.5s ease',
  ':hover': {
    background: '#E2777A',
    color: 'white',
    textDecoration: 'none',
  },
});

const PageWrapper = glamorous.div({
  maxWidth: '60vw',
  '@media all and (max-width: 700px)': {
    maxWidth: '100vw',
  },
  display: 'flex',
  alignItems: 'centglamor.er',
});

const PageDescription = glamorous.p({
  fontFamily: serifFontStack,
  // fontStyle: 'italic',
  fontSize: '18px',
  margin: 0,
});

const DateContainer = glamorous.span({
  whiteSpace: 'nowrap',
  fontSize: '18px',
});

const TitleRow = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  '> *': {
    marginRight: '10px',
  },
});

class LinkBox extends React.Component {
  render() {
    let { page, showDate, titleFn } = this.props;
    const _title = titleFn(page);
    return (
      <Link className={boxClass} to={page.path}>
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
