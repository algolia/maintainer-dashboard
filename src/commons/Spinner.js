import React from 'react';
import spinner from './spinner.svg';
import './Spinner.css';

export default function() {
  return (
    <div className="spinner-wrapper">
      <img src={spinner} alt="Loading data..." className="spinner-img" />
    </div>
  );
}
