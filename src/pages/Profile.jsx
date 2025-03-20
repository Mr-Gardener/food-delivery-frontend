import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/Api';

function Profile() {
    const [user, setUser] = useState({ name: '', email: '' });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <h2 className="text-center mb-4">Profile</h2>
                    <form className="card p-3 shadow">
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
                        <button type="button" className="btn btn-primary w-100" onClick={handleUpdate}>
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>

            <h3 className="mt-4 text-center">Order History</h3>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                    {orders.length === 0 ? (
                        <p className="text-center">No previous orders found.</p>
                    ) : (
                        <div className="list-group overflow-auto" style={{ maxHeight: '300px' }}>
                            {orders.map((order) => (
                                <div key={order._id} className="list-group-item">
                                    <strong>Order ID:</strong> {order._id} <br />
                                    <strong>Dishes:</strong> {order.items.map(item => item.name).join(', ')} <br />
                                    <strong>Total Price:</strong> ${order.totalPrice} <br />
                                    <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Logout button */}
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-danger w-50" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;
