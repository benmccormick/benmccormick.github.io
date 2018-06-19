import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import find from 'lodash/find';
import get from 'lodash/get';
import typography from '../utils/typography';
import categoryHash from '../pages/categories.json';
import InlineSVG from 'svg-inline-react';
import rss from '../pages/rss.svgi';
import { SubscribeBlock } from './SubscribeBlock';

let { rhythm, scale } = typography;

class Subscribe extends React.Component {
  render() {
    const { post } = this.props;
    const { category, subscribeText } = post;

    let categoryObj = find(categoryHash.categories, { key: category });

    let topic =
      subscribeText || get(categoryObj, 'subscribeText', 'Web development');

    /* eslint-disable no-inline-comments */
    return (
      <SubscribeBlock>
        <p>
          Thanks for taking the time to read this post!
          {' ' + topic} is one of the main topics of this blog, so if you
          enjoyed the post, please consider subscribing by using the feed,
          Twitter or my mailing list.
        </p>
        <div
          style={{
            marginBottom: rhythm(2.5),
          }}
        >
          <div id="mc_embed_signup">
            <h6
              style={{
                margin: 0,
                fontSize: scale(-0.5).fontSize,
                lineHeight: scale(-0.5).lineHeight,
                letterSpacing: -0.25,
              }}
            >
              EMAIL
            </h6>
            {/* eslint-disable max-len */}
            <form
              action="//benmccormick.us8.list-manage.com/subscribe/post?u=115446b80fd9d930ba091cc27&amp;id=f5b9f5acf2"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              noValidate
            >
              {/* eslint-enable max-len */}
              <div id="mc_embed_signup_scroll">
                <div
                  className="mc-field-group"
                  style={{ paddingRight: '30px' }}
                >
                  <input
                    type="email"
                    value=""
                    name="EMAIL"
                    className="required email"
                    id="mce-EMAIL"
                    placeholder="Email Address"
                  />
                  <input
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                  />
                </div>
                <div id="mce-responses" className="clear">
                  <div
                    className="response"
                    id="mce-error-response"
                    style={{ display: 'none' }}
                  />
                  <div
                    className="response"
                    id="mce-success-response"
                    style={{ display: 'none' }}
                  />
                </div>
                {/*
                      real people should not fill this in and expect good things -
                      do not remove this or risk form bot signups-->
                  */}
                <div
                  style={{ position: 'absolute', left: '-5000px' }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_115446b80fd9d930ba091cc27_f5b9f5acf2"
                    tabIndex="-1"
                    value=""
                  />
                </div>
                <div className="clear" />
              </div>
            </form>
          </div>

          <div className="rss">
            <h6
              style={{
                margin: 0,
                fontSize: scale(-0.5).fontSize,
                lineHeight: scale(-0.5).lineHeight,
                letterSpacing: -0.25,
              }}
            >
              RSS
            </h6>
            <Link to={'/rss/'}>
              <InlineSVG src={rss} className="rss-icon" /> <span>RSS</span>
            </Link>
          </div>

          <div>
            <h6
              style={{
                margin: 0,
                fontSize: scale(-0.5).fontSize,
                lineHeight: scale(-0.5).lineHeight,
                letterSpacing: -0.25,
              }}
            >
              TWITTER
            </h6>
            <div className="twitter-item">
              <span>Site Feed: </span>
              <a
                href="https://twitter.com/benmccormickorg"
                className="twitter-follow-button"
                data-show-count={false}
              >
                Follow @benmccormickorg
              </a>
            </div>
          </div>
          <div>
            <div className="twitter-item">
              <span>Personal Feed: </span>
              <a
                href="https://twitter.com/ben336"
                className="twitter-follow-button"
                data-show-count={false}
              >
                Follow @ben336
              </a>
            </div>
          </div>
        </div>
      </SubscribeBlock>
    );
  }
}

Subscribe.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Subscribe;
