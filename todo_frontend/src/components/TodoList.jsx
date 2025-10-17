import React from 'react';
import TodoItem from './TodoItem.jsx';

/**
 * PUBLIC_INTERFACE
 * TodoList - Renders a list of todos or empty state
 * @param {{todos: Array, onToggle: Function, onDelete: Function, onEdit: Function}} props
 */
export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  return (
    <section className="card list-card" aria-label="Todo list">
      {todos.length === 0 ? (
        <div className="todo" role="note" aria-live="polite">
          <div className="checkbox" aria-hidden="true" />
          <div className="todo-text" style={{color:'#6B7280'}}>No todos match this filter.</div>
          <div className="todo-actions" aria-hidden="true" />
        </div>
      ) : (
        todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={() => onToggle(t.id)}
            onDelete={() => onDelete(t.id)}
            onEdit={(text) => onEdit(t.id, text)}
          />
        ))
      )}
    </section>
  );
}
