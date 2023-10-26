import React, { useEffect, useState } from 'react';
import UserList from './components/userList'; // Make sure the file name and import match
import context from './components/context';
import axios from 'axios';
import './App.css';
import UserForm from './components/userForm';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(response.data);
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
            <UserList />
            <UserForm></UserForm>
          </context.Provider>
        )}
      </div>
    </div>
  );
}

export default App;
