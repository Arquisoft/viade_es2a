import React from "react";

import {
  CommentSectionWrapper,
  ScrollPanelComments,
  CommentContainer,
  AddCommentText,
  CommentButtonContainer,
  AddCommentButton,
  SelectPointToCommentContainer,
} from "./comments.style";

import isLoading from "@hocs/isLoading";

import { commentService } from "@services";
import { useTranslation } from "react-i18next";

import { modal } from "@utils";

import { LocationMenu, Comment } from "./children";

import { RouteColor as colors } from "@constants";

const Comments = isLoading(({ webId, route, comments, setComments }) => {
  const [commentText, setCommentText] = React.useState("");
  const [selectedPointComment, setSelectedPointComment] = React.useState(null);

  const { t } = useTranslation();

  const onPointSelectComment = (index) => {
    const newPoint = selectedPointComment === index ? null : index;
    setSelectedPointComment(newPoint);
  };

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const postComment = async () => {
    const comment = {
      text: commentText,
      date: Date.now(),
      author: webId,
      waypoint: selectedPointComment,
    };
    setCommentText("");
    await commentService.postComment(comment, route);
    commentService.getComments(route).then((result) => {
      setComments(result);
    });
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
      selectedPointCommentColor +=
        (selectedPointComment % colors.length) + ".svg";
  }

  const noComments = !comments || !comments.length;

  return (
    <CommentSectionWrapper>
      <ScrollPanelComments noComments={noComments}>
        {noComments ? (
          <span className="no-comments">{t("route.no_comments")}</span>
        ) : (
          comments.map((comment, index) => (
            <Comment
              key={index}
              id={"comment-" + index}
              className="comment"
              {...{ route, comment }}
            />
          ))
        )}
      </ScrollPanelComments>

      <CommentContainer>
        <AddCommentText
          value={commentText}
          onChange={handleChange}
          placeholder={t("route.comment_placeholder")}
        />
        <CommentButtonContainer>
          <AddCommentButton
            disabled={!isThereAnyPoint}
            onClick={openPointView}
            title={
              isThereAnyPoint
                ? t("route.select_point")
                : t("route.there_are_no_points")
            }
          >
            <img src={selectedPointCommentColor} alt="Choose point" />
          </AddCommentButton>
          <AddCommentButton
            value={commentText}
            onClick={postComment}
            title="Comentar"
          >
            <img src="img/icon/send.svg" alt="Send message" />
          </AddCommentButton>
          <PointViewModal>
            <SelectPointToCommentContainer>
              <p>{t("route.select_point")}</p>
              <LocationMenu
                {...{ points, onPointSelectComment, selectedPointComment }}
              />
            </SelectPointToCommentContainer>
          </PointViewModal>
        </CommentButtonContainer>
      </CommentContainer>
    </CommentSectionWrapper>
  );
});

export default Comments;
