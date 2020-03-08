import React from 'react';
//import { Uploader } from '@inrupt/solid-react-components';
//import { Trans } from "react-i18next";
import {
    FriendsGeneralCard,
    FriendsWrapper
} from './friends.style';

export const FriendsPageContent = props => {
//    const { webID } = props;
//    const { t } = useTranslation();
//    const limit = 2100000;
    return (
        <FriendsWrapper data-testid="friends-wrapper">
            <FriendsGeneralCard className="card">
                <h3>Add a friend</h3>
                Friend's username: 
                <input type="text" name="friendsUser"/>
            </FriendsGeneralCard>
        </FriendsWrapper>
    );
};