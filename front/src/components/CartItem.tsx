import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlined from '@mui/icons-material/RemoveCircleOutlineOutlined';
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
            {product?.image_url && <img src={product.image_url} alt={product.name} style={{ height: '2rem', marginRight: '1rem' }} />}
                {/* {product?.image_url && <img src='https://media.cnn.com/api/v1/images/stellar/prod/120604032828-fresh-ripe-bananas.jpg?q=x_0,y_106,h_2019,w_3590,c_crop/h_720,w_1280/f_webp' alt={product.name} style={{ height: '2rem', marginRight: '1rem' }} />} */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <Typography id={`CartItem-${product?.id}-name-quantity-subtotal`} variant="body2" color="text.secondary" style={{ fontSize: '1.0rem', marginLeft: '0.5rem' }}>
                        {product?.name} x {item?.quantity} = ${product && item ? (product.price * item.quantity).toFixed(2) : '?'}
                    </Typography>
                </div>
                <div>
                    <IconButton id={`CartItem-${product?.id}-decrease`} onClick={handleDecrease}>
                        <RemoveCircleOutlineOutlined />
                    </IconButton>
                    <IconButton id={`CartItem-${product?.id}-increase`} onClick={handleIncrease}>
                        <AddCircleOutlineOutlined />
                    </IconButton>
                    <IconButton id={`CartItem-${product?.id}-delete`} onClick={handleDelete}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
};
