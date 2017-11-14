import React from 'react';

export default function DashboardHeader({ title }) {
  return (
    <div className="dashboard-header">
      <div>{title}</div>
    </div>
  );
}
