import React from 'react';
import CategoryArchive from '../../components/CategoryArchive';


const JavaScriptCategoryPage = ({route}) => <CategoryArchive
  pages = {route.pages}
  categoryKey = 'javascript'
/>;

JavaScriptCategoryPage.propTypes = {
  route: React.PropTypes.object,
};

export default JavaScriptCategoryPage;
