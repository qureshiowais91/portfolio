import React from 'react'
import Navbar from './component/menu/navbar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <div>      
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    )
}
