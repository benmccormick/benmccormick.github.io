import React from 'react';
import CategoryArchive from '../../components/CategoryArchive';


const MetaCategoryPage = ({route}) => <CategoryArchive
  pages = {route.pages}
  categoryKey = 'meta'
/>;

MetaCategoryPage.propTypes = {
  route: React.PropTypes.object,
};

export default MetaCategoryPage;
