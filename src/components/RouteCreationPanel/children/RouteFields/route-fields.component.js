import React, { useState } from "react";

import { RouteFieldsWrapper, ButtonContainer } from "./route-fields.style";

import { useTranslation } from "react-i18next";

import { gpx } from "@utils";

const RouteFields = ({ onSave, onError, onImport, routeBase, selectedTab }) => {
  const { t } = useTranslation();

  const [name, setName] = useState(routeBase ? routeBase.name : "");
  const [description, setDescription] = useState(
    routeBase ? routeBase.description : ""
  );

  const onSaveButton = () => {
    if (name) onSave({ name, description });
    else onError(t("route.edit.fillAllFields"));
  };

  const onImportButton = (files) => {
    let file = files[0];
    if (!file.name.endsWith(".gpx")) {
      onError(t("routes.invalid_import"));
      return;
    }

    let reader = new FileReader();
    reader.onload = () => {
      gpx.parse(reader.result, (routes) => {
        if (routes) onImport(routes);
      });
    };

    reader.readAsText(file);
  };

  return (
    <RouteFieldsWrapper hidden={(selectedTab !== null) ? selectedTab : false}>
      <label>{t("route.name")}:</label>
      <input
        className='value-name'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>{t("route.description")}:</label>
      <textarea
        className='value-description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <ButtonContainer two={!routeBase}>
        <button className='buttonToSave' onClick={onSaveButton}>{t("route.create")}</button>
        {!routeBase && <label className="file-upload-label" htmlFor="upload-file">
          {t("route.edit.gpx")}
        </label>}
      </ButtonContainer>

      {!routeBase && <input
        id="upload-file"
        type="file"
        onChange={(e) => onImportButton(e.target.files)}
      />}
    </RouteFieldsWrapper>
  );
};

export default RouteFields;