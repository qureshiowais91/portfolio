import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export const Forgotpassword = () => {
  return (
    <Container>
      <Grid container direction='column' spacing={6}>
        <Grid item>
          <TextField label='Email' variant='standard' />
        </Grid>
        <Grid item>
          <TextField label='Password' variant='standard' />
        </Grid>
        <Grid item>
          <Button variant='contained'>Forgot Password</Button>
        </Grid>
      </Grid>
    </Container>
  );
};
