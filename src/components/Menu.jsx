import { useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../Services/Api';
import 'bootstrap/dist/css/bootstrap.min.css';

function Menu() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = api.get(`/restaurants/${id}`);
                setRestaurant(response.data);
                setMenu(response.data.menu);
            } catch (error) {
                console.error('Failed to fetch menu:', error);
            }
        };

        fetchMenu();
    }, [id]);

    // Function to handle adding items to the order
    const addToOrder = (item) => {
        const updatedOrder = [...order, item];
        setOrder(updatedOrder);
        navigate('/order-cart', { state: { order: updatedOrder } });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-3">{restaurant.name} Menu</h1>
            <p className="text-center text-muted">{restaurant.cuisine} Cuisine</p>

            {menu.length === 0 ? (
                <div className="alert alert-info text-center">No menu items available.</div>
            ) : (
                <div className="row">
                    {menu.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img 
                                    src={item.image || 'https://via.placeholder.com/400x300.png?text=No+Image'} 
                                    alt={item.item} 
                                    className="card-img-top img-fluid" 
                                    style={{ 
                                        width: '100%', 
                                        height: 'auto', 
                                        objectFit: 'cover', 
                                        borderRadius: '6px' 
                                      }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{item.item}</h5>
                                    <p className="card-text">{item.description || "No description available"}</p>
                                    <h6 className="text-success mb-3">${item.price}</h6>
                                    <button 
                                        className="btn btn-primary d-flex align-items-center gap-2 bg-dark" 
                                        style={{
                                            // backgroundColor: '#FF5722', 
                                            // borderColor: '#FF5722', 
                                            borderRadius: '8px', 
                                            padding: '10px 16px', 
                                            fontWeight: 'bold',
                                            transition: '0.3s ease',
                                                }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#E64A19'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#FF5722'}
                                        onClick={() => addToOrder(item)}
                                    >
                                        <i className="bi bi-cart-plus"></i> Add to Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Menu;
