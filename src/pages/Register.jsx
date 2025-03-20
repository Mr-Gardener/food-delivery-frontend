import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/Api';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', { name, email, password });
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Register</button>
                    
                    <div className="text-center mt-3">
                        <p>
                            Already have an account? 
                            <button 
                                type="button" 
                                className="btn btn-link text-primary p-0" 
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;


