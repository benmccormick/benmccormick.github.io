import React from 'react'
import moment from 'moment'
import Helmet from "react-helmet"
import ReadNext from '../components/ReadNext'
import { rhythm } from 'utils/typography'
import { config } from 'config'
import Bio from '../components/Bio'
import {Disqus} from '../components/Disqus'
import forEach from 'lodash/forEach'
import last from 'lodash/last'
import TwitterWidgetsLoader from 'twitter-widgets';
import { prefixLink } from 'gatsby-helpers'

import '../css/codeformat.css'
import '../css/typography.css'
import '../css/images.css'
import '../css/mailchimp.css'

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
        let tweets = this.markdownContainer.querySelectorAll('.twitter-tweet');
        let followButtons = this.markdownContainer.querySelectorAll('.twitter-follow-button');
        TwitterWidgetsLoader.load(twttr => {
            forEach(tweets, tweet => {
                let id = this.extractTwitterStatusID(tweet);
                twttr.widgets.createTweet(id, tweet);
            });
            forEach(followButtons, button => {
                twttr.widgets.createFollowButton('', button);
            });
        });

    }

    render () {
        const { route, location } = this.props
        const post = route.page.data
        let isPage = post.layout === 'page';
        let slug = last(post.path.split('/'));
        let url = `http://benmccormick.org/${location.pathname}`;
        return (
          <div className="markdown" ref={el => this.markdownContainer = el}>
            <Helmet
              title={`${post.title} | ${config.blogTitle}`}
            />
            {isPage ? null : <h5
              style={{
                display: 'block',
                color: 'rgba(100,100,100, 0.7)',
                marginBottom: rhythm(1/4),
              }}
            >
              {moment(post.date).format('MMMM D, YYYY')}
            </h5>}
            <h1 style={{
                marginTop: 0,
                marginBottom: '1rem',
            }}>{post.title}</h1>
            <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: post.body }}
            />
            <hr
              style={{
                marginBottom: rhythm(2),
              }}
            />
            <ReadNext post={post} pages={route.pages} />
            <Bio />
            {isPage ? null : <Disqus
              title={post.title}
              shortName={slug}
              url={url}
              />}
          </div>
        )
    }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default MarkdownWrapper
