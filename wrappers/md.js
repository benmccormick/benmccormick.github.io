import React from 'react'
import moment from 'moment'
import Helmet from "react-helmet"
import ReadNext from '../components/ReadNext'
import { rhythm } from 'utils/typography'
import { config } from 'config'
import Bio from 'components/Bio'
import forEach from 'lodash/forEach'
import TwitterWidgetsLoader from 'twitter-widgets';

import '../css/zenburn.css'
import '../css/typography.css'
import '../css/images.css'

class MarkdownWrapper extends React.Component {

    componentDidMount() {
        let tweets = this.markdownContainer.querySelectorAll('.twitter-tweet');
        let followButtons = this.markdownContainer.querySelectorAll('.twitter-follow-button');
        TwitterWidgetsLoader.load(twttr => {
            forEach(tweets, tweet => {
                twttr.widgets.createTweet('20', tweet);
            });
            forEach(followButtons, button => {
                twttr.widgets.createFollowButton('', button);
            });
        });

    }

    render () {
        const { route } = this.props
        const post = route.page.data
        let isPage = post.layout === 'page';
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
          </div>
        )
    }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default MarkdownWrapper
