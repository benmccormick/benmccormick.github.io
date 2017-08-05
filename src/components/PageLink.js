import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';
import CategoryIcon from './CategoryIcon';
import format from 'date-fns/format';

class PageLink extends React.Component {
  render() {
    let { page, showCategory, showDate } = this.props;
    const _title = get(page, 'data.title') || page.path;
    return (
      <li
        style={{
          marginBottom: rhythm(1 / 2),
          listStyle: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '25rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div>
            <Link
              style={{
                boxShadow: 'none',
                fontSize: '22px',
                fontFamily: 'brandon-grotesque, Helvetica, sans-serif',
              }}
              to={page.path}
            >
              {_title}
            </Link>
            <p
              style={{
                fontFamily: 'ff-tisa-web-pro, serif',
                // fontStyle: 'italic',
                fontSize: '16px',
                margin: 0,
                color: 'rgba(100,100,100, 0.7)',
              }}
            >
              {' '}{page.data.description}
            </p>
            {showCategory
              ? <CategoryIcon category={page.data.category} />
              : null}
          </div>
        </div>
        {showDate
          ? <span
              className="no-mobile"
              style={{
                fontFamily: 'ff-tisa-web-pro, serif',
                fontSize: '18px',
                color: 'rgba(100,100,100, 0.7)',
              }}
            >
              {format(new Date(page.data.date), 'MMM Qo YYYY')}
            </span>
          : null}
      </li>
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
