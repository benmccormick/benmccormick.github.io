import React from 'react';
import get from 'lodash/get';
import styled from '@emotion/styled';

import PropTypes from 'prop-types';

import PageLink from './PageLink';

const ListTitle = styled('h2')({
  color: 'inherit',
});

const List = styled('ul')({
  marginLeft: 0,
  paddingLeft: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 30vw)',
  gridTemplateRows: 'auto',
  gridRowGap: '10px',
  gridColumnGap: '10vw',
});

class LinkList extends React.Component {
  render() {
    let { pages, title, description, className, titleFn } = this.props;
    let pageLinks = pages.map(page => (
      <PageLink
        page={page}
        showCategory={true}
        key={page.path}
        showDate={true}
        showDescription={false}
        titleFn={titleFn}
      />
    ));
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
};

LinkList.defaultProps = {
  showCategory: true,
  showDate: true,
  showDescriptions: true,
  className: '',
  titleFn: page => get(page, 'data.title') || page.path,
};

export default LinkList;
