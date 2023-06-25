import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

interface Product {
    product_id: number;
    product_name: string;
    price: number;
}

interface ProductCardProps {
    product: Product;
    addToCart: (productId: number) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product.product_id);
    };

    return (
        <Card key={product.product_id} style={{ margin: '1rem' }}>
            {/* <img src={product.imageUrl} alt={product.product_name} style={{ height: 200, objectFit: 'cover' }} /> */}
            <img src='https://media.cnn.com/api/v1/images/stellar/prod/120604032828-fresh-ripe-bananas.jpg?q=x_0,y_106,h_2019,w_3590,c_crop/h_720,w_1280/f_webp' alt={product.product_name} style={{ height: 200, objectFit: 'cover' }} />
            <CardContent>
                <Typography variant="h6" component="div">
                    {product.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={handleAddToCart}>
                    Add to cart
                </Button>
            </CardActions>
        </Card>
    )
};
