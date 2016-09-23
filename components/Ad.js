import React from 'react';
import { Link } from 'react-router'
import postscribe from 'postscribe';
import { prefixLink } from 'gatsby-helpers'
export class Ad extends React.Component {

    setAdInfoOnWindow() {
        if (!window) {
            //not sure if this is needed but no need
            // to mess with this within node
            return;
        }
        window.amzn_assoc_placement = "adunit0";
        window.amzn_assoc_search_bar = "false";
        window.amzn_assoc_tracking_id = "benmccormicko-20";
        window.amzn_assoc_ad_mode = "manual";
        window.amzn_assoc_ad_type = "smart";
        window.amzn_assoc_marketplace = "amazon";
        window.amzn_assoc_region = "US";
        window.amzn_assoc_title = "Recommended Books";
        window.amzn_assoc_linkid = "2ffa49c2cfca0d624a2a33e1672da158";
        window.amzn_assoc_asins = "0321812182,1680501275,1934356964,020161622X,1593277571";
        window.amzn_assoc_size = "130x300";
    }

    insertAdScript() {
        const script = document.createElement("script");

        script.src = "//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US";
        //script.async = true;

        postscribe(this.ad, '<script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>');
    }

    componentDidMount() {
        // this.setAdInfoOnWindow();
        // this.insertAdScript();
        console.log('hi');
    }

    render () {
        return <div>
            <a href="https://www.amazon.com/Effective-JavaScript-Specific-Software-Development/dp/0321812182/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=benmccormicko-20&linkId=204d9fef609d10bc79cb424fc44fd1ab" target="_blank">
            <div style= {{
                maxHeight:'6.5rem',
                display: 'flex',
                justifyContent: 'flex-end',
                background: '#F0F0F0',
                padding: '0.2rem'
            }} ref={el => this.ad = el} >
            <div>
            <img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0321812182&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=benmccormicko-20" />
            <img src="https://ir-na.amazon-adsystem.com/e/ir?t=benmccormicko-20&l=li1&o=1&a=0321812182" width="1" height="1" border="0" alt="" style={{border:'none',  margin:'0px'}} />
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
            </a>
        </div>
    }
}



Ad.propTypes = {
};
