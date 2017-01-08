import React from 'react';
import { config } from 'config';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {

    return (
      <p
        style = {{
          marginBottom: rhythm(2.5),
        }}
      >
        Written by {config.authorName}
      </p>
    );
  }
}

export default Bio;


