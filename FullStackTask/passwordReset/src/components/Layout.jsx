import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Button,
  CssBaseline,
  ButtonGroup,
  Divider,
  Toolbar,
  Typography,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import makeStyles from '@emotion/styled';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff', // Change this to your desired color
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  divider: {
    margin: theme.spacing(0, 3),
  },
  loginButton: {
    marginRight: theme.spacing(3),
  },
}));

const LayoutMenu = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar} color=''>
        <Toolbar className={classes.toolbar}>
          <Divider
            spacing='2'
            orientation='vertical'
            variant='middle'
            className={classes.divider}
          />
          <ButtonGroup variant='outlined' aria-label=' primary button group'>
            <Button>
              <NavLink to='/login'>Login</NavLink>
            </Button>
            <Button>
              <NavLink to='/sendLink'>Reset Password</NavLink>
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default LayoutMenu;
