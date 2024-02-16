import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Alert,
  Collapse,
  CircularProgress,
} from '@mui/material';
import useStore from '../../app/store';
import { useMutation } from 'react-query';
import { API } from '../../API';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { login } = useStore();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginMutation = useMutation(
    async (formData) => {
      setIsLoading(true); // Set loading state to true when mutation starts
      const response = await fetch(`${API.USER_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setIsLoading(false); // Set loading state to false when mutation completes
      return response.json();
    },
    {
      onSuccess: (data) => {
        login(data);
        navigate('/dashboard');
      },
      onError: (error) => {
        setIsLoading(false); // Set loading state to false on error
        setErrorMessage('Error: Invalid username or password');
      },
    }
  );

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={4}
    >
      <Collapse in={errorMessage !== ''}>
        <Alert severity='error'>{errorMessage}</Alert>
      </Collapse>
      {isLoading ? ( // Show loading indicator when isLoading is true
        <CircularProgress />
      ) : (
        <Collapse in={login === true}>
          <Alert severity='success'>Password Is Correct</Alert>
        </Collapse>
      )}
      <form onSubmit={handleLogin}>
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={4}
        >
          <TextField
            label='Email'
            variant='outlined'
            name='username'
            type='email'
            value={formData.username}
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
            Login
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
