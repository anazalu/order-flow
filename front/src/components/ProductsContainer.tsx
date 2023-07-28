
import axios from 'axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';
// import { Typography } from '@mui/material';
import { Item, Product } from '../types'
import ProductCard from './ProductCard';

interface ProductsContainerProps {
    products: Product[] | undefined;
    items: Item[] | undefined;
}

export default function ProductsContainer({ products, items }: ProductsContainerProps) {
    const queryClient = useQueryClient();
    const token = queryClient.getQueryData<string>(['token']);

    const addToCartMutation = useMutation((productId: number) => {
        return axios.post('http://localhost:8000/api/cart/items/', { product_id: productId, quantity: 1 }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((_) => queryClient.invalidateQueries(['cartItems']))
    });

    const updateCartItemMutation = useMutation((item: Item) => {
        return axios.put(`http://localhost:8000/api/cart/items/${item.id}/`, { product_id: item.product_id, quantity: item.quantity }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((_) => queryClient.invalidateQueries(['cartItems']))
    });

    const deleteCartItemMutation = useMutation((itemId: number) => {
        return axios.delete(`http://localhost:8000/api/cart/items/${itemId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((_) => queryClient.invalidateQueries(['cartItems']));
    });

    const handleAddToCart = (productId: number) => {
        addToCartMutation.mutate(productId);
    };

    const handleIncrease = (item: Item | undefined) => {
        if (item) {
            updateCartItemMutation.mutate({ id: item.id, product_id: item.product_id, quantity: item.quantity + 1 });
        }
    };

    const handleDecrease = (item: Item | undefined) => {
        if (item) {
            if (item.quantity > 1) {
                updateCartItemMutation.mutate({ id: item.id, product_id: item.product_id, quantity: item.quantity - 1 });
            } else {
                deleteCartItemMutation.mutate(item.id);
            }
        }
    };

    const findItemByProductId = (productId: number) => {
        return items?.find(element => element.product_id == productId);
    }

    return (
        <>
            <div id='products-container-div'>
                <br />
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {products?.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            item={findItemByProductId(product.id)}
                            addToCart={() => handleAddToCart(product.id)}
                            increaseQuantity={() => handleIncrease(findItemByProductId(product.id))}
                            decreaseQuantity={() => handleDecrease(findItemByProductId(product.id))}
                        />
                    ))}
                </div>
            </div>
        </>
    )
};
