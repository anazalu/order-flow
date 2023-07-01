import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Button, TextField, Link } from '@mui/material';
// import jwtDecode, { JwtPayload } from 'jwt-decode';

// interface JwtPayloadExtended extends JwtPayload {
//     token_type?: string;
//     user_id: string;
// }

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
            console.log('Token:\n' + accessToken)
            // const decodedToken: JwtPayloadExtended = jwtDecode<JwtPayloadExtended>(accessToken);
            // console.log('Decoded token:\n' + decodedToken)
            // const userId: number = Number(decodedToken.user_id);
            // console.log('Decoded token:\n' + decodedToken.iss + '\n' + decodedToken.sub + '\n' + decodedToken.aud + '\n' + decodedToken.exp + '\n' + decodedToken.nbf + '\n' + decodedToken.iat + '\n' + decodedToken.jti)
            // console.log('User ID from the decoded token:\n' + userId)
            queryClient.setQueryData<string>(['token'], data.data.access);
            // queryClient.setQueryData<number>(['user_id'], userId);
        },
    });

    const handleLogin = () => {
        loginUser({ username, password });
    };

    return (
        <div>
            <p>{'(LoginForm) Token cache size: ' + queryClient.getMutationCache().getAll().length}</p>
            <h2>Login</h2>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <br />
            <Link href="/registration">Register</Link>
        </div>
    );
};
