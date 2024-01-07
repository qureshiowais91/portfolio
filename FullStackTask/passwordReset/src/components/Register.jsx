import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Stack } from '@mui/material';

export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

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
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={4}
    >
      <Typography variant='h4'>Register</Typography>
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
