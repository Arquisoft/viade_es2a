import * as React from 'react';
import {CamposHolder} from './camposNuevaRuta.style'
import { storageHelper } from '@utils';

class CamposRuta extends React.Component {

    constructor({webId},{route}) {
        super();
        route = route;
        webId= webId;
    }

    state = {
        name: "",
        description: ""
      };

   handleInputChange = event => {
        const target = event.target;
        const value = target.name === 'name' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = event => {
        // Guardar ruta
        this.route.name = event.target.name;
        this.route.description = event.target.description;

        storageHelper.saveRoute(this.webId, this.route);
    }

    render() {
        return (

        <CamposHolder>
            <form onSubmit={this.handleSubmit}>
                <label>Nombre:</label>
                <input type="text" name="name"
                value={this.state.name}
                onChange={this.handleInputChange}></input>
                <label>Descripcion:</label>
                <input type="text" name="description"
                value={this.state.description}
                onChange={this.handleInputChange}></input>

                <button type="submit" value="Submit">Crear</button>
            </form>
        </CamposHolder>);
    }
}

export default CamposRuta;