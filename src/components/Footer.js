import React from 'react';
import { Link } from 'gatsby';
import '../css/header.css';
import styled from '@emotion/styled';
import { css } from 'glamor';
import { headerFontStack } from '../utils/typography';
import typography from '../utils/typography';

let { rhythm } = typography;

const FooterContainer = styled('div')({
  width: '100%',
  display: 'flex',
  padding: '3em 0 1em 0',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: 'rgba(150, 178, 198, 0.4)',
  borderTop: '1px solid rgb(150, 178, 198)',
});
const InnerFooter = styled('div')({
  width: '100%',
  minHeight: '200px',
  maxWidth: '960px',
  margin: '0 auto',
  padding: `0 ${rhythm(3 / 4)}`,
  display: 'grid',
  gridTemplateColumns: '45% 45%',
  gridColumnGap: '10%',
  gridRowGap: '30px',
  '@media all and (max-width: 450px)': {
    gridTemplateColumns: '100%',
  },
});

const LinksWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridAutoRows: '1fr',
  gridRowGap: '20px',
});

const FooterHeader = styled('h2')({
  // color: 'white',
});

const footerLink = css({
  fontSize: '16px',
  fontFamily: headerFontStack,
});

const CopyRightContainer = styled('div')({
  fontFamily: headerFontStack,
  fontSize: '14px',
  overflow: 'visible',
  whiteSpace: 'nowrap',
});

export class Footer extends React.Component {
  render() {
    return (
      <FooterContainer>
        <InnerFooter>
          <div>
            <FooterHeader>Content</FooterHeader>
            <LinksWrapper>
              <Link className={footerLink} to={'/archive/'}>
                Blog Archive
              </Link>
              <Link className={footerLink} to={'/reviews-archive/'}>
                Book Reviews
              </Link>
              <a
                className={footerLink}
                href={'https://buttondown.email/benmccormick'}
              >
                Newsletter Archives
              </a>
              <Link className={footerLink} to={'/speaking/'}>
                Speaking
              </Link>
            </LinksWrapper>
          </div>
          <div>
            <FooterHeader>Meta</FooterHeader>
            <LinksWrapper>
              <Link className={footerLink} to={'/subscribe/'}>
                Subscribe To The Newsletter
              </Link>
              <Link className={footerLink} to={'/built-with/'}>
                Built With
              </Link>
              <a className={footerLink} href="http://twitter.com/_benmccormick">
                Personal Twitter
              </a>
              <a
                className={footerLink}
                href="http://twitter.com/benmccormickorg"
              >
                Blog Twitter
              </a>
              <Link className={footerLink} to={'/about/'}>
                About Me
              </Link>
            </LinksWrapper>
          </div>
          <CopyRightContainer>
            Copyright © 2012-2021 · Ben McCormick
          </CopyRightContainer>
        </InnerFooter>
      </FooterContainer>
    );
  }
}
