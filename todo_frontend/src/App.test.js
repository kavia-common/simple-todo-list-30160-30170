import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Basic smoke tests to ensure UI renders and interacts
test('renders header and input', () => {
  render(<App />);
  expect(screen.getByText(/Ocean Todos/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/New todo/i)).toBeInTheDocument();
});

test('can add a todo', () => {
  render(<App />);
  const input = screen.getByLabelText(/New todo/i);
  fireEvent.change(input, { target: { value: 'Test task' } });
  fireEvent.click(screen.getByLabelText(/Add todo/i));
  expect(screen.getByText('Test task')).toBeInTheDocument();
});

test('can toggle a todo', () => {
  render(<App />);
  const input = screen.getByLabelText(/New todo/i);
  fireEvent.change(input, { target: { value: 'Toggle me' } });
  fireEvent.click(screen.getByLabelText(/Add todo/i));

  const todoBtn = screen.getByLabelText(/Todo: Toggle me/i);
  expect(todoBtn).toBeInTheDocument();

  const checkbox = screen.getByRole('checkbox', { name: /Mark as completed/i });
  fireEvent.click(checkbox);
  // After toggle, label should switch
  expect(screen.getByRole('checkbox', { name: /Mark as active/i })).toBeInTheDocument();
});

test('can delete a todo', () => {
  render(<App />);
  const input = screen.getByLabelText(/New todo/i);
  fireEvent.change(input, { target: { value: 'Delete me' } });
  fireEvent.click(screen.getByLabelText(/Add todo/i));
  const del = screen.getByLabelText(/Delete todo/i);
  fireEvent.click(del);
  expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
});
