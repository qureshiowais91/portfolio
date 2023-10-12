import React from 'react';
import Typography from '@mui/material/Typography';
export const Home = () => {
  return (
    <div>
      <Typography
        variant='h6'
        noWrap
        component='a'
        href='/'
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        LOGO
      </Typography>
    </div>
  );
};
