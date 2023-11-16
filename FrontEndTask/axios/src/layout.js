import React from 'react'
import { Outlet } from 'react-router-dom';
import UserList from './components/userList';

function Layout (){
    return (
        <div>
            <UserList></UserList>
            <Outlet></Outlet>
        </div>
    );
}
export default Layout;
