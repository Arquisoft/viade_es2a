import React, { Component } from 'react';
// import {} from '@solid/query-ldflex';
// import { namedNode } from '@rdfjs/data-model';
import { FriendsPageContent } from './friends.component';
// import { successToaster, errorToaster } from '@utils';
// import { foaf } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';

const $rdf = require('rdflib');
// const store = new $rdf.graph();
// const fetcher = new $rdf.Fetcher(store);
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
// const data = require('@solid/query-ldflex');

export class FriendsComponent extends Component<Props> {
      constructor(props) {
        super(props);

        this.state = {
          friends: null
        };
      }

      componentDidMount() {
        this.getAmigos();
      }
    
      componentDidUpdate(prevProps) {
        
      }

      getAmigos = async () => {
        /*
        INTENTO A
        ----------------------------------------------------------------------------
        const webId = this.props;
        const me = store.sym(webId);
        let names;
        fetcher.load(me.doc).then(() => { names = store.each(me, FOAF('friend'))});
        names.forEach((name) => { console.log(name) });
        -----------------------------------------------------------------------------
        INTENTO B
        -----------------------------------------------------------------------------
        let names = solid.data.user.friends;
        -----------------------------------------------------------------------------
        INTENTO C
        -----------------------------------------------------------------------------
        const webId = this.props;
        const me = data[webId];
        let names = me.friends;
        console.log(webId);
        console.log(names);
        console.log(names.firstName);
        console.log("AQUI ESTAS");
        for await (const name of names)
          console.log({name} + " is a friend");
        */
        const webId = this.props.webId;
        const doc =  await fetchDocument(webId);
        const me = doc.getSubject(webId);
        const myFriends = me.getAllRefs(FOAF.knows);
        this.setState( {friends: myFriends} );
      }
      
      render() {
        //const friendChosen = this.state;
        //const amigos = this.getFriends();
        
        const amigos = this.state.friends;
        const webId = this.props.webId;

        /*
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
        */
        return (
          <FriendsPageContent {...{ webId, amigos }} />
        );
      }
}