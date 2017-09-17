import React from 'react';
import Link from 'gatsby-link';
import '../css/header.css';
import glamorous from 'glamorous';

const HeaderWrapper = glamorous.div({
  display: 'flex',
  paddingBottom: '1rem',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
});

const Padding = glamorous.span({
  padding: '0 0.5rem',
  '@media all and (max-width: 400px)': {
    padding: '0 0.25rem',
  },
});

const Logo = glamorous.h3({
  margin: '0 20px 0 0',
  paddingBottom: 0,
  '& a': {
    boxShadow: 'none',
    textDecoration: 'none',
    color: 'inherit',
  },
});

const LinksWrapper = glamorous.div({
  color: 'rgba(100,100,100, 0.7)',
});

export class Header extends React.Component {
  render() {
    let { blogTitle } = this.props;
    return (
      <HeaderWrapper>
        <Logo>
          <Link name="title" to={'/'}>
            {blogTitle}
          </Link>
        </Logo>
        <LinksWrapper>
          <Link className="header-link" to={'/archive/'}>
            Blog
          </Link>
          <Padding />
          <Link className="header-link" to={'/subscribe/'}>
            Subscribe
          </Link>
          <Padding />
          <Link className="header-link" to={'/speaking/'}>
            Speaking
          </Link>
          <Padding />
          <a className="header-link" href="http://twitter.com/ben336">
            Twitter
          </a>
          <Padding />
          <Link className="header-link" to={'/about/'}>
            About
          </Link>
        </LinksWrapper>
      </HeaderWrapper>
    );
  }
}

Header.propTypes = {
  blogTitle: React.PropTypes.string.isRequired,
};
