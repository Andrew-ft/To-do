import React from 'react'
import TodoInput from '../components/todoInput'
import TodoList from '../components/todoList'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from '../components/progressBar';

export default function Index() {

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  let [priority, setPriority] = useState('low');
  const [completed, setCompleted] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('/api/todos')
    .then((res) => {
      setTodos(res.data);
      setLoading(false);
      setError(null);
    })
    .catch(error => {
      console.log('Error fetching todos:', error);
      setError('Failed to fetch todos');
      setLoading(false);    
    })
  }, []);

  let addTodo = (todo) => {
    axios.post('/api/todos', todo)
    .then(response => {
      setTodos(prevState => [response.data, ...prevState]);
      setError(null);
      setTitle('');
      setPriority('low');
      setCompleted(false);
    })
    .catch(error => {
      console.log('Error adding todo:', error);
      setError('Failed to add todo');
    })
  }

  let deleteTodo = (todoId) => {
    axios.delete(`/api/todos/${todoId}`)
      .then(() => {
        setTodos(prevState => prevState.filter(todo => todo._id !== todoId));
      })
      .catch(error => {
        console.log('Error deleting todo:', error);
        setError('Failed to delete todo');
      });
  };
  
  let updateTodo = (id, updatedData) => {
    axios.patch(`/api/todos/${id}`, updatedData)
      .then((res) => {
        setTodos(prevState =>
          prevState.map(todo =>
            todo._id === id ? { ...todo, ...updatedData } : todo
          )
        );
        setError(null);
      })
      .catch(error => {
        console.log('Error updating todo:', error);
        setError('Failed to update todo');
      });
  };

  let remainingCount  = todos.filter(t => !t.completed).length;

  const checkAll = async () => {
    try {
      const allCompleted = !todos.every(todo => todo.completed);
      const updatedTodos = todos.map(todo => ({
        ...todo,
        completed: allCompleted
      }));
      setTodos(updatedTodos);

      await Promise.all(
        todos.map(todo =>
          axios.patch(`/api/todos/${todo._id}`, {
            completed: allCompleted
          })
        )
      );

      setError(null);
    } catch (error) {
      console.log('Error updating todos:', error);
      setError('Failed to update todos');
      
      axios.get('/api/todos')
        .then(response => {
          setTodos(response.data);
        })
        .catch(err => {
          console.log('Error fetching todos:', err);
        });
    }
  };

  const clearCompleted = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);
      
      setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));

      await Promise.all(
        completedTodos.map(todo =>
          axios.delete(`/api/todos/${todo._id}`)
        )
      );

      setError(null);
    } catch (error) {
      console.log('Error clearing todos:', error);
      setError('Failed to clear todos');
      
      axios.get('/api/todos')
        .then(response => {
          setTodos(response.data);
        })
        .catch(err => {
          console.log('Error fetching todosss:', err);
        });
    }
  }

  const filteredTodos = () => {
    switch(filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  const showActive = () => {
    setFilter('active');
  }

  const showCompleted = () => {
    setFilter('completed');
  }

  const showAll = () => {
    setFilter('all');
  }

  const activeStatusTodos = todos.filter(todo => !todo.completed).length;
  const completedStatusTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const completionPercentage = totalTodos === 0 ? 0 : Math.round((completedStatusTodos / totalTodos) * 100);

  return (
    <div className='bg-blue-500'>
        <TodoInput addTodo = {addTodo} 
        title = {title} setTitle = {setTitle}
        priority = {priority} setPriority = {setPriority}
        completed = {completed} setCompleted = {setCompleted}/>
        
        <div>
          <div>
            {remainingCount} item{remainingCount > 1 ? 's' : ''} remaining
          </div>
          <div>
              <button onClick={checkAll}>Check All</button>
              <button onClick={clearCompleted}>Clear Completed</button>
          </div>
          <TodoList 
            todos={filteredTodos()} 
            error={error} 
            loading={loading} 
            deleteTodo={deleteTodo} 
            updateTodo={updateTodo} 
          />
          <div>
              <span>{activeStatusTodos} active</span>
              <span>{completedStatusTodos} completed</span> 
              <span>{totalTodos} total</span>
              <div>
                <ProgressBar percentage={completionPercentage} />
                <span>{completionPercentage}%</span>
              </div>
          </div>
          <div>
              <button onClick={showAll}>All</button>
              <button onClick={showActive}>Active</button>
              <button onClick={showCompleted}>Completed</button>
          </div>
      </div>

    </div>
  )
}
