import React, { useState, useEffect } from 'react';

import { EditFieldsWrapper, EditFieldsFriends, MemberLine } from './edit-fields.style';
import { InputCard, Button } from '../../FeedAdditionPanel/feed-addition-panel.style'

import { useTranslation } from 'react-i18next';

import { friendService, userService } from "@services";

const EditFields = ({ onEdit, onAddMember, onError, onSuccess, webId, selectedGroup }) => {

    const { t } = useTranslation();

    const [name, setName] = useState();
    const [newMember, setNewMember] = useState('');
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState(new Set());
    const [nameChanged, setNameChanged] = useState(false);

    const onSaveButton = async () => {
        await onAddMember(selectedGroup.members);
        if (nameChanged) {
            onEdit({ name });
        } else {
            onEdit(selectedGroup.name);
        }
    };

    const onAddButton = () => {
        if (newMember) {
            onAddMember({ newMember });
            onSuccess();
        }            
        else
            onError(t('groupcreation.no_member'));
    }

    const onSaveMultiple = async () => {
        console.log("Guardar multiple");
        await onAddMember([...selectedFriends]);
        onSuccess();
    }

    const onFriendSelect = f => {
        if (selectedFriends.has(f)) selectedFriends.delete(f);
        else selectedFriends.add(f);
    
        setSelectedFriends(new Set(selectedFriends));
      };

    useEffect(() => {
    (async () => setFriends(await Promise.all((await friendService.findValidFriends(webId)).map(async f => {
        return await userService.getProfile(f);
    }))))();
    }, [webId]);

    return <EditFieldsWrapper>
        <InputCard>
            <input
                type='text'
                value={name}
                onChange={e => { setName(e.target.value); setNameChanged(true); } }
                placeholder={selectedGroup.name} />
        </InputCard>

        <EditFieldsFriends style={{ maxHeight: "50%" }}>
            <span className="share-title">{"Members already in"}</span>
            <div style={{ overflowY: "auto" }}>
            <table>
                <tbody>
                {selectedGroup.members ? 
                    selectedGroup.members.map(member => { return <MemberLine>{member}</MemberLine>
                 }) : 'null'}
                </tbody>
            </table>
            </div>
        </EditFieldsFriends>

        <EditFieldsFriends style={{ maxHeight: "50%" }}>
            <span className="share-title">{"Friends"}</span>
            <div style={{ overflowY: "auto" }}>
            <table>
                <tbody>
                {friends ? (
                    friends.map(({ name, image, webId }) => (<tr
                    key={webId}
                    className={selectedFriends.has(webId) ? "selected" : ""}
                    onClick={() => onFriendSelect(webId)}
                    >
                    <td>
                        <img src={image} alt={'profile'} />
                        <span>{name}</span>
                    </td>
                    </tr>
                    ))
                ) : (
                    <span className="no-friends">{t("feed.no_friends")}</span>
                    )}
                </tbody>
            </table>
            </div>
            <Button style={{ margin: "1em 0 0" }} onClick={() => onSaveMultiple(selectedFriends)}>
                {"Añadir"}
            </Button>
        </EditFieldsFriends>

        <InputCard>
            <input
                type='text'
                value={newMember}
                onChange={e => setNewMember(e.target.value)}
                placeholder={t('groupcreation.add_member')} />

            <Button onClick={onAddButton}>{t('groupcreation.add_button')}</Button>
        </InputCard>

        <InputCard>
            <Button onClick={onSaveButton}>{t('groupcreation.create')}</Button>
        </InputCard>
    </EditFieldsWrapper>;
};

export default EditFields;