import React from 'react';
import ReactDisqusThread from 'react-disqus-thread';
import camelCase from 'lodash/camelcase';


export class Disqus extends React.Component {

    render () {
        let {title, url} = this.props;
        return <ReactDisqusThread
            shortname="benmccormick"
            title={title}
            url={url}
            // category_id="123456"
            // onNewComment={this.handleNewComment}
        />;
    }
}



Disqus.propTypes = {
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
};
