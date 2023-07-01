import React, { useState, FormEvent } from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Container,
} from '@mui/material';
import axios from 'axios';

interface RegistrationFormProps {}

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username,
        email,
        password,
      });

      // Registration successful
      setSuccess(true);
      setError('');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      // Registration error
      setSuccess(false);
      setError('An error occurred during registration.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper style={{ marginTop: '2rem', padding: '2rem' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Registration Form
        </Typography>
        {success && (
          <Typography variant="body1" color="primary" gutterBottom>
            Registration successful!
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '1rem' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '1rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '1rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '1rem' }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default RegistrationForm;
