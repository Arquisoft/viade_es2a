import data from '@solid/query-ldflex';
import { AccessControlList } from '@inrupt/solid-react-components';
import { resourceExists, createDoc, createDocument, fetchLdflexDocument, deleteFile } from './ldflex-helper';
import { storageHelper, errorToaster, permissionHelper } from '@utils';

const appPath = process.env.REACT_APP_ROUTES_PRIVATE_PATH;

/**
 * Creates a valid string that represents the application path. This is the
 * default value if no storage predicate is discovered
 * @param webId
 * @param path
 * @returns {*}
 */
export const buildPathFromWebId = (webId, path) => {
  if (!webId) return false;
  const domain = new URL(typeof webId === 'object' ? webId.webId : webId).origin;
  return `${domain}/${path}`;
};

/**
 * Helper function to check for the user's pod storage value. If it doesn't exist, we assume root of the pod
 * @returns {Promise<string>}
 */
export const getAppStorage = async webId => {
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
  try {
    // First, check if we have WRITE permission for the app
    const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
      webId,
      AccessControlList.MODES.WRITE
    );

    // If we do not have Write permission, there's nothing we can do here
    if (!hasWritePermission) return;

    // Get the default app storage location from the user's pod and append our path to it
    const routesUrl = await storageHelper.getAppStorage(webId);

    // Check if the private routes folder exists, if not then create it. This is where route files are stored
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
  } catch (error) {
    errorToaster(error.message, 'Error');
    return false;
  }
};

export const saveRoute = async (webId, route) => {
  try {
    const routesUrl = await storageHelper.getAppStorage(webId);

    const routeFilePath = `${routesUrl}${route.id}.json`;
    await createDocument(routeFilePath, JSON.stringify(route));

    return true;
  } catch (error) {
    errorToaster(error.message, 'Error');
    return false;
  }
};

export const readRoute = async (webId, routeId) => {
  try {
    const routesUrl = await storageHelper.getAppStorage(webId);
    const routeFilePath = `${routesUrl}${routeId}.json`;

    const route = await fetchLdflexDocument(routeFilePath);
    
    return route;
  } catch (error) {
    errorToaster(error.message, 'Error');
    return false;
  }
};

export const deleteRoute = async (webId, routeId) => {
  try {
    const routesUrl = await storageHelper.getAppStorage(webId);
    const routeFilePath = `${routesUrl}${routeId}.json`;

    const routeExists = await deleteFile(routeFilePath);
    
    return true;
  } catch (error) {
    errorToaster(error.message, 'Error');
    return false;
  }
};