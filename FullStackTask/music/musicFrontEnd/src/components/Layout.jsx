import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Button,
  ButtonGroup,
  Divider,
  Toolbar,
  ThemeProvider,
  createTheme,
  Container,
} from '@mui/material';
import { Outlet } from 'react-router-dom';

const theme = createTheme();

const LayoutMenu = () => {
  const appBarStyle = {
    backgroundColor: '#fff', // Change this to your desired color
  };

  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const dividerStyle = {
    margin: theme.spacing(0, 3),
  };

  return (
    <ThemeProvider theme={theme}>
        <AppBar style={appBarStyle} color=''>
          <Toolbar style={toolbarStyle}>
            <Divider
              spacing='2'
              orientation='vertical'
              variant='middle'
              style={dividerStyle}
            />
            <ButtonGroup variant='outlined' aria-label=' primary button group'>
              <Button>
                <NavLink to='/'>Login</NavLink>
              </Button>
              <Button>
                <NavLink to='/register'>Register</NavLink>
              </Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
        <Outlet />
    </ThemeProvider>
  );
};

export default LayoutMenu;
