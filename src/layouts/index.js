import React from 'react';
import { Container } from 'react-responsive-grid';
import { rhythm } from '../utils/typography';
// import { config } from 'config';
import { Header } from '../components/Header';
import '../css/mobile.css';
import '../css/typography.css';

class Template extends React.Component {
  render() {
    const {children, history } = this.props;
    return (
      <Container
        style = {{
          maxWidth: rhythm(26),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header blogTitle = {'benmccormick.org'} history = {history}/>
        {children()}
      </Container>
    );
  }
}

Template.propTypes = {
  children: React.PropTypes.any,
  route: React.PropTypes.object,
};

export default Template;
