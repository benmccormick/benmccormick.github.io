import React from 'react';
import { scale } from '../utils/typography';

export class EmailSubscribe extends React.Component {
  render() {
    /* eslint-disable no-inline-comments */
    return (
      <div className="subscribe-block">
        <div id="mc_embed_signup">
          <h6
            style={{
              margin: 0,
              fontSize: scale(-0.5).fontSize,
              lineHeight: scale(-0.5).lineHeight,
              letterSpacing: -0.25,
            }}
          >
            Subscribe via email
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
              <div className="mc-field-group sidebar-group">
                <input
                  type="email"
                  defaultValue=""
                  name="EMAIL"
                  className="subscribe-email required email"
                  id="mce-EMAIL"
                  placeholder="Email Address"
                />
                <input
                  type="submit"
                  value=">"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="subscribe-button button"
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
      </div>
    );
  }
}
