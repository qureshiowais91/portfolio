import { useState, useEffect } from 'react';

export const UserInput = ({ createUser }) => {

  const [userData, setUserData] = useState('');

  const [address, setAddress] = useState({
    street: '',
    suite: '',
    city: '',
    zipcode: '',
  });

  const [geo, setGeo] = useState({
    lat: '',
    lng: '',
  });

  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    website: '',
  });

  const [company, setCompany] = useState({
    name: '',
    catchPhrase: '',
    bs: '',
  });

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    console.log(value);
    setAddress((prevAddress) => ({
      ...prevAddress,
      [id]: value,
    }));
  };

  const handleUserChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleCompanyChange = (e) => {
    const { id, value } = e.target;
    console.log(value);

    setCompany((prevCompany) => ({
      ...prevCompany,
      [id]: value,
    }));
  };

  const handleGeoChange = (e) => {
    const { id, value } = e.target;
    console.log(value);
    setGeo((prevGeo) => ({
      ...prevGeo,
      [id]: value,
    }));
  };

  const handleAddUser = () => {
    setUserData(() => ({
      ...user,
      address: { ...address, geo },
      company: { ...company },
    }));
  };

  useEffect(() => {
    createUser(userData);
  }, [userData]);

  return (
    <div className='max-w-md mx-auto'>
      <div className='grid grid-cols-1 gap-4 '>
        <label className='font-bold' htmlFor='username'>
          Username:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='text'
          id='username'
          onChange={handleUserChange}
        ></input>
        <label className='font-bold' htmlFor='email'>
          Email:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='email'
          id='email'
          onChange={handleUserChange}
        ></input>
        <label className='font-bold' htmlFor='phone'>
          Phone:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='tel'
          id='phone'
          onChange={handleUserChange}
        ></input>
        <label className='font-bold' htmlFor='website'>
          Website:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='text'
          id='website'
          onChange={handleUserChange}
        ></input>
        <label className='font-bold' htmlFor='address_street'>
          Address:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='text'
          id='street'
          onChange={handleAddressChange}
        ></input>
        <label className='font-bold' htmlFor='address_geo_lat'>
          Geolocation Latitude:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='text'
          id='lat'
          onChange={handleGeoChange}
        ></input>
        <label className='font-bold' htmlFor='address_geo_lng'>
          Geolocation Longitude:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='text'
          id='lng'
          onChange={handleGeoChange}
        ></input>
        <label className='font-bold' htmlFor='address'>
          City:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='text'
          id='city'
          onChange={handleAddressChange}
        ></input>
        <label className='font-bold' htmlFor='address'>
          Street:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='text'
          id='street'
          onChange={handleAddressChange}
        ></input>

        <label className='font-bold' htmlFor='address'>
          Suite:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='text'
          id='suite'
          onChange={handleAddressChange}
        ></input>

        <label className='font-bold' htmlFor='company'>
          Company:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='text'
          id='name'
          onChange={handleCompanyChange}
        ></input>
        <label className='font-bold' htmlFor='catchphrase'>
          Catchphrase:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='text'
          id='catchPhrase'
          onChange={handleCompanyChange}
        ></input>
        <label className='font-bold' htmlFor='business'>
          Business:
        </label>
        <input
          className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
          type='text'
          id='bs'
          onChange={handleCompanyChange}
        ></input>
      </div>

      <div className='mt-5'>
        <button
          onClick={handleAddUser}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300'
        >
          Add User
        </button>
      </div>
    </div>
  );
};
