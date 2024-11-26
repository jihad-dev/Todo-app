import React, { useState, useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoData: Omit<Todo, 'id' | 'completed'>) => {
    setTodos(prev => [
      {
        ...todoData,
        id: crypto.randomUUID(),
        completed: false
      },
      ...prev
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="flex items-center gap-3 mb-8">
          <CheckSquare size={32} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
        </div>

        <TodoForm onAdd={addTodo} />

        <div className="mt-8 space-y-6">
          {incompleteTodos.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-700">Active Tasks</h2>
              <div className="space-y-2">
                {incompleteTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </div>
            </div>
          )}

          {completedTodos.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-700">Completed Tasks</h2>
              <div className="space-y-2">
                {completedTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </div>
            </div>
          )}

          {todos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks yet. Add one above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;