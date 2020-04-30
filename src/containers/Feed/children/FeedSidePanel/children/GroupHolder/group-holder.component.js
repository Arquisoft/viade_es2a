import React from 'react';

import { useTranslation } from 'react-i18next';

import {
    GroupHolderHeader,
    GroupHolderWrapper,
    DetailsButton,
    ButtonContainer
} from './group-holder.style';

import { FeedContext } from '../../../../feed.component';

const GroupHolder = ({ group }) => {
    const { t } = useTranslation();

    return <FeedContext.Consumer>
        {props => (
            <GroupHolderWrapper selected={props.isSelectedGroup(group)}>
                <GroupHolderHeader onClick={() => props.onGroupSelected(group)}>
                    <span className="friend-title" id={"friend-title"} content={group.name}>{group.name}</span>
                </GroupHolderHeader>

                {props.isSelectedGroup(group) && <ButtonContainer>
                    <DetailsButton id={"details"} active={true} onClick={props.onGroupView}>
                        {t('groupholder.details')}
                    </DetailsButton>
                    <DetailsButton id={"edit"} active={true} onClick={props.groupEdition}>
                        {t('groupholder.edit')}
                    </DetailsButton>
                </ButtonContainer>}

            </GroupHolderWrapper>
        )}
    </FeedContext.Consumer>;
};

export default GroupHolder;