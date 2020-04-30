import React, { useState } from 'react';

import { AddFriendPanel } from './add-friend.style';
import { InputCard, Button } from '../../feed-addition-panel.style';

import { friendService } from '@services';

import { useTranslation } from 'react-i18next';

import { errorToaster } from '@utils';

const AddFriend = ({ webId, fetchFeed }) => {
    const { t } = useTranslation();

    const [addedWebID, setAddedWebID] = useState("");

    const addFriend = async () => {
        if (await friendService.exists(addedWebID)) {
            await friendService.addFriend(webId, addedWebID);
            await fetchFeed();
        } else
            errorToaster(t('friends.not_exists'), 'Error');
    };

    return <AddFriendPanel>
        <InputCard>
            <input
                name='value-friend-webID'
                type='text'
                onChange={e => setAddedWebID(e.target.value)}
                placeholder={t("friends.addWebID")}
            />
            <Button name='add-friend-button' onClick={addFriend}>{t("friends.addButton")}</Button>
        </InputCard>
    </AddFriendPanel>;
};

export default AddFriend;