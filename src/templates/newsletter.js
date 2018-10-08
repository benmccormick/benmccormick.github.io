import '../css/codeformat.css';
import '../css/images.css';
import '../css/mailchimp.css';
import '../css/twitter.css';
import '../css/typography.css';

import React from 'react';
import format from 'date-fns/format';
import { graphql } from 'gatsby';

import { Ad } from '../components/Ad';
import { EmailSubscribe } from '../components/EmailSubscribe';
import { BlogPostHeadContent } from '../components/BlogPostHeadContent';
import Layout from '../components/Layout';
import typography from '../utils/typography';
import PostFooter from '../components/PostFooter';
import glamorous from 'glamorous';
import { serifFontStack } from '../utils/typography';

const PostedDateContainer = glamorous.h5({
  display: 'block',
  fontFamily: serifFontStack,
  fontSize: '16px',
  color: 'rgba(100,100,100, 0.8)',
  marginTop: typography.rhythm(0.5),
  marginBottom: typography.rhythm(0.5),
});

const Title = glamorous.h1({
  display: 'block',
  maxWidth: '100%',
});

const ArticleBody = glamorous.div({
  maxWidth: '100%',
  '& li': {
    paddingLeft: '10px',
  },
  '& .reading-img img': {
    width: '150px',
    float: 'right',
    margin: '0px 10px 20px 10px',
  },
  '& img.full-width': {
    maxHeight: 'none',
  },
  '& img.half-width': {
    maxHeight: 'none',
    width: '50%',
  },
});

class NewsletterTemplate extends React.Component {
  render() {
    const { data, pageContext, history } = this.props;
    let { newsletterNum, recentArticles } = pageContext;
    const post = data.markdownRemark.frontmatter;
    const body = data.markdownRemark.html;
    const slug = data.markdownRemark.fields.slug;
    return (
      <Layout history={history}>
        <article className="markdown" ref={el => (this.markdownContainer = el)}>
          <BlogPostHeadContent post={post} slug={slug} body={body} />
          <div className="post-title-area">
            <Title>Newsletter #{newsletterNum}</Title>
          </div>
          <div className="columns">
            <ArticleBody dangerouslySetInnerHTML={{ __html: body }} />
          </div>
        </article>
      </Layout>
    );
  }
}

export default NewsletterTemplate;

export const pageQuery = graphql`
  query NewsletterBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        keywords
        category
        date
        path
        layout
        hideFooter
      }
      fields {
        slug
      }
    }
  }
`;
