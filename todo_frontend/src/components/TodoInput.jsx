import React, { useState, useRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoInput - Input field and submit button to add todos
 * @param {{onAdd: (text: string) => void}} props
 */
export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
    inputRef.current?.focus();
  };

  return (
    <section className="card input-card" aria-label="Add a todo">
      <form onSubmit={submit} className="input-grid" style={{display:'contents'}}>
        <label htmlFor="todo-input" className="visually-hidden">New todo</label>
        <input
          id="todo-input"
          ref={inputRef}
          className="input"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="New todo"
        />
        <button type="submit" className="btn btn-primary" aria-label="Add todo">
          Add
        </button>
      </form>
    </section>
  );
}
