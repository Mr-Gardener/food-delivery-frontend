import Restaurants from "../components/RestaurantList";

function Home() {
    return (
        <div className="text-center">
            <h1>Welcome to the Food Delivery App</h1>
            <p>Discover and order from your favorite restaurants!</p>
            <Restaurants />
        </div>
    );
}

export default Home;