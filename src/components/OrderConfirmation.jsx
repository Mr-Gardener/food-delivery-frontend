// frontend/src/components/OrderConfirmation.jsx

import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderDetails = location.state?.order;

    if (!orderDetails) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning text-center">No order details found.</div>
                <Button onClick={() => navigate('/')} variant="primary">Back to Home</Button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center">Order Confirmation</h1>
            <Card>
                <Card.Body>
                    <h3>Thank you for your order!</h3>
                    <p>Your order ID: {orderDetails._id}</p>
                    <h4>Order Summary:</h4>
                    <ul>
                        {orderDetails.items?.length > 0 ? (
                            orderDetails.items.map((item, index) => (
                                <li key={index}>
                                    {item.quantity} x {item.item} - ${item.price ? item.price.toFixed(2) : '0.00'}
                                </li>
                            ))
                        ) : (
                            <li>No items found in the order.</li>
                        )}
                    </ul>

                    <h4>Total Price: ${orderDetails.totalPrice ? orderDetails.totalPrice.toFixed(2) : '0.00'}</h4>
                    <Button onClick={() => navigate('/profile')} variant="success">View Order History</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default OrderConfirmation;

// 🚀 Order confirmation page is ready! Let me know if you want any changes! 🎯
