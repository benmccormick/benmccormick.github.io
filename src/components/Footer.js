import React from 'react';
import { Link } from 'gatsby';
import '../css/header.css';
import glamorous from 'glamorous';
import { css } from 'glamor';
import { sansFontStack } from '../utils/typography';
import { PropTypes } from 'prop-types';
import { getTopicLinks } from '../utils/page-helpers';

const FooterWrapper = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  background: 'rgba(225, 225, 225, 0.7)',
  borderTop: '1px solid rgba(200,200,200,1)',
  width: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  padding: '30px 0',
  // paddingBottom: '2rem',
  // flexDirection: 'row',
  // justifyContent: 'space-between',
  // flexWrap: 'wrap',
});

const InnerFooter = glamorous.div({
  maxWidth: '960px',
  display: 'flex',
  justifyContent: 'space-between',
  flexGrow: '1',
});

const TopicWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '33%',
});

const LinksWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
});

const footerLink = css({
  color: 'rgba(50,50,50, 0.7)',
  // fontSize: '16px',
  fontFamily: sansFontStack,
  ':hover': {
    color: '#E2777A',
  },
});

export class Footer extends React.Component {
  render() {
    let { topics } = this.props;
    const topicLinks = getTopicLinks(topics, 5);
    return (
      <FooterWrapper>
        <InnerFooter>
          <TopicWrapper>
            <h4> Start Here </h4>
            <p>
              Thanks for visiting my site! If you made it this far for the first
              time, I'd recommend starting here:{' '}
              <Link to={'/start-here'}>Don't Skip This</Link>
            </p>
          </TopicWrapper>
          <LinksWrapper>
            <h4> Next Steps </h4>
            <Link className={footerLink} to={'/archive/'}>
              Post Archive
            </Link>
            <Link className={footerLink} to={'/links-archive/'}>
              Weekly Links Archive
            </Link>
            <Link className={footerLink} to={'/speaking/'}>
              Speaking History
            </Link>
            <a className={footerLink} href="http://twitter.com/ben336">
              Twitter
            </a>
            <Link className={footerLink} to={'/about/'}>
              About Me
            </Link>
          </LinksWrapper>
          <LinksWrapper>
            <h4> Topics </h4>
            {topicLinks.map(topic => (
              <Link className={footerLink} to={topic.path} key={topic.path}>
                {topic.data.title}
              </Link>
            ))}
          </LinksWrapper>
        </InnerFooter>
      </FooterWrapper>
    );
  }
}
Footer.propTypes = {
  topics: PropTypes.array,
};
