import React, { useState, useRef, useEffect } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoItem - Single todo row with toggle, edit, delete
 * @param {{todo: {id:string,text:string,completed:boolean}, onToggle: ()=>void, onDelete: ()=>void, onEdit: (text:string)=>void}} props
 */
export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const save = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (trimmed !== todo.text) onEdit(trimmed);
    setEditing(false);
  };

  const onKey = (e) => {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') {
      setText(todo.text);
      setEditing(false);
    }
  };

  return (
    <div className="todo">
      <button
        className="checkbox"
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        onClick={onToggle}
        onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); onToggle(); }}}
      >
        {todo.completed ? '✓' : ''}
      </button>

      {!editing ? (
        <button
          className={`todo-text ${todo.completed ? 'completed' : ''}`}
          onDoubleClick={() => setEditing(true)}
          onClick={() => {}}
          title="Double-click to edit"
          aria-label={`Todo: ${todo.text}. Double-click to edit`}
          style={{ textAlign: 'left', background: 'transparent', border: 0, padding: 0, cursor: 'text' }}
        >
          {todo.text}
        </button>
      ) : (
        <input
          ref={inputRef}
          className="edit-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          onKeyDown={onKey}
          aria-label="Edit todo"
        />
      )}

      <div className="todo-actions">
        {!editing ? (
          <button className="btn btn-ghost" onClick={() => setEditing(true)} aria-label="Edit todo">Edit</button>
        ) : (
          <button className="btn btn-primary" onClick={save} aria-label="Save todo">Save</button>
        )}
        <button className="btn btn-danger" onClick={onDelete} aria-label="Delete todo">Delete</button>
      </div>
    </div>
  );
}
