import React from 'react';

import './OldIssues.css';

export default function({ data }) {
  return <ul className="dashboard-lines">{data.map(renderElement)}</ul>;
}

function renderElement({ title, number, link, daysSinceLastUpdate }) {
  let flagColor;
  if (daysSinceLastUpdate < 5) {
    flagColor = 'cool';
  } else if (daysSinceLastUpdate < 30) {
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
      <span className={badgeCssClass}>{daysSinceLastUpdate}</span>
    </li>
  );
}
