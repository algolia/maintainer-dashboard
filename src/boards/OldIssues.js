import React, { Component } from 'react';

import Rendering from './OldIssuesRendering.js';
import Spinner from '../commons/Spinner.js';
import Header from './Header.js';

import gh from '../gh.js';
// function getOldIssues() {
//   return Promise.resolve([
//     {
//       title: 'Need some help, please',
//       number: '123',
//       link: 'https://github.com/algolia/instantsearch.js/issues/1260',
//       daysSinceCreation: 120,
//     },
//     {
//       title: 'Need some more help, please',
//       number: '124',
//       link: 'https://github.com/algolia/instantsearch.js/issues/1260',
//       daysSinceCreation: 20,
//     },
//     {
//       title: 'Need some help, again',
//       number: '123',
//       link: 'https://github.com/algolia/instantsearch.js/issues/1260',
//       daysSinceCreation: 1,
//     },
//   ]);
// }

export default class OldIssues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
    };
  }
  componentWillMount() {
    // get data
    // set next step for promise
    gh.getOldIssues().then(data => {
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
    return (
      <div className="dashboard-board">
        <Header title="Oldest open issues (days)" />
        {content}
      </div>
    );
  }
}
