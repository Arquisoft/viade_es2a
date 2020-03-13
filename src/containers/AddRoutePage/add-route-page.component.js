import React  from 'react';
import CamposRuta from './Hijos/Campos/camposNuevaRuta';
import { AddRouteHolder, MapHolder } from './add-route-page.style';
import Mapa from './Hijos/Mapa/mapa'




const AddRoutePage = () => {
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`
 //const puntos=[{ lat: -34.397, lng: 150.644 },{ lat: -35.397, lng: 150.644 }];
return (
  <AddRouteHolder>
    <CamposRuta/>
    <Mapa //{... {puntos}}
        googleMapURL={googleMapURL}
        loadingElement={<p>Cargando</p>}
        containerElement={<MapHolder />}
        mapElement={<MapHolder />}
      />
  </AddRouteHolder>
        
);
};

export default AddRoutePage;
