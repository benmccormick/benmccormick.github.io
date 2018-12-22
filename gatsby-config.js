module.exports = {
  siteMetadata: {
    rootPath: __dirname,
    author: 'Ben McCormick',
    blogTitle: 'Ben McCormick',
    categories: [
      {
        title: 'JavaScript Frameworks and Libraries',
        description:
          'These posts cover development using JavaScript frameworks and libraries, including React, jQuery, Knockout, and Backbone',
        key: 'frameworks',
        icon: 'beaker',
        subscribeText: 'JavaScript development',
      },
      {
        title: 'JavaScript Language',
        description:
          'These posts cover the JavaScript language, its evolution over time, and practical usage examples.',
        key: 'javascript',
        icon: 'code',
        subscribeText: 'JavaScript',
      },
      {
        title: 'Productivity and Software Engineering',
        description:
          'These posts cover techniques and ideas around improving productivity and writing better software.',
        key: 'software-productivity',
        icon: 'project',
        subscribeText: 'Software engineering',
      },
      {
        title: 'Meta',
        key: 'meta',
        description:
          'These posts are updates about the site, messages to the readers or news from me',
        icon: 'info',
        subscribeText: 'Web development',
      },
      {
        title: 'Software Tools',
        description:
          'These posts cover tools and applications I use in software development',
        key: 'tools',
        icon: 'tools',
        subscribeText: 'Software tooling',
      },
      {
        title: 'Book and Product Reviews',
        description:
          "These posts are reviews of books I've read and products I've used",
        key: 'reviews',
        icon: 'book',
        subscribeText: 'Web development',
      },
      {
        title: 'Front End Architecture',
        description:
          'These posts cover ideas, practices and concepts related to structuring the front end code of web applications.',
        key: 'fe-architecture',
        icon: 'organization',
        color: '#C6687B',
        subscribeText: 'front end architecture',
      },
      {
        title: 'Web Platform',
        description:
          'These posts cover the technologies and standards behind the web, especially how they relate to software development',
        key: 'platform',
        icon: 'browser',
        subscribeText: 'The web platform',
      },
      {
        title: 'Opinion',
        description:
          'These posts cover my thoughts on a variety of technology related subjects',
        key: 'opinion',
        icon: 'megaphone',
        subscribeText: 'Web development',
      },
      {
        title: 'Computer Science',
        description:
          'These posts cover more academic computer science concepts',
        key: 'computer-science',
        icon: 'desktop',
        subscribeText: 'Computer Science',
      },
    ],
    featuredTopics: [
      'JavaScript',
      'Text Editors',
      'React',
      'Backbone',
      // 'Testing',
      'Teams',
    ],
  },

  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 570,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-plugin-twitter`,
    'gatsby-plugin-offline',
    'gatsby-plugin-glamor',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
  ],
};
