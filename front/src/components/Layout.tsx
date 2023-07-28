import { useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Product, Item } from '../types';
import Header from './Header';
import ProductsContainer from './ProductsContainer';
import CartItemsContainer from './CartItemsContainer';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default function Layout() {
  const queryClient = useQueryClient();

  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const handleSignOut = () => {
  //   console.log('handleSignOut()');
  //   setIsLoggedIn(false); // update the isLoggedIn state to trigger re-render
  // };

  const { data: token } = useQuery<string>(['token'], {
    select: (data: string) => data,
  });

  const { isLoading: isLoadingProducts, data: products, error: errorProducts } = useQuery<Product[]>(['products'], (): Promise<Product[]> =>
    axios
      .get('http://localhost:8000/api/products/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),
    {
      enabled: token !== undefined,
    }
  );

  const { isLoading: isLoadingCartItems, data: items, error: errorCartItems, refetch: refetchCartItems } = useQuery<Item[]>(['cartItems'], (): Promise<Item[]> => {
    return axios
      .get('http://localhost:8000/api/cart/items/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
  },
    {
      enabled: token !== undefined,
      cacheTime: 0,
    }
  );

  return (
    <>
      <Header />
      {token ? (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
              <ProductsContainer products={products} items={items} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
              <CartItemsContainer products={products} items={items} />
            </div>
          </Grid>
        </Grid>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', height: '75vh' }}>
          <Grid container spacing={2} style={{ alignItems: 'center' }}>
            <Grid item xs={6} style={{ borderRight: '1px solid #ccc', paddingRight: '1rem' }}>
              <RegistrationForm />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: '1rem' }}>
              <LoginForm />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};
