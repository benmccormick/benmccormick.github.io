import categoryJSON from '../pages/categories.json';
import get from 'lodash/get';
import find from 'lodash/find';
import includes from 'lodash/includes';
import parseInt from 'lodash/parseInt';
import sortBy from 'lodash/sortBy';
import take from 'lodash/take';
import findIndex from 'lodash/findIndex';

const isDraft = page => get(page, 'node.frontmatter.isDraft', false);
const isEligiblePage = page =>
  !includes(page.node.frontmatter.path, '/404') &&
  !page.node.frontmatter.dontfeature &&
  get(page, 'node.frontmatter.layout') === 'post';
const getSlug = p => get(p, 'node.fields.slug');
const getRecentPageViews = page =>
  parseInt(get(page, 'node.frontmatter.last30pageViews') || 0);
const getPageViews = page =>
  parseInt(get(page, 'node.frontmatter.pageViews') || 0);

// this gets a list of slugs for most popular all time posts
export const getSlugsForMostPopularPosts = (pages, count) =>
  take(
    sortBy(pages, getPageViews)
      .reverse()
      .filter(isEligiblePage)
      .map(getSlug),
    count
  );

// this gets a list of slugs for most recently popular posts
export const getSlugsForTrendingPosts = (pages, count) => {
  let eligiblePages = pages
    .filter(isEligiblePage)
    // prevent cases where we're just moving up a deep pit at the bottom
    .filter(page => getRecentPageViews(page) > 30)
    // don't include things posted in the last 30 days
    .filter(page => getRecentPageViews(page) !== getPageViews(page));
  let rankByPopular = sortBy(pages, getPageViews);
  let rankByRecentlyPopular = sortBy(eligiblePages, getRecentPageViews);
  let rankByTrending = sortBy(eligiblePages, page => {
    let getRankInList = list =>
      findIndex(list, popPage => getSlug(popPage) === getSlug(page));
    return getRankInList(rankByPopular) - getRankInList(rankByRecentlyPopular);
  });
  return take(rankByTrending.map(getSlug), count);
};

// expects to be run against processed pages, not the raw nodes
// with frontmatter
export const getPopularPosts = (pages, count = Infinity) =>
  take(sortBy(pages, p => +p.data.last30pageViews).reverse(), count);

export const getSortedPosts = (
  pages,
  count = Infinity,
  includeReviews = false
) => {
  let mostPopular = getSlugsForMostPopularPosts(pages, 10);
  let trending = getSlugsForTrendingPosts(pages, 10);
  const buildPage = rawPage => {
    let path = getSlug(rawPage);
    let data = rawPage.node.frontmatter;
    data.isTrending = includes(trending, path);
    data.isPopular = includes(mostPopular, path);
    return { data, path };
  };
  let pageTypes = ['post'];
  if (includeReviews) {
    pageTypes.push('review');
  }
  return take(
    sortBy(pages, page => new Date(get(page, 'node.frontmatter.date')))
      .reverse()
      .filter(
        page =>
          includes(pageTypes, get(page, 'node.frontmatter.layout')) &&
          !isDraft(page) &&
          !get(page, 'node.frontmatter.dontfeature')
      )
      .map(buildPage),
    count
  );
};

export const getWeeklyLinks = (pages, count = Infinity) =>
  take(
    sortBy(pages, page => get(page, 'node.frontmatter.date'))
      .reverse()
      .filter(page => get(page, 'node.frontmatter.layout') === 'weekly-links')
      .map(p => ({ data: p.node.frontmatter, path: p.node.fields.slug })),
    count
  );

export const getSortedReviews = (pages, count = Infinity) =>
  take(
    sortBy(pages, page => get(page, 'node.frontmatter.date'))
      .reverse()
      .filter(
        page =>
          get(page, 'node.frontmatter.layout') === 'review' && !isDraft(page)
      )

      .map(p => ({ data: p.node.frontmatter, path: p.node.fields.slug })),
    count
  );

export const getTopicLinks = (topics, count = Infinity) =>
  take(
    topics.map(topic => ({ data: { title: topic }, path: `topics/${topic}` })),
    count
  );

export const getCategory = key => {
  let categories = get(categoryJSON, 'categories', []);
  return find(categories, { key });
};
