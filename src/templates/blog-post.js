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

const Sidebar = glamorous.div({
  paddingLeft: '2rem',
});

class BlogPostTemplate extends React.Component {
  render() {
    const { data, pageContext, history } = this.props;
    const post = data.markdownRemark.frontmatter;
    const body = data.markdownRemark.html;
    const slug = data.markdownRemark.fields.slug;
    let isPost = post.layout === 'post';
    let isWeeklyLinks = post.layout === 'weekly-links';
    let isPostOrWeeklyLinks = isPost || isWeeklyLinks;
    let showForPostsOnly = content => (isPost ? content : null);
    let showForPostsAndWeeklyLinksOnly = content =>
      isPostOrWeeklyLinks ? content : null;
    return (
      <Layout history={history}>
        <article className="markdown" ref={el => (this.markdownContainer = el)}>
          <BlogPostHeadContent post={post} slug={slug} body={body} />
          <div className="post-title-area">
            {showForPostsOnly(
              <PostedDateContainer>
                {format(new Date(post.date), 'MMMM Do YYYY')}
              </PostedDateContainer>
            )}
            <Title>{post.title}</Title>
          </div>
          <div className="columns">
            <ArticleBody dangerouslySetInnerHTML={{ __html: body }} />
            {showForPostsAndWeeklyLinksOnly(
              <Sidebar className="no-mobile">
                <Ad history={history} />
                <EmailSubscribe />
              </Sidebar>
            )}
          </div>
          {showForPostsOnly(
            <PostFooter
              post={post}
              recommendedPosts={pageContext.relatedPosts}
            />
          )}
        </article>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
