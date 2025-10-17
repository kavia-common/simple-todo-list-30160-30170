import React from 'react';
import './App.css';
import './index.css';
import Header from './components/Header.jsx';
import TodoInput from './components/TodoInput.jsx';
import TodoList from './components/TodoList.jsx';
import Filters from './components/Filters.jsx';
import useTodos from './hooks/useTodos.js';

/**
 * PUBLIC_INTERFACE
 * App - Main entry for the Todo application.
 * Renders header, input, filters, and todo list. Manages data via useTodos hook.
 */
function App() {
  const {
    todos,
    visibleTodos,
    filter,
    counts,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
    lastActionMessage,
  } = useTodos();

  return (
    <div className="app-root" data-theme="ocean">
      <div className="app-wrap">
        <Header counts={counts} />
        <main className="main">
          <section
            className="announce"
            aria-live="polite"
            aria-atomic="true"
            role="status"
          >
            {lastActionMessage}
          </section>

            <TodoInput onAdd={addTodo} />

            <Filters
              current={filter}
              onChange={setFilter}
              onClearCompleted={clearCompleted}
              counts={counts}
            />

            <TodoList
              todos={visibleTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
        </main>
        <footer className="footer">
          <p className="footer-text">Built with Ocean Professional style.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
