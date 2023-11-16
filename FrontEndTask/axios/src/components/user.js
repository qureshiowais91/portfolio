import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function User({ user }) {
  const navigate = useNavigate();


  return (
    <div className="col-3 m-5">
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>Company: {user.company.name}</p>
      <p>Catch Phrase: {user.company.catchPhrase}</p>
      <p>BS: {user.company.bs}</p>
      <div>
        <button className="btn btn-primary" onClick={() => { navigate("/add") }}>Edit</button>
        <span>  </span>
        <NavLink className="btn btn-primary" to="/add" type="submit">Delete</NavLink>
      </div>
    </div>
  );
}

export default User;