import React from 'react';
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
export class Ad extends React.Component {

    // componentDidMount() {
    // }

    render () {
        return <div>
            <div style= {{
                maxHeight:'6.5rem',
                display: 'flex',
                justifyContent: 'flex-end',
                background: '#F0F0F0',
                padding: '0.2rem'
            }} ref={el => this.ad = el} >
            <div>
            <a href="https://www.amazon.com/Effective-JavaScript-Specific-Software-Development/dp/0321812182/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=benmccormicko-20&linkId=204d9fef609d10bc79cb424fc44fd1ab" target="_blank">
            <img src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0321812182&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=benmccormicko-20" />
            <img src="https://ir-na.amazon-adsystem.com/e/ir?t=benmccormicko-20&l=li1&o=1&a=0321812182" width="1" height="1" alt="" style={{border:'none',  margin:'0px'}} />
            </a>
            </div>
            <div style = {{
                fontSize: '0.6em',
                lineHeight: '1em',
                maxWidth: '5rem',
                padding: '0 0.5rem',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'rgba(100, 100, 100, 0.701961)',
            }}
            >
                <span>Please support this blog by shopping on Amazon</span>
                <Link
                    to={prefixLink('/amazonlinks')}
                >
                 What is this?
                </Link>
            </div>
            </div>
        </div>
    }
}



Ad.propTypes = {
};
