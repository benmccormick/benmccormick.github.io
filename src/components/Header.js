import React from 'react';
import Link from 'gatsby-link';
import { Ad } from './Ad';
import '../css/header.css';

export class Header extends React.Component {
  render() {
    let { blogTitle, history } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          // borderBottom: '1px solid rgba(200, 200, 200, 0.5)',
          paddingBottom: '0.5rem',
          marginBottom: '0.5rem'
        }}
      >
        <div
          style={{
            flexGrow: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around'
          }}
        >
          <h3
            style={{
              margin: 0,
              paddingBottom: 0
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit'
              }}
              name="title"
              to={'/'}
            >
              {blogTitle}
            </Link>
          </h3>
          <div
            style={{
              color: 'rgba(100,100,100, 0.7)'
            }}
          >
            <Link className="header-link" to={'/subscribe/'}>
              Subscribe
            </Link>
            <span style={{ padding: '0 0.33rem' }}>•</span>
            <Link className="header-link" to={'/archive/'}>
              Archive
            </Link>
            <span style={{ padding: '0 0.33rem' }}>•</span>
            <a className="header-link" href="http://twitter.com/ben336">
              Twitter
            </a>
            <span style={{ padding: '0 0.33rem' }}>•</span>
            <Link className="header-link" to={'/about/'}>
              About
            </Link>
          </div>
        </div>
        <div
          style={{
            flexShrink: 2
          }}
        >
          <Ad history={history} />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  blogTitle: React.PropTypes.string.isRequired
};
