import React from "react";
//import DropdownOptions from "./../../route-view.style";

const WaypointsDropdown = ({ route }) => {
    
    const points = route.waypoints;
    
    return (
        <div>
            <h3>Puntos de la ruta</h3>
            {points.map((point, index) => {
                return (
                    <p>Punto</p>
                );
            })}
        </div>
    );
};

export default WaypointsDropdown;