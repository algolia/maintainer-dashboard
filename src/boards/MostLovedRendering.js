import React from 'react';

import './OldIssues.css';

export default function MostLoved({ data }) {
  return (
    <ul className="dashboard-lines">{data.map(RenderMostLovedElement)}</ul>
  );
}

function RenderMostLovedElement({ title, number, link, hearts }) {
  let howPassionate;
  let passionContent;
  switch (true) {
    case hearts < 5:
      howPassionate = 'meh';
      passionContent = '💙';
      break;
    case hearts < 30:
      howPassionate = 'notbad';
      passionContent = '💚';
      break;
    default:
      howPassionate = 'popular';
      passionContent = '❤️';
      break;
  }

  const badgeCssClass = `most-loved ${howPassionate}`;
  return (
    <li className="dashboard-line" key={title}>
      <span>{number}</span>
      <a href={link}>{title}</a>
      <span className={badgeCssClass}>{passionContent}</span>
    </li>
  );
}
