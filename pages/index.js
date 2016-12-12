import React from 'react';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import take from 'lodash/take';
import parseInt from 'lodash/parseInt';
import get from 'lodash/get';
import { prefixLink } from 'gatsby-helpers';
import { rhythm } from 'utils/typography';
import Helmet from 'react-helmet';
import { config } from 'config';
import include from 'underscore.string/include';
import Footer from 'components/Footer';
import LinkList from 'components/LinkList';

class BlogIndex extends React.Component {
  render() {
    // Sort pages.
    const sortedPages = take(
        sortBy(this.props.route.pages, page => get(page, 'data.date'))
            .reverse()
            .filter(page => (
                (get(page, 'file.ext') === 'md') &&
                (!include(page.path, '/404')) &&
                (get(page, 'data.layout') === 'post')
            )
    ), 10);
    const popularPages = take(
        sortBy(this.props.route.pages, page => parseInt(get(page, 'data.last30pageViews')))
            .reverse()
            .filter(page => (
                (get(page, 'file.ext') === 'md') &&
                (!include(page.path, '/404')) &&
                (get(page, 'data.layout') === 'post')
            )
    ), 6);
    return (
      <div>
        <Helmet
          title = {config.blogTitle}
          meta = {[
            {'name': 'description',
              'content': "Ben McCormick's blog on JavaScript and Web Development"},
            {'name': 'keywords', 'content': 'blog javascript development code react vim'},
          ]}
        />
        <LinkList
          title = "Recent Articles"
          pages = {sortedPages}
        />
        <LinkList
          title = "Popular Articles"
          pages = {popularPages}
        />
        <h1> Past Series </h1>
        <ul
          style = {{
            marginLeft: 0,
            paddingLeft: 0,
            borderBottom: '1px solid rgba(200, 200, 200, 0.5)',
          }}
        >
          <li
            key = 'marionette'
            style = {{
              marginBottom: rhythm(1 / 2),
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              //borderBottom: '1px solid rgba(220,220,220, 0.3)',
            }}
          >
            <div
              style = {{
                maxWidth: '25rem',
              }}
            >
              <Link
                style = {{boxShadow: 'none'}}
                to = {prefixLink('/marionette-explained/')}
              >Marionette: Explained</Link>
            </div>
          </li>
          <li
            key = 'vim'
            style = {{
              marginBottom: rhythm(1 / 2),
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              //borderBottom: '1px solid rgba(220,220,220, 0.3)',
            }}
          >
            <div
              style = {{
                maxWidth: '25rem',
              }}
            >
              <Link
                style = {{boxShadow: 'none'}}
                to = {prefixLink('/learning-vim-in-2014/')}
              >Learning Vim in 2014</Link>
            </div>
          </li>
        </ul>
        <div
          style = {{
            marginBottom: '2rem'
          }}
        >
          <Link
            style = {{boxShadow: 'none'}}
            to = {prefixLink('/archive/')}
          >
          See More Articles »
          </Link>

        </div>
        <Footer />
      </div>
    );
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
};

export default BlogIndex;
