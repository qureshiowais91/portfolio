import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // Import a custom CSS file for additional styles

export const RootLayout = () => {
  return (
    <div className="root-layout">
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/all">All</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/career">Career</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cyber_sec">Cyber Security</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/data_sc">Data Science</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fsd">FSD</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-3">
        <Outlet />
      </div>
    </div>
  );
};
