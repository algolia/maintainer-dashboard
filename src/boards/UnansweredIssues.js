import React, { Component } from 'react';

import Rendering from './UnansweredIssuesRendering.js';
import Spinner from '../commons/Spinner.js';
import Board from '../commons/Board.js';

// function getLastAnswered() {
//   return Promise.resolve([
//     {
//       title: 'Need some help, please',
//       number: '123',
//       link: 'https://github.com/algolia/instantsearch.js/issues/1260',
//       daysSinceLastAnswer: 120,
//     },
//     {
//       title: 'Need some more help, please',
//       number: '124',
//       link: 'https://github.com/algolia/instantsearch.js/issues/1260',
//       daysSinceLastAnswer: 20,
//     },
//     {
//       title: 'Need some help, again',
//       number: '123',
//       link: 'https://github.com/algolia/instantsearch.js/issues/1260',
//       daysSinceLastAnswer: 1,
//     },
//   ]);
// }

export default class UnansweredIssues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
    };
    this.gh = props.gh;
  }

  componentWillMount() {
    this.gh.getUnansweredIssues().then(data => {
      this.data = data;
      this.setState(() => ({ isDataLoaded: true }));
    });
  }

  componentWillReceiveProps(nextP) {
    this.setState(() => ({ isDataLoaded: false }));
    this.gh = nextP.gh;
    this.gh.getUnansweredIssues().then(data => {
      this.data = data;
      this.setState(() => ({ isDataLoaded: true }));
    });
  }

  render() {
    const content = this.state.isDataLoaded ? (
      <Rendering data={this.data} />
    ) : (
      <Spinner />
    );
    return <Board title="Unanswered user messages (days)">{content}</Board>;
  }
}
