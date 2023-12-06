// DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();

  const [updateId, setUpdateId] = useState();

  const [geo, setGeo] = useState({
    lat: '',
    lng: '',
  });

  const [company, setCompany] = useState({
    name: '',
    catchPhrase: '',
    bs: '',
  });

  const [address, setAddress] = useState({
    street: '',
    suite: '',
    city: '',
  });

  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    website: '',
  });

  const handleUpdateIdChange = (e) => {
    const { id, value } = e.target;
    setUpdateId((prevUpdateId) => ({
      ...prevUpdateId,
      [id]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [id]: value,
    }));
  };

  const handleUserChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
  };

  const handleCompanyChange = (e) => {
    const { id, value } = e.target;
    setCompany((prevCompany) => ({
      ...prevCompany,
      [id]: value,
    }));
  };

  const handleGeoChange = (e) => {
    const { id, value } = e.target;
    setGeo((prevGeo) => ({
      ...prevGeo,
      [id]: value,
    }));
  };

  useEffect(() => {
    setUser(() => ({
      ...user,
      address: { ...address, geo },
      company: { ...company },
      id: updateId?.id,
    }));
  }, [geo, address, company, updateId]);

  const handleAddUser = () => {
    createUser(user);
  };

  const handleUpdateUser = () => {
    console.log(user);
    updateUser(user);
  };


  const handleDeleteUser = ()=>{
    deleteUser(user)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          'https://api-rest-1-mqvk.onrender.com/users'
        );
        setData(resp.data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const createUser = (userData) => {
    console.log('check User Create', userData);
    if (userData) {
      (() => {
        axios.post('https://api-rest-1-mqvk.onrender.com/users', userData);
      })();
    }
  };

  const updateUser = (userData) => {
    const { id } = userData;
    console.log(userData);
    console.log('id', id);
    if (userData) {
      axios.post(
        `https://api-rest-1-mqvk.onrender.com/usersUpdate?_id=${id}`,
        userData
      );
    }
  };

  const deleteUser = (userData) => {
    const { id } = userData;
    console.log(id)
    if (id) {
      axios.put(`https://api-rest-1-mqvk.onrender.com/usersdelete?_id=${id}`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        handleAddressChange,
        handleUserChange,
        handleCompanyChange,
        handleGeoChange,
        handleAddUser,
        handleUpdateUser,
        handleUpdateIdChange,
        handleDeleteUser,
        data,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useUserData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useUserData must be used within a DataProvider');
  }
  return context;
};
