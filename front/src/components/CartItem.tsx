import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

interface Item {
    item_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
}

interface CartItemProps {
    item: Item;
    increaseQuantity: () => void;
    decreaseQuantity: () => void;
}

export default function CartItem({ item, increaseQuantity, decreaseQuantity }: CartItemProps) {
    const handleIncrease = () => {
        increaseQuantity();
    };

    const handleDecrease = () => {
        decreaseQuantity();
    };

    return (
        <Card style={{ marginBottom: '1rem' }}>
            {/* <img src={item.imageUrl} alt={item.name} style={{ height: 100, objectFit: 'cover' }} /> */}
            <img src='https://media.cnn.com/api/v1/images/stellar/prod/120604032828-fresh-ripe-bananas.jpg?q=x_0,y_106,h_2019,w_3590,c_crop/h_720,w_1280/f_webp' alt='alt' style={{ height: 200, objectFit: 'cover' }} />
            <CardContent>
                <Typography variant="h6" component="div">
                    {item.item_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Product ID: {item.product_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                </Typography>
                <Button variant="outlined" onClick={handleDecrease} disabled={item.quantity === 1}>
                    -
                </Button>
                <Button variant="outlined" onClick={handleIncrease}>
                    +
                </Button>
            </CardContent>
        </Card>
    );
};
