import { useEffect, useState, useMemo } from "react";
import api from "../Services/Api";
import { Link } from "react-router-dom";

function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await api.get("/restaurants");
                console.log("Fetched Restaurants from Backend:", response.data);

                // Debugging: Log each restaurant's image URL
            response.data.forEach((restaurant) => {
                console.log(`Image URL for ${restaurant.name}:`, restaurant.imageUrl);
            });
            
                setRestaurants(response.data);
            } catch (err) {
                console.error("Error fetching restaurants:", err.response?.data || err.message);
                setError("Failed to load restaurants. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    const filteredRestaurants = useMemo(() => {
        return restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, restaurants]);

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Restaurants</h2>

            {/* Search Bar */}
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search restaurants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Error Message */}
            {error && <p className="alert alert-danger text-center">{error}</p>}

            {/* Loading Skeleton */}
            {loading ? (
                <div className="text-center">Loading restaurants...</div>
            ) : (
                <div className="row">
                    {filteredRestaurants.map((restaurant) => (
                        <div key={restaurant._id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm">
                                <img
                                    src={`${process.env.VITE_BACKEND_URL}${restaurant.imageUrl}`}
                                    alt={restaurant.name}
                                    className="card-img-top"
                                    loading="lazy"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text text-muted">{restaurant.cuisine}</p>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="badge bg-success">{restaurant.rating} ⭐</span>
                                        <small className="text-muted">{restaurant.deliveryTime} mins</small>
                                    </div>

                                    <Link to={`/menu/${restaurant._id}`} className="btn btn-primary w-100 mt-3">
                                        View Menu
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Restaurants;
