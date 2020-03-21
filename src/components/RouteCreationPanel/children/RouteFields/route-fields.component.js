import React from 'react';
import { RouteFieldsWrapper } from './route-fields.style'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RouteFields = ({ onSave, onError }) => {

    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const onSaveButton = () => {
        if (name && description)
            onSave({name, description});
        else
            onError(t('route.edit.fillAllFields'));
    }

    return (
        <RouteFieldsWrapper>
            <label>{t('route.name')}:</label>
            <input
                value={name}
                onInput={e => setName(e.target.value)} />

            <label>{t('route.description')}:</label>
            <input
                value={description}
                onInput={e => setDescription(e.target.value)} />

            <button onClick={onSaveButton}>{t('route.create')}</button>
        </RouteFieldsWrapper>
    )
}

export default RouteFields;