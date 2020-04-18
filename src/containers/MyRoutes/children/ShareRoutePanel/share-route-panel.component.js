import React, { useState, useEffect } from "react";

import {
  ShareRoutePanelHolder,
  ShareRouteHeader,
  ShareHolder,
  Button,
  ShareOptionsContainer
} from "./share-route-panel.style";

import { successToaster, MobileCompatWrapper, ModalCloseButton } from "@utils";
import { useTranslation } from "react-i18next";

import { friendService, userService } from "@services";

const ShareRoutePanel = ({
  route,
  webId,
  onRouteShare,
  onRouteDeshare,
  closeRouteSharing,
  sendShareNotification
}) => {
  const { t } = useTranslation();

  const [targetID, setTargetID] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState(new Set());

  const onShareClick = async tr => {
    const target = tr && typeof tr == "object" ? [...tr] : [tr];
    await onRouteShare(route, target);
    successToaster(t("route.share_success"));
    target.forEach(oneTarget => {
      sendShareNotification(webId, oneTarget);
    });
  };

  const onDeshareClick = async () => {
    await onRouteDeshare(route);
    successToaster(t("route.deshare_success"));
  };

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

  return (
    <MobileCompatWrapper>
      <ShareRoutePanelHolder>
        <ModalCloseButton onClick={closeRouteSharing} />
        <ShareRouteHeader>{`${t("route.share")} ${
          route.name
          }`}</ShareRouteHeader>

        <ShareOptionsContainer>
          <ShareHolder style={{ maxHeight: "50%" }}>
            <span className="share-title">{t("route.share_friend")}</span>
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
            <Button
              style={{ margin: "1em 0 0" }}
              onClick={() => onShareClick(selectedFriends)}
            >
              {t("route.share")}
            </Button>
          </ShareHolder>

          <ShareHolder>
            <span className="share-title">{t("route.share_user")}</span>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                onChange={e => setTargetID(e.target.value)}
                placeholder={t("route.share_target")}
              />
              <Button onClick={() => onShareClick(targetID)}>
                {t("route.share")}
              </Button>
            </div>
          </ShareHolder>

          <ShareHolder style={{ flexDirection: "row", placeContent: "center" }}>
            <span>{t("route.share_everyone")}</span>
            <Button onClick={() => onShareClick(null)}>
              {t("route.share")}
            </Button>
          </ShareHolder>

          <ShareHolder>
            <Button className="deshare" onClick={onDeshareClick}>
              {t("route.deshare")}
            </Button>
          </ShareHolder>
        </ShareOptionsContainer>
      </ShareRoutePanelHolder>
    </MobileCompatWrapper>
  );
};

export default ShareRoutePanel;
