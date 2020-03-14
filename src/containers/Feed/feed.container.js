import React, { useEffect, useState } from 'react';
import { foaf } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import { storageHelper } from '@utils';
import { RouteMapPageContent } from '@components';

const testRoutes = [
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
  },
  {
    id: "46c67714-f386-4832-93da-5fb7b8ffce42",
    name: "Ruta 4",
    author: "Jesus Perez",
    description: "Ruta peligrosa",
    date: Date.now(),
    images: [
      { img: "https://www.ruta0.com/pix/una-ruta.jpg" },
      { img: "https://fotografias.lasexta.com/clipping/cmsimages02/2017/01/22/E40D121E-FDA0-4F6D-901C-A40A2B772762/58.jpg" }
    ],
    points: [
      { lat: -34.397, lng: 150.644, alt: 50, name: "Castillo", description: "Imponente", img: "https://ep01.epimg.net/elpais/imagenes/2018/12/03/gente/1543839794_912812_1543840598_noticia_normal.jpg" },
      { lat: -35.297, lng: 149.644, alt: 100, name: "Restaurante", description: "El Lupa" },
      { lat: -34.297, lng: 148.644, name: "Universidad" },
      { lat: -34.197, lng: 146.644, description: "Fin de la ruta" }
    ],
    comments: [
      { content: "Comentario 1", author: "Labra", idAuthor: "1" },
      { content: "Comentario 2", author: "Jesus", idAuthor: "2" },
      { content: "Comentario 3", author: "Marcos", idAuthor: "3" }
    ]
  }
];

/**
 * Container component for the Feed Page, fetches routes from a POD
 */
export const FeedContainer = props => {

  const { webId } = props;
  var friends = [];
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const FileClient = require("solid-file-client");
  const solidAuth = require("solid-auth-cli");
  const fileClient = new FileClient(solidAuth)

  useEffect(() => {
    getAmigos();
    getRoutes();
  }, [])

  const getAmigos = async () => {



    const doc = await fetchDocument(webId);
    const me = doc.getSubject(webId);
    const myFriends = me.getAllRefs(foaf.knows);
    friends = myFriends
    friends.map(async friend => {

      setIsLoading(true)

      const path = friend.replace('/profile/card#me', '/public/routes');

      var folder = await fileClient.readFolder(path);

      Promise.all(folder.files.map(e => fileClient.readFile(e.url))).then(values => {
        var routes = values.map(v => { try { return JSON.parse(v) } catch (err) { return undefined } }).filter(x => x)
        setRoutes(routes);
      }).finally(() => setIsLoading(false))

    })
  }

  const getRoutes = () => {


  }

  return (
    <RouteMapPageContent isLoading={isLoading} routes={routes} />
  );
}