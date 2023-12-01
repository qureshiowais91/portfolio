import React from 'react';

const UserCard = ({ user }) => {
  
  const {
    name,
    username,
    email,
    phone,
    website,
    address: { street, suite, city, zipcode, geo },
    company: { name: companyName, catchPhrase },
  } = user;

  return (
    <div className='bg-white border rounded p-4 shadow-md mb-4'>
      <h2 className='text-xl font-bold mb-2'>{name}</h2>
      <p>
        <strong>Username:</strong> {username}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Website:</strong> {website}
      </p>
      <p>
        <strong>Address:</strong> {street}, {suite}, {city}, {zipcode}
      </p>
      <p>
        <strong>Geolocation:</strong> Lat: {geo.lat}, Lng: {geo.lng}
      </p>
      <p>
        <strong>Company:</strong> {companyName}
      </p>
      <p>
        <strong>Catchphrase:</strong> {catchPhrase}
      </p>
    </div>
  );
};

export default UserCard;
