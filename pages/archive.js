import React from 'react';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { config } from 'config';
import include from 'lodash/includes';
import LinkList from 'components/LinkList';

class CategoryArchive extends React.Component {
  render() {
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, (page) =>
      get(page, 'data.date')
    ).filter(page => get(page, 'file.ext') === 'md' &&
        !include(page.path, '/404') &&
        get(page, 'data.layout') === 'post'
    ).reverse();
    return (
      <div>
        <Helmet
          title = {config.blogTitle}
          meta = {[
            {'name': 'description', 'content': "Ben McCormick's blog"},
            {'name': 'keywords', 'content': 'blog, articles'},
          ]}
        />
        <LinkList
          pages = {sortedPages}
          title = 'Articles'
          showCategory = {true}
        />
      </div>
    );
  }
}

CategoryArchive.propTypes = {
  route: React.PropTypes.object,
};

export default CategoryArchive;
