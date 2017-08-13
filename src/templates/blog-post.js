import '../css/codeformat.css';
import '../css/images.css';
import '../css/mailchimp.css';
import '../css/twitter.css';
import '../css/typography.css';

import Helmet from 'react-helmet';
import React from 'react';
import moment from 'moment';

import { Ad } from '../components/Ad';
import { EmailSubscribe } from '../components/EmailSubscribe';
import { rhythm } from '../utils/typography';
import PostFooter from '../components/PostFooter';

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    // Get the components DOM node
    let elem = this.markdownContainer;
    // Set the opacity of the element to 0
    elem.style.opacity = 0;
    window.requestAnimationFrame(function() {
      // Now set a transition on the opacity
      elem.style.transition = 'opacity 500ms';
      // and set the opacity to 1
      elem.style.opacity = 1;
    });
  }
  render() {
    const { location, data, pathContext, history } = this.props;
    const post = data.markdownRemark.frontmatter;
    const body = data.markdownRemark.html;
    let isPage = post.layout === 'page';
    let isPost = post.layout === 'post';
    let url = `http://benmccormick.org${location.pathname}`;
    return (
      <div className="markdown" ref={el => (this.markdownContainer = el)}>
        <Helmet
          title={`${post.title} | benmccormick.org`}
          meta={[
            {
              name: 'description',
              content:
                post.description ||
                "Ben McCormick's blog on JavaScript and Web Development",
            },
            { name: 'keywords', content: post.keywords || '' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@benmccormickorg' },
            { name: 'twitter:creator', content: '@ben336' },
            { name: 'twitter:title', content: post.title },
            { name: 'twitter:description', content: post.description || '' },
            {
              name: 'twitter:image',
              content: post.image || 'http://benmccormick.org/logo.png',
            },
          ]}
          script={[
            {
              type: 'application/ld+json',
              innerHTML: `{
                  "@context": "http://schema.org"
                  "@type": "BlogPosting",
                  "headline": "${post.title}",
                  "genre": "Software Development",
                  "keywords": "${post.keywords || ''}",
                  "url": "${url}",
                  "image": "${'http://benmccormick.org/logo.png'}",
                  "datePublished": "${moment(post.date).format('YYYY-MM-D')}",
                  ${post.description
                    ? `"description": "${post.description}",`
                    : ''}
                  "articleBody": "${body.replace(/\"/g, '\\"')}",
                    "author": {
                      "@type": "Person",
                      "name": "Ben McCormick"
                      "email": "mailto:ben@benmccormick.org",
                      "image": "/profile_pic.jpg",
                      "jobTitle": "Software Engineer",
                      "alumniOf": "Duke",
                      "birthPlace": "Pittsburgh, PA",
                      "gender": "male",
                      "url": "http://benmccormick.org",
                	    "sameAs" : [
                        "https://www.linkedin.com/in/benmccormick",
                        "http://twitter.com/ben336",
                      ]
                   }
                }`,
            },
          ]}
        />
        <div className="post-title-area">
          <h1
            style={{
              marginTop: rhythm(0.5),
            }}
          >
            {post.title}
          </h1>
          {isPage
            ? null
            : <h5
                style={{
                  display: 'block',
                  fontFamily: 'ff-tisa-web-pro, serif',
                  fontSize: '14px',
                  color: 'rgba(100,100,100, 0.7)',
                  marginTop: rhythm(0.5),
                  marginBottom: rhythm(1.25),
                }}
              >
                Originally Posted {moment(post.date).format('MMMM D, YYYY')}
              </h5>}
        </div>
        <div className="columns">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {isPost
            ? <div className="sidebar">
                <Ad history={history} />
                <EmailSubscribe />
              </div>
            : null}
        </div>
        {isPost
          ? <div>
              <hr />
              Have Comments? <a href="mailto:ben@benmccormick.org">
                Email me
              </a>, <a href="http://twitter.com/ben336">tweet at @ben336</a>, or
              write your own blog post and send me a link. I'll update the post
              to link to replies where possible.
              <hr />
            </div>
          : null}
        {isPost
          ? <PostFooter
              post={post}
              recommendedPosts={pathContext.relatedPosts}
            />
          : null}
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
    }
  }
`;
