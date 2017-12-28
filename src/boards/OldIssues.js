import React, { Component } from 'react';

import Rendering from './OldIssuesRendering.js';
import Spinner from '../commons/Spinner.js';
import Board from '../commons/Board.js';

export default class OldIssues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
    };
    this.gh = props.gh;
  }
  componentWillMount() {
    // get data
    // set next step for promise
    this.gh.getOldIssues().then(data => {
      this.data = data;
      this.setState(() => ({ isDataLoaded: true }));
    });
  }
  componentWillReceiveProps(nextP) {
    this.setState(() => ({ isDataLoaded: false }));
    this.gh = nextP.gh;
    this.gh.getOldIssues().then(data => {
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
    return <Board title="Oldest open issues (days)">{content}</Board>;
  }
}
