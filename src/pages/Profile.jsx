import { useState, useEffect } from 'react';
import api from '../Services/Api';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState({ name: '', email: '' });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch user profile and order history
        Promise.all([
            api.get('/users/profile'),
            api.get('/orders/history')
        ])
        .then(([profileRes, ordersRes]) => {
            setUser(profileRes.data);
            setOrders(ordersRes.data);
            setLoading(false);
        })
        .catch(() => {
            setError('Failed to load profile or order history');
            setLoading(false);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        api.put('/users/profile', user)
        .then(() => alert('Profile updated!'))
        .catch(() => alert('Failed to update profile'));
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token
        navigate('/login');  // Redirect to login
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container">
            <h2>Profile</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={user.name} 
                        onChange={handleChange} 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={user.email} 
                        onChange={handleChange} 
                        className="form-control"
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update Profile</button>
            </form>

            <h3 className="mt-4">Order History</h3>
            {orders.length === 0 ? (
                <p>No previous orders found.</p>
            ) : (
                <ul className="list-group">
                    {orders.map((order) => (
                        <li key={order._id} className="list-group-item">
                            <strong>Order ID:</strong> {order._id} <br />
                            <strong>Dishes:</strong> {order.items.map(item => item.name).join(', ')} <br />
                            <strong>Total Price:</strong> ${order.totalPrice} <br />
                            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}

             {/* Logout button */}
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
        </button>
        </div>
    );
}

export default Profile;