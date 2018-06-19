import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { TypographyStyle } from 'react-typography';
import { GA } from './components/GA';
import typography from './utils/typography';

class HTML extends React.Component {
  render() {
    const { body } = this.props;
    const head = Helmet.rewind();

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png?v=yyxgnp97qG"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-32x32.png?v=yyxgnp97qG"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-16x16.png?v=yyxgnp97qG"
            sizes="16x16"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/safari-pinned-tab.svg?v=yyxgnp97qG"
            color="#57a3e8"
          />
          <link
            rel="alternate"
            title="JSON Feed"
            type="application/json"
            href="/feed.json"
          />

          <link rel="shortcut icon" href="/favicon.ico?v=yyxgnp97qG" />
          <meta name="theme-color" content="#ffffff" />
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.script.toComponent()}
          <TypographyStyle typography={typography} />
          {this.props.headComponents}
        </head>
        <body
          className="landing-page"
          style={{
            background: '#FCFCFC',
            padding: '0 10px',
          }}
        >
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          <GA />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}

HTML.propTypes = {
  body: PropTypes.string,
  headComponents: PropTypes.any,
  postBodyComponents: PropTypes.any,
};

export default HTML;
