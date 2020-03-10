import React, { Component } from 'react';
import data from '@solid/query-ldflex';
import { namedNode } from '@rdfjs/data-model';
import { MyRoutesPageContent } from './myRoutes.component';
import { successToaster, errorToaster } from '@utils';

/**
 * Container component for the My Routes Page, fetches routes from a POD
 */
export const MyRoutesContainer = props => {
  const routes = [
    {
      name: "Mi Ruta 1",
      points: [
        { lat: -36.397, lng: 160.644 },
        { lat: -35.297, lng: 149.644 },
        { lat: -34.297, lng: 132.644 },
        { lat: -28.397, lng: 147.644 },
        { lat: -34.197, lng: 146.644 }
      ]
    },
    {
      name: "Mi Ruta 2",
      points: [
        { lat: -24.397, lng: 130.644 },
        { lat: -55.297, lng: 149.644 },
        { lat: -28.297, lng: 128.644 },
        { lat: -23.397, lng: 127.644 },
        { lat: -14.197, lng: 140.644 }
      ]
    }
  ];

  return (
    <MyRoutesPageContent {... { routes }} />
  );
}
