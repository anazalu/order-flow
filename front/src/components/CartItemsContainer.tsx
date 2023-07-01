
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Item } from '../types';
import CartItem from './CartItem';

export default function CartItemsContainer() {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData<string>(['token']);

  const { isLoading, isError, data, error, refetch } = useQuery<Item[]>(['items'], (): Promise<Item[]> =>
    axios
      .get('http://localhost:8000/api/cart/items/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
  );

  if (isLoading) return (
    <>
      <p>Loading...</p>
    </>
  )

  if (error instanceof Error) return (
    <>
      <p>{'An error has occurred: ' + error?.message}</p>
    </>
  )

  // console.log(data)

  return (
    <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data?.map((item) => (
          <li key={item.id}>
            <CartItem
              key={item.id}
              item={item}
              increaseQuantity={() => {
                // Implement the logic to increase the quantity of the cart item
              }}
              decreaseQuantity={() => {
                // Implement the logic to decrease the quantity of the cart item
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
};
