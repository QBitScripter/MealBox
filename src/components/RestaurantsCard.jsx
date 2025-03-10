import { IMG_CDN_URL } from "../config";



const RestaurantCard = ({ restaurant }) => {
    const { name, cuisines, cloudinaryImageId, avgRating, sla, areaName, costForTwo } = restaurant.info;
    
    return (
        <div className="card">
            <img src={IMG_CDN_URL + cloudinaryImageId} alt={name} />
            <h2>{name}</h2>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{areaName}</h4>
            <span>
                <h4>
                    <i className="fa-solid fa-star"></i>
                    {avgRating}
                </h4>
                <h4>{sla.lastMileTravelString}</h4>
                <h4>{costForTwo}</h4>
            </span>
        </div>
    );
};

export default RestaurantCard;