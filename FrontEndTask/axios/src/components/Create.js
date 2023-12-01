import React, { useContext } from 'react';
import { UserInput } from './UserCard/userInput';
import DataContext from '../context/DataContext';

export const Create = () => {
  const {createUser } = useContext(DataContext);

  return (
    <div>
      <div className="max-w-[800px] mx-auto bg-white border rounded p-4 shadow-md my-4">
        <h1 className="text-2xl font-bold mb-4">Add New User</h1>
        <UserInput createUser={createUser}  /></div>

    </div>
  )
}
