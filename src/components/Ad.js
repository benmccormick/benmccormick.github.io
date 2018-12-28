import React from 'react';
import defer from 'lodash/defer';
import glamorous from 'glamorous';

const AdWrapper = glamorous.div({
  width: '100%',
  overflow: 'hidden',
  margin: '0 0 1rem 0',
  '@media all and (max-width: 700px)': {
    display: 'none',
  },
});

export class Ad extends React.Component {
  insertScript() {
    if (!this.container) {
      // no ad container at this point, bail
      return false;
    }
    let existingAd = document.getElementById('carbonads');
    if (existingAd) {
      existingAd.remove();
    }
    //build script
    const script = document.createElement('script');
    script.src =
      '//cdn.carbonads.com/carbon.js?serve=CKYIK53M&placement=benmccormickorg';
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

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.insertScript();
    }
  }

  componentDidMount() {
    defer(() => this.insertScript());
  }

  render() {
    return <AdWrapper innerRef={el => (this.container = el)} />;
  }
}

Ad.propTypes = {};
