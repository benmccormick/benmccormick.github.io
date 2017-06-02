import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import { rhythm } from 'utils/typography';
import CategoryIcon from './CategoryIcon';
import moment from 'moment';

class PageLink extends React.Component {
  render() {
    let { page, showCategory } = this.props;
    const _title = get(page, 'data.title') || page.path;
    return (
      <li
        style = {{
          marginBottom: rhythm(1 / 2),
          listStyle: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style = {{
            maxWidth: '25rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div>
            <Link style = {{boxShadow: 'none'}} to = {(page.path)}>{_title}</Link>
            <p
              style = {{
                fontStyle: 'italic',
                margin: 0,
                color: 'rgba(100,100,100, 0.7)'
              }}
            > {page.data.description}</p>
            {showCategory ? <CategoryIcon category = {page.data.category} /> : null }
          </div>
        </div>
        <span
          className = "no-mobile"
          style = {{
            color: 'rgba(100,100,100, 0.7)',
          }}
        >{moment(page.data.date).fromNow()}</span>
      </li>
    );
  }
}

PageLink.propTypes = {
  page: React.PropTypes.object.isRequired,
  showCategory: React.PropTypes.bool.isRequired,
};

export default PageLink;
