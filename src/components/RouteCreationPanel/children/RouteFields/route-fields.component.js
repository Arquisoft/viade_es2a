import React, { useState } from "react";

import { RouteFieldsWrapper, ButtonContainer } from "./route-fields.style";

import { useTranslation } from "react-i18next";

import { gpx } from "@utils";

const RouteFields = ({ onSave, onError, onImport, onUpload, routeBase }) => {
  const { t } = useTranslation();

  const [name, setName] = useState(routeBase ? routeBase.name : "");
  const [description, setDescription] = useState(
    routeBase ? routeBase.description : ""
  );

  const onSaveButton = () => {
    if (name && description) onSave({ name, description });
    else onError(t("route.edit.fillAllFields"));
  };

  const onImportButton = (files) => {
    let file = files[0];
    if (!file.name.endsWith(".gpx")) {
      onError("No es un archivo compatibe, ha de ser .gpx");
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
    <RouteFieldsWrapper>
      <label>{t("route.name")}:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>{t("route.description")}:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <ButtonContainer>
        <button onClick={onSaveButton}>{t("route.create")}</button>
        <label className="file-upload-label" for="upload-file">
          {t("route.edit.gpx")}
        </label>
      </ButtonContainer>

      <input
        id="upload-file"
        type="file"
        onChange={(e) => onImportButton(e.target.files)}
      />
    </RouteFieldsWrapper>
  );
};

export default RouteFields;
