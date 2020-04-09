import React from "react";

import {
    CommentSectionWrapper,
    ScrollPanelComments,
    CommentContainer,
    AddCommentText,
    CommentButtonContainer,
    AddCommentButton,
    SelectPointToCommentContainer
} from "./comments.style";

import { commentService } from "@services";
import { useTranslation } from "react-i18next";

import { modal } from "@utils";

import LocationMenu from "./children";

import { RouteColor as colors } from "@constants";

const Comments = ({ webId, route }) => {

    const comments = route.comments;

    const [commentText, setCommentText] = React.useState("");
    const [selectedPointComment, setSelectedPointComment] = React.useState(null);

    const { t } = useTranslation();

    const onPointSelectComment = index => {
        const newPoint = selectedPointComment === index ? null : index;
        setSelectedPointComment(newPoint);
    };

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
    };

    const [PointViewModal, openPointView] = modal("root");

    const points = route.waypoints;

    var selectedPointCommentColor = "img/icon/marker/";
    const isThereAnyPoint = route.waypoints.length > 0;

    if (!isThereAnyPoint)
        selectedPointCommentColor += "there-are-no-waypoints.svg";
    else {
        if (selectedPointComment === null)
            selectedPointCommentColor += "not-selected.svg";
        else
            selectedPointCommentColor += (selectedPointComment % colors.length) + ".svg";
    }

    return (
        <CommentSectionWrapper>
            <ScrollPanelComments>
                {comments &&
                    comments.map((c, index) => <p key={index}>{c.content} - {c.author}</p>)}
            </ScrollPanelComments>

            {!comments && <p className="no-data">{t("route.no_comments")}</p>}
            <CommentContainer>
                <AddCommentText
                    value={commentText}
                    onChange={handleChange}
                    placeholder={t("route.comment_placeholder")}
                />
                <CommentButtonContainer>
                    <AddCommentButton disabled={!isThereAnyPoint} onClick={openPointView} title={isThereAnyPoint ? t("route.select_point") : t("route.there_are_no_points")}>
                        <img src={selectedPointCommentColor} alt="Choose point" />
                    </AddCommentButton>
                    <AddCommentButton
                        value={commentText}
                        onClick={postComment}
                        title="Comentar">

                        <img src="img/icon/send.svg" alt="Send message" />
                    </AddCommentButton>
                    <PointViewModal>
                        <SelectPointToCommentContainer>
                            <p>{t("route.select_point")}</p>
                            <LocationMenu {...{ points, onPointSelectComment, selectedPointComment }} />
                        </SelectPointToCommentContainer>
                    </PointViewModal>
                </CommentButtonContainer>
            </CommentContainer>
        </CommentSectionWrapper>
    );
};


export default Comments;