import React from "react";
import { Uploader } from "@inrupt/solid-react-components";
import { useTranslation } from "react-i18next";
import {
  WelcomeWrapper,
  WelcomeCard,
  WelcomeLogo,
  WelcomeProfile,
  WelcomeName,
  ImageWrapper
} from "./welcome.style";
import { ImageProfile } from "@components";
import { errorToaster } from "@utils";

import { v4 as uuid } from 'uuid';

import { storageHelper } from '@utils';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const WelcomePageContent = props => {
  const { webId, image, updatePhoto, name } = props;
  const { t } = useTranslation();
  const limit = 2100000;

  function testSave() {
    const id = uuid();
    const testRoute = {
      id,
      name: "Ruta de prueba",
      author: webId.replace("#me", "#"),
      description: "Descripcion de la ruta de prueba",
      date: Date.now(),
      images: [
        { url: "https://s3.amazonaws.com/tinycards/image/98d84c9c624b3576d978c827d0780798" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/f/f7/MetroDF_Linea_2.jpg" },
        { url: "https://lh3.googleusercontent.com/proxy/peagw-wfe1BX5X-PjcA2MZfANJ9dgItG9XYc2cmwW5pns7whXhz7bx9CI4MeUeWhrq5aOv364CzghFl3b7AuAHXK5zSQ49C5v1aQmlXymA" },
        { url: "https://s3.amazonaws.com/tinycards/image/70da13db7297a4508c66d4936c4beccc" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/MA_Route_5.svg/600px-MA_Route_5.svg.png" }
      ],
      points: [
        { lat: 42.868123, lng: -8.547259, name: "Punto de prueba 1", description: "Prueba descripcion 1" },
        { lat: 43.258073, lng: -2.921462, name: "Punto de prueba 2", description: "Prueba descripcion 2" },
        { lat: 39.452128, lng: -0.407872, description: "Prueba descripcion 3" },
        { lat: 36.520274, lng: -6.281328, name: "Punto de prueba 4" },
        { lat: 40.969841, lng: -5.667944 }
      ],
      comments: [
        { content: "K wapa ermao", author: webId.replace("#me", "#"), date: Date.now() }
      ]
    };

    storageHelper.saveRoute(webId, testRoute);
  }

  return (
    <WelcomeWrapper data-testid="welcome-wrapper">
      <WelcomeCard className="card">
        <WelcomeLogo data-testid="welcome-logo">
          <img src="/img/logo.svg" alt="Inrupt" />
          <button
            className="ids-link-filled ids-link-filled--secondary button"
            onClick={testSave}
          >
            {"Guardar ejemplo ruta"}
          </button>
        </WelcomeLogo>
        <WelcomeProfile data-testid="welcome-profile">
          <h3>
            {t("welcome.welcome")}, <WelcomeName>{name}</WelcomeName>
          </h3>

          <ImageWrapper>
            <Uploader
              {...{
                fileBase: webId && webId.split("/card")[0],
                limitFiles: 1,
                limitSize: limit,
                accept: "jpg,jpeg,png",
                errorsText: {
                  sizeLimit: t("welcome.errors.sizeLimit", {
                    limit: `${limit / 1000000}Mbs`
                  }),
                  unsupported: t("welcome.errors.unsupported"),
                  maximumFiles: t("welcome.errors.maximumFiles")
                },
                onError: error => {
                  if (error && error.statusText) {
                    errorToaster(error.statusText, t("welcome.errorTitle"));
                  }
                },
                onComplete: uploadedFiles => {
                  updatePhoto(
                    uploadedFiles[uploadedFiles.length - 1].uri,
                    t("welcome.uploadSuccess"),
                    t("welcome.successTitle")
                  );
                },
                render: props => (
                  <ImageProfile
                    {...{
                      ...props,
                      webId,
                      photo: image,
                      text: t("welcome.upload"),
                      uploadingText: t("welcome.uploadingText")
                    }}
                  />
                )
              }}
            />
          </ImageWrapper>
        </WelcomeProfile>
      </WelcomeCard>
    </WelcomeWrapper>
  );
};
