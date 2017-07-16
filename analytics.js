const google = require('googleapis');
const _ = require('lodash');
const fs = require('fs');
const frontmatter = require('front-matter');
const recursive = require('recursive-readdir');

const getAuthorizedClient = () =>
  new Promise((res, rej) => {
    let path = process.env.ANALYTICS_KEY;
    let googleKey = require(path);
    let jwtClient = new google.auth.JWT(
      googleKey.client_email,
      null,
      googleKey.private_key,
      ['https://www.googleapis.com/auth/analytics'],
      null
    );
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        console.error(err);
        rej();
      } else {
        console.log('Authorized with the google analytics API');
        let analytics = google.analytics({ version: 'v3', auth: jwtClient });
        res(analytics);
      }
    });
  });

const getAllTimeData = analytics =>
  new Promise((res, rej) => {
    analytics.data.ga.get(
      {
        'start-date': '2011-01-01',
        'end-date': 'today',
        ids: ['ga:67508034'],
        metrics: ['ga:pageviews'],
        dimensions: ['ga:pagePath']
      },
      (_err, resp) => {
        // handle err and response
        if (_err) {
          console.error(_err);
          rej(_err);
        } else {
          res(resp.rows);
        }
      }
    );
  });

const getLastMonthData = analytics =>
  new Promise((res, rej) => {
    analytics.data.ga.get(
      {
        'start-date': '30daysAgo',
        'end-date': 'today',
        ids: ['ga:67508034'],
        metrics: ['ga:pageviews'],
        dimensions: ['ga:pagePath']
      },
      (_err, resp) => {
        // handle err and response
        if (_err) {
          console.log(_err);
          rej(_err);
        } else {
          res(resp.rows);
        }
      }
    );
  });

const getPageViewCounts = (path, rows) => {
  let matchingRows = _.filter(rows, row => _.includes(row[0], path));
  return _.reduce(matchingRows, (sum, row) => sum + _.parseInt(row[1]), 0);
};

const processRows = (allTimeRows, last30Rows) => {
  recursive('./src/pages/posts/', (err, files) => {
    _(files).filter(file => _.includes(file, '.md')).forEach(file => {
      let fileName = `./${file}`;
      let contents = fs.readFileSync(fileName, 'utf-8');
      let { attributes, body } = frontmatter(contents);
      let analyticsCount = getPageViewCounts(attributes.path, allTimeRows);
      let analyticsCountLastMonth = getPageViewCounts(
        attributes.path,
        last30Rows
      );
      attributes.pageViews = analyticsCount;
      attributes.last30pageViews = analyticsCountLastMonth;
      let printedAttributes = _.map(
        attributes,
        (value, key) => `${key}: "${value}"`
      ).join('\n');
      let newContents = `---\n${printedAttributes}\n---\n${body}`;
      fs.writeFileSync(fileName, newContents);
    });
    console.log('Updated analytics for all posts');
  });
};

getAuthorizedClient().then(analytics => {
  let promises = [getAllTimeData(analytics), getLastMonthData(analytics)];
  Promise.all(promises).then(([allTimeRows, last30Rows]) =>
    processRows(allTimeRows, last30Rows)
  );
});
