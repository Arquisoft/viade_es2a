import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  withAuthorization,
  useNotification,
  AccessControlList
} from "@inrupt/solid-react-components";
import { AuthNavBar } from "@components";
import styled from "styled-components";
import userService from "../../services/user-service";
import {
  permissionHelper,
  ldflexHelper
} from "@utils";
import data from "@solid/query-ldflex";
import { namedNode } from "@rdfjs/data-model";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-top: 60px;
  flex: 1 0 auto;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
`;

const PrivateLayout = ({ routes, webId, location, history, ...rest }) => {
  const { createInbox } = useNotification(webId);
  const [inited, setInited] = React.useState(false);
  const { t } = useTranslation();
  const errorMessages = {
    message: t("appPermission.message"),
    title: t("notifications.error"),
    label: t("appPermission.link.label"),
    href: t("appPermission.link.href")
  };
  useEffect(() => {
    if (webId) {
      permissionHelper.checkPermissions(webId, errorMessages);
    }
  }, [webId]);

  const init = async () => {
    setInited(true);
    await userService.createInitialFiles(webId);

    const viadeUrl = await userService.getViadeStorage(webId);

    const settingsFilePath = `${viadeUrl}settings.ttl`;
    let inboxPath = `${viadeUrl}inbox/`;
    let hasInboxLink = false;

    const inboxLinkedPath = await ldflexHelper.getLinkedInbox(settingsFilePath);
    if (inboxLinkedPath) {
      inboxPath = inboxLinkedPath;
      hasInboxLink = true;
    }

    // First, check if we have WRITE permission for the app
    const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
      webId,
      AccessControlList.MODES.WRITE
    );
    // If so, try to create the inbox. No point in trying to create it if we don't have permissions
    if (hasWritePermission) {
      await createInbox(inboxPath, viadeUrl);

      // Check for CONTROL permissions to see if we can set permissions or not
      const hasControlPermissions = await permissionHelper.checkSpecificAppPermission(
        webId,
        AccessControlList.MODES.CONTROL
      );

      // If the user has Write and Control permissions, check the inbox settings
      if (hasControlPermissions) {
        // Check if the inbox permissions are set to APPEND for public, and if not fix the issue
        await permissionHelper.checkOrSetInboxAppendPermissions(
          inboxPath,
          webId
        );
      }

      if (!hasInboxLink) {
        await data[settingsFilePath].inbox.set(namedNode(inboxPath));
      }
    }
  };

  if (!inited) init();
  return (
    <React.Fragment>
      <Container>
        <Route
          {...rest}
          component={({ history }) => (
            <Content className="contentApp">
              <AuthNavBar {...{ location, webId, history }} />
              <Switch>
                {routes.map(route => {
                  const { component: RouteComponent } = route;
                  return (
                    <Route
                      key={route.id}
                      path={route.path}
                      render={routerProps => (
                        <RouteComponent {...routerProps} webId={webId} />
                      )}
                      webId={webId}
                      exact
                    />
                  );
                })}
                <Redirect to="/404" />
              </Switch>
            </Content>
          )}
        />
      </Container>
    </React.Fragment>
  );
};

export default withAuthorization(PrivateLayout);
