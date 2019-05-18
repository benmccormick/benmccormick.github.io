import React from 'react';
import get from 'lodash/get';
import styled from '@emotion/styled';

import PropTypes from 'prop-types';

import ReviewBox from './ReviewBox';

const ListTitle = styled('h1')({
  color: 'inherit',
});

const ListItem = styled('li')({
  listStyle: 'none',
  display: 'block',
});

const List = styled('ul')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 180px)',
  gridColumnGap: '40px',
  marginLeft: 0,
  gridRowGap: 'auto',
  gridAutoRows: '1fr',

  '@media all and (max-width: 400px)': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

class ReviewList extends React.Component {
  render() {
    let { pages, title, description, className, titleFn } = this.props;
    let pageLinks = pages.map(page => (
      <ListItem>
        <ReviewBox key={page.path} page={page} titleFn={titleFn} />
      </ListItem>
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

ReviewList.propTypes = {
  pages: PropTypes.array.isRequired,
  title: PropTypes.string,
  description: PropTypes.node,
  className: PropTypes.any.isRequired,
  titleFn: PropTypes.func.isRequired,
  useBox: PropTypes.bool.isRequired,
};

ReviewList.defaultProps = {
  className: '',
  useBox: false,
  titleFn: page => get(page, 'data.title') || page.path,
};

export default ReviewList;
