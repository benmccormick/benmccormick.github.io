import get from 'lodash/get';
import includes from 'lodash/includes';
import parseInt from 'lodash/parseInt';
import sortBy from 'lodash/sortBy';
import take from 'lodash/take';
import findIndex from 'lodash/findIndex';

const isEligiblePage = page =>
  !includes(page.node.frontmatter.path, '/404') &&
  !page.node.frontmatter.dontfeature &&
  get(page, 'node.frontmatter.layout') === 'post';
const getSlug = p => get(p, 'node.fields.slug');

// this gets a list of slugs for most popular all time posts
export const getSlugsForMostPopularPosts = (pages, count) =>
  take(
    sortBy(pages, page =>
      parseInt(get(page, 'node.frontmatter.pageViews') || 0)
    )
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
    .filter(
      page => parseInt(get(page, 'node.frontmatter.last30pageViews') || 0) > 30
    );
  let rankByPopular = sortBy(pages, page =>
    parseInt(get(page, 'node.frontmatter.pageViews') || 0)
  );
  let rankByRecentlyPopular = sortBy(eligiblePages, page =>
    parseInt(get(page, 'node.frontmatter.last30pageViews') || 0)
  );
  let rankByTrending = sortBy(eligiblePages, page => {
    let getRankInList = list =>
      findIndex(list, popPage => getSlug(popPage) === getSlug(page));
    return getRankInList(rankByPopular) - getRankInList(rankByRecentlyPopular);
  });
  return take(rankByTrending.map(getSlug), count);
};

// this returns a list of popular posts, deprecated for now
export const getPopularPosts = (pages, count = Infinity) =>
  take(
    sortBy(pages, page =>
      parseInt(get(page, 'node.frontmatter.last30pageViews', 0))
    )
      .reverse()
      .filter(
        page =>
          !includes(page.node.frontmatter.path, '/404') &&
          !page.node.frontmatter.dontfeature &&
          get(page, 'node.frontmatter.layout') === 'post'
      )
      .map(p => ({ data: p.node.frontmatter, path: p.node.fields.slug })),
    count
  );

export const getSortedPosts = (pages, count = Infinity) => {
  let mostPopular = getSlugsForMostPopularPosts(pages, 10);
  let trending = getSlugsForTrendingPosts(pages, 10);
  const buildPage = rawPage => {
    let path = getSlug(rawPage);
    let data = rawPage.node.frontmatter;
    data.isTrending = includes(trending, path);
    data.isPopular = includes(mostPopular, path);
    return { data, path };
  };
  return take(
    sortBy(pages, page => get(page, 'node.frontmatter.date'))
      .reverse()
      .filter(page => get(page, 'node.frontmatter.layout') === 'post')
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
