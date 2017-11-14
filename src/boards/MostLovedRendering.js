import React from 'react';

export default function MostLoved({ data }) {
  return (
    <ul className="dashboard-lines">{data.map(RenderMostLovedElement)}</ul>
  );
}

function RenderMostLovedElement({ title, number, link, upvotes }) {
  let flagColor;
  if (upvotes < 5) {
    flagColor = 'cool';
  } else if (upvotes < 30) {
    flagColor = 'be-careful';
  } else {
    flagColor = 'danger';
  }

  const badgeCssClass = `badge ${flagColor}`;
  return (
    <li className="dashboard-line" key={title}>
      <span>{number}</span>
      <a href={link} className="title">
        {title}
      </a>
      <span className={badgeCssClass}>{upvotes}</span>
    </li>
  );
}
