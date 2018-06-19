import React from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

import { HeadContent } from './HeadContent';
import LinkList from '../components/LinkList';
import categoryHash from '../pages/categories.json';

class CategoryArchive extends React.Component {
  render() {
    let { pages, categoryKey } = this.props;
    let categoryData = find(categoryHash.categories, { key: categoryKey });
    // Sort pages.
    const sortedPages = sortBy(pages, page => get(page, 'data.date'))
      .filter(
        page =>
          page.data.category === categoryKey &&
          get(page, 'data.layout') === 'post'
      )
      .reverse();

    let { description, title } = categoryData;

    let titleText = `${title} Articles`;
    return (
      <div>
        <HeadContent
          title={`benmccormick.org - ${titleText}`}
          keywords={`blog,articles,posts,${titleText}`}
        />
        <LinkList
          pages={sortedPages}
          title={titleText}
          description={<p>{description}</p>}
          showCategory={false}
        />
      </div>
    );
  }
}

export default CategoryArchive;
