import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Product, Item } from '../types'

interface CartItemProps {
    product: Product | undefined;
    item: Item | undefined;
    increaseQuantity: () => void;
    decreaseQuantity: () => void;
    deleteItem: () => void;
}

export default function CartItem({ product, item, increaseQuantity, decreaseQuantity, deleteItem }: CartItemProps) {
    const handleIncrease = () => {
        increaseQuantity();
    };

    const handleDecrease = () => {
        decreaseQuantity();
    };

    const handleDelete = () => {
        deleteItem();
    };

    return (
        <Card style={{ marginBottom: '0.1rem' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>            
            {product?.image_url && <img src={product?.image_url} alt={product.name} style={{ height: '2rem', marginRight: '1rem' }} />}
                {/* {product?.image_url && <img src='https://media.cnn.com/api/v1/images/stellar/prod/120604032828-fresh-ripe-bananas.jpg?q=x_0,y_106,h_2019,w_3590,c_crop/h_720,w_1280/f_webp' alt={product.name} style={{ height: '2rem', marginRight: '1rem' }} />} */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: '1.0rem', marginLeft: '0.5rem' }}>
                        {product?.name} x {item?.quantity} = ${product && item ? (product.price * item.quantity).toFixed(2) : '?'}
                    </Typography>
                </div>
                <div>
                    <Button variant="outlined" onClick={handleDecrease} disabled={item?.quantity === 1}>
                        <RemoveIcon />
                    </Button>
                    <Button variant="outlined" onClick={handleIncrease}>
                        <AddIcon />
                    </Button>
                    <IconButton color="error" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
};
