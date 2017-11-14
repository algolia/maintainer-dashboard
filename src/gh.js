import axios from 'axios';
import moment from 'moment';
import parseLinkHeader from 'parse-link-header';
import pMap from 'p-map';

const accesToken = process.env.REACT_APP_GH_TOKEN;
const gh = axios.create({
  baseURL: 'https://api.github.com',
  params: {
    access_token: accesToken, // eslint-disable-line camelcase
  },
});
const team = [
  'bobylito',
  'iam4x',
  'Haroenv',
  'vvo',
  'marielaures',
  'samouss',
  'mthuret',
  'ronanlevesque',
];

const data = {
  _formatIssue(issue) {
    return {
      title: issue.title,
      number: issue.number,
      link: `https://github.com/algolia/instantsearch.js/issues/${
        issue.number
      }`,
      daysSinceCreation: moment().diff(moment(issue.created_at), 'days'),
      upvotes: issue.reactions['+1'] + issue.reactions.heart,
    };
  },
  async getAllIssues({ params: userParams = {}, maxPage = Infinity } = {}) {
    const getIssuesForPage = page =>
      gh.get('/repos/algolia/instantsearch.js/issues', {
        params: {
          ...userParams,
          page,
          per_page: 30, // eslint-disable-line camelcase
        },
        headers: {
          accept: 'application/vnd.github.squirrel-girl-preview',
        },
      });

    const allIssues = [];
    let page = 0;
    let hasMoreIssues = true;

    while (hasMoreIssues === true && page < maxPage) {
      page++;
      const { headers, data: issuesForCurrentPage } = await getIssuesForPage(
        page
      );
      const parsedLinkHeader = parseLinkHeader(headers.link);
      allIssues.push(...issuesForCurrentPage);
      hasMoreIssues = parsedLinkHeader.next !== undefined;
    }

    return allIssues.filter(
      issue => issue.hasOwnProperty('pull_request') === false // PR are issues
    );
  },
  getOldIssues() {
    return this.getAllIssues({
      params: {
        direction: 'asc',
        sort: 'created',
      },
    }).then(issues => issues.map(this._formatIssue));
  },
  getLovedIssues() {
    return this.getAllIssues().then(issues =>
      issues
        .map(this._formatIssue)
        .filter(issue => issue.upvotes > 0)
        .sort((issueA, issueB) => issueB.upvotes - issueA.upvotes)
    );
  },
  getCommentsForIssue(number) {
    return gh
      .get(`/repos/algolia/instantsearch.js/issues/${number}/comments`)
      .then(({ data: comments }) => comments);
  },
  getUnansweredIssues() {
    return this.getAllIssues()
      .then(issues =>
        pMap(
          issues,
          async issue => {
            const comments = await this.getCommentsForIssue(issue.number);
            return {
              ...issue,
              nbComments: issue.comments,
              comments,
            };
          },
          { concurrency: 10 }
        )
      )
      .then(issues =>
        issues
          .map(issue => {
            let lastCommenter;
            let daysSinceLastAnswer;
            if (issue.nbComments === 0) {
              lastCommenter = issue.user.login;
              daysSinceLastAnswer = moment().diff(
                moment(issue.created_at),
                'days'
              );
            } else {
              lastCommenter =
                issue.comments[issue.comments.length - 1].user.login;
              daysSinceLastAnswer = moment().diff(
                moment(issue.comments[issue.comments.length - 1].created_at),
                'days'
              );
            }

            return {
              ...this._formatIssue(issue),
              nbComments: issue.nbComments,
              lastCommenter,
              daysSinceLastAnswer,
            };
          })
          .filter(issue => {
            if (team.includes(issue.lastCommenter) === true) {
              return false;
            }

            return true;
          })
          .sort((issueA, issueB) => {
            if (issueA.nbComments === 0 && issueB.nbComments === 0) {
              return issueB.daysSinceLastAnswer - issueA.daysSinceLastAnswer;
            }

            if (issueA.nbComments === 0) {
              return -1;
            }

            if (issueB.nbComments === 0) {
              return 1;
            }

            return issueB.daysSinceLastAnswer - issueA.daysSinceLastAnswer;
          })
      );
  },
};

export default data;
