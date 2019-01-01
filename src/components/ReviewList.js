import React from 'react';
import get from 'lodash/get';
import glamorous, { Blockquote } from 'glamorous';

import PropTypes from 'prop-types';

import ReviewBox from './ReviewBox';

const ListTitle = glamorous.h2({
  color: 'inherit',
});

const ListItem = glamorous.li({
  listStyle: 'none',
  display: 'block',
});

const List = glamorous.ul({
  display: 'grid',
  gridTemplateColumns: '30% 30% 30%',
  gridColumnGap: '5%',
  gridRowGap: '30px',
  gridAutoRows: '1fr',

  '@media all and (max-width: 960px)': {
    gridTemplateColumns: '45% 45%',
    gridColumnGap: '10%',
    justifyContent: 'center',
  },
  '@media all and (max-width: 700px)': {
    gridTemplateColumns: '300px',
    justifyContent: 'center',
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
