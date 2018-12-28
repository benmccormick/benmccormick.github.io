import React from 'react';
import get from 'lodash/get';
import glamorous from 'glamorous';

import PropTypes from 'prop-types';

import LinkBox from './LinkBox';
import PageLink from './PageLink';

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
      useBox,
    } = this.props;
    let pageLinks = pages.map(
      page =>
        useBox ? (
          <LinkBox
            key={page.path}
            page={page}
            showDate={showDate}
            showCategory={showCategory}
            titleFn={titleFn}
          />
        ) : (
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
        )
    );
    return (
      <div className={className}>
        {title ? <ListTitle>{title}</ListTitle> : null}
        {description || null}
        <List>{pageLinks}</List>
      </div>
    );
  }
}

LinkList.propTypes = {
  pages: PropTypes.array.isRequired,
  title: PropTypes.string,
  description: PropTypes.node,
  showCategory: PropTypes.bool.isRequired,
  showDate: PropTypes.bool.isRequired,
  showPopular: PropTypes.bool.isRequired,
  showTrending: PropTypes.bool.isRequired,
  showDescriptions: PropTypes.bool.isRequired,
  className: PropTypes.any.isRequired,
  titleFn: PropTypes.func.isRequired,
  useBox: PropTypes.bool.isRequired,
};

LinkList.defaultProps = {
  showCategory: true,
  showDate: true,
  showDescriptions: true,
  showPopular: false,
  showTrending: false,
  className: '',
  useBox: false,
  titleFn: page => get(page, 'data.title') || page.path,
};

export default LinkList;
