import React from 'react';
import CategoryArchive from 'components/CategoryArchive';

const FrameworksCategoryPage = ({route}) => <CategoryArchive
  pages = {route.pages}
  categoryKey = 'frameworks'
/>;

FrameworksCategoryPage.propTypes = {
  route: React.PropTypes.object,
};

export default FrameworksCategoryPage;
