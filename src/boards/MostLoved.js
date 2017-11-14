import React, { Component } from 'react';

import Rendering from './MostLovedRendering.js';
import Spinner from '../commons/Spinner.js';

// import { getLovedIssues } from '../data.js';
function getLovedIssues() {
  return Promise.resolve([
    {
      title: 'Need some help, please',
      number: '123',
      link: 'https://github.com/algolia/instantsearch.js/issues/1260',
      hearts: 120,
    },
    {
      title: 'Need some more help, please',
      number: '124',
      link: 'https://github.com/algolia/instantsearch.js/issues/1260',
      hearts: 20,
    },
    {
      title: 'Need some help, again',
      number: '123',
      link: 'https://github.com/algolia/instantsearch.js/issues/1260',
      hearts: 1,
    },
  ]);
}

export default class MostLoved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
    };
  }
  componentWillMount() {
    // get data
    // set next step for promise
    getLovedIssues().then(data => {
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
        <div className="dashboard-header">Oldest issues</div>
        {content}
      </div>
    );
  }
}
