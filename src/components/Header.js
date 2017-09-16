import React from 'react';
import Link from 'gatsby-link';
import '../css/header.css';

export class Header extends React.Component {
  render() {
    let { blogTitle } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          // borderBottom: '1px solid rgba(200, 200, 200, 0.5)',
          paddingBottom: '0.5rem',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <h3
          style={{
            margin: '0 20px 0 0',
            paddingBottom: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            name="title"
            to={'/'}
          >
            {blogTitle}
          </Link>
        </h3>
        <div
          style={{
            color: 'rgba(100,100,100, 0.7)',
          }}
        >
          <Link className="header-link" to={'/archive/'}>
            Blog
          </Link>
          <span style={{ padding: '0 0.5rem' }} />
          <Link className="header-link" to={'/subscribe/'}>
            Subscribe
          </Link>
          <span style={{ padding: '0 0.5rem' }} />
          <Link className="header-link" to={'/speaking/'}>
            Speaking
          </Link>
          <span style={{ padding: '0 0.5rem' }} />
          <a className="header-link" href="http://twitter.com/ben336">
            Twitter
          </a>
          <span style={{ padding: '0 0.5rem' }} />
          <Link className="header-link" to={'/about/'}>
            About
          </Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  blogTitle: React.PropTypes.string.isRequired,
};
