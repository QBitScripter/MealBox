import restaurantsData from "../restaurants_data.json";
import RestaurantCard from "./RestaurantsCard";
import { useState, useEffect } from "react";
import "./shimmer.css"; // Make sure to create this CSS file

// Shimmer Card Component
const ShimmerCard = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-img"></div>
      <div className="shimmer-title"></div>
      <div className="shimmer-tags"></div>
      <div className="shimmer-details"></div>
    </div>
  );
};

// Shimmer UI Component with multiple cards
const Shimmer = () => {
  return (
    <div className="restaurant-list">
      {Array(10).fill("").map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </div>
  );
};

const Body = () => {
    const [searchTxt, setSearchTxt] = useState("");
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants() {
        try {
            setIsLoading(true);
            const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.6312888&lng=88.4432181&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            const json = await response.json();
            
            // Path to restaurants in Swiggy API
            const restaurantList = json?.data?.cards[2]?.card?.gridElements?.infoWithStyle?.restaurants;
            
            if (restaurantList && restaurantList.length > 0) {
                setAllRestaurants(restaurantList);
                setFilteredRestaurants(restaurantList);
            } else {
                // Fall back to local data if API returns empty or invalid data
                console.log("API data not found, using local data");
                setAllRestaurants(restaurantsData.restaurants);
                setFilteredRestaurants(restaurantsData.restaurants);
            }
        } catch (error) {
            console.error("Error fetching from Swiggy API:", error);
            // Fall back to local data on error
            console.log("API fetch error, using local data");
            setAllRestaurants(restaurantsData.restaurants);
            setFilteredRestaurants(restaurantsData.restaurants);
        } finally {
            setIsLoading(false);
        }
    }

    function handleSearch() {
        if (!searchTxt) {
            setFilteredRestaurants(allRestaurants);
            return;
        }
        
        const searchTextLower = searchTxt.toLowerCase();
        const filtered = allRestaurants.filter((restaurant) => 
            restaurant.info.name.toLowerCase().includes(searchTextLower)
        );
        
        setFilteredRestaurants(filtered);
    }

    return (
        <>
            <div className="search-container">
                <input  
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={searchTxt}
                    onChange={(e) => setSearchTxt(e.target.value)} 
                /> 
                <button 
                    className="search-btn"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            
            {isLoading ? (
                <Shimmer />
            ) : (
                <div className="restaurant-list">
                    {filteredRestaurants && filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => (
                            <RestaurantCard 
                                restaurant={restaurant} 
                                key={restaurant.info.id} 
                            />
                        ))
                    ) : (
                        <p>No restaurants found</p>
                    )}
                </div>
            )}
        </>
    );
};

export default Body;