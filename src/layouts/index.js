import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-responsive-grid';
import typography from '../utils/typography';
// import { config } from 'config';
import { Header } from '../components/Header';
import '../css/mobile.css';
import '../css/typography.css';

let { rhythm } = typography;

class Template extends React.Component {
  render() {
    const { children, history } = this.props;
    return (
      <Container
        style={{
          // maxWidth: rhythm(26),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header blogTitle={'benmccormick.org'} history={history} />
        {children()}
      </Container>
    );
  }
}

Template.propTypes = {
  children: PropTypes.any,
  route: PropTypes.object,
};

export default Template;
