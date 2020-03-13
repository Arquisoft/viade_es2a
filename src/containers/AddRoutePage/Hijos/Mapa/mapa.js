import {React,Component} from 'react';
// import { NavBar } from "@components";
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker
} from 'react-google-maps'
import InfoCoordinates from '../InfoCoordinates/info-coordinates.component'

export class Mapa extends Component {
    
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMapClicked = (props) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: true,
      activeMarker: new Marker()
    })
    }
  };

    render() {
      return (
      <GoogleMap
        onClick={this.onMapClicked}
        defaultZoom={7}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        options={{ streetViewControl: false }}
        mapTypeId={'terrain'}>

        <InfoCoordinates
          onClose={this.onInfoCoordinatesClose}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          </InfoCoordinates>
      </GoogleMap>
      )
    }
  };
  
  export default withScriptjs(withGoogleMap(Mapa));
  