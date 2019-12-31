import '../css/codeformat.css';
import '../css/images.css';
import '../css/email.css';
import '../css/twitter.css';
import '../css/typography.css';

import React from 'react';
import format from 'date-fns/format';
import { graphql } from 'gatsby';

import { Ad } from '../components/Ad';
import { EmailSubscribe } from '../components/EmailSubscribe';
import { BlogPostHeadContent } from '../components/BlogPostHeadContent';
import Layout from '../components/Layout';
// import typography from '../utils/typography';
// import PostFooter from '../components/PostFooter';
import styled from '@emotion/styled';
// import { serifFontStack } from '../utils/typography';
import CategoryTag from '../components/CategoryTag';
import { Link } from 'gatsby';
import '../utils/kusty';

const Title = styled('h1')({
  display: 'block',
  maxWidth: '100%',
});

const InfoBox = styled('div')({
  fontSize: '14px',
  '& > h4': {
    fontSize: '20px',
    marginBottom: '6px',
  },
  '& > h6': {
    fontSize: '18px',
    marginBottom: '6px',
    marginTop: '12px',
  },
  backgroundColor: 'RGBA(191,237,253,0.5)',
  border: '1px solid #68d4fa',
  padding: '0.5rem',
});

const ArticleBody = styled('div')({
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

const Sidebar = styled('div')({
  paddingLeft: '2rem',
  overflow: 'hidden',
});

class BlogPostTemplate extends React.Component {
  render() {
    const { data, /*pageContext, */ location } = this.props;

    const post = data.markdownRemark.frontmatter;
    const body = data.markdownRemark.html;
    const slug = data.markdownRemark.fields.slug;
    // let isPost = post.layout === 'post';
    // let showForPostsOnly = content => (isPost ? content : null);
    let showWithSidebarSupport = content => (post.hideSidebar ? null : content);
    return (
      <Layout>
        <article className="markdown" ref={el => (this.markdownContainer = el)}>
          <BlogPostHeadContent post={post} slug={slug} body={body} />
          <div className="post-title-area">
            <Title>{post.title}</Title>
          </div>
          <div className={showWithSidebarSupport('columns')}>
            <ArticleBody dangerouslySetInnerHTML={{ __html: body }} />
            {showWithSidebarSupport(
              <Sidebar className="no-mobile">
                <EmailSubscribe />
                <Ad url={location.pathname} />
                <InfoBox>
                  <h4>Article Info</h4>
                  <h6>Author</h6>
                  <Link to="/about">Ben McCormick</Link>
                  {post.date ? (
                    <React.Fragment>
                      <h6>Publish Date</h6>
                      {format(new Date(post.date), 'MMMM Do YYYY')}
                    </React.Fragment>
                  ) : null}
                  {post.category ? (
                    <React.Fragment>
                      <h6>Category</h6>
                      <CategoryTag category={post.category} />
                    </React.Fragment>
                  ) : null}
                </InfoBox>
              </Sidebar>
            )}
          </div>
          {/* {showForPostsOnly(
            <PostFooter
              post={post}
              recommendedPosts={pageContext.relatedPosts}
            />
          )} */}
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
        hideSidebar
      }
      fields {
        slug
      }
    }
  }
`;
