import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';
import CategoryIcon from './CategoryIcon';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import glamorous from 'glamorous';
import { css } from 'glamor';

const ListItem = glamorous.li({
  marginBottom: rhythm(1 / 2),
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const PageWrapper = glamorous.div({
  maxWidth: '50vw',
  '@media all and (max-width: 700px)': {
    maxWidth: '100vw',
  },
  display: 'flex',
  alignItems: 'centglamor.er',
});

const linkClass = css({
  boxShadow: 'none',
  fontSize: '20px',
  fontFamily: 'brandon-grotesque, Helvetica, sans-serif',
  textDecoration: 'none',
});

const PageDescription = glamorous.p({
  fontFamily: 'ff-tisa-web-pro, serif',
  // fontStyle: 'italic',
  fontSize: '16px',
  margin: 0,
  color: 'rgba(100,100,100, 0.7)',
});

const DateContainer = glamorous.span({
  fontFamily: 'ff-tisa-web-pro, serif',
  whiteSpace: 'nowrap',
  fontSize: '18px',
  color: 'rgba(100,100,100, 0.7)',
});

class PageLink extends React.Component {
  render() {
    let { page, showCategory, showDate } = this.props;
    const _title = get(page, 'data.title') || page.path;
    return (
      <ListItem>
        <PageWrapper>
          <div>
            <Link className={linkClass} to={page.path}>
              {_title}
            </Link>
            <PageDescription>
              {page.data.description}
            </PageDescription>
            {showCategory
              ? <CategoryIcon category={page.data.category} />
              : null}
          </div>
        </PageWrapper>
        {showDate
          ? <DateContainer className="no-mobile">
              {format(parse(page.data.date), 'MMM Do YYYY')}
            </DateContainer>
          : null}
      </ListItem>
    );
  }
}

PageLink.propTypes = {
  page: React.PropTypes.object.isRequired,
  showDate: React.PropTypes.bool.isRequired,
  showCategory: React.PropTypes.bool.isRequired,
};

PageLink.defaultProps = {
  showCategory: true,
  showDate: true,
};

export default PageLink;
