import React, { useState } from 'react';
import { useTodoContext } from './App';

export const TodoItem = ({ todo }) => {
  const { editTodo, deleteTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedStatus, setEditedStatus] = useState(todo.status);

  const handleTaskChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setEditedStatus(e.target.value);
  };

  const handleDeleteTask = () => {
    console.log(todo.id);
    deleteTodo(todo.id);
  };

  const handleEditTodo = () => {
    const editedTodo = {
      ...todo,
      task: editedTask,
      description: editedDescription,
      status: editedStatus,
    };
    editTodo(todo.id, editedTodo);
    setIsEditing(false);
  };

  return (
    <div className='col-md-5 mb-3'>
      <div className="card">
        {isEditing ? (
          <div className="card-body">
            <h4 className="card-title">Task:</h4>
            <input
              type="text"
              className="form-control"
              value={editedTask}
              onChange={handleTaskChange}
            />
            <h4 className="card-title">Description:</h4>
            <input
              type="text"
              className="form-control"
              value={editedDescription}
              onChange={handleDescriptionChange}
            />
            <label htmlFor={`status-${todo.id}`} className="card-title">Status:</label>
            <select
              id={`status-${todo.id}`}
              value={editedStatus}
              onChange={handleStatusChange}
              className="form-select"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button onClick={handleEditTodo} className="btn btn-primary m-2">Save</button>
          </div>
        ) : (
          <div className="card-body">
            <h4 className="card-title">Task: {todo.task}</h4>
            <p className="card-text">Description: {todo.description}</p>
            <p className="card-text">Status: {todo.status}</p>
            <button onClick={() => setIsEditing(true)} className="btn btn-primary m-2">Edit</button>
            <button onClick={handleDeleteTask} className="btn btn-primary m-2">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};
