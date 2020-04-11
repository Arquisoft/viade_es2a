import React, { useState } from 'react';

import { AddFriendPanel } from './add-friend.style';
import { InputCard, Button } from '../../feed-addition-panel.style';

import { friendService } from '@services';

import { useTranslation } from 'react-i18next';

import { errorToaster } from '@utils';

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
        <InputCard>
            <input
                type='text'
                onChange={e => setAddedWebID(e.target.value)}
                placeholder={t("friends.addWebID")}
            />
            <Button onClick={addFriend}>{t("friends.addButton")}</Button>
        </InputCard>
    </AddFriendPanel>;
};

export default AddFriend;