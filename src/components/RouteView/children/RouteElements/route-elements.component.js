import React from "react";

import {
    DownPanel,
    TabPanel,
    Header,
    TabButton,
    CommentContainer,
    AddCommentText,
    AddCommentButton,
    CommentButtonContainer,
    ScrollPanelComments,
    ScrollPanelMedia,
    ThumbnailContainer,
    ImageThumbnail,
    LinkMedia,
    PanelContainer,
    MediaModal,
    SelectedImage,
    ImageContainer
} from "./route-elements.style";

import { commentService } from "@services";
import { useTranslation } from "react-i18next";
import { modal, ModalCloseButton } from "@utils";
import { WaypointsDropdown } from "./..";

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

    const handleChange = event => {
        setCommentText(event.target.value);
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

    const [commentText, setCommentText] = React.useState("");
    const [selectedTab, setSelectedTab] = React.useState(0);

    const tabs = ["route.comments", "route.multimedia"];

    const [selectedWaypoint, setSelectedWaypoint] = React.useState(0);

    const [MediaViewModal, openMediaView, closeMediaView] = modal("route-map");
    const [MediaViewModalFile, openMediaViewFile, closeMediaViewFile] = modal("route-map");
    const [selectedMedia, setSelectedMedia] = React.useState(null);

    const postComment = () => {
        const comment = {
            content: commentText,
            date: Date.now(),
            waypoint: selectedWaypoint
        };

        commentService.postComment(webId, comment, route);

        setCommentText("");
    };

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
                        <TabPanel>
                            <ScrollPanelComments>
                                {comments &&
                                    comments.map((c, index) => {
                                        return (
                                            <p key={index}>
                                                {c.content} - {c.author}
                                            </p>
                                        );
                                    })}
                            </ScrollPanelComments>

                            {!comments && (
                                <p className="no-data">{t("route.no_comments")}</p>
                            )}
                            <CommentContainer>
                                <AddCommentText
                                    value={commentText}
                                    onChange={handleChange}
                                    placeholder="¿Qué opinas?"
                                />
                                <CommentButtonContainer>
                                    <AddCommentButton title={t("route.select_point")}>
                                        <img src="img/icon/marker/0.svg" alt="Choose point" />
                                    </AddCommentButton>

                                    <AddCommentButton
                                        value={commentText}
                                        onClick={postComment}
                                        title="Comentar">

                                        <img src="img/icon/send.svg" alt="Send message" />
                                    </AddCommentButton>
                                </CommentButtonContainer>
                            </CommentContainer>
                        </TabPanel>
                    )}
            </PanelContainer>

        </DownPanel>
    );
};

//<WaypointsDropdown {...{ route }}/>

export default RouteElements;