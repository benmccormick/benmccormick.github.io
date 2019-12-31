import React from 'react';
import TopicArchive from '../components/TopicArchive';
import Layout from '../components/Layout';
import { getSortedPosts } from '../utils/page-helpers';
import '../utils/kusty';

const TopicPage = ({ data, pageContext, history }) => {
  const { posts, topic } = pageContext;
  const sortedPosts = getSortedPosts(posts);

  return (
    <Layout history={history}>
      <TopicArchive pages={sortedPosts} topic={topic} />
    </Layout>
  );
};

export default TopicPage;
