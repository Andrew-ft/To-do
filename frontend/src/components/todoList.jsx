import React from 'react'
import Todo from './todo';
import axios from 'axios';
import { useEffect, useState } from'react';

export default function todoList() {
  const [ todos, setTodos ] = useState([]); 
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => 
      todo._id === updatedTodo._id ? updatedTodo : todo
    ));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching todos:', error);
        setError(error.message);
        setLoading(false)
      }
    }
    fetchTodos();
  }, [])

  return (
    <div>
        { loading && <p>Loading...</p>}
        { error && <p>Error: {error}</p>}
        <div>
          { todos.length === 0 ? ( <p>No todos</p> ) : ( todos.map((todo) => (
            <Todo key={todo._id} todo={todo} onUpdate={ updateTodo }/>
          )) ) }
        </div>
    </div>
  )
}
