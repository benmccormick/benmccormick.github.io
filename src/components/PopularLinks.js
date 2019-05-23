import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { getPopularPosts } from '../utils/page-helpers';
import { sansFontStack } from '../utils/typography';

const Container = styled('div')({
  display: 'flex',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  fontFamily: sansFontStack,
  fontSize: '16px',
});

const Heading = styled('li')({
  fontWeight: 'bold',
  display: 'inline',
  margin: 0,
});
const List = styled('ul')({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  margin: 0,
});
const Item = styled('li')({
  margin: '0 0 0 20px',
  padding: 0,
  whiteSpace: 'pre',
  '&:nth-child(2)': {
    display: 'inline',
    margin: '0 0 0 5px',
  },
});

class PopularLinks extends React.Component {
  render() {
    let { pages, titleFn } = this.props;
    let popPages = getPopularPosts(pages, 5);
    return (
      <Container>
        <List>
          <Heading>Popular Posts: </Heading>
          {popPages.map((page, idx) => {
            return (
              <Item>
                <Link to={page.path} key={page.path}>
                  {titleFn(page)}
                </Link>
              </Item>
            );
          })}
        </List>
      </Container>
    );
  }
}

PopularLinks.propTypes = {
  pages: PropTypes.array.isRequired,
  titleFn: PropTypes.func.isRequired,
};

export default PopularLinks;
