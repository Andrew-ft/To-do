import React from 'react'
import TodoList from './todoList'

export default function todoForm() {
  return (
    <div>
        <div>
            <span>Check All</span>
            <span>Clear Completed (0)</span>
        </div>
        <TodoList/>
        <div>
            <span>1 active</span>
            <span>1 completed</span>
            <span>2 total</span>
            <span>50%</span>
        </div>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
  )
}
