import React, { useState, useEffect } from 'react';

import { EditFieldsWrapper, EditFieldsFriends } from './edit-fields.style';
import { InputCard, Button } from '../../FeedAdditionPanel/feed-addition-panel.style'

import { useTranslation } from 'react-i18next';

import { friendService, userService, groupService } from "@services";

import { successToaster } from '@utils';

const EditFields = ({
    onEdit,
    onError,
    webId,
    selectedGroup,
    onGroupDeletion
}) => {

    const { t } = useTranslation();

    const [name, setName] = useState();
    const [nameChanged, setNameChanged] = useState(false);

    const [oldMembers, setOldMembers] = useState(new Set());
    const [selectedOldMembers, setSelectedOldMembers] = useState(new Set());

    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState(new Set());

    const onSaveButton = async () => {
        if (!oldMembers || !oldMembers.size) {
            onError(t('groupcreation.no_member'));
            return;
        }

        const members = [...oldMembers].map(u => u.webId);
        if (nameChanged)
            onEdit(name, members);
        else
            onEdit(selectedGroup.name, members);
    };

    const onDeleteButton = async () => {
        const aux = selectedGroup.name;
        await groupService.deleteGroup(selectedGroup.id);
        successToaster(aux + t('groupviewer.deletion_content'), t('groupviewer.deletion_title'));
        onGroupDeletion();
    };

    const onDeleteMember = () => {
        setOldMembers(new Set([...oldMembers].filter(u => !selectedOldMembers.has(u.webId))));
        setSelectedOldMembers(new Set());
        successToaster("Member succesfully removed", t('groupeditor.edition_title'));
    }

    const onAddMembers = () => {
        const oldArray = [...oldMembers];
        const aux = [];

        selectedFriends.forEach(sf => {
            if (!oldArray.filter(m => sf.webId === m.webId).length)
                aux.push(sf);
        });

        setOldMembers(new Set([...oldMembers, ...aux]));
        setSelectedFriends(new Set());
        successToaster(t('groupcreator.friend_content'), t('groupcreator.friend_title'));
    }

    const onFriendSelect = f => {
        if (selectedFriends.has(f))
            selectedFriends.delete(f);
        else
            selectedFriends.add(f);

        setSelectedFriends(new Set(selectedFriends));
    };

    const onMemberSelect = f => {
        if (selectedOldMembers.has(f))
            selectedOldMembers.delete(f);
        else
            selectedOldMembers.add(f);

        setSelectedOldMembers(new Set(selectedOldMembers));
    };

    useEffect(() => {
        (async () => setFriends(await Promise.all((await friendService.findValidFriends(webId)).map(async f => {
            return await userService.getProfile(f);
        }))))();

        (async () => setOldMembers(new Set(await Promise.all(selectedGroup.members.map(async u => {
            return await userService.getProfile(u);
        })))))();
    }, [webId]);

    return <EditFieldsWrapper>
        <InputCard>
            <input
                id='new-name-field'
                type='text'
                value={name}
                onChange={e => { setName(e.target.value); setNameChanged(true); }}
                placeholder={selectedGroup.name} />
        </InputCard>

        <EditFieldsFriends style={{ maxHeight: "50%" }}>
            <span className="share-title">{t('groupeditor.members')}</span>
            <span>{t('groupeditor.checkbox')}</span>
            <div style={{ overflowY: "auto" }}>
                <table>
                    <tbody>
                        {[...oldMembers].map(({ name, image, webId, i }) => <tr
                            id={"checkbox-" + webId}
                            key={webId}
                            className={selectedOldMembers.has(webId) ? "selected" : ""}
                            onClick={() => onMemberSelect(webId)}
                        >
                            <td id={"name" + i}>
                                <img src={image} alt={'profile'} />
                                <span>{name}</span>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <Button id='delete-group-member' style={{ margin: "1em 0 0" }} onClick={() => onDeleteMember()}>
                {t('groupeditor.delete')}
            </Button>
        </EditFieldsFriends>

        <EditFieldsFriends style={{ maxHeight: "50%" }}>
            <span className="share-title">{t('groupcreator.friends')}</span>
            <div style={{ overflowY: "auto" }}>
                <table>
                    <tbody>
                        {friends && friends.length ? (
                            friends.map((f, i) => (<tr
                                key={f.webId}
                                className={selectedFriends.has(f) ? "selected" : ""}
                                onClick={() => onFriendSelect(f)}
                            >
                                <td id={"name" + i}>
                                    <img src={f.image} alt={'profile'} />
                                    <span>{f.name}</span>
                                </td>
                            </tr>
                            ))
                        ) : (
                                <span className="no-friends">{t("feed.no_friends")}</span>
                            )}
                    </tbody>
                </table>
            </div>
            <Button style={{ margin: "1em 0 0" }} onClick={() => onAddMembers(selectedFriends)}>
                {t('groupcreation.add_button')}
            </Button>
        </EditFieldsFriends>

        <InputCard>
            <Button id="save-edit-button" style={{ width: '100%' }} onClick={onSaveButton}>{t('groupeditor.save')}</Button>
            <Button id={"delete-group"} className="danger" style={{ width: '100%' }} onClick={onDeleteButton}>{t('groupviewer.delete')}</Button>
        </InputCard>
    </EditFieldsWrapper>;
};

export default EditFields;