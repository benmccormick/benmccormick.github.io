import React from 'react';
import TopicArchive from '../components/TopicArchive';
import { getSortedPosts } from '../utils/page-helpers';

const TopicPage = ({ data, pathContext }) => {
  const { posts, topic } = pathContext;
  const sortedPosts = getSortedPosts(posts);

  return <TopicArchive pages={sortedPosts} topic={topic} />;
};

export default TopicPage;
