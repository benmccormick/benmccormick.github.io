import React from 'react';
import { SubscribeBlock } from './SubscribeBlock';

export class EmailSubscribe extends React.Component {
  render() {
    /* eslint-disable no-inline-comments */
    return (
      <SubscribeBlock>
        <div id="revue-embed">
          <form
            action="http://herdinglions.benmccormick.org/add_subscriber"
            method="post"
            id="revue-form"
            name="revue-form"
            target="_blank"
          >
            <div className="revue-row">
              <div>Subscribe To My Newsletter</div>
              <input
                className="revue-form-field"
                placeholder="Your email address..."
                type="email"
                name="member[email]"
                id="member_email"
              />
              <input
                type="submit"
                value="Subscribe"
                name="member[subscribe]"
                id="member_submit"
              />
              <div className="revue-form-footer">
                By subscribing, you agree with Revue’s{' '}
                <a target="_blank" href="https://www.getrevue.co/terms">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a target="_blank" href="https://www.getrevue.co/privacy">
                  Privacy Policy
                </a>
                .
              </div>
            </div>
          </form>
        </div>
      </SubscribeBlock>
    );
  }
}
