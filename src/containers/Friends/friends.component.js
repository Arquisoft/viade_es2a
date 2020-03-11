import React from 'react';
//import { Uploader } from '@inrupt/solid-react-components';
//import { Trans } from "react-i18next";
import {
    FriendsWrapper,
    FriendsGeneralCard,
    FriendsSeeMore
} from './friends.style';
import {
    Container,
    Row,
    Col
} from 'react-awesome-styled-grid';

export const FriendsPageContent = props => {
    const { amigos } = props;
//    const { t } = useTranslation();
//    const limit = 2100000;
    return (
        <FriendsWrapper data-testid="friendswrapper">
            <FriendsGeneralCard className="card">
                <h3>Add a friend</h3>
                <p>
                    <span>Friend's webID: </span> 
                    <span> <input type="text" id="id_friendsUser" name="friendsUser"/> </span>
                    <span> <button>Add</button> </span>                   
                </p> 
            </FriendsGeneralCard>
            <FriendsGeneralCard className="card">
                <h3>Your friends</h3>
                <Container>
                    <Row>
                        {
                            amigos.map(amigo => {
                            return (
                                <Col>
                                    {amigo.name}
                                    <FriendsSeeMore>
                                        <button>See routes</button>
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