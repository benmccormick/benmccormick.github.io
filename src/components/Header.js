import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import '../css/header.css';
import glamorous from 'glamorous';
import { css } from 'glamor';
import { sansFontStack } from '../utils/typography';

const HeaderWrapper = glamorous.div({
  display: 'flex',
  paddingBottom: '2rem',
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
    ':hover': {
      textDecoration: 'none',
    },
  },
});

const LinksWrapper = glamorous.div({
  color: 'rgba(100,100,100, 0.7)',
});

const headerLink = css({
  color: 'rgba(100,100,100, 0.7)',
  fontSize: '16px',
  fontFamily: sansFontStack,
  ':hover': {
    color: '#E2777A',
  },
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
          <Link className={headerLink} to={'/archive/'}>
            Blog
          </Link>
          <Padding />
          <Link className={headerLink} to={'/subscribe/'}>
            Subscribe
          </Link>
          <Padding />
          <Link className={headerLink} to={'/speaking/'}>
            Speaking
          </Link>
          <Padding />
          <a className={headerLink} href="http://twitter.com/ben336">
            Twitter
          </a>
          <Padding />
          <Link className={headerLink} to={'/about/'}>
            About
          </Link>
        </LinksWrapper>
      </HeaderWrapper>
    );
  }
}

Header.propTypes = {
  blogTitle: PropTypes.string.isRequired,
};
