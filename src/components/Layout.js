import PropTypes from 'prop-types';
import React from 'react';
import typography from '../utils/typography';
import glamorous from 'glamorous';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../css/mobile.css';
import '../css/typography.css';

let { rhythm } = typography;

const Container = glamorous.div({
  width: '100%',
  maxWidth: '960px',
  margin: '0 auto',
  padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
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
