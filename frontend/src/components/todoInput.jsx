import React from 'react'
import { useState } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';

export default function TodoInput({ title, setTitle, priority, setPriority, completed, setCompleted, addTodo }) {
  const [error, setError] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();

    if(!title.trim()) {
      setError('Please enter a task title');
      return;
    }

    setError(''); // Clear error when submission is valid
    let todo = {
      title: title.trim(),
      completed,
      priority
    }
    addTodo(todo);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !title.trim()) {
      setError('Please enter a task title');
    }
  }

  return (
    <div className='bg-green-500 p-4'>
      <span>What would you like to accomplish today?</span>
      <div>
        <form action="#" onSubmit={handleSubmit}>
          <div>
            <input 
              type='text' 
              placeholder='Add a new task' 
              onChange={e => {
                setTitle(e.target.value);
                setError(''); // Clear error when user starts typing
              }} 
              onKeyPress={handleKeyPress}
              value={title}
              className={` ${error ? 'border-2 border-red-500' : ''}`}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          <div>
            <select 
              value={priority} 
              onChange={e => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button 
              type='submit'
            >
              <Plus/>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
