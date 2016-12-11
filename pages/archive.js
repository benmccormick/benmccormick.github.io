import React from 'react';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import { prefixLink } from 'gatsby-helpers';
import { rhythm } from 'utils/typography';
import Helmet from 'react-helmet';
import { config } from 'config';
import include from 'underscore.string/include';
import moment from 'moment';

class BlogArchive extends React.Component {
  render() {
    const pageLinks = [];
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, (page) =>
      get(page, 'data.date')
    ).reverse();
    sortedPages.forEach((page) => {
      if (
        get(page, 'file.ext') === 'md' &&
        !include(page.path, '/404') &&
        get(page, 'data.layout') === 'post') {
        const title = get(page, 'data.title') || page.path;
        pageLinks.push(
          <li
            key = {page.path}
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
                maxWidth: '20rem',
              }}
            >
              <Link style = {{boxShadow: 'none'}} to = {prefixLink(page.path)}>{title}</Link>
            </div>
            <span
              className = "no-mobile"
              style = {{
                color: 'rgba(100,100,100, 0.7)',
              }}
            >{moment(page.data.date).format('MMM Do YYYY')}</span>
          </li>
        );
      }
    });
    return (
      <div>
        <Helmet
          title = {config.blogTitle}
          meta = {[
            {'name': 'description', 'content': "Ben McCormick's blog"},
            {'name': 'keywords', 'content': 'blog, articles'},
          ]}
        />
        <h1>Articles</h1>
        <ul
          style = {{
            marginLeft: 0,
            paddingLeft: 0,
          }}
        >
          {pageLinks}
        </ul>
      </div>
    );
  }
}

BlogArchive.propTypes = {
  route: React.PropTypes.object,
};

export default BlogArchive;
