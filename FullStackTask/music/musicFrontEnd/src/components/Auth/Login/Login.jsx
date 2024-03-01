import { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Collapse,
} from '@mui/material';
import { API } from '../../../API/API';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
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
      password: '',
    });

    const data = {
      email: formData.email,
      password: formData.password,
    };

    (async () => {
      const res = await fetch(`${API.LOGIN_USER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res?.error) {
        setError({ errorMsg: res.error, errorStatus: res.errorStatus });
      }

      const userAccount = await res.json();
      console.log(userAccount);
      dispatch(setUser(userAccount));
      navigate('/dashboard');
    })();
  };

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={4}
    >
      <Collapse in={error === true}>
        <Alert severity='error'>Incorrect Password</Alert>
      </Collapse>
      <Collapse in={error === false}>
        <Alert severity='success'>Password Is Correct</Alert>
      </Collapse>
      <Typography variant='h4'>Login</Typography>
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
            Login
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
