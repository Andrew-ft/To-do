import React from 'react'
import { Trash2 } from 'lucide-react' 
import axios from 'axios';

export default function todo({ todo, onUpdate }) {
    const handleToggle  = async () => {
        try {
            const response = await axios.patch(`/api/todos/${todo._id}`, {
                completed: !todo.completed
            })
            onUpdate(response.data);
            console.log(response);
        } catch (err) {
            console.log('Error updating todo:', err)
        }
    }
  return (
    <div>
        <div>
            <div>
            <input type="checkbox" checked={ todo.completed } onChange={handleToggle}/>
            <span>{ todo.title }</span>
            <span>{ todo.priority }</span>
            </div>
            <div>
                <span>date</span>
                <Trash2/>
            </div>
        </div>
    </div>
  )
}
