import data from '@solid/query-ldflex';
import { AccessControlList } from '@inrupt/solid-react-components';
import { resourceExists, createDoc } from './ldflex-helper';
import { storageHelper, errorToaster, permissionHelper } from '@utils';

import auth from 'solid-auth-client';
import FileClient from 'solid-file-client';

const appPath = process.env.REACT_APP_ROUTES_PRIVATE_PATH;

const buildPathFromWebId = (webId, path) => {
  if (!webId) return false;
  const domain = new URL(typeof webId === 'object' ? webId.webId : webId).origin;
  return `${domain}/${path}`;
};

export const getPrivateRouteStorage = async webId => {
  const podStoragePath = await data[webId].storage;
  let podStoragePathValue =
    podStoragePath && podStoragePath.value.trim().length > 0 ? podStoragePath.value : '';

  // Make sure that the path ends in a / so it is recognized as a folder path
  if (podStoragePathValue && !podStoragePathValue.endsWith('/')) {
    podStoragePathValue = `${podStoragePathValue}/`;
  }

  // If there is no storage value from the pod, use webId as the backup, and append the application path from env
  if (!podStoragePathValue || podStoragePathValue.trim().length === 0) {
    return buildPathFromWebId(webId, appPath);
  }

  return `${podStoragePathValue}${appPath}`;
};

/**
 *  Check and create the initial app files and folders
 * @param folderPath
 * @returns {Promise<boolean>} Returns whether or not there were any errors during the creation process
 */
export const createInitialFiles = async webId => {
  return await tryOperation(async client => {
    const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
      webId,
      AccessControlList.MODES.WRITE
    );

    if (!hasWritePermission) return;

    const routesUrl = await getPrivateRouteStorage(webId);

    const routesFolderExists = await resourceExists(routesUrl);
    if (!routesFolderExists) {
      await createDoc(data, {
        method: 'PUT',
        headers: {
          'Content-Type': 'text/turtle'
        }
      });
    }

    return true;
  });
};

export const saveRoute = async (webId, route) => {
  return await tryOperation(async client => {
    await client.createFile(await getRouteURL(webId, route.id), JSON.stringify(route), "application/ld+json");
    return true;
  });
};

export const findAllRoutes = async webId => {
  return await tryOperation(async client => {
    return (await Promise.all((await client.readFolder(await getPrivateRouteStorage(webId)))
      .files.map(f => client.readFile(f.url)))).filter(x => x).map(r => parseRoute(r));
  });
};

export const readRoute = async (webId, routeId) => {
  return await tryOperation(async client => {
    return parseRoute(await client.readFile(await getRouteURL(webId, routeId)));
  });
};

export const readRouteURL = async routeUrl => {
  return await tryOperation(async client => parseRoute(await client.readFile(routeUrl)));
};

export const deleteRoute = async (webId, routeId) => {
  return await tryOperation(async client => await client.deleteFile(await getRouteURL(webId, routeId)));
};

export const existsRoute = async (webId, routeId) => {
  return await tryOperation(async client => await client.itemExists(await getRouteURL(webId, routeId)));
};

export const getRouteURL = async (webId, routeId) => {
  const routesUrl = await getPrivateRouteStorage(webId);
  return `${routesUrl}${routeId}.jsonld`;
};

const tryOperation = async operation => {
  try {
    return await operation(await getFileClient());
  } catch (error) {
    errorToaster(error.message, 'Error');
    console.log(error);
    return false;
  }
};

const getFileClient = async () => {
  const fileClient = new FileClient(auth);
  let session = await auth.currentSession()
  if (!session)
    session = await auth.login()

  return fileClient;
}

const parseRoute = string => {
  try {
    return JSON.parse(string);
  } catch (err) {
    return null;
  }
};