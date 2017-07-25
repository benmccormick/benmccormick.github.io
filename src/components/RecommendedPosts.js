import React from 'react';
import Link from 'gatsby-link';
import filter from 'lodash/filter';
import take from 'lodash/take';
import includes from 'lodash/includes';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import orderBy from 'lodash/orderBy';
import typography from '../utils/typography';

const { rhythm, scale } = typography;

class RecommendedPosts extends React.Component {
  render() {
    const { pages, post } = this.props;
    const { readNext, category, path } = post;

    let nextArticleFilter;
    if (readNext) {
      const keyList = isArray(readNext) ? readNext : readNext.split(',');
      nextArticleFilter = page => page && includes(keyList, page.key);
    } else {
      nextArticleFilter = page =>
        page &&
        page.category === category &&
        page.path !== path &&
        page.dontfeature !== 'true';
    }

    let nextPosts = take(
      filter(orderBy(pages, 'date', 'desc'), nextArticleFilter),
      3
    );
    return (
      <div className="up-next-block">
        <h6
          style={{
            margin: 0,
            fontSize: scale(-0.5).fontSize,
            lineHeight: scale(-0.5).lineHeight,
            letterSpacing: -0.25
          }}
        >
          You Might Also Like:
        </h6>
        {map(nextPosts, (nextPost, idx) =>
          <div>
            {idx ? <hr /> : null}
            <h3
              style={{
                marginTop: 0,
                marginBottom: rhythm(1 / 4)
              }}
            >
              <Link
                to={{
                  pathname: nextPost.path,
                  query: {
                    readNext: true
                  },
                  hash: '#title'
                }}
              >
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
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array
};

export default RecommendedPosts;
