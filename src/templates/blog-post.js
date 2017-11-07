import '../css/codeformat.css';
import '../css/images.css';
import '../css/mailchimp.css';
import '../css/twitter.css';
import '../css/typography.css';

import React from 'react';
import format from 'date-fns/format';

import { Ad } from '../components/Ad';
import { EmailSubscribe } from '../components/EmailSubscribe';
import { BlogPostHeadContent } from '../components/BlogPostHeadContent';
import { fadeIn } from '../utils/react-helpers';
import { rhythm } from '../utils/typography';
import PostFooter from '../components/PostFooter';
import glamorous from 'glamorous';

const PostedDateContainer = glamorous.h5({
  display: 'block',
  fontFamily: 'ff-tisa-web-pro, serif',
  fontSize: '14px',
  color: 'rgba(100,100,100, 0.7)',
  marginTop: rhythm(0.5),
  marginBottom: rhythm(0.5),
});

const ArticleBody = glamorous.div({
  maxWidth: '600px',
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
  componentDidMount() {
    fadeIn(this.markdownContainer);
  }
  render() {
    const { data, pathContext, history } = this.props;
    const post = data.markdownRemark.frontmatter;
    const body = data.markdownRemark.html;
    const slug = data.markdownRemark.fields.slug;
    let isPost = post.layout === 'post';
    let showForPostsOnly = content => (isPost ? content : null);
    return (
      <div className="markdown" ref={el => (this.markdownContainer = el)}>
        <BlogPostHeadContent post={post} slug={slug} body={body} />
        <div className="post-title-area">
          <h1>
            {post.title}
          </h1>
          {showForPostsOnly(
            <PostedDateContainer>
              Originally Posted {format(new Date(post.date), 'MMMM Do YYYY')}
            </PostedDateContainer>
          )}
        </div>
        <div className="columns">
          <ArticleBody dangerouslySetInnerHTML={{ __html: body }} />
          {showForPostsOnly(
            <Sidebar className="no-mobile">
              <Ad history={history} />
              <EmailSubscribe />
            </Sidebar>
          )}
        </div>
        {showForPostsOnly(
          <PostFooter post={post} recommendedPosts={pathContext.relatedPosts} />
        )}
      </div>
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
