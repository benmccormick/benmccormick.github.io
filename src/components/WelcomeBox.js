import React from 'react';
import { Link } from 'gatsby';
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
  opacity: 1,
  '&.loading': {
    opacity: 0,
  },
  transition: 'opacity 1s',
});

let WelcomeContainer = glamorous.div({
  maxWidth: '1000px',
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
  componentDidMount() {
    // react was being annoying about applying animations
    // when I did this through a state change because we need the image to be
    // loaded so old school it is ¯\_(ツ)_/¯
    this.img.src = this.img.dataset.src;
    this.img.onload = () => this.img.classList.remove('loading');
  }
  render() {
    return (
      <Wrapper>
        <WelcomeContainer>
          <h1> Hi! I'm Ben. </h1>
          <p>
            {' '}
            I make software in Durham, North Carolina. Here on the site I write
            about <strong>shipping web software</strong>. If you're interested
            seeing more, feel free to <Link to="/subscribe">subscribe</Link> or
            message me on <a href="mailto:ben@benmccormick.org">email</a> or{' '}
            <a href="http://twitter.com/ben336" target="_blank">
              Twitter
            </a>.
          </p>
        </WelcomeContainer>
        <ImageContainer>
          <Image
            key="avatar-image"
            innerRef={el => (this.img = el)}
            className="loading"
            data-src={'/headshot.jpeg'}
          />
        </ImageContainer>
      </Wrapper>
    );
  }
}

WelcomeBox.propTypes = {};
