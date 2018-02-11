import React from 'react';
import { HeadContent } from './HeadContent';
import LinkList from '../components/LinkList';

class TopicArchive extends React.Component {
  render() {
    let { pages, topic } = this.props;

    let titleText = `${topic} (${pages.length} Articles)`;
    return (
      <div>
        <HeadContent
          title={`benmccormick.org - ${topic}`}
          keywords={`blog,articles,posts,${topic}`}
        />
        <LinkList pages={pages} title={titleText} showCategory={false} />
      </div>
    );
  }
}

export default TopicArchive;
