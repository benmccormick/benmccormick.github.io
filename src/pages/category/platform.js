import React from 'react';
import CategoryArchive from '../../components/CategoryArchive';


const PlatformCategoryPage = ({route}) => <CategoryArchive
  pages = {route.pages}
  categoryKey = 'platform'
/>;

PlatformCategoryPage.propTypes = {
  route: React.PropTypes.object,
};

export default PlatformCategoryPage;
