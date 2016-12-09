import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';
import ReadNext from '../components/ReadNext';
import { rhythm } from 'utils/typography';
import { config } from 'config';
import Bio from '../components/Bio';
import {Disqus} from '../components/Disqus';
import forEach from 'lodash/forEach';
import last from 'lodash/last';
import defer from 'lodash/defer';
import TwitterWidgetsLoader from 'twitter-widgets';

import '../css/codeformat.css';
import '../css/typography.css';
import '../css/images.css';
import '../css/mailchimp.css';

class MarkdownWrapper extends React.Component {

  extractTwitterStatusID(tweetEl) {
      //this is a bit tricky, we have to grab the link to the tweet and extract the id from it
    let links = tweetEl.querySelectorAll('a');
      //it should be the last one
    let statusLink = last(links);
    if (!statusLink || !statusLink.href) {
      return undefined;
    }
      // regex magic
    let re = /status\/(\d+)$/;
    let result = statusLink.href.match(re);

    if (!result) {
      return undefined;
    }
    return result[1];

  }

  componentDidMount() {
    TwitterWidgetsLoader.load(twttr => {
      let tweets = this.markdownContainer.querySelectorAll('blockquote.twitter-tweet');
      let followButtons = this.markdownContainer.querySelectorAll('.twitter-follow-button');
      defer(() => {
        forEach(tweets, tweet => {
          let id = this.extractTwitterStatusID(tweet);
          let parent = tweet.parentNode;
          tweet.remove();
          let container = document.createElement('div');
          parent.appendChild(container);
          twttr.widgets.createTweet(id, parent);
        });
        forEach(followButtons, button => {
          twttr.widgets.createFollowButton('', button);
        });
      });
    });

  }

  render() {
    const { route, location } = this.props;
    const post = route.page.data;
    let isPage = post.layout === 'page';
    let slug = last(post.path.split('/'));
    let url = `http://benmccormick.org${location.pathname}`;
    return (
      <div className = "markdown" ref = {el => this.markdownContainer = el}>
        <Helmet
          title = {`${post.title} | ${config.blogTitle}`}
          meta = {[

            {'name': 'description', 'content': post.description ||
              'Ben McCormick\'s blog on JavaScript and Web Development'},
            {'name': 'keywords', 'content': post.keywords || ''},
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@benmccormickorg'},
            { name: 'twitter:creator', content: '@ben336'},
            { name: 'twitter:title', content: post.title},
            { name: 'twitter:description', content: post.description || ''},
          ]}
          script = {[
            {
              'type': 'application/ld+json',
              'innerHTML': `{
                "@context": "http://schema.org"
                "@type": "BlogPosting",
                "headline": "${post.title}",
                "genre": "Software Development",
                "keywords": "${post.keywords || ''}",
                "url": "${url}",
                "datePublished": "${moment(post.date).format('YYYY-MM-D')}",
                ${post.description ? `"description": "${post.description}",` : ''}
                "articleBody": "${post.body.replace(/\"/g, '\\"')}",
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
        {isPage ? null : <h5
          style = {{
            display: 'block',
            color: 'rgba(100,100,100, 0.7)',
            marginBottom: rhythm(1 / 4),
          }}
        >
          {moment(post.date).format('MMMM D, YYYY')}
        </h5>}
        <h1
          style = {{
            marginTop: 0,
            marginBottom: '1rem',
          }}
        >{post.title}</h1>
        <div
          className = "article-body"
          dangerouslySetInnerHTML = {{ __html: post.body }}
        />
        <hr
          style = {{
            marginBottom: rhythm(2),
          }}
        />
        <ReadNext post = {post} pages = {route.pages} />
        <Bio />
        {isPage ? null : <Disqus
          title = {post.title}
          shortName = {slug}
          url = {url}
        />}
      </div>
        );
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default MarkdownWrapper;
