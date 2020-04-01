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
    Collapsed 
} from "./route-elements.style";

import { commentService } from "@services";
import { useTranslation } from "react-i18next";
import { modal, MobileCompatWrapper, ModalCloseButton } from "@utils";

const validImageExtensions = "jpg jpeg png svg";

const [downPanelCollapsed, setDownPanelCollapsed] = React.useState(false);
const [commentText, setCommentText] = React.useState("");
const [selectedTab, setSelectedTab] = React.useState(0);

const tabs = ["route.comments", "route.multimedia"];

const [selectedWaypoint, setSelectedWaypoint] = React.useState(0);

const RouteElements = ({comments, files, webId, route}) => {
    
    const { t } = useTranslation();
    
    const onTabSelect = index => {
        if(downPanelCollapsed) {
            setDownPanelCollapsed(false);
            setSelectedTab(index);
        } else {
            if(selectedTab === index) {
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
        <DownPanel>
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
            
            {downPanelCollapsed ? (
                <Collapsed />
            ) : (
                <PanelContainer>
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
            )}       
        </DownPanel>
    );
};

export default RouteElements;