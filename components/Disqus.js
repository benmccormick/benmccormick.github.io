import React from 'react';
import ReactDisqusThread from 'react-disqus-thread';

export class Disqus extends React.Component {

  render() {
    let {title, url} = this.props;
    return <ReactDisqusThread
      shortname = "benmccormick"
      title = {title}
      url = {url}
    />;
  }
}


Disqus.propTypes = {
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
};
