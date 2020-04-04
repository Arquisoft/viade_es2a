import React from "react";
import { Route, Link } from "react-router-dom";
import {
  useWebId,
  useNotification,
  AccessControlList
} from "@inrupt/solid-react-components";
import styled from "styled-components";
import { NavBar, AuthNavBar } from "@components";
import { LanguageDropdown } from "@util-components";
import { useTranslation } from "react-i18next";
import userService from "../../services/user-service";
import {
  errorToaster,
  storageHelper,
  permissionHelper,
  ldflexHelper
} from "@utils";
import data from "@solid/query-ldflex";
import { namedNode } from "@rdfjs/data-model";

const Container = styled.div`
  min-height: 100%;
  position: relative;
`;

export const UserContext = React.createContext();

const PublicLayout = props => {
  const webId = useWebId();
  const { component: Component, ...rest } = props;
  const { t, i18n } = useTranslation();
  const {
    createNotification,
    notifications,
    notification,
    createInbox
  } = useNotification(webId);
  const ComponentWrapper = styled(Component)`
    padding-bottom: 60px;
    height: 100%;
    padding-top: 60px;
  `;

  const init = async () => {
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

  init();
  return (
    <UserContext.Provider value={webId}>
      <Route
        {...rest}
        component={({ history, location, match }) => (
          <Container>
            {webId ? (
              <AuthNavBar {...{ history, location, match, webId }} />
            ) : (
              <NavBar
                {...{ history, location, match }}
                toolbar={[
                  {
                    component: () => <LanguageDropdown {...{ t, i18n }} />,
                    id: "language"
                  },
                  {
                    component: () => <Link to="/login">Login</Link>,
                    label: "authComponent",
                    id: "authComponent"
                  }
                ]}
              />
            )}
            <ComponentWrapper {...{ history, location, match }} />
          </Container>
        )}
      />
    </UserContext.Provider>
  );
};

export default PublicLayout;
