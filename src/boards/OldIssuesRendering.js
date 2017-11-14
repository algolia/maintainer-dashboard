import React from 'react';

export default function({data}) {
  return <ul className="dashboard-lines">{data.map(renderElement)}</ul>;
}

function renderElement({title, number, link, days}) {
  return <li className="dashboard-line" key={title}><a href={link}>{title}</a><span className="last-updated">{days}</span></li>;
}
