import React from 'react';
import { GroupFieldsWrapper } from './group-fields.style';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GroupFields = ({ onSave, onAddMember, onError }) => {

    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [newMember, setNewMember] = useState('');

    const onSaveButton = () => {
        if (name)
            onSave({ name });
        else
            onError('Group name empty');
    };

    const onAddButton = () => {
        if (newMember)
            onAddMember({ newMember });
        else
            onError('Member field empty');
    }

    return (
        <GroupFieldsWrapper>
            <label>{t('route.name')}:</label>
            <input
                value={name}
                onChange={e => setName(e.target.value)} />

            <label>{'Add member'}:</label>
            <input
                value={newMember}
                onChange={e => setNewMember(e.target.value)} />

            <button onClick={onAddButton}>{'Add member'}</button>
            <button onClick={onSaveButton}>{t('route.create')}</button>
        </GroupFieldsWrapper>
    );
};

export default GroupFields;