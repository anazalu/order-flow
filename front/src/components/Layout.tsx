import React from 'react';
import { Grid } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ProductsContainer from './ProductsContainer';
import CartItemsContainer from './CartItemsContainer';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default function Layout() {
  const queryClient = useQueryClient();
  // const token = queryClient.getQueryData<string>(['token'], { enabled: false });
  const { data: token } = useQuery<string>(['token'], {
    select: (data: string) => data,
  });

  return (
    <div>
      {token ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
                <ProductsContainer />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
                <CartItemsContainer />
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <LoginForm />
          <RegistrationForm />
        </>
      )}
    </div>
  );
};
