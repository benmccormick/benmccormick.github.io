import get from 'lodash/get';
import include from 'lodash/includes';
import parseInt from 'lodash/parseInt';
import sortBy from 'lodash/sortBy';
import take from 'lodash/take';

export const getSortedPosts = (pages, count = Infinity) =>
  take(
    sortBy(pages, page => get(page, 'node.frontmatter.date'))
      .reverse()
      .filter(page => get(page, 'node.frontmatter.layout') === 'post')
      .map(p => ({ data: p.node.frontmatter, path: p.node.fields.slug })),
    count
  );

export const getPopularPosts = (pages, count = Infinity) =>
  take(
    sortBy(pages, page =>
      parseInt(get(page, 'node.frontmatter.last30pageViews'))
    )
      .reverse()
      .filter(
        page =>
          !include(page.node.frontmatter.path, '/404') &&
          !page.node.frontmatter.dontfeature &&
          get(page, 'node.frontmatter.layout') === 'post'
      )
      .map(p => ({ data: p.node.frontmatter, path: p.node.fields.slug })),
    count
  );
