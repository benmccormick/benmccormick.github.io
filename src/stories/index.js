import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
// import RecommendedPosts from '../src/components/RecommendedPosts';
import { HeaderBar } from '../components/HeaderBar';
import { BrowserRouter as Router } from 'react-router-dom';
import '../css/mobile.css';
import '../css/typography.css';
import '../css/subscribe.css';
import '../utils/typography';

window.___loader = { enqueue: () => null };

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Header Bar', module).add('normal state', () =>
  <Router>
    <div>
      <HeaderBar blogTitle={'benmccormick.org'} />
      <div style={{ width: '100%', height: '2000px', background: 'red' }} />
    </div>
  </Router>
);
