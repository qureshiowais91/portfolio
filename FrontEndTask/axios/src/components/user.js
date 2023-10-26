import React from 'react';

// User component that takes a user object as a prop and displays user information
function User({ user }) {
  return (
    <div className="user">
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>Company: {user.company.name}</p>
      <p>Catch Phrase: {user.company.catchPhrase}</p>
      <p>BS: {user.company.bs}</p>
      <div className='flex'>
      </div>
    </div>
  );
}

export default User;
