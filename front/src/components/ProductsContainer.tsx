
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import ProductCard from "./ProductCard";

interface Product {
    product_id: number;
    product_name: string;
    price: number;
}

export default function ProductsContainer() {

    const { isLoading, isError, data, error, refetch } = useQuery<Product[]>(["products"], (): Promise<Product[]> =>
        axios
            .get("http://localhost:8000/api/products/")
            .then((res) => res.data.products)
    );

    const addToCartMutation = useMutation((productId: number) =>
        axios.post('http://localhost:8000/api/items', { product_id: productId, quantity: 1 })
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
            <p>{"An error has occurred: " + error?.message}</p>
        </>
    )

    // console.log(data)

    return (
        <>
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {data?.map((product) => (
                        <ProductCard
                            key={product.product_id}
                            product={product}
                            addToCart={() => handleAddToCart(product.product_id)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
};
