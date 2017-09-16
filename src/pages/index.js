import '../css/homepage.css';

import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import React from 'react';
import get from 'lodash/get';
import include from 'lodash/includes';
import parseInt from 'lodash/parseInt';
import sortBy from 'lodash/sortBy';
import take from 'lodash/take';

import { fadeIn } from '../utils/react-helpers';
import LinkList from '../components/LinkList';

class BlogIndex extends React.Component {
  componentDidMount() {
    fadeIn(this.indexContainer);
  }
  render() {
    // Sort pages.
    const posts = this.props.data.allMarkdownRemark.edges;
    const sortedPages = take(
      sortBy(posts, page => get(page, 'node.frontmatter.date'))
        .reverse()
        .filter(page => get(page, 'node.frontmatter.layout') === 'post')
        .map(p => ({ data: p.node.frontmatter, path: p.node.fields.slug })),
      5
    );
    const popularPages = take(
      sortBy(posts, page =>
        parseInt(get(page, 'node.frontmatter.last30pageViews'))
      )
        .reverse()
        .filter(
          page =>
            !include(page.node.frontmatter.path, '/404') &&
            !page.node.frontmatter.dontfeature &&
            get(page, 'node.frontmatter.layout') === 'post'
        )
        .map(p => ({ data: p.node.frontmatter, path: p.node.fields.slug })),
      5
    );
    return (
      <div ref={el => (this.indexContainer = el)}>
        <Helmet
          // title = {config.blogTitle}
          title={'benmccormick.org'}
          meta={[
            {
              name: 'description',
              content: "Ben McCormick's blog on JavaScript and Web Development",
            },
            {
              name: 'keywords',
              content: 'blog javascript development code react vim',
            },
          ]}
        />
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '1rem 0' }}>
            <h1> Hi! I'm Ben. </h1>
            <p>
              {' '}I'm a software developer from Durham, North Carolina. I write
              and speak about JavaScript, software development, and developer
              tools. If you're interested in my writings here, feel free to{' '}
              <Link to="/subscribe">subscribe</Link> or message me on{' '}
              <a href="http://twitter.com/ben336" target="_blank">
                Twitter
              </a>{' '}
              or <a href="mailto:ben@benmccormick.org">email</a>.
            </p>
          </div>
          <div className="image-container no-mobile">
            <img src="/headshot.jpeg" />
          </div>
        </div>
        <div style={{ display: 'flex' }} className="columns">
          <div style={{ padding: '0 0.8rem 0 0', minWidth: '200px' }}>
            <LinkList
              title="Recent Articles"
              pages={sortedPages}
              showCategory={false}
              showDate={false}
            />
          </div>
          {/* <div style={{ width: '2rem', height: '0.5px' }} /> */}
          <div style={{ padding: '0 0 0 0.8rem', minWidth: '200px' }}>
            <LinkList
              title="Popular Articles"
              pages={popularPages}
              showCategory={false}
              showDate={false}
            />
          </div>
        </div>
        <hr />
        <div>
          <Link
            style={{
              boxShadow: 'none',
              fontFamily: 'brandon-grotesque, Helvetica, sans-serif',
              textDecoration: 'none',
            }}
            to={'/archive/'}
          >
            See More Articles »
          </Link>
        </div>
        {/* <LinkList
          title="Past Series"
          pages={[
            {
              data: {
                title: 'Marionette: Explained',
                description:
                  'An in depth exploration of how to build better Backbone apps with Marionette',
              },
              path: '/marionette-explained/',
            },
            {
              data: {
                title: 'Learning Vim in 2014',
                description: 'A modern look at text editing with Vim',
              },
              path: '/learning-vim-in-2014/',
            },
          ]}
          showCategory={false}
          showDate={false}
        /> */}
        <div
          style={{
            marginBottom: '2rem',
          }}
        />
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
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            layout
            dontfeature
            last30pageViews
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
