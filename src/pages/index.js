import React from 'react';
import Link from 'gatsby-link';
import sortBy from 'lodash/sortBy';
import take from 'lodash/take';
import parseInt from 'lodash/parseInt';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';
import Helmet from 'react-helmet';
// import { config } from 'config';
import include from 'lodash/includes';
import LinkList from '../components/LinkList';

class BlogIndex extends React.Component {
  render() {
    // Sort pages.
    const posts = this.props.data.allMarkdownRemark.edges;
    const sortedPages = take(
        sortBy(posts, page => get(page, 'data.date'))
            .reverse()
            .filter(page => (
                (get(page, 'file.ext') === 'md') &&
                (!include(page.path, '/404')) &&
                (get(page, 'data.layout') === 'post')
            )
    ), 10);
    const popularPages = take(
        sortBy(posts, page => parseInt(get(page, 'data.last30pageViews')))
            .reverse()
            .filter(page => (
                (get(page, 'file.ext') === 'md') &&
                (!include(page.path, '/404')) &&
                (!page.data.dontfeature) &&
                (get(page, 'data.layout') === 'post')
            )
    ), 6);
    return (
      <div>
        <Helmet
          // title = {config.blogTitle}
          title = {'benmccormick.org'}
          meta = {[
            {'name': 'description',
              'content': "Ben McCormick's blog on JavaScript and Web Development"},
            {'name': 'keywords', 'content': 'blog javascript development code react vim'},
          ]}
        />
        <LinkList
          title = "Recent Articles"
          pages = {sortedPages}
          showCategory = {false}
        />
        <LinkList
          title = "Popular Articles"
          pages = {popularPages}
          showCategory = {false}
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
            <div >
              <Link
                style = {{boxShadow: 'none'}}
                to = {('/marionette-explained/')}
              >Marionette: Explained</Link>
              <p
                style = {{
                  fontStyle: 'italic',
                  margin: 0,
                  color: 'rgba(100,100,100, 0.7)'
                }}
              > An in depth exploration of how to build better Backbone apps with Marionette</p>
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
            <div >
              <Link
                style = {{boxShadow: 'none'}}
                to = {('/learning-vim-in-2014/')}
              >Learning Vim in 2014</Link>
              <p
                style = {{
                  fontStyle: 'italic',
                  margin: 0,
                  color: 'rgba(100,100,100, 0.7)'
                }}
              > A modern look at text editing with Vim</p>
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
            to = {('/archive/')}
          >
          See More Articles »
          </Link>

        </div>
      </div>
    );
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
query IndexQuery {
  allMarkdownRemark(
    limit: 2000,
    sort: { fields: [frontmatter___date], order: DESC },
  ) {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}

`;
