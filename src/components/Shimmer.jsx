import React from "react";


const ShimmerCard = () => {
    return (
        <div className="shimmer-card">
            <div className="shimmer-image"></div>
            <div className="shimmer-title"></div>
            <div className="shimmer-tags"></div>
            <div className="shimmer-details"></div>
        </div>
    );
};



const Shimmer = () => {
    return (
        <div className="restaurant-list">
            {Array(10).fill("").map((_,index)=>(
                <ShimmerCard key={index} />
            ))}
        </div>
    );
};

export default Shimmer;