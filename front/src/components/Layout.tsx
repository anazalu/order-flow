import React from 'react';
import { Grid } from '@mui/material';
import ProductsContainer from './ProductsContainer';
import CartItemContainer from './CartItemsContainer';

const Layout: React.FC = () => {
  return (
    <div>
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
    </div>
  );
};

export default Layout;