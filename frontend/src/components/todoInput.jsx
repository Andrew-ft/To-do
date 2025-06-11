import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TodoInput({ title, setTitle, priority, setPriority, completed, setCompleted, addTodo }) {
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }

    setError('');
    const todo = {
      title: title.trim(),
      completed,
      priority
    };
    addTodo(todo);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !title.trim()) {
      setError('Please enter a task title');
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mt-8 mb-5 text-white text-lg font-medium">
        What would you like to accomplish today?
      </div>

      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="relative flex items-center bg-zinc-700 bg-opacity-10 rounded-lg shadow-md overflow-hidden px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-grow bg-transparent text-white placeholder:text-white/40 focus:outline-none text-sm"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="ml-4 text-sm bg-transparent text-white rounded-md px-1 py-1 focus:outline-none hover:bg-zinc-600 transition-all"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button
              type="submit"
              className="ml-4 p-2 rounded-md bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 hover:opacity-90 transition"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
