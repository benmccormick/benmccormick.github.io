import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import map from 'lodash/map';
import concat from 'lodash/concat';

export class HeadContent extends React.Component {
  render() {
    let { title, description, keywords, meta, script } = this.props;
    let extraMetas = map(meta, (content, name) => ({ name, content }));
    return (
      <Helmet
        title={title}
        meta={concat(
          [
            {
              name: 'description',
              content: description,
            },
            {
              name: 'keywords',
              content: keywords,
            },
          ],
          extraMetas
        )}
        script={script}
      />
    );
  }
}

HeadContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
  script: PropTypes.array.isRequired,
  meta: PropTypes.array.isRequired,
};

HeadContent.defaultProps = {
  title: 'Ben McCormick',
  description: "Ben McCormick's blog on JavaScript and Web Development",
  keywords: 'blog javascript development code react vim',
  script: [],
  meta: [],
};
