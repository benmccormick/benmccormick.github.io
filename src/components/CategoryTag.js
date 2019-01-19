import PropTypes from 'prop-types';
import React from 'react';
import beaker from '../svg/beaker.svgi';
import book from '../svg/book.svgi';
import browser from '../svg/browser.svgi';
import code from '../svg/code.svgi';
import globe from '../svg/globe.svgi';
import organization from '../svg/organization.svgi';
import info from '../svg/info.svgi';
import megaphone from '../svg/megaphone.svgi';
import project from '../svg/project.svgi';
import tools from '../svg/tools.svgi';
import question from '../svg/question.svgi';
import desktop from '../svg/desktop.svgi';
import categoryList from '../pages/categories.json';
import get from 'lodash/get';
import find from 'lodash/find';
import Icon from './Icon.js';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { css } from 'glamor';
import { sansFontStack } from '../utils/typography';

let icons = {
  beaker,
  book,
  browser,
  code,
  globe,
  info,
  megaphone,
  project,
  tools,
  desktop,
  organization,
};

const CategoryName = styled.div({
  '&:hover': {
    textDecoration: 'none',
  },
});

const tagBuilder = (color, textColor) => {
  return css({
    fontFamily: sansFontStack,
    fontSize: '0.75rem',
    background: color,
    color: textColor,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '0.25rem',
    padding: '0.125rem 0.35rem',
    width: '12rem',
    height: '2rem',
    '&:hover': {
      textDecoration: 'none',
    },
  });
};

const IconWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  marginRight: '0.1rem',
});

class CategoryTag extends React.Component {
  render() {
    let { category } = this.props;
    let categories = get(categoryList, 'categories', []);
    let selectedCategory = find(categories, { key: category });

    let icon = selectedCategory ? icons[selectedCategory.icon] : question;
    let color = selectedCategory ? selectedCategory.color : 'red';
    let textColor =
      selectedCategory && selectedCategory.altColor
        ? selectedCategory.altColor
        : 'rgba(256,256,256,1)';
    let tag = tagBuilder(color, textColor);
    let title = selectedCategory ? selectedCategory.title : 'Not Filed';
    return (
      <Link className={tag} to={`/category/${category}`}>
        <IconWrapper>
          <Icon icon={icon} color={textColor} dimensions={0.8} />
        </IconWrapper>
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
