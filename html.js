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
          <link
            rel = "apple-touch-icon"
            sizes = "180x180"
            href = "/apple-touch-icon.png?v=yyxgnp97qG"
          />
          <link
            rel = "icon"
            type = "image/png"
            href = "/favicon-32x32.png?v=yyxgnp97qG"
            sizes = "32x32"
          />
          <link
            rel = "icon"
            type = "image/png"
            href = "/favicon-16x16.png?v=yyxgnp97qG"
            sizes = "16x16"
          />
          <link rel = "manifest" href = "/manifest.json"/>
          <link rel = "mask-icon" href = "/safari-pinned-tab.svg?v=yyxgnp97qG" color = "#57a3e8"/>
          <link
            rel = "alternate" title = "JSON Feed"
            type = "application/json" href = "/feed.json"
          />

          <link rel = "shortcut icon" href = "/favicon.ico?v=yyxgnp97qG"/>
          <meta name = "theme-color" content = "#ffffff"/>
          <script
            type = "text/javascript"
            src = "//use.typekit.net/msd6bqv.js"
          />
          <script
            type = "text/javascript"
            dangerouslySetInnerHTML = {{__html: 'try{Typekit.load();}catch(e){}'}}
          />
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.script.toComponent()}
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
          <script
            type = "text/javascript"
            dangerouslySetInnerHTML = {{ __html: `
              // adapted from: https://css-tricks.com/serviceworker-for-offline/
              // ServiceWorker is a progressive technology. Ignore unsupported browsers
              if ('serviceWorker' in navigator) {
              console.log('CLIENT: service worker registration in progress.');
              navigator.serviceWorker.register('/sw.js').then(function() {
                console.log('CLIENT: service worker registration complete.');
              }, function() {
                console.log('CLIENT: service worker registration failure.');
              });
              } else {
              console.log('CLIENT: service worker is not supported.');
              }
            `}}
          />
        </body>
      </html>
    );
  },
});
