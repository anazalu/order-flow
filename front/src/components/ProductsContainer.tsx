
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
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
            .get("http://localhost:8000/products/")
            .then((res) => res.data.products)
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
        <>
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {data?.map((product) => (
                        <ProductCard key={product.product_id} product={product} />
                    ))}
                </div>
            </div>
        </>
    )
};
