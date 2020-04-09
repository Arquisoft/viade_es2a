import React from "react";

import {
    ScrollPanelMedia,
    ThumbnailContainer,
    ImageThumbnail,
    LinkMedia,
    MediaModal,
    SelectedImage,
    ImageContainer
} from "./multimedia.style";

import { TabPanel } from "./../../../../route-view.style";

import { modal, ModalCloseButton } from "@utils";
import { useTranslation } from 'react-i18next';

const Multimedia = (files, closeRouteView) => {

    const validImageExtensions = "jpg jpeg png svg";

    const { t } = useTranslation();

    //Estados para controlar el modal que se muestra al clickar en un archivo o imagen
    const [MediaViewModal, openMediaView, closeMediaView] = modal("route-map");
    const [MediaViewModalFile, openMediaViewFile, closeMediaViewFile] = modal("route-map");
    const [selectedMedia, setSelectedMedia] = React.useState(null);

    const openMediaViewWithImage = link => {
        setSelectedMedia(link);
        openMediaView();
    };

    const openMediaViewWithFile = link => {
        setSelectedMedia(link);
        openMediaViewFile();
    };

    return (
        <TabPanel>
            <ModalCloseButton onClick={closeRouteView} />
            <MediaViewModal>
                <ModalCloseButton onClick={closeMediaViewFile} />
                <ImageContainer>
                    <SelectedImage src={selectedMedia} onClick={closeMediaView} />
                </ImageContainer>
            </MediaViewModal>
            <MediaViewModalFile>
                <MediaModal>
                    <ModalCloseButton onClick={closeMediaViewFile} />
                    <h2>{t("route.file")}</h2>
                    <p>
                        {t("route.source")} {selectedMedia}
                    </p>
                    <p>{t("route.clickToDownload")}</p>
                    <a href={selectedMedia} download>
                        <img style={{ height: '2em' }} src="img/icon/download.svg" alt="download file" />
                    </a>
                </MediaModal>
            </MediaViewModalFile>
            <ScrollPanelMedia>
                {files.files &&
                    files.files.map((f, index) => {
                        var splitString = f["@id"].split(".");
                        var fileType = splitString[splitString.length - 1];

                        if (
                            validImageExtensions.includes(fileType.toLowerCase())
                        ) {
                            return (
                                <ThumbnailContainer key={index}
                                    onClick={() => openMediaViewWithImage(f["@id"])}
                                >
                                    <ImageThumbnail src={f["@id"]} />
                                </ThumbnailContainer>
                            );
                        } else {
                            return (
                                <ThumbnailContainer key={index}
                                    onClick={() => openMediaViewWithFile(f["@id"])}
                                >
                                    <LinkMedia>.{fileType}</LinkMedia>
                                </ThumbnailContainer>
                            );
                        }
                    })}
            </ScrollPanelMedia>
            {!files && (
                <p className="no-data">{t("route.no_multimedia")}</p>
            )}
        </TabPanel>
    );
}

export default Multimedia;