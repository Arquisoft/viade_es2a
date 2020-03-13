import React from 'react';
//import { Uploader } from '@inrupt/solid-react-components';
//import { Trans } from "react-i18next";
import {
    FriendsWrapper,
    FriendsGeneralCard,
    FriendsSeeMore,
    LineSpanDiv
} from './friends.style';
import {
    Container,
    Row,
    Col
} from 'react-awesome-styled-grid';
import { useTranslation } from 'react-i18next';

export const FriendsPageContent = props => {
    const { webId, amigos } = props;
    const { t } = useTranslation();
//    const { t } = useTranslation();
//    const limit = 2100000;

    return (
        <FriendsWrapper data-testid="friendswrapper">
            <FriendsGeneralCard className="card">
                <h3>{t('friends.add')}</h3>
                <LineSpanDiv>
                        <span>{t('friends.addWebID')}</span> 
                        <span> <input type="text" id="id_friendsUser" name="friendsUser" size="50"/> </span>
                        <span> <button>{t('friends.addButton')}</button> </span>  
                </LineSpanDiv> 
            </FriendsGeneralCard>
            <FriendsGeneralCard className="card">
                <h3>{t('friends.friends')}</h3>
                <Container>
                    <Row>
                        {
                            amigos.map(amigo => {
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