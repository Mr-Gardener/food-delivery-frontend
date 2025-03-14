import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
    const token = localStorage.getItem('token');
    
    // If token exists, render the element; otherwise, redirect to login
    return token ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;