import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header - App header with brand and counts
 * @param {{counts: {total: number, active: number, completed: number}}} props
 */
export default function Header({ counts }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-badge" aria-hidden="true">✓</div>
        <h1 className="title">Ocean Todos</h1>
      </div>
      <div className="kpis" aria-label="Todo counts">
        <span aria-live="polite">{counts.active} active</span>
        {' · '}
        <span>{counts.completed} completed</span>
        {' · '}
        <span>{counts.total} total</span>
      </div>
    </header>
  );
}
