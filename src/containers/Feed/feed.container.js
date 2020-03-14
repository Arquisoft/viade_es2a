import React, { useEffect, useState } from 'react';
import { foaf } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import { storageHelper } from '@utils';
import { RouteMapPageContent } from '@components';

const testRoutes = [
  {
    id: "16c67714-f386-4832-93da-5fb7b8ffce13",
    name: "Ruta de prueba",
    author: "Autor de prueba",
    description: "Descripcion de la ruta de prueba",
    date: Date.now(),
	images: [
      { img: "https://s3.amazonaws.com/tinycards/image/98d84c9c624b3576d978c827d0780798" },
      { img: "https://upload.wikimedia.org/wikipedia/commons/f/f7/MetroDF_Linea_2.jpg" },
      { img: "https://lh3.googleusercontent.com/proxy/peagw-wfe1BX5X-PjcA2MZfANJ9dgItG9XYc2cmwW5pns7whXhz7bx9CI4MeUeWhrq5aOv364CzghFl3b7AuAHXK5zSQ49C5v1aQmlXymA" },
      { img: "https://s3.amazonaws.com/tinycards/image/70da13db7297a4508c66d4936c4beccc" },
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/MA_Route_5.svg/600px-MA_Route_5.svg.png" }
    ],
    points: [
      { lat: 42.868123, lng: -8.547259, alt: 250, name: "Punto de prueba 1", description: "Prueba descripcion 1" },
      { lat: 43.258073, lng: -2.921462, alt: 400, name: "Punto de prueba 2", description: "Prueba descripcion 2" },
      { lat: 39.452128, lng: -0.407872, alt: 100, description: "Prueba descripcion 3" },
      { lat: 36.520274, lng: -6.281328, alt: 700, name: "Punto de prueba 4" },
      { lat: 40.969841, lng: -5.667944, alt: 650 }
    ]
  },
  {
    id: "06c67714-3386-4832-93da-5fb7b8ffceca",
    name: "Ruta de prueba por Australia",
    author: "Jose Emilio Labra",
    description: "Ruta por el centro de Australia",
    date: Date.now(),
	  images: [
      { img: "https://media.iatiseguros.com/wp-content/uploads/2018/10/04010101/visado-australia-viajar-4.jpg" },
      { img: "https://growproexperience.com/wp-content/uploads/2019/10/Sydney.jpg" },
      { img: "https://www.dw.com/image/51418266_401.jpg" }
    ],
    points: [
      { lat: -24.397, lng: 130.644, alt: 250, name: "Cascada", description: "Muy guapa" },
      { lat: -25.297, lng: 129.644, alt: 400, name: "Roca", description: "Imponente" },
      { lat: -24.297, lng: 128.644, alt: 100, name: "Colinas", description: "Vistas espectaculares" },
      { lat: -23.397, lng: 127.644, alt: 700, name: "Llanura" },
      { lat: -24.197, lng: 126.644, alt: 650, name: "Lago" }
    ]
  },
  {
    id: "46c67714-f386-4832-93da-111111111111",
    name: "Ruta de prueba por Asturias",
    author: "Alvaro Tango Fernandez",
    description: "Ruta por las tres ciudades asturianas Oviedo, Gijón y Avilés.",
    date: Date.now(),
    images: [
      { img: "https://www.turismoasturias.es/documents/11022/33922/plaza-catedral-oviedo.jpg/abeebe09-3f2f-4a0d-8d17-a45302d9cf77?t=1550072883584" },
      { img: "https://i.pinimg.com/originals/27/20/b4/2720b4a940c38880200705b8749d41c3.jpg" },
      { img: "https://www.turismoasturias.es/documents/11022/3572964/Panoramica+1_Sabugo_Portada.jpg/205128da-1a59-4e27-a994-a1ee94537dae?t=1538644927684" }
    ],
    points: [
      { lat: 43.362534, lng: -5.843321, alt: 100, name: "Oviedo", description: "Catedral", img: "https://cdn3.gbot.me/photos/FK/sB/1506925118/Catedral_de_San_Salvador_-Catedral_de_Oviedo-20000000016155938-500x375.jpg" },
      { lat: 43.548906, lng: -5.663067, alt: 75, name: "Gijon", description: "Elogio", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Elogio_chillida_gijon.jpg/1200px-Elogio_chillida_gijon.jpg" },
      { lat: 43.557583, lng: -5.918011, alt: 50, name: "Aviles", description: "Centro cultural", img: "https://cflvdg.avoz.es/default/2018/05/01/00121525189049315627427/Foto/niemeyer.jpg" }
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