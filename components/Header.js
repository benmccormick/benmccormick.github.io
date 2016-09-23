import React from 'react'
import { Link } from 'react-router'
import { config } from 'config'
import { rhythm } from 'utils/typography'
import { prefixLink } from 'gatsby-helpers'
import { Ad } from './Ad';
import '../css/header.css';

export class Header extends React.Component {
  render () {
    let {blogTitle} = this.props;
    return (
        <div style= {{
            display: 'flex',
            // borderBottom: '1px solid rgba(200, 200, 200, 0.5)',
            paddingBottom: '0.5rem',
            marginBottom: '0.5rem',
        }}>
            <div style= {{
                flexGrow: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}>
                <h3
                  style={{
                    margin: 0,
                    paddingBottom: 0,
                  }}
                >
                  <Link
                    style={{
                      boxShadow: 'none',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                    to={prefixLink('/')}
                  >
                    {blogTitle}
                  </Link>
                </h3>
                <div style={{
                    //paddingBottom: '1rem',
                    color: 'rgba(100,100,100, 0.7)',
                }}>
                    <Link
                        className="header-link"
                        to={prefixLink('/')}
                    >
                    Subscribe
                    </Link>
                    <span style={{padding:'0 0.33rem'}}>•</span>
                    <Link
                        className="header-link"
                        to={prefixLink('/')}
                    >
                    Reading List
                    </Link>
                    <span style={{padding:'0 0.33rem'}}>•</span>
                    <Link
                        className="header-link"
                        to={prefixLink('/')}
                    >
                    Twitter
                    </Link>
                    <span style={{padding:'0 0.33rem'}}>•</span>
                    <Link
                        className="header-link"
                        to={prefixLink('/')}
                    >
                    About
                    </Link>
                </div>
            </div>
            <div style= {{
                flexShrink: 2,
            }} >
                <Ad/>
            </div>
        </div>
    )
  }
}



Header.propTypes = {
    blogTitle: React.PropTypes.isRequired,
};
