import React, { useState } from 'react';
import { TodoItem } from './TodoItem.js';
import { useTodoContext } from './App';

export const TodoList = () => {
    const { todos } = useTodoContext();
    const [filter, setFilter] = useState("All");

    const filterHandler = (e) => {
        setFilter(e.target.value);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === "All") {
            return true;
        }
        return todo.status === filter;
    });

    return (
        <div>
            <div className='container'>
                <div className='row m-5'>
                    <p className='col-6'>My Task List</p>
                    <select className="col-3" onChange={filterHandler}>
                        <option value="All">Status Filter</option>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className='row'>
                    {filteredTodos.map((todo, index) => (
                        <TodoItem todo={todo} key={index}></TodoItem>
                    ))}
                </div>
            </div>
        </div>
    );
};
