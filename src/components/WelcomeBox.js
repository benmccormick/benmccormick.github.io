import React from 'react';
import Link from 'gatsby-link';
import glamorous from 'glamorous';

let Wrapper = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '80% 20%',
  gridColumnGap: '1rem',
  marginBottom: '0.5rem',
  '@media all and (max-width: 700px)': {
    display: 'block',
  },
});

let ImageContainer = glamorous.div({
  maxWidth: '200px',
  maxHeight: '200px',
  marginRight: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '@media all and (max-width: 700px)': {
    display: 'none',
  },
});

let Image = glamorous.img({
  borderRadius: '50%',
  marginBottom: 0,
});

let WelcomeContainer = glamorous.div({
  maxWidth: '1000px',
  margin: '1rem 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

export class WelcomeBox extends React.Component {
  render() {
    return (
      <Wrapper>
        <WelcomeContainer>
          <h1> Hi! I'm Ben. </h1>
          <p>
            {' '}
            I'm a software developer from Durham, North Carolina. I write and
            speak about JavaScript, software development, and developer tools.
            If you're interested in my writings here, feel free to{' '}
            <Link to="/subscribe">subscribe</Link> or message me on{' '}
            <a href="http://twitter.com/ben336" target="_blank">
              Twitter
            </a>{' '}
            or <a href="mailto:ben@benmccormick.org">email</a>.
          </p>
        </WelcomeContainer>
        <ImageContainer>
          <Image src="/headshot.jpeg" />
        </ImageContainer>
      </Wrapper>
    );
  }
}

WelcomeBox.propTypes = {};
