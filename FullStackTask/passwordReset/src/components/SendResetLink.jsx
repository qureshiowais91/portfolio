import React, { useState } from 'react';
import { Typography, TextField, Button, Stack } from '@mui/material';
import { instance } from '../apiEndpoints';

export const SendLink = () => {
  const [formData, setFormData] = useState({
    email: '',
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
      email: '',
    });
    console.log(formData);
    instance.post('/send-url-email', { email: formData.email });
  };

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={4}
    >
      <Typography variant='h4'>Send Reset Link</Typography>
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
          <Button type='submit' variant='contained' color='primary'>
            Get Reset Link
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
