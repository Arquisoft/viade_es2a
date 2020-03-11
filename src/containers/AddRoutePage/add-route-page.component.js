import React  from 'react';
import CamposRuta from './Hijos/Campos/camposNuevaRuta';
import { AddRouteHolder } from './add-route-page.style';
import Mapa from './Hijos/Mapa/mapa'

import {GoogleMap} from 'react-google-maps';



const AddRoutePage = () => {


return (
  <AddRouteHolder>
    <CamposRuta/>
    <GoogleMap
       
       defaultZoom={7}
       defaultCenter={{ lat: -34.397, lng: 150.644 }}
       options={{ streetViewControl: false }}
       mapTypeId={'terrain'}>
         
</GoogleMap>
  </AddRouteHolder>
        
);
};

export default AddRoutePage;
