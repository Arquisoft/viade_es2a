import React, { useState } from 'react';

import {
    AddFriendPanel,
    AddFriendHeader,
    Button,
    FriendsAddCard
} from './add-friend.style';

import { friendService } from '@services';

import { useTranslation } from 'react-i18next';

import { errorToaster, ModalCloseButton } from '@utils';

const AddFriend = ({ webId, closeFeedAddition, fetchFriends }) => {
    const { t } = useTranslation();

    const [addedWebID, setAddedWebID] = useState("");

    const addFriend = async () => {
        if (await friendService.exists(addedWebID)) {
            await friendService.addFriend(webId, addedWebID);
            await fetchFriends();
        } else
            errorToaster(t('friends.not_exists'), 'Error');
    };

    return <AddFriendPanel>
        <ModalCloseButton onClick={closeFeedAddition} />
        <AddFriendHeader>{t("friends.add")}</AddFriendHeader>
        <FriendsAddCard>
            <input
                type='text'
                onChange={e => setAddedWebID(e.target.value)}
                placeholder={t("friends.addWebID")}
            />
            <Button onClick={addFriend}>{t("friends.addButton")}</Button>
        </FriendsAddCard>
    </AddFriendPanel>;
};

export default AddFriend;