import React, { useContext } from 'react';
import DataContext from '../context/DataContext';
import UserCard from "./UserCard/userCard"

export const Read = () => {
  const { data } = useContext(DataContext);
  const userList = Array.isArray(data) ? data : [];

  return (
    <div className="max-w-[800px] mx-auto bg-white border rounded p-4 shadow-md my-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul className="list-none p-0">
        {userList.map((user) => (
          <li key={user.id} className="mb-4">
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};