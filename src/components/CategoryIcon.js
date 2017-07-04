import React from 'react';
import InlineSVG from 'svg-inline-react';
import beaker from '../pages/category_icons/beaker.svgi';
import book from '../pages/category_icons/book.svgi';
import browser from '../pages/category_icons/browser.svgi';
import code from '../pages/category_icons/code.svgi';
import globe from '../pages/category_icons/globe.svgi';
import info from '../pages/category_icons/info.svgi';
import megaphone from '../pages/category_icons/megaphone.svgi';
import project from '../pages/category_icons/project.svgi';
import tools from '../pages/category_icons/tools.svgi';
import question from '../pages/category_icons/question.svgi';
import categoryList from '../pages/categories.json';
import Link from 'gatsby-link';
import get from 'lodash/get';
import find from 'lodash/find';
import '../css/categoryicon.css';

let icons = {
  beaker,
  book,
  browser,
  code,
  globe,
  info,
  megaphone,
  project,
  tools
};

class CategoryIcon extends React.Component {
  render() {
    let { category, includeText } = this.props;
    let categories = get(categoryList, 'categories', []);
    let selectedCategory = find(categories, { key: category });

    let icon = selectedCategory ? icons[selectedCategory.icon] : question;
    let text = selectedCategory ? selectedCategory.title : 'Uncategorized';
    return (
      <Link to={`/category/${category}/`} className="category-icon-wrapper">
        <span className={`category-icon category-icon-${category}`}>
          <InlineSVG src={icon} />
        </span>
        {includeText ? text : null}
      </Link>
    );
  }
}

CategoryIcon.propTypes = {
  category: React.PropTypes.string.isRequired,
  includeText: React.PropTypes.bool.isRequired
};

CategoryIcon.defaultProps = {
  includeText: true
};

export default CategoryIcon;
