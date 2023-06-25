import React from 'react';
import { Grid } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import ProductsContainer from './ProductsContainer';
import CartItemContainer from './CartItemsContainer';
import LoginForm from './LoginForm';

const Layout: React.FC = () => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData<string>(['token']);

  return (
    <div>
      {token ? (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
              <ProductsContainer />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
              <CartItemContainer />
            </div>
          </Grid>
        </Grid>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Layout;