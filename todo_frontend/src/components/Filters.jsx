import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Filters - Filter buttons and controls row
 * @param {{current: 'all'|'active'|'completed', onChange: (f:any)=>void, onClearCompleted: ()=>void, counts: {active:number, completed:number, total:number}}} props
 */
export default function Filters({ current, onChange, onClearCompleted, counts }) {
  const mkBtn = (key, label) => (
    <button
      key={key}
      type="button"
      className="pill"
      role="button"
      aria-pressed={current === key}
      onClick={() => onChange(key)}
    >
      {label}
    </button>
  );

  return (
    <section className="card filters-card" aria-label="Filters">
      <div className="filters-group" role="group" aria-label="Filter todos">
        {mkBtn('all', `All (${counts.total})`)}
        {mkBtn('active', `Active (${counts.active})`)}
        {mkBtn('completed', `Completed (${counts.completed})`)}
      </div>
      <div className="filters-spacer">
        <span className="counter" aria-live="polite">
          {counts.active} items left
        </span>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onClearCompleted}
          aria-label="Clear completed todos"
          disabled={counts.completed === 0}
        >
          Clear completed
        </button>
      </div>
    </section>
  );
}
