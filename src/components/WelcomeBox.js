import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

let Wrapper = styled('div')({
  marginBottom: '0.5rem',
  '@media all and (max-width: 700px)': {
    display: 'block',
  },
});

let WelcomeContainer = styled('div')({
  // maxWidth: '1000px',
  margin: '1rem 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  fontSize: '120%',
  '@media all and (max-width: 700px)': {
    fontSize: '100%',
  },
});

export class WelcomeBox extends React.Component {
  render() {
    return (
      <Wrapper>
        <WelcomeContainer>
          <h1> Hi! I'm Ben. </h1>
          <p>
            {' '}
            I make software in Durham, North Carolina. This is my site where I
            write about <strong>engineering leadership </strong> and{' '}
            <strong>shipping web software</strong>. If you're interested seeing
            more, feel free to <Link to="/subscribe">subscribe</Link>.
          </p>
          <p>
            First time on the site? <Link to="/start-here">Start here.</Link>
          </p>
        </WelcomeContainer>
      </Wrapper>
    );
  }
}

WelcomeBox.propTypes = {};
