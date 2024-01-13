import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Collapse,
} from '@mui/material';
import { sendRequest } from '../apiEndpoints';

export const SendLink = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [error, setError] = useState();

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

    (async () => {
      const res = await sendRequest(
        '/send-url-email',
        { email: formData.email },
        'POST'
      );
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
      <Typography variant='h4'>Send Reset Link</Typography>
      <Collapse in={error === true}>
        <Alert severity='error'>Error: Reload Page And Try Again!!!</Alert>
      </Collapse>
      <Collapse in={error === false}>
        <Alert severity='success'>Check Inbox For Link</Alert>
      </Collapse>
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
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Get Reset Link
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
