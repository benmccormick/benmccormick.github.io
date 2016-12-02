import React from 'react';
import Helmet from 'react-helmet';
import { prefixLink } from 'gatsby-helpers';
import { TypographyStyle } from 'react-typography';
import {GA} from 'components/GA';
import typography from './utils/typography';

const BUILD_TIME = new Date().getTime();

module.exports = React.createClass({
  displayName: 'HTML',
  propTypes: {
    body: React.PropTypes.string,
  },
  render() {
    const { body } = this.props;
    const head = Helmet.rewind();

    let css;
    if (process.env.NODE_ENV === 'production') {
      css = <style dangerouslySetInnerHTML = {{ __html: require('!raw!./public/styles.css') }} />;
    }

    return (
      <html lang = "en">
        <head>
          <meta charSet = "utf-8" />
          <meta httpEquiv = "X-UA-Compatible" content = "IE=edge" />
          <meta
            name = "viewport"
            content = "width=device-width, initial-scale=1.0"
          />
          <script
            type = "text/javascript"
            src = "//use.typekit.net/msd6bqv.js"
          />
          <script
            type = "text/javascript"
            async = {true}
            src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          <script
            type = "text/javascript"
            dangerouslySetInnerHTML = {{__html: 'try{Typekit.load();}catch(e){}'}}
          />
          {head.title.toComponent()}
          {head.meta.toComponent()}
          <TypographyStyle typography = {typography} />
          {css}
        </head>
        <body
          className = "landing-page"
          style = {{
            background: '#FCFCFC',
            padding: '0 10px',
          }}
        >
          <div id = "react-mount" dangerouslySetInnerHTML = {{ __html: body }} />
          <script src = {prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
          <GA />
        </body>
      </html>
    );
  },
});
