import PropTypes from 'prop-types';
import React from 'react';
import typography from '../utils/typography';
import styled from '@emotion/styled';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../css/mobile.css';
import '../css/typography.css';

let { rhythm } = typography;

const Container = styled('div')({
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  padding: `${rhythm(1.5)} 20px`,
});

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <Container>
          <Header blogTitle={'Ben McCormick'} />
          {children}
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
