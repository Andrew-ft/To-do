import React from 'react'
import TodoInput from '../components/todoInput'
import TodoForm from '../components/todoForm'

export default function index() {
  return (
    <div className='bg-blue-500'>
        <TodoInput/>
        <TodoForm/>
    </div>
  )
}
