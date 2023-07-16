import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Product } from '../types'

interface ProductCardProps {
    product: Product;
    addToCart: (productId: number) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product.id);
    };

    return (
        <Card key={product.id} style={{ width: '210px', height: '350px', margin: '1rem' }}>
            <img src={product.image_url} alt={product.name} style={{ height: 200, objectFit: 'cover' }} />
            <CardContent>
                <Typography id={`ProductCard-${product.id}-product-name`} variant="h6" component="div">
                    {product.name}
                </Typography>
                <Typography id={`ProductCard-${product.id}-product-price`} variant="body2" color="text.secondary">
                    Price: ${product.price}
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
                <Button id={`ProductCard-${product.id}-button`} variant="outlined" color="primary" onClick={handleAddToCart}>
                    Add to cart
                </Button>
            </CardActions>
        </Card>
    )
};
