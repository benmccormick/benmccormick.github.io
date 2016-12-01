import React from 'react';
import { Link, browserHistory } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import GoogleAd from 'react-google-ad'

export class Ad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          url: null,
        };
    }

    insertScript() {
        //build script
        const script = document.createElement("script");
        script.src = "//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=benmccormickorg";
        script.type = "text/javascript";
        script.id = "_carbonads_js";
        script.async = true;
        //remove anything in the container
        while (this.container.hasChildNodes()) {
            this.container.removeChild(this.container.lastChild);
        }
        //insert script
        this.container.appendChild(script);
    }

    componentDidMount() {
      browserHistory.listen( location =>  {
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
      return <span ref={el => this.container = el}/>;
    }
}



Ad.propTypes = {
};
