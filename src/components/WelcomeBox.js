import React from 'react';
import Link from 'gatsby-link';
import glamorous from 'glamorous';

let Wrapper = glamorous.div({
  marginTop: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

let ImageContainer = glamorous.div({
  maxWidth: '200px',
  maxHeight: '200px',
  marginRight: '1rem',
});

let Image = glamorous.img({
  borderRadius: '50%',
});

export class WelcomeBox extends React.Component {
  render() {
    return (
      <Wrapper>
        <div style={{ maxWidth: '1000px', margin: '1rem 0' }}>
          <h1> Hi! I'm Ben. </h1>
          <p>
            {' '}I'm a software developer from Durham, North Carolina. I write
            and speak about JavaScript, software development, and developer
            tools. If you're interested in my writings here, feel free to{' '}
            <Link to="/subscribe">subscribe</Link> or message me on{' '}
            <a href="http://twitter.com/ben336" target="_blank">
              Twitter
            </a>{' '}
            or <a href="mailto:ben@benmccormick.org">email</a>.
          </p>
        </div>
        <ImageContainer className="no-mobile">
          <Image src="/headshot.jpeg" />
        </ImageContainer>
      </Wrapper>
    );
  }
}

WelcomeBox.propTypes = {};
