import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/auth/register`, { email, password, username });
      alert('Registration successful');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" textAlign="center" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;