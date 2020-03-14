import React from 'react';
import {
  Marker
} from 'react-google-maps'

export class InfoCoordinates extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <div>
                <h1></h1>
                <p>¿Quiere añadir este punto a la ruta?</p>
                <input name="isPointAdded"
                      type="checkbox"
                      checked="true"
                      onChange={this.handleIsPointAdded}></input>
              </div>
    );
  }
}

export default InfoCoordinates;
