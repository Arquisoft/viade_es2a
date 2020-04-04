import React, { useState } from 'react';

import {
  ShareRoutePanelHolder,
  ShareRouteHeader,
  ShareHolder,
  Button,
  ShareOptionsContainer
} from './share-route-panel.style';

import { successToaster, MobileCompatWrapper, ModalCloseButton } from '@utils';

import { useTranslation } from 'react-i18next';

import { friendService } from '@services';
import { useEffect } from 'react';

const ShareRoutePanel = ({ route, webId, onRouteShare, closeRouteSharing }) => {
  const { t } = useTranslation();

  const [targetID, setTargetID] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState(new Set());

  const onShareClick = async t => {
    const target = t && typeof (t) == 'object' ? [...t] : [t];
    await onRouteShare(route, target);
    successToaster('Shared');
  };

  const onFriendSelect = f => {
    if (selectedFriends.has(f))
      selectedFriends.delete(f);
    else
      selectedFriends.add(f);

    setSelectedFriends(new Set(selectedFriends));
  };

  useEffect(() => {
    (async () => setFriends(await friendService.findValidFriends(webId)))();
  }, [webId]);

  return (
    <MobileCompatWrapper>
      <ShareRoutePanelHolder>
        <ModalCloseButton onClick={closeRouteSharing} />
        <ShareRouteHeader>{`${t("route.share")} ${route.name}`}</ShareRouteHeader>

        <ShareOptionsContainer>

          <ShareHolder style={{ maxHeight: '50%' }}>
            <span className='share-title'>To a friend: </span>
            <div style={{ overflowY: 'auto' }}>
              <table>
                <tbody>
                  {friends ?
                    friends.map(f =>
                      <tr
                        key={f}
                        className={selectedFriends.has(f) ? 'selected' : ''}
                        onClick={() => onFriendSelect(f)}>
                        <td>{f}</td>
                      </tr>)
                    :
                    <span className='no-friends'>No friends</span>}
                </tbody>
              </table>
            </div>
            <Button
              style={{ margin: '1em 0 0' }}
              onClick={() => onShareClick(selectedFriends)}>{t("route.share")}</Button>
          </ShareHolder>

          <ShareHolder>
            <span className='share-title'>To a specific user: </span>
            <div style={{ display: 'flex' }}>
              <input
                type='text'
                onChange={e => setTargetID(e.target.value)}
                placeholder={t("friends.addWebID")}
              />
              <Button onClick={() => onShareClick(targetID)}>{t("route.share")}</Button>
            </div>
          </ShareHolder>

          <ShareHolder style={{ flexDirection: 'row', placeContent: 'center' }}>
            <span>To everyone: </span>
            <Button onClick={() => onShareClick(null)}>{t("route.share")}</Button>
          </ShareHolder>
        </ShareOptionsContainer>

      </ShareRoutePanelHolder>
    </MobileCompatWrapper >
  );
};

export default ShareRoutePanel;