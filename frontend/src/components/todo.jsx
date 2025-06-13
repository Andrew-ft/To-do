import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { NotebookPen } from 'lucide-react';

export default function Todo({ todos, error, loading, deleteTodo, updateTodo }) {
    const [editingId, setEditingId] = useState(null);
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
            completed: !todo.completed,
        };
        updateTodo(todo._id, updatedTodo);
    };

    return (
        <div>
            {error && <p className='flex justify-center'>Failed to fetch todos</p>}

            {loading && (
                <span className="loading loading-infinity loading-xl flex justify-center bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-indigo-500 mx-auto"></span>
            )}

            {!error && !loading && todos.length >= 1 ? (
                todos.map((todo) =>
                    todo._id ? (
                        <div key={todo._id} className="flex justify-between items-center mx-5 py-2 bg-pruple-500 border-white/10">
                            <div className="flex gap-3 items-center">
                                <label className="relative cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleComplete(todo)}
                                        className="peer absolute opacity-0 w-0 h-0"
                                    />
                                    <div className={`
                                        w-5 h-5 rounded-md border-2 
                                        transition-all duration-300 
                                        flex items-center justify-center
                                        ${todo.completed
                                            ? 'bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-indigo-500 border-none'
                                            : 'border-transparent bg-transparent peer-hover:border-gradient-to-tr peer-hover:from-fuchsia-500 peer-hover:via-purple-500 peer-hover:to-indigo-500'
                                        }
                                        border border-white/30
                                    `}>
                                        {todo.completed && (
                                            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </div>
                                </label>

                                {editingId !== todo._id ? (
                                    <span
                                        className={`text-white ${todo.completed ? 'line-through text-white/40' : ''}`}
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
                                            className="focus:outline-none py-1 px-2 text-white bg-zinc-700 rounded-md"
                                        />
                                    </form>
                                )}

                                <span
                                    className={`inline-block px-2 py-0.5 text-xs font-semibold text-white rounded-md ${
                                        todo.priority === 'low'
                                            ? 'bg-green-500'
                                            : todo.priority === 'medium'
                                            ? 'bg-orange-500'
                                            : 'bg-red-500'
                                    }`}
                                >
                                    {todo.priority}
                                </span>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span className="text-sm font-medium text-white/60">{formatDate(todo.createdAt)}</span>
                                <Trash2
                                    onClick={() => deleteTodo(todo._id)}
                                    className="text-red-400 hover:text-red-500 transition-all duration-300 w-5 h-5 cursor-pointer"
                                />
                            </div>
                        </div>
                    ) : null
                )
            ) : (
                <div className="flex gap-2 justify-center my-5 text-white/70">
                    <NotebookPen />
                    <p>No todos here yet..</p>
                </div>
            )}
        </div>
    );
}
