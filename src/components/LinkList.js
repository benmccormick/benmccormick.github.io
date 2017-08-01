import React from 'react';
import PageLink from './PageLink';

class LinkList extends React.Component {
  render() {
    let { pages, title, showCategory, showDate } = this.props;
    let pageLinks = pages.map(page =>
      <PageLink
        page={page}
        showCategory={showCategory}
        key={page.path}
        showDate={showDate}
      />
    );
    return (
      <div>
        {title
          ? <h2
              style={{
                color: 'inherit',
              }}
            >
              {title}
            </h2>
          : null}
        <ul
          style={{
            marginLeft: 0,
            paddingLeft: 0,
          }}
        >
          {pageLinks}
        </ul>
      </div>
    );
  }
}

LinkList.propTypes = {
  pages: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  showCategory: React.PropTypes.bool.isRequired,
  showDate: React.PropTypes.bool.isRequired,
};

LinkList.defaultProps = {
  showCategory: true,
  showDate: true,
};

export default LinkList;
