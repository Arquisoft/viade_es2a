import React from 'react';
import { RouteMapPageContent } from '../../components/RouteMap/route-map.component';

/**
 * Container component for the Feed Page, fetches routes from a POD
 */
export const FeedContainer = props => {
  const routes = [
    {
      id: "16c67714-f386-4832-93da-5fb7b8ffce13",
      name: "Ruta 1",
      author: "patata",
      date: Date.now(),
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
      date: Date.now(),
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
    <RouteMapPageContent {... { routes }} />
  );
}