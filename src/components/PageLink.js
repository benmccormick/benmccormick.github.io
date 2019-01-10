import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import typography from '../utils/typography';
import CategoryIcon from './CategoryIcon';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import styled from "@emotion/styled";
import star from '../svg/star.svgi';
import flame from '../svg/flame.svgi';
import Icon from './Icon';
import { css } from 'glamor';
import { sansFontStack, serifFontStack } from '../utils/typography';

export const TrendingIcon = () => <Icon color="#E55934" icon={flame} />;
export const FavoriteIcon = () => <Icon color="#D7AF70" icon={star} />;

const ListItem = styled("li")({
  marginBottom: typography.rhythm(1 / 2),
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const PageWrapper = styled("div")({
  maxWidth: '50vw',
  '@media all and (max-width: 700px)': {
    maxWidth: '100vw',
  },
  display: 'flex',
  alignItems: 'center',
});

const linkClass = css({
  boxShadow: 'none',
  fontSize: '16px',
  fontFamily: sansFontStack,
  textDecoration: 'none',
});

const PageDescription = styled("p")({
  fontFamily: serifFontStack,
  // fontStyle: 'italic',
  fontSize: '16px',
  margin: 0,
  color: '#999999',
});

const DateContainer = styled("span")({
  fontFamily: serifFontStack,
  whiteSpace: 'nowrap',
  fontSize: '18px',
  color: '#999999',
});

const TitleRow = styled("div")({
  display: 'flex',
  alignItems: 'center',
  '> *': {
    marginRight: '10px',
  },
});

class PageLink extends React.Component {
  render() {
    let {
      page,
      showCategory,
      showDate,
      showDescription,
      titleFn,
      showPopular,
      showTrending,
    } = this.props;
    const _title = titleFn(page);
    return (
      <ListItem>
        <PageWrapper>
          <div>
            <TitleRow>
              <Link className={linkClass} to={page.path}>
                {_title}
              </Link>
              {showTrending && page.data.isTrending ? <TrendingIcon /> : null}
              {showPopular && page.data.isPopular ? <FavoriteIcon /> : null}
            </TitleRow>
            {showDescription ? (
              <PageDescription>{page.data.description}</PageDescription>
            ) : null}
            {showCategory ? (
              <CategoryIcon category={page.data.category} />
            ) : null}
          </div>
        </PageWrapper>
        {showDate ? (
          <DateContainer className="no-mobile">
            {format(parse(page.data.date), 'MMM Do YYYY')}
          </DateContainer>
        ) : null}
      </ListItem>
    );
  }
}

PageLink.propTypes = {
  page: PropTypes.object.isRequired,
  showDate: PropTypes.bool.isRequired,
  showCategory: PropTypes.bool.isRequired,
  showDescription: PropTypes.bool.isRequired,
  showPopular: PropTypes.bool.isRequired,
  showTrending: PropTypes.bool.isRequired,
  titleFn: PropTypes.func.isRequired,
};

PageLink.defaultProps = {
  showCategory: true,
  showDate: true,
  showDescription: true,
};

export default PageLink;
