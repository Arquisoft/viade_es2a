import React from 'react';

import { useTranslation } from 'react-i18next';

import {
    GroupHolderHeader,
    GroupHolderWrapper,
    DetailsButton
} from './group-holder.style';

import { FeedContext } from '../../../../feed.component';

const GroupHolder = ({ group, onGroupSelected, setSelectedGroup }) => {
    const { t } = useTranslation();
    
    const [chosen, setChosen] = React.useState(false);

    const onDetails = () => {
        setSelectedGroup(group);
        onGroupSelected();
    }

    return (
        <FeedContext.Consumer>
            {props => (
                <GroupHolderWrapper>
                    <GroupHolderHeader onClick>
                        <span className="friend-title">{group.name}</span>
                    </GroupHolderHeader>
                    <DetailsButton onClick = { onDetails }>
                            {t('groupholder.details')}
                    </DetailsButton>
                </GroupHolderWrapper>
            )}
        </FeedContext.Consumer>
    );
};

export default GroupHolder;