import React from 'react';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { IconButton } from '@mui/material';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log(e.target.value)
    navigate(`/${e.target.value}`);
  };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='logo button'
          ></IconButton>

          <Stack direction='row' spacing={2}>
            <Button onClick={handleClick} color='inherit' value='home' >Home</Button>
            <Button onClick={handleClick} color='inherit' value='project' >Project</Button>
            <Button onClick={handleClick} color='inherit' value='aboutme' >About Me</Button>
            {/* <Link color='inherit'>My projects</Link>
            <Link color='inherit'>About Me</Link> */}
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};
