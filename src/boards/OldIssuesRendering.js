import React from 'react';

import './OldIssues.css';

export default function({ data }) {
  return <ul className="dashboard-lines">{data.map(renderElement)}</ul>;
}

function renderElement({ title, number, link, daysSinceCreation }) {
  let flagColor;
  if (daysSinceCreation < 5) {
    flagColor = 'cool';
  } else if (daysSinceCreation < 30) {
    flagColor = 'be-careful';
  } else {
    flagColor = 'danger';
  }

  const badgeCssClass = `last-updated badge ${flagColor}`;
  return (
    <li className="dashboard-line" key={title}>
      <span>{number}</span>
      <a href={link} className="title">
        {title}
      </a>
      <span className={badgeCssClass}>{daysSinceCreation}</span>
    </li>
  );
}
