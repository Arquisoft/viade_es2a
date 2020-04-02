import React from "react";

import {
    DownPanel,
    TabPanel,
    Header,
    TabButton,
    CommentContainer,
    AddCommentText,
    AddCommentButton,
    ScrollPanelComments,
    CommentSeparatorLine,
    ScrollPanelMedia,
    ThumbnailContainer,
    ImageThumbnail,
    LinkMedia
} from "./route-elements.style";

import { commentService } from "@services";
import { useTranslation } from "react-i18next";
import { modal, ModalCloseButton } from "@utils";
import { WaypointsDropdown } from "./..";

const RouteElements = ({ comments, files, webId, route, closeRouteView, setSelectedMedia, openMediaView, openMediaViewFile }) => {

    const points = route.waypoints;

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

    const [downPanelCollapsed, setDownPanelCollapsed] = React.useState(false);
    const [commentText, setCommentText] = React.useState("");
    const [selectedTab, setSelectedTab] = React.useState(0);

    const tabs = ["route.comments", "route.multimedia"];

    const [selectedWaypoint, setSelectedWaypoint] = React.useState(0);



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
                    return <TabButton
                        selected={selectedTab === i}
                        key={i}
                        onClick={() => onTabSelect(i)}>
                        {t(name)}
                    </TabButton>
                })}
            </Header>

            {selectedTab ?
                <TabPanel>
                    <ScrollPanelMedia>
                        {files &&
                            files.map(f => {
                                var splitString = f.link.split(".");
                                var fileType = splitString[splitString.length - 1];
                                console.log(fileType);
                                if (validImageExtensions.includes(fileType.toLowerCase())) {
                                    return (
                                        <ThumbnailContainer onClick={() => openMediaViewWithImage(f.link)}>
                                            <ImageThumbnail src={f.link} />
                                        </ThumbnailContainer>
                                    );
                                }
                                else {
                                    return (
                                        <ThumbnailContainer onClick={() => openMediaViewWithFile(f.link)}>
                                            <LinkMedia>.{fileType}</LinkMedia>
                                        </ThumbnailContainer>
                                    );
                                }
                            })
                        }
                    </ScrollPanelMedia>

                    {!files && <p className="no-data">{t('route.no_multimedia')}</p>}
                </TabPanel>
                :
                <TabPanel>
                    <ScrollPanelComments>
                        {comments &&
                            comments.map(c => {
                                return (
                                    <p>
                                        <p className="element">{c.content} - {c.author}</p>
                                        <CommentSeparatorLine />
                                    </p>
                                );
                            })
                        }
                    </ScrollPanelComments>

                    {!comments && <p className="no-data">{t('route.no_comments')}</p>}
                    <CommentContainer>
                        <AddCommentText placeholder="¿Qué opinas?" />
                        <AddCommentButton title="Elejir punto">
                            <img src="img/icon/choosePoint.png" alt="Choose point" />
                        </AddCommentButton>
                        <AddCommentButton title="Comentar">
                            <img src="img/icon/sendMessage.png" alt="Send message" />
                        </AddCommentButton>
                    </CommentContainer>
                </TabPanel>
            }
        </DownPanel>
    );
};

// <WaypointsDropdown {...{ points }}/>

export default RouteElements;