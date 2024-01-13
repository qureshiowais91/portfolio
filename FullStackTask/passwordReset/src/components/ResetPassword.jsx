import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Stack,
  Collapse,
  Alert,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { sendRequest } from '../apiEndpoints';

export const ResetPassword = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState();

  const { token } = useParams();

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

    const data = {
      userEmail: formData.email,
      password: formData.password,
      token: token,
    };

    (async () => {
      const res = await sendRequest('/validate-token', data, 'POST');
      setError(res);
    })();
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
        <Collapse in={error === true}>
          <Alert severity='error'>Error Try Again With New Link</Alert>
        </Collapse>
        <Collapse in={error ===  false}>
          <Alert severity='success'>Password Successfuly Changed</Alert>
        </Collapse>
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
            Reset Password
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
