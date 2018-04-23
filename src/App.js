import React, { Component } from 'react';
import './App.css';
import Dashboard from './boards/Dashboard.js';
import Login from './Login.js';

import projects from './data/projects.js';
const projectKeys = Object.keys(projects).sort();

class App extends Component {
  constructor(props) {
    super(props);
    const storedGHToken = window.localStorage.getItem('GH_TOKEN');
    const lastProject = window.localStorage.getItem('PROJECT');
    this.state = {
      accessToken: process.env.REACT_APP_GH_TOKEN || storedGHToken,
      selectedProject: lastProject || 'InstantSearch.js',
    };
  }

  render() {
    const projectOptions = projectKeys.map(pKey => (
      <option key={pKey} value={pKey}>
        {pKey}
      </option>
    ));
    const currentProject = projects[this.state.selectedProject];
    const main = this.state.accessToken ? (
      <Dashboard token={this.state.accessToken} project={currentProject} />
    ) : (
      <Login
        onAccessToken={token => this.setState(() => ({ accessToken: token }))}
      />
    );
    updateTitle(this.state.selectedProject);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Maintainer dashboard for{' '}
            <select
              value={this.state.selectedProject}
              onChange={e => {
                const selectedProjectKey = e.target.value;
                window.localStorage.setItem('PROJECT', selectedProjectKey);
                this.setState(() => ({ selectedProject: selectedProjectKey }));
              }}
            >
              {projectOptions}
            </select>
          </h1>
        </header>
        {main}
      </div>
    );
  }
}

function updateTitle(project) {
  document.title = `MD: ${project}`;
}

export default App;
