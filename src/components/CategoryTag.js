import PropTypes from 'prop-types';
import React from 'react';
import categoryList from '../pages/categories.json';
import get from 'lodash/get';
import find from 'lodash/find';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const CategoryName = styled.div({
  '&:hover': {
    textDecoration: 'none',
  },
});

class CategoryTag extends React.Component {
  render() {
    let { category } = this.props;
    let categories = get(categoryList, 'categories', []);
    let selectedCategory = find(categories, { key: category });

    let title = selectedCategory ? selectedCategory.title : 'Not Filed';
    return (
      <Link to={`/category/${category}`}>
        <CategoryName>{title}</CategoryName>
      </Link>
    );
  }
}

CategoryTag.propTypes = {
  category: PropTypes.string.isRequired,
  includeText: PropTypes.bool.isRequired,
};

CategoryTag.defaultProps = {
  includeText: true,
};

export default CategoryTag;
