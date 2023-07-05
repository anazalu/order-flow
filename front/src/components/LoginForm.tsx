import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Button, TextField, Container, Paper, Typography, Grid } from '@mui/material';

export interface LoginResponse {
    refresh: string;
    access: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

const login = async (credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> => {
    try {
        const response = await axios.post<LoginResponse>('http://localhost:8000/api/token/', credentials);
        return response;
    } catch (error) {
        throw new Error('Login failed');
    }
};

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const queryClient = useQueryClient();

    const { mutate: loginUser, isLoading } = useMutation(login, {
        onSuccess: (data: AxiosResponse<LoginResponse>) => {
            const accessToken: string = data.data.access;
            queryClient.setQueryData<string>(['token'], accessToken);
            queryClient.setQueryData<string>(['username'], username);
        },
    });

    const handleLogin = () => {
        loginUser({ username, password });
    };

    return (
        <Container maxWidth="xs">
        <Paper style={{ marginTop: '2rem', padding: '2rem' }} elevation={3}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form>
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
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  disabled={false} // Replace with your logic
                  fullWidth
                  style={{ marginTop: '1rem' }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
};
