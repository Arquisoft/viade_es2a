import React from "react";

import {
    DownPanel,
    TabPanel,
    Header,
    TabButton,
    ScrollPanelMedia,
    ThumbnailContainer,
    ImageThumbnail,
    LinkMedia,
    PanelContainer,
    MediaModal,
    SelectedImage,
    ImageContainer
} from "./route-elements.style";

import { useTranslation } from "react-i18next";
import { modal, ModalCloseButton } from "@utils";
import Comments from "./children"

const RouteElements = ({ comments, files, webId, route, closeRouteView, downPanelCollapsed, setDownPanelCollapsed }) => {

    const { t } = useTranslation();

    const onTabSelect = index => {
        if (downPanelCollapsed) {
            setDownPanelCollapsed(false);
            setSelectedTab(index);
        } else {
            if (selectedTab === index) {
                setDownPanelCollapsed(true);
            } else {
                setSelectedTab(index);
            }
        }
    };

    const openMediaViewWithImage = link => {
        setSelectedMedia(link);
        openMediaView();
    };

    const openMediaViewWithFile = link => {
        setSelectedMedia(link);
        openMediaViewFile();
    };

    const validImageExtensions = "jpg jpeg png svg";

    const [selectedTab, setSelectedTab] = React.useState(0);

    const tabs = ["route.comments", "route.multimedia"];

    const [MediaViewModal, openMediaView, closeMediaView] = modal("route-map");
    const [MediaViewModalFile, openMediaViewFile, closeMediaViewFile] = modal("route-map");
    const [selectedMedia, setSelectedMedia] = React.useState(null);

    return (
        <DownPanel {...{ downPanelCollapsed }}>
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

            <Header>
                {tabs.map((name, i) => {
                    return (
                        <TabButton
                            selected={selectedTab === i}
                            key={i}
                            onClick={() => onTabSelect(i)}
                        >
                            {t(name)}
                        </TabButton>
                    );
                })}
            </Header>

            <PanelContainer {...{ downPanelCollapsed }}>
                {selectedTab ? (
                    <TabPanel>
                        <ScrollPanelMedia>
                            {files &&
                                files.map((f, index) => {
                                    var splitString = f.link.split(".");
                                    var fileType = splitString[splitString.length - 1];

                                    if (
                                        validImageExtensions.includes(fileType.toLowerCase())
                                    ) {
                                        return (
                                            <ThumbnailContainer key={index}
                                                onClick={() => openMediaViewWithImage(f.link)}
                                            >
                                                <ImageThumbnail src={f.link} />
                                            </ThumbnailContainer>
                                        );
                                    } else {
                                        return (
                                            <ThumbnailContainer key={index}
                                                onClick={() => openMediaViewWithFile(f.link)}
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
                ) : (
                    <Comments {...{ comments, webId, route }} />
                )}
            </PanelContainer>

        </DownPanel>
    );
};

export default RouteElements;