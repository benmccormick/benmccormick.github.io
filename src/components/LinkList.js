import React from 'react';
import PageLink from './PageLink';
import glamorous from 'glamorous';

const ListTitle = glamorous.h2({
  color: 'inherit',
});

const List = glamorous.ul({
  marginLeft: 0,
  paddingLeft: 0,
});

class LinkList extends React.Component {
  render() {
    let { pages, title, showCategory, showDate, description } = this.props;
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
          ? <ListTitle>
              {title}
            </ListTitle>
          : null}
        {description
          ? <p>
              {description}
            </p>
          : null}
        <List>
          {pageLinks}
        </List>
      </div>
    );
  }
}

LinkList.propTypes = {
  pages: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  showCategory: React.PropTypes.bool.isRequired,
  showDate: React.PropTypes.bool.isRequired,
};

LinkList.defaultProps = {
  showCategory: true,
  showDate: true,
};

export default LinkList;
