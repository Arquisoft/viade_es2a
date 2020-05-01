import React, { useState, useEffect } from 'react';

import { GroupFieldsWrapper, GroupFieldsFriends } from './group-fields.style';
import { InputCard, Button } from '../../../../feed-addition-panel.style';

import { useTranslation } from 'react-i18next';

import { friendService, userService } from "@services";

const GroupFields = ({ onSave, onError, webId }) => {

    const { t } = useTranslation();

    const [friends, setFriends] = useState([]);

    const [name, setName] = useState('');
    const [selectedFriends, setSelectedFriends] = useState(new Set());

    const onSaveButton = () => {
        if (!name) {
            onError(t('groupcreation.no_name'));
            return;
        }

        if (!selectedFriends || !selectedFriends.size) {
            onError(t('groupcreation.no_member'));
            return;
        }

        onSave(name, [...selectedFriends]);
    };

    const onFriendSelect = f => {
        if (selectedFriends.has(f))
            selectedFriends.delete(f);
        else
            selectedFriends.add(f);

        setSelectedFriends(new Set(selectedFriends));
    };

    useEffect(() => {
        (async () => {
            setFriends(await Promise.all((await friendService.findValidFriends(webId)).map(async f => {
                return await userService.getProfile(f);
            })));
        })();
    }, [webId]);

    return <GroupFieldsWrapper>
        <InputCard>
            <input
                name='group-name-field'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t('groupcreation.name')} />
        </InputCard>

        <GroupFieldsFriends style={{ maxHeight: "50%" }}>
            <span className="share-title">{t('groupcreator.friends')}</span>
            <div style={{ overflowY: "auto" }}>
                <table>
                    <tbody>
                        {friends && friends.length ? (
                            friends.map(({ name, image, webId }, i) => (<tr
                                key={webId}
                                className={selectedFriends.has(webId) ? "selected" : ""}
                                onClick={() => onFriendSelect(webId)}
                            >
                                <td id={"select-friend-" + name}>
                                    <img src={image} alt={'profile'} />
                                    <span id={"friend" + i} content={name}>{name}</span>
                                </td>
                            </tr>
                            ))
                        ) : (
                                <span className="no-friends">{t("feed.no_friends")}</span>
                            )}
                    </tbody>
                </table>
            </div>
        </GroupFieldsFriends>

        <InputCard>
            <Button name='saveGroup' style={{ width: '100%' }} onClick={onSaveButton}>{t('groupcreation.create')}</Button>
        </InputCard>
    </GroupFieldsWrapper>;
};

export default GroupFields;