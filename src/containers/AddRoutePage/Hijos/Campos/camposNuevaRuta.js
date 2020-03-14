import React, { Component } from 'react';
import {CamposHolder} from './camposNuevaRuta.style'
import storageHelpers from '../../../../utils/storage'

const CamposRuta = ({webId}, route) =>{

   function handleInputChange(event){
        const target = event.target;
        const value = event.name === 'name' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    function handleSubmit(event){
        //Guardar ruta
        if(event.target.name === 'name'){
            route.name = event.target.name;
        }
        if( event.target.name === 'description'){
            route.description = event.target.description;
        }
        storageHelpers.saveRoute(webId, route);
    }

    return <CamposHolder>
    <form onSubmit={this.handleSubmit}>
        <label>Nombre</label>
        <input type="text" name='name'
        value={this.state.name}
        onChange={this.handleInputChange}></input>
        <label>Descripcion</label>
        <input type="text" name='description'
        value={this.state.name}
        onChange={this.handleInputChange}></input>

        <button type="submit">Crear</button>
</form>


    </CamposHolder>

}

export default CamposRuta;