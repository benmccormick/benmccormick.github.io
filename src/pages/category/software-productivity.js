import React from 'react';
import CategoryArchive from '../../components/CategoryArchive';


const ProductivityCategoryPage = ({route}) => <CategoryArchive
  pages = {route.pages}
  categoryKey = 'software-productivity'
/>;

ProductivityCategoryPage.propTypes = {
  route: React.PropTypes.object,
};

export default ProductivityCategoryPage;
