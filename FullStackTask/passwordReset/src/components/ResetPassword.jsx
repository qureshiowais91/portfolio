import React, { useState } from 'react';
import { Typography, TextField, Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { instance } from '../apiEndpoints';

export const ResetPassword = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { token } = useParams();
  console.log(token);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      email: '',
      password: '',
    });

   const data = {"userEmail": formData.email, "password":formData.password,"token":token}
   instance.post('/validate-token',data);
  };

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={4}
    >
      <Typography variant='h4'>Reset Password</Typography>
      <form onSubmit={handleSubmit}>
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={4}
        >
          <TextField
            label='Email'
            variant='outlined'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            label='Password'
            variant='outlined'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button type='submit' variant='contained' color='primary'>
            Register
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
