import React from 'react';
import UserCard from "./UserCard/userCard"
import { useUserData } from '../context/DataProvider';

export const Read = () => {
  const { data } = useUserData();
  const userList = Array.isArray(data) ? data : [];

  return (
    <div className="max-w-[800px] mx-auto bg-white border rounded p-4 shadow-md my-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul className="list-none p-0">
        {userList.map((user) => (
          <li key={user._id} className="mb-4">
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};