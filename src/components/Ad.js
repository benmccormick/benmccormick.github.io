import React from 'react';
import defer from 'lodash/defer';
import glamorous from 'glamorous';

const AdWrapper = glamorous.div({
  height: '300px',
  width: '150px',
  overflow: 'hidden',
  margin: '0 0 1rem 0',
  '@media all and (max-width: 700px)': {
    display: 'none',
  },
});

export class Ad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
    };
  }

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
    return <AdWrapper innerRef={el => (this.container = el)} />;
  }
}

Ad.propTypes = {};
