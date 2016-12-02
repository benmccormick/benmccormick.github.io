export const onRouteUpdate = (state, page, pages) => window.ga ? window.ga('send', 'pageview', {
  page: state.pathname,
}) : null;
