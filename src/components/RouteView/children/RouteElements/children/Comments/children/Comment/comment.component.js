import React from "react";

import {
    CommentWrapper,
    TextContainer
} from "./comment.style";

import { userService } from "@services";

const Comment = ({ route, comment }) => {
    const [selected, setSelected] = React.useState(false);
    const [profile, setProfile] = React.useState({ name: comment.author });

    userService.getProfile(comment.author).then(profile => setProfile(profile));

    const waypoint = comment.waypoint >= 0 && comment.waypoint < route.waypoints.length
        ? route.waypoints[comment.waypoint] : null;
    const color = waypoint ? waypoint.color.hexCode : null;

    return <CommentWrapper
        color={color}
        selected={selected}
        onClick={() => setSelected(!selected)}>

        <img src={profile.image} alt={'profile'} />

        <TextContainer>
            <span className="user-title">{profile.name}</span>
            {waypoint &&
                <span className="waypoint-name">
                    {waypoint.name}
                </span>
            }
            <span className="content">{comment.text}</span>
        </TextContainer>
    </CommentWrapper>;
};


export default Comment;