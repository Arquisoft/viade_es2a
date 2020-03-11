import React, { Component, useState } from 'react';
import data from '@solid/query-ldflex';
import { namedNode } from '@rdfjs/data-model';
import { MyRoutesPageContent } from './myRoutes.component';
import { successToaster, errorToaster } from '@utils';
import { wait } from 'react-testing-library';

/**
 * Container component for the My Routes Page, fetches routes from a POD
 */
export const MyRoutesContainer = props => {

  const {webId} =  props;
  const routes = [];

  async function readAllRoutes(array){
    const root = webId.replace("/profile/card#me", "");
    const FC = require("solid-file-client");
    const auth = require("solid-auth-cli");
    const fileClient = new FC(auth);
    const path = `${root}/private/routes`;
    var folder = await fileClient.readFolder(path);
    var files=folder.files;
    files.forEach(element => {
      var filePath = element.url;
      readAFileFrom(filePath,array);
    });
  }

  async function readAFileFrom(path, array){
    const FC = require("solid-file-client");
    const auth = require("solid-auth-cli");
    const fileClient = new FC(auth);
    console.log(`read from ${path}`);
    await fileClient.readFile(path).then(route =>{
      console.log(route); //log de la file de la ruta
    array.push(route)
    console.log("lista tras añadir");
    console.log(routes); //log de la lista despues de añadir, tiene un output extraño, como si lo guardase en un string
                          //y si intento hacer JSON.parse(route) casca la aplicación
  });
    
  }

  readAllRoutes(routes);
  console.log("rutas")
  console.log(routes)
  return (
    <MyRoutesPageContent {... { routes }} />
  );
}
