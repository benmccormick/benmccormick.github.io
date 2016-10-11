import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import take from 'lodash/take'
import { prefixLink } from 'gatsby-helpers'
import { rhythm } from 'utils/typography'
import Helmet from "react-helmet"
import access from 'safe-access'
import { config } from 'config'
import include from 'underscore.string/include'
import Bio from 'components/Bio'
import moment from 'moment';

class BlogIndex extends React.Component {
  render () {
    const pageLinks = [];
    // Sort pages.
    const sortedPages = take(
        sortBy(this.props.route.pages, page => access(page, 'data.date'))
            .reverse()
            .filter(page => (
                (access(page, 'file.ext') === 'md') &&
                (!include(page.path, '/404')) &&
                (access(page, 'data.layout') === 'post')
            )
    ), 10);

    sortedPages.forEach((page) => {
        const title = access(page, 'data.title') || page.path
        pageLinks.push(
          <li
            key={page.path}
            style={{
              marginBottom: rhythm(1/2),
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              //borderBottom: '1px solid rgba(220,220,220, 0.3)',
            }}
          >
            <div style={{
                maxWidth: '25rem',
            }}>
                <Link style={{boxShadow: 'none'}} to={prefixLink(page.path)}>{title}</Link>
            </div>
            <span
                className="no-mobile"
                style={{
                    color: 'rgba(100,100,100, 0.7)',
                }}
            >{moment(page.data.date).fromNow()}</span>
          </li>
        )
    })
    return (
      <div>
        <Helmet
          title={config.blogTitle}
          meta={[
            {"name": "description", "content": "Ben McCormick's blog"},
            {"name": "keywords", "content": "blog, articles"},
          ]}
        />
        <h1> Recent Articles </h1>
        <ul style={{
            marginLeft: 0,
            paddingLeft: 0,
            borderBottom: '1px solid rgba(200, 200, 200, 0.5)',
        }}>
          {pageLinks}
        </ul>
        <div style={{
            marginBottom: '2rem'
        }}>
        <Link style={{boxShadow: 'none'}} to={prefixLink('/archive/')}> See More Articles »</Link>

        </div>
        <Bio />
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
