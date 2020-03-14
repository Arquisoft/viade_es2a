import React, { useState, useEffect } from 'react';
// import {} from '@solid/query-ldflex';
// import { namedNode } from '@rdfjs/data-model';
import { FriendsPageContent } from './friends.component';
// import { successToaster, errorToaster } from '@utils';
import { foaf } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';

// const $rdf = require('rdflib');
// const store = new $rdf.graph();
// const fetcher = new $rdf.Fetcher(store);
// const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
// const data = require('@solid/query-ldflex');
const FriendsContainer = props => {
      
  const {webId} = props;
  const [friends, setFriends] = useState([])

     useEffect(() => {
       getAmigos()
     }, [])

 const   getAmigos = async () => {
      
        const doc =  await fetchDocument(webId);
        const me = doc.getSubject(webId);
        console.log(me)
        const myFriends = me.getAllRefs(foaf.knows);
        setFriends(myFriends);
      }
      
        //const friendChosen = this.state;
        //const amigos = this.getFriends();
        if (!(friends.length>0)) {

          return <div/>

        } else {

          const amigos = friends
          

          return (
            <FriendsPageContent {...{ webId, amigos }} />
          );
        }
        

}

export default FriendsContainer