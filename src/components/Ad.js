import React from 'react';
import defer from 'lodash/defer';
import glamorous from 'glamorous';
import { sansFontStack } from '../utils/typography';

const AdWrapper = glamorous.div({
  width: '100%',
  overflow: 'hidden',
  margin: '0 0 1rem 0',
  '@media all and (max-width: 700px)': {
    display: 'none',
  },
  fontSize: '14px',
  position: 'relative',
  fontFamily: sansFontStack,
  background: 'rgba(99, 159, 110, 0.25)',
  border: '1px solid #f0f0f0',
  padding: '4px',
  minHeight: '100px',
  opacity: '0',
  transition: 'opacity ease 3s',
});

const AdFallback = () => {
  return (
    <div>
      {' '}
      <h4>Hi There!</h4>
      <p>
        Since it looks like you may be blocking ads, please consider supporting
        the site a different way.
      </p>
      <ul>
        <li>
          <a href="/readinglist">
            By buying yourself a book from my list of recommended books using my
            affiliate link.
          </a>
        </li>
        <li>
          <a href="https://events.durhamhabitat.org/give/29153/#!/donation/checkout">
            Support something I believe in by making a small donation to my
            local chapter of Habitat For Humanity.
          </a>
        </li>
      </ul>
    </div>
  );
};

export class Ad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triedToShowAd: false,
      failedToShowAd: false,
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
    this.setState({ triedToShowAd: true });
    setTimeout(() => {
      let children = Array.from(this.container.childNodes);
      if (children.length > 1) {
        return;
      }
      this.setState({ failedToShowAd: true });
    }, 2000);
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
    let { failedToShowAd, triedToShowAd } = this.state;
    let styleObj = triedToShowAd ? { opacity: 1 } : {};
    if (failedToShowAd) {
      styleObj.padding = '10px';
    }
    let children = failedToShowAd ? <AdFallback /> : null;
    return (
      <AdWrapper innerRef={el => (this.container = el)} style={styleObj}>
        {children}
      </AdWrapper>
    );
  }
}

Ad.propTypes = {};
