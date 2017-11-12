import React from 'react';
import PageLink from './PageLink';
import glamorous from 'glamorous';
import get from 'lodash/get';

const ListTitle = glamorous.h2({
  color: 'inherit',
});

const List = glamorous.ul({
  marginLeft: 0,
  paddingLeft: 0,
});

class LinkList extends React.Component {
  render() {
    let {
      pages,
      title,
      showCategory,
      showDate,
      showDescriptions,
      description,
      className,
      titleFn,
      showPopular,
      showTrending,
    } = this.props;
    let pageLinks = pages.map(page =>
      <PageLink
        page={page}
        showCategory={showCategory}
        key={page.path}
        showDate={showDate}
        showDescription={showDescriptions}
        showPopular={showPopular}
        showTrending={showTrending}
        titleFn={titleFn}
      />
    );
    return (
      <div className={className}>
        {title
          ? <ListTitle>
              {title}
            </ListTitle>
          : null}
        {description || null}
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
  description: React.PropTypes.node,
  showCategory: React.PropTypes.bool.isRequired,
  showDate: React.PropTypes.bool.isRequired,
  showPopular: React.PropTypes.bool.isRequired,
  showTrending: React.PropTypes.bool.isRequired,
  showDescriptions: React.PropTypes.bool.isRequired,
  className: React.PropTypes.string.isRequired,
  titleFn: React.PropTypes.func.isRequired,
};

LinkList.defaultProps = {
  showCategory: true,
  showDate: true,
  showDescriptions: true,
  showPopular: false,
  showTrending: false,
  className: '',
  titleFn: page => get(page, 'data.title') || page.path,
};

export default LinkList;
