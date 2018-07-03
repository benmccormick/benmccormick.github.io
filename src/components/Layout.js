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
  maxWidth: '960px',
  margin: '0 auto',
  padding: `${rhythm(1.5)} ${rhythm(3 / 4)} 0 ${rhythm(3 / 4)} `,
});

class Layout extends React.Component {
  render() {
    const { children, history, topics } = this.props;

    return (
      <Container>
        <Header blogTitle={'benmccormick.org'} history={history} />
        {children}
        <Footer topics={topics} />
      </Container>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object,
  topics: PropTypes.array,
};

Layout.defaultProps = {
  topics: [],
};

export default Layout;
