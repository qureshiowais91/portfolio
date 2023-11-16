import React, { useContext } from 'react';
import User from './user';
import context from './context';

function UserList() {
    const { data } = useContext(context);

    return (

        <div className='row'>
            {data.map(user => (
                <User key={user.id} user={user} />
            ))}

        </div>
    );
}

export default UserList;