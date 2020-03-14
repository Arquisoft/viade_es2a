import React from 'react';
import { Link } from 'react-router-dom';


const InfoCoordinates = ({route}, {webId},{marker}) => {
 
  return (
    <div>
                <h1>{this.state.selectedPlace.name}</h1>
                <p>¿Quiere añadir este punto a la ruta?</p>
                <input name="isPointAdded"
                      type="checkbox"
                      checked="true"
                      onChange={this.handleIsPointAdded}></input>
              </div>
  );
};


export default InfoCoordinates;
