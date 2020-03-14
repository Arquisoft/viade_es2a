import React, {useState} from 'react';
import ldflex from '@solid/query-ldflex';
import { RouteMapPageContent } from '@components';
//import { Uploader } from '@inrupt/solid-react-components';
//import { Trans } from "react-i18next";
import {
    FriendsWrapper,
    FriendsGeneralCard,
    FriendsSeeMore,
    LineSpanDiv,
    Button
} from './friends.style';
import {
    Container,
    Row,
    Col
} from 'react-awesome-styled-grid';
import { useTranslation } from 'react-i18next';
import { ControlledStorage } from 'rdf-namespaces/dist/space';

export const FriendsPageContent = props => {
    const { webId, friends, setFriends } = props;
    const { t } = useTranslation();
    const [textField, setTextField] = useState('')
    const [defaultView,setView] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [routes, setRoutes] = useState([]);
    const FileClient = require("solid-file-client");
  const solidAuth = require("solid-auth-cli");
  const fileClient = new FileClient(solidAuth)
//    const { t } = useTranslation();
//    const limit = 2100000;
    var friendRoutes = []

    const handleChange = event =>{
        setTextField(event.target.value);
    }

    const addFriend = async () =>{
        return ldflex[webId].knows.add(ldflex[textField]);
    }

    const fetchRoutes = async (friend) => {
        setIsLoading(true)

      const path = friend.replace('/profile/card#me', '/public/routes');

      var folder = await fileClient.readFolder(path);

      Promise.all(folder.files.map(e => fileClient.readFile(e.url))).then(values => {
        var routes = values.map(v => { try { return JSON.parse(v) } catch (err) { return undefined } }).filter(x => x)
        setRoutes(routes);
      }).finally(() => setIsLoading(false))
        setView(false);
      }




    return ( defaultView?
        <FriendsWrapper data-testid="friendswrapper">
            <FriendsGeneralCard className="card">
                <h3>{t('friends.add')}</h3>
                <LineSpanDiv>   
                        <span>{t('friends.addWebID')}</span> 
                        <span> <input onChange={handleChange} type="text" id="id_friendsUser" name="friendsUser" size="50"/> </span>
                        <span> <Button onClick={addFriend} >{t('friends.addButton')}</Button> </span>  
                </LineSpanDiv> 
            </FriendsGeneralCard>
            <FriendsGeneralCard className="card">
                <h3>{t('friends.friends')}</h3>
                <Container>
                    <Row>
                        {
                            friends.map(amigo => {
                            return (
                                <Col>
                                    {amigo}
                                    <FriendsSeeMore>
                                        <button onClick={()=>{fetchRoutes(amigo)}}>{t('friends.seeRoutes')}</button>
                                    </FriendsSeeMore>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </FriendsGeneralCard>
        </FriendsWrapper>:<RouteMapPageContent isLoading={isLoading} routes={routes} />
    );
};