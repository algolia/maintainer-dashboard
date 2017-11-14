import React from 'react';

export default function({data}) {
  return <ul>{data.map(renderElement)}</ul>;
}

function renderElement({title, number, link, days}) {
  return <li><a href={link}>{title}</a><span className="last-updated">{days}</span></li>;
}
