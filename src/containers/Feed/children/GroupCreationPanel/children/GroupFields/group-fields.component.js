import React from 'react';
import { GroupFieldsWrapper, GroupFieldsCard, Button } from './group-fields.style';
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
            <GroupFieldsCard>
                <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)} 
                placeholder={t('groupcreation.name')} />
            </GroupFieldsCard>
            
            <GroupFieldsCard>
                <input
                        type='text'
                        value={newMember}
                        onChange={e => setNewMember(e.target.value)} 
                        placeholder={t('groupcreation.add_member')} />

                <Button onClick={onAddButton}>{t('groupcreation.add_button')}</Button>
            </GroupFieldsCard>
            
            <GroupFieldsCard>
                <Button onClick={onSaveButton}>{t('groupcreation.create')}</Button>
            </GroupFieldsCard>
        </GroupFieldsWrapper>
    );
};

export default GroupFields;