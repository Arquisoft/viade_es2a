import React from 'react';

import { GroupFields } from './children';

import { useTranslation } from 'react-i18next';

import {
    AddGroupPanel,
} from './group-creation-panel.style';

import { errorToaster, successToaster } from '@utils';

const GroupCreationPanel = ({ webId, closeFeedAddition, onGroupCreation }) => {
    const { t } = useTranslation();

    const onSave = async (name, members) => {
        const group = {
            name,
            members,
            date: Date.now(),
            owner: webId
        };

        successToaster(t('groupcreator.creation_content'), t('groupcreator.creation_title'));

        await onGroupCreation(group);
        closeFeedAddition();
    };

    const onError = error => {
        errorToaster(error, 'Error');
    };

    return <AddGroupPanel>
        <GroupFields id={"group-fields"} {...{ onSave, onError, webId }} />
    </AddGroupPanel>;
};

export default GroupCreationPanel;