import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';
import PostFooter from '../components/PostFooter';
import { rhythm } from '../utils/typography';
import { Disqus } from '../components/Disqus';
import last from 'lodash/last';

import '../css/codeformat.css';
import '../css/typography.css';
import '../css/images.css';
import '../css/twitter.css';
import '../css/mailchimp.css';

class BlogPostTemplate extends React.Component {
  render() {
    const { location, data, pathContext } = this.props;
    const post = data.markdownRemark.frontmatter;
    const body = data.markdownRemark.html;
    let isPage = post.layout === 'page';
    let isPost = post.layout === 'post';
    let slug = last(post.path.split('/'));
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
                "Ben McCormick's blog on JavaScript and Web Development"
            },
            { name: 'keywords', content: post.keywords || '' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@benmccormickorg' },
            { name: 'twitter:creator', content: '@ben336' },
            { name: 'twitter:title', content: post.title },
            { name: 'twitter:description', content: post.description || '' },
            {
              name: 'twitter:image',
              content: post.image || 'http://benmccormick.org/logo.png'
            }
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
                }`
            }
          ]}
        />
        <h1
          style={{
            marginTop: rhythm(0.5)
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
                marginBottom: rhythm(1.25)
              }}
            >
              Originally Posted {moment(post.date).format('MMMM D, YYYY')}
            </h5>}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {isPost
          ? <PostFooter
              post={post}
              recommendedPosts={pathContext.relatedPosts}
            />
          : null}
        {post.hideFooter
          ? null
          : <hr
              style={{
                marginBottom: rhythm(2)
              }}
            />}
        {isPage || post.hideFooter
          ? null
          : <Disqus title={post.title} shortName={slug} url={url} />}
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
