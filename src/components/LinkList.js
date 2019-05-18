import React from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import styled from '@emotion/styled';

import PropTypes from 'prop-types';

import PageLink from './PageLink';

const ListTitle = styled('h1')({
  color: 'inherit',
});

const YearTitleContainer = styled('ul')({
  gridColumn: '1 / -1',
  padding: '30px 0 10px 0',
  margin: 0,
});

const YearTitleContent = styled('h4')({
  color: 'inherit',
  margin: 0,
  fontSize: '24px',
});

const YearTitle = props => (
  <YearTitleContainer>
    <YearTitleContent>{props.children}</YearTitleContent>
  </YearTitleContainer>
);

const List = styled('ul')({
  marginLeft: 0,
  paddingLeft: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, auto))',
  gridTemplateRows: 'auto',
  gridRowGap: '10px',
  gridColumnGap: '60px',
});

class LinkList extends React.Component {
  render() {
    let { pages, title, description, className, titleFn } = this.props;
    let pagesByYear = groupBy(pages, page => {
      return new Date(page.data.date).getFullYear();
    });
    let yearSections = map(pagesByYear, (yearPages, year) => {
      let pageLinks = yearPages.map(page => (
        <PageLink
          page={page}
          showCategory={true}
          key={page.path}
          showDate={true}
          showDescription={false}
          titleFn={titleFn}
        />
      ));
      return [
        year,
        <React.Fragment>
          <YearTitle key={`year-${year}`}>{year}</YearTitle>
          {pageLinks}
        </React.Fragment>,
      ];
    });
    yearSections = orderBy(yearSections, [0], ['desc']);
    return (
      <div className={className}>
        {title ? <ListTitle>{title}</ListTitle> : null}
        {description || null}
        <List>{map(yearSections, 1)}</List>
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
