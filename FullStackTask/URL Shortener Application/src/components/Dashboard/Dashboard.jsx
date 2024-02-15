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
import { Outlet } from 'react-router-dom';
import { getJWTToken } from '../../util/authUtils';
import { API } from '../../API';

export const Dashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    (async () => {
      const token = getJWTToken();
      if (token) {
        await fetchUserProfile(token);
        console.log(profile);
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Outlet></Outlet>
    </>
  );
};
