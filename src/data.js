const token = 'd185c09691c9c8a2963d430ab4aebf26bc93bdb7';
const axios = require('axios');
const moment = require('moment');
const gh = axios.create({
  baseURL: 'https://api.github.com',
});

module.exports = {
  getOldIssues: () =>
    gh
      .get('/repos/algolia/instantsearch.js/issues', {
        params: {
          direction: 'asc',
          sort: 'updated',
          token,
        },
      })
      .then(({ data: issues }) =>
        issues
          .filter(
            issue =>
              issue.hasOwnProperty('pull_request') === false &&
              issue.user.login !== 'renovate[bot]'
          )
          .map(issue => ({
            title: issue.title,
            number: issue.number,
            link: `https://github.com/algolia/instantsearch.js/issues/${
              issue.number
            }`,
            days: moment(issue.updated_at).fromNow(),
          }))
      ),
};
