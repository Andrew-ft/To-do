import React, { useState } from 'react'
import { Trash2 } from 'lucide-react' 

export default function Todo({ todos, error, loading, deleteTodo, updateTodo }) {
    const [editingId, setEditingId] = useState(null); // null means no editing
    const [editTitle, setEditTitle] = useState('');

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric', 
            year: 'numeric',
        });
    };

    const updateTodoHandler = (e, todo) => {
        e.preventDefault();
      
        const updatedTodo = {
          title: editTitle,
          priority: todo.priority,
          completed: todo.completed,
        };
      
        updateTodo(todo._id, updatedTodo);
        setEditingId(null);
    };

    const toggleComplete = (todo) => {
        const updatedTodo = {
            ...todo,
            completed: !todo.completed
        };
        updateTodo(todo._id, updatedTodo);
    };

    return (
        <div>
            { error && <p>Failed to fetch todos</p> }
            { loading && <p>Loading...</p> }
            { !error && !loading && todos.length >= 1 ? todos.map((todo) => (
                todo._id && (
                    <div key={todo._id}>
                        <div>
                            <input 
                                type="checkbox" 
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo)}
                            />

                            {editingId !== todo._id ? (
                                <span
                                    onDoubleClick={() => {
                                        setEditingId(todo._id);
                                        setEditTitle(todo.title);
                                    }}
                                >
                                    {todo.title}
                                </span>
                            ) : (
                                <form onSubmit={(e) => updateTodoHandler(e, todo)}>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        onBlur={() => setEditingId(null)}
                                        autoFocus
                                    />
                                </form>

                            )}

                            <span>{todo.priority}</span>
                        </div>
                        <div>
                            <span>{formatDate(todo.createdAt)}</span>
                            <div className='cursor-pointer'>
                                <Trash2 onClick={() => deleteTodo(todo._id)} />
                            </div>
                        </div>
                    </div>
                )
            )): <p>No todos here yet..</p>}
        </div>
    );
}
