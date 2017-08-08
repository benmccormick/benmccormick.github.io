import React from 'react';
import defer from 'lodash/defer';
// import { browserHistory } from 'react-router';

export class Ad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
    };
  }

  insertScript() {
    let existingAd = document.getElementById('carbonads');
    if (existingAd) {
      existingAd.remove();
    }
    //build script
    const script = document.createElement('script');
    script.src =
      '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=benmccormickorg';
    script.type = 'text/javascript';
    script.id = '_carbonads_js';
    script.async = true;
    //remove anything in the container
    while (this.container.hasChildNodes()) {
      this.container.removeChild(this.container.lastChild);
    }
    //insert script
    this.container.appendChild(script);
  }

  componentDidMount() {
    defer(() => this.insertScript());
    this.props.history.listen(location => {
      let url = location.pathname;
      if (url !== this.state.url) {
        this.insertScript();
      }
      this.setState({
        url,
      });
    });
  }

  render() {
    return <div className="ad-wrapper" ref={el => (this.container = el)} />;
  }
}

Ad.propTypes = {};
