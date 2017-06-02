import React from 'react';
import CategoryArchive from 'components/CategoryArchive';

const OpinionCategoryPage = ({route}) => <CategoryArchive
  pages = {route.pages}
  categoryKey = 'opinion'
/>;

OpinionCategoryPage.propTypes = {
  route: React.PropTypes.object,
};

export default OpinionCategoryPage;
