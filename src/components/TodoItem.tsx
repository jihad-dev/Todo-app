import React from 'react';
import { Check, Trash2, Star } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div className={`group flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 ${
      todo.completed ? 'opacity-50' : ''
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
          todo.completed
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-gray-300 hover:border-emerald-500'
        }`}
      >
        {todo.completed && <Check size={12} className="text-white" />}
      </button>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className={`text-gray-800 ${todo.completed ? 'line-through' : ''}`}>
            {todo.title}
          </p>
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
        </div>
        <div className="flex gap-2 mt-1 text-sm text-gray-500">
          {todo.dueDate && (
            <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
          )}
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            todo.category === 'Work' ? 'bg-purple-100 text-purple-800' :
            todo.category === 'Personal' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {todo.category}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-red-50 rounded"
      >
        <Trash2 size={16} className="text-red-500" />
      </button>
    </div>
  );
}