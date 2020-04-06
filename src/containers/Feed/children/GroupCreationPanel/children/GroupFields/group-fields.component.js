import React from 'react';
import { GroupFieldsWrapper } from './group-fields.style';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GroupFields = ({ onSave, onAddMember, onError }) => {

    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [newMember, setNewMember] = useState('');

    const onSaveButton = () => {
        if (name) {
            onSave({ name });
        }            
        else
            onError(t('groupcreation.no_name'));
    };

    const onAddButton = () => {
        if (newMember)
            onAddMember({ newMember });
        else
            onError(t('groupcreation.no_member'));
    }

    return (
        <GroupFieldsWrapper>
            <label>{t('groupcreation.name')}:</label>
            <input
                value={name}
                onChange={e => setName(e.target.value)} />

            <label>{t('groupcreation.add_member')}:</label>
            <input
                value={newMember}
                onChange={e => setNewMember(e.target.value)} />

            <button onClick={onAddButton}>{t('groupcreation.add_button')}</button>
            <button onClick={onSaveButton}>{t('groupcreation.create')}</button>
        </GroupFieldsWrapper>
    );
};

export default GroupFields;