import React from 'react'
import Todo from './todo';
import axios from 'axios';
import { useEffect, useState } from'react';

export default function TodoList({ todos, error, loading, deleteTodo, updateTodo }) {

  return (
    <div className='form-color'>
        <div>
          <Todo todos = {todos} error = {error} deleteTodo={deleteTodo} updateTodo={updateTodo} loading = {loading} key={todos._id}/>
        </div>
        <div className="h-px bg-gray-700 w-full my-4"></div>
    </div>
  )
}
