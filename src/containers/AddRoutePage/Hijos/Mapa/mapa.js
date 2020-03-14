import * as React from 'react';
// import { NavBar } from "@components";
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker
} from 'react-google-maps'
import InfoCoordinates from '../InfoCoordinates/info-coordinates.component'

export class Mapa extends React.Component {
    
  route = {name: "",
           description: "",
           points: []
          };

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onInfoCoordinatesClose=() => {
    this.state.showingInfoWindow = false;
  }

  onMapClicked = (lat, lng) => {
  if (this.state.showingInfoWindow) {
    this.marker.lng = lng;
    this.marker.lat = lat;
    this.setState({
      showingInfoWindow: true,
      activeMarker: this.marker
      })
    }
    }

    render() {
      return (
      <GoogleMap
        onClick={this.onMapClicked(GoogleMap.lat,GoogleMap.lng)}
        defaultZoom={7}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        options={{ streetViewControl: false }}
        mapTypeId={'terrain'}>

        <InfoCoordinates
          visible={this.state.showingInfoWindow}
          route={this.route}
          state={this.state}
          onClose={this.onInfoCoordinatesClose()}
         >
          </InfoCoordinates>
      </GoogleMap>
      );
    }
}
  
  export default withScriptjs(withGoogleMap(Mapa));
  