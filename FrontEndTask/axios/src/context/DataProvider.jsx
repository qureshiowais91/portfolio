import React, { useEffect, useState } from 'react';
import DataContext from './DataContext';
import axios from 'axios';

const DataProvider = ({ children }) => {
  const [data, setData] = useState('Test');

  useEffect(() => {
    (async () => {
      const resp = await axios.get(
        'https://api-rest-1-mqvk.onrender.com/users'
      );
      console.log(resp.data);
      setData(resp.data);
    })();
  }, [data]);

  const createUser = (userData) => {
    console.log('check User Create', userData);
    if (userData) {
      (() => {
        axios.post('https://api-rest-1-mqvk.onrender.com/users', userData);
      })();
    }
  };

  return (
    <DataContext.Provider value={{ data, setData, createUser }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
