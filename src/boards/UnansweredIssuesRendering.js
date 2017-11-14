import React from 'react';

export default function({ data }) {
  return <ul className="dashboard-lines">{data.map(renderElement)}</ul>;
}

function renderElement({ title, number, link, daysSinceLastAnswer }) {
  let flagColor;
  if (daysSinceLastAnswer < 5) {
    flagColor = 'cool';
  } else if (daysSinceLastAnswer < 30) {
    flagColor = 'be-careful';
  } else {
    flagColor = 'danger';
  }

  const badgeCssClass = `last-answered badge ${flagColor}`;
  return (
    <li className="dashboard-line" key={title}>
      <span>{number}</span>
      <a href={link} className="title">
        {title}
      </a>
      <span className={badgeCssClass}>{daysSinceLastAnswer}</span>
    </li>
  );
}
