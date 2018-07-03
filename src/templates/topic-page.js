import React from 'react';
import TopicArchive from '../components/TopicArchive';
import Layout from '../components/Layout';
import { getSortedPosts } from '../utils/page-helpers';

const TopicPage = ({ data, pageContext, history }) => {
  const { posts, topic } = pageContext;
  const sortedPosts = getSortedPosts(posts);

  const topics = data.site.siteMetadata.featuredTopics;
  return (
    <Layout history={history} topics={topics}>
      <TopicArchive pages={sortedPosts} topic={topic} />
    </Layout>
  );
};

export default TopicPage;

export const pageQuery = graphql`
  query TopicQuery {
    site {
      siteMetadata {
        featuredTopics
      }
    }
  }
`;
