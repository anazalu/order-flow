
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import CartItem from "./CartItem";

interface Item {
  item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
}

export default function CartItemsContainer() {

  const { isLoading, isError, data, error, refetch } = useQuery<Item[]>(["items"], (): Promise<Item[]> =>
    axios
      .get("http://localhost:8000/items/")
      .then((res) => res.data.items)
  );

  if (isLoading) return (
    <>
      <p>Loading...</p>
    </>
  )

  if (error instanceof Error) return (
    <>
      <p>{"An error has occurred: " + error?.message}</p>
    </>
  )

  // console.log(data)

  return (
    <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data?.map((item) => (
          <CartItem
            key={item.item_id}
            item={item}
            increaseQuantity={() => {
              // Implement the logic to increase the quantity of the cart item
            }}
            decreaseQuantity={() => {
              // Implement the logic to decrease the quantity of the cart item
            }}
          />
        ))}
      </div>
    </div>
  )
};
