import React, { Component, useState } from 'react';
import data from '@solid/query-ldflex';
import { namedNode } from '@rdfjs/data-model';
import { MyRoutesPageContent } from './myRoutes.component';
import { successToaster, errorToaster } from '@utils';
import { wait } from 'react-testing-library';

/**
 * Container component for the My Routes Page, fetches routes from a POD
 */
export class MyRoutesContainer extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      routes: []
    };
  }

  componentDidMount() {
    const { webId } = this.props;
    if (webId) this.fetchRoutes();
  }

  componentDidUpdate(prevProps) {
    const { webId } = this.props;
    if (webId && webId !== prevProps.webId) this.fetchRoutes();
  }

  fetchRoutes = async () => {
    this.setState({ isLoading: true });

    const { webId } = this.props;

    const root = webId.replace("/profile/card#me", "");
    const FileClient = require("solid-file-client");
    const solidAuth = require("solid-auth-cli");
    const fileClient = new FileClient(solidAuth);
    const routesPath = `${root}/private/routes`;

    var folder = await fileClient.readFolder(routesPath);
    const output = [];

    Promise.all(folder.files.map(e => fileClient.readFile(e.url))).then(values => {
      var routes = values.map(v => { try { return JSON.parse(v) } catch (err) { return undefined } }).filter(x => x)
      console.log(routes)
      this.setState({ routes: routes, isLoading: true });
    })
    /*await folder.files.forEach(async element => {
      var route = await fileClient.readFile(element.url);
      output.push(JSON.parse(route))
    });*/


  }
  //const routes = [];

  /*async function readAllRoutes(array) {
    const root = webId.replace("/profile/card#me", "");
    const FC = require("solid-file-client");
    const auth = require("solid-auth-cli");
    const fileClient = new FC(auth);
    const path = `${root}/private/routes`;
    var folder = await fileClient.readFolder(path);
    var files = folder.files;
    files.forEach(element => {
      var filePath = element.url;
      readAFileFrom(filePath, array);
    });
  }
  
  async function readAFileFrom(path, array) {
    const FC = require("solid-file-client");
    const auth = require("solid-auth-cli");
    const fileClient = new FC(auth);
    console.log(`read from ${path}`);
    await fileClient.readFile(path).then(route => {
      console.log(route); //log de la file de la ruta
      array.push(route)
      console.log("lista tras añadir");
      console.log(routes); //log de la lista despues de añadir, tiene un output extraño, como si lo guardase en un string
      //y si intento hacer JSON.parse(route) casca la aplicación
    });
  
  }*/



  /*readAllRoutes(routes);
  console.log("rutas")
  console.log(routes)*/

  render() {
    const { routes } = this.state;

    return (
      <MyRoutesPageContent {... { routes }} />
    )
  }
}
