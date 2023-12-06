import { useUserData } from '../../context/DataProvider';

export const UserDelete = () => {
  const { handleUpdateIdChange,handleDeleteUser } = useUserData();

  return (
    <div>
      <label className='font-bold'>ID</label>
      <input
        className='w-full border rounded p-2 focus:border-blue-500 focus:outline-none'
        type='text'
        id='id'
        onChange={handleUpdateIdChange}
      ></input>
      
      <div className='mt-5'>
        <button
          onClick={handleDeleteUser}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300'
        >
          Delete User
        </button>
      </div>
    </div>
  );
};
