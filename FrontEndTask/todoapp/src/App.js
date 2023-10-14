import './App.css';
import React, { createContext, useState, useContext } from 'react';
import {TodoList} from './TodoList'
import TodoForm from './TodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoContext = createContext();


function App() {

  const [todos, setTodos] = useState([
    {
      id: 1,
      task: 'Complete React Project',
      description: 'Create a sample React project with todo functionality.',
      status: 'Pending',
      completed: false,
    },
    {
      id: 2,
      task: 'Learn Redux',
      description: 'Study and implement Redux state management in the project.',
      status: 'In Progress',
      completed: false,
    },
    {
      id: 3,
      task: 'Style Components',
      description: 'Add styles and improve the overall user interface.',
      status: 'Pending',
      completed: false,
    },
    {
      id: 4,
      task: 'Deploy App',
      description: 'Deploy the React app to a hosting platform.',
      status: 'Completed',
      completed: true,
    }
  ]);
  

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };


  return (
    <div className="App">
      <TodoContext.Provider value={{ todos, addTodo, toggleComplete, editTodo, deleteTodo }}>
        <h1>My Todo</h1>
        <TodoForm addTodo={addTodo}></TodoForm>
        <TodoList></TodoList>
      </TodoContext.Provider>
    </div>
  );
}

export default App;

export const useTodoContext = () => {
  return useContext(TodoContext);
};