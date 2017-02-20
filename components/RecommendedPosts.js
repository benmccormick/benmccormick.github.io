import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import filter from 'lodash/filter';
import take from 'lodash/take';
import includes from 'lodash/includes';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import orderBy from 'lodash/orderBy';
import { rhythm, fontSizeToMS } from 'utils/typography';

class RecommendedPosts extends React.Component {

  render() {
    const { pages, post } = this.props;
    const { readNext, category, path } = post;

    let nextArticleFilter;
    if (readNext) {
      const keyList = isArray(readNext) ? readNext : [readNext];
      nextArticleFilter = ({data}) => data && includes(keyList, data.key);
    } else {
      nextArticleFilter =
        ({data}) => (
          data &&
          data.category === category &&
          data.path !== path &&
          data.dontfeature !== 'true'
        );
    }


    let nextPosts = take(filter(orderBy(pages, 'data.date', 'desc'), nextArticleFilter), 3);
    return (
      <div className = "up-next-block">
        <h6
          style = {{
            margin: 0,
            fontSize: fontSizeToMS(-0.5).fontSize,
            lineHeight: fontSizeToMS(-0.5).lineHeight,
            letterSpacing: -0.25,
          }}
        >
            You Might Also Like:
          </h6>
        {map(nextPosts, (nextPost, idx) => (
          <div>
            {idx ? <hr/> : null}
            <h3
              style = {{
                marginTop: 0,
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link
                to = {{
                  pathname: prefixLink(nextPost.path),
                  query: {
                    readNext: true,
                  },
                }}
              >
                {nextPost.data.title}
              </Link>
            </h3>
            <p>{nextPost.data.description}</p>
          </div>
      ))}
      </div>);
  }

}

RecommendedPosts.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
};

export default RecommendedPosts;
