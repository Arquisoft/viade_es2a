import React, { Component } from 'react';
import { CenterContainer } from '@util-components';
import {CamposHolder} from './camposNuevaRuta.style'

const CamposRuta = () =>{

    return <CamposHolder>
        <label>Nombre</label>
        <input type="text"></input>
        <label>Descripcion</label>
        <input type="text"></input>

        <button type="submit">Crear</button>



    </CamposHolder>

}

export default CamposRuta;