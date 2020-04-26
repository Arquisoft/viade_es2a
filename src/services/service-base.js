import data from "@solid/query-ldflex";
import { AccessControlList } from "@inrupt/solid-react-components";
import { permissionHelper } from "@utils";
import { createDoc, createDocument } from "../utils/ldflex-helper";

import auth from "solid-auth-client";
import FileClient from "solid-file-client";

const PATH_BASE = process.env.REACT_APP_VIADE_PATH_BASE;
const ROUTES_PATH = PATH_BASE + process.env.REACT_APP_ROUTES_PATH;
const GROUPS_PATH = PATH_BASE + process.env.REACT_APP_GROUPS_PATH;
const COMMENTS_PATH = PATH_BASE + process.env.REACT_APP_COMMENTS_PATH;
const INBOX_PATH = PATH_BASE + process.env.REACT_APP_INBOX_PATH;
const MULTIMEDIA_PATH = PATH_BASE + process.env.REACT_APP_MULTIMEDIA_PATH;
const SHARED_PATH = PATH_BASE + "shared/";
const PARSED_NOTIFICATIONS_PATH = PATH_BASE + "parsedNotifications.json";

export default class ServiceBase {
  buildPathFromWebId(webId, path) {
    if (!webId) return false;
    const domain = new URL(typeof webId === "object" ? webId.webId : webId)
      .origin;
    return `${domain}/${path}`;
  }

  async getStorage(webId, path) {
    const podStoragePath = await data[webId].storage;
    let podStoragePathValue =
      podStoragePath && podStoragePath.value.trim().length > 0
        ? podStoragePath.value
        : "";

    if (podStoragePathValue && !podStoragePathValue.endsWith("/"))
      podStoragePathValue = `${podStoragePathValue}/`;

    if (!podStoragePathValue || podStoragePathValue.trim().length === 0)
      return this.buildPathFromWebId(webId, path);

    return `${podStoragePathValue}${path}`;
  }

  async hasACL(client, uri) {
    return await client.itemExists(`${uri}.acl`);
  }

  async getRouteStorage(webId) {
    return await this.getStorage(webId, ROUTES_PATH);
  }

  async getGroupStorage(webId) {
    return await this.getStorage(webId, GROUPS_PATH);
  }

  async getCommentStorage(webId) {
    return await this.getStorage(webId, COMMENTS_PATH);
  }

  async getViadeStorage(webId) {
    return await this.getStorage(webId, PATH_BASE);
  }

  async getInboxStorage(webId) {
    return await this.getStorage(webId, INBOX_PATH);
  }

  async getMultimediaStorage(webId) {
    return await this.getStorage(webId, MULTIMEDIA_PATH);
  }

  async getSharedStorage(webId) {
    return await this.getStorage(webId, SHARED_PATH);
  }

  async getParsedNotificationStorage(webId) {
    return await this.getStorage(webId, PARSED_NOTIFICATIONS_PATH);
  }

  async createInitialFiles(webId) {
    return await this.tryOperation(async (client) => {
      const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
        webId,
        AccessControlList.MODES.WRITE
      );

      if (!hasWritePermission) return;

      const viadeUrl = await this.getViadeStorage(webId);
      const routesUrl = await this.getRouteStorage(webId);
      const groupsUrl = await this.getGroupStorage(webId);
      const commentsUrl = await this.getCommentStorage(webId);
      const settingsFileUrl = `${viadeUrl}settings.ttl`;
      const multimediaUrl = await this.getMultimediaStorage(webId);
      const sharedUrl = await this.getSharedStorage(webId);
      const parsedNotificationsUrl = await this.getParsedNotificationStorage(
        webId
      );

      const viadeDirExists = await client.itemExists(viadeUrl);
      const routesDirExists = await client.itemExists(routesUrl);
      const groupsDirExists = await client.itemExists(groupsUrl);
      const commentsDirExists = await client.itemExists(commentsUrl);
      const multimediaDirExists = await client.itemExists(multimediaUrl);
      const sharedDirExists = await client.itemExists(sharedUrl);
      const parsedNotificationsExists = await client.itemExists(
        parsedNotificationsUrl
      );

      if (!viadeDirExists) {
        await createDoc(data, {
          method: "PUT",
          headers: {
            "Content-Type": "text/turtle",
          },
        });
      }

      const settingsFileExists = await client.itemExists(settingsFileUrl);
      if (!settingsFileExists) {
        await createDocument(settingsFileUrl);
      }

      if (!routesDirExists) await client.createFolder(routesUrl);

      if (!groupsDirExists) await client.createFolder(groupsUrl);

      if (!commentsDirExists)
        await client.createFolder(commentsUrl, { createPath: true });

      if (!multimediaDirExists) await client.createFolder(multimediaUrl);

      if (!sharedDirExists) await client.createFolder(sharedUrl);

      if (!parsedNotificationsExists)
        await client.createFile(
          parsedNotificationsUrl,
          JSON.stringify([]),
          "application/json"
        );

      const settingsPermissions = [
        { agents: null, modes: [AccessControlList.MODES.READ] },
      ];
      this.appendPermissions(
        client,
        webId,
        settingsFileUrl,
        settingsPermissions
      );

      return true;
    });
  }

  async existsResource(path) {
    return await this.tryOperation(
      async (client) => await client.itemExists(path)
    );
  }

  async canRead(path) {
    const client = await this.getFileClient();
    try {
      return await client.itemExists(path);
    } catch (error) {
      return false;
    }
  }

  async tryOperation(operation, onError) {
    try {
      return await operation(await this.getFileClient());
    } catch (error) {
      console.error(error);
      if (onError) onError();
      return false;
    }
  }

  async getFileClient() {
    const fileClient = new FileClient(auth);
    let session = await auth.currentSession();
    if (!session) session = await auth.login();

    return fileClient;
  }

  async appendPermissions(client, webId, uri, permissions, reset = false) {
    const ACLFile = new AccessControlList(webId, uri);

    if (!reset && (await this.hasACL(client, uri)))
      await ACLFile.assignPermissions(permissions);
    else await ACLFile.createACL(permissions);
  }

  async removePermissions(client, webId, uri, permissions, remove = false) {
    const ACLFile = new AccessControlList(webId, uri);

    if (await this.hasACL(client, uri)) {
      if (!remove) await ACLFile.removePermissions(permissions);
      else await ACLFile.deleteACL(permissions);
    }
  }

  async getPermissions(client, webId, uri) {
    const ACLFile = new AccessControlList(webId, uri);

    if (await this.hasACL(client, uri))
      return await ACLFile.getPermissions();
  }
}
