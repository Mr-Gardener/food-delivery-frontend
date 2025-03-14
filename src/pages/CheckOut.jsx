import { useState } from 'react';
import axios from 'axios';

export function CheckoutPage() {
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const cartItems = [
        { id: 1, item: 'Pepperoni Pizza', price: 12, quantity: 2 },
        { id: 2, item: 'Margherita Pizza', price: 10, quantity: 1 }
    ];
    
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/orders', {
                items: cartItems,
                total: totalPrice,
                address,
                paymentMethod
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('Checkout failed. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h1>Checkout</h1>
            <div className="mb-3">
                <label className="form-label">Delivery Address</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select 
                    className="form-select" 
                    value={paymentMethod} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="Card">Card</option>
                    <option value="Cash">Cash on Delivery</option>
                </select>
            </div>
            <h3>Total: ${totalPrice}</h3>
            <button className="btn btn-primary" onClick={handleCheckout}>Place Order</button>
        </div>
    );
}