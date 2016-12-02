import React from 'react';
import { Container } from 'react-responsive-grid';
import { rhythm } from 'utils/typography';
import { config } from 'config';
import { Header } from '../components/Header';
import '../css/mobile.css';

class Template extends React.Component {
  render() {
    const {children } = this.props;
    return (
      <Container
        style = {{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header blogTitle = {config.blogTitle}/>
        {children}
      </Container>
    );
  }
}

Template.propTypes = {
  children: React.PropTypes.any,
  route: React.PropTypes.object,
};

export default Template;
