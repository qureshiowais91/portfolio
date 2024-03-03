import { useState } from 'react';
import { Typography, TextField, Button, Stack } from '@mui/material';
import { API } from '../../../API/API';

export const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
    });

    const data = {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    console.log(data);

    (async () => {
      const res = await fetch(`${API.REGISTER_USER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const register = await res.json()
      console.log(register);
    })();
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
            label='Confirm Password'
            variant='outlined'
            name='confirmPassword'
            type='password'
            value={formData.confirmPassword}
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