import React from 'react';

import { useTranslation } from 'react-i18next';
import { userService, groupService } from '@services';

import {
    GroupHolderHeader,
    GroupHolderWrapper,
    RouteContainer,
    GroupButtonContainer,
    GroupOptionButton
} from './group-holder.style';

import { FeedContext } from '../../../../feed.component';
import { RouteCard } from '..';

const GroupHolder = ({ group }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = React.useState(false);
    const [routes, setRoutes] = React.useState([]);
    const [groupName, setGroupName] = React.useState("");
/*
    const onGroupClick = async props => {
        if (!loading) {
            setLoading(true);
            const loadedRoutes = await props.onFriendSelect(friend, routes);
            setRoutes(loadedRoutes);
            setLoading(false);
        }
    };*/

    //groupService.getAddressBookIndex(webId).then(addressBookIndex => setGroupName(addressBookIndex));
   //userService.getUserName(friend).then(name => setFriendName(name));

    return (
        <FeedContext.Consumer>
            {props => (
                <GroupHolderWrapper>
                    <GroupHolderHeader>
                        <span className="friend-title">{group.name}</span>
                    </GroupHolderHeader>
                </GroupHolderWrapper>
            )}
        </FeedContext.Consumer>
    );
};

export default GroupHolder;