import { IMG_CDN_URL } from "../config";
import { Link } from "react-router-dom"; // Ensure you import Link from react-router-dom

const RestaurantCard = ({ restaurant }) => {
    const { name, cuisines, cloudinaryImageId, avgRating, sla, areaName, costForTwo } = restaurant.info;
    
    return (
            <div className="card">
                <div className="card-image">
                    <img src={IMG_CDN_URL + cloudinaryImageId} alt={name} />
                    {restaurant.info.aggregatedDiscountInfoV3 && (
                        <div className="offer-badge">
                            <span>{restaurant.info.aggregatedDiscountInfoV3.header}</span>
                        </div>
                    )}
                    {restaurant.info.veg && (
                        <div className="veg-badge">
                            <span>Pure Veg</span>
                        </div>
                    )}
                </div>
                <div className="card-content">
                    <h2 className="restaurant-name">{name}</h2>
                    <div className="rating-time">
                        <div className="rating">
                            <i className="fa-solid fa-star"></i>
                            <span>{avgRating}</span>
                        </div>
                        <div className="dot-separator">•</div>
                        <div className="delivery-time">{sla.slaString}</div>
                    </div>
                    <div className="cuisines">{cuisines.join(", ")}</div>
                    <div className="location-cost">
                        <div className="location">{areaName}</div>
                        <div className="dot-separator">•</div>
                        <div className="cost">{costForTwo}</div>
                    </div>
                </div>
            </div>
        
    );
};

export default RestaurantCard;