import { AccessControlList, AppPermission } from '@inrupt/solid-react-components';
import { errorToaster } from '@utils';

const checkAppPermissions = (userAppPermissions, appPermissions) =>
  appPermissions.every(permission => userAppPermissions.includes(permission));

export const checkSpecificAppPermission = async (webId, permission) => {
  const userAppPermissions = await AppPermission.checkPermissions(webId);
  return userAppPermissions.permissions.includes(permission);
};

export const checkPermissions = async (webId, errorMessage) => {

  const userApp = await AppPermission.checkPermissions(webId);

  const permissions = AccessControlList.MODES;
  const { APPEND, READ, WRITE, CONTROL } = permissions;

  if (
    userApp === null ||
    userApp.permissions === null ||
    !checkAppPermissions(userApp.permissions, [APPEND, READ, WRITE, CONTROL])
  ) {
    errorToaster(errorMessage.message, errorMessage.title, {
      label: errorMessage.label,
      href: errorMessage.href
    });
  }
};

export const checkOrSetInboxAppendPermissions = async (inboxPath, webId) => {

  const inboxAcls = new AccessControlList(webId, inboxPath);
  const permissions = await inboxAcls.getPermissions();
  const inboxPublicPermissions = permissions.filter(perm => perm.agents === null);

  const appendPermission = inboxPublicPermissions.filter(perm =>
    perm.modes.includes(AccessControlList.MODES.APPEND)
  );

  if (appendPermission.length <= 0) {
    try {
      const permissions = [
        {
          agents: null,
          modes: [AccessControlList.MODES.APPEND]
        }
      ];
      const ACLFile = new AccessControlList(webId, inboxPath);
      await ACLFile.createACL(permissions);
    } catch (error) {
      throw error;
    }
  }

  return true;
};
