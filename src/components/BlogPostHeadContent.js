import React from 'react';

import PropTypes from 'prop-types';

import { HeadContent } from './HeadContent';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

export class BlogPostHeadContent extends React.Component {
  render() {
    let { post, slug, body } = this.props;
    let url = `http://benmccormick.org/${slug}`;
    return (
      <HeadContent
        title={
          post.title ? `${post.title} | benmccormick.org` : 'benmccormick.org'
        }
        description={post.description}
        keywords={post.keywords}
        meta={[
          {
            'twitter:card': 'summary',
            'twitter:site': '@benmccormickorg',
            'twitter:creator': '@ben336',
            'twitter:title': post.title,
            'twitter:description': post.description || '',
            'twitter:image': post.image || 'http://benmccormick.org/logo.png',
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
                  "datePublished": "${format(parse(post.date), 'YYYY-MM-D')}",
                  ${
                    post.description
                      ? `"description": "${post.description}",`
                      : ''
                  }
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
    );
  }
}

BlogPostHeadContent.propTypes = {
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
