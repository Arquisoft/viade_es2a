import React from "react";

import { Uploader } from "@inrupt/solid-react-components";
import { useTranslation } from "react-i18next";
import {
  WelcomeContent,
  WelcomeWrapper,
  WelcomeCard,
  WelcomeLogo,
  WelcomeProfile,
  WelcomeName,
  ImageWrapper
} from "./welcome.style";

import { ImageProfile } from "@components";
import { FloatingButton } from "@util-components";
import { errorToaster } from "@utils";

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const WelcomePageContent = props => {
  const { webId, image, updatePhoto, name } = props;

  const { t } = useTranslation();

  const limit = 2100000;

  return (
    <WelcomeWrapper data-testid="welcome-wrapper">
      <WelcomeContent>
        <WelcomeCard className="card" style={{ maxHeight: '30em' }}>
          <WelcomeLogo data-testid="welcome-logo">
            <img src="img/Viade.svg" alt="Inrupt" />
          </WelcomeLogo>
          <WelcomeProfile data-testid="welcome-profile">
            <div style={{ margin: 'auto' }}>
              <h3 className="welcome-title">
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
            </div>
          </WelcomeProfile>
        </WelcomeCard>

        <WelcomeCard className="card tutorial">
          <h4 className="tutorial-title">{t("welcome.tutorial.title")}</h4>
          <div>
            <p>{t("welcome.tutorial.content")}</p>
            <p>{t("welcome.tutorial.content2")}</p>
            <p>{t("welcome.tutorial.content3")}</p>
          </div>

          <div style={{ position: 'relative', height: '5.5em' }}>
            <img src="img/next.svg" alt="(+)" />

            <FloatingButton
              style={{ top: '0' }}
              onClick={() => undefined}
              background={"#8a25fc"}
              hoverBackground={"#9841fc"}
              activeBackground={"#ad66ff"}
              foreground={"white"}
              text={"+"}
            />
          </div>
        </WelcomeCard>
      </WelcomeContent>
    </WelcomeWrapper>
  );
};
