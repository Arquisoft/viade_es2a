import React, { useState } from "react";

import { RouteMapPageContent } from "@components";
import isLoading from "@hocs/isLoading";

import {
  FriendsWrapper,
  FriendsGeneralCard,
  FriendsAddCard,
  FriendsSeeMore,
  LineSpanDiv,
  Button,
  FriendsAndGroups
} from "./friends.style";

import { Container, Row, Col } from "react-awesome-styled-grid";
import { useTranslation } from "react-i18next";

import { routeService, friendService } from '@services';

import { errorToaster } from '@utils';

export const FriendsPageContent = isLoading(props => {
  const { webId, friends, fetchFriends } = props;

  const { t } = useTranslation();

  const [textField, setTextField] = useState("");
  const [defaultView, setView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState([]);

  const handleChange = event => {
    setTextField(event.target.value);
  };

  const addFriend = async () => {
    if (await friendService.exists(textField)) {
      await friendService.addFriend(webId, textField);
      await fetchFriends();
    } else
      errorToaster('User does not exist', 'Error')
  };

  const deleteFriend = async friend => {
    await friendService.deleteFriend(webId, friend);
    await fetchFriends();
  };

  const fetchRoutes = async friend => {
    setIsLoading(true);

    let routes = await routeService.getTimelineRoutes([friend], webId);
    let loaded = routes.length;

    if (!loaded)
      errorToaster('This user has not public routes', 'Error')
    else
      setRoutes(routes);

    setIsLoading(false);
    setView(!loaded);
  };

  return defaultView ? (
    <FriendsWrapper data-testid="friendswrapper">
      <FriendsAddCard>
        <LineSpanDiv>
          <span>{t("friends.add")}</span>
          <span>
            {" "}
            <input
              onChange={handleChange}
              type="text"
              id="id_friendsUser"
              name="friendsUser"
              size="50"
              placeholder={t("friends.addWebID")}
            />{" "}
          </span>
          <span>
            {" "}
            <Button onClick={addFriend}>{t("friends.addButton")}</Button>{" "}
          </span>
        </LineSpanDiv>
      </FriendsAddCard>

      <FriendsAndGroups>

        <FriendsGeneralCard >
          <span>{t("friends.friends")}</span>
          <Container>
            <Row>
              {friends.map(f => {
                return (
                  <Col key={f}>
                    {f}
                    <FriendsSeeMore>
                      <button onClick={() => fetchRoutes(f)}>
                        {t("friends.seeRoutes")}
                      </button>
                      <button onClick={() => deleteFriend(f)}>
                        Delete
                    </button>
                    </FriendsSeeMore>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </FriendsGeneralCard>

        <FriendsGeneralCard >
          <span>Your Groups</span>
          <Container>
            <Row>
              {friends.map(f => {
                return (
                  <Col key={f}>
                    {f}
                    <FriendsSeeMore>
                      <button onClick={() => fetchRoutes(f)}>
                        {t("friends.seeRoutes")}
                      </button>
                      <button onClick={() => deleteFriend(f)}>
                        Delete
                    </button>
                    </FriendsSeeMore>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </FriendsGeneralCard>
      </FriendsAndGroups>
    </FriendsWrapper>
  ) : (
      <RouteMapPageContent isLoading={isLoading} routes={routes} />
    );
});
