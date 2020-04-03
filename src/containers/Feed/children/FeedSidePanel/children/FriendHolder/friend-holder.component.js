import React from 'react';

import { useTranslation } from 'react-i18next';
import { userService } from '@services';

import {
    FriendHolderHeader,
    FriendHolderWrapper,
    RouteContainer,
    FriendButtonContainer,
    FriendOptionButton
} from './friend-holder.style';

import { FeedContext } from '../../../../feed.component';
import { RouteCard } from '..';

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
                !props.isDeletedFriend(friend) &&
                <FriendHolderWrapper selected={props.isSelectedFriend(friend)}>
                    <FriendHolderHeader onClick={() => onFriendClick(props)}>
                        <span className="friend-title">{friendName}</span>
                    </FriendHolderHeader>

                    {!loading && props.isSelectedFriend(friend) && (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <FriendButtonContainer>
                                <FriendOptionButton onClick={() => props.deleteFriend(friend, routes)}>
                                    {t('friends.delete')}
                                </FriendOptionButton>
                                <FriendOptionButton onClick={() => window.open(friend, '_blank')}>
                                    {t('friends.profile')}
                                </FriendOptionButton>
                            </FriendButtonContainer>

                            {routes.length ?
                                <RouteContainer>
                                    {routes.map(route => <RouteCard key={route.id} {... { route }} />)}
                                </RouteContainer>
                                :
                                <span className="no-routes">{t('feed.no_routes')}</span>
                            }
                        </div>
                    )}

                    {loading && <span className="loading">{t('feed.loading')}</span>}
                </FriendHolderWrapper>
            )}
        </FeedContext.Consumer>
    );
};

export default FriendHolder;