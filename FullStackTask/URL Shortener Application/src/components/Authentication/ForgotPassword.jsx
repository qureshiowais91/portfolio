import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { API } from '../../API';

export const Forgotpassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    resetToken: '',
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const ForgotPasswordHandler = () => {
    (async () => {
      await fetch(`${API.USER_URL}/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(formData),
      });
    })();
  };
  return (
    <Container>
      <Grid container direction='column' spacing={6}>
        <Grid item>
          <TextField
            label='Email'
            name='email'
            onChange={HandleChange}
            variant='standard'
          />
        </Grid>
        <Grid item>
          <TextField
            label='Password'
            name='password'
            onChange={HandleChange}
            variant='standard'
          />
        </Grid>
        <Grid item>
          <TextField
            label='ResetToken'
            name='resetToken'
            onChange={HandleChange}
            variant='standard'
          />
        </Grid>
        <Grid item>
          <Button variant='contained' onClick={ForgotPasswordHandler}>
            Forgot Password
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
