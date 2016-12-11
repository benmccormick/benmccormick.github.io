import React from 'react';
import { rhythm } from 'utils/typography';
import { prefixLink } from 'gatsby-helpers';
import '../css/footer.css';

class Footer extends React.Component {
  render() {
    /* eslint-disable max-len */
    /* eslint-enable max-len */
    return (
      <div
        style = {{
          marginBottom: rhythm(2.5),
        }}
      >
        <a
          name = "subscribe"
          className = "subscribe-button"
          href = {prefixLink('/subscribe/')}
        >Subscribe </a>
      </div>
    );
  }
}

export default Footer;
