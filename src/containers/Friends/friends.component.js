import React from 'react';
//import { Uploader } from '@inrupt/solid-react-components';
//import { Trans } from "react-i18next";
import {
    FriendsGeneralCard,
    FriendsWrapper,
    FriendsDetail,
//    FriendsAdditionWrapper,
//    FriendsAddition
} from './friends.style';

export const FriendsPageContent = props => {
//    const { webID } = props;
//    const { t } = useTranslation();
//    const limit = 2100000;
    return (
        <FriendsWrapper data-testid="friends-wrapper">
            <FriendsGeneralCard className="card">
                <FriendsDetail>
                    <h3>Add a friend</h3>
                    <p>
                        <label for="id_friendsUser">Friend's webID: </label> <input type="text" id="id_friendsUser" name="friendsUser"/>
                        <button>Add</button>                   
                    </p>  
                </FriendsDetail>
            </FriendsGeneralCard>
        </FriendsWrapper>
    );
};