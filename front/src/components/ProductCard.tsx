import { Card, CardContent, CardActions, Typography, Button, TextField } from '@mui/material';
import { Product, Item } from '../types'
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';

interface ProductCardProps {
    product: Product;
    item: Item | undefined;
    addToCart: (productId: number) => void;
    increaseQuantity: (item: Item) => void;
    decreaseQuantity: (item: Item) => void;
}

export default function ProductCard({ product, item, addToCart, increaseQuantity, decreaseQuantity }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product.id);
    };

    const handleIncrease = () => {
        increaseQuantity(item || { 'id': 0, 'product_id': 0, 'quantity': 0 });
    };

    const handleDecrease = () => {
        decreaseQuantity(item || { 'id': 0, 'product_id': 0, 'quantity': 0 });
    };

    return (
        <Card key={product.id} style={{ width: '210px', height: '350px', margin: '1rem' }}>
            <img src={product.image_url} alt={product.name} style={{ height: 200, objectFit: 'cover' }} />
            <CardContent>
                <Typography id={`ProductCard-${product.id}-product-name`} variant="h6" component="div">
                    {product.name}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: product.price_full ? 'space-evenly' : 'center', width: '100%' }}>
                    <Typography id={`ProductCard-${product.id}-product-price`} variant="body1">
                        ${product.price}
                    </Typography>
                    {product.price_full &&
                        <s>
                            <Typography id={`ProductCard-${product.id}-product-price-full`} variant="body1" color="text.secondary">
                                ${product.price_full}
                            </Typography>
                        </s>
                    }
                </div>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
                {item ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            id={`ProductCard-${product.id}-minusButton`}
                            variant="outlined"
                            color="primary"
                            style={{
                                borderTopLeftRadius: '25px',
                                borderBottomLeftRadius: '25px',
                                height: '36px', // Set the height to match the TextField
                            }}
                            onClick={handleDecrease}
                        // disabled={item.quantity === 1}
                        >
                            -
                        </Button>
                        <TextField
                            id={`ProductCard-${product.id}-quantity`}
                            variant="outlined"
                            color="primary"
                            disabled={true}
                            inputProps={{
                                readOnly: true,
                                style: {
                                    borderRadius: 0,
                                    flex: 1,
                                    height: '20px',
                                    padding: '8px',
                                    textAlign: 'center',
                                },
                            }}
                            value={item.quantity}
                        />
                        <Button
                            id={`ProductCard-${product.id}-plusButton`}
                            variant="outlined"
                            color="primary"
                            style={{
                                borderTopRightRadius: '25px',
                                borderBottomRightRadius: '25px',
                                height: '36px',
                            }}
                            onClick={handleIncrease}
                        >
                            +
                        </Button>
                    </div>
                ) : (
                    <Button
                        id={`ProductCard-${product.id}-addButton`}
                        variant="outlined"
                        color="primary"
                        onClick={handleAddToCart}
                        style={{
                            borderTopLeftRadius: '25px',
                            borderBottomLeftRadius: '25px',
                            borderTopRightRadius: '25px',
                            borderBottomRightRadius: '25px',
                            width: '210px',
                        }}
                    >
                        Add to cart
                    </Button>
                )}
            </CardActions>
        </Card>
    )
};
