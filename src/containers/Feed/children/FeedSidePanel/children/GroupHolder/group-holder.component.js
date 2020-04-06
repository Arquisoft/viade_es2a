import React from 'react';

import { useTranslation } from 'react-i18next';
import { userService, groupService } from '@services';

import {
    GroupHolderHeader,
    GroupHolderWrapper,
    DetailsButton
} from './group-holder.style';

import { FeedContext } from '../../../../feed.component';

const GroupHolder = ({ group }) => {
    const { t } = useTranslation();

    const onGroupSelected = () => {
        //openGroupView();
    }

    return (
        <FeedContext.Consumer>
            {props => (
                <GroupHolderWrapper>
                    <GroupHolderHeader>
                        <span className="friend-title">{group.name}</span>
                    </GroupHolderHeader>
                    <DetailsButton onClick = { onGroupSelected() }>
                            {'See details'}
                    </DetailsButton>
                </GroupHolderWrapper>
            )}
        </FeedContext.Consumer>
    );
};

export default GroupHolder;