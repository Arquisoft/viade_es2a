import React, { Component } from 'react';
import data from '@solid/query-ldflex';
import { namedNode } from '@rdfjs/data-model';
import { FeedPageContent } from './feed.component';
import { successToaster, errorToaster } from '@utils';

/**
 * Container component for the Feed Page, fetches routes from a POD
 */
const FeedContainer = props => {
  const routes = [
    {
      name: "Ruta 1",
      author: "patata",
      points: [
        { lat: -34.397, lng: 150.644 },
        { lat: -35.297, lng: 149.644 },
        { lat: -34.297, lng: 148.644 },
        { lat: -33.397, lng: 147.644 },
        { lat: -34.197, lng: 146.644 }
      ]
    },
    {
      id: "06c67714-3386-4832-93da-5fb7b8ffceca",
      name: "Ruta 2",
      description: "De ejemplo",
      author: "labra",
      date: "1583758530",
      points: [
        { lat: -24.397, lng: 130.644, name: "Cascada", description: "Muy guapa" },
        { lat: -25.297, lng: 129.644 },
        { lat: -24.297, lng: 128.644 },
        { lat: -23.397, lng: 127.644, name: "Lago" },
        { lat: -24.197, lng: 126.644 }
      ]
    }
  ];

  return (
    <FeedPageContent {... { routes }} />
  );
}

export default FeedContainer;