import React from 'react'
import { Link } from 'react-router'
import { Container } from 'react-responsive-grid'
import { prefixLink } from 'gatsby-helpers'
import { rhythm, adjustFontSizeToMSValue } from 'utils/typography'
import { config } from 'config'
import { Header } from '../components/Header';

class Template extends React.Component {
  render () {
    const { location, children } = this.props
    return (
      <Container
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3/4)}`,
        }}
      >
      <Header blogTitle={config.blogTitle}/>
        {children}
      </Container>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
