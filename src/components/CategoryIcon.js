import React from 'react';
import beaker from '../svg/beaker.svgi';
import book from '../svg/book.svgi';
import browser from '../svg/browser.svgi';
import code from '../svg/code.svgi';
import globe from '../svg/globe.svgi';
import info from '../svg/info.svgi';
import megaphone from '../svg/megaphone.svgi';
import project from '../svg/project.svgi';
import tools from '../svg/tools.svgi';
import question from '../svg/question.svgi';
import categoryList from '../pages/categories.json';
import Link from 'gatsby-link';
import get from 'lodash/get';
import find from 'lodash/find';
import { css } from 'glamor';
import Icon from './Icon.js';

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
};

const iconWrapper = css({
  fontFamily: 'brandon-grotesque, Helvetica, sans-serif',
  fontSize: '18px',
  color: 'rgba(87, 163, 232, 0.5)',
});

class CategoryIcon extends React.Component {
  render() {
    let { category, includeText } = this.props;
    let categories = get(categoryList, 'categories', []);
    let selectedCategory = find(categories, { key: category });

    let icon = selectedCategory ? icons[selectedCategory.icon] : question;
    let text = selectedCategory ? selectedCategory.title : 'Uncategorized';
    return (
      <Link to={`/category/${category}/`} className={iconWrapper}>
        <Icon icon={icon} color={'rgba(87, 163, 232, 0.5)'} />
        {includeText ? text : null}
      </Link>
    );
  }
}

CategoryIcon.propTypes = {
  category: React.PropTypes.string.isRequired,
  includeText: React.PropTypes.bool.isRequired,
};

CategoryIcon.defaultProps = {
  includeText: true,
};

export default CategoryIcon;
