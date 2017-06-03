import React from 'react';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import find from 'lodash/find';
import Helmet from 'react-helmet';
import { config } from 'config';
import include from 'lodash/includes';
import LinkList from '../components/LinkList';
import categoryHash from '../pages/categories.json';

class CategoryArchive extends React.Component {
  render() {
    let {pages, categoryKey} = this.props;
    let categoryData = find(categoryHash.categories, {key: categoryKey});
    // Sort pages.
    const sortedPages = sortBy(pages, (page) => get(page, 'data.date'))
      .filter(page => get(page, 'file.ext') === 'md' &&
        page.data.category === categoryKey &&
        !include(page.path, '/404') &&
        get(page, 'data.layout') === 'post'
      ).reverse();

    let {description, title} = categoryData;

    let titleText = `${title} Articles`;
    return (
      <div>
        <Helmet
          title = {config.blogTitle}
          meta = {[
            {'name': 'description', 'content': "Ben McCormick's blog"},
            {'name': 'keywords', 'content': 'blog, articles'},
          ]}
        />
        <h1> {titleText} </h1>
        <p> {description}</p>
        <LinkList
          pages = {sortedPages}
          title = {null}
          showCategory = {false}
        />
      </div>
    );
  }
}

CategoryArchive.propTypes = {
  pages: React.PropTypes.object.isRequired,
  categoryKey: React.PropTypes.string.isRequired,
};

export default CategoryArchive;
