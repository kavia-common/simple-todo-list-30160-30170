import { useEffect, useMemo, useState } from 'react';
import * as api from '../services/mockApi.js';

/**
 * PUBLIC_INTERFACE
 * useTodos - Manages todo CRUD, filtering, and localStorage persistence through mock API
 */
export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [lastActionMessage, setLastActionMessage] = useState('');

  // initial load
  useEffect(() => {
    api.list().then(setTodos);
  }, []);

  const addTodo = async (text) => {
    const created = await api.create({ text });
    setTodos((prev) => [created, ...prev]);
    announce(`Added "${created.text}"`);
  };

  const toggleTodo = async (id) => {
    const updated = await api.toggle(id);
    setTodos((prev) => prev.map(t => t.id === id ? updated : t));
    announce(`${updated.completed ? 'Completed' : 'Reopened'} "${updated.text}"`);
  };

  const deleteTodo = async (id) => {
    const found = todos.find(t => t.id === id);
    await api.remove(id);
    setTodos((prev) => prev.filter(t => t.id !== id));
    if (found) announce(`Deleted "${found.text}"`);
  };

  const editTodo = async (id, text) => {
    const updated = await api.update(id, { text });
    setTodos((prev) => prev.map(t => t.id === id ? updated : t));
    announce(`Updated to "${updated.text}"`);
  };

  const clearCompleted = async () => {
    await api.clearCompleted();
    const left = await api.list();
    setTodos(left);
    announce('Cleared completed todos');
  };

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.completed);
      case 'completed': return todos.filter(t => t.completed);
      default: return todos;
    }
  }, [todos, filter]);

  const counts = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  const announce = (msg) => {
    setLastActionMessage(msg);
    // reset after short delay for aria-live repeatability
    setTimeout(() => setLastActionMessage(''), 800);
  };

  return {
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
  };
}
