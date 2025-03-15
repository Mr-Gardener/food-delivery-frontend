import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Restaurants from './components/RestaurantList';
import Menu from './components/Menu';
import OrderCart from './components/OrderCart';
import OrderConfirmation from './components/OrderConfirmation';



function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                    <Route path="/restaurants" element={<Restaurants />} />
                    <Route path="/menu/:id" element={<Menu />} />
                    <Route path="/order-cart" element={<OrderCart />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
