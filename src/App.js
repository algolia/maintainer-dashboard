import React, { Component } from 'react';
import './App.css';
import Dashboard from './boards/Dashboard.js';
import Login from './Login.js';

class App extends Component {
  constructor(props) {
    super(props);
    const storedGHToken = window.localStorage.getItem('GH_TOKEN');
    this.state = {
      accessToken: process.env.REACT_APP_GH_TOKEN || storedGHToken,
    };
  }

  render() {
    const main = this.state.accessToken ? (
      <Dashboard token={this.state.accessToken} />
    ) : (
      <Login
        onAccessToken={token => this.setState(() => ({ accessToken: token }))}
      />
    );
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Maintainer dashboard for InstantSearch.js
          </h1>
        </header>
        {main}
      </div>
    );
  }
}

export default App;
