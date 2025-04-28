import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../config";

const RestaurantPage = () => {
    const { id } = useParams(); 
    const [restaurantMenu, setRestaurantMenu] = useState(null); 
    const [showFullDescription, setShowFullDescription] = useState(false);

                        
    const [error, setError] = useState(null); 

    useEffect(() => {
        getRestaurantInfo();
    }, []);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    async function getRestaurantInfo() {
        try {
            const response = await fetch(
                `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.6329395&lng=88.4510181&restaurantId=${id}&submitAction=ENTER`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch restaurant data");
            }
            const json = await response.json();

            // Traverse the nested structure to extract itemCards
            const groupedCards = json?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
            const allItems = [];

            groupedCards.forEach((group) => {
                const itemCards = group?.card?.card?.itemCards || [];
                itemCards.forEach((item) => {
                    const info = item?.card?.info;
                    if (info) {
                        allItems.push(info);
                    }
                });
            });

            setRestaurantMenu(allItems); 
        } catch (err) {
            setError(err.message);
        }
    }

    if (error) {
        return (
            <div>
                <h1>Oops!!</h1>
                <h2>Something went wrong!!</h2>
                <h3>{error}</h3> 
            </div>
        );
    }

    return (

<div className="restaurant-menu-cards p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6">Menu</h2>
            <div className="menu-items-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {restaurantMenu && restaurantMenu.length > 0 ? (
                    restaurantMenu.map((item) => (
                        <div
                            key={item.id}
                            className="menu-item bg-white shadow-md rounded-lg p-4 flex flex-col items-start hover:shadow-lg transition-shadow duration-300"
                        >
                            {item.imageId && (
                                <img
                                    src={`${IMG_CDN_URL}${item.imageId}`}
                                    alt={item.name}
                                    className="w-full h-32 object-cover rounded-md mb-3"
                                />
                            )}
                            <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                            <p className="text-gray-500 text-sm mb-2 truncate">
                                {item.description || "No description available"}
                            </p>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Price: ₹{item.price / 100}
                            </p>
                            {item.ratings?.aggregatedRating && (
                                <p className="text-xs text-gray-500 mb-3">
                                    Rating: {item.ratings.aggregatedRating.rating} (
                                    {item.ratings.aggregatedRating.ratingCount})
                                </p>
                            )}
                            <button
                                className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300"
                                onClick={() => alert(`Added ${item.name} to cart!`)}
                            >
                                Add
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No menu items available.</p>
                )}
            </div>
        </div>
    )
};

export default RestaurantPage;