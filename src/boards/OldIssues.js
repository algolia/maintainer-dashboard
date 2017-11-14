import React, { Component } from 'react';

import Rendering from './OldIssuesRendering.js';
import Spinner from '../commons/Spinner.js';

import {getOldIssues} from '../data.js';

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
    getOldIssues().then(data => {
      this.data = data;
      this.setState(() => ({ isDataLoaded: true }));
    });
  }
  render() {
    const content = this.state.isDataLoaded
      ? <Rendering data={this.data}/>
      : <Spinner/>;
    return <div className="dashboard-board">{content}</div>;
  }
}
