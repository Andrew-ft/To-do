import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoInput from '../components/todoInput';
import TodoList from '../components/todoList';
import ProgressBar from '../components/progressBar';

// const API_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL;

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Index() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [completed, setCompleted] = useState(false);
  const [filter, setFilter] = useState('all');
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/api/todos`)
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.log('Error fetching todos:', error);
        setError('Failed to fetch todos');
        setLoading(false);
      });
  }, []);

  const addTodo = (todo) => {
    axios.post(`${API_BASE}/api/todos`, todo)
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
      });
  };

  const deleteTodo = (todoId) => {
    axios.delete(`${API_BASE}/api/todos/${todoId}`)
      .then(() => {
        setTodos(prevState => prevState.filter(todo => todo._id !== todoId));
      })
      .catch(error => {
        console.log('Error deleting todo:', error);
        setError('Failed to delete todo');
      });
  };

  const updateTodo = (id, updatedData) => {
    axios.patch(`${API_BASE}/api/todos/${id}`, updatedData)
      .then(() => {
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

  const checkAll = async () => {
    try {
      const newCompletedStatus = !allChecked;
      const updatedTodos = todos.map(todo => ({
        ...todo,
        completed: newCompletedStatus
      }));
      setTodos(updatedTodos);

      await Promise.all(
        todos.map(todo =>
          axios.patch(`${API_BASE}/api/todos/${todo._id}`, {
            completed: newCompletedStatus
          })
        )
      );

      setAllChecked(newCompletedStatus);
      setError(null);
    } catch (error) {
      console.log('Error updating todos:', error);
      setError('Failed to update todos');

      axios.get(`${API_BASE}/api/todos`)
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
          axios.delete(`${API_BASE}/api/todos/${todo._id}`)
        )
      );

      setError(null);
    } catch (error) {
      console.log('Error clearing todos:', error);
      setError('Failed to clear todos');

      axios.get(`${API_BASE}/api/todos`)
        .then(response => {
          setTodos(response.data);
        })
        .catch(err => {
          console.log('Error fetching todos:', err);
        });
    }
  };

  const filteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const showActive = () => setFilter('active');
  const showCompleted = () => setFilter('completed');
  const showAll = () => setFilter('all');

  const remainingCount = todos.filter(t => !t.completed).length;
  const activeStatusTodos = todos.filter(todo => !todo.completed).length;
  const completedStatusTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const completionPercentage = totalTodos === 0
    ? 0
    : Math.round((completedStatusTodos / totalTodos) * 100);

  return (
    <div className=''>
      <TodoInput
        addTodo={addTodo}
        title={title}
        setTitle={setTitle}
        priority={priority}
        setPriority={setPriority}
        completed={completed}
        setCompleted={setCompleted}
      />

      <div className='text-center text-white text-sm font-medium opacity-50 my-4'>
        {remainingCount} item{remainingCount !== 1 ? 's' : ''} remaining
      </div>

      <div className='w-full sm:w-2/3 mx-auto p-5 text-white rounded-xl bg-zinc-700 bg-opacity-10 shadow-md'>
        <div className='flex justify-between w-4/5 mx-auto gap-100'>
          <button onClick={checkAll} className='text-sm font-semibold btn btn-soft'>
            {allChecked ? 'Uncheck All' : 'Check All'}
          </button>
          <button onClick={clearCompleted} className='text-sm font-semibold text-red-500'>
            Clear Completed
          </button>
        </div>

        <div className="h-px bg-gray-700 w-full my-4"></div>

        <TodoList
          todos={filteredTodos()}
          error={error}
          loading={loading}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

        <div className='flex flex-wrap justify-center gap-7 text-sm'>
          <span>{activeStatusTodos} active</span>
          <span>{completedStatusTodos} completed</span>
          <span>{totalTodos} total</span>
          <div className='flex items-center gap-2'>
            <ProgressBar percentage={completionPercentage} />
            <span>{completionPercentage}%</span>
          </div>
        </div>

        <div className='flex justify-center mt-5'>
          <div className='join'>
            <button onClick={showAll} className='btn join-item btn-soft'>All</button>
            <button onClick={showActive} className='btn join-item btn-soft'>Active</button>
            <button onClick={showCompleted} className='btn join-item btn-soft'>Completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}
