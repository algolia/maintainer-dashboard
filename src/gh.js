const axios = require('axios');
const moment = require('moment');
const parseLinkHeader = require('parse-link-header');
const pMap = require('./pmap.js');
const projects = require('./data/projects.js').default;

const defaultProject = projects['InstantSearch.js'];

export default class GithubDataLayer {
  constructor(token, project = defaultProject) {
    this.gh = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `token ${token}`,
      },
    });

    this.project = project;
  }

  _formatIssue(issue) {
    return {
      title: issue.title,
      number: issue.number,
      link: `https://github.com/${this.project.userOrOrg}/${
        this.project.name
      }/issues/${issue.number}`,
      daysSinceCreation: moment().diff(moment(issue.created_at), 'days'),
      upvotes: issue.reactions['+1'] + issue.reactions.heart,
    };
  }

  getUpvotesForIssue(number) {
    return this.gh
      .get(
        `/repos/${this.project.userOrOrg}/${this.project.name}/issues/${
          number
        }/reactions`,
        {
          headers: {
            accept: 'application/vnd.github.squirrel-girl-preview',
          },
        }
      )
      .then(({ data: reactions }) =>
        reactions.reduce((accumulatedUpVotesAndHearts, currentReaction) => {
          if (
            currentReaction.content !== 'heart' &&
            currentReaction.content !== '+1'
          ) {
            return accumulatedUpVotesAndHearts;
          }

          return accumulatedUpVotesAndHearts + 1;
        }, 0)
      );
  }

  async getAllIssues({ params: userParams = {}, maxPage = Infinity } = {}) {
    const getIssuesForPage = page =>
      this.gh.get(
        `/repos/${this.project.userOrOrg}/${this.project.name}/issues`,
        {
          params: {
            ...userParams,
            page,
            per_page: 30, // eslint-disable-line camelcase
          },
          headers: {
            accept: 'application/vnd.github.squirrel-girl-preview',
          },
        }
      );

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
      hasMoreIssues = parsedLinkHeader && parsedLinkHeader.next !== undefined;
    }

    return allIssues.filter(
      issue => issue.hasOwnProperty('pull_request') === false // PR are issues
    );
  }

  getOldIssues() {
    return this.getAllIssues({
      params: {
        direction: 'asc',
        sort: 'created',
      },
    }).then(issues => issues.map(i => this._formatIssue(i)));
  }

  getLovedIssues() {
    return this.getAllIssues().then(issues =>
      issues
        .map(i => this._formatIssue(i))
        .filter(issue => issue.upvotes > 0)
        .sort((issueA, issueB) => issueB.upvotes - issueA.upvotes)
    );
  }

  getCommentsForIssue(number) {
    return this.gh
      .get(
        `/repos/${this.project.userOrOrg}/${this.project.name}/issues/${
          number
        }/comments`
      )
      .then(({ data: comments }) => comments);
  }

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
            if (this.project.team.includes(issue.lastCommenter) === true) {
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
  }
}
