// DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();

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
    }));

    console.log(user);
    console.log(address);
  }, [geo, address, company]);
  

  const handleAddUser = () => {
    createUser(user)
  };

 
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

  // const updateUser = () => {
  //   const id = userData?.id?.id;
  //   console.log(id);
  //   if (userData) {
  //     axios.post(
  //       `https://api-rest-1-mqvk.onrender.com/usersUpdate?_id=${id}`,
  //       userData
  //     );
  //   }
  // };

  return (
    <DataContext.Provider
      value={{
        handleAddressChange,
        handleUserChange,
        handleCompanyChange,
        handleGeoChange,
        handleAddUser,
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