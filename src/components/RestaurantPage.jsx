import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../config";
import Shimmer from "./Shimmer";

const RestaurantPage = () => {
    const { id } = useParams();
    const [restaurantMenu, setRestaurantMenu] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRestaurantInfo();
    }, []);

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
        finally{
         setisLoading(false);
        }
    }

    if (error) {
        return (
            <div className="error-container p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">Oops!!</h1>
                <h2 className="text-xl mt-4">Something went wrong!!</h2>
                <h3 className="mt-2 text-gray-600">{error}</h3>
            </div>
        );
    }

    return (
        <>
        {isLoading ? 
        
        (<Shimmer />) 
        
        :(

            <div className="restaurant-page bg-white min-h-screen p-4 md:p-8">
                <h2 className="text-2xl font-bold text-center mb-8">Menu</h2>
                <div className="menu-items-container max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {restaurantMenu && restaurantMenu.length > 0 ? (
                            restaurantMenu.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg hover:shadow-md hover:border hover:border-gray-200 transition-opacity duration-200 overflow-hidden"
                                >
                                    <div className="relative">
                                        {item.imageId && (
                                            <img
                                                src={`${IMG_CDN_URL}${item.imageId}`}
                                                alt={item.name}
                                                className="w-full h-48 object-cover"
                                            />
                                        )}
                                        {item.ratings?.aggregatedRating && (
                                            <div className="absolute top-4 right-4 flex items-center bg-green-600 px-2 py-1 rounded text-white">
                                                <span className="text-xs font-medium">
                                                    ★ {item.ratings.aggregatedRating.rating}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold leading-tight mb-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            {item.description || "No description available"}
                                        </p>
                                        {/* Cuisine tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {item.itemAttribute?.vegClassifier && (
                                                <span className={`text-xs px-2 py-1 text-white rounded-full ${
                                                    item.itemAttribute.vegClassifier === "VEG" 
                                                        ? "bg-green-500" 
                                                        : "bg-red-500"
                                                }`}>
                                                    {item.itemAttribute.vegClassifier}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Footer section with price and add button */}
                                        <div className="flex justify-between items-center mt-auto pt-2">
                                            <span className="font-semibold text-gray-800">₹{item.price / 100}</span>
                                            <button
                                                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors duration-200"
                                                onClick={() => alert(`Added ${item.name} to cart!`)}
                                            >
                                                ADD
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-3">
                                No menu items available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        )}
   </>
  );
};

export default RestaurantPage;