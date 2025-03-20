import { useLocation, useNavigate } from 'react-router-dom';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

function OrderCart() {
    const location = useLocation();
    const navigate = useNavigate();
    const initialOrder = location.state?.order || [];
    const [order, setOrder] = useState(initialOrder);

    const updateQuantity = (index, delta) => {
        const updatedOrder = [...order];
        updatedOrder[index].quantity = (updatedOrder[index].quantity || 1) + delta;
        if (updatedOrder[index].quantity < 1) updatedOrder[index].quantity = 1;
        setOrder(updatedOrder);
    };

    const totalPrice = order.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    const API_BASE_URL = 'https://food-delivery-app-1-46ph.onrender.com';

    const placeOrder = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const userId = localStorage.getItem('userId');

            const orderPayload = { 
                user: userId, 
                items: order.map(item => ({
                    item: item.item,
                    quantity: item.quantity || 1,
                    price: item.price
                })),
                totalPrice: totalPrice
            };
            
            console.log('Sending order payload:', orderPayload);

            const response = await axios.post(`${API_BASE_URL}/api/orders`,
                orderPayload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            alert('Order placed successfully!');
            console.log(response.data);
            
            setOrder([]); // Clear cart on success
            navigate('/order-confirmation', { state: { order: response.data } }); // Navigate to confirmation page
        } catch (error) {
            console.error('Failed to place order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-3">Your Order</h1>
            {order.length === 0 ? (
                <div className="alert alert-info text-center">No items in your order.</div>
            ) : (
                <Card>
                    <ListGroup variant="flush">
                        {order.map((item, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{item.item}</h5>
                                    <p>{item.description || 'No description available'}</p>
                                    <span className="text-success">${item.price.toFixed(2)}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(index, -1)}>-</Button>
                                    <span className="mx-2">{item.quantity || 1}</span>
                                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(index, 1)}>+</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Card.Footer className="text-center">
                        <h4>Total: ${totalPrice.toFixed(2)}</h4>
                        <Button variant="success" className="mt-3" onClick={placeOrder}>Place Order</Button>
                    </Card.Footer>
                </Card>
            )}
        </div>
    );
}

export default OrderCart;