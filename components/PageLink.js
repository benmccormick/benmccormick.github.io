import React from 'react';
import { Link } from 'react-router';
import get from 'lodash/get';
import { prefixLink } from 'gatsby-helpers';
import { rhythm } from 'utils/typography';
import CategoryIcon from './CategoryIcon';
import moment from 'moment';

class PageLink extends React.Component {
  render() {
    let { page } = this.props;
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
          <CategoryIcon category = {page.data.category} />
          <Link style = {{boxShadow: 'none'}} to = {prefixLink(page.path)}>{_title}</Link>
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
};

export default PageLink;
