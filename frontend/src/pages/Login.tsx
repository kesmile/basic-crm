import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { Button, TextField, Container, Typography } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      const { token } = response.data;
      const decodedToken: { id: string; name: string; email: string } = jwtDecode(token);
      const { id, name } = decodedToken;
      dispatch(loginSuccess({ token, user: {id, name, email} }));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" textAlign="center" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;