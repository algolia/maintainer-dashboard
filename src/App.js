import React, { Component } from 'react';
import './App.css';

import OldIssues from './boards/OldIssues.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Maintainer dashboard for InstantSearch.js</h1>
        </header>
        <div className="dashboard-container">
          <OldIssues/> 
        </div>
      </div>
    );
  }
}

export default App;
