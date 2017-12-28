import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Board.css';

export default class Board extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { children, title } = this.props;
    return (
      <article className="dashboard-board">
        <header className="dashboard-header">
          <h1>{title}</h1>
        </header>
        {children}
      </article>
    );
  }
}
