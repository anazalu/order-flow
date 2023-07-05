
import axios from 'axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import { Product, Item } from '../types';
import CartItem from './CartItem';

interface CartItemsContainerProps {
  products: Product[] | undefined;
  items: Item[] | undefined;
  handleTotalQuantityChange: (quantity: number) => void;
}

export default function CartItemsContainer({ products, items, handleTotalQuantityChange }: CartItemsContainerProps) {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData<string>(['token']);

  const calculateSubtotal = (item: Item | undefined, products: Product[] | undefined): number => {
    if (!item) return 0;
    const product: Product | undefined = products?.find(element => element.id == item.product_id);
    if (!product) return 0;
    return item.quantity * product.price;
  };

  const updateCartItemMutation = useMutation((item: Item) => {
    return axios.put(`http://localhost:8000/api/cart/items/${item.id}/`, { product_id: item.product_id, quantity: item.quantity }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((_) => handleTotalQuantityChange(items?.map((item) => item.quantity).reduce((prev, cur) => prev + cur) || 0))
  }
  );

  const deleteCartItemMutation = useMutation((itemId: number) => {
    return axios.delete(`http://localhost:8000/api/cart/items/${itemId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((_) => handleTotalQuantityChange(items?.map((item) => item.quantity).reduce((prev, cur) => prev + cur) || 0));
  });

  const handleIncrease = (item: Item) => {
    updateCartItemMutation.mutate({ id: item.id, product_id: item.product_id, quantity: item.quantity + 1 });
  };

  const handleDecrease = (item: Item) => {
    updateCartItemMutation.mutate({ id: item.id, product_id: item.product_id, quantity: item.quantity - 1 });
  };

  const handleDelete = (itemId: number) => {
    deleteCartItemMutation.mutate(itemId);
  };

  return (
    <>
      <div style={{ overflow: 'auto', maxHeight: '100%' /* 'calc(100vh - 64px)' */ }}>
        {/* <Typography variant="h5" gutterBottom>
          Cart
        </Typography> */}
        <Typography variant="h6" gutterBottom>
          <br />
          Items in the cart: {items?.length}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Total: {items?.map((item) => calculateSubtotal(item, products)).reduce((prev, cur) => prev + cur).toFixed(2)}
        </Typography>
        <ol style={{ listStyle: 'none', padding: 0 }}>
          {items?.sort((a, b) => a.id - b.id).map((item) => (
            <li key={item.id}>
              <CartItem
                key={item.id}
                product={products?.find(element => element.id == item.product_id)}
                item={item}
                increaseQuantity={() => {
                  handleIncrease(item)
                }}
                decreaseQuantity={() => {
                  handleDecrease(item)
                }}
                deleteItem={() => {
                  handleDelete(item.id)
                }}
              />
            </li>
          ))}
        </ol>
        <Typography variant="h6" gutterBottom>
          Total: {items?.map((item) => calculateSubtotal(item, products)).reduce((prev, cur) => prev + cur).toFixed(2)}
        </Typography>
      </div>
    </>
  )
};
