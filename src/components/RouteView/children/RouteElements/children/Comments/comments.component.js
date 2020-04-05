import React from "react";

import {
    ScrollPanelComments,
    CommentContainer,
    AddCommentText,
    CommentButtonContainer,
    AddCommentButton,
    SelectPointToCommentContainer
} from "./comments.style";

import { TabPanel } from "./../../../../route-view.style";



import { commentService } from "@services";
import { useTranslation } from "react-i18next";

//Modal to show points to comment
import { modal } from "@utils";
import LocationMenu from "./children/LocationComponentComments/LocationMenu/location-menu-comment.component";
import { RouteColor as colors } from "@constants";

const Comments = ({ comments, webId, route, selectedPointComment, setSelectedPointComment }) => {

    const [commentText, setCommentText] = React.useState("");

    const { t } = useTranslation();

    const handleChange = event => {
        setCommentText(event.target.value);
    };

    const postComment = () => {
        const comment = {
            content: commentText,
            date: Date.now(),
            waypoint: selectedPointComment
        };

        commentService.postComment(webId, comment, route);

        setCommentText("");

        //Waypoint selected (null if no one selected, 0 for the first one, 1 for the second one,)
        setSelectedPointComment(null);

        //console.log(comment);
    };

    //Modal
    const [PointViewModal, openPointView] = modal("root");

    //Puntos que se le pasan al modal
    const points = route.waypoints;
    points.forEach((point, index) => (point.color = colors[index % colors.length]));

    return (
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
                    placeholder={t("route.comment_placeholder")}
                />
                <CommentButtonContainer>
                    <AddCommentButton onClick={openPointView} title={t("route.select_point")}>
                        <img src="img/icon/marker/0.svg" alt="Choose point" />
                    </AddCommentButton>
                    <AddCommentButton
                        value={commentText}
                        onClick={postComment}
                        title="Comentar">

                        <img src="img/icon/send.svg" alt="Send message" />
                    </AddCommentButton>
                    <PointViewModal>
                        <SelectPointToCommentContainer>
                            <LocationMenu {...{ points }} />
                        </SelectPointToCommentContainer>
                    </PointViewModal>
                </CommentButtonContainer>
            </CommentContainer>
        </TabPanel>
    );
};


export default Comments;