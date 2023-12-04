import React from 'react';
import { UserUpdate } from './UserCard/userUpdate';
import { useUserData } from '../context/DataProvider';

export const Update = () => {

  const {updateUser} = useUserData();
  console.log(updateUser);


  return (
    <div>
      <div className="max-w-[800px] mx-auto bg-white border rounded p-4 shadow-md my-4">
        <h1 className="text-2xl font-bold mb-4">Update User</h1>
        <UserUpdate updateUser={updateUser} />
      </div>
    </div>
  )
}
