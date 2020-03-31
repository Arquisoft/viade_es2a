import React from 'react';
import { RouteFieldsWrapper } from './route-fields.style';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { gpx } from '@utils';

const RouteFields = ({ onSave, onError, onImport }) => {

    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const onSaveButton = () => {
        if (name && description)
            onSave({ name, description });
        else
            onError(t('route.edit.fillAllFields'));
    };

    const onImportButton = files => {
        let file = files[0];
        if (!file.name.endsWith(".gpx")) {
            onError('No es un archivo compatibe, ha de ser .gpx');
            return;
        }

        let reader = new FileReader();
        reader.onload = () => {
            gpx.parse(reader.result, routes => {
                if (routes)
                    onImport(routes);
            });
        };

        reader.readAsText(file);
    };

    return (
        <RouteFieldsWrapper>
            <label>{t('route.name')}:</label>
            <input
                value={name}
                onChange={e => setName(e.target.value)} />

            <label>{t('route.description')}:</label>
            <input
                value={description}
                onChange={e => setDescription(e.target.value)} />

            <button onClick={onSaveButton}>{t('route.create')}</button>

            <label>Import GPX File:</label>
            <input
                type="file"
                onChange={e => onImportButton(e.target.files)} />
        </RouteFieldsWrapper>
    );
};

export default RouteFields;