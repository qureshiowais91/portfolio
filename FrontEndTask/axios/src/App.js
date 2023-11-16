import React, { useEffect, useState } from 'react';
import UserList from './components/userList'; // Make sure the file name and import match
import context from './components/context';
import UserForm from "./components/userForm"
import axios from 'axios';
import Layout from './layout';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={< Layout />} >
    <Route path='/add' element={<UserForm />} />
  </Route >
))

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='App'>
      <div className='container'>
        {data.length > 0 && (
          <context.Provider value={{ data }}>
            <RouterProvider router={router}></RouterProvider>
          </context.Provider>
        )}
      </div>
    </div>
  );
}

export default App;
