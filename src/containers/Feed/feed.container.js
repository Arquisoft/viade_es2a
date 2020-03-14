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
    id: "46c67714-f386-4832-93da-111111111111",
    name: "Ruta por Asturias",
    author: "Alvaro Tango Fernandez",
    description: "Ruta por las tres ciudades asturianas Oviedo, Gijón y Avilés.",
    date: Date.now(),
    images: [
      { img: "https://www.turismoasturias.es/documents/11022/33922/plaza-catedral-oviedo.jpg/abeebe09-3f2f-4a0d-8d17-a45302d9cf77?t=1550072883584" },
      { img: "https://i.pinimg.com/originals/27/20/b4/2720b4a940c38880200705b8749d41c3.jpg" },
      { img: "https://www.turismoasturias.es/documents/11022/3572964/Panoramica+1_Sabugo_Portada.jpg/205128da-1a59-4e27-a994-a1ee94537dae?t=1538644927684" }
    ],
    points: [
      { lat: 43.362534, lng: -5.843321, alt: 100, name: "Catedral de Oviedo", description: "Catedral de estilo gótico en Oviedo", img: "https://cdn3.gbot.me/photos/FK/sB/1506925118/Catedral_de_San_Salvador_-Catedral_de_Oviedo-20000000016155938-500x375.jpg" },
      { lat: 43.548906, lng: -5.663067, alt: 75, name: "Elogio del Horizonte", description: "Monumento frente al mar realizado por Chillida", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Elogio_chillida_gijon.jpg/1200px-Elogio_chillida_gijon.jpg" },
      { lat: 43.557583, lng: -5.918011, alt: 50, name: "Centro Niemeyer", description: "Centro cultural en Avilés", img: "https://cflvdg.avoz.es/default/2018/05/01/00121525189049315627427/Foto/niemeyer.jpg" }
    ],
    comments: [
      { content: "Una ruta muy interesante", author: "Labra", idAuthor: "1" },
      { content: "La volveria a repetir", author: "Jesus", idAuthor: "2" },
      { content: "Me ha encantado", author: "Marcos", idAuthor: "3" }
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

    await storageHelper.createInitialFiles(webId);

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