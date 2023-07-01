
import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Product } from '../types'
import ProductCard from './ProductCard';

export default function ProductsContainer() {
    const queryClient = useQueryClient();
    const token = queryClient.getQueryData<string>(['token']);

    const { isLoading, isError, data, error, refetch } = useQuery<Product[]>(['products'], (): Promise<Product[]> =>
        axios
            .get('http://localhost:8000/api/products/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data)
    );

    const addToCartMutation = useMutation((productId: number) => {
        return axios.post('http://localhost:8000/api/cart/items/', { product_id: productId, quantity: 1 }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    }
    );

    const handleAddToCart = (productId: number) => {
        addToCartMutation.mutate(productId);
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
        <>
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {data?.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={() => handleAddToCart(product.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
};
