import { useState, useEffect } from "react";

const GetLocation = () => {
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [permissionStatus, setPermissionStatus] = useState("prompt");

    
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinates({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                console.warn("Error fetching location: ", error.message);
            },
            {
                enableHighAccuracy : true,
                timeout : 5000,
                maximumAge: 0
            }
            
        );
    

    return coordinates;
};

export default GetLocation;