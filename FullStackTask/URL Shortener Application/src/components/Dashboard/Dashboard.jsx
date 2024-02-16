import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { NavLink, Outlet } from 'react-router-dom';
import { getJWTToken } from '../../util/authUtils';
import { API } from '../../API';

export const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${API.USER_URL}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data = await response.json();

      setProfile(data['userAccount']);
      console.log(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    (async () => {
      const token = getJWTToken();
      if (token) {
        await fetchUserProfile(token);
      }
    })();
  }, []);

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6'>URL Shortner</Typography>
          <div>
            <IconButton onClick={handleClick} color='inherit'>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <NavLink to='/dashboard/profile'>
                <MenuItem>Profile</MenuItem>
              </NavLink>
              <NavLink to='/dashboard/urllist'>
                <MenuItem>List URL</MenuItem>
              </NavLink>
              <NavLink to='/'>
                <MenuItem>Log Out</MenuItem>
              </NavLink>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Outlet></Outlet>
    </>
  );
};
