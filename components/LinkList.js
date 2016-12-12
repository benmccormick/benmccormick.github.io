import React from 'react';
import PageLink from './PageLink';

class LinkList extends React.Component {

  render() {
    let { pages, title} = this.props;
    let pageLinks = pages.map(page => <PageLink page = {page} key = {page.path} />);
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
};

export default LinkList;
