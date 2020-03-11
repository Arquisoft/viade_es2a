import React, { Component } from 'react';
// import data from '@solid/query-ldflex';
// import { namedNode } from '@rdfjs/data-model';
import { FriendsPageContent } from './friends.component';
// import { successToaster, errorToaster } from '@utils';

export class FriendsComponent extends Component<Props> {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: false,
          hasFriends: false
        };
      }

      componentDidMount() {
        
      }
    
      componentDidUpdate(prevProps) {
        
      }

      render() {
        const amigos = [
          {
            name: "Labra",
            routes : [
              {
                name: "Ruta 1",
                author: "Labra",
                points: [
                  { lat: -34.397, lng: 150.644 },
                  { lat: -35.297, lng: 149.644 },
                  { lat: -34.297, lng: 148.644 },
                  { lat: -33.397, lng: 147.644 },
                  { lat: -34.197, lng: 146.644 }
                ]
              },
              {
                name: "Ruta 2",
                author: "Labra",
                points: [
                  { lat: -24.397, lng: 130.644 },
                  { lat: -25.297, lng: 129.644 },
                  { lat: -24.297, lng: 128.644 },
                  { lat: -23.397, lng: 127.644 },
                  { lat: -24.197, lng: 126.644 }
                ]
              }
            ]
          },
          {
            name: "Tim Berners Lee",
            routes: []
          },
          {
            name: "Benjarino",
            routes: [
              {
                id: "06c67714-3386-4832-93da-5fb7b8ffceca",
                name: "Ruta Preciosa",
                description: "De ejemplo",
                author: "Benjarino",
                date: "1583758530",
                points: [
                  { lat: -24.397, lng: 130.644, name: "Cascada", description: "Muy guapa" },
                  { lat: -28.297, lng: 129.644 },
                  { lat: -24.297, lng: 128.644 },
                  { lat: -26.397, lng: 127.644, name: "Lago" },
                  { lat: -21.197, lng: 126.644 }
                ]
              }
            ]
          }
        ];
        return (
          <FriendsPageContent {...{ amigos }} />
        );
      }
}