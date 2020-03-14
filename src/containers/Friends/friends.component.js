import React, {useState} from 'react';
import ldflex from '@solid/query-ldflex';
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
//    const { t } = useTranslation();
//    const limit = 2100000;


    const handleChange = event =>{
        setTextField(event.target.value);
    }

    const addFriend = async () =>{
        return ldflex[webId].knows.add(ldflex[textField]);
    }


    return (
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
                                        <button>{t('friends.seeRoutes')}</button>
                                    </FriendsSeeMore>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </FriendsGeneralCard>
        </FriendsWrapper>
    );
};