import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Product, Item } from '../types'

interface CartItemProps {
    item: Item | undefined;
    increaseQuantity: () => void;
    decreaseQuantity: () => void;
}

export default function CartItem({ item, increaseQuantity, decreaseQuantity }: CartItemProps) {
    const queryClient = useQueryClient();
    const token = queryClient.getQueryData<string>(['token']);

    const { isLoading, isError, data, error, refetch } = useQuery<Product>(['product'], (): Promise<Product> =>
        axios
            .get(`http://localhost:8000/api/products/${item?.product_id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data)
    );

    const handleIncrease = () => {
        increaseQuantity();
    };

    const handleDecrease = () => {
        decreaseQuantity();
    };

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

    return (
        <Card style={{ marginBottom: '1rem' }}>
            {/* <img src={item.imageUrl} alt={item.name} style={{ height: 100, objectFit: 'cover' }} /> */}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {data?.name} x {item?.quantity} = {(data && item) ? (data.price * item.quantity) : '?'}
                </Typography>
                <Button variant="outlined" onClick={handleDecrease} disabled={item?.quantity === 1}>
                    -
                </Button>
                <Button variant="outlined" onClick={handleIncrease}>
                    +
                </Button>
            </CardContent>
        </Card>
    );
};
