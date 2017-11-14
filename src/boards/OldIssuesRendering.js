import React from 'react';

import './OldIssues.css';

export default function({ data }) {
  return <ul className="dashboard-lines">{data.map(renderElement)}</ul>;
}

function renderElement({ title, number, link, daysSinceLastUpdate }) {
  let howOld;
  switch (true) {
    case daysSinceLastUpdate < 5:
      howOld = 'fresh';
      break;
    case daysSinceLastUpdate < 30:
      howOld = 'aged';
      break;
    default:
      howOld = 'rotten';
      break;
  }
  const badgeCssClass = `last-updated ${howOld}`;
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
