
import axios from 'axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import { Product } from '../types'
import ProductCard from './ProductCard';

interface ProductsContainerProps {
    products: Product[] | undefined;
}

export default function ProductsContainer({ products }: ProductsContainerProps) {
    const queryClient = useQueryClient();
    const token = queryClient.getQueryData<string>(['token']);

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

    return (
        <>
            <div>
                <br />
                {/* <Typography variant="h5" gutterBottom>
                    Product Selection
                </Typography> */}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {products?.map((product) => (
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
