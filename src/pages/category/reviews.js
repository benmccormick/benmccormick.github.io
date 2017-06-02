import React from 'react';
import CategoryArchive from 'components/CategoryArchive';

const ReviewsCategoryPage = ({route}) => <CategoryArchive
  pages = {route.pages}
  categoryKey = 'reviews'
/>;

ReviewsCategoryPage.propTypes = {
  route: React.PropTypes.object,
};

export default ReviewsCategoryPage;
