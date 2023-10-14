import React, { useState,  } from 'react';
import { useTodoContext } from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

const TodoForm = () => {
  const { addTodo } = useTodoContext();

  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addTodo)
    addTodo({ task, description, status: 'Pending' });
  };

  return (
    <div className="container">
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-5">
          <label htmlFor="task" className="form-label">Task Name</label>
          <input
            type="text"
            className="form-control"
            id="task"
            value={task}
            onChange={handleTaskChange}
            required
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button type="submit" className="btn btn-primary">Add Task</button>
        </div>
      </form>
    </div>
  );

};

export default TodoForm;
