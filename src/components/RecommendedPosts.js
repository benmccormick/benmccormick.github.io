import React from 'react';
import Link from 'gatsby-link';
import map from 'lodash/map';
import typography from '../utils/typography';

const { rhythm, scale } = typography;

class RecommendedPosts extends React.Component {
  render() {
    const { recommendedPosts } = this.props;
    return (
      <div className="up-next-block">
        <h6
          style={{
            margin: 0,
            fontSize: scale(-0.5).fontSize,
            lineHeight: scale(-0.5).lineHeight,
            letterSpacing: -0.25,
          }}
        >
          You Might Also Like:
        </h6>
        {map(recommendedPosts, (nextPost, idx) =>
          <div key={nextPost.path}>
            {idx ? <hr /> : null}
            <h3
              style={{
                marginTop: 0,
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link to={nextPost.path}>
                {nextPost.title}
              </Link>
            </h3>
            <p>
              {nextPost.description}
            </p>
          </div>
        )}
      </div>
    );
  }
}

RecommendedPosts.propTypes = {
  pages: React.PropTypes.array,
};

export default RecommendedPosts;
