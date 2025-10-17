import * as storage from '../utils/storage.js';

const KEY = 'ocean_todos_v1';

function nowId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function readAll() {
  return storage.get(KEY, []);
}

function writeAll(list) {
  storage.set(KEY, list);
}

/**
 * PUBLIC_INTERFACE
 * list - returns all todos
 */
export async function list() {
  return readAll();
}

/**
 * PUBLIC_INTERFACE
 * create - create a new todo
 */
export async function create({ text }) {
  const todo = { id: nowId(), text: text.trim(), completed: false, createdAt: Date.now() };
  const all = readAll();
  writeAll([todo, ...all]);
  return todo;
}

/**
 * PUBLIC_INTERFACE
 * update - update fields of a todo
 */
export async function update(id, patch) {
  const all = readAll();
  const next = all.map(t => t.id === id ? { ...t, ...patch } : t);
  writeAll(next);
  return next.find(t => t.id === id);
}

/**
 * PUBLIC_INTERFACE
 * toggle - toggles completed state
 */
export async function toggle(id) {
  const all = readAll();
  const next = all.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  writeAll(next);
  return next.find(t => t.id === id);
}

/**
 * PUBLIC_INTERFACE
 * remove - delete a todo
 */
export async function remove(id) {
  const all = readAll();
  writeAll(all.filter(t => t.id !== id));
  return true;
}

/**
 * PUBLIC_INTERFACE
 * clearCompleted - remove all completed todos
 */
export async function clearCompleted() {
  const all = readAll();
  writeAll(all.filter(t => !t.completed));
  return true;
}
