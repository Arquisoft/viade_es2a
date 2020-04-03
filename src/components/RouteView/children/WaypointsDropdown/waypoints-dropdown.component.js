import React from "react";
import { DropdownOptions } from "./waypoints-dropdown.style";

const WaypointsDropdown = ({ route }) => {
    
    const points = route.waypoints;
    
    return (
        <DropdownOptions>
            <h3>Puntos de la ruta</h3>
            {points.map((point, index) => {
                return (
                    <p>Punto</p>
                );
            })}
        </DropdownOptions>
    );
};

export default WaypointsDropdown;