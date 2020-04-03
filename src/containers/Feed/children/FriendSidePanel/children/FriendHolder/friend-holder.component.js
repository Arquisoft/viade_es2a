import React from 'react';

import { useTranslation } from 'react-i18next';
import { userService } from '@services';

import {
    FriendHolderHeader,
    FriendHolderWrapper,
    RouteContainer
} from './friend-holder.style';

import { FeedContext } from '../../../../feed.component';
import { RouteCard} from '../.';

const FriendHolder = ({ friend }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = React.useState(false);
    const [routes, setRoutes] = React.useState([]);
    const [friendName, setFriendName] = React.useState("");

    const onFriendClick = async props => {
        if (!loading) {
            setLoading(true);
            const loadedRoutes = await props.onFriendSelect(friend, routes);
            setRoutes(loadedRoutes);
            setLoading(false);
        }
    };

    userService.getUserName(friend).then(name => setFriendName(name));

    return (
        <FeedContext.Consumer>
            {props => (
                !props.isDeletedFriend(friend) && <FriendHolderWrapper selected={props.isSelectedFriend(friend)}>
                    <FriendHolderHeader onClick={() => onFriendClick(props)}>
                        <span className="friend-title">{friendName}</span>

                    </FriendHolderHeader>

                    {!loading && props.isSelectedFriend(friend) && (
                        routes.length ?
                            <RouteContainer>
                                {routes.map(route => {
                                    return <RouteCard key={route.id} {... { route }} />;
                                })}
                            </RouteContainer>
                            :
                            <span className="no-routes">{t('feed.no_routes')}</span>)
                    }

                    {loading && <span className="loading">{t('feed.loading')}</span>}
                </FriendHolderWrapper>
            )}
        </FeedContext.Consumer>
    );
};

export default FriendHolder;