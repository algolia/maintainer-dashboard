import React, { Component } from 'react';

import OldIssues from './OldIssues.js';
import MostLoved from './MostLoved.js';
import UnansweredIssues from './UnansweredIssues.js';
import GithubDataLayer from '../gh.js';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gh: new GithubDataLayer(props.token, props.project),
    };
  }

  componentWillReceiveProps(nextP) {
    this.setState(() => ({
      gh: new GithubDataLayer(nextP.token, nextP.project),
    }));
  }

  render() {
    return (
      <div className="dashboard-container">
        <OldIssues gh={this.state.gh} />
        <MostLoved gh={this.state.gh} />
        <UnansweredIssues gh={this.state.gh} />
      </div>
    );
  }
}
