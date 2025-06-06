import React from 'react'
import { useState } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';

export default function todoInput() {
  const [ task, setTask ] = useState('');
  const [ priority, setPriority ] = useState('low');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const response = await axios.post('/api/todos', {
        title: task,
        completed: false,
        priority: priority
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      setTask('')
    } catch(e) {
      console.log((Object.keys(e.response.data.errors)));
      console.log('Error adding new task', e);
      
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }

  return (
    <div className='bg-green-500'>
        <span>What would you like to accomplish today?</span>
        <div>
            <form action="#" onSubmit={handleSubmit}>
                <input type='text' placeholder='Add a new task' value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={handleKeyDown}/>
                <select name="" id="" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button type='submit'>
                  <Plus/>
                </button>
            </form>
        </div>
    </div>

  )
}
