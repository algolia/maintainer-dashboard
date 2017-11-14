const token = 'd185c09691c9c8a2963d430ab4aebf26bc93bdb7';
const got = require('got');
const moment = require('moment');

module.exports = {
  getOldIssues: () =>
    got('https://api.github.com/repos/algolia/instantsearch.js/issues', {
      json: true,
      query: {
        direction: 'asc',
        sort: 'updated',
        token,
      },
    }).then(({ body: issues }) =>
      issues
        .filter(
          issue =>
            issue.hasOwnProperty('pull_request') === false &&
            issue.user.login !== 'renovate[bot]'
        )
        .map(issue => ({
          title: issue.title,
          number: issue.number,
          link: `https://github.com/algolia/instantsearch.js/issue/${
            issue.number
          }`,
          days: moment(issue.updated_at).fromNow(),
        }))
    ),
};
