import React from 'react';
import PageLink from './PageLink';

class LinkList extends React.Component {

  render() {
    let { pages, title, showCategory} = this.props;
    let pageLinks = pages.map(page => <PageLink
      page = {page}
      showCategory = {showCategory}
      key = {page.path}
    />);
    return (<div>

      <h1>{title}</h1>
      <ul
        style = {{
          marginLeft: 0,
          paddingLeft: 0,
        }}
      >
        {pageLinks}
      </ul>
    </div>);
  }
}

LinkList.propTypes = {
  pages: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  showCategory: React.PropTypes.bool.isRequired,
};

LinkList.defaultProps = {
  showCategory: true,
};

export default LinkList;
