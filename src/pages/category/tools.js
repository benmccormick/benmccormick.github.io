import React from 'react';
import CategoryArchive from '../../components/CategoryArchive';


const ToolsCategoryPage = ({route}) => <CategoryArchive
  pages = {route.pages}
  categoryKey = 'tools'
/>;

ToolsCategoryPage.propTypes = {
  route: React.PropTypes.object,
};

export default ToolsCategoryPage;
