import React from 'react';

import { useTranslation } from 'react-i18next';

import {
    GroupHolderHeader,
    GroupHolderWrapper,
    DetailsButton
} from './group-holder.style';

import { FeedContext } from '../../../../feed.component';

const GroupHolder = ({ group }) => {
    const { t } = useTranslation();

    return <FeedContext.Consumer>
        {props => (
            <GroupHolderWrapper>
                <GroupHolderHeader onClick={() => props.onGroupSelected(group)}>
                    <span className="friend-title">{group.name}</span>
                </GroupHolderHeader>
                <DetailsButton onClick={props.onGroupView}>
                    {t('groupholder.details')}
                </DetailsButton>
            </GroupHolderWrapper>
        )}
    </FeedContext.Consumer>;
};

export default GroupHolder;