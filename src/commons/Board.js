import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Board.css';

export default class Board extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
  };

  state = {
    open: true,
  };

  toggleOpen = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  render() {
    const { children, title } = this.props;
    const { open } = this.state;
    return (
      <article className={`dashboard-board ${open ? 'open' : 'closed'}`}>
        <header className="dashboard-header">
          <h1>{title}</h1>
          <button onClick={this.toggleOpen}>
            {open ? 'collapse' : 'show'}
          </button>
        </header>
        {open && children}
      </article>
    );
  }
}
