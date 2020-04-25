import React, { useState } from 'react';

import { GroupFieldsWrapper } from './group-fields.style';
import { InputCard, Button } from '../../../../feed-addition-panel.style';

import { useTranslation } from 'react-i18next';

const GroupFields = ({ onSave, onAddMember, onError, onSuccess }) => {

    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [newMember, setNewMember] = useState('');

    const onSaveButton = () => {
        if (name) {
            onSave({ name });
        } else
            onError(t('groupcreation.no_name'));
    };

    const onAddButton = () => {
        if (newMember) {
            onAddMember({ newMember });
            onSuccess( {newMember} );
        }            
        else
            onError(t('groupcreation.no_member'));
    }

    return <GroupFieldsWrapper>
        <InputCard>
            <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t('groupcreation.name')} />
        </InputCard>

        <InputCard>
            <input
                type='text'
                value={newMember}
                onChange={e => setNewMember(e.target.value)}
                placeholder={t('groupcreation.add_member')} />

            <Button onClick={onAddButton}>{t('groupcreation.add_button')}</Button>
        </InputCard>

        <InputCard>
            <Button onClick={onSaveButton}>{t('groupcreation.create')}</Button>
        </InputCard>
    </GroupFieldsWrapper>;
};

export default GroupFields;